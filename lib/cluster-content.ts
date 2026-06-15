import type { SupportedLang } from "./routes";

export type ClusterKey = "tiktok" | "youtube" | "instagram" | "facebook" | "shortVideo" | "socialMedia" | "students";

export type ClusterContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  howToTitle: string;
  howToSteps: string[];
  recommendedTitle: string;
  faq: { q: string; a: string }[];
};

const clusters: Record<string, Record<SupportedLang, ClusterContent>> = {
  tiktok: {
    es: {
      metaTitle: "Herramientas para TikTok gratis | Clipnexo",
      metaDescription: "Explora herramientas gratis para TikTok: descarga videos, convierte a MP3, genera hashtags, captions, bios, ideas y ganchos virales online.",
      h1: "Herramientas para TikTok gratis",
      intro: "Descubre todas las herramientas de Clipnexo para TikTok. Descarga videos sin marca de agua, conviértelos a MP3, genera hashtags, captions, bios, ideas de contenido y ganchos virales. Todo gratis y sin instalar nada.",
      howToTitle: "Cómo usar las herramientas de TikTok",
      howToSteps: [
        "Elige la herramienta que necesitas de la lista.",
        "Sigue las instrucciones de cada herramienta.",
        "Obtén tu resultado al instante y úsalo en tus publicaciones.",
      ],
      recommendedTitle: "Herramientas recomendadas para TikTok",
      faq: [
        { q: "¿Qué herramientas para TikTok ofrece Clipnexo?", a: "Clipnexo ofrece descarga de videos, conversión a MP3, generador de hashtags, captions, bios, ideas y ganchos virales, todo gratis y online." },
        { q: "¿Necesito registrarme para usar las herramientas?", a: "No, todas las herramientas son gratuitas y no requieren registro ni inicio de sesión." },
        { q: "¿Puedo descargar videos de TikTok sin marca de agua?", a: "Sí, con nuestra herramienta de descarga puedes obtener videos de TikTok sin marca de agua en alta calidad." },
        { q: "¿Cómo convierto un video de TikTok a MP3?", a: "Usa nuestra herramienta TikTok a MP3: pega el enlace del video y obtén el audio extraído al instante." },
        { q: "¿Las herramientas funcionan en dispositivos móviles?", a: "Sí, todas las herramientas son compatibles con Android, iPhone y cualquier navegador moderno." },
        { q: "¿Puedo generar hashtags para mis videos de TikTok?", a: "Sí, nuestro generador de hashtags crea etiquetas relevantes para aumentar el alcance de tus publicaciones." },
      ],
    },
    en: {
      metaTitle: "Free TikTok Tools Online | Clipnexo",
      metaDescription: "Explore free TikTok tools: download videos, convert to MP3, generate hashtags, captions, bios, video ideas and viral hooks online.",
      h1: "Free TikTok Tools",
      intro: "Discover all Clipnexo tools for TikTok. Download videos without watermark, convert to MP3, generate hashtags, captions, bios, content ideas and viral hooks. All free with no installation required.",
      howToTitle: "How to use TikTok tools",
      howToSteps: [
        "Choose the tool you need from the list.",
        "Follow the instructions for each tool.",
        "Get your result instantly and use it in your posts.",
      ],
      recommendedTitle: "Recommended TikTok tools",
      faq: [
        { q: "What TikTok tools does Clipnexo offer?", a: "Clipnexo offers video download, MP3 conversion, hashtag generator, captions, bios, ideas and viral hooks, all free and online." },
        { q: "Do I need to sign up to use the tools?", a: "No, all tools are free and require no registration or login." },
        { q: "Can I download TikTok videos without watermark?", a: "Yes, our downloader tool lets you get TikTok videos without watermark in high quality." },
        { q: "How do I convert a TikTok video to MP3?", a: "Use our TikTok to MP3 tool: paste the video link and get the extracted audio instantly." },
        { q: "Do the tools work on mobile devices?", a: "Yes, all tools work on Android, iPhone and any modern browser." },
        { q: "Can I generate hashtags for my TikTok videos?", a: "Yes, our hashtag generator creates relevant tags to boost your post reach." },
      ],
    },
    pt: {
      metaTitle: "Ferramentas para TikTok grátis | Clipnexo",
      metaDescription: "Explore ferramentas grátis para TikTok: baixe vídeos, converta para MP3, gere hashtags, legendas, bios, ideias e ganchos virais online.",
      h1: "Ferramentas para TikTok grátis",
      intro: "Descubra todas as ferramentas do Clipnexo para TikTok. Baixe vídeos sem marca d'água, converta para MP3, gere hashtags, legendas, bios, ideias de conteúdo e ganchos virais. Tudo grátis sem instalar nada.",
      howToTitle: "Como usar as ferramentas do TikTok",
      howToSteps: [
        "Escolha a ferramenta que você precisa da lista.",
        "Siga as instruções de cada ferramenta.",
        "Obtenha seu resultado instantaneamente e use em suas publicações.",
      ],
      recommendedTitle: "Ferramentas recomendadas para TikTok",
      faq: [
        { q: "Quais ferramentas para TikTok o Clipnexo oferece?", a: "O Clipnexo oferece download de vídeos, conversão para MP3, gerador de hashtags, legendas, bios, ideias e ganchos virais, tudo grátis e online." },
        { q: "Preciso me registrar para usar as ferramentas?", a: "Não, todas as ferramentas são gratuitas e não exigem registro ou login." },
        { q: "Posso baixar vídeos do TikTok sem marca d'água?", a: "Sim, com nossa ferramenta de download você obtém vídeos do TikTok sem marca d'água em alta qualidade." },
        { q: "Como converter um vídeo do TikTok para MP3?", a: "Use nossa ferramenta TikTok para MP3: cole o link do vídeo e obtenha o áudio extraído instantaneamente." },
        { q: "As ferramentas funcionam em dispositivos móveis?", a: "Sim, todas as ferramentas funcionam no Android, iPhone e qualquer navegador moderno." },
        { q: "Posso gerar hashtags para meus vídeos do TikTok?", a: "Sim, nosso gerador de hashtags cria etiquetas relevantes para aumentar o alcance das suas publicações." },
      ],
    },
  },
  youtube: {
    es: {
      metaTitle: "Herramientas de YouTube gratis | Clipnexo",
      metaDescription: "Usa herramientas gratis para YouTube: genera títulos, etiquetas, hashtags, descripciones, miniaturas, enlaces y calcula métricas útiles.",
      h1: "Herramientas de YouTube gratis",
      intro: "Explora todas las herramientas de Clipnexo para YouTube. Genera títulos, etiquetas, hashtags, descripciones, extrae información, descarga miniaturas y calcula métricas para optimizar tus videos.",
      howToTitle: "Cómo usar las herramientas de YouTube",
      howToSteps: [
        "Selecciona la herramienta que se adapte a tu necesidad.",
        "Ingresa los datos solicitados y obtén resultados al instante.",
        "Aplica los resultados a tus videos de YouTube.",
      ],
      recommendedTitle: "Herramientas recomendadas para YouTube",
      faq: [
        { q: "¿Qué herramientas para YouTube ofrece Clipnexo?", a: "Clipnexo ofrece generadores de etiquetas, hashtags, títulos, descripciones, extractores, calculadoras de métricas y descargador de miniaturas." },
        { q: "¿Cómo puedo generar etiquetas para mis videos?", a: "Usa nuestro generador de etiquetas: ingresa palabras clave y obtén etiquetas optimizadas para YouTube." },
        { q: "¿Puedo descargar miniaturas de YouTube?", a: "Sí, nuestra herramienta de descarga de miniaturas extrae la imagen en alta resolución desde cualquier video." },
        { q: "¿Cómo calculo el dinero que genera mi canal?", a: "Usa nuestra calculadora de dinero de YouTube para estimar ingresos basados en visualizaciones y métricas." },
        { q: "¿Las herramientas de YouTube son gratis?", a: "Sí, todas las herramientas son completamente gratuitas y no requieren registro." },
        { q: "¿Puedo generar enlaces de suscripción a mi canal?", a: "Sí, nuestro generador de enlaces de suscripción crea URLs personalizadas para promocionar tu canal." },
      ],
    },
    en: {
      metaTitle: "Free YouTube Tools Online | Clipnexo",
      metaDescription: "Use free YouTube tools: generate titles, tags, hashtags, descriptions, thumbnails, links and calculate useful metrics.",
      h1: "Free YouTube Tools",
      intro: "Explore all Clipnexo tools for YouTube. Generate titles, tags, hashtags, descriptions, extract info, download thumbnails and calculate metrics to optimize your videos.",
      howToTitle: "How to use YouTube tools",
      howToSteps: [
        "Select the tool that fits your need.",
        "Enter the requested data and get instant results.",
        "Apply the results to your YouTube videos.",
      ],
      recommendedTitle: "Recommended YouTube tools",
      faq: [
        { q: "What YouTube tools does Clipnexo offer?", a: "Clipnexo offers tag generators, hashtag generators, title generators, description generators, extractors, metric calculators and thumbnail downloader." },
        { q: "How can I generate tags for my videos?", a: "Use our tag generator: enter keywords and get optimized tags for YouTube." },
        { q: "Can I download YouTube thumbnails?", a: "Yes, our thumbnail downloader extracts the high-resolution image from any video." },
        { q: "How do I calculate my channel earnings?", a: "Use our YouTube money calculator to estimate revenue based on views and metrics." },
        { q: "Are the YouTube tools free?", a: "Yes, all tools are completely free and require no registration." },
        { q: "Can I generate subscribe links?", a: "Yes, our subscribe link generator creates custom URLs to promote your channel." },
      ],
    },
    pt: {
      metaTitle: "Ferramentas para YouTube grátis | Clipnexo",
      metaDescription: "Use ferramentas grátis para YouTube: gere títulos, tags, hashtags, descrições, miniaturas, links e calcule métricas úteis.",
      h1: "Ferramentas para YouTube grátis",
      intro: "Explore todas as ferramentas do Clipnexo para YouTube. Gere títulos, tags, hashtags, descrições, extraia informações, baixe miniaturas e calcule métricas para otimizar seus vídeos.",
      howToTitle: "Como usar as ferramentas do YouTube",
      howToSteps: [
        "Selecione a ferramenta que atende sua necessidade.",
        "Insira os dados solicitados e obtenha resultados instantâneos.",
        "Aplique os resultados aos seus vídeos do YouTube.",
      ],
      recommendedTitle: "Ferramentas recomendadas para YouTube",
      faq: [
        { q: "Quais ferramentas para YouTube o Clipnexo oferece?", a: "O Clipnexo oferece geradores de tags, hashtags, títulos, descrições, extratores, calculadoras de métricas e downloader de miniaturas." },
        { q: "Como gerar tags para meus vídeos?", a: "Use nosso gerador de tags: insira palavras-chave e obtenha tags otimizadas para YouTube." },
        { q: "Posso baixar miniaturas do YouTube?", a: "Sim, nossa ferramenta de download extrai a imagem em alta resolução de qualquer vídeo." },
        { q: "Como calcular os ganhos do meu canal?", a: "Use nossa calculadora de dinheiro do YouTube para estimar receitas com base em visualizações." },
        { q: "As ferramentas do YouTube são gratuitas?", a: "Sim, todas as ferramentas são completamente gratuitas e não exigem registro." },
        { q: "Posso gerar links de inscrição para meu canal?", a: "Sim, nosso gerador de links de inscrição cria URLs personalizadas para promover seu canal." },
      ],
    },
  },
  instagram: {
    es: {
      metaTitle: "Herramientas para Instagram gratis | Clipnexo",
      metaDescription: "Crea captions, hashtags, bios, ideas para Reels y ganchos para Instagram con herramientas gratis, rápidas y online.",
      h1: "Herramientas para Instagram gratis",
      intro: "Descubre las herramientas de Clipnexo para Instagram. Genera captions, hashtags, bios, ideas para Reels y ganchos virales. Todo gratis y sin complicaciones.",
      howToTitle: "Cómo usar las herramientas de Instagram",
      howToSteps: [
        "Selecciona la herramienta que necesitas.",
        "Completa los campos con tu información.",
        "Obtén el resultado listo para usar en tus publicaciones.",
      ],
      recommendedTitle: "Herramientas recomendadas para Instagram",
      faq: [
        { q: "¿Qué herramientas para Instagram ofrece Clipnexo?", a: "Clipnexo ofrece generador de captions, hashtags, bios, ideas para Reels y ganchos para Instagram." },
        { q: "¿Cómo genero captions para Instagram?", a: "Usa nuestro generador de captions: describe tu contenido y obtén textos atractivos para tus publicaciones." },
        { q: "¿Puedo generar hashtags para Instagram?", a: "Sí, nuestro generador de hashtags crea etiquetas relevantes para aumentar el alcance en Instagram." },
        { q: "¿Cómo obtengo ideas para Reels?", a: "Nuestra herramienta de ideas para Reels te sugiere conceptos creativos basados en tu nicho." },
        { q: "¿Las herramientas de Instagram son gratis?", a: "Sí, todas las herramientas son gratuitas y no requieren registro." },
      ],
    },
    en: {
      metaTitle: "Free Instagram Tools Online | Clipnexo",
      metaDescription: "Create captions, hashtags, bios, Reels ideas and hooks for Instagram with free, fast online tools.",
      h1: "Free Instagram Tools",
      intro: "Discover Clipnexo tools for Instagram. Generate captions, hashtags, bios, Reels ideas and viral hooks. All free and easy to use.",
      howToTitle: "How to use Instagram tools",
      howToSteps: [
        "Select the tool you need.",
        "Fill in the fields with your information.",
        "Get the result ready to use in your posts.",
      ],
      recommendedTitle: "Recommended Instagram tools",
      faq: [
        { q: "What Instagram tools does Clipnexo offer?", a: "Clipnexo offers caption generator, hashtag generator, bio generator, Reels ideas and hooks for Instagram." },
        { q: "How do I generate Instagram captions?", a: "Use our caption generator: describe your content and get engaging text for your posts." },
        { q: "Can I generate Instagram hashtags?", a: "Yes, our hashtag generator creates relevant tags to boost reach on Instagram." },
        { q: "How do I get Reels ideas?", a: "Our Reels ideas tool suggests creative concepts based on your niche." },
        { q: "Are the Instagram tools free?", a: "Yes, all tools are free and require no registration." },
      ],
    },
    pt: {
      metaTitle: "Ferramentas para Instagram grátis | Clipnexo",
      metaDescription: "Crie legendas, hashtags, bios, ideias para Reels e ganchos para Instagram com ferramentas grátis, rápidas e online.",
      h1: "Ferramentas para Instagram grátis",
      intro: "Descubra as ferramentas do Clipnexo para Instagram. Gere legendas, hashtags, bios, ideias para Reels e ganchos virais. Tudo grátis e sem complicação.",
      howToTitle: "Como usar as ferramentas do Instagram",
      howToSteps: [
        "Selecione a ferramenta que você precisa.",
        "Preencha os campos com suas informações.",
        "Obtenha o resultado pronto para usar em suas publicações.",
      ],
      recommendedTitle: "Ferramentas recomendadas para Instagram",
      faq: [
        { q: "Quais ferramentas para Instagram o Clipnexo oferece?", a: "O Clipnexo oferece gerador de legendas, hashtags, bios, ideias para Reels e ganchos para Instagram." },
        { q: "Como gerar legendas para Instagram?", a: "Use nosso gerador de legendas: descreva seu conteúdo e obtenha textos atraentes para suas publicações." },
        { q: "Posso gerar hashtags para Instagram?", a: "Sim, nosso gerador de hashtags cria etiquetas relevantes para aumentar o alcance no Instagram." },
        { q: "Como obter ideias para Reels?", a: "Nossa ferramenta de ideias para Reels sugere conceitos criativos baseados no seu nicho." },
        { q: "As ferramentas do Instagram são gratuitas?", a: "Sim, todas as ferramentas são gratuitas e não exigem registro." },
      ],
    },
  },
  facebook: {
    es: {
      metaTitle: "Herramientas para Facebook gratis | Clipnexo",
      metaDescription: "Genera posts, anuncios y textos para Marketplace con herramientas gratis para Facebook, ideales para creadores, marcas y negocios.",
      h1: "Herramientas para Facebook gratis",
      intro: "Explora las herramientas de Clipnexo para Facebook. Crea posts, anuncios publicitarios y textos para Marketplace de forma rápida y gratuita.",
      howToTitle: "Cómo usar las herramientas de Facebook",
      howToSteps: [
        "Elige la herramienta según tu objetivo.",
        "Completa la información solicitada.",
        "Obtén tu texto optimizado para Facebook.",
      ],
      recommendedTitle: "Herramientas recomendadas para Facebook",
      faq: [
        { q: "¿Qué herramientas para Facebook ofrece Clipnexo?", a: "Clipnexo ofrece generador de posts, anuncios y textos para Marketplace de Facebook." },
        { q: "¿Cómo creo un post para Facebook?", a: "Usa nuestro generador de posts: describe tu producto o servicio y obtén un texto listo para publicar." },
        { q: "¿Puedo generar anuncios para Facebook?", a: "Sí, nuestro generador de anuncios crea copys publicitarios optimizados para campañas de Facebook Ads." },
        { q: "¿Cómo genero textos para Marketplace?", a: "Nuestra herramienta de Marketplace genera descripciones atractivas para tus publicaciones de venta." },
        { q: "¿Las herramientas de Facebook son gratis?", a: "Sí, todas las herramientas son gratuitas y no requieren registro." },
      ],
    },
    en: {
      metaTitle: "Free Facebook Tools Online | Clipnexo",
      metaDescription: "Generate posts, ads and Marketplace texts with free Facebook tools, ideal for creators, brands and businesses.",
      h1: "Free Facebook Tools",
      intro: "Explore Clipnexo tools for Facebook. Create posts, advertising texts and Marketplace listings quickly and free.",
      howToTitle: "How to use Facebook tools",
      howToSteps: [
        "Choose the tool based on your goal.",
        "Fill in the requested information.",
        "Get your optimized Facebook text.",
      ],
      recommendedTitle: "Recommended Facebook tools",
      faq: [
        { q: "What Facebook tools does Clipnexo offer?", a: "Clipnexo offers post generator, ad generator and Marketplace text generator for Facebook." },
        { q: "How do I create a Facebook post?", a: "Use our post generator: describe your product or service and get a text ready to publish." },
        { q: "Can I generate Facebook ads?", a: "Yes, our ad generator creates optimized advertising copy for Facebook Ads campaigns." },
        { q: "How do I generate Marketplace listings?", a: "Our Marketplace tool creates attractive descriptions for your sales listings." },
        { q: "Are the Facebook tools free?", a: "Yes, all tools are free and require no registration." },
      ],
    },
    pt: {
      metaTitle: "Ferramentas para Facebook grátis | Clipnexo",
      metaDescription: "Gere posts, anúncios e textos para Marketplace com ferramentas grátis para Facebook, ideais para criadores, marcas e negócios.",
      h1: "Ferramentas para Facebook grátis",
      intro: "Explore as ferramentas do Clipnexo para Facebook. Crie posts, anúncios publicitários e textos para Marketplace de forma rápida e gratuita.",
      howToTitle: "Como usar as ferramentas do Facebook",
      howToSteps: [
        "Escolha a ferramenta de acordo com seu objetivo.",
        "Preencha as informações solicitadas.",
        "Obtenha seu texto otimizado para Facebook.",
      ],
      recommendedTitle: "Ferramentas recomendadas para Facebook",
      faq: [
        { q: "Quais ferramentas para Facebook o Clipnexo oferece?", a: "O Clipnexo oferece gerador de posts, anúncios e textos para Marketplace do Facebook." },
        { q: "Como criar um post para Facebook?", a: "Use nosso gerador de posts: descreva seu produto ou serviço e obtenha um texto pronto para publicar." },
        { q: "Posso gerar anúncios para Facebook?", a: "Sim, nosso gerador de anúncios cria textos publicitários otimizados para campanhas de Facebook Ads." },
        { q: "Como gerar textos para Marketplace?", a: "Nossa ferramenta de Marketplace gera descrições atrativas para seus anúncios de venda." },
        { q: "As ferramentas do Facebook são gratuitas?", a: "Sim, todas as ferramentas são gratuitas e não exigem registro." },
      ],
    },
  },
  shortVideo: {
    es: {
      metaTitle: "Herramientas para videos cortos | Clipnexo",
      metaDescription: "Crea guiones, títulos, hashtags, ideas y ganchos para videos cortos en TikTok, Reels y Shorts con herramientas gratuitas.",
      h1: "Herramientas para videos cortos",
      intro: "Descubre herramientas para crear contenido para videos cortos en TikTok, Instagram Reels y YouTube Shorts. Genera guiones, títulos, hashtags, ideas y ganchos virales.",
      howToTitle: "Cómo usar las herramientas de videos cortos",
      howToSteps: [
        "Selecciona el tipo de contenido que quieres crear.",
        "Usa la herramienta adecuada para generar ideas o guiones.",
        "Produce tu video corto con el contenido generado.",
      ],
      recommendedTitle: "Herramientas recomendadas para videos cortos",
      faq: [
        { q: "¿Qué herramientas para videos cortos ofrece Clipnexo?", a: "Clipnexo ofrece generador de guiones, títulos y hashtags, ideas para Reels y TikTok, y ganchos virales." },
        { q: "¿Cómo genero guiones para videos cortos?", a: "Usa nuestro generador de guiones: describe tu tema y obtén un guion estructurado para tu video." },
        { q: "¿Puedo generar ideas para Reels?", a: "Sí, nuestra herramienta de ideas para Reels te sugiere conceptos creativos para Instagram." },
        { q: "¿Cómo creo títulos y hashtags para shorts?", a: "Nuestro generador de títulos y hashtags crea combinaciones optimizadas para videos cortos." },
        { q: "¿Las herramientas para videos cortos son gratis?", a: "Sí, todas son gratuitas y no requieren registro." },
        { q: "¿Funcionan para TikTok, Reels y Shorts?", a: "Sí, las herramientas están diseñadas para cualquier plataforma de videos cortos." },
      ],
    },
    en: {
      metaTitle: "Short Video Tools | Clipnexo",
      metaDescription: "Create scripts, titles, hashtags, ideas and hooks for short videos on TikTok, Reels and Shorts with free tools.",
      h1: "Short Video Tools",
      intro: "Discover tools for creating short video content on TikTok, Instagram Reels and YouTube Shorts. Generate scripts, titles, hashtags, ideas and viral hooks.",
      howToTitle: "How to use short video tools",
      howToSteps: [
        "Select the type of content you want to create.",
        "Use the right tool to generate ideas or scripts.",
        "Produce your short video with the generated content.",
      ],
      recommendedTitle: "Recommended short video tools",
      faq: [
        { q: "What short video tools does Clipnexo offer?", a: "Clipnexo offers script generator, title and hashtag generator, Reels and TikTok ideas, and viral hooks." },
        { q: "How do I generate scripts for short videos?", a: "Use our script generator: describe your topic and get a structured script for your video." },
        { q: "Can I get Reels ideas?", a: "Yes, our Reels ideas tool suggests creative concepts for Instagram." },
        { q: "How do I create titles and hashtags for shorts?", a: "Our title and hashtag generator creates optimized combinations for short videos." },
        { q: "Are the short video tools free?", a: "Yes, all are free and require no registration." },
        { q: "Do they work for TikTok, Reels and Shorts?", a: "Yes, the tools are designed for any short video platform." },
      ],
    },
    pt: {
      metaTitle: "Ferramentas para vídeos curtos | Clipnexo",
      metaDescription: "Crie roteiros, títulos, hashtags, ideias e ganchos para vídeos curtos no TikTok, Reels e Shorts com ferramentas gratuitas.",
      h1: "Ferramentas para vídeos curtos",
      intro: "Descubra ferramentas para criar conteúdo para vídeos curtos no TikTok, Instagram Reels e YouTube Shorts. Gere roteiros, títulos, hashtags, ideias e ganchos virais.",
      howToTitle: "Como usar as ferramentas de vídeos curtos",
      howToSteps: [
        "Selecione o tipo de conteúdo que deseja criar.",
        "Use a ferramenta adequada para gerar ideias ou roteiros.",
        "Produza seu vídeo curto com o conteúdo gerado.",
      ],
      recommendedTitle: "Ferramentas recomendadas para vídeos curtos",
      faq: [
        { q: "Quais ferramentas para vídeos curtos o Clipnexo oferece?", a: "O Clipnexo oferece gerador de roteiros, títulos e hashtags, ideias para Reels e TikTok, e ganchos virais." },
        { q: "Como gerar roteiros para vídeos curtos?", a: "Use nosso gerador de roteiros: descreva seu tema e obtenha um roteiro estruturado para seu vídeo." },
        { q: "Posso gerar ideias para Reels?", a: "Sim, nossa ferramenta de ideias para Reels sugere conceitos criativos para Instagram." },
        { q: "Como criar títulos e hashtags para shorts?", a: "Nosso gerador de títulos e hashtags cria combinações otimizadas para vídeos curtos." },
        { q: "As ferramentas para vídeos curtos são gratuitas?", a: "Sim, todas são gratuitas e não exigem registro." },
        { q: "Funcionam para TikTok, Reels e Shorts?", a: "Sim, as ferramentas são projetadas para qualquer plataforma de vídeos curtos." },
      ],
    },
  },
  students: {
    es: {
      metaTitle: "Herramientas para estudiantes gratis | Clipnexo",
      metaDescription: "Herramientas gratuitas para estudiantes: contador de palabras, convertidor de mayúsculas, generador de índices, títulos, introducciones y conclusiones.",
      h1: "Herramientas para estudiantes",
      intro: "Descubre herramientas gratuitas para estudiantes. Cuenta palabras y caracteres, convierte mayúsculas y minúsculas, genera índices, títulos, introducciones y conclusiones para tus trabajos académicos.",
      howToTitle: "Cómo usar estas herramientas",
      howToSteps: [
        "Elige la herramienta que necesitas de la lista.",
        "Ingresa el texto o tema requerido.",
        "Obtén tu resultado al instante.",
      ],
      recommendedTitle: "Herramientas recomendadas para estudiantes",
      faq: [
        { q: "¿Son gratuitas estas herramientas?", a: "Sí, todas las herramientas para estudiantes son completamente gratuitas." },
        { q: "¿Necesito registrarme?", a: "No, no requieren registro ni inicio de sesión." },
        { q: "¿Funcionan en dispositivos móviles?", a: "Sí, funcionan en cualquier navegador moderno." },
        { q: "¿Puedo usar los textos generados en mis trabajos?", a: "Sí, los textos generados son libres de usar como base para tus trabajos académicos." },
      ],
    },
    en: {
      metaTitle: "Free Student Tools Online | Clipnexo",
      metaDescription: "Free tools for students: word counter, case converter, outline generator, title generator, introduction and conclusion generators.",
      h1: "Student Tools",
      intro: "Discover free tools for students. Count words and characters, convert text case, generate outlines, titles, introductions and conclusions for your academic work.",
      howToTitle: "How to use these tools",
      howToSteps: [
        "Choose the tool you need from the list.",
        "Enter the required text or topic.",
        "Get your result instantly.",
      ],
      recommendedTitle: "Recommended student tools",
      faq: [
        { q: "Are these tools free?", a: "Yes, all student tools are completely free." },
        { q: "Do I need to register?", a: "No, they require no registration or login." },
        { q: "Do they work on mobile devices?", a: "Yes, they work on any modern browser." },
        { q: "Can I use generated texts in my work?", a: "Yes, the generated texts are free to use as a basis for your academic work." },
      ],
    },
    pt: {
      metaTitle: "Ferramentas para estudantes grátis | Clipnexo",
      metaDescription: "Ferramentas gratuitas para estudantes: contador de palavras, conversor de maiúsculas, gerador de índices, títulos, introduções e conclusões.",
      h1: "Ferramentas para estudantes",
      intro: "Descubra ferramentas gratuitas para estudantes. Conte palavras e caracteres, converta maiúsculas e minúsculas, gere índices, títulos, introduções e conclusões para seus trabalhos acadêmicos.",
      howToTitle: "Como usar estas ferramentas",
      howToSteps: [
        "Escolha a ferramenta que precisa da lista.",
        "Insira o texto ou tema necessário.",
        "Obtenha seu resultado instantaneamente.",
      ],
      recommendedTitle: "Ferramentas recomendadas para estudantes",
      faq: [
        { q: "Estas ferramentas são gratuitas?", a: "Sim, todas as ferramentas para estudantes são completamente gratuitas." },
        { q: "Preciso me registrar?", a: "Não, não exigem registro nem login." },
        { q: "Funcionam em dispositivos móveis?", a: "Sim, funcionam em qualquer navegador moderno." },
        { q: "Posso usar os textos gerados em meus trabalhos?", a: "Sim, os textos gerados são livres para usar como base para seus trabalhos acadêmicos." },
      ],
    },
  },
  socialMedia: {
    es: {
      metaTitle: "Herramientas para redes sociales | Clipnexo",
      metaDescription: "Crea textos, captions, hashtags, guiones y mide caracteres para redes sociales con herramientas gratis y fáciles de usar.",
      h1: "Herramientas para redes sociales",
      intro: "Explora herramientas para gestionar tus redes sociales. Crea textos, captions, guiones, hashtags y mide la longitud de tus publicaciones en una sola plataforma.",
      howToTitle: "Cómo usar las herramientas de redes sociales",
      howToSteps: [
        "Selecciona la red social o el tipo de contenido.",
        "Usa la herramienta adecuada para generar tu texto.",
        "Publica directamente en tu plataforma favorita.",
      ],
      recommendedTitle: "Herramientas recomendadas para redes sociales",
      faq: [
        { q: "¿Qué herramientas para redes sociales ofrece Clipnexo?", a: "Clipnexo ofrece creador de textos, contador de caracteres, generador de captions, posts y guiones." },
        { q: "¿Cómo creo textos para redes sociales?", a: "Usa nuestro creador de textos: describe tu contenido y obtén textos optimizados para cada plataforma." },
        { q: "¿Cómo mido la longitud de mis textos?", a: "Nuestro contador de caracteres te muestra la longitud exacta de tu texto para cualquier red social." },
        { q: "¿Puedo crear guiones para videos?", a: "Sí, nuestro generador de guiones te ayuda a estructurar contenido para videos en redes sociales." },
        { q: "¿Las herramientas son compatibles con todas las redes?", a: "Sí, funcionan para TikTok, Instagram, Facebook, YouTube, Twitter y más." },
      ],
    },
    en: {
      metaTitle: "Social Media Tools | Clipnexo",
      metaDescription: "Create texts, captions, hashtags, scripts and measure characters for social media with free and easy-to-use tools.",
      h1: "Social Media Tools",
      intro: "Explore tools to manage your social media. Create texts, captions, scripts, hashtags and measure post length in one platform.",
      howToTitle: "How to use social media tools",
      howToSteps: [
        "Select the social network or content type.",
        "Use the right tool to generate your text.",
        "Publish directly on your favorite platform.",
      ],
      recommendedTitle: "Recommended social media tools",
      faq: [
        { q: "What social media tools does Clipnexo offer?", a: "Clipnexo offers text creator, character counter, caption generator, post generator and script generator." },
        { q: "How do I create texts for social media?", a: "Use our text creator: describe your content and get optimized texts for each platform." },
        { q: "How do I measure text length?", a: "Our character counter shows the exact length of your text for any social network." },
        { q: "Can I create video scripts?", a: "Yes, our script generator helps structure content for social media videos." },
        { q: "Are the tools compatible with all networks?", a: "Yes, they work for TikTok, Instagram, Facebook, YouTube, Twitter and more." },
      ],
    },
    pt: {
      metaTitle: "Ferramentas para redes sociais | Clipnexo",
      metaDescription: "Crie textos, legendas, hashtags, roteiros e meça caracteres para redes sociais com ferramentas grátis e fáceis de usar.",
      h1: "Ferramentas para redes sociais",
      intro: "Explore ferramentas para gerenciar suas redes sociais. Crie textos, legendas, roteiros, hashtags e meça o comprimento das suas publicações em uma única plataforma.",
      howToTitle: "Como usar as ferramentas de redes sociais",
      howToSteps: [
        "Selecione a rede social ou o tipo de conteúdo.",
        "Use a ferramenta adequada para gerar seu texto.",
        "Publique diretamente na sua plataforma favorita.",
      ],
      recommendedTitle: "Ferramentas recomendadas para redes sociais",
      faq: [
        { q: "Quais ferramentas para redes sociais o Clipnexo oferece?", a: "O Clipnexo oferece criador de textos, contador de caracteres, gerador de legendas, posts e roteiros." },
        { q: "Como criar textos para redes sociais?", a: "Use nosso criador de textos: descreva seu conteúdo e obtenha textos otimizados para cada plataforma." },
        { q: "Como medir o comprimento dos meus textos?", a: "Nosso contador de caracteres mostra o comprimento exato do seu texto para qualquer rede social." },
        { q: "Posso criar roteiros para vídeos?", a: "Sim, nosso gerador de roteiros ajuda a estruturar conteúdo para vídeos em redes sociais." },
        { q: "As ferramentas são compatíveis com todas as redes?", a: "Sim, funcionam para TikTok, Instagram, Facebook, YouTube, Twitter e mais." },
      ],
    },
  },
};

