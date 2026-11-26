import { normalizeLang, type SupportedLang, type RouteKey } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

export type BlogSlugKey = string;

export type BlogPostTable = {
  headers: string[];
  rows: string[][];
};

export type BlogPostSection =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; table: BlogPostTable }
  | { type: "cta-tools"; text: string; links: { label: string; routeKey: RouteKey }[] }
  | { type: "cta-blog"; text: string; href: string; label: string }
  | { type: "note"; text: string };

export type BlogPostData = {
  title: string;
  h1: string;
  description: string;
  excerpt: string;
  sections: BlogPostSection[];
  faqTitle: string;
  faq: { q: string; a: string }[];
};

export type BlogPost = {
  slugKey: BlogSlugKey;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featured: boolean;
  slugs: Record<SupportedLang, string>;
  content: Record<SupportedLang, BlogPostData>;
  relatedPostKeys: BlogSlugKey[];
  relatedToolRouteKeys: RouteKey[];
};

export type BlogCategory = {
  key: string;
  label: Record<SupportedLang, string>;
};

export const blogCategories: BlogCategory[] = [
  { key: "social-media", label: { es: "Redes sociales", en: "Social media", pt: "Redes sociais" } },
  { key: "creators", label: { es: "Creadores", en: "Creators", pt: "Criadores" } },
];

