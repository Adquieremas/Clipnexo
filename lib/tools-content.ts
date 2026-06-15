import type { Metadata } from "next";
import {
  getLocalizedRoute,
  normalizeLang,
  type RouteKey,
  type SupportedLang,
} from "@/lib/routes";
import { buildSeoMetadata, getSeoLanguages } from "@/lib/seo";

export type ToolKey =
  | "tiktokBio"
  | "tiktokIdeas"
  | "tiktokHooks"
  | "tiktokCaptions"
  | "tiktokHashtags"
  | "shortVideoTitleHashtag"
  | "socialMediaTextGenerator"
  | "youtubeTagGenerator"
  | "youtubeTagExtractor"
  | "youtubeHashtagGenerator"
  | "youtubeHashtagExtractor"
  | "youtubeTitleGenerator"
  | "youtubeTitleExtractor"
  | "youtubeTitleLengthChecker"
  | "youtubeDescriptionGenerator"
  | "youtubeDescriptionExtractor"
  | "youtubeTitleCapitalization"
  | "youtubeEmbedCodeGenerator"
  | "youtubeTimestampLinkGenerator"
  | "youtubeSubscribeLinkGenerator"
  | "youtubeThumbnailDownloader"
  | "youtubeMoneyCalculator"
  | "youtubeViewRatioCalculator"
  | "instagramCaptionGenerator"
  | "instagramHashtagGenerator"
  | "instagramBioGenerator"
  | "instagramReelsIdeas"
  | "instagramReelsHooks"
  | "facebookPostGenerator"
  | "facebookAdGenerator"
  | "marketplaceTextGenerator"
  | "shortVideoScriptGenerator"
  | "socialMediaCharacterCounter"
  | "wordCounter"
  | "caseConverter"
  | "outlineGenerator"
  | "assignmentTitleGenerator"
  | "introductionGenerator"
  | "conclusionGenerator"
  | "textSummarizer"
  | "textParaphraser"
  | "apaCitationGenerator"
  | "textCorrector"
  | "pdfToText"
  | "textToPdf"
  | "pomodoroTimer"
  | "gradeAverageCalculator"
  | "studyScheduleGenerator"
  | "usernameGenerator"
  | "contentCalendarGenerator";

export type ToolPageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  howTitle: string;
  howSteps: string[];
  purposeTitle: string;
  purposeText: string;
  tipsTitle: string;
  tips: string[];
  moreToolsTitle: string;
  moreToolsIntro: string;
  faqTitle: string;
  faqs: Array<{
    q: string;
    a: string;
  }>;
};

export type ToolConfig = {
  routeKey: ToolKey;
  publishedAt?: string;
  updatedAt?: string;
  content: Record<SupportedLang, ToolPageContent>;
};

export const DEFAULT_PUBLISHED_AT = "2026-05-06T00:00:00.000Z";
export const DEFAULT_UPDATED_AT = "2026-05-06T00:00:00.000Z";

export const toolKeys = [
  "tiktokBio",
  "tiktokIdeas",
  "tiktokHooks",
  "tiktokCaptions",
  "tiktokHashtags",
  "shortVideoTitleHashtag",
  "socialMediaTextGenerator",
  "youtubeTagGenerator",
  "youtubeTagExtractor",
  "youtubeHashtagGenerator",
  "youtubeHashtagExtractor",
  "youtubeTitleGenerator",
  "youtubeTitleExtractor",
  "youtubeTitleLengthChecker",
  "youtubeDescriptionGenerator",
  "youtubeDescriptionExtractor",
  "youtubeTitleCapitalization",
  "youtubeEmbedCodeGenerator",
  "youtubeTimestampLinkGenerator",
  "youtubeSubscribeLinkGenerator",
  "youtubeThumbnailDownloader",
  "youtubeMoneyCalculator",
  "youtubeViewRatioCalculator",
  "instagramCaptionGenerator",
  "instagramHashtagGenerator",
  "instagramBioGenerator",
  "instagramReelsIdeas",
  "instagramReelsHooks",
  "facebookPostGenerator",
  "facebookAdGenerator",
  "marketplaceTextGenerator",
  "shortVideoScriptGenerator",
  "socialMediaCharacterCounter",
  "wordCounter",
  "caseConverter",
  "outlineGenerator",
  "assignmentTitleGenerator",
  "introductionGenerator",
  "conclusionGenerator",
  "textSummarizer",
  "textParaphraser",
  "apaCitationGenerator",
  "textCorrector",
  "pdfToText",
  "textToPdf",
  "pomodoroTimer",
  "gradeAverageCalculator",
  "studyScheduleGenerator",
  "usernameGenerator",
  "contentCalendarGenerator",
] as const satisfies readonly ToolKey[];

const ogLocales: Record<SupportedLang, string> = {
  es: "es_PE",
  en: "en_US",
  pt: "pt_PT",
};