const clusterToolKeys: Record<ClusterKey, string[]> = {
  tiktok: [
    "video", "mp3", "withoutWatermark", "guide",
    "tiktokBio", "tiktokIdeas", "tiktokHooks", "tiktokCaptions", "tiktokHashtags",
    "shortVideoTitleHashtag",
  ],
  youtube: [
    "youtubeTagGenerator", "youtubeTagExtractor",
    "youtubeHashtagGenerator", "youtubeHashtagExtractor",
    "youtubeTitleGenerator", "youtubeTitleExtractor",
    "youtubeTitleLengthChecker", "youtubeDescriptionGenerator",
    "youtubeDescriptionExtractor", "youtubeTitleCapitalization",
    "youtubeEmbedCodeGenerator", "youtubeTimestampLinkGenerator",
    "youtubeSubscribeLinkGenerator", "youtubeThumbnailDownloader",
    "youtubeMoneyCalculator", "youtubeViewRatioCalculator",
  ],
  instagram: [
    "instagramCaptionGenerator", "instagramHashtagGenerator",
    "instagramBioGenerator", "instagramReelsIdeas", "instagramReelsHooks",
  ],
  facebook: [
    "facebookPostGenerator", "facebookAdGenerator", "marketplaceTextGenerator",
  ],
  shortVideo: [
    "shortVideoScriptGenerator", "shortVideoTitleHashtag",
    "instagramReelsIdeas", "instagramReelsHooks",
    "tiktokIdeas", "tiktokHooks",
  ],
  socialMedia: [
    "socialMediaTextGenerator", "socialMediaCharacterCounter",
    "instagramCaptionGenerator", "facebookPostGenerator",
    "shortVideoScriptGenerator",
    "usernameGenerator", "contentCalendarGenerator",
  ],
  students: [
    "wordCounter", "caseConverter",
    "outlineGenerator", "assignmentTitleGenerator",
    "introductionGenerator", "conclusionGenerator",
    "textSummarizer",
    "textParaphraser", "apaCitationGenerator", "textCorrector",
    "pdfToText", "textToPdf", "pomodoroTimer",
    "gradeAverageCalculator", "studyScheduleGenerator",
  ],
};

export function getClusterContent(clusterKey: ClusterKey, lang: SupportedLang): ClusterContent {
  return clusters[clusterKey][lang];
}

export function getClusterRouteKey(clusterKey: ClusterKey): string {
  const map: Record<ClusterKey, string> = {
    tiktok: "tiktokTools",
    youtube: "youtubeTools",
    instagram: "instagramTools",
    facebook: "facebookTools",
    shortVideo: "shortVideoTools",
    socialMedia: "socialMediaTools",
    students: "studentsTools",
  };
  return map[clusterKey];
}

export function getClusterToolKeys(clusterKey: ClusterKey): string[] {
  return clusterToolKeys[clusterKey];
}

export const clusterKeys: ClusterKey[] = ["tiktok", "youtube", "instagram", "facebook", "shortVideo", "socialMedia", "students"];