export const blogPosts: BlogPost[] = [
  {
    slugKey: "herramientas-creadores",
    category: "creators",
    tags: ["herramientas", "creadores", "contenido", "redes sociales", "tiktok", "youtube", "instagram"],
    publishedAt: "2026-06-02T00:00:00.000Z",
    updatedAt: "2026-06-02T00:00:00.000Z",
    readingTime: 7,
    featured: false,
    slugs: {
      es: "herramientas-creadores-contenido-redes-sociales",
      en: "tools-for-social-media-content-creators",
      pt: "ferramentas-criadores-conteudo-redes-sociais",
    },
    relatedPostKeys: ["nuevos-recursos-sonidos-memes-emojis", "como-elegir-hashtags", "como-crear-captions"],
    relatedToolRouteKeys: ["tools", "socialMediaTextGenerator", "shortVideoScriptGenerator"],
    content: {
      es: {
        title: "Herramientas para creadores de contenido digital",
        h1: "Herramientas para creadores de contenido digital",
        description: "Descubre herramientas para crear textos, captions, hashtags, guiones, ideas y contenido para TikTok, YouTube e Instagram.",
        excerpt: "Recopilación de herramientas digitales para creadores de contenido. Generadores, calculadoras y utilidades para redes sociales.",
        sections: [
          { type: "p", text: "Crear contenido para redes sociales requiere más que solo una buena idea. A veces necesitas el hashtag correcto, un título llamativo, un caption que enganche o un guion bien estructurado. Aquí tienes una visión general de herramientas que pueden ayudarte." },
          { type: "h2", text: "Herramientas para TikTok" },
          { type: "p", text: "Clipnexo incluye varias herramientas pensadas para creadores de TikTok:" },
          {
            type: "ul",
            items: [
              "Generador de bio para TikTok: crea una descripción atractiva para tu perfil.",
              "Generador de ideas para TikTok: encuentra inspiración para tu próximo video.",
              "Generador de ganchos virales: escribe los primeros segundos que enganchan.",
              "Generador de captions para TikTok: escribe descripciones que complementen tu video.",
              "Generador de hashtags para TikTok: encuentra las etiquetas más relevantes.",
              "Generador de títulos y hashtags para videos cortos: ideal para Shorts y Reels también.",
            ],
          },
          { type: "h2", text: "Herramientas para YouTube" },
          { type: "p", text: "Para creadores de YouTube, Clipnexo ofrece más de 15 herramientas:" },
          {
            type: "ul",
            items: [
              "Generadores y extractores de títulos, descripciones, etiquetas y hashtags.",
              "Verificador de longitud de títulos.",
              "Generador de código de inserción y enlaces con tiempo.",
              "Generador de enlaces de suscripción.",
              "Descargador de miniaturas.",
              "Calculadora de dinero y proporción de vistas.",
            ],
          },
          { type: "h2", text: "Herramientas para Instagram" },
          {
            type: "ul",
            items: [
              "Generador de captions para Instagram.",
              "Generador de hashtags para Instagram.",
              "Generador de bio para Instagram.",
              "Generador de ideas para Reels.",
              "Generador de ganchos para Reels.",
            ],
          },
          { type: "h2", text: "Herramientas para Facebook" },
          {
            type: "ul",
            items: [
              "Generador de posts para Facebook.",
              "Generador de anuncios para Facebook.",
              "Generador de textos para Marketplace.",
            ],
          },
          { type: "h2", text: "Herramientas multiuso" },
          {
            type: "ul",
            items: [
              "Generador de textos para redes sociales: escribe un tema y obtén textos listos.",
              "Generador de guiones para videos cortos: estructuras ideas para Reels, Shorts o TikTok.",
              "Contador de caracteres para redes sociales: verifica la longitud de tus textos.",
            ],
          },
          { type: "cta-tools", text: "Explora todas las herramientas:", links: [
            { label: "Todas las herramientas", routeKey: "tools" },
            { label: "Generador de textos", routeKey: "socialMediaTextGenerator" },
            { label: "Generador de guiones", routeKey: "shortVideoScriptGenerator" },
          ]},
          { type: "h2", text: "Preguntas frecuentes" },
        ],
        faqTitle: "Preguntas frecuentes",
        faq: [
          { q: "¿Estas herramientas son gratuitas?", a: "Sí, todas las herramientas de Clipnexo son gratuitas y funcionan desde el navegador." },
          { q: "¿Necesito conocimientos técnicos para usarlas?", a: "No, están diseñadas para ser intuitivas y fáciles de usar." },
          { q: "¿Funcionan en cualquier dispositivo?", a: "Sí, todas son compatibles con móvil, tablet y PC." },
          { q: "¿Las herramientas guardan mi contenido?", a: "No. Todo se procesa localmente en tu navegador sin almacenar tu información." },
        ],
      },
      en: {
        title: "Tools for social media content creators",
        h1: "Tools for social media content creators",
        description: "Discover tools to create captions, hashtags, scripts, ideas and content for TikTok, YouTube, Instagram and social platforms.",
        excerpt: "Collection of digital tools for content creators. Generators, calculators and utilities for social media.",
        sections: [
          { type: "p", text: "Creating content for social media requires more than just a good idea. Sometimes you need the right hashtag, a catchy title, an engaging caption or a well-structured script. Here is an overview of tools that can help you." },
          { type: "h2", text: "TikTok tools" },
          { type: "p", text: "Clipnexo includes several tools designed for TikTok creators:" },
          {
            type: "ul",
            items: [
              "TikTok bio generator: create an attractive profile description.",
              "TikTok video idea generator: find inspiration for your next video.",
              "TikTok hook generator: write the first seconds that grab attention.",
              "TikTok caption generator: write descriptions that complement your video.",
              "TikTok hashtag generator: find the most relevant tags.",
              "Short video title and hashtag generator: ideal for Shorts and Reels too.",
            ],
          },
          { type: "h2", text: "YouTube tools" },
          { type: "p", text: "For YouTube creators, Clipnexo offers over 15 tools:" },
          {
            type: "ul",
            items: [
              "Generators and extractors for titles, descriptions, tags and hashtags.",
              "Title length checker.",
              "Embed code and timestamp link generator.",
              "Subscribe link generator.",
              "Thumbnail downloader.",
              "Money calculator and view ratio calculator.",
            ],
          },
          { type: "h2", text: "Instagram tools" },
          {
            type: "ul",
            items: [
              "Instagram caption generator.",
              "Instagram hashtag generator.",
              "Instagram bio generator.",
              "Reels idea generator.",
              "Reels hook generator.",
            ],
          },
          { type: "h2", text: "Facebook tools" },
          {
            type: "ul",
            items: [
              "Facebook post generator.",
              "Facebook ad generator.",
              "Marketplace text generator.",
            ],
          },
          { type: "h2", text: "Multi-purpose tools" },
          {
            type: "ul",
            items: [
              "Social media text generator: write a topic and get ready-to-use texts.",
              "Short video script generator: structure ideas for Reels, Shorts or TikTok.",
              "Social media character counter: check your text lengths.",
            ],
          },
          { type: "cta-tools", text: "Explore all tools:", links: [
            { label: "All tools", routeKey: "tools" },
            { label: "Text generator", routeKey: "socialMediaTextGenerator" },
            { label: "Script generator", routeKey: "shortVideoScriptGenerator" },
          ]},
          { type: "h2", text: "Frequently asked questions" },
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { q: "Are these tools free?", a: "Yes, all Clipnexo tools are free and work directly from your browser." },
          { q: "Do I need technical skills?", a: "No, they are designed to be intuitive and easy to use." },
          { q: "Do they work on any device?", a: "Yes, all tools are compatible with mobile, tablet and desktop." },
          { q: "Do the tools save my content?", a: "No. Everything is processed locally in your browser without storing your information." },
        ],
      },
      pt: {
        title: "Ferramentas para criadores de conteúdo digital",
        h1: "Ferramentas para criadores de conteúdo digital",
        description: "Descubra ferramentas para criar legendas, hashtags, roteiros, ideias e conteúdo para TikTok, YouTube e Instagram.",
        excerpt: "Coleção de ferramentas digitais para criadores de conteúdo. Geradores, calculadoras e utilidades para redes sociais.",
        sections: [
          { type: "p", text: "Criar conteúdo para redes sociais requer mais que apenas uma boa ideia. Às vezes você precisa do hashtag certo, um título chamativo, uma legenda que prenda ou um roteiro bem estruturado. Aqui está uma visão geral de ferramentas que podem ajudar." },
          { type: "h2", text: "Ferramentas para TikTok" },
          { type: "p", text: "Clipnexo inclui várias ferramentas pensadas para criadores de TikTok:" },
          {
            type: "ul",
            items: [
              "Gerador de bio para TikTok: crie uma descrição atrativa para seu perfil.",
              "Gerador de ideias para TikTok: encontre inspiração para seu próximo vídeo.",
              "Gerador de ganchos virais: escreva os primeiros segundos que prendem.",
              "Gerador de legendas para TikTok: escreva descrições que complementem seu vídeo.",
              "Gerador de hashtags para TikTok: encontre as tags mais relevantes.",
              "Gerador de títulos e hashtags para vídeos curtos: ideal para Shorts e Reels também.",
            ],
          },
          { type: "h2", text: "Ferramentas para YouTube" },
          { type: "p", text: "Para criadores de YouTube, Clipnexo oferece mais de 15 ferramentas:" },
          {
            type: "ul",
            items: [
              "Geradores e extratores de títulos, descrições, tags e hashtags.",
              "Verificador de tamanho de título.",
              "Gerador de código de inserção e links com tempo.",
              "Gerador de links de inscrição.",
              "Baixador de miniaturas.",
              "Calculadora de dinheiro e proporção de visualizações.",
            ],
          },
          { type: "h2", text: "Ferramentas para Instagram" },
          {
            type: "ul",
            items: [
              "Gerador de legendas para Instagram.",
              "Gerador de hashtags para Instagram.",
              "Gerador de bio para Instagram.",
              "Gerador de ideias para Reels.",
              "Gerador de ganchos para Reels.",
            ],
          },
          { type: "h2", text: "Ferramentas para Facebook" },
          {
            type: "ul",
            items: [
              "Gerador de posts para Facebook.",
              "Gerador de anúncios para Facebook.",
              "Gerador de textos para Marketplace.",
            ],
          },
          { type: "h2", text: "Ferramentas multiuso" },
          {
            type: "ul",
            items: [
              "Gerador de textos para redes sociais: escreva um tema e obtenha textos prontos.",
              "Gerador de roteiros para vídeos curtos: estruture ideias para Reels, Shorts ou TikTok.",
              "Contador de caracteres para redes sociais: verifique o comprimento dos seus textos.",
            ],
          },
          { type: "cta-tools", text: "Explore todas as ferramentas:", links: [
            { label: "Todas as ferramentas", routeKey: "tools" },
            { label: "Gerador de textos", routeKey: "socialMediaTextGenerator" },
            { label: "Gerador de roteiros", routeKey: "shortVideoScriptGenerator" },
          ]},
          { type: "h2", text: "Perguntas frequentes" },
        ],
        faqTitle: "Perguntas frequentes",
        faq: [
          { q: "Estas ferramentas são gratuitas?", a: "Sim, todas as ferramentas do Clipnexo são gratuitas e funcionam pelo navegador." },
          { q: "Preciso de conhecimentos técnicos para usá-las?", a: "Não, são projetadas para serem intuitivas e fáceis de usar." },
          { q: "Funcionam em qualquer dispositivo?", a: "Sim, todas são compatíveis com celular, tablet e PC." },
          { q: "As ferramentas salvam meu conteúdo?", a: "Não. Tudo é processado localmente no seu navegador sem armazenar suas informações." },
        ],
      },
    },
  },
  {
    slugKey: "como-elegir-hashtags",
    category: "social-media",
    tags: ["hashtags", "tiktok", "reels", "shorts", "redes sociales"],
    publishedAt: "2026-06-02T00:00:00.000Z",
    updatedAt: "2026-06-02T00:00:00.000Z",
    readingTime: 6,
    featured: false,
    slugs: {
      es: "como-elegir-hashtags-tiktok-reels-shorts",
      en: "how-to-choose-hashtags-tiktok-reels-shorts",
      pt: "como-escolher-hashtags-tiktok-reels-shorts",
    },
    relatedPostKeys: ["como-crear-captions", "herramientas-creadores"],
    relatedToolRouteKeys: ["tiktokHashtags", "youtubeHashtagGenerator", "instagramHashtagGenerator"],
    content: {
      es: {
        title: "Cómo elegir hashtags para TikTok, Reels y Shorts",
        h1: "Cómo elegir hashtags para TikTok, Reels y Shorts",
        description: "Aprende a elegir hashtags para TikTok, Reels y Shorts con ejemplos prácticos, errores comunes y herramientas útiles.",
        excerpt: "Guía práctica para elegir hashtags en TikTok, Reels y Shorts. Estrategia, ejemplos y errores que debes evitar.",
        sections: [
          { type: "p", text: "Los hashtags siguen siendo una forma útil de organizar y descubrir contenido en redes sociales. Usarlos bien puede ayudar a que tus videos lleguen a más personas interesadas en el tema." },
          { type: "h2", text: "¿Por qué son importantes los hashtags?" },
          {
            type: "ul",
            items: [
              "Ayudan a clasificar tu contenido por tema.",
              "Permiten que usuarios interesados en ese tema encuentren tu video.",
              "Pueden aumentar el alcance orgánico de tus publicaciones.",
            ],
          },
          { type: "h2", text: "¿Cuántos hashtags usar?" },
          { type: "p", text: "No hay una regla fija, pero estas son recomendaciones generales:" },
          {
            type: "ul",
            items: [
              "TikTok: entre 3 y 5 hashtags relevantes suele ser suficiente.",
              "Reels (Instagram): de 3 a 5 hashtags es una cantidad habitual.",
              "Shorts (YouTube): 3 a 5 hashtags, YouTube recomienda no abusar.",
            ],
          },
          { type: "h2", text: "Cómo elegir los hashtags correctos" },
          {
            type: "ol",
            items: [
              "Identifica el tema principal de tu video.",
              "Busca hashtags populares dentro de ese tema.",
              "Combina hashtags grandes (muchos seguidores) con hashtags de nicho (más específicos).",
              "Evita hashtags genéricos como #viral o #fyp si no se relacionan con tu contenido.",
              "Revisa qué hashtags usan creadores similares.",
            ],
          },
          { type: "h2", text: "Errores comunes" },
          {
            type: "ul",
            items: [
              "Usar hashtags irrelevantes solo porque son populares.",
              "Poner demasiados hashtags (más de 10) sin criterio.",
              "Usar siempre los mismos hashtags en todos los videos.",
              "Escribir los hashtags sin tildes o con errores.",
            ],
          },
          { type: "cta-tools", text: "Genera hashtags con Clipnexo:", links: [
            { label: "Generador de hashtags para TikTok", routeKey: "tiktokHashtags" },
            { label: "Generador de hashtags para Instagram", routeKey: "instagramHashtagGenerator" },
            { label: "Generador de hashtags para YouTube", routeKey: "youtubeHashtagGenerator" },
          ]},
          { type: "h2", text: "Preguntas frecuentes" },
        ],
        faqTitle: "Preguntas frecuentes",
        faq: [
          { q: "¿Los hashtags realmente ayudan a que un video se vuelva viral?", a: "No garantizan viralidad, pero pueden mejorar la visibilidad si se usan de forma relevante." },
          { q: "¿Debo usar hashtags en todos mis videos?", a: "No es obligatorio, pero puede ayudar a que tu contenido sea descubierto por nuevas audiencias." },
          { q: "¿Puedo usar los mismos hashtags en TikTok, Reels y Shorts?", a: "Puedes, pero es mejor adaptarlos a cada plataforma ya que la audiencia y el algoritmo son diferentes." },
          { q: "¿Hay diferencia entre hashtags en TikTok e Instagram?", a: "Sí, cada plataforma tiene su propio ecosistema. Un hashtag popular en TikTok puede no serlo en Instagram." },
        ],
      },
      en: {
        title: "How to pick hashtags for TikTok, Reels and Shorts",
        h1: "How to pick hashtags for TikTok, Reels and Shorts",
        description: "Learn how to choose hashtags for TikTok, Reels and Shorts with practical examples, common mistakes and useful tools.",
        excerpt: "Practical guide for choosing hashtags on TikTok, Reels and Shorts. Strategy, examples and mistakes to avoid.",
        sections: [
          { type: "p", text: "Hashtags remain a useful way to organize and discover content on social media. Using them well can help your videos reach more people interested in the topic." },
          { type: "h2", text: "Why are hashtags important?" },
          {
            type: "ul",
            items: [
              "They help classify your content by topic.",
              "They allow interested users to find your video.",
              "They can increase organic reach of your posts.",
            ],
          },
          { type: "h2", text: "How many hashtags to use?" },
          { type: "p", text: "There is no fixed rule, but here are general recommendations:" },
          {
            type: "ul",
            items: [
              "TikTok: 3 to 5 relevant hashtags is usually enough.",
              "Reels (Instagram): 3 to 5 hashtags is common.",
              "Shorts (YouTube): 3 to 5 hashtags, YouTube recommends not overdoing it.",
            ],
          },
          { type: "h2", text: "How to choose the right hashtags" },
          {
            type: "ol",
            items: [
              "Identify the main topic of your video.",
              "Search for popular hashtags within that topic.",
              "Combine broad hashtags (many followers) with niche hashtags (more specific).",
              "Avoid generic hashtags like #viral or #fyp if not related to your content.",
              "Check what hashtags similar creators use.",
            ],
          },
          { type: "h2", text: "Common mistakes" },
          {
            type: "ul",
            items: [
              "Using irrelevant hashtags just because they are popular.",
              "Adding too many hashtags (over 10) without criteria.",
              "Using the same hashtags in every video.",
              "Writing hashtags with typos or errors.",
            ],
          },
          { type: "cta-tools", text: "Generate hashtags with Clipnexo:", links: [
            { label: "TikTok hashtag generator", routeKey: "tiktokHashtags" },
            { label: "Instagram hashtag generator", routeKey: "instagramHashtagGenerator" },
            { label: "YouTube hashtag generator", routeKey: "youtubeHashtagGenerator" },
          ]},
          { type: "h2", text: "Frequently asked questions" },
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { q: "Do hashtags really help a video go viral?", a: "They do not guarantee virality, but they can improve visibility when used relevantly." },
          { q: "Should I use hashtags on every video?", a: "It is not required, but it can help your content be discovered by new audiences." },
          { q: "Can I use the same hashtags on TikTok, Reels and Shorts?", a: "You can, but it is better to adapt them to each platform since the audience and algorithm differ." },
          { q: "Is there a difference between hashtags on TikTok and Instagram?", a: "Yes, each platform has its own ecosystem. A popular hashtag on TikTok may not be popular on Instagram." },
        ],
      },
      pt: {
        title: "Como escolher hashtags no TikTok, Reels e Shorts",
        h1: "Como escolher hashtags no TikTok, Reels e Shorts",
        description: "Aprenda como escolher hashtags para TikTok, Reels e Shorts com exemplos práticos, erros comuns e ferramentas úteis.",
        excerpt: "Guia prático para escolher hashtags no TikTok, Reels e Shorts. Estratégia, exemplos e erros que você deve evitar.",
        sections: [
          { type: "p", text: "As hashtags continuam sendo uma forma útil de organizar e descobrir conteúdo nas redes sociais. Usá-las bem pode ajudar seus vídeos a alcançar mais pessoas interessadas no assunto." },
          { type: "h2", text: "Por que as hashtags são importantes?" },
          {
            type: "ul",
            items: [
              "Ajudam a classificar seu conteúdo por tema.",
              "Permitem que usuários interessados encontrem seu vídeo.",
              "Podem aumentar o alcance orgânico de suas publicações.",
            ],
          },
          { type: "h2", text: "Quantas hashtags usar?" },
          { type: "p", text: "Não há uma regra fixa, mas estas são recomendações gerais:" },
          {
            type: "ul",
            items: [
              "TikTok: entre 3 e 5 hashtags relevantes geralmente é suficiente.",
              "Reels (Instagram): de 3 a 5 hashtags é uma quantidade comum.",
              "Shorts (YouTube): 3 a 5 hashtags, o YouTube recomenda não exagerar.",
            ],
          },
          { type: "h2", text: "Como escolher as hashtags certas" },
          {
            type: "ol",
            items: [
              "Identifique o tema principal do seu vídeo.",
              "Procure hashtags populares dentro desse tema.",
              "Combine hashtags grandes (muitos seguidores) com hashtags de nicho (mais específicas).",
              "Evite hashtags genéricas como #viral ou #fyp se não estiverem relacionadas ao seu conteúdo.",
              "Veja quais hashtags criadores similares usam.",
            ],
          },
          { type: "h2", text: "Erros comuns" },
          {
            type: "ul",
            items: [
              "Usar hashtags irrelevantes só porque são populares.",
              "Colocar muitas hashtags (mais de 10) sem critério.",
              "Usar sempre as mesmas hashtags em todos os vídeos.",
              "Escrever as hashtags com erros de digitação.",
            ],
          },
          { type: "cta-tools", text: "Gere hashtags com Clipnexo:", links: [
            { label: "Gerador de hashtags para TikTok", routeKey: "tiktokHashtags" },
            { label: "Gerador de hashtags para Instagram", routeKey: "instagramHashtagGenerator" },
            { label: "Gerador de hashtags para YouTube", routeKey: "youtubeHashtagGenerator" },
          ]},
          { type: "h2", text: "Perguntas frequentes" },
        ],
        faqTitle: "Perguntas frequentes",
        faq: [
          { q: "As hashtags realmente ajudam um vídeo a viralizar?", a: "Não garantem viralidade, mas podem melhorar a visibilidade se usadas de forma relevante." },
          { q: "Devo usar hashtags em todos os vídeos?", a: "Não é obrigatório, mas pode ajudar seu conteúdo a ser descoberto por novas audiências." },
          { q: "Posso usar as mesmas hashtags no TikTok, Reels e Shorts?", a: "Pode, mas é melhor adaptá-las a cada plataforma, já que o público e o algoritmo são diferentes." },
          { q: "Há diferença entre hashtags no TikTok e Instagram?", a: "Sim, cada plataforma tem seu próprio ecossistema. Uma hashtag popular no TikTok pode não ser no Instagram." },
        ],
      },
    },
  },
  {
    slugKey: "como-crear-captions",
    category: "social-media",
    tags: ["captions", "instagram", "tiktok", "redes sociales", "contenido"],
    publishedAt: "2026-06-02T00:00:00.000Z",
    updatedAt: "2026-06-02T00:00:00.000Z",
    readingTime: 6,
    featured: false,
    slugs: {
      es: "como-crear-captions-instagram-tiktok",
      en: "how-to-write-instagram-tiktok-captions",
      pt: "como-criar-legendas-instagram-tiktok",
    },
    relatedPostKeys: ["como-elegir-hashtags", "herramientas-creadores"],
    relatedToolRouteKeys: ["instagramCaptionGenerator", "tiktokCaptions", "socialMediaTextGenerator"],
    content: {
      es: {
        title: "Cómo crear captions para Instagram y TikTok",
        h1: "Cómo crear captions para Instagram y TikTok",
        description: "Aprende a crear captions para Instagram y TikTok con estructura, tono, llamadas a la acción y ejemplos listos para usar.",
        excerpt: "Guía para escribir captions efectivos en Instagram y TikTok. Estructura, tono, CTAs y ejemplos prácticos.",
        sections: [
          { type: "p", text: "El caption o descripción de tu publicación es casi tan importante como el video o la imagen. Un buen caption puede hacer que alguien se detenga a leer, comente o comparta tu contenido." },
          { type: "h2", text: "Estructura de un buen caption" },
          {
            type: "ol",
            items: [
              "Apertura: las primeras líneas deben enganchar. Puedes empezar con una pregunta, un dato curioso o una afirmación directa.",
              "Desarrollo: amplía la idea. Cuenta una historia breve, da contexto o comparte un consejo.",
              "Llamada a la acción (CTA): invita a comentar, compartir, guardar o visitar un enlace.",
              "Hashtags: añade de 3 a 5 hashtags relevantes al final.",
            ],
          },
          { type: "h2", text: "Tonos según tu objetivo" },
          {
            type: "table",
            table: {
              headers: ["Tono", "Cuándo usarlo", "Ejemplo de apertura"],
              rows: [
                ["Informativo", "Tutoriales, guías, consejos", "\"¿Sabías que puedes descargar videos de TikTok sin marca de agua en segundos?\""],
                ["Divertido", "Contenido entretenido, memes", "\"Yo cada vez que veo este baile: 🤣\""],
                ["Inspirador", "Citas, motivación, historias", "\"Hace un año empecé sin saber si funcionaría. Esto es lo que aprendí.\""],
                ["Vendedor", "Productos, servicios, ofertas", "\"Si buscas una herramienta que te ayude a crear contenido, esto te interesa.\""],
              ],
            },
          },
          { type: "h2", text: "Consejos prácticos" },
          {
            type: "ul",
            items: [
              "Escribe como hablas. No uses un lenguaje demasiado formal si no va con tu estilo.",
              "Los captions cortos (menos de 150 caracteres) funcionan bien en TikTok.",
              "En Instagram, los captions más largos pueden funcionar si cuentan una historia.",
              "Deja espacio para que la gente comente: haz preguntas abiertas.",
              "Revisa la ortografía antes de publicar.",
            ],
          },
          { type: "cta-tools", text: "Genera captions con Clipnexo:", links: [
            { label: "Generador de captions para TikTok", routeKey: "tiktokCaptions" },
            { label: "Generador de captions para Instagram", routeKey: "instagramCaptionGenerator" },
            { label: "Generador de textos para redes sociales", routeKey: "socialMediaTextGenerator" },
          ]},
          { type: "h2", text: "Preguntas frecuentes" },
        ],
        faqTitle: "Preguntas frecuentes",
        faq: [
          { q: "¿Qué extensión debe tener un caption?", a: "En TikTok, los captions cortos (2-3 líneas) suelen funcionar mejor. En Instagram, puedes escribir más si el contenido lo requiere." },
          { q: "¿Debo poner hashtags en el caption o en los comentarios?", a: "Funciona de ambas formas. En TikTok se suelen poner en el caption. En Instagram, algunos los ponen en los comentarios para que el texto se vea más limpio." },
          { q: "¿Los emojis ayudan?", a: "Sí, los emojis bien usados pueden hacer el caption más visual y expresivo, pero no abuses." },
          { q: "¿Necesito una llamada a la acción en cada publicación?", a: "No es obligatorio, pero las publicaciones con CTA suelen generar más interacción." },
        ],
      },
      en: {
        title: "How to write captions for Instagram and TikTok",
        h1: "How to write captions for Instagram and TikTok",
        description: "Learn how to write captions for Instagram and TikTok with structure, tone, calls to action and ready-to-use examples.",
        excerpt: "Guide to writing effective captions for Instagram and TikTok. Structure, tone, CTAs and practical examples.",
        sections: [
          { type: "p", text: "The caption or description of your post is almost as important as the video or image. A good caption can make someone stop to read, comment or share your content." },
          { type: "h2", text: "Structure of a good caption" },
          {
            type: "ol",
            items: [
              "Opening: the first lines must grab attention. Start with a question, a fun fact or a direct statement.",
              "Development: expand the idea. Tell a short story, give context or share a tip.",
              "Call to action (CTA): invite people to comment, share, save or visit a link.",
              "Hashtags: add 3 to 5 relevant hashtags at the end.",
            ],
          },
          { type: "h2", text: "Tones by goal" },
          {
            type: "table",
            table: {
              headers: ["Tone", "When to use", "Opening example"],
              rows: [
                ["Informative", "Tutorials, guides, tips", "\"Did you know you can download TikTok videos without watermark in seconds?\""],
                ["Funny", "Entertainment, memes", "\"Me every time I see this dance: 🤣\""],
                ["Inspiring", "Quotes, motivation, stories", "\"A year ago I started not knowing if it would work. Here is what I learned.\""],
                ["Sales", "Products, services, offers", "\"If you are looking for a tool to help you create content, this is for you.\""],
              ],
            },
          },
          { type: "h2", text: "Practical tips" },
          {
            type: "ul",
            items: [
              "Write like you speak. Do not use overly formal language if it does not match your style.",
              "Short captions (under 150 characters) work well on TikTok.",
              "On Instagram, longer captions can work if they tell a story.",
              "Leave room for comments: ask open-ended questions.",
              "Check spelling before posting.",
            ],
          },
          { type: "cta-tools", text: "Generate captions with Clipnexo:", links: [
            { label: "TikTok caption generator", routeKey: "tiktokCaptions" },
            { label: "Instagram caption generator", routeKey: "instagramCaptionGenerator" },
            { label: "Social media text generator", routeKey: "socialMediaTextGenerator" },
          ]},
          { type: "h2", text: "Frequently asked questions" },
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { q: "How long should a caption be?", a: "On TikTok, short captions (2-3 lines) usually work better. On Instagram, you can write more if the content requires it." },
          { q: "Should I put hashtags in the caption or comments?", a: "Both work. On TikTok they are usually in the caption. On Instagram, some put them in comments for a cleaner look." },
          { q: "Do emojis help?", a: "Yes, well-used emojis can make captions more visual and expressive, but do not overdo it." },
          { q: "Do I need a call to action on every post?", a: "It is not required, but posts with CTAs usually generate more interaction." },
        ],
      },
      pt: {
        title: "Como criar legendas para Instagram e TikTok",
        h1: "Como criar legendas para Instagram e TikTok",
        description: "Aprenda como criar legendas para Instagram e TikTok com estrutura, tom, chamadas para ação e exemplos prontos.",
        excerpt: "Guia para escrever legendas eficazes no Instagram e TikTok. Estrutura, tom, CTAs e exemplos práticos.",
        sections: [
          { type: "p", text: "A legenda ou descrição da sua publicação é quase tão importante quanto o vídeo ou a imagem. Uma boa legenda pode fazer alguém parar para ler, comentar ou compartilhar seu conteúdo." },
          { type: "h2", text: "Estrutura de uma boa legenda" },
          {
            type: "ol",
            items: [
              "Abertura: as primeiras linhas devem prender a atenção. Comece com uma pergunta, um fato curioso ou uma afirmação direta.",
              "Desenvolvimento: amplie a ideia. Conte uma história breve, dê contexto ou compartilhe uma dica.",
              "Chamada para ação (CTA): convide as pessoas a comentar, compartilhar, salvar ou visitar um link.",
              "Hashtags: adicione de 3 a 5 hashtags relevantes no final.",
            ],
          },
          { type: "h2", text: "Tons de acordo com seu objetivo" },
          {
            type: "table",
            table: {
              headers: ["Tom", "Quando usar", "Exemplo de abertura"],
              rows: [
                ["Informativo", "Tutoriais, guias, dicas", "\"Sabia que você pode baixar vídeos do TikTok sem marca d'água em segundos?\""],
                ["Divertido", "Conteúdo de entretenimento, memes", "\"Eu toda vez que vejo essa dança: 🤣\""],
                ["Inspirador", "Citações, motivação, histórias", "\"Há um ano comecei sem saber se daria certo. Aqui está o que aprendi.\""],
                ["Vendedor", "Produtos, serviços, ofertas", "\"Se você procura uma ferramenta para criar conteúdo, isso é para você.\""],
              ],
            },
          },
          { type: "h2", text: "Dicas práticas" },
          {
            type: "ul",
            items: [
              "Escreva como você fala. Não use linguagem muito formal se não combina com seu estilo.",
              "Legendas curtas (menos de 150 caracteres) funcionam bem no TikTok.",
              "No Instagram, legendas mais longas podem funcionar se contarem uma história.",
              "Deixe espaço para comentários: faça perguntas abertas.",
              "Revise a ortografia antes de publicar.",
            ],
          },
          { type: "cta-tools", text: "Gere legendas com Clipnexo:", links: [
            { label: "Gerador de legendas para TikTok", routeKey: "tiktokCaptions" },
            { label: "Gerador de legendas para Instagram", routeKey: "instagramCaptionGenerator" },
            { label: "Gerador de textos para redes sociais", routeKey: "socialMediaTextGenerator" },
          ]},
          { type: "h2", text: "Perguntas frequentes" },
        ],
        faqTitle: "Perguntas frequentes",
        faq: [
          { q: "Qual deve ser a extensão de uma legenda?", a: "No TikTok, legendas curtas (2-3 linhas) geralmente funcionam melhor. No Instagram, você pode escrever mais se o conteúdo exigir." },
          { q: "Devo colocar hashtags na legenda ou nos comentários?", a: "Funciona de ambas as formas. No TikTok geralmente vão na legenda. No Instagram, alguns colocam nos comentários para um visual mais limpo." },
          { q: "Emojis ajudam?", a: "Sim, emojis bem usados podem tornar a legenda mais visual e expressiva, mas não exagere." },
          { q: "Preciso de uma chamada para ação em cada publicação?", a: "Não é obrigatório, mas publicações com CTA geralmente geram mais interação." },
        ],
      },
    },
  },
  {
    slugKey: "nuevos-recursos-sonidos-memes-emojis",
    category: "creators",
    tags: ["sonidos", "memes", "emojis", "biblioteca", "recursos gratis", "tiktok", "reels"],
    publishedAt: "2026-11-25T00:00:00.000Z",
    updatedAt: "2026-11-25T00:00:00.000Z",
    readingTime: 6,
    featured: true,
    slugs: {
      es: "nuevos-recursos-sonidos-memes-emojis-clipnexo",
      en: "new-resources-sounds-memes-emojis-clipnexo",
      pt: "novos-recursos-sons-memes-emojis-clipnexo",
    },
    relatedPostKeys: ["herramientas-creadores", "como-elegir-hashtags"],
    relatedToolRouteKeys: ["soundsLibrary", "memesLibrary", "emojiLibrary"],
    content: {
      es: {
        title: "Nuevos recursos: sonidos, memes y emojis",
        h1: "Nuevos recursos en Clipnexo: sonidos, memes y emojis gratis",
        description: "Clipnexo suma tres bibliotecas gratuitas: sonidos para video, memes en video y emojis para descargar. Descubre cómo usarlas y compartirlas en WhatsApp.",
        excerpt: "Clipnexo ahora incluye biblioteca de sonidos, memes en video y emojis gratis para descargar, además de sus generadores de texto.",
        sections: [
          { type: "p", text: "Además de los generadores de hashtags, captions y guiones, Clipnexo ahora incluye tres bibliotecas de recursos gratuitos pensadas para acelerar tu proceso de edición: sonidos, memes en video y emojis. Todo gratis, sin registro y listo para descargar." },
          { type: "h2", text: "Biblioteca de sonidos" },
          { type: "p", text: "La biblioteca de sonidos reúne efectos de sonido, memes de audio, música y notificaciones organizados por categoría: Memes, Efectos de sonido, Música, Notificaciones, Transiciones y Otros. Cada sonido tiene su propia página con reproductor, forma de onda, descarga directa en MP3, favoritos y opción de compartir." },
          {
            type: "ul",
            items: [
              "Reproduce cualquier sonido directamente desde la tarjeta, sin salir de la página.",
              "Descarga el MP3 con un clic, listo para usar en tu editor de video.",
              "Busca por nombre o filtra por categoría para encontrar el sonido exacto.",
              "Comparte el enlace directo de un sonido o insértalo con el código de embed.",
            ],
          },
          { type: "h2", text: "Memes gratis en video" },
          { type: "p", text: "La galería de memes incluye cientos de clips en video optimizados para web, organizados por categoría (reacciones, Bob Esponja y más). Son ideales para ediciones, remates de video y contenido humorístico en TikTok, Reels y Shorts." },
          {
            type: "ul",
            items: [
              "Previsualiza el clip antes de descargarlo.",
              "Descarga en formato MP4, compatible con cualquier editor de video.",
              "Explora por categoría o busca el meme que necesitas por nombre.",
            ],
          },
          { type: "h2", text: "Emojis gratis para descargar" },
          { type: "p", text: "La biblioteca de emojis ofrece decenas de emojis en alta calidad, listos para descargar como imagen y usar en miniaturas, diseños, stickers o cualquier proyecto gráfico." },
          { type: "h2", text: "¿Dónde encontrar estos recursos?" },
          { type: "p", text: "Todas las bibliotecas están organizadas bajo el menú \"Sonidos\" (categorías de sonido) y \"Recursos\" (memes y emojis) en la parte superior de Clipnexo, además de tener su propia sección destacada en la página de inicio." },
          { type: "cta-tools", text: "Explora los nuevos recursos:", links: [
            { label: "Biblioteca de sonidos", routeKey: "soundsLibrary" },
            { label: "Memes gratis", routeKey: "memesLibrary" },
            { label: "Emojis gratis", routeKey: "emojiLibrary" },
          ]},
          { type: "h2", text: "Preguntas frecuentes" },
        ],
        faqTitle: "Preguntas frecuentes",
        faq: [
          { q: "¿Los sonidos, memes y emojis son gratis?", a: "Sí. Las tres bibliotecas son gratuitas, no requieren registro y puedes descargar todo el contenido que necesites." },
          { q: "¿Puedo usar estos recursos en TikTok, Reels o Shorts?", a: "Sí, están optimizados para edición de video corto y contenido de redes sociales." },
          { q: "¿Cada cuánto se agregan nuevos sonidos o memes?", a: "Clipnexo actualiza las bibliotecas de forma periódica. Las categorías y la cantidad de contenido disponible siguen creciendo." },
          { q: "¿Necesito crear una cuenta para descargar?", a: "No. Puedes explorar, reproducir y descargar sin registrarte." },
        ],
      },
      en: {
        title: "New resources: sounds, memes and emojis",
        h1: "New resources on Clipnexo: free sounds, memes and emojis",
        description: "Clipnexo adds three free libraries for creators: sound effects, video memes and downloadable emojis. Discover how to use and share them on WhatsApp today.",
        excerpt: "Clipnexo now includes a sound library, video memes and free emojis to download, alongside its text generators.",
        sections: [
          { type: "p", text: "Beyond the hashtag, caption and script generators, Clipnexo now includes three free resource libraries built to speed up your editing workflow: sounds, video memes and emojis. All free, no sign-up required, ready to download." },
          { type: "h2", text: "Sound library" },
          { type: "p", text: "The sound library brings together sound effects, meme audio, music and notification sounds organized by category: Memes, Sound effects, Music, Notifications, Transitions and Other. Each sound has its own page with a player, waveform, direct MP3 download, favorites and a share option." },
          {
            type: "ul",
            items: [
              "Play any sound straight from its card, without leaving the page.",
              "Download the MP3 with one click, ready to use in your video editor.",
              "Search by name or filter by category to find the exact sound you need.",
              "Share a sound's direct link or embed it with the provided code.",
            ],
          },
          { type: "h2", text: "Free video memes" },
          { type: "p", text: "The meme gallery includes hundreds of web-optimized video clips organized by category (reactions, SpongeBob and more). They're great for edits, video punchlines and comedic content for TikTok, Reels and Shorts." },
          {
            type: "ul",
            items: [
              "Preview the clip before downloading it.",
              "Download in MP4 format, compatible with any video editor.",
              "Browse by category or search for the meme you need by name.",
            ],
          },
          { type: "h2", text: "Free emojis to download" },
          { type: "p", text: "The emoji library offers dozens of high-quality emojis, ready to download as images for thumbnails, designs, stickers or any graphic project." },
          { type: "h2", text: "Where to find these resources" },
          { type: "p", text: "All libraries are organized under the \"Sounds\" menu (sound categories) and \"Resources\" menu (memes and emojis) at the top of Clipnexo, plus their own featured section on the homepage." },
          { type: "cta-tools", text: "Explore the new resources:", links: [
            { label: "Sound library", routeKey: "soundsLibrary" },
            { label: "Free memes", routeKey: "memesLibrary" },
            { label: "Free emojis", routeKey: "emojiLibrary" },
          ]},
          { type: "h2", text: "Frequently asked questions" },
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { q: "Are the sounds, memes and emojis free?", a: "Yes. All three libraries are free, require no sign-up, and you can download as much content as you need." },
          { q: "Can I use these resources on TikTok, Reels or Shorts?", a: "Yes, they're optimized for short-form video editing and social media content." },
          { q: "How often are new sounds or memes added?", a: "Clipnexo updates the libraries periodically. Categories and available content keep growing." },
          { q: "Do I need an account to download?", a: "No. You can browse, play and download without signing up." },
        ],
      },
      pt: {
        title: "Novos recursos: sons, memes e emojis",
        h1: "Novos recursos no Clipnexo: sons, memes e emojis grátis",
        description: "O Clipnexo adiciona três bibliotecas gratuitas: efeitos sonoros, memes em vídeo e emojis para baixar. Veja como usar e compartilhar no WhatsApp.",
        excerpt: "O Clipnexo agora inclui biblioteca de sons, memes em vídeo e emojis grátis para baixar, além dos geradores de texto.",
        sections: [
          { type: "p", text: "Além dos geradores de hashtags, legendas e roteiros, o Clipnexo agora inclui três bibliotecas de recursos gratuitos pensadas para acelerar sua edição: sons, memes em vídeo e emojis. Tudo grátis, sem cadastro e pronto para baixar." },
          { type: "h2", text: "Biblioteca de sons" },
          { type: "p", text: "A biblioteca de sons reúne efeitos sonoros, áudios de memes, música e notificações organizados por categoria: Memes, Efeitos sonoros, Música, Notificações, Transições e Outros. Cada som tem sua própria página com player, forma de onda, download direto em MP3, favoritos e opção de compartilhar." },
          {
            type: "ul",
            items: [
              "Reproduza qualquer som direto no card, sem sair da página.",
              "Baixe o MP3 com um clique, pronto para usar no seu editor de vídeo.",
              "Busque por nome ou filtre por categoria para encontrar o som exato.",
              "Compartilhe o link direto de um som ou insira com o código de incorporação.",
            ],
          },
          { type: "h2", text: "Memes grátis em vídeo" },
          { type: "p", text: "A galeria de memes inclui centenas de clipes em vídeo otimizados para web, organizados por categoria (reações, Bob Esponja e mais). São ideais para edições, remates de vídeo e conteúdo de humor no TikTok, Reels e Shorts." },
          {
            type: "ul",
            items: [
              "Pré-visualize o clipe antes de baixar.",
              "Baixe em formato MP4, compatível com qualquer editor de vídeo.",
              "Explore por categoria ou busque o meme que precisa pelo nome.",
            ],
          },
          { type: "h2", text: "Emojis grátis para baixar" },
          { type: "p", text: "A biblioteca de emojis oferece dezenas de emojis em alta qualidade, prontos para baixar como imagem e usar em miniaturas, designs, figurinhas ou qualquer projeto gráfico." },
          { type: "h2", text: "Onde encontrar esses recursos" },
          { type: "p", text: "Todas as bibliotecas estão organizadas no menu \"Sons\" (categorias de som) e \"Recursos\" (memes e emojis) na parte superior do Clipnexo, além de terem sua própria seção de destaque na página inicial." },
          { type: "cta-tools", text: "Explore os novos recursos:", links: [
            { label: "Biblioteca de sons", routeKey: "soundsLibrary" },
            { label: "Memes grátis", routeKey: "memesLibrary" },
            { label: "Emojis grátis", routeKey: "emojiLibrary" },
          ]},
          { type: "h2", text: "Perguntas frequentes" },
        ],
        faqTitle: "Perguntas frequentes",
        faq: [
          { q: "Os sons, memes e emojis são grátis?", a: "Sim. As três bibliotecas são gratuitas, não exigem cadastro e você pode baixar todo o conteúdo que precisar." },
          { q: "Posso usar esses recursos no TikTok, Reels ou Shorts?", a: "Sim, estão otimizados para edição de vídeos curtos e conteúdo de redes sociais." },
          { q: "Com que frequência novos sons ou memes são adicionados?", a: "O Clipnexo atualiza as bibliotecas periodicamente. As categorias e a quantidade de conteúdo disponível continuam crescendo." },
          { q: "Preciso criar uma conta para baixar?", a: "Não. Você pode explorar, reproduzir e baixar sem se cadastrar." },
        ],
      },
    },
  },
];