const baseToolsContent: Partial<Record<ToolKey, ToolConfig>> = {
  tiktokBio: {
    routeKey: "tiktokBio",
    content: {
      es: {
        metaTitle: "Generador de bio para TikTok gratis online",
        metaDescription:
          "Crea bios para TikTok gratis según tu estilo, nicho o marca en Clipnexo. Genera ideas rápidas y profesionales para mejorar tu perfil de TikTok en",
        h1: "Generador de bio para TikTok",
        lead:
          "Escribe una palabra clave, elige tu nicho y crea bios cortas para mejorar tu perfil de TikTok sin instalar nada.",
        howTitle: "Cómo usar el generador de bio para TikTok",
        howSteps: [
          "Escribe tu nombre, marca o palabra clave principal.",
          "Selecciona un nicho y el tono que quieres transmitir.",
          "Haz clic en generar y revisa las bios sugeridas.",
          "Copia una bio o copia todas para compararlas antes de publicar.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para crear una bio clara y rápida cuando quieres explicar quién eres, qué haces o qué tipo de contenido publicas en TikTok.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Usa una palabra clave concreta en lugar de una frase muy larga.",
          "Elige un tono que coincida con tu contenido real.",
          "Combina tu nicho con una promesa simple para que el perfil sea fácil de entender.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "También puedes generar ideas, captions, hashtags y títulos para planificar mejor tus videos cortos.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Las bios se guardan en el servidor?",
            a: "No. La generación ocurre en tu navegador y no guardamos tus datos en un servidor.",
          },
          {
            q: "¿Puedo usar estas bios para una marca?",
            a: "Sí. Puedes adaptarlas para una cuenta personal, negocio, tienda o marca de contenido.",
          },
          {
            q: "¿La herramienta requiere una API externa?",
            a: "No. Funciona con lógica local, por eso carga rápido y es compatible con Vercel.",
          },
        ],
      },
      en: {
        metaTitle: "Free TikTok Bio Generator Online",
        metaDescription:
          "Create TikTok bio ideas for your profile, niche or brand on Clipnexo. Generate short, clear and catchy bios in seconds with our free online tools for creators.",
        h1: "TikTok Bio Generator",
        lead:
          "Enter a keyword, choose your niche and generate short TikTok bio ideas ready to copy.",
        howTitle: "How to use the TikTok bio generator",
        howSteps: [
          "Type your name, brand or main keyword.",
          "Choose a niche and the tone you want for your profile.",
          "Click generate and review the suggested bios.",
          "Copy one bio or copy all ideas to compare them.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "Use it to quickly describe who you are, what you do and what people can expect from your TikTok profile.",
        tipsTitle: "Tips for better results",
        tips: [
          "Use a specific keyword instead of a long sentence.",
          "Pick a tone that matches the content you actually post.",
          "Combine your niche with a simple promise so the profile is easy to understand.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "You can also generate video ideas, captions, hashtags and titles for your short videos.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Are the bios saved on a server?",
            a: "No. The tool runs in your browser and does not save your input on a server.",
          },
          {
            q: "Can I use these bios for a brand?",
            a: "Yes. You can adapt them for a personal profile, business, shop or creator brand.",
          },
          {
            q: "Does this tool require an external API?",
            a: "No. It uses local logic, so it is fast and compatible with Vercel.",
          },
        ],
      },
      pt: {
        metaTitle: "Gerador de bio para TikTok grátis online",
        metaDescription:
          "Crie bios para TikTok de acordo com seu estilo, nicho ou marca no Clipnexo. Gere ideias rápidas e atraentes para melhorar seu perfil do TikTok em",
        h1: "Gerador de bio para TikTok",
        lead:
          "Digite uma palavra-chave, escolha seu nicho e gere bios curtas para melhorar seu perfil no TikTok.",
        howTitle: "Como usar o gerador de bio para TikTok",
        howSteps: [
          "Digite seu nome, marca ou palavra-chave principal.",
          "Escolha um nicho e o tom que deseja transmitir.",
          "Clique em gerar e revise as bios sugeridas.",
          "Copie uma bio ou copie todas para comparar antes de publicar.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Ela ajuda a criar uma bio clara quando você quer explicar quem é, o que faz ou que tipo de conteúdo publica no TikTok.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Use uma palavra-chave específica em vez de uma frase longa.",
          "Escolha um tom que combine com seu conteúdo real.",
          "Una seu nicho a uma promessa simples para deixar o perfil fácil de entender.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Você também pode gerar ideias, legendas, hashtags e títulos para planejar melhor seus vídeos curtos.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "As bios ficam salvas no servidor?",
            a: "Não. A geração acontece no navegador e não salvamos seus dados em um servidor.",
          },
          {
            q: "Posso usar essas bios para uma marca?",
            a: "Sim. Você pode adaptar as ideias para perfil pessoal, negócio, loja ou marca de conteúdo.",
          },
          {
            q: "A ferramenta exige uma API externa?",
            a: "Não. Ela usa lógica local, por isso é rápida e compatível com Vercel.",
          },
        ],
      },
    },
  },
  tiktokIdeas: {
    routeKey: "tiktokIdeas",
    content: {
      es: {
        metaTitle: "Ideas para videos de TikTok gratis online",
        metaDescription:
          "Genera ideas para videos de TikTok según tu nicho en Clipnexo. Encuentra temas rápidos para crear contenido atractivo y publicar más fácil en todas tus redes.",
        h1: "Ideas para videos de TikTok",
        lead:
          "Genera ideas rápidas para publicar más seguido en TikTok según tu nicho, tema y tipo de contenido.",
        howTitle: "Cómo usar el generador de ideas",
        howSteps: [
          "Escribe el nicho o tema principal de tu cuenta.",
          "Selecciona el tipo de contenido que quieres crear.",
          "Genera ideas y elige las que mejor encajen con tu calendario.",
          "Copia cada idea para convertirla en guion, caption o lista de tareas.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para desbloquear temas de video cuando quieres publicar con más constancia sin depender de inspiración de último minuto.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Usa nichos específicos como recetas saludables o finanzas para freelancers.",
          "Cambia el tipo de contenido para obtener enfoques educativos, virales o de ventas.",
          "Guarda las ideas que puedas grabar con recursos que ya tienes.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "Después de elegir una idea, puedes generar hooks, captions y hashtags para terminar la publicación.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Las ideas son únicas cada vez?",
            a: "La herramienta combina plantillas locales con tu tema para crear listas útiles y rápidas.",
          },
          {
            q: "¿Sirve para cuentas pequeñas?",
            a: "Sí. Es útil para creadores nuevos, marcas personales y negocios que necesitan publicar con orden.",
          },
          {
            q: "¿Necesito iniciar sesión?",
            a: "No. Puedes generar y copiar ideas directamente desde el navegador.",
          },
        ],
      },
      en: {
        metaTitle: "Free TikTok Video Ideas for Creators",
        metaDescription:
          "Generate TikTok video ideas by niche or topic on Clipnexo. Find quick content ideas to create videos faster and easier for your social media channels today.",
        h1: "TikTok Video Ideas",
        lead:
          "Create quick TikTok video ideas by niche, topic and content type so you can publish more consistently.",
        howTitle: "How to use the idea generator",
        howSteps: [
          "Enter the niche or topic for your account.",
          "Choose the type of content you want to create.",
          "Generate ideas and pick the best ones for your content calendar.",
          "Copy each idea and turn it into a script, caption or checklist.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "Use it when you need fresh video topics and want to avoid waiting for last-minute inspiration.",
        tipsTitle: "Tips for better results",
        tips: [
          "Use specific niches like healthy recipes or finance for freelancers.",
          "Change the content type to get educational, viral or sales angles.",
          "Save ideas you can record with the resources you already have.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "After choosing an idea, generate hooks, captions and hashtags to finish the post.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Are the ideas different each time?",
            a: "The tool combines local templates with your topic to create useful and quick lists.",
          },
          {
            q: "Does it work for small accounts?",
            a: "Yes. It helps new creators, personal brands and businesses publish with more structure.",
          },
          {
            q: "Do I need to sign in?",
            a: "No. You can generate and copy ideas directly in your browser.",
          },
        ],
      },
      pt: {
        metaTitle: "Ideias para vídeos do TikTok grátis online",
        metaDescription:
          "Gere ideias para vídeos do TikTok por nicho ou tema no Clipnexo. Encontre sugestões rápidas para criar conteúdo com mais facilidade em suas redes sociais.",
        h1: "Ideias para vídeos do TikTok",
        lead:
          "Gere ideias rápidas para publicar com mais frequência no TikTok de acordo com seu nicho e tipo de conteúdo.",
        howTitle: "Como usar o gerador de ideias",
        howSteps: [
          "Digite o nicho ou tema principal da sua conta.",
          "Escolha o tipo de conteúdo que deseja criar.",
          "Gere ideias e selecione as melhores para seu calendário.",
          "Copie cada ideia para transformar em roteiro, legenda ou checklist.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Ela serve para encontrar temas de vídeo quando você quer publicar com constância sem depender de inspiração de última hora.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Use nichos específicos como receitas saudáveis ou finanças para freelancers.",
          "Altere o tipo de conteúdo para obter enfoques educativos, virais ou de venda.",
          "Guarde ideias que possa gravar com recursos que já tem.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Depois de escolher uma ideia, gere ganchos, legendas e hashtags para finalizar a publicação.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "As ideias mudam a cada geração?",
            a: "A ferramenta combina modelos locais com seu tema para criar listas úteis e rápidas.",
          },
          {
            q: "Funciona para contas pequenas?",
            a: "Sim. Ajuda criadores iniciantes, marcas pessoais e negócios a publicar com mais organização.",
          },
          {
            q: "Preciso fazer login?",
            a: "Não. Você pode gerar e copiar ideias diretamente no navegador.",
          },
        ],
      },
    },
  },
  tiktokHooks: {
    routeKey: "tiktokHooks",
    content: {
      es: {
        metaTitle: "Ganchos virales para TikTok gratis online",
        metaDescription:
          "Crea frases iniciales para captar atención en TikTok con Clipnexo. Genera ganchos virales para videos cortos en segundos y mejora tu retención de audiencia.",
        h1: "Ganchos virales para TikTok",
        lead:
          "Crea frases iniciales breves para captar atención en los primeros segundos de tus videos de TikTok.",
        howTitle: "Cómo usar el generador de ganchos",
        howSteps: [
          "Escribe el tema central de tu video.",
          "Elige el estilo de gancho que quieres probar.",
          "Genera frases iniciales y quédate con las más naturales.",
          "Copia un gancho y úsalo al inicio del guion o del caption.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para abrir tus videos con una frase más clara, curiosa o directa y aumentar la probabilidad de que la audiencia siga mirando.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Haz que el gancho prometa un beneficio concreto.",
          "Evita exagerar si el video no cumple lo que promete.",
          "Prueba varios estilos y compara cuál retiene mejor a tu audiencia.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "Combina estos ganchos con ideas, captions y hashtags para armar una publicación completa.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Los ganchos son para decirlos en voz alta?",
            a: "Sí. También puedes usarlos como texto en pantalla o como primera línea del caption.",
          },
          {
            q: "¿Qué estilo conviene elegir?",
            a: "Depende del video. El educativo funciona bien para tutoriales y el curioso para temas de descubrimiento.",
          },
          {
            q: "¿La herramienta analiza mi cuenta?",
            a: "No. Solo genera ideas locales a partir del tema que escribes.",
          },
        ],
      },
      en: {
        metaTitle: "Free TikTok Hook Generator Online",
        metaDescription:
          "Generate catchy TikTok hooks to grab attention in the first seconds of your videos on Clipnexo. Quick ideas ready to copy and improve your video retention.",
        h1: "TikTok Hook Generator",
        lead:
          "Generate short opening lines to grab attention in the first seconds of your TikTok videos.",
        howTitle: "How to use the hook generator",
        howSteps: [
          "Type the main topic of your video.",
          "Choose the hook style you want to test.",
          "Generate opening lines and keep the most natural ones.",
          "Copy a hook and use it at the start of your script or caption.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "Use it to start your videos with a clearer, more curious or more direct line that encourages viewers to keep watching.",
        tipsTitle: "Tips for better results",
        tips: [
          "Make the hook promise a concrete benefit.",
          "Avoid overpromising if the video does not deliver.",
          "Test different styles and compare which one keeps viewers longer.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "Combine these hooks with ideas, captions and hashtags to build a complete post.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Can I say these hooks out loud?",
            a: "Yes. You can also use them as on-screen text or as the first caption line.",
          },
          {
            q: "Which style should I choose?",
            a: "It depends on the video. Educational works well for tutorials, while curious fits discovery topics.",
          },
          {
            q: "Does the tool analyze my account?",
            a: "No. It generates local ideas from the topic you enter.",
          },
        ],
      },
      pt: {
        metaTitle: "Ganchos virais para TikTok grátis online",
        metaDescription:
          "Crie frases iniciais para chamar atenção no TikTok no Clipnexo. Gere ganchos virais para vídeos curtos em segundos e aumente a retenção de seus seguidores.",
        h1: "Ganchos virais para TikTok",
        lead:
          "Crie frases iniciais curtas para chamar atenção nos primeiros segundos dos seus vídeos do TikTok.",
        howTitle: "Como usar o gerador de ganchos",
        howSteps: [
          "Digite o tema principal do seu vídeo.",
          "Escolha o estilo de gancho que deseja testar.",
          "Gere frases iniciais e selecione as mais naturais.",
          "Copie um gancho e use no início do roteiro ou da legenda.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Ela ajuda a começar seus vídeos com uma frase mais clara, curiosa ou direta para incentivar o público a continuar assistindo.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Faça o gancho prometer um benefício concreto.",
          "Evite exagerar se o vídeo não entregar a promessa.",
          "Teste estilos diferentes e compare qual retém melhor a audiência.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Combine estes ganchos com ideias, legendas e hashtags para montar uma publicação completa.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "Posso falar esses ganchos no vídeo?",
            a: "Sim. Você também pode usá-los como texto na tela ou primeira linha da legenda.",
          },
          {
            q: "Qual estilo devo escolher?",
            a: "Depende do vídeo. O educativo combina com tutoriais e o curioso funciona bem para descobertas.",
          },
          {
            q: "A ferramenta analisa minha conta?",
            a: "Não. Ela gera ideias locais a partir do tema que você digita.",
          },
        ],
      },
    },
  },
  tiktokCaptions: {
    routeKey: "tiktokCaptions",
    content: {
      es: {
        metaTitle: "Generador de captions para TikTok",
        metaDescription:
          "Crea captions para TikTok gratis según el tema de tu video en Clipnexo. Genera descripciones rápidas, atractivas y listas para copiar en segundos ahora mismo.",
        h1: "Generador de captions para TikTok",
        lead:
          "Crea captions cortos para TikTok según el tema de tu video, el tono y si quieres incluir hashtags.",
        howTitle: "Cómo usar el generador de captions",
        howSteps: [
          "Escribe el tema o idea principal del video.",
          "Elige el tono que mejor encaje con tu audiencia.",
          "Activa hashtags si quieres recibir captions con etiquetas.",
          "Copia la opción que mejor acompañe tu video.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para crear descripciones rápidas cuando ya tienes el video listo y necesitas una frase clara para publicarlo.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Menciona el beneficio o emoción principal del video.",
          "Usa captions breves si el video ya tiene mucho texto en pantalla.",
          "Añade hashtags solo cuando aporten contexto y no saturen la descripción.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "Puedes completar tu publicación con hashtags, títulos y ganchos generados en Clipnexo.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Puedo generar captions sin hashtags?",
            a: "Sí. Solo desactiva la opción de hashtags antes de generar resultados.",
          },
          {
            q: "¿Los captions sirven para Reels o Shorts?",
            a: "Sí. Aunque están pensados para TikTok, puedes adaptarlos a otras plataformas de video corto.",
          },
          {
            q: "¿La herramienta publica por mí?",
            a: "No. Solo genera texto para copiar y pegar en la plataforma que prefieras.",
          },
        ],
      },
      en: {
        metaTitle: "Free TikTok Caption Generator Online",
        metaDescription:
          "Create TikTok captions based on your video topic on Clipnexo. Generate short, engaging descriptions ready to copy and paste for your next viral video post.",
        h1: "TikTok Caption Generator",
        lead:
          "Create short TikTok captions based on your video topic, tone and optional hashtags.",
        howTitle: "How to use the caption generator",
        howSteps: [
          "Enter the topic or main idea of your video.",
          "Choose the tone that best fits your audience.",
          "Turn hashtags on if you want captions with tags.",
          "Copy the option that best supports your video.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "Use it when your video is ready and you need a clear, quick description before publishing.",
        tipsTitle: "Tips for better results",
        tips: [
          "Mention the main benefit or emotion of the video.",
          "Use short captions if your video already has a lot of on-screen text.",
          "Add hashtags only when they give context and do not overload the caption.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "Finish your post with hashtags, titles and hooks generated in Clipnexo.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Can I generate captions without hashtags?",
            a: "Yes. Turn the hashtag option off before generating results.",
          },
          {
            q: "Can I use these captions for Reels or Shorts?",
            a: "Yes. They are made for TikTok, but you can adapt them to other short video platforms.",
          },
          {
            q: "Does the tool publish for me?",
            a: "No. It only generates text you can copy and paste where you prefer.",
          },
        ],
      },
      pt: {
        metaTitle: "Gerador de legendas para TikTok",
        metaDescription:
          "Crie legendas para TikTok com base no tema do vídeo no Clipnexo. Gere descrições rápidas, atrativas e prontas para copiar em suas redes sociais favoritas.",
        h1: "Gerador de legendas para TikTok",
        lead:
          "Crie legendas curtas para TikTok de acordo com o tema do vídeo, o tom e a opção de incluir hashtags.",
        howTitle: "Como usar o gerador de legendas",
        howSteps: [
          "Digite o tema ou ideia principal do vídeo.",
          "Escolha o tom que combina melhor com sua audiência.",
          "Ative hashtags se quiser legendas com etiquetas.",
          "Copie a opção que melhor acompanha seu vídeo.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Ela serve para criar descrições rápidas quando o vídeo já está pronto e você precisa de uma frase clara para publicar.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Mencione o benefício ou emoção principal do vídeo.",
          "Use legendas curtas se o vídeo já tiver muito texto na tela.",
          "Adicione hashtags apenas quando trouxerem contexto e não sobrecarregarem a descrição.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Complete sua publicação com hashtags, títulos e ganchos gerados no Clipnexo.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "Posso gerar legendas sem hashtags?",
            a: "Sim. Basta desativar a opção de hashtags antes de gerar os resultados.",
          },
          {
            q: "As legendas servem para Reels ou Shorts?",
            a: "Sim. Elas são pensadas para TikTok, mas podem ser adaptadas para outras plataformas.",
          },
          {
            q: "A ferramenta publica por mim?",
            a: "Não. Ela apenas gera texto para copiar e colar onde preferir.",
          },
        ],
      },
    },
  },
  tiktokHashtags: {
    routeKey: "tiktokHashtags",
    content: {
      es: {
        metaTitle: "Generador de hashtags para TikTok",
        metaDescription:
          "Genera hashtags para TikTok según tu tema o nicho en Clipnexo. Encuentra etiquetas para videos, captions y contenido corto para mejorar tu alcance viral.",
        h1: "Generador de hashtags para TikTok",
        lead:
          "Crea listas limpias de hashtags para TikTok según tu tema, nicho y cantidad de etiquetas.",
        howTitle: "Cómo usar el generador de hashtags",
        howSteps: [
          "Escribe el tema o palabra clave principal de tu video.",
          "Selecciona un nicho para recibir etiquetas más enfocadas.",
          "Elige la cantidad de hashtags que necesitas.",
          "Copia todos los hashtags y pégalos en tu caption.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para crear grupos de hashtags sin duplicados y con formato limpio, listos para usar en videos cortos.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Combina hashtags generales con otros más específicos de tu nicho.",
          "Evita usar demasiadas etiquetas si el caption ya es largo.",
          "Revisa que cada hashtag represente el contenido real del video.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "También puedes generar captions, títulos y ganchos para acompañar tus hashtags.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿La herramienta elimina acentos?",
            a: "Sí. Convierte palabras con acentos a un formato de hashtag simple y sin espacios.",
          },
          {
            q: "¿Evita hashtags repetidos?",
            a: "Sí. La lista final elimina duplicados antes de mostrar los resultados.",
          },
          {
            q: "¿Los hashtags garantizan viralidad?",
            a: "No. Ayudan a ordenar el tema del contenido, pero el rendimiento depende de muchos factores.",
          },
        ],
      },
      en: {
        metaTitle: "Free TikTok Hashtag Generator Online for Reach",
        metaDescription:
          "Generate TikTok hashtags by topic or niche on Clipnexo. Find tags for captions, short videos and social content to improve your discoverability online now.",
        h1: "TikTok Hashtag Generator",
        lead:
          "Create clean TikTok hashtag lists by topic, niche and number of tags.",
        howTitle: "How to use the hashtag generator",
        howSteps: [
          "Enter the main topic or keyword for your video.",
          "Choose a niche to get more focused tags.",
          "Select how many hashtags you need.",
          "Copy all hashtags and paste them into your caption.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "Use it to create duplicate-free hashtag groups with clean formatting for short videos.",
        tipsTitle: "Tips for better results",
        tips: [
          "Combine broad hashtags with more specific niche tags.",
          "Avoid too many tags if the caption is already long.",
          "Make sure each hashtag matches the actual video content.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "You can also generate captions, titles and hooks to support your hashtags.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Does the tool remove accents?",
            a: "Yes. It turns accented words into a simple hashtag format without spaces.",
          },
          {
            q: "Does it avoid repeated hashtags?",
            a: "Yes. The final list removes duplicates before showing results.",
          },
          {
            q: "Do hashtags guarantee viral reach?",
            a: "No. They help describe the content, but performance depends on many factors.",
          },
        ],
      },
      pt: {
        metaTitle: "Gerador de hashtags para TikTok",
        metaDescription:
          "Gere hashtags para TikTok por tema ou nicho no Clipnexo. Encontre etiquetas para vídeos, legendas e conteúdo curto para aumentar seu alcance viral hoje.",
        h1: "Gerador de hashtags para TikTok",
        lead:
          "Crie listas limpas de hashtags para TikTok por tema, nicho e quantidade de etiquetas.",
        howTitle: "Como usar o gerador de hashtags",
        howSteps: [
          "Digite o tema ou palavra-chave principal do vídeo.",
          "Escolha um nicho para receber etiquetas mais focadas.",
          "Selecione a quantidade de hashtags que precisa.",
          "Copie todos os hashtags e cole na legenda.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Ela serve para criar grupos de hashtags sem duplicados e com formato limpo para vídeos curtos.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Combine hashtags gerais com outras mais específicas do nicho.",
          "Evite muitas etiquetas se a legenda já for longa.",
          "Confira se cada hashtag representa o conteúdo real do vídeo.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Você também pode gerar legendas, títulos e ganchos para acompanhar suas hashtags.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "A ferramenta remove acentos?",
            a: "Sim. Ela converte palavras com acentos para um formato simples de hashtag sem espaços.",
          },
          {
            q: "Evita hashtags repetidas?",
            a: "Sim. A lista final remove duplicados antes de mostrar os resultados.",
          },
          {
            q: "Hashtags garantem viralização?",
            a: "Não. Elas ajudam a descrever o conteúdo, mas o desempenho depende de vários fatores.",
          },
        ],
      },
    },
  },
  shortVideoTitleHashtag: {
    routeKey: "shortVideoTitleHashtag",
    content: {
      es: {
        metaTitle: "Títulos y hashtags para videos cortos gratis en",
        metaDescription:
          "Genera títulos y hashtags para TikTok, Reels y Shorts en Clipnexo. Crea ideas rápidas para mejorar tus videos cortos y aumentar tu audiencia en segundos.",
        h1: "Títulos y hashtags para videos cortos",
        lead:
          "Genera títulos y hashtags para videos cortos en TikTok, Reels, Shorts o cualquier plataforma.",
        howTitle: "Cómo usar el generador de títulos y hashtags",
        howSteps: [
          "Escribe el tema del video que quieres publicar.",
          "Selecciona la plataforma y el tono de la publicación.",
          "Genera títulos y hashtags en un solo paso.",
          "Copia títulos, hashtags o todo el bloque para organizar tu publicación.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para preparar el texto principal de un video corto cuando quieres probar diferentes títulos y etiquetas antes de publicar.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Elige la plataforma principal para adaptar mejor el enfoque.",
          "Usa títulos claros si el video explica un proceso o tutorial.",
          "Combina hashtags de plataforma con etiquetas del tema específico.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "Si necesitas más variantes, prueba el generador de captions, hashtags o ganchos virales.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Funciona para Reels y Shorts?",
            a: "Sí. Puedes elegir la plataforma o usar la opción general para videos cortos.",
          },
          {
            q: "¿Puedo copiar solo los títulos?",
            a: "Sí. La herramienta incluye botones para copiar títulos, hashtags o todo el resultado.",
          },
          {
            q: "¿Usa procesamiento pesado?",
            a: "No. Todo se genera con lógica local en el navegador.",
          },
        ],
      },
      en: {
        metaTitle: "Short Video Title and Hashtag Generator Online",
        metaDescription:
          "Generate titles and hashtags for TikTok, Reels and Shorts on Clipnexo. Create quick ideas for your short videos to improve your social media engagement.",
        h1: "Short Video Title and Hashtag Generator",
        lead:
          "Generate titles and hashtags for short videos on TikTok, Reels, Shorts or any short-form platform.",
        howTitle: "How to use the title and hashtag generator",
        howSteps: [
          "Enter the topic of the video you want to publish.",
          "Choose the platform and the tone for the post.",
          "Generate titles and hashtags in one step.",
          "Copy titles, hashtags or the full block to organize your post.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "Use it to prepare the main text for a short video when you want different title and tag options before publishing.",
        tipsTitle: "Tips for better results",
        tips: [
          "Choose the main platform to adapt the angle.",
          "Use clear titles if the video explains a process or tutorial.",
          "Combine platform hashtags with tags for the specific topic.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "Need more variations? Try the caption, hashtag or viral hook generators.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Does it work for Reels and Shorts?",
            a: "Yes. You can choose the platform or use the general option for short videos.",
          },
          {
            q: "Can I copy only the titles?",
            a: "Yes. The tool includes buttons to copy titles, hashtags or the full result.",
          },
          {
            q: "Does it use heavy processing?",
            a: "No. Everything is generated with local browser logic.",
          },
        ],
      },
      pt: {
        metaTitle: "Títulos e hashtags para vídeos curtos grátis no",
        metaDescription:
          "Gere títulos e hashtags para TikTok, Reels e Shorts no Clipnexo. Crie ideias rápidas para melhorar seus vídeos curtos e aumentar seu engajamento online.",
        h1: "Títulos e hashtags para vídeos curtos",
        lead:
          "Gere títulos e hashtags para vídeos curtos no TikTok, Reels, Shorts ou qualquer plataforma.",
        howTitle: "Como usar o gerador de títulos e hashtags",
        howSteps: [
          "Digite o tema do vídeo que deseja publicar.",
          "Escolha a plataforma e o tom da publicação.",
          "Gere títulos e hashtags em um só passo.",
          "Copie títulos, hashtags ou todo o bloco para organizar a publicação.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Ela serve para preparar o texto principal de um vídeo curto quando você quer testar títulos e etiquetas antes de publicar.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Escolha a plataforma principal para adaptar melhor o enfoque.",
          "Use títulos claros se o vídeo explica um processo ou tutorial.",
          "Combine hashtags da plataforma com etiquetas do tema específico.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Se precisar de mais variações, teste o gerador de legendas, hashtags ou ganchos virais.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "Funciona para Reels e Shorts?",
            a: "Sim. Você pode escolher a plataforma ou usar a opção geral para vídeos curtos.",
          },
          {
            q: "Posso copiar apenas os títulos?",
            a: "Sim. A ferramenta inclui botões para copiar títulos, hashtags ou todo o resultado.",
          },
          {
            q: "Usa processamento pesado?",
            a: "Não. Tudo é gerado com lógica local no navegador.",
          },
        ],
      },
    },
  },
};

