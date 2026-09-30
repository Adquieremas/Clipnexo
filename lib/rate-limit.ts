const buckets = new Map<string, { count: number; resetAt: number }>();

const MAX_TRACKED_KEYS = 5000;

function pruneExpired(now: number) {
  if (buckets.size < MAX_TRACKED_KEYS) return;

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
};

/**
 * Fixed-window in-memory rate limiter, scoped per warm serverless instance.
 * Not globally consistent across regions/cold starts, but stops sustained
 * single-client abuse of expensive unauthenticated proxy endpoints.
 */
export function checkRateLimit(
  req: Request,
  options: { key: string; limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  pruneExpired(now);

  const ip = getClientIp(req);
  const bucketKey = `${options.key}:${ip}`;
  const existing = buckets.get(bucketKey);

  if (!existing || existing.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + options.windowMs });
    return {
      allowed: true,
      limit: options.limit,
      remaining: options.limit - 1,
      retryAfterSeconds: 0,
    };
  }

  if (existing.count >= options.limit) {
    return {
      allowed: false,
      limit: options.limit,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    limit: options.limit,
    remaining: options.limit - existing.count,
    retryAfterSeconds: 0,
  };
}

export function rateLimitResponseInit(result: RateLimitResult): ResponseInit {
  return {
    status: 429,
    headers: {
      "Retry-After": String(result.retryAfterSeconds),
      "X-RateLimit-Limit": String(result.limit),
      "X-RateLimit-Remaining": String(result.remaining),
    },
  };
}