// Editorial backlog: future blog post slugs planned for the content-creator positioning.
export const blogBacklog: BlogSlugKey[] = [
  "crear-guiones-videos-cortos",
  "generar-ideas-reels",
  "escribir-titulos-youtube",
  "descripciones-optimizadas-youtube",
  "etiquetas-youtube",
  "posts-facebook-vender",
  "textos-facebook-marketplace",
  "contador-caracteres-redes-sociales",
  "herramientas-creador-principiante",
  "tiktok-reels-shorts-donde-publicar",
];

export function getBlogPostBySlug(slug: string, lang: string): BlogPost | undefined {
  const currentLang = normalizeLang(lang) as SupportedLang;
  return blogPosts.find((post) => post.slugs[currentLang] === slug);
}

export function getBlogPostBySlugKey(slugKey: BlogSlugKey): BlogPost | undefined {
  return blogPosts.find((p) => p.slugKey === slugKey);
}

export function getBlogUrl(post: BlogPost, lang: string): string {
  const currentLang = normalizeLang(lang) as SupportedLang;
  return `/${currentLang}/blog/${post.slugs[currentLang]}`;
}

export function getAbsoluteBlogUrl(post: BlogPost, lang: string): string {
  return `${SITE_URL}${getBlogUrl(post, lang)}`;
}