import { extraToolsContent } from "./tools-extra-content";

export const toolsContent: Record<ToolKey, ToolConfig> = {
  ...baseToolsContent,
  ...extraToolsContent,
} as Record<ToolKey, ToolConfig>;

const primaryLinks: Record<SupportedLang, Array<{ routeKey: RouteKey; label: string }>> = {
  es: [
    { routeKey: "video", label: "Descargar videos de TikTok" },
    { routeKey: "mp3", label: "TikTok a MP3" },
    { routeKey: "withoutWatermark", label: "TikTok sin marca de agua" },
    { routeKey: "tiktokHashtags", label: "Generador de hashtags para TikTok" },
    { routeKey: "tiktokCaptions", label: "Generador de captions para TikTok" },
    { routeKey: "tiktokHooks", label: "Ganchos virales para TikTok" },
    { routeKey: "tiktokIdeas", label: "Ideas para TikTok" },
    { routeKey: "tiktokBio", label: "Generador de bio para TikTok" },
    {
      routeKey: "shortVideoTitleHashtag",
      label: "Títulos y hashtags para videos cortos",
    },
    { routeKey: "wordCounter", label: "Contador de palabras y caracteres" },
    { routeKey: "caseConverter", label: "Convertidor de mayúsculas y minúsculas" },
    { routeKey: "outlineGenerator", label: "Generador de índice para trabajos" },
    { routeKey: "assignmentTitleGenerator", label: "Generador de títulos para trabajos" },
    { routeKey: "introductionGenerator", label: "Generador de introducciones" },
    { routeKey: "conclusionGenerator", label: "Generador de conclusiones" },
    { routeKey: "studentsTools", label: "Herramientas para estudiantes" },
  ],
  en: [
    { routeKey: "video", label: "TikTok video downloader" },
    { routeKey: "mp3", label: "TikTok to MP3" },
    { routeKey: "withoutWatermark", label: "Download TikTok without watermark" },
    { routeKey: "tiktokHashtags", label: "TikTok Hashtag Generator" },
    { routeKey: "tiktokCaptions", label: "TikTok Caption Generator" },
    { routeKey: "tiktokHooks", label: "TikTok Hook Generator" },
    { routeKey: "tiktokIdeas", label: "TikTok Video Ideas" },
    { routeKey: "tiktokBio", label: "TikTok Bio Generator" },
    {
      routeKey: "shortVideoTitleHashtag",
      label: "Short Video Title and Hashtag Generator",
    },
    { routeKey: "wordCounter", label: "Word and Character Counter" },
    { routeKey: "caseConverter", label: "Case Converter" },
    { routeKey: "outlineGenerator", label: "Outline Generator" },
    { routeKey: "assignmentTitleGenerator", label: "Assignment Title Generator" },
    { routeKey: "introductionGenerator", label: "Introduction Generator" },
    { routeKey: "conclusionGenerator", label: "Conclusion Generator" },
    { routeKey: "studentsTools", label: "Student Tools" },
  ],
  pt: [
    { routeKey: "video", label: "Baixar vídeos do TikTok" },
    { routeKey: "mp3", label: "TikTok para MP3" },
    { routeKey: "withoutWatermark", label: "Baixar TikTok sem marca d'água" },
    { routeKey: "tiktokHashtags", label: "Gerador de hashtags para TikTok" },
    { routeKey: "tiktokCaptions", label: "Gerador de legendas para TikTok" },
    { routeKey: "tiktokHooks", label: "Ganchos virais para TikTok" },
    { routeKey: "tiktokIdeas", label: "Ideias para TikTok" },
    { routeKey: "tiktokBio", label: "Gerador de bio para TikTok" },
    {
      routeKey: "shortVideoTitleHashtag",
      label: "Títulos e hashtags para vídeos curtos",
    },
    { routeKey: "wordCounter", label: "Contador de palavras e caracteres" },
    { routeKey: "caseConverter", label: "Conversor de maiúsculas e minúsculas" },
    { routeKey: "outlineGenerator", label: "Gerador de índice para trabalhos" },
    { routeKey: "assignmentTitleGenerator", label: "Gerador de títulos para trabalhos" },
    { routeKey: "introductionGenerator", label: "Gerador de introduções" },
    { routeKey: "conclusionGenerator", label: "Gerador de conclusões" },
    { routeKey: "studentsTools", label: "Ferramentas para estudantes" },
  ],
};