export function getBlogAlternates(post: BlogPost) {
  const langs = ["es", "en", "pt"] as SupportedLang[];
  const alternates: Record<string, string> = {};
  for (const l of langs) {
    alternates[l] = getAbsoluteBlogUrl(post, l);
  }
  alternates["x-default"] = getAbsoluteBlogUrl(post, "es");
  return alternates;
}

export function getAllBlogSlugs(): { slug: string; lang: SupportedLang }[] {
  const slugs: { slug: string; lang: SupportedLang }[] = [];
  const langs = ["es", "en", "pt"] as SupportedLang[];
  for (const post of blogPosts) {
    for (const lang of langs) {
      slugs.push({ slug: post.slugs[lang], lang });
    }
  }
  return slugs;
}

export function getBlogCategoryLabel(categoryKey: string, lang: string): string {
  const currentLang = normalizeLang(lang) as SupportedLang;
  const cat = blogCategories.find((c) => c.key === categoryKey);
  return cat ? cat.label[currentLang] : categoryKey;
}

export function getBlogPostsByLang(lang: string): (BlogPost & { langSlug: string })[] {
  const currentLang = normalizeLang(lang) as SupportedLang;
  return blogPosts.map((post) => ({
    ...post,
    langSlug: post.slugs[currentLang],
  }));
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return post.relatedPostKeys
    .map((key) => getBlogPostBySlugKey(key))
    .filter((p): p is BlogPost => p !== undefined);
}

export function isBlogSlugAvailable(slug: string, lang: string): boolean {
  const currentLang = normalizeLang(lang) as SupportedLang;
  return !blogPosts.some((post) => post.slugs[currentLang] === slug);
}