export function getToolPageContent(toolKey: ToolKey, lang: string) {
  const currentLang = normalizeLang(lang);
  return toolsContent[toolKey].content[currentLang];
}

export function getToolRouteKey(toolKey: ToolKey): ToolKey {
  return toolsContent[toolKey].routeKey;
}

export function getToolDates(toolKey: ToolKey) {
  const tool = toolsContent[toolKey];
  return {
    publishedAt: tool.publishedAt || DEFAULT_PUBLISHED_AT,
    updatedAt: tool.updatedAt || DEFAULT_UPDATED_AT,
  };
}

export function getToolAlternates(toolKey: ToolKey) {
  const routeKey = getToolRouteKey(toolKey);
  return getSeoLanguages(routeKey);
}

export function getToolMetadata(toolKey: ToolKey, lang: string): Metadata {
  const currentLang = normalizeLang(lang);
  const content = getToolPageContent(toolKey, currentLang);
  const routeKey = getToolRouteKey(toolKey);

  return buildSeoMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    routeKey,
    lang: currentLang,
    openGraph: {
      type: "website",
      locale: ogLocales[currentLang],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
    },
  });
}

export function getMoreToolsLinks(lang: string, currentRouteKey?: RouteKey) {
  const currentLang = normalizeLang(lang);

  return primaryLinks[currentLang]
    .filter((item) => item.routeKey !== currentRouteKey)
    .map((item) => ({
      ...item,
      href: getLocalizedRoute(item.routeKey, currentLang),
    }));
}
