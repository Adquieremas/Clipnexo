import type { ToolConfig, ToolKey } from "@/lib/tools-content";
import type { SupportedLang } from "@/lib/routes";

export const extraToolsContent: Partial<Record<ToolKey, ToolConfig>> = {
  socialMediaTextGenerator: {
    routeKey: "socialMediaTextGenerator",
    content: {
      es: {
        metaTitle: "Crear textos para redes sociales",
        metaDescription:
          "Crea textos para Facebook, Instagram, Twitter/X y redes sociales en Clipnexo. Genera publicaciones atractivas, rápidas y listas para copiar en segundos",
        h1: "Crear textos para redes sociales",
        lead:
          "Escribe un tema, elige la red social y el tono. Genera textos listos para copiar en segundos sin exigir API externa.",
        howTitle: "Cómo usar el generador de textos",
        howSteps: [
          "Escribe el tema o idea principal de tu publicación.",
          "Selecciona la red social donde publicarás.",
          "Elige el tono que deseas transmitir.",
          "Haz clic en generar y copia los textos que más te gusten.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Esta herramienta ayuda a convertir una idea en textos claros para Facebook, Instagram, Twitter/X, LinkedIn, TikTok o un formato general.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Sé concreto con el tema: escribe algo como 'recetas rápidas' en lugar de 'comida'.",
          "Elige el tono según tu audiencia: profesional, divertido, vendedor o educativo.",
          "Combina frases generadas para crear un texto propio y más natural.",
          "Usa emojis cuando aporten claridad, no como reemplazo del mensaje.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "También puedes usar herramientas de YouTube y TikTok para complementar tu estrategia de contenido.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Los textos se guardan en el servidor?",
            a: "No. La generación se hace en tu navegador y no se guarda tu contenido en ningún servidor.",
          },
          {
            q: "¿Funciona sin conexión?",
            a: "La herramienta necesita una página web abierta, pero no requiere ninguna API externa para generar los textos.",
          },
          {
            q: "¿Puedo usar estos textos para mi marca?",
            a: "Sí. Puedes adaptarlos, editarlos y usarlos en publicaciones personales o de empresa.",
          },
          {
            q: "¿Los emojis son obligatorios?",
            a: "No. Los emojis son opcionales y la herramienta los usa solo donde son naturales.",
          },
        ],
      },
      en: {
        metaTitle: "Free Social Media Text Generator Online",
        metaDescription:
          "Create posts for Facebook, Instagram, Twitter/X and social media on Clipnexo. Generate catchy texts that are ready to copy and share with your audience online.",
        h1: "Social Media Text Generator",
        lead:
          "Write a topic, choose the network and tone. Generate ready-to-copy texts in seconds without any external API.",
        howTitle: "How to use the text generator",
        howSteps: [
          "Type the main topic or idea of your post.",
          "Select the social platform where you will publish.",
          "Choose the tone you want to convey.",
          "Click generate and copy the texts you like best.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "This tool helps turn an idea into clear posts for Facebook, Instagram, Twitter/X, LinkedIn, TikTok or a general social text.",
        tipsTitle: "Tips for better results",
        tips: [
          "Be specific with your topic: use 'quick recipes' instead of just 'food'.",
          "Pick the tone that matches your audience and message.",
          "Combine several generated options to make the final text feel natural.",
          "Use emojis only when they add meaning, not as a shortcut.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "You can also use YouTube and TikTok tools to complete your content strategy.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Are the texts saved on a server?",
            a: "No. The generation runs in your browser and your input is not stored on any server.",
          },
          {
            q: "Does it work without an API?",
            a: "Yes. The tool uses local logic in the browser and does not depend on an external service.",
          },
          {
            q: "Can I use these texts for a brand?",
            a: "Yes. Feel free to adapt the generated texts for personal, business or creator use.",
          },
          {
            q: "Are emojis required?",
            a: "No. Emojis are optional and are added only where they make the message clearer.",
          },
        ],
      },
      pt: {
        metaTitle: "Gerador de textos para redes sociais",
        metaDescription:
          "Crie textos para Facebook, Instagram, Twitter/X e redes sociais no Clipnexo. Gere publicações atrativas, rápidas e prontas para copiar em suas redes favoritas.",
        h1: "Gerador de textos para redes sociais",
        lead:
          "Digite um tema, escolha a rede social e o tom. Gere textos prontos para copiar em segundos sem API externa.",
        howTitle: "Como usar o gerador de textos",
        howSteps: [
          "Digite o tema ou ideia principal da sua publicação.",
          "Selecione a rede social onde você vai publicar.",
          "Escolha o tom que deseja transmitir.",
          "Clique em gerar e copie os textos de que gostar.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Esta ferramenta ajuda a transformar uma ideia em textos claros para Facebook, Instagram, Twitter/X, LinkedIn, TikTok ou formato geral.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Seja específico com o tema: use 'receitas rápidas' em vez de apenas 'comida'.",
          "Escolha o tom que combine com seu público e objetivo.",
          "Combine várias opções geradas para deixar o texto mais natural.",
          "Use emojis apenas onde fizerem sentido.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Você também pode usar ferramentas de YouTube e TikTok para completar sua estratégia de conteúdo.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "Os textos são salvos no servidor?",
            a: "Não. A geração acontece no seu navegador e o seu texto não é armazenado no servidor.",
          },
          {
            q: "Funciona sem API?",
            a: "Sim. A ferramenta usa lógica local no navegador e não depende de serviço externo.",
          },
          {
            q: "Posso usar estes textos para uma marca?",
            a: "Sim. Adapte as frases para uso pessoal, comercial ou de criador de conteúdo.",
          },
          {
            q: "Os emojis são obrigatórios?",
            a: "Não. Eles são opcionais e usados apenas quando ajudam a mensagem.",
          },
        ],
      },
    },
  },
  youtubeTagGenerator: {
    routeKey: "youtubeTagGenerator",
    content: {
      es: {
        metaTitle: "Generador de etiquetas de YouTube",
        metaDescription:
          "Genera etiquetas de YouTube según tu tema o palabra clave en Clipnexo. Crea tags útiles para organizar y optimizar mejor tus videos de YouTube en",
        h1: "Generador de etiquetas de YouTube",
        lead:
          "Escribe el tema o palabra clave de tu video y genera etiquetas útiles para YouTube sin depender de API externa.",
        howTitle: "Cómo usar el generador de etiquetas",
        howSteps: [
          "Escribe el tema o palabra clave principal del video.",
          "Selecciona el nicho o categoría más cercano.",
          "Elige cuántas etiquetas quieres: 10, 20 o 30.",
          "Copia las etiquetas separadas por coma y sin hashtag.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Las etiquetas ayudan a YouTube a analizar de qué trata tu video. Esta herramienta genera sugerencias limpias y sin duplicados.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Usa tu palabra clave principal en lugar de un tema demasiado general.",
          "Combina etiquetas amplias con etiquetas específicas de nicho.",
          "No uses etiquetas irrelevantes solo porque son populares.",
          "Revisa que las etiquetas coincidan con el contenido real del video.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "También puedes generar títulos, hashtags, descripciones y revisar la longitud de tu texto.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Las etiquetas afectan el SEO de YouTube?",
            a: "Sí, ayudan a indicar el tema del video, pero el título y la descripción son más importantes.",
          },
          {
            q: "¿Cuántas etiquetas debo usar?",
            a: "YouTube permite hasta 500 caracteres. Entre 10 y 30 etiquetas relevantes suele ser una buena práctica.",
          },
          {
            q: "¿Estas etiquetas garantizan resultados?",
            a: "No. Sirven como apoyo estructural, pero el desempeño depende del contenido y la audiencia.",
          },
        ],
      },
      en: {
        metaTitle: "Free YouTube Tag Generator Online",
        metaDescription:
          "Generate YouTube tags from a topic or keyword on Clipnexo. Create useful tags to organize and optimize your videos quickly for better reach on social",
        h1: "YouTube Tag Generator",
        lead:
          "Enter a topic or keyword and generate useful YouTube tags without relying on an external API.",
        howTitle: "How to use the tag generator",
        howSteps: [
          "Type your video's main topic or keyword.",
          "Select the niche or category that fits best.",
          "Choose how many tags to generate: 10, 20, or 30.",
          "Copy the tags separated by commas and without hashtags.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "Tags help YouTube understand the topic of your video. This tool generates clean, duplicate-free suggestions.",
        tipsTitle: "Tips for better results",
        tips: [
          "Use your main keyword instead of a broad subject.",
          "Mix broad tags with niche-specific tags.",
          "Avoid unrelated tags just because they are popular.",
          "Make sure tags match the actual video content.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "You can also generate titles, hashtags, descriptions and check text length.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Do tags affect YouTube SEO?",
            a: "Yes, they help describe your video's topic, but title and description are usually more important.",
          },
          {
            q: "How many tags should I use?",
            a: "YouTube allows up to 500 characters. Using 10 to 30 relevant tags is a good practice.",
          },
          {
            q: "Do these tags guarantee results?",
            a: "No. They support structure, but performance depends on content and audience.",
          },
        ],
      },
      pt: {
        metaTitle: "Gerador de tags para YouTube grátis online",
        metaDescription:
          "Gere tags para YouTube com base no tema ou palavra-chave no Clipnexo. Crie etiquetas úteis para organizar e otimizar seus vídeos no YouTube de",
        h1: "Gerador de tags para YouTube",
        lead:
          "Digite um tema ou palavra-chave e gere tags úteis para YouTube sem depender de API externa.",
        howTitle: "Como usar o gerador de tags",
        howSteps: [
          "Digite o tema ou palavra-chave principal do vídeo.",
          "Selecione o nicho ou categoria mais adequado.",
          "Escolha quantas tags deseja gerar: 10, 20 ou 30.",
          "Copie as tags separadas por vírgula e sem hashtag.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "As tags ajudam o YouTube a entender o tema do vídeo. Esta ferramenta gera sugestões limpas e sem duplicatas.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Use a palavra-chave principal em vez de um assunto muito genérico.",
          "Misture tags amplas com tags específicas de nicho.",
          "Evite tags não relacionadas só porque são populares.",
          "Verifique se as tags correspondem ao conteúdo real do vídeo.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Você também pode gerar títulos, hashtags, descrições e verificar o tamanho do texto.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "As tags afetam o SEO do YouTube?",
            a: "Sim, ajudam a descrever o tema do vídeo, mas o título e a descrição geralmente são mais importantes.",
          },
          {
            q: "Quantas tags devo usar?",
            a: "O YouTube permite até 500 caracteres. Usar de 10 a 30 tags relevantes é uma boa prática.",
          },
          {
            q: "Essas tags garantem resultados?",
            a: "Não. Elas ajudam na estrutura, mas o desempenho depende do conteúdo e da audiência.",
          },
        ],
      },
    },
  },
  youtubeTagExtractor: {
    routeKey: "youtubeTagExtractor",
    content: {
      es: {
        metaTitle: "Extractor de etiquetas de YouTube",
        metaDescription:
          "Extrae etiquetas desde textos, títulos o descripciones de YouTube en Clipnexo. Obtén palabras clave limpias para organizar tus videos de forma rápida y fácil.",
        h1: "Extractor de etiquetas de YouTube",
        lead:
          "Pega el texto, título o descripción y extrae etiquetas relevantes sin duplicados ni símbolos innecesarios.",
        howTitle: "Cómo usar el extractor de etiquetas",
        howSteps: [
          "Pega el título, descripción o texto de tu video en el campo.",
          "Haz clic en extraer para obtener etiquetas limpias.",
          "Revisa la lista generada y copia solo las etiquetas útiles.",
          "Usa las etiquetas en tu video para organizar mejor el contenido.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para convertir un texto largo en etiquetas de tema relevantes que puedes usar en YouTube sin formateo.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Pega solo textos relacionados con el video para obtener etiquetas precisas.",
          "Elimina enlaces o hashtags duplicados antes de copiar el resultado.",
          "Cambia palabras largas por términos claros cuando sea posible.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "También puedes generar etiquetas, hashtags y títulos para mejorar tus videos de YouTube.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿El extractor elimina duplicados?",
            a: "Sí. Muestra solo etiquetas únicas y limpias para que puedas copiarlas fácilmente.",
          },
          {
            q: "¿Sirve para títulos largos?",
            a: "Sí. Convierte títulos, descripciones o listas largas en etiquetas útiles.",
          },
          {
            q: "¿Necesita conexión a una API?",
            a: "No. El texto se procesa en tu navegador y no se envía a ningún servicio externo.",
          },
        ],
      },
      en: {
        metaTitle: "Free YouTube Tag Extractor Online Tool",
        metaDescription:
          "Extract tags from YouTube texts, titles or descriptions on Clipnexo. Get clean keyword ideas to organize your videos more easily for better SEO and",
        h1: "YouTube Tag Extractor",
        lead:
          "Paste a title, description or text and extract relevant tags without duplicates or extra symbols.",
        howTitle: "How to use the tag extractor",
        howSteps: [
          "Paste your video's title, description or text into the field.",
          "Click extract to generate clean tag suggestions.",
          "Review the tags and copy the ones that fit your content.",
          "Use the tags to organize your video topic more clearly.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "It converts longer text into relevant topic tags you can use on YouTube without extra formatting.",
        tipsTitle: "Tips for better results",
        tips: [
          "Paste only text that matches your video's subject.",
          "Remove repeated words or duplicate tags before copying.",
          "Use shorter, clearer terms when possible.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "You can also generate tags, hashtags and titles to improve your YouTube videos.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Does the extractor remove duplicates?",
            a: "Yes. It shows unique clean tags you can copy easily.",
          },
          {
            q: "Does it work with long titles?",
            a: "Yes. It converts titles, descriptions or long text into useful tags.",
          },
          {
            q: "Does it require an API connection?",
            a: "No. The text is processed locally in your browser.",
          },
        ],
      },
      pt: {
        metaTitle: "Extrator de tags para YouTube grátis online",
        metaDescription:
          "Extraia tags de textos, títulos ou descrições do YouTube no Clipnexo. Obtenha palavras-chave limpas para organizar seus vídeos de forma rápida e",
        h1: "Extrator de tags para YouTube",
        lead:
          "Cole o texto, título ou descrição e extraia tags relevantes sem duplicatas ou símbolos extras.",
        howTitle: "Como usar o extrator de tags",
        howSteps: [
          "Cole o título, descrição ou texto do seu vídeo no campo.",
          "Clique em extrair para gerar sugestões de tags limpas.",
          "Revise as tags e copie as que se encaixam no seu conteúdo.",
          "Use as tags para organizar melhor o tema do seu vídeo.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Converte textos longos em tags de tema relevantes que você pode usar no YouTube sem formatação extra.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Cole apenas textos que correspondam ao assunto do vídeo.",
          "Remova palavras repetidas ou tags duplicadas antes de copiar.",
          "Use termos curtos e claros sempre que possível.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Você também pode gerar tags, hashtags e títulos para melhorar seus vídeos do YouTube.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "O extrator remove duplicatas?",
            a: "Sim. Ele mostra tags únicas e limpas para copiar com facilidade.",
          },
          {
            q: "Funciona com títulos longos?",
            a: "Sim. Converte títulos, descrições ou textos longos em tags úteis.",
          },
          {
            q: "Precisa de conexão com API?",
            a: "Não. O texto é processado localmente no navegador.",
          },
        ],
      },
    },
  },
  youtubeHashtagGenerator: {
    routeKey: "youtubeHashtagGenerator",
    content: {
      es: {
        metaTitle: "Generador de hashtags de YouTube",
        metaDescription:
          "Genera hashtags para YouTube según tu tema o nicho en Clipnexo. Crea etiquetas limpias para títulos, Shorts y descripciones de tus videos para ser viral hoy.",
        h1: "Generador de hashtags de YouTube",
        lead:
          "Escribe el tema de tu video y elige el nicho. Genera hashtags limpios sin espacios ni duplicados.",
        howTitle: "Cómo usar el generador de hashtags",
        howSteps: [
          "Escribe el tema principal de tu video.",
          "Selecciona el nicho que mejor describe tu contenido.",
          "Elige cuántos hashtags quieres generar.",
          "Copia todos los hashtags y úsalos en el título o descripción.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Crea hashtags en formato correcto para YouTube, listos para usar en títulos, Shorts y descripciones.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "No uses espacios en los hashtags.",
          "Combina hashtags amplios con términos específicos de tu tema.",
          "Mantén una lista limpia y sin duplicados.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "Completa tu contenido con títulos, etiquetas y descripciones generadas por Clipnexo.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Los hashtags deben tener #?",
            a: "Sí. La herramienta incluye el símbolo # en cada etiqueta para que puedas usarla directamente.",
          },
          {
            q: "¿Se eliminan los espacios?",
            a: "Sí. Cada hashtag se formatea sin espacios y con caracteres válidos.",
          },
          {
            q: "¿Puedo usar estos hashtags en Shorts?",
            a: "Sí. Funcionan bien en títulos, descripciones y publicaciones de Shorts.",
          },
        ],
      },
      en: {
        metaTitle: "YouTube Hashtag Generator Free Online Tool",
        metaDescription:
          "Generate YouTube hashtags by topic or niche on Clipnexo. Create clean tags for titles, Shorts and video descriptions quickly for maximum online engagement now.",
        h1: "YouTube Hashtag Generator",
        lead:
          "Enter your video's topic and niche. Generate clean hashtags without spaces and duplicates.",
        howTitle: "How to use the hashtag generator",
        howSteps: [
          "Type the main topic of your video.",
          "Choose the niche that best describes your content.",
          "Select how many hashtags you want.",
          "Copy all hashtags and use them in the title or description.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "It creates hashtags in the correct format for YouTube, ready to use in titles, Shorts and descriptions.",
        tipsTitle: "Tips for better results",
        tips: [
          "Do not use spaces in hashtags.",
          "Mix broad tags with topic-specific terms.",
          "Keep the final list clean and duplicate-free.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "Complete your content with titles, tags and descriptions generated by Clipnexo.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Should hashtags include #?",
            a: "Yes. The tool includes the # symbol in each tag so you can use them directly.",
          },
          {
            q: "Are spaces removed?",
            a: "Yes. Each hashtag is formatted without spaces and with valid characters.",
          },
          {
            q: "Can I use these on Shorts?",
            a: "Yes. They work well in titles, descriptions and Shorts posts.",
          },
        ],
      },
      pt: {
        metaTitle: "Gerador de hashtags para YouTube",
        metaDescription:
          "Gere hashtags para YouTube por tema ou nicho no Clipnexo. Crie etiquetas limpas para títulos, Shorts e descrições de vídeos para aumentar seu alcance online.",
        h1: "Gerador de hashtags para YouTube",
        lead:
          "Digite o tema do vídeo e o nicho. Gere hashtags limpas sem espaços e sem duplicatas.",
        howTitle: "Como usar o gerador de hashtags",
        howSteps: [
          "Digite o tema principal do seu vídeo.",
          "Escolha o nicho que melhor descreve seu conteúdo.",
          "Selecione quantas hashtags deseja.",
          "Copie todas as hashtags e use no título ou descrição.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Ela cria hashtags no formato correto para YouTube, prontas para usar em títulos, Shorts e descrições.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Não use espaços nos hashtags.",
          "Misture tags gerais com termos específicos do tema.",
          "Mantenha a lista final limpa e sem duplicatas.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Complete seu conteúdo com títulos, tags e descrições gerados pelo Clipnexo.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "Os hashtags devem ter #?",
            a: "Sim. A ferramenta inclui o símbolo # em cada etiqueta para uso direto.",
          },
          {
            q: "Os espaços são removidos?",
            a: "Sim. Cada hashtag é formatado sem espaços e com caracteres válidos.",
          },
          {
            q: "Posso usar isso em Shorts?",
            a: "Sim. Funciona bem em títulos, descrições e posts de Shorts.",
          },
        ],
      },
    },
  },
  youtubeHashtagExtractor: {
    routeKey: "youtubeHashtagExtractor",
    content: {
      es: {
        metaTitle: "Extractor de hashtags de YouTube",
        metaDescription:
          "Extrae hashtags desde títulos, Shorts o descripciones de YouTube en Clipnexo. Copia etiquetas limpias y listas para usar en tus videos de forma rápida hoy.",
        h1: "Extractor de hashtags de YouTube",
        lead:
          "Pega el texto y encuentra los hashtags presentes. Copia solo los que están limpios y listos para usar.",
        howTitle: "Cómo usar el extractor de hashtags",
        howSteps: [
          "Pega el título, descripción o texto con hashtags.",
          "Haz clic en extraer para ver la lista limpia.",
          "Revisa el conteo y copia todas las etiquetas de forma ordenada.",
          "Usa los hashtags extraídos en tus videos o descripciones.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para recuperar hashtags desde textos de YouTube y obtener una nueva lista sin duplicados ni caracteres innecesarios.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Incluye el texto completo con todos los hashtags que quieras extraer.",
          "Evita pegar texto con símbolos extras fuera de los hashtags.",
          "Revisa la lista final antes de copiar para asegurarte de que sean relevantes.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "También puedes generar hashtags nuevos, extraer etiquetas y preparar títulos para tus videos.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Cuenta cuántos hashtags hay?",
            a: "Sí. Muestra el número total de hashtags extraídos del texto.",
          },
          {
            q: "¿Elimina hashtags repetidos?",
            a: "Sí. Solo queda una copia de cada hashtag en la lista final.",
          },
          {
            q: "¿Necesito una API para usarla?",
            a: "No. Todo se procesa localmente en el navegador.",
          },
        ],
      },
      en: {
        metaTitle: "YouTube Hashtag Extractor Online",
        metaDescription:
          "Extract hashtags from YouTube titles, Shorts or descriptions on Clipnexo. Copy clean tags that are ready to use in seconds for your next viral video content.",
        h1: "YouTube Hashtag Extractor",
        lead:
          "Paste text and find hashtags. Copy a clean list without duplicates and ready to use.",
        howTitle: "How to use the hashtag extractor",
        howSteps: [
          "Paste the title, description or hashtag text.",
          "Click extract to see the clean list.",
          "Review the count and copy all tags in order.",
          "Use the extracted hashtags in your videos or descriptions.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "It recovers hashtags from YouTube text and creates a clean list without duplicates or unnecessary characters.",
        tipsTitle: "Tips for better results",
        tips: [
          "Include the full text with all hashtags you want to extract.",
          "Avoid pasting extra symbols outside the hashtag text.",
          "Review the final list before you copy it to ensure relevance.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "You can also generate new hashtags, extract tags and prepare titles for your videos.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Does it count hashtags?",
            a: "Yes. It shows the total number of hashtags extracted from the text.",
          },
          {
            q: "Does it remove repeated hashtags?",
            a: "Yes. Only one instance of each hashtag remains in the final list.",
          },
          {
            q: "Do I need an API to use it?",
            a: "No. Everything is processed locally in your browser.",
          },
        ],
      },
      pt: {
        metaTitle: "Extrator de hashtags do YouTube",
        metaDescription:
          "Extraia hashtags de títulos, Shorts ou descrições do YouTube no Clipnexo. Copie etiquetas limpas e prontas para usar em seus vídeos de forma rápida e fácil.",
        h1: "Extrator de hashtags do YouTube",
        lead:
          "Cole o texto e encontre os hashtags presentes. Copie apenas os que estão limpos e prontos para usar.",
        howTitle: "Como usar o extrator de hashtags",
        howSteps: [
          "Cole o título, descrição ou texto com hashtags.",
          "Clique em extrair para ver a lista limpa.",
          "Revise a contagem e copie todas as etiquetas em ordem.",
          "Use os hashtags extraídos em seus vídeos ou descrições.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Serve para recuperar hashtags a partir de textos do YouTube e obter uma lista nova sem duplicatas nem caracteres desnecessários.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Inclua o texto completo com todos os hashtags que deseja extrair.",
          "Evite colar símbolos extras fora dos hashtags.",
          "Revise a lista final antes de copiar para garantir que sejam relevantes.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Você também pode gerar hashtags novas, extrair tags e preparar títulos para seus vídeos.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "Conta quantos hashtags há?",
            a: "Sim. Mostra o número total de hashtags extraídos do texto.",
          },
          {
            q: "Remove hashtags repetidos?",
            a: "Sim. Apenas uma cópia de cada hashtag fica na lista final.",
          },
          {
            q: "Preciso de uma API para usar?",
            a: "Não. Tudo é processado localmente no navegador.",
          },
        ],
      },
    },
  },
  youtubeTitleGenerator: {
    routeKey: "youtubeTitleGenerator",
    content: {
      es: {
        metaTitle: "Generador de títulos de YouTube",
        metaDescription:
          "Crea títulos para YouTube según el tema de tu video en Clipnexo. Genera ideas claras, atractivas y listas para copiar en segundos para mejorar tu",
        h1: "Generador de títulos de YouTube",
        lead:
          "Escribe el tema de tu video y elige un estilo. Genera títulos claros y llamativos para usar en YouTube.",
        howTitle: "Cómo usar el generador de títulos",
        howSteps: [
          "Escribe el tema o idea central de tu video.",
          "Selecciona el estilo del título: tutorial, lista, review, comparativa, educativo o viral.",
          "Genera hasta 10 títulos diferentes.",
          "Elige el título que mejor describa tu video y cópialo.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para crear títulos de YouTube que sean claros y atractivos, basados en el tema del video y el estilo de publicación.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Usa palabras claves relevantes al principio del título.",
          "Elige un estilo acorde al formato del video.",
          "Revisa la longitud del título antes de publicarlo.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "Combínalo con el comprobador de longitud de título y el generador de descripciones para más coherencia.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Cuántos títulos puedo generar?",
            a: "La herramienta genera 10 títulos basados en el tema y el estilo que elijas.",
          },
          {
            q: "¿Funciona para videos cortos y largos?",
            a: "Sí. Elige el estilo que mejor se adapte a tu formato de video.",
          },
          {
            q: "¿Necesita datos reales del video?",
            a: "No. Usa solo el tema y estilo para generar ideas rápidas.",
          },
        ],
      },
      en: {
        metaTitle: "Free YouTube Title Generator Online",
        metaDescription:
          "Create YouTube titles based on your video topic on Clipnexo. Generate clear, catchy and ready-to-copy title ideas quickly for your next social media project.",
        h1: "YouTube Title Generator",
        lead:
          "Enter your video topic and choose a style. Generate clear and catchy titles for YouTube.",
        howTitle: "How to use the title generator",
        howSteps: [
          "Type the topic or main idea of your video.",
          "Select the title style: tutorial, list, review, comparison, educational or viral.",
          "Generate 10 different title suggestions.",
          "Pick the title that best fits your video and copy it.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "It helps create YouTube titles that are clear and appealing, based on the video's topic and publishing style.",
        tipsTitle: "Tips for better results",
        tips: [
          "Use relevant keywords at the beginning of the title.",
          "Choose a style that fits the video's format.",
          "Check the title length before publishing.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "Combine it with the title length checker and description generator for more consistency.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "How many titles can I generate?",
            a: "The tool generates 10 titles based on the topic and style you choose.",
          },
          {
            q: "Does it work for short and long videos?",
            a: "Yes. Choose the style that best matches your video format.",
          },
          {
            q: "Does it need real video data?",
            a: "No. It only uses the topic and style to generate quick ideas.",
          },
        ],
      },
      pt: {
        metaTitle: "Gerador de títulos para YouTube",
        metaDescription:
          "Crie títulos para YouTube com base no tema do vídeo no Clipnexo. Gere ideias claras, atrativas e prontas para copiar em seus vídeos e aumente sua audiência.",
        h1: "Gerador de títulos para YouTube",
        lead:
          "Digite o tema do vídeo e escolha um estilo. Gere títulos claros e chamativos para o YouTube.",
        howTitle: "Como usar o gerador de títulos",
        howSteps: [
          "Digite o tema ou ideia central do seu vídeo.",
          "Selecione o estilo de título: tutorial, lista, review, comparativo, educativo ou viral.",
          "Gere até 10 títulos diferentes.",
          "Escolha o título que melhor descreve seu vídeo e copie.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Ela ajuda a criar títulos para YouTube que sejam claros e atrativos, baseados no tema do vídeo e no estilo de publicação.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Use palavras-chave relevantes no início do título.",
          "Escolha um estilo que combine com o formato do vídeo.",
          "Verifique o tamanho do título antes de publicar.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Combine com o verificador de comprimento de título e o gerador de descrições para mais consistência.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "Quantos títulos posso gerar?",
            a: "A ferramenta gera 10 títulos com base no tema e estilo escolhidos.",
          },
          {
            q: "Funciona para vídeos curtos e longos?",
            a: "Sim. Escolha o estilo que melhor combina com o formato do vídeo.",
          },
          {
            q: "Precisa de dados reais do vídeo?",
            a: "Não. Usa apenas o tema e o estilo para gerar ideias rápidas.",
          },
        ],
      },
    },
  },
  youtubeTitleExtractor: {
    routeKey: "youtubeTitleExtractor",
    content: {
      es: {
        metaTitle: "Extractor de títulos de YouTube",
        metaDescription:
          "Extrae y ordena títulos desde textos o listas de videos de YouTube en Clipnexo. Limpia resultados y copia ideas rápidamente para mejorar tu contenido",
        h1: "Extractor de títulos de YouTube",
        lead:
          "Pega textos o listas y separa los posibles títulos de video en líneas limpias y fáciles de copiar.",
        howTitle: "Cómo usar el extractor de títulos",
        howSteps: [
          "Pega el texto o la lista de títulos en el campo.",
          "Haz clic en extraer para recibir resultados limpios por línea.",
          "Elimina URLs o caracteres que no forman parte del título.",
          "Copia la lista de títulos para inspiración o edición.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para ordenar títulos encontrados en textos largos y obtener una lista limpia de ideas para YouTube.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Incluye solo el texto que contenga los títulos o temas del video.",
          "Usa los títulos extraídos como punto de partida, no como títulos finales.",
          "Elimina URLs y contenido irrelevante antes de copiar.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "También puedes generar títulos, etiquetas y descripciones para tus videos de YouTube.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿El extractor elimina URLs?",
            a: "Sí. Trata de limpiar URLs y mostrar solo las frases que parecen títulos.",
          },
          {
            q: "¿Los resultados son perfectos?",
            a: "Son ideas limpias. Revisa y edita según el estilo de tu canal.",
          },
          {
            q: "¿Puedo usarlo para listas largas?",
            a: "Sí. Funciona con textos o listas de títulos de videos.",
          },
        ],
      },
      en: {
        metaTitle: "Free YouTube Title Extractor Online",
        metaDescription:
          "Extract and organize YouTube titles from texts or video lists on Clipnexo. Clean results and copy title ideas quickly for your next social media video project.",
        h1: "YouTube Title Extractor",
        lead:
          "Paste text or lists and separate potential video titles into clean, copy-ready lines.",
        howTitle: "How to use the title extractor",
        howSteps: [
          "Paste the text or title list into the field.",
          "Click extract to receive clean line-by-line results.",
          "Remove URLs or characters that are not part of the title.",
          "Copy the title list for inspiration or editing.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "It helps organize titles found in longer text and turns them into a clean list of ideas for YouTube.",
        tipsTitle: "Tips for better results",
        tips: [
          "Include only text that contains titles or video topics.",
          "Use extracted titles as starting points, not final titles.",
          "Remove irrelevant URLs and content before copying.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "You can also generate titles, tags and descriptions for your YouTube videos.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Does it remove URLs?",
            a: "Yes. It tries to clean URLs and show only phrases that look like titles.",
          },
          {
            q: "Are the results perfect?",
            a: "They are clean ideas. Review and edit them to match your channel style.",
          },
          {
            q: "Can I use it for long lists?",
            a: "Yes. It works with texts or title lists.",
          },
        ],
      },
      pt: {
        metaTitle: "Extrator de títulos do YouTube",
        metaDescription:
          "Extraia e organize títulos a partir de textos ou listas de vídeos do YouTube no Clipnexo. Limpe resultados e copie ideias rapidamente para seus vídeos online.",
        h1: "Extrator de títulos do YouTube",
        lead:
          "Cole textos ou listas e separe possíveis títulos de vídeo em linhas limpas e fáceis de copiar.",
        howTitle: "Como usar o extrator de títulos",
        howSteps: [
          "Cole o texto ou lista de títulos no campo.",
          "Clique em extrair para receber resultados limpos por linha.",
          "Remova URLs ou caracteres que não façam parte do título.",
          "Copie a lista de títulos para inspiração ou edição.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Ela ajuda a organizar títulos encontrados em textos longos e a criar uma lista limpa de ideias para YouTube.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Inclua apenas texto que contenha títulos ou temas de vídeo.",
          "Use os títulos extraídos como ponto de partida, não como títulos finais.",
          "Remova URLs e conteúdo irrelevante antes de copiar.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Você também pode gerar títulos, tags e descrições para seus vídeos do YouTube.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "Remove URLs?",
            a: "Sim. Tenta limpar URLs e mostrar apenas frases que parecem títulos.",
          },
          {
            q: "Os resultados são perfeitos?",
            a: "São ideias limpas. Revise e edite para combinar com o estilo do seu canal.",
          },
          {
            q: "Posso usar para listas longas?",
            a: "Sim. Funciona com textos ou listas de títulos.",
          },
        ],
      },
    },
  },
  youtubeTitleLengthChecker: {
    routeKey: "youtubeTitleLengthChecker",
    content: {
      es: {
        metaTitle: "Longitud de título YouTube gratis",
        metaDescription:
          "Revisa la longitud de tu título de YouTube en Clipnexo. Cuenta caracteres, mejora el texto y evita títulos demasiado largos para optimizar tu SEO en segundos.",
        h1: "Longitud de título de YouTube",
        lead:
          "Pega tu título y revisa la cantidad de caracteres para evitar que quede cortado en las búsquedas de YouTube.",
        howTitle: "Cómo usar el comprobador de longitud",
        howSteps: [
          "Pega o escribe el título de tu video.",
          "Observa el contador de caracteres en vivo.",
          "Lee el indicador de tamaño: corto, bueno, largo o muy largo.",
          "Ajusta el título para que quede claro y dentro del límite recomendado.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para validar que tu título de YouTube tenga un tamaño adecuado y evitar que se corte en la vista previa de la plataforma.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Mantén el título claro y relevante, incluso si es un poco más corto.",
          "Evita relleno con palabras innecesarias solo para aumentar el conteo.",
          "Revisa el indicador antes de publicar para no perder información clave.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "Puedes complementar con el generador de títulos, la capitalización y la descripción de YouTube.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Cuántos caracteres son recomendados?",
            a: "Un título entre 40 y 60 caracteres suele ser claro y visible en resultados de búsqueda.",
          },
          {
            q: "¿El título puede ser muy largo?",
            a: "Sí, pero puede cortarse en YouTube. Es mejor usar un título más directo.",
          },
          {
            q: "¿Esto garantiza mejor posicionamiento?",
            a: "No. Ayuda a ajustar el título, pero el rendimiento depende de varios factores.",
          },
        ],
      },
      en: {
        metaTitle: "YouTube Title Length Checker Online",
        metaDescription:
          "Check your YouTube title length on Clipnexo. Count characters, improve your text and avoid titles that are too long for better visibility on social media now.",
        h1: "YouTube Title Length Checker",
        lead:
          "Paste your title and see the live character count. Adjust the text before publishing to avoid cut-off titles.",
        howTitle: "How to use the length checker",
        howSteps: [
          "Paste or type your video title.",
          "Watch the live character counter.",
          "Read the size indicator: short, good, long or too long.",
          "Adjust the title to keep it clear and within the recommended range.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "It helps validate your YouTube title length and avoid titles that may be cut off in previews.",
        tipsTitle: "Tips for better results",
        tips: [
          "Keep the title clear and relevant even if it is shorter.",
          "Avoid filler words just to increase length.",
          "Check the indicator before publishing to keep key information visible.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "Complement it with the title generator, capitalization tool and description generator.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "How many characters are recommended?",
            a: "A title between 40 and 60 characters is usually clear and visible in search results.",
          },
          {
            q: "Can the title be too long?",
            a: "Yes, but it may be cut off on YouTube. It's better to use a more direct title.",
          },
          {
            q: "Does this guarantee better ranking?",
            a: "No. It helps adjust the title, but performance depends on many factors.",
          },
        ],
      },
      pt: {
        metaTitle: "Verificador de tamanho de título YouTube grátis",
        metaDescription:
          "Verifique o tamanho do título do YouTube no Clipnexo. Conte caracteres, melhore o texto e evite títulos muito longos para otimizar o seu SEO online agora.",
        h1: "Tamanho do título do YouTube",
        lead:
          "Cole seu título e veja a contagem de caracteres em tempo real. Ajuste o texto antes de publicar.",
        howTitle: "Como usar o verificador de tamanho",
        howSteps: [
          "Cole ou digite o título do seu vídeo.",
          "Observe o contador de caracteres ao vivo.",
          "Leia o indicador de tamanho: curto, bueno, longo ou muito longo.",
          "Ajuste o título para mantê-lo claro e no limite recomendado.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Ajuda a validar o comprimento do título do YouTube e evita títulos que podem ser cortados nas visualizações.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Mantenha o título claro e relevante, mesmo que seja mais curto.",
          "Evite palavras de preenchimento só para aumentar o comprimento.",
          "Verifique o indicador antes de publicar para manter informações chave visíveis.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Combine com o gerador de títulos, a ferramenta de capitalização e o gerador de descrições.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "Quantos caracteres são recomendados?",
            a: "Um título entre 40 e 60 caracteres costuma ser claro e visível nos resultados de busca.",
          },
          {
            q: "O título pode ser muito longo?",
            a: "Sim, mas pode ser cortado no YouTube. É melhor usar um título mais direto.",
          },
          {
            q: "Isso garante melhor posicionamento?",
            a: "Não. Ajuda a ajustar o título, mas o desempenho depende de muitos fatores.",
          },
        ],
      },
    },
  },
  youtubeDescriptionGenerator: {
    routeKey: "youtubeDescriptionGenerator",
    content: {
      es: {
        metaTitle: "Generador de descripciones YouTube",
        metaDescription:
          "Crea descripciones para YouTube según el tema de tu video en Clipnexo. Genera textos claros, ordenados y listos para copiar en segundos para ser viral hoy.",
        h1: "Generador de descripciones YouTube",
        lead:
          "Escribe el tema de tu video y agrega enlaces o llamadas a la acción para generar una descripción estructurada.",
        howTitle: "Cómo usar el generador de descripciones",
        howSteps: [
          "Escribe el tema principal de tu video.",
          "Agrega un enlace principal o llamada a la acción si lo deseas.",
          "Incluye tus redes sociales opcionales.",
          "Genera la descripción y copia el texto ordenado.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para crear descripciones claras y organizadas que ayuden a presentar el contenido del video y los enlaces importantes.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Incluye el tema principal en la primera línea.",
          "Usa un enlace destacado para tu página o producto clave.",
          "Añade redes sociales solo si son relevantes para el video.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "También puedes generar títulos, hashtags y revisar la longitud para una publicación completa.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿La descripción es apta para YouTube?",
            a: "Sí. Crea un texto organizado que puedes adaptar y pegar en la descripción del video.",
          },
          {
            q: "¿Puedo agregar enlaces?",
            a: "Sí. Incluye un enlace principal y tus redes sociales opcionales.",
          },
          {
            q: "¿Es mejor usar descripciones más largas?",
            a: "YouTube permite descripciones largas, pero lo importante es empezar con claridad y valor.",
          },
        ],
      },
      en: {
        metaTitle: "YouTube Description Generator Online",
        metaDescription:
          "Create YouTube descriptions based on your video topic on Clipnexo. Generate clear, organized and ready-to-copy text quickly for your next social media post.",
        h1: "YouTube Description Generator",
        lead:
          "Enter your video topic and add links or calls to action to generate a structured description.",
        howTitle: "How to use the description generator",
        howSteps: [
          "Type your video's main topic.",
          "Add a main link or call-to-action if desired.",
          "Include optional social media links.",
          "Generate the description and copy the organized text.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "It helps create clear, organized descriptions that present video content and important links.",
        tipsTitle: "Tips for better results",
        tips: [
          "Include the main topic in the first line.",
          "Use a highlighted link for your key page or offer.",
          "Add social links only if they are relevant to the video.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "You can also generate titles, hashtags and check length for a complete post.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Is the description ready for YouTube?",
            a: "Yes. It creates organized text you can adapt and paste in your video description.",
          },
          {
            q: "Can I add links?",
            a: "Yes. Include a main link and optional social media links.",
          },
          {
            q: "Should descriptions be long?",
            a: "YouTube allows long descriptions, but it is important to start with clarity and value.",
          },
        ],
      },
      pt: {
        metaTitle: "Gerador de descrições YouTube grátis online",
        metaDescription:
          "Crie descrições para YouTube com base no tema do vídeo no Clipnexo. Gere textos claros, organizados e prontos para copiar em seus vídeos favoritos online.",
        h1: "Gerador de descrições YouTube",
        lead:
          "Digite o tema do vídeo e adicione links ou chamadas para ação para gerar uma descrição estruturada.",
        howTitle: "Como usar o gerador de descrições",
        howSteps: [
          "Digite o tema principal do seu vídeo.",
          "Adicione um link principal ou chamada para ação se quiser.",
          "Inclua suas redes sociais opcionais.",
          "Gere a descrição e copie o texto organizado.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Serve para criar descrições claras e organizadas que apresentam o conteúdo do vídeo e os links importantes.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Inclua o tema principal na primeira linha.",
          "Use um link em destaque para sua página ou oferta principal.",
          "Adicione links sociais apenas se forem relevantes para o vídeo.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Você também pode gerar títulos, hashtags e verificar o tamanho para um post completo.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "A descrição está pronta para o YouTube?",
            a: "Sim. Ela cria um texto organizado que você pode adaptar e colar na descrição do vídeo.",
          },
          {
            q: "Posso adicionar links?",
            a: "Sim. Inclua um link principal e redes sociais opcionais.",
          },
          {
            q: "As descrições devem ser longas?",
            a: "O YouTube permite descrições longas, mas é importante começar com clareza e valor.",
          },
        ],
      },
    },
  },
  youtubeDescriptionExtractor: {
    routeKey: "youtubeDescriptionExtractor",
    content: {
      es: {
        metaTitle: "Extractor de descripción de YouTube",
        metaDescription:
          "Extrae y limpia descripciones de YouTube desde textos pegados en Clipnexo. Ordena enlaces, hashtags y contenido rápidamente para mejorar tu flujo de trabajo.",
        h1: "Extractor de descripción YouTube",
        lead:
          "Pega la descripción o el texto y separa el contenido principal, enlaces y hashtags en bloques claros.",
        howTitle: "Cómo usar el extractor de descripción",
        howSteps: [
          "Pega el texto completo de la descripción en el campo.",
          "Haz clic en extraer para ver el texto principal, enlaces y hashtags separados.",
          "Copia cada bloque por separado según lo necesites.",
          "Usa el resultado para organizar mejor tu descripción en YouTube.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para limpiar y ordenar descripciones largas de YouTube, separando el texto, los enlaces y los hashtags.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Incluye el texto completo para que el extractor identifique todos los bloques.",
          "Revisa los enlaces extraídos antes de copiarlos.",
          "Asegúrate de que los hashtags estén bien formateados en el texto original.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "También puedes extraer hashtags, generar descripciones y preparar títulos para tus videos.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Se separan los enlaces automáticamente?",
            a: "Sí. El extractor agrupa los enlaces en un bloque independiente para que sea más fácil copiarlos.",
          },
          {
            q: "¿También separa hashtags?",
            a: "Sí. Muestra los hashtags en un bloque separado junto al texto principal.",
          },
          {
            q: "¿Necesita API externa?",
            a: "No. El análisis se realiza en tu navegador.",
          },
        ],
      },
      en: {
        metaTitle: "YouTube Description Extractor Online",
        metaDescription:
          "Extract and clean YouTube descriptions from pasted text on Clipnexo. Organize links, hashtags and content quickly for your next social media video project.",
        h1: "YouTube Description Extractor",
        lead:
          "Paste the description text and separate the main content, links and hashtags in clear blocks.",
        howTitle: "How to use the description extractor",
        howSteps: [
          "Paste the full description text into the field.",
          "Click extract to see main copy, links and hashtags separated.",
          "Copy each block separately as needed.",
          "Use the result to organize your YouTube description more clearly.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "It helps clean and organize long YouTube descriptions by separating text, links and hashtags.",
        tipsTitle: "Tips for better results",
        tips: [
          "Paste the full text so the extractor can identify all blocks.",
          "Review extracted links before copying them.",
          "Ensure hashtags are properly formatted in the source text.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "You can also extract hashtags, generate descriptions and prepare titles for your videos.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Does it separate links automatically?",
            a: "Yes. It groups links into a separate block for easier copying.",
          },
          {
            q: "Does it separate hashtags too?",
            a: "Yes. It shows hashtags in a separate block next to the main text.",
          },
          {
            q: "Does it need an external API?",
            a: "No. The analysis runs in your browser.",
          },
        ],
      },
      pt: {
        metaTitle: "Extrator de descrição do YouTube",
        metaDescription:
          "Extraia e limpe descrições do YouTube a partir de textos colados no Clipnexo. Organize links, hashtags e conteúdo rapidamente para seus vídeos favoritos.",
        h1: "Extrator de descrição YouTube",
        lead:
          "Cole a descrição ou texto e separe o conteúdo principal, links e hashtags em blocos claros.",
        howTitle: "Como usar o extrator de descrição",
        howSteps: [
          "Cole o texto completo da descrição no campo.",
          "Clique em extrair para ver o texto principal, links e hashtags separados.",
          "Copie cada bloco separadamente conforme precisar.",
          "Use o resultado para organizar sua descrição do YouTube com mais clareza.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Ela ajuda a limpar e organizar descrições longas do YouTube, separando texto, links e hashtags.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Cole o texto completo para que o extrator identifique todos os blocos.",
          "Revise os links extraídos antes de copiá-los.",
          "Garanta que os hashtags estejam formatados corretamente no texto original.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Você também pode extrair hashtags, gerar descrições e preparar títulos para seus vídeos.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "Separa links automaticamente?",
            a: "Sim. Agrupa os links em um bloco separado para cópia mais fácil.",
          },
          {
            q: "Também separa hashtags?",
            a: "Sim. Mostra as hashtags em um bloco separado junto com o texto principal.",
          },
          {
            q: "Precisa de API externa?",
            a: "Não. A análise roda no seu navegador.",
          },
        ],
      },
    },
  },
  youtubeTitleCapitalization: {
    routeKey: "youtubeTitleCapitalization",
    content: {
      es: {
        metaTitle: "Mayúsculas para títulos de YouTube",
        metaDescription:
          "Convierte títulos de YouTube a mayúsculas, minúsculas o estilo título en Clipnexo. Ajusta tus textos rápido antes de publicar para mejorar tu SEO en segundos.",
        h1: "Mayúsculas para títulos YouTube",
        lead:
          "Pega el título de tu video y convierte el texto a mayúsculas, minúsculas, tipo título o capitalizar oración.",
        howTitle: "Cómo usar el convertidor de mayúsculas",
        howSteps: [
          "Pega o escribe el título de tu video.",
          "Elige el modo que necesitas: MAYÚSCULAS, minúsculas, tipo título o capitalizar oración.",
          "Copia el resultado más claro para tu publicación.",
          "Prueba diferentes opciones hasta encontrar la presentación ideal.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para ajustar rápidamente el estilo del título de YouTube y mantenerlo coherente con tu marca o formato de video.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Usa mayúsculas solo cuando sea consistente con tu estilo de canal.",
          "Minúsculas pueden funcionar bien para títulos informales o amigables.",
          "Revisa el resultado para evitar palabras demasiado formales o difíciles de leer.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "También puedes generar títulos nuevos, comprobar su longitud y crear descripciones coherentes.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Cambia el significado del título?",
            a: "No. Solo ajusta el estilo de capitalización sin cambiar las palabras.",
          },
          {
            q: "¿Puedo usar lo que genera directamente?",
            a: "Sí. Copia la versión que mejor se vea para tu video.",
          },
          {
            q: "¿Necesito escribir el título completo?",
            a: "Sí. Pega el título completo para obtener la conversión correcta.",
          },
        ],
      },
      en: {
        metaTitle: "YouTube Title Capitalization Tool Online",
        metaDescription:
          "Convert YouTube titles to uppercase, lowercase or title case on Clipnexo. Adjust your text quickly before publishing for better visibility on social media.",
        h1: "YouTube Title Capitalization",
        lead:
          "Paste your video title and convert the text to uppercase, lowercase, title case or sentence case.",
        howTitle: "How to use the capitalization tool",
        howSteps: [
          "Paste or type your video title.",
          "Choose the mode you want: UPPERCASE, lowercase, Title Case or Sentence case.",
          "Copy the result that looks best for your post.",
          "Try different options until the title appears clear and readable.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "It helps adjust the style of your YouTube title and keep it consistent with your channel branding or video format.",
        tipsTitle: "Tips for better results",
        tips: [
          "Use uppercase only if it fits your channel style.",
          "Lowercase can work well for informal or friendly titles.",
          "Review the result to avoid unreadable or overly formal text.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "You can also generate new titles, check length and create consistent descriptions.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Does it change the title meaning?",
            a: "No. It only adjusts capitalization style without changing the words.",
          },
          {
            q: "Can I use the generated text directly?",
            a: "Yes. Copy the version that looks best for your video.",
          },
          {
            q: "Do I need to paste the full title?",
            a: "Yes. Paste the full title to get the correct conversion.",
          },
        ],
      },
      pt: {
        metaTitle: "Maiúsculas para títulos YouTube",
        metaDescription:
          "Converta títulos do YouTube para maiúsculas, minúsculas ou estilo título no Clipnexo. Ajuste seus textos rápido antes de publicar para melhor SEO online.",
        h1: "Maiúsculas para títulos YouTube",
        lead:
          "Cole o título do vídeo e converta o texto para maiúsculas, minúsculas, tipo título ou capitalizar sentença.",
        howTitle: "Como usar o conversor de maiúsculas",
        howSteps: [
          "Cole ou digite o título do seu vídeo.",
          "Escolha o modo que quer: MAIÚSCULAS, minúsculas, Tipo Título ou Capitalizar sentença.",
          "Copie o resultado que ficar melhor para sua publicação.",
          "Teste diferentes opções até o título ficar claro e legível.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Ela ajuda a ajustar o estilo do título do YouTube e mantê-lo consistente com sua marca ou formato de vídeo.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Use maiúsculas apenas se combinar com o estilo do canal.",
          "Minúsculas podem funcionar bem para títulos informais.",
          "Revise o resultado para evitar texto difícil de ler.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Você também pode gerar títulos novos, verificar comprimento e criar descrições consistentes.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "Muda o significado do título?",
            a: "Não. Apenas ajusta o estilo de capitalização sem mudar as palavras.",
          },
          {
            q: "Posso usar o texto gerado direto?",
            a: "Sim. Copie a versão que ficar melhor para o seu vídeo.",
          },
          {
            q: "Preciso colar o título completo?",
            a: "Sim. Cole o título completo para obter a conversão correta.",
          },
        ],
      },
    },
  },
  youtubeEmbedCodeGenerator: {
    routeKey: "youtubeEmbedCodeGenerator",
    content: {
      es: {
        metaTitle: "Generador de código de inserción YouTube gratis",
        metaDescription:
          "Crea código embed de YouTube desde una URL de video en Clipnexo. Personaliza tamaño, inicio, controles y copia el iframe para tu sitio web en segundos hoy.",
        h1: "Código de inserción de YouTube",
        lead:
          "Pega la URL de un video y personaliza el iframe con ancho, alto, tiempo de inicio y controles visibles.",
        howTitle: "Cómo usar el generador de embed",
        howSteps: [
          "Pega la URL del video de YouTube.",
          "Ajusta el ancho, alto y tiempo de inicio si quieres.",
          "Activa o desactiva los controles según prefieras.",
          "Copia el código iframe generado y pégalo en tu sitio.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText:
          "Sirve para crear un iframe de YouTube listo para copiar, con opciones de tamaño y arranque personalizadas.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Usa un ancho y alto compatibles con tu diseño web.",
          "Ajusta el tiempo de inicio solo si necesitas mostrar una sección específica.",
          "Comprueba que la URL del video esté en formato estándar de YouTube.",
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro:
          "También puedes generar enlaces de tiempo, suscripción y miniaturas para tus videos.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          {
            q: "¿Necesita API de YouTube?",
            a: "No. Solo usa la URL del video para generar el iframe.",
          },
          {
            q: "¿Puedo cambiar el tamaño del reproductor?",
            a: "Sí. Ajusta el ancho y alto antes de copiar el código.",
          },
          {
            q: "¿El iframe carga la vista previa correcta?",
            a: "Sí. Usa el ID del video extraído de la URL para crear el embed.",
          },
        ],
      },
      en: {
        metaTitle: "YouTube Embed Code Generator Online",
        metaDescription:
          "Create YouTube embed code from a video URL on Clipnexo. Customize size, start time, controls and copy the iframe quickly for your social media project.",
        h1: "YouTube Embed Code Generator",
        lead:
          "Paste a YouTube video URL and customize the iframe width, height, start time and control visibility.",
        howTitle: "How to use the embed generator",
        howSteps: [
          "Paste the YouTube video URL.",
          "Adjust width, height and start time if needed.",
          "Enable or disable controls as you prefer.",
          "Copy the generated iframe code and paste it into your site.",
        ],
        purposeTitle: "What this tool is for",
        purposeText:
          "It creates a ready-to-copy YouTube iframe with custom sizing and start options.",
        tipsTitle: "Tips for better results",
        tips: [
          "Use dimensions that match your page layout.",
          "Set a start time only when you need a specific section.",
          "Check the URL is a standard YouTube link.",
        ],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro:
          "You can also generate timestamp links, subscribe links and thumbnails for your videos.",
        faqTitle: "Frequently asked questions",
        faqs: [
          {
            q: "Does it need the YouTube API?",
            a: "No. It only uses the video URL to generate the iframe.",
          },
          {
            q: "Can I change the player size?",
            a: "Yes. Adjust width and height before copying the code.",
          },
          {
            q: "Will the embed show the correct preview?",
            a: "Yes. It uses the video ID extracted from the URL.",
          },
        ],
      },
      pt: {
        metaTitle: "Gerador de código de incorporação YouTube grátis",
        metaDescription:
          "Crie código embed do YouTube a partir de uma URL no Clipnexo. Personalize tamanho, início, controles e copie o iframe para seu site de forma rápida agora.",
        h1: "Código de incorporação YouTube",
        lead:
          "Cole a URL de um vídeo e personalize o iframe com largura, altura, tempo de início e controles visíveis.",
        howTitle: "Como usar o gerador de embed",
        howSteps: [
          "Cole a URL do vídeo do YouTube.",
          "Ajuste largura, altura e tempo de início se precisar.",
          "Ative ou desative os controles como preferir.",
          "Copie o código iframe gerado e cole no seu site.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText:
          "Serve para criar um iframe do YouTube pronto para copiar, com tamanho e início personalizados.",
        tipsTitle: "Dicas para melhores resultados",
        tips: [
          "Use dimensões que combinem com o seu layout.",
          "Defina o tempo de início apenas quando precisar de uma seção específica.",
          "Verifique se a URL é um link padrão do YouTube.",
        ],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro:
          "Você também pode gerar links de tempo, links de inscrição e baixar miniaturas.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          {
            q: "Precisa da API do YouTube?",
            a: "Não. Usa apenas a URL do vídeo para gerar o iframe.",
          },
          {
            q: "Posso mudar o tamanho do player?",
            a: "Sim. Ajuste largura e altura antes de copiar o código.",
          },
          {
            q: "O embed mostra a prévia correta?",
            a: "Sim. Usa o ID do vídeo extraído da URL.",
          },
        ],
      },
    },
  },
  youtubeTimestampLinkGenerator: {
    routeKey: "youtubeTimestampLinkGenerator",
    content: {
      es: {
        metaTitle: "Crea enlaces de tiempo en YouTube",
        metaDescription:
          "Crea enlaces de YouTube con marca de tiempo en Clipnexo. Pega una URL, elige minuto y segundo, y copia el enlace exacto para compartir momentos",
        h1: "Generador de enlaces de tiempo de YouTube",
        lead: "Pega la URL de tu video y elige minuto y segundo para generar un enlace directo con marca de tiempo listo para compartir.",
        howTitle: "Cómo usar el generador de enlaces de tiempo",
        howSteps: [
          "Pega la URL del video de YouTube.",
          "Ingresa el minuto y segundo de inicio.",
          "Genera el enlace con el parámetro de tiempo.",
          "Copia el enlace y compártelo donde prefieras."
        ],
        purposeTitle: "¿Para qué sirve esta herramienta?",
        purposeText: "Sirve para crear un enlace que abra el video en un punto específico, ideal para destacar momentos clave en redes sociales o blogs.",
        tipsTitle: "Consejos para mejores resultados",
        tips: [
          "Asegúrate de usar una URL válida de YouTube.",
          "Verifica el minuto y segundo antes de compartir el enlace.",
          "Usa el enlace para destacar secciones importantes en tu contenido."
        ],
        moreToolsTitle: "Más herramientas de Clipnexo",
        moreToolsIntro: "También puedes generar códigos embed, enlaces de suscripción y descargar miniaturas.",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          { q: "¿Necesita API de YouTube?", a: "No. Solo usa la URL y el tiempo que indiques localmente." },
          { q: "¿Funciona con cualquier video?", a: "Sí, siempre que el video sea público o esté oculto con enlace." }
        ]
      },
      en: {
        metaTitle: "YouTube Timestamp Link Generator Online",
        metaDescription:
          "Create YouTube links with a specific timestamp on Clipnexo. Paste a URL, choose minutes and seconds, and copy the exact link to share key video moments now.",
        h1: "Free YouTube timestamp link generator tool",
        lead: "Paste your video URL and choose minutes and seconds to generate a direct timestamp link ready to share.",
        howTitle: "How to use the timestamp generator",
        howSteps: ["Paste the YouTube video URL.", "Enter the start minute and second.", "Generate the link with the time parameter.", "Copy the link and share it anywhere."],
        purposeTitle: "What is this tool for?",
        purposeText: "It helps you create a link that opens a video at a specific point, perfect for highlighting key moments on social media or blogs.",
        tipsTitle: "Tips for better results",
        tips: ["Make sure you use a valid YouTube URL.", "Check the minute and second before sharing the link.", "Use the link to point out important sections in your content."],
        moreToolsTitle: "More Clipnexo tools",
        moreToolsIntro: "You can also generate embed codes, subscribe links and download thumbnails.",
        faqTitle: "Frequently Asked Questions",
        faqs: [
          { q: "Does it need the YouTube API?", a: "No. It only uses the URL and time you provide locally." },
          { q: "Does it work with any video?", a: "Yes, as long as the video is public or unlisted." }
        ]
      },
      pt: {
        metaTitle: "Gerador de links de tempo YouTube",
        metaDescription:
          "Crie links do YouTube com marca de tempo no Clipnexo. Cole uma URL, escolha o minuto e segundo, e copie o link exato para compartilhar momentos específicos.",
        h1: "Gerador de links de tempo de YouTube",
        lead: "Cole a URL do seu vídeo e escolha o minuto e segundo para gerar um link direto com marca de tempo pronto para compartilhar.",
        howTitle: "Como usar o gerador de links de tempo",
        howSteps: ["Cole a URL do vídeo do YouTube.", "Insira o minuto e segundo de início.", "Gere o link com o parâmetro de tempo.", "Copie o link e compartilhe onde preferir."],
        purposeTitle: "Para que serve esta ferramenta?",
        purposeText: "Serve para criar um link que abre o vídeo em um ponto específico, ideal para destacar momentos-chave em redes sociais ou blogs.",
        tipsTitle: "Dicas para melhores resultados",
        tips: ["Certifique-se de usar uma URL válida do YouTube.", "Verifique o minuto e segundo antes de compartilhar o link.", "Use o link para destacar seções importantes no seu conteúdo."],
        moreToolsTitle: "Mais ferramentas do Clipnexo",
        moreToolsIntro: "Você também pode gerar códigos embed, links de inscrição e baixar miniaturas.",
        faqTitle: "Perguntas frequentes",
        faqs: [
          { q: "Precisa da API do YouTube?", a: "Não. Usa apenas a URL e o tempo que você indicar localmente." },
          { q: "Funciona com qualquer vídeo?", a: "Sim, desde que o vídeo seja público ou não listado." }
        ]
      }
    }
  },
  youtubeSubscribeLinkGenerator: {
    routeKey: "youtubeSubscribeLinkGenerator",
    content: {
      es: {
        metaTitle: "Generador de enlaces de suscripción YouTube",
        metaDescription:
          "Crea un enlace de suscripción automática para tu canal de YouTube en Clipnexo. Aumenta tus suscriptores con un link directo que pide confirmación al usuario.",
        h1: "Generador de enlaces de suscripción de YouTube",
        lead: "Crea un enlace directo que pide confirmación de suscripción al abrir tu canal de YouTube.",
        howTitle: "Cómo crear tu enlace",
        howSteps: ["Copia la URL de tu canal.", "Pégala en el campo de arriba.", "Genera el enlace optimizado.", "Pruébalo y compártelo."],
        purposeTitle: "Aumenta tus suscriptores",
        purposeText: "Este enlace añade un parámetro que muestra una ventana emergente de confirmación de suscripción, facilitando que nuevos usuarios se suscriban.",
        tipsTitle: "Dónde usar el enlace",
        tips: ["En la descripción de tus videos.", "En tu biografía de redes sociales.", "En botones de suscripción de tu web."],
        moreToolsTitle: "Más para tu canal",
        moreToolsIntro: "Optimiza tu canal con estas herramientas:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Funciona en móviles?", a: "Sí, funciona tanto en navegadores móviles como de escritorio." }]
      },
      en: {
        metaTitle: "YouTube Subscribe Link Generator Online",
        metaDescription:
          "Create an auto-subscription link for your YouTube channel on Clipnexo. Boost your subscribers with a direct link that asks users for confirmation immediately.",
        h1: "YouTube subscription link generator tool",
        lead: "Create a direct link that prompts users to confirm their subscription when they visit your YouTube channel.",
        howTitle: "How to create your link",
        howSteps: ["Copy your channel URL.", "Paste it into the field above.", "Generate the optimized link.", "Test and share it."],
        purposeTitle: "Boost your subscribers",
        purposeText: "This link adds a parameter that displays a subscription confirmation popup, making it easier for new viewers to join your channel.",
        tipsTitle: "Where to use the link",
        tips: ["In your video descriptions.", "In your social media bios.", "In subscription buttons on your website."],
        moreToolsTitle: "More for your channel",
        moreToolsIntro: "Optimize your channel with these tools:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "Does it work on mobile?", a: "Yes, it works on both mobile and desktop browsers." }]
      },
      pt: {
        metaTitle: "Gerador de links de inscrição YouTube grátis no",
        metaDescription: "Crie um link de inscrição automática para seu canal do YouTube no Clipnexo. Aumente seus inscritos com um link direto que pede confirmação ao usuário agora.",
        h1: "Gerador de links de inscrição de YouTube",
        lead: "Crie um link direto que solicita a confirmação de inscrição ao abrir seu canal do YouTube.",
        howTitle: "Como criar seu link",
        howSteps: ["Copie a URL do seu canal.", "Cole-a no campo acima.", "Gere o link otimizado.", "Teste e compartilhe."],
        purposeTitle: "Aumente seus inscritos",
        purposeText: "Este link adiciona um parâmetro que mostra um popup de confirmação de inscrição, facilitando que novos usuários se inscrevam no seu canal.",
        tipsTitle: "Onde usar o link",
        tips: ["Na descrição dos seus vídeos.", "Na sua biografia das redes sociais.", "Em botões de inscrição no seu site."],
        moreToolsTitle: "Mais para seu canal",
        moreToolsIntro: "Otimize seu canal com estas ferramentas:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Funciona em celulares?", a: "Sim, funciona tanto em navegadores móveis quanto desktop." }]
      }
    }
  },
  youtubeThumbnailDownloader: {
    routeKey: "youtubeThumbnailDownloader",
    content: {
      es: {
        metaTitle: "Descargar miniaturas de YouTube",
        metaDescription:
          "Descarga las miniaturas de cualquier video de YouTube en alta resolución (HD) con Clipnexo. Solo pega la URL del video y obtén la imagen de portada hoy mismo.",
        h1: "Descargar miniaturas de YouTube gratis online",
        lead: "Obtén la imagen de portada (miniatura) de cualquier video de YouTube en máxima calidad.",
        howTitle: "Cómo descargar la miniatura",
        howSteps: ["Pega la URL del video de YouTube.", "Visualiza las diferentes calidades.", "Haz clic en descargar en la versión HD.", "Guarda la imagen en tu dispositivo."],
        purposeTitle: "Análisis de competencia",
        purposeText: "Descargar miniaturas te permite analizar los diseños que mejor funcionan en tu nicho para inspirarte en tus propias creaciones.",
        tipsTitle: "Calidad de imagen",
        tips: ["Busca siempre la versión 'Maximum Res'.", "Asegúrate de que la URL sea pública.", "Usa las imágenes solo como referencia visual."],
        moreToolsTitle: "Herramientas de YouTube",
        moreToolsIntro: "Sigue optimizando tus videos:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Es legal descargar miniaturas?", a: "Sí, para uso personal o referencia. No debes usarlas como propias sin permiso del autor." }]
      },
      en: {
        metaTitle: "Free YouTube Thumbnail Downloader",
        metaDescription:
          "Download thumbnails from any YouTube video in high resolution (HD) on Clipnexo. Just paste the video URL and get the cover image in seconds for free today.",
        h1: "Download YouTube thumbnails free online tool",
        lead: "Get the cover image (thumbnail) of any YouTube video in maximum quality easily.",
        howTitle: "How to download the thumbnail",
        howSteps: ["Paste the YouTube video URL.", "View the different quality options.", "Click download on the HD version.", "Save the image to your device."],
        purposeTitle: "Competitor Analysis",
        purposeText: "Downloading thumbnails allows you to analyze which designs work best in your niche to inspire your own creations.",
        tipsTitle: "Image Quality",
        tips: ["Always look for the 'Maximum Res' version.", "Make sure the URL is public.", "Use the images only as a visual reference."],
        moreToolsTitle: "YouTube Tools",
        moreToolsIntro: "Keep optimizing your videos:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "Is it legal to download thumbnails?", a: "Yes, for personal use or reference. Do not use them as your own without permission." }]
      },
      pt: {
        metaTitle: "Baixar miniaturas do YouTube grátis online",
        metaDescription:
          "Baixe as miniaturas de qualquer vídeo do YouTube em alta resolução (HD) no Clipnexo. Basta colar a URL do vídeo e obter a imagem de capa em segundos grátis.",
        h1: "Baixar miniaturas do YouTube grátis online",
        lead: "Obtenha a imagem de capa (miniatura) de qualquer vídeo do YouTube em qualidade máxima.",
        howTitle: "Como baixar a miniatura",
        howSteps: ["Cole a URL do vídeo do YouTube.", "Visualize as diferentes qualidades.", "Clique em baixar na versão HD.", "Salve a imagem no seu dispositivo."],
        purposeTitle: "Análise de concorrência",
        purposeText: "Baixar miniaturas permite analisar os designs que funcionam melhor no seu nicho para inspirar suas próprias criações.",
        tipsTitle: "Qualidade da imagem",
        tips: ["Busque sempre a versão 'Maximum Res'.", "Certifique-se de que a URL seja pública.", "Use as imagens apenas como referência visual."],
        moreToolsTitle: "Ferramentas de YouTube",
        moreToolsIntro: "Continue otimizando seus vídeos:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "É legal baixar miniaturas?", a: "Sim, para uso pessoal ou referência. Não as use como suas sem permissão do autor." }]
      }
    }
  },
  youtubeMoneyCalculator: {
    routeKey: "youtubeMoneyCalculator",
    content: {
      es: {
        metaTitle: "Calculadora de dinero de YouTube",
        metaDescription:
          "Calcula cuánto dinero puede ganar un video o canal de YouTube según las vistas y el CPM estimado en Clipnexo. Herramienta gratuita para creadores sociales.",
        h1: "Calculadora de dinero de YouTube gratis online",
        lead: "Estima los ingresos potenciales de un video de YouTube basándote en el número de visualizaciones y el CPM de tu nicho.",
        howTitle: "Cómo calcular ingresos",
        howSteps: ["Ingresa el número total de vistas.", "Ajusta el CPM estimado (por 1000 vistas).", "Revisa el resultado diario, mensual y anual.", "Compara con diferentes niveles de retención."],
        purposeTitle: "Planifica tu monetización",
        purposeText: "Conocer tus ingresos potenciales te ayuda a decidir qué tipo de contenido es más rentable para tu canal.",
        tipsTitle: "Consejos de CPM",
        tips: ["El CPM varía según el país de tu audiencia.", "Nichos como finanzas tienen CPM más alto.", "Aumenta la duración de tus videos para más anuncios."],
        moreToolsTitle: "Herramientas financieras",
        moreToolsIntro: "Otras formas de analizar tu éxito:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿El resultado es exacto?", a: "Es una estimación basada en promedios. YouTube descuenta una comisión del 45%." }]
      },
      en: {
        metaTitle: "YouTube Money Calculator for Creators",
        metaDescription:
          "Calculate how much money a YouTube video or channel can earn based on views and estimated CPM on Clipnexo. Free online tool for social media creators now.",
        h1: "Free YouTube money calculator for creators",
        lead: "Estimate the potential earnings of a YouTube video based on the number of views and the CPM of your niche.",
        howTitle: "How to calculate income",
        howSteps: ["Enter the total number of views.", "Adjust the estimated CPM (per 1000 views).", "Review the daily, monthly, and yearly result.", "Compare with different retention levels."],
        purposeTitle: "Plan your monetization",
        purposeText: "Knowing your potential income helps you decide what type of content is most profitable for your channel.",
        tipsTitle: "CPM Tips",
        tips: ["CPM varies by your audience's country.", "Niches like finance have higher CPM.", "Increase your video length for more ads."],
        moreToolsTitle: "Financial Tools",
        moreToolsIntro: "Other ways to analyze your success:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "Is the result exact?", a: "It is an estimate based on averages. YouTube takes a 45% commission." }]
      },
      pt: {
        metaTitle: "Calculadora de dinheiro do YouTube",
        metaDescription: "Calcule quanto dinheiro um vídeo ou canal do YouTube pode ganhar com base em visualizações e CPM estimado no Clipnexo. Ferramenta grátis para criadores.",
        h1: "Calculadora de dinheiro do YouTube grátis online",
        lead: "Estime os ganhos potenciais de um vídeo do YouTube com base no número de visualizações e no CPM do seu nicho.",
        howTitle: "Como calcular ganhos",
        howSteps: ["Insira o número total de visualizações.", "Ajuste o CPM estimado (por 1000 visualizações).", "Revise o resultado diário, mensal e anual.", "Compare com diferentes níveis de retenção."],
        purposeTitle: "Planeje sua monetização",
        purposeText: "Conhecer sua renda potencial ajuda você a decidir que tipo de conteúdo é mais lucrativo para seu canal.",
        tipsTitle: "Dicas de CPM",
        tips: ["O CPM varia conforme o país do seu público.", "Nichos como finanças têm CPM mais alto.", "Aumente a duração dos vídeos para ter mais anúncios."],
        moreToolsTitle: "Ferramentas financeiras",
        moreToolsIntro: "Outras formas de analisar seu sucesso:",
        faqTitle: "Preguntas frequentes",
        faqs: [{ q: "O resultado é exato?", a: "É uma estimativa baseada em médias. O YouTube desconta uma comissão de 45%." }]
      }
    }
  },
  youtubeViewRatioCalculator: {
    routeKey: "youtubeViewRatioCalculator",
    content: {
      es: {
        metaTitle: "Calculadora de proporción de vistas YouTube",
        metaDescription:
          "Calcula la proporción de vistas de tus videos de YouTube según impresiones y CTR en Clipnexo. Optimiza el rendimiento de tu canal con datos precisos hoy.",
        h1: "Calculadora de proporción de vistas de YouTube gratis",
        lead: "Analiza el rendimiento de tus miniaturas y títulos calculando el porcentaje de clics (CTR) y vistas generadas.",
        howTitle: "Cómo usar la calculadora",
        howSteps: ["Ingresa el número de impresiones.", "Escribe el número de clics o vistas.", "Revisa el porcentaje de conversión.", "Ajusta tus miniaturas según el resultado."],
        purposeTitle: "Optimiza tu CTR",
        purposeText: "Una buena proporción de vistas indica que tu miniatura y título están captando la atención de tu audiencia.",
        tipsTitle: "Mejora tus vistas",
        tips: ["Usa colores llamativos en miniaturas.", "Crea títulos que generen curiosidad.", "Analiza qué videos tienen mejor proporción."],
        moreToolsTitle: "Más estadísticas",
        moreToolsIntro: "Entiende mejor tu canal:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Qué es un buen CTR?", a: "En YouTube, un CTR entre el 2% y el 10% se considera normal." }]
      },
      en: {
        metaTitle: "YouTube View Ratio Calculator Online",
        metaDescription:
          "Calculate your YouTube video view ratio based on impressions and CTR on Clipnexo. Optimize your channel performance with accurate data for free online now.",
        h1: "Free YouTube view ratio calculator for creators",
        lead: "Analyze your thumbnail and title performance by calculating the click-through rate (CTR) and views generated.",
        howTitle: "How to use the calculator",
        howSteps: ["Enter the number of impressions.", "Type the number of clicks or views.", "Review the conversion percentage.", "Adjust your thumbnails based on the result."],
        purposeTitle: "Optimize your CTR",
        purposeText: "A good view ratio indicates that your thumbnail and title are capturing your audience's attention.",
        tipsTitle: "Improve your views",
        tips: ["Use striking colors in thumbnails.", "Create titles that spark curiosity.", "Analyze which videos have the best ratio."],
        moreToolsTitle: "More Statistics",
        moreToolsIntro: "Understand your channel better:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "What is a good CTR?", a: "On YouTube, a CTR between 2% and 10% is considered normal." }]
      },
      pt: {
        metaTitle: "Calculadora de proporção de views YouTube",
        metaDescription: "Calcule a proporção de visualizações dos seus vídeos do YouTube com base em impressões no Clipnexo. Otimize o desempenho do seu canal com dados reais agora.",
        h1: "Calculadora de proporção de views de YouTube grátis",
        lead: "Analise o desempenho de suas miniaturas e títulos calculando a taxa de cliques (CTR) e visualizações geradas.",
        howTitle: "Como usar a calculadora",
        howSteps: ["Insira o número de impressões.", "Digite o número de cliques ou views.", "Revise a porcentagem de conversão.", "Ajuste suas miniaturas conforme o resultado."],
        purposeTitle: "Otimize seu CTR",
        purposeText: "Uma boa proporção de visualizações indica que sua miniatura e título estão captando a atenção do seu público.",
        tipsTitle: "Melhore suas views",
        tips: ["Use cores vibrantes nas miniaturas.", "Crie títulos que gerem curiosidade.", "Analise quais vídeos têm a melhor proporção."],
        moreToolsTitle: "Mais estatísticas",
        moreToolsIntro: "Entenda melhor seu canal:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "O que é um bom CTR?", a: "No YouTube, um CTR entre 2% e 10% é considerado normal." }]
      }
    }
  },
  instagramCaptionGenerator: {
    routeKey: "instagramCaptionGenerator",
    content: {
      es: {
        metaTitle: "Generador de captions para Instagram",
        metaDescription:
          "Crea captions para Instagram según tu tema, tono y objetivo en Clipnexo. Genera textos atractivos, rápidos y listos para copiar en segundos con esta utilidad.",
        h1: "Generador de captions para Instagram gratis online",
        lead: "Crea captions para Instagram según tu tema, tono y objetivo. Genera textos atractivos, rápidos y listos para copiar en segundos.",
        howTitle: "Cómo funciona el generador de captions",
        howSteps: ["Escribe el tema de tu post.", "Selecciona el tono y objetivo.", "Haz clic en generar.", "Copia el resultado."],
        purposeTitle: "¿Para qué sirve esta herramienta?",
        purposeText: "Te ayuda a ahorrar tiempo creando textos que conectan con tu audiencia en Instagram.",
        tipsTitle: "Consejos para mejores resultados",
        tips: ["Sé específico con el tema.", "Prueba diferentes tonos.", "Usa emojis para dar personalidad."],
        moreToolsTitle: "Herramientas relacionadas",
        moreToolsIntro: "Mejora tu presencia en Instagram con estas herramientas:",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          { q: "¿Es gratis?", a: "Sí, es totalmente gratis y sin registro." },
          { q: "¿Cuántos puedo generar?", a: "No hay límite, genera todos los que necesites." }
        ]
      },
      en: {
        metaTitle: "Free Instagram Caption Generator",
        metaDescription:
          "Create Instagram captions by topic, tone and goal on Clipnexo. Generate engaging text ideas that are quick, useful and ready to copy for your social media.",
        h1: "Free Instagram caption generator for better posts",
        lead: "Create Instagram captions by topic, tone and goal. Generate engaging text ideas that are quick, useful and ready to copy.",
        howTitle: "How the caption generator works",
        howSteps: ["Enter your post topic.", "Select tone and goal.", "Click generate.", "Copy the result."],
        purposeTitle: "What is this tool for?",
        purposeText: "It helps you save time creating texts that connect with your audience on Instagram.",
        tipsTitle: "Tips for better results",
        tips: ["Be specific with the topic.", "Try different tones.", "Use emojis to add personality."],
        moreToolsTitle: "Related Tools",
        moreToolsIntro: "Improve your Instagram presence with these tools:",
        faqTitle: "Frequently Asked Questions",
        faqs: [
          { q: "Is it free?", a: "Yes, it is completely free and no registration is required." },
          { q: "How many can I generate?", a: "There is no limit, generate as many as you need." }
        ]
      },
      pt: {
        metaTitle: "Gerador de legendas para Instagram",
        metaDescription:
          "Crie legendas para Instagram por tema, tom e objetivo no Clipnexo. Gere textos atrativos, rápidos e prontos para copiar em segundos com esta ferramenta hoje.",
        h1: "Gerador de legendas para Instagram grátis online",
        lead: "Crie legendas para Instagram por tema, tom e objetivo. Gere textos atrativos, rápidos e prontos para copiar em segundos.",
        howTitle: "Como funciona o gerador de legendas",
        howSteps: ["Digite o tema do seu post.", "Selecione o tom e objetivo.", "Clique em gerar.", "Copie o resultado."],
        purposeTitle: "Para que serve esta ferramenta?",
        purposeText: "Ajuda você a economizar tempo criando textos que conectam com seu público no Instagram.",
        tipsTitle: "Dicas para melhores resultados",
        tips: ["Seja específico com o tema.", "Tente tons diferentes.", "Use emojis para dar personalidade."],
        moreToolsTitle: "Ferramentas relacionadas",
        moreToolsIntro: "Melhore sua presença no Instagram com estas ferramentas:",
        faqTitle: "Perguntas frequentes",
        faqs: [
          { q: "É grátis?", a: "Sim, é totalmente gratuito e sem necessidade de registro." },
          { q: "Quantas posso gerar?", a: "Não há limite, gere quantas precisar." }
        ]
      }
    }
  },
  instagramHashtagGenerator: {
    routeKey: "instagramHashtagGenerator",
    content: {
      es: {
        metaTitle: "Generador de hashtags para Instagram",
        metaDescription:
          "Genera hashtags para Instagram según tu nicho o tema en Clipnexo. Crea etiquetas limpias, relevantes y listas para copiar en segundos para ser más viral hoy.",
        h1: "Generador de hashtags para Instagram gratis online",
        lead: "Genera hashtags para Instagram según tu nicho o tema. Crea etiquetas limpias, relevantes y listas para copiar en segundos.",
        howTitle: "Cómo usar el generador",
        howSteps: ["Ingresa tu palabra clave.", "Elige tu nicho.", "Copia los hashtags generados."],
        purposeTitle: "¿Por qué usar hashtags?",
        purposeText: "Los hashtags ayudan a que tus posts lleguen a personas interesadas en tu temática.",
        tipsTitle: "Mejores prácticas",
        tips: ["No uses siempre los mismos.", "Combina hashtags grandes con pequeños.", "Asegúrate de que sean relevantes."],
        moreToolsTitle: "Explora más",
        moreToolsIntro: "Optimiza tu contenido con estas herramientas:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Cuántos hashtags genera?", a: "Puedes elegir entre 10 y 30 hashtags." }]
      },
      en: {
        metaTitle: "Free Instagram Hashtag Generator for Viral Reach",
        metaDescription:
          "Generate Instagram hashtags by topic or niche on Clipnexo. Create clean, relevant and ready-to-copy tags for posts, reels and stories to grow online fast.",
        h1: "Free Instagram hashtag generator for your posts",
        lead: "Generate Instagram hashtags by niche or topic. Create clean, relevant and ready-to-copy tags for posts, reels and stories.",
        howTitle: "How to use the generator",
        howSteps: ["Enter your keyword.", "Choose your niche.", "Copy the generated hashtags."],
        purposeTitle: "Why use hashtags?",
        purposeText: "Hashtags help your posts reach people interested in your topic.",
        tipsTitle: "Best practices",
        tips: ["Don't use the same ones every time.", "Mix large and small hashtags.", "Make sure they are relevant."],
        moreToolsTitle: "Explore more",
        moreToolsIntro: "Optimize your content with these tools:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "How many hashtags does it generate?", a: "You can choose between 10 and 30 hashtags." }]
      },
      pt: {
        metaTitle: "Gerador de hashtags para Instagram",
        metaDescription:
          "Gere hashtags para Instagram por nicho ou tema no Clipnexo. Crie etiquetas limpas, relevantes e prontas para copiar rapidamente e aumentar seu alcance agora.",
        h1: "Gerador de hashtags para Instagram grátis online",
        lead: "Gere hashtags para Instagram por nicho ou tema. Crie etiquetas limpas, relevantes e prontas para copiar rapidamente.",
        howTitle: "Como usar o gerador",
        howSteps: ["Insira sua palavra-chave.", "Escolha seu nicho.", "Copie as hashtags geradas."],
        purposeTitle: "Por que usar hashtags?",
        purposeText: "As hashtags ajudam seus posts a alcançarem pessoas interessadas no seu tema.",
        tipsTitle: "Melhores práticas",
        tips: ["Não use sempre as mesmas.", "Combine hashtags grandes e pequenas.", "Garanta que sejam relevantes."],
        moreToolsTitle: "Explore mais",
        moreToolsIntro: "Otimize seu conteúdo com estas ferramentas:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Quantas hashtags ele gera?", a: "Você pode escolher entre 10 e 30 hashtags." }]
      }
    }
  },
  instagramBioGenerator: {
    routeKey: "instagramBioGenerator",
    content: {
      es: {
        metaTitle: "Generador de bio para Instagram",
        metaDescription:
          "Crea bios profesionales para Instagram según tu estilo y marca en Clipnexo. Genera ideas creativas, rápidas y listas para copiar en segundos para tu",
        h1: "Generador de bio para Instagram gratis online",
        lead: "Crea bios profesionales para Instagram según tu estilo y marca. Genera ideas creativas, rápidas y listas para copiar en segundos.",
        howTitle: "Cómo crear tu bio",
        howSteps: ["Describe tu perfil o negocio.", "Selecciona el estilo.", "Copia la bio que más te guste."],
        purposeTitle: "Optimiza tu perfil",
        purposeText: "Tu bio es lo primero que ven los usuarios; asegúrate de que sea atractiva y clara.",
        tipsTitle: "Consejos para tu bio",
        tips: ["Sé breve y directo.", "Incluye una llamada a la acción.", "Usa emojis relevantes."],
        moreToolsTitle: "Mejora tu Instagram",
        moreToolsIntro: "Otras herramientas para tu perfil:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Puedo usarla para negocios?", a: "Sí, es ideal para perfiles personales y profesionales." }]
      },
      en: {
        metaTitle: "Free Instagram Bio Generator Online",
        metaDescription:
          "Create professional Instagram bios based on your style and brand on Clipnexo. Generate creative, quick and ready-to-copy ideas in seconds for your profile now.",
        h1: "Free Instagram bio generator for your profile",
        lead: "Create professional Instagram bios based on your style and brand. Generate creative, quick and ready-to-copy ideas in seconds.",
        howTitle: "How to create your bio",
        howSteps: ["Describe your profile or business.", "Select the style.", "Copy the bio you like best."],
        purposeTitle: "Optimize your profile",
        purposeText: "Your bio is the first thing users see; make sure it's engaging and clear.",
        tipsTitle: "Tips for your bio",
        tips: ["Be brief and direct.", "Include a call to action.", "Use relevant emojis."],
        moreToolsTitle: "Improve your Instagram",
        moreToolsIntro: "Other tools for your profile:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "Can I use it for business?", a: "Yes, it is ideal for personal and professional profiles." }]
      },
      pt: {
        metaTitle: "Gerador de bio para Instagram",
        metaDescription: "Crie bios profissionais para Instagram baseadas no seu estilo e marca no Clipnexo. Gere ideias criativas, rápidas e prontas para copiar para seu perfil agora.",
        h1: "Gerador de bio para Instagram grátis online",
        lead: "Crie bios profissionais para Instagram baseadas no seu estilo e marca. Gere ideias criativas, rápidas e prontas para copiar em segundos.",
        howTitle: "Como criar sua bio",
        howSteps: ["Descreva seu perfil ou negócio.", "Selecione o estilo.", "Copie a bio que mais gostar."],
        purposeTitle: "Importância da bio",
        purposeText: "Sua biografia é o seu cartão de visitas. Uma boa bio converte visitantes em seguidores.",
        tipsTitle: "Dicas para uma ótima bio",
        tips: ["Use palavras-chave.", "Inclua uma chamada para ação.", "Mantenha curto e direto."],
        moreToolsTitle: "Mais para seu perfil",
        moreToolsIntro: "Dê um toque profissional ao seu Instagram:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Posso usar emojis?", a: "Nossas sugerencias já incluem emojis otimizados." }]
      }
    }
  },
  instagramReelsIdeas: {
    routeKey: "instagramReelsIdeas",
    content: {
      es: {
        metaTitle: "Ideas para Reels de Instagram",
        metaDescription:
          "Genera ideas para Reels según tu nicho, tema u objetivo en Clipnexo. Encuentra propuestas rápidas para crear contenido atractivo y viral para tu audiencia.",
        h1: "Ideas para Reels de Instagram gratis online",
        lead: "Genera ideas para Reels según tu nicho, tema u objetivo. Encuentra propuestas rápidas para crear contenido atractivo.",
        howTitle: "Cómo tener ideas infinitas",
        howSteps: ["Define tu nicho.", "Selecciona el tipo de Reel.", "Inspírate con las 10 ideas."],
        purposeTitle: "¿Por qué hacer Reels?",
        purposeText: "Los Reels son el formato con mayor alcance actualmente en Instagram.",
        tipsTitle: "Consejos virales",
        tips: ["Usa audios en tendencia.", "Engancha en los primeros 3 segundos.", "Aporta valor real."],
        moreToolsTitle: "Herramientas de video",
        moreToolsIntro: "Potencia tus videos con estas utilidades:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Sirve para otros formatos?", a: "Sí, muchas ideas funcionan para TikTok y Shorts." }]
      },
      en: {
        metaTitle: "Free Instagram Reels Ideas Generator Online",
        metaDescription:
          "Generate Instagram Reels ideas by niche, topic or goal on Clipnexo. Find quick content suggestions to create engaging short videos that grow your channel fast.",
        h1: "Free Instagram Reels ideas generator online",
        lead: "Generate Instagram Reels ideas by niche, topic or goal. Find quick content suggestions to create engaging short videos.",
        howTitle: "How to get infinite ideas",
        howSteps: ["Define your niche.", "Select the Reel type.", "Get inspired by the 10 ideas."],
        purposeTitle: "Why make Reels?",
        purposeText: "Reels are currently the format with the highest reach on Instagram.",
        tipsTitle: "Viral tips",
        tips: ["Use trending audios.", "Hook in the first 3 seconds.", "Provide real value."],
        moreToolsTitle: "Video Tools",
        moreToolsIntro: "Boost your videos with these utilities:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "Does it work for other formats?", a: "Yes, many ideas work for TikTok and Shorts." }]
      },
      pt: {
        metaTitle: "Ideias para Reels do Instagram",
        metaDescription:
          "Gere ideias para Reels por nicho, tema ou objetivo no Clipnexo. Encontre sugestões rápidas para criar vídeos curtos atrativos e virais para seu perfil agora.",
        h1: "Ideias para Reels do Instagram grátis online",
        lead: "Gere ideias para Reels por nicho, tema ou objetivo. Encontre sugestões rápidas para criar vídeos curtos atrativos.",
        howTitle: "Como ter ideias infinitas",
        howSteps: ["Defina seu nicho.", "Selecione o tipo de Reel.", "Inspire-se com as 10 ideias."],
        purposeTitle: "Por que fazer Reels?",
        purposeText: "Os Reels são o formato com maior alcance atualmente no Instagram.",
        tipsTitle: "Dicas virais",
        tips: ["Use áudios em alta.", "Prenda a atenção nos primeiros 3 segundos.", "Entregue valor real."],
        moreToolsTitle: "Ferramentas de vídeo",
        moreToolsIntro: "Potencialize seus vídeos com estas utilidades:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Serve para outros formatos?", a: "Sim, muitas ideias funcionam para TikTok e Shorts." }]
      }
    }
  },
  instagramReelsHooks: {
    routeKey: "instagramReelsHooks",
    content: {
      es: {
        metaTitle: "Ganchos para Reels de Instagram",
        metaDescription: "Crea ganchos para Reels según tu tema y estilo en Clipnexo. Genera frases iniciales atractivas para captar atención rápidamente y mejorar la retención hoy.",
        h1: "Ganchos para Reels de Instagram gratis online",
        lead: "Crea ganchos para Reels según tu tema y estilo. Genera frases iniciales atractivas para captar atención rápidamente.",
        howTitle: "Atrapa a tu audiencia",
        howSteps: ["Escribe tu tema.", "Elige el estilo de gancho.", "Prueba los 15 resultados."],
        purposeTitle: "El poder del gancho",
        purposeText: "Si no captas la atención en 3 segundos, el usuario seguirá haciendo scroll.",
        tipsTitle: "Tips de retención",
        tips: ["Usa texto en pantalla.", "Habla con energía.", "Plantea una pregunta intrigante."],
        moreToolsTitle: "Mejora tus Reels",
        moreToolsIntro: "Todo lo que necesitas para tus videos cortos:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Cuántos ganchos genera?", a: "Generamos 15 variaciones por cada tema." }]
      },
      en: {
        metaTitle: "Free Instagram Reels Hook Generator Online Tool",
        metaDescription: "Create Instagram Reels hooks by topic and style on Clipnexo. Generate catchy opening lines to grab attention in the first seconds and increase your",
        h1: "Free Instagram Reels hook generator online",
        lead: "Create Instagram Reels hooks by topic and style. Generate catchy opening lines to grab attention in the first seconds.",
        howTitle: "Hook your audience",
        howSteps: ["Enter your topic.", "Choose the hook style.", "Try the 15 results."],
        purposeTitle: "The power of the hook",
        purposeText: "If you don't grab attention in 3 seconds, the user will keep scrolling.",
        tipsTitle: "Retention tips",
        tips: ["Use on-screen text.", "Speak with energy.", "Ask an intriguing question."],
        moreToolsTitle: "Improve your Reels",
        moreToolsIntro: "Everything you need for your short videos:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "How many hooks does it generate?", a: "We generate 15 variations for each topic." }]
      },
      pt: {
        metaTitle: "Ganchos para Reels do Instagram",
        metaDescription: "Crie ganchos para Reels por tema e estilo no Clipnexo. Gere frases iniciais atrativas para prender atenção rapidamente e melhorar a performance dos vídeos.",
        h1: "Ganchos para Reels do Instagram grátis online",
        lead: "Crie ganchos para Reels por tema e estilo. Gere frases iniciais atrativas para prender atenção rapidamente.",
        howTitle: "Prenda seu público",
        howSteps: ["Digite seu tema.", "Escolha o estilo do gancho.", "Teste os 15 resultados."],
        purposeTitle: "O poder do gancho",
        purposeText: "Se você não prender a atenção em 3 segundos, o usuário continuará deslizando.",
        tipsTitle: "Dicas de retenção",
        tips: ["Use texto na tela.", "Fale com energia.", "Faça uma pergunta intrigante."],
        moreToolsTitle: "Melhore seus Reels",
        moreToolsIntro: "Tudo o que você precisa para seus vídeos curtos:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Quantos ganchos ele gera?", a: "Geramos 15 variações para cada tema." }]
      }
    }
  },
  facebookPostGenerator: {
    routeKey: "facebookPostGenerator",
    content: {
      es: {
        metaTitle: "Generador de posts para Facebook",
        metaDescription: "Crea publicaciones para Facebook según tu tema, tono y objetivo en Clipnexo. Genera textos útiles, claros y listos para copiar que aumenten la interacción hoy.",
        h1: "Generador de posts para Facebook gratis online",
        lead: "Crea publicaciones para Facebook según tu tema, tono y objetivo. Genera textos útiles, claros y listos para copiar.",
        howTitle: "Crea posts que funcionen",
        howSteps: ["Ingresa el tema.", "Selecciona tono y objetivo.", "Copia y publica."],
        purposeTitle: "¿Para qué sirve?",
        purposeText: "Ayuda a mantener activa tu página de Facebook con contenido de calidad sin esfuerzo.",
        tipsTitle: "Consejos para Facebook",
        tips: ["Genera debate.", "Usa imágenes llamativas.", "Responde a los comentarios."],
        moreToolsTitle: "Más para Facebook",
        moreToolsIntro: "Optimiza tu presencia en Facebook:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Es seguro?", a: "Totalmente, no pedimos acceso a tu cuenta." }]
      },
      en: {
        metaTitle: "Free Facebook Post Generator Online",
        metaDescription: "Create Facebook posts by topic, tone and goal on Clipnexo. Generate useful, clear and ready-to-copy content ideas for your page that attract more",
        h1: "Free Facebook post generator for better content",
        lead: "Create Facebook posts by topic, tone and goal. Generate useful, clear and ready-to-copy content ideas for your page.",
        howTitle: "Create posts that work",
        howSteps: ["Enter the topic.", "Select tone and goal.", "Copy and publish."],
        purposeTitle: "What is it for?",
        purposeText: "It helps keep your Facebook page active with quality content effortlessly.",
        tipsTitle: "Facebook Tips",
        tips: ["Generate debate.", "Use eye-catching images.", "Respond to comments."],
        moreToolsTitle: "More for Facebook",
        moreToolsIntro: "Optimize your Facebook presence:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "Is it safe?", a: "Totally, we don't ask for access to your account." }]
      },
      pt: {
        metaTitle: "Gerador de posts para Facebook",
        metaDescription: "Crie publicações para Facebook por tema, tom e objetivo no Clipnexo. Gere textos úteis, claros e prontos para copiar que aumentem o engajamento da",
        h1: "Gerador de posts para Facebook grátis online",
        lead: "Crie publicações para Facebook por tema, tom e objetivo. Gere textos úteis, claros e prontos para copiar.",
        howTitle: "Crie posts que funcionam",
        howSteps: ["Insira o tema.", "Selecione tom e objetivo.", "Copie e publique."],
        purposeTitle: "Para que serve?",
        purposeText: "Ajuda a manter sua página do Facebook ativa com conteúdo de qualidade sem esforço.",
        tipsTitle: "Dicas para Facebook",
        tips: ["Gere debate.", "Use imagens chamativas.", "Responda aos comentários."],
        moreToolsTitle: "Mais para Facebook",
        moreToolsIntro: "Otimize sua presença no Facebook:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "É seguro?", a: "Totalmente, não pedimos acesso à sua conta." }]
      }
    }
  },
  facebookAdGenerator: {
    routeKey: "facebookAdGenerator",
    content: {
      es: {
        metaTitle: "Generador de anuncios para Facebook",
        metaDescription: "Crea textos para anuncios de Facebook según producto y público en Clipnexo. Genera ideas claras para campañas y publicaciones publicitarias muy rentables hoy.",
        h1: "Generador de anuncios para Facebook gratis online",
        lead: "Crea textos para anuncios de Facebook según producto, público y objetivo. Genera ideas claras para campañas y publicaciones.",
        howTitle: "Vende más en Facebook",
        howSteps: ["Describe tu producto.", "Elige tu público.", "Selecciona el objetivo publicitario."],
        purposeTitle: "Anuncios que convierten",
        purposeText: "Un buen copy es la diferencia entre un anuncio caro y uno rentable.",
        tipsTitle: "Tips de Ads",
        tips: ["Enfócate en los beneficios.", "Usa un CTA fuerte.", "Segmenta bien tu audiencia."],
        moreToolsTitle: "Herramientas de Marketing",
        moreToolsIntro: "Lleva tu marketing al siguiente nivel:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Genera varios anuncios?", a: "Sí, generamos 5 variaciones completas." }]
      },
      en: {
        metaTitle: "Free Facebook Ad Copy Generator Online",
        metaDescription: "Create Facebook ad copy by product, audience and goal on Clipnexo. Generate clear ideas for campaigns, posts and promotions that drive more sales and",
        h1: "Free Facebook ad copy generator for campaigns",
        lead: "Create Facebook ad copy by product, audience and goal. Generate clear ideas for campaigns, posts and promotions.",
        howTitle: "Sell more on Facebook",
        howSteps: ["Describe your product.", "Choose your audience.", "Select the advertising goal."],
        purposeTitle: "Ads that convert",
        purposeText: "Good copy is the difference between an expensive ad and a profitable one.",
        tipsTitle: "Ads Tips",
        tips: ["Focus on benefits.", "Use a strong CTA.", "Target your audience well."],
        moreToolsTitle: "Marketing Tools",
        moreToolsIntro: "Take your marketing to the next level:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "Does it generate multiple ads?", a: "Yes, we generate 5 complete variations." }]
      },
      pt: {
        metaTitle: "Gerador de anúncios para Facebook",
        metaDescription: "Crie textos para anúncios do Facebook por produto e objetivo no Clipnexo. Gere ideias claras para campanhas e promoções que convertem mais leads e",
        h1: "Gerador de anúncios para Facebook grátis online",
        lead: "Crie textos para anúncios do Facebook por produto, público e objetivo. Gere ideias claras para campanhas e promoções.",
        howTitle: "Venda mais no Facebook",
        howSteps: ["Descreva seu produto.", "Escolha seu público.", "Selecione o objetivo publicitário."],
        purposeTitle: "Anúncios que convertem",
        purposeText: "Um bom copy é a diferença entre um anúncio caro e um lucrativo.",
        tipsTitle: "Dicas de Ads",
        tips: ["Foque nos benefícios.", "Use um CTA forte.", "Segmente bem seu público."],
        moreToolsTitle: "Ferramentas de Marketing",
        moreToolsIntro: "Leve seu marketing ao próximo nível:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Ele gera vários anúncios?", a: "Sim, geramos 5 variações completas." }]
      }
    }
  },
  marketplaceTextGenerator: {
    routeKey: "marketplaceTextGenerator",
    content: {
      es: {
        metaTitle: "Generador de textos para Marketplace online",
        metaDescription: "Crea descripciones para Facebook Marketplace según producto y precio en Clipnexo. Genera textos claros para vender más rápido y profesionalmente tus productos.",
        h1: "Generador de textos para Marketplace online",
        lead: "Crea descripciones para Facebook Marketplace según producto, estado y precio. Genera textos claros para vender más rápido.",
        howTitle: "Vende rápido tus productos",
        howSteps: ["Pon el nombre del producto.", "Indica precio y estado.", "Copia la descripción perfecta."],
        purposeTitle: "Optimiza tus ventas",
        purposeText: "Una descripción clara evita preguntas innecesarias y acelera la venta.",
        tipsTitle: "Consejos para vender",
        tips: ["Sube buenas fotos.", "Sé honesto con el estado.", "Responde rápido."],
        moreToolsTitle: "Más herramientas",
        moreToolsIntro: "Otras utilidades que te pueden servir:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Es para cualquier producto?", a: "Sí, funciona para tecnología, muebles, ropa, etc." }]
      },
      en: {
        metaTitle: "Free Marketplace Text Generator for Online",
        metaDescription: "Create Facebook Marketplace descriptions by product and price on Clipnexo. Generate clear texts to sell items faster and avoid common questions from",
        h1: "Free Marketplace text generator for products",
        lead: "Create Facebook Marketplace descriptions by product, condition and price. Generate clear texts to sell items faster.",
        howTitle: "Sell your products fast",
        howSteps: ["Enter the product name.", "Indicate price and condition.", "Copy the perfect description."],
        purposeTitle: "Optimize your sales",
        purposeText: "A clear description avoids unnecessary questions and speeds up the sale.",
        tipsTitle: "Selling Tips",
        tips: ["Upload good photos.", "Be honest about the condition.", "Respond quickly."],
        moreToolsTitle: "More Tools",
        moreToolsIntro: "Other utilities that may be useful:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "Is it for any product?", a: "Yes, it works for tech, furniture, clothes, etc." }]
      },
      pt: {
        metaTitle: "Gerador de textos para Marketplace online",
        metaDescription: "Crie descrições para Facebook Marketplace por produto e preço no Clipnexo. Gere textos claros para vender mais rápido e atrair compradores qualificados agora.",
        h1: "Gerador de textos para Marketplace online",
        lead: "Crie descrições para Facebook Marketplace por produto, estado e preço. Gere textos claros para vender mais rápido.",
        howTitle: "Venda seus produtos rápido",
        howSteps: ["Coloque o nome do produto.", "Indique preço e estado.", "Copie a descrição perfeita."],
        purposeTitle: "Otimize suas vendas",
        purposeText: "Uma descrição clara evita perguntas desnecessárias e acelera a venda.",
        tipsTitle: "Dicas para vender",
        tips: ["Suba boas fotos.", "Seja honesto com o estado.", "Responda rápido."],
        moreToolsTitle: "Mais ferramentas",
        moreToolsIntro: "Outras utilidades que podem ser úteis:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "É para qualquer produto?", a: "Sim, funciona para tecnologia, móveis, roupas, etc." }]
      }
    }
  },
  shortVideoScriptGenerator: {
    routeKey: "shortVideoScriptGenerator",
    content: {
      es: {
        metaTitle: "Generador de guiones para videos cortos gratis",
        metaDescription: "Crea guiones para TikTok, Reels y Shorts según tu tema en Clipnexo. Genera hook, desarrollo, cierre y CTA listos para usar en tus videos para ser viral",
        h1: "Generador de guiones para videos cortos gratis",
        lead: "Crea guiones para TikTok, Reels y Shorts según tu tema. Genera hook, desarrollo, cierre y CTA listos para usar.",
        howTitle: "Guiones en segundos",
        howSteps: ["Ingresa tu tema.", "Elige plataforma y duración.", "Copia tu guion estructurado."],
        purposeTitle: "Estructura ganadora",
        purposeText: "Un video corto necesita una estructura clara para no perder al espectador.",
        tipsTitle: "Consejos de grabación",
        tips: ["Graba en vertical.", "Cuida la iluminación.", "Sé breve y directo."],
        moreToolsTitle: "Todo para videos",
        moreToolsIntro: "Complementa tus videos con:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Incluye hashtags?", a: "Sí, sugerimos los mejores para tu tema." }]
      },
      en: {
        metaTitle: "Short Video Script Generator Online",
        metaDescription: "Create scripts for TikTok, Reels and Shorts by topic on Clipnexo. Generate hook, body, closing and CTA ideas ready to use and viralize your short",
        h1: "Free short video script generator for creators",
        lead: "Create scripts for TikTok, Reels and Shorts by topic. Generate hook, body, closing and CTA ideas ready to use.",
        howTitle: "Scripts in seconds",
        howSteps: ["Enter your topic.", "Choose platform and duration.", "Copy your structured script."],
        purposeTitle: "Winning Structure",
        purposeText: "A short video needs a clear structure to not lose the viewer.",
        tipsTitle: "Recording Tips",
        tips: ["Record vertically.", "Take care of the lighting.", "Be brief and direct."],
        moreToolsTitle: "All for videos",
        moreToolsIntro: "Complement your videos with:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "Does it include hashtags?", a: "Yes, we suggest the best ones for your topic." }]
      },
      pt: {
        metaTitle: "Gerador de roteiros para vídeos curtos grátis no",
        metaDescription: "Crie roteiros para TikTok, Reels e Shorts por tema no Clipnexo. Gere gancho, desenvolvimento, fechamento e CTA prontos para usar e viralizar seus",
        h1: "Gerador de roteiros para vídeos curtos grátis",
        lead: "Crie roteiros para TikTok, Reels e Shorts por tema. Gere gancho, desenvolvimento, fechamento e CTA prontos para usar.",
        howTitle: "Roteiros em segundos",
        howSteps: ["Insira seu tema.", "Escolha plataforma e duração.", "Copie seu roteiro estruturado."],
        purposeTitle: "Estrutura vencedora",
        purposeText: "Um vídeo curto precisa de uma estrutura clara para não perder o espectador.",
        tipsTitle: "Dicas de gravação",
        tips: ["Grave na vertical.", "Cuide da iluminação.", "Seja breve e direto."],
        moreToolsTitle: "Tudo para vídeos",
        moreToolsIntro: "Complemente seus vídeos com:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Inclui hashtags?", a: "Sim, sugerimos as melhores para o seu tema." }]
      }
    }
  },
  socialMediaCharacterCounter: {
    routeKey: "socialMediaCharacterCounter",
    content: {
      es: {
        metaTitle: "Contador de caracteres para redes sociales",
        metaDescription: "Cuenta caracteres, palabras, hashtags y emojis para Instagram, TikTok, YouTube, Facebook y Twitter en Clipnexo con límites actualizados para el año 2026 hoy.",
        h1: "Contador de caracteres para redes sociales",
        lead: "Cuenta caracteres, palabras, hashtags y emojis para Instagram, TikTok, YouTube, Facebook, LinkedIn y Twitter/X en segundos.",
        howTitle: "Cómo usar el contador",
        howSteps: ["Pega tu texto.", "Elige la plataforma.", "Revisa las estadísticas en tiempo real."],
        purposeTitle: "Evita cortes",
        purposeText: "Cada red social tiene sus límites. No dejes que tus textos se corten.",
        tipsTitle: "Optimización de texto",
        tips: ["Usa párrafos cortos.", "No abuses de los hashtags.", "Revisa la legibilidad."],
        moreToolsTitle: "Más herramientas",
        moreToolsIntro: "Sigue mejorando tus redes:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Cuenta emojis?", a: "Sí, los detectamos correctamente." }]
      },
      en: {
        metaTitle: "Social Media Character Counter Online Tool for",
        metaDescription: "Count characters, words, hashtags and emojis for Instagram, TikTok, YouTube, Facebook and Twitter on Clipnexo with current 2026 limits for all your posts now.",
        h1: "Social media character counter online tool",
        lead: "Count characters, words, hashtags and emojis for Instagram, TikTok, YouTube, Facebook, LinkedIn and Twitter/X in seconds.",
        howTitle: "How to use the counter",
        howSteps: ["Paste your text.", "Choose the platform.", "Check real-time statistics."],
        purposeTitle: "Avoid cuts",
        purposeText: "Every social network has its limits. Don't let your texts get cut off.",
        tipsTitle: "Text Optimization",
        tips: ["Use short paragraphs.", "Don't overuse hashtags.", "Check readability."],
        moreToolsTitle: "More Tools",
        moreToolsIntro: "Keep improving your networks:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "Does it count emojis?", a: "Yes, we detect them correctly." }]
      },
      pt: {
        metaTitle: "Contador de caracteres para redes sociais",
        metaDescription: "Conte caracteres, palavras, hashtags e emojis para Instagram, TikTok, YouTube, Facebook e Twitter no Clipnexo com os limites de 2026 atualizados para",
        h1: "Contador de caracteres para redes sociais",
        lead: "Conte caracteres, palavras, hashtags e emojis para Instagram, TikTok, YouTube, Facebook, LinkedIn e Twitter/X em segundos.",
        howTitle: "Como usar o contador",
        howSteps: ["Cole seu texto.", "Escolha a plataforma.", "Verifique as estatísticas em tempo real."],
        purposeTitle: "Evite cortes",
        purposeText: "Cada rede social tem seus limites. Não deixe seus textos serem cortados.",
        tipsTitle: "Otimização de texto",
        tips: ["Use parágrafos curtos.", "Não abuse das hashtags.", "Verifique a legibilidade."],
        moreToolsTitle: "Mais ferramentas",
        moreToolsIntro: "Continue melhorando suas redes:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "Ele conta emojis?", a: "Sim, os detectamos corretamente." }]
      }
    }
  },
  wordCounter: {
    routeKey: "wordCounter",
    content: {
      es: {
        metaTitle: "Contador de palabras y caracteres gratis online | Clipnexo",
        metaDescription: "Cuenta palabras, caracteres, párrafos, oraciones y tiempo de lectura en tiempo real. Herramienta gratuita para estudiantes, escritores y creadores. Sin registro ni instalación.",
        h1: "Contador de palabras y caracteres",
        lead: "Pega o escribe tu texto y obtén al instante el número de palabras, caracteres, párrafos, oraciones, tiempo de lectura y palabras más repetidas. Todo en tu navegador, sin enviar datos a servidores.",
        howTitle: "Cómo usar el contador de palabras",
        howSteps: [
          "Escribe o pega tu texto en el área de texto.",
          "Observa las estadísticas en tiempo real: palabras, caracteres, párrafos, oraciones y más.",
          "Usa los botones para copiar el texto, copiar las estadísticas o descargar el texto como archivo TXT.",
          "Comprueba si tu texto cumple con un límite específico de palabras o caracteres.",
          "Revisa las palabras más repetidas y el nivel de legibilidad básico.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText: "Sirve para medir la longitud de cualquier texto académico, artículo, ensayo, tesis o publicación. Te ayuda a cumplir requisitos de extensión, analizar la densidad de palabras clave y estimar el tiempo de lectura o presentación oral.",
        tipsTitle: "Consejos para revisar tus textos",
        tips: [
          "Revisa el conteo antes de entregar un trabajo académico para cumplir con los requisitos de extensión.",
          "Usa el comprobador de límite para ajustar tu texto a un máximo de palabras o caracteres.",
          "Analiza las palabras más repetidas para evitar redundancias y mejorar la variedad léxica.",
          "El nivel de legibilidad es una estimación básica; úsalo como referencia, no como medición exacta.",
          "Todo el análisis ocurre en tu navegador. Tu texto no se guarda ni se envía a ningún servidor.",
        ],
        moreToolsTitle: "Herramientas relacionadas",
        moreToolsIntro: "Explora más herramientas gratuitas para estudiantes y creadores de contenido:",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          { q: "¿Cuenta los espacios?", a: "Sí, mostramos caracteres totales (con espacios) y caracteres sin espacios para que tengas ambas medidas." },
          { q: "¿Funciona sin conexión a internet?", a: "La herramienta carga en el navegador y todo el procesamiento es local. No se envían datos a servidores." },
          { q: "¿Cómo se calcula el tiempo de lectura?", a: "Se estima usando un promedio de 200 palabras por minuto, que es la velocidad de lectura estándar." },
          { q: "¿Cómo se calcula el tiempo de habla?", a: "Se estima usando un promedio de 150 palabras por minuto, que es la velocidad de conversación típica." },
          { q: "¿Qué son las palabras más repetidas?", a: "Es un análisis que muestra las 5 palabras con mayor frecuencia en tu texto, excluyendo palabras comunes como artículos y preposiciones." },
          { q: "¿El nivel de legibilidad es preciso?", a: "Es una estimación básica basada en la longitud promedio de las oraciones. No reemplaza una prueba de legibilidad formal como Flesch-Kincaid." },
        ]
      },
      en: {
        metaTitle: "Free Word and Character Counter Online | Clipnexo",
        metaDescription: "Count words, characters, paragraphs, sentences and reading time in real time. Free tool for students, writers and creators. No registration or installation needed.",
        h1: "Word and Character Counter",
        lead: "Paste or type your text and instantly get word, character, paragraph and sentence counts, reading time, speaking time and most repeated words. All in your browser with no data sent to servers.",
        howTitle: "How to use the word counter",
        howSteps: [
          "Type or paste your text in the text area.",
          "Watch real-time statistics: words, characters, paragraphs, sentences and more.",
          "Use the buttons to copy the text, copy the stats or download the text as a TXT file.",
          "Check if your text meets a specific word or character limit.",
          "Review the most repeated words and basic readability level.",
        ],
        purposeTitle: "What this tool is for",
        purposeText: "It helps measure the length of any academic text, article, essay, thesis or post. It helps you meet length requirements, analyze keyword density and estimate reading or speaking time.",
        tipsTitle: "Tips for reviewing your texts",
        tips: [
          "Check the count before submitting academic work to meet length requirements.",
          "Use the limit checker to adjust your text to a maximum word or character count.",
          "Analyze the most repeated words to avoid redundancy and improve lexical variety.",
          "The readability level is a basic estimate; use it as a reference, not an exact measurement.",
          "All analysis happens in your browser. Your text is not stored or sent to any server.",
        ],
        moreToolsTitle: "Related tools",
        moreToolsIntro: "Explore more free tools for students and content creators:",
        faqTitle: "Frequently asked questions",
        faqs: [
          { q: "Does it count spaces?", a: "Yes, we show total characters (with spaces) and characters without spaces so you have both measurements." },
          { q: "Does it work without internet?", a: "The tool loads in the browser and all processing is local. No data is sent to servers." },
          { q: "How is reading time calculated?", a: "It is estimated using an average of 200 words per minute, the standard reading speed." },
          { q: "How is speaking time calculated?", a: "It is estimated using an average of 150 words per minute, the typical conversation speed." },
          { q: "What are the most repeated words?", a: "It is an analysis showing the 5 most frequent words in your text, excluding common words like articles and prepositions." },
          { q: "Is the readability level accurate?", a: "It is a basic estimate based on average sentence length. It does not replace a formal readability test like Flesch-Kincaid." },
        ]
      },
      pt: {
        metaTitle: "Contador de palavras e caracteres grátis online | Clipnexo",
        metaDescription: "Conte palavras, caracteres, parágrafos, frases e tempo de leitura em tempo real. Ferramenta gratuita para estudantes, escritores e criadores. Sem registro ou instalação.",
        h1: "Contador de palavras e caracteres",
        lead: "Cole ou digite seu texto e obtenha instantaneamente a contagem de palavras, caracteres, parágrafos, frases, tempo de leitura e palavras mais repetidas. Tudo no navegador, sem enviar dados a servidores.",
        howTitle: "Como usar o contador de palavras",
        howSteps: [
          "Digite ou cole seu texto na área de texto.",
          "Observe as estatísticas em tempo real: palavras, caracteres, parágrafos, frases e mais.",
          "Use os botões para copiar o texto, copiar as estatísticas ou baixar o texto como arquivo TXT.",
          "Verifique se seu texto atende a um limite específico de palavras ou caracteres.",
          "Revise as palavras mais repetidas e o nível de legibilidade básico.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText: "Serve para medir o comprimento de qualquer texto acadêmico, artigo, ensaio, tese ou publicação. Ajuda você a cumprir requisitos de extensão, analisar a densidade de palavras-chave e estimar o tempo de leitura ou apresentação oral.",
        tipsTitle: "Dicas para revisar seus textos",
        tips: [
          "Verifique a contagem antes de entregar um trabalho acadêmico para cumprir os requisitos de extensão.",
          "Use o verificador de limite para ajustar seu texto a um máximo de palavras ou caracteres.",
          "Analise as palavras mais repetidas para evitar redundâncias e melhorar a variedade lexical.",
          "O nível de legibilidade é uma estimativa básica; use como referência, não como medição exata.",
          "Toda a análise acontece no navegador. Seu texto não é armazenado nem enviado a servidores.",
        ],
        moreToolsTitle: "Ferramentas relacionadas",
        moreToolsIntro: "Explore mais ferramentas gratuitas para estudantes e criadores de conteúdo:",
        faqTitle: "Perguntas frequentes",
        faqs: [
          { q: "Conta os espaços?", a: "Sim, mostramos caracteres totais (com espaços) e caracteres sem espaços para você ter ambas as medidas." },
          { q: "Funciona sem internet?", a: "A ferramenta carrega no navegador e todo o processamento é local. Nenhum dado é enviado a servidores." },
          { q: "Como é calculado o tempo de leitura?", a: "É estimado usando uma média de 200 palavras por minuto, a velocidade de leitura padrão." },
          { q: "Como é calculado o tempo de fala?", a: "É estimado usando uma média de 150 palavras por minuto, a velocidade de conversação típica." },
          { q: "O que são as palavras mais repetidas?", a: "É uma análise que mostra as 5 palavras mais frequentes no seu texto, excluindo palavras comuns como artigos e preposições." },
          { q: "O nível de legibilidade é preciso?", a: "É uma estimativa básica baseada no comprimento médio das frases. Não substitui um teste de legibilidade formal como Flesch-Kincaid." },
        ]
      }
    }
  },
  caseConverter: {
    routeKey: "caseConverter",
    content: {
      es: {
        metaTitle: "Convertidor de mayúsculas y minúsculas gratis",
        metaDescription: "Convierte textos a mayúsculas, minúsculas, título o oración. Herramienta gratuita online para estudiantes.",
        h1: "Convertidor de mayúsculas y minúsculas",
        lead: "Escribe o pega tu texto y conviértelo a mayúsculas, minúsculas, formato título o oración con un clic.",
        howTitle: "Cómo usar el convertidor",
        howSteps: ["Escribe o pega tu texto.", "Selecciona el formato deseado.", "Copia el resultado convertido."],
        purposeTitle: "Para qué sirve",
        purposeText: "Sirve para cambiar rápidamente el formato de texto sin reescribir manualmente.",
        tipsTitle: "Consejos",
        tips: ["Revisa el resultado después de la conversión.", "El formato título capitaliza cada palabra principal."],
        moreToolsTitle: "Más herramientas",
        moreToolsIntro: "También puedes contar palabras y caracteres:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Qué formatos están disponibles?", a: "Puedes convertir a mayúsculas, minúsculas, formato título y formato oración." }, { q: "¿Funciona con textos largos?", a: "Sí, no hay límite de caracteres." }]
      },
      en: {
        metaTitle: "Free Case Converter Online",
        metaDescription: "Convert text to uppercase, lowercase, title case or sentence case. Free online tool for students.",
        h1: "Case Converter",
        lead: "Paste or type your text and convert it to uppercase, lowercase, title case or sentence case with one click.",
        howTitle: "How to use the converter",
        howSteps: ["Type or paste your text.", "Select the desired format.", "Copy the converted result."],
        purposeTitle: "What it's for",
        purposeText: "It lets you quickly change text format without manual rewriting.",
        tipsTitle: "Tips",
        tips: ["Review the result after conversion.", "Title case capitalizes each main word."],
        moreToolsTitle: "More tools",
        moreToolsIntro: "You can also count words and characters:",
        faqTitle: "FAQ",
        faqs: [{ q: "What formats are available?", a: "You can convert to uppercase, lowercase, title case and sentence case." }, { q: "Does it work with long texts?", a: "Yes, there is no character limit." }]
      },
      pt: {
        metaTitle: "Conversor de maiúsculas e minúsculas grátis",
        metaDescription: "Converta textos para maiúsculas, minúsculas, título ou frase. Ferramenta gratuita online para estudantes.",
        h1: "Conversor de maiúsculas e minúsculas",
        lead: "Digite ou cole seu texto e converta para maiúsculas, minúsculas, formato título ou frase com um clique.",
        howTitle: "Como usar o conversor",
        howSteps: ["Digite ou cole seu texto.", "Selecione o formato desejado.", "Copie o resultado convertido."],
        purposeTitle: "Para que serve",
        purposeText: "Serve para alterar rapidamente o formato do texto sem reescrever manualmente.",
        tipsTitle: "Dicas",
        tips: ["Revise o resultado após a conversão.", "O formato título capitaliza cada palavra principal."],
        moreToolsTitle: "Mais ferramentas",
        moreToolsIntro: "Você também pode contar palavras e caracteres:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Quais formatos estão disponíveis?", a: "Você pode converter para maiúsculas, minúsculas, formato título e formato frase." }, { q: "Funciona com textos longos?", a: "Sim, não há limite de caracteres." }]
      }
    }
  },
  outlineGenerator: {
    routeKey: "outlineGenerator",
    content: {
      es: {
        metaTitle: "Generador de índice para trabajos académicos",
        metaDescription: "Genera un índice estructurado para trabajos académicos, ensayos o tesis. Herramienta gratuita para estudiantes.",
        h1: "Generador de índice para trabajos",
        lead: "Escribe el tema de tu trabajo y genera un índice estructurado con introducción, desarrollo y conclusión.",
        howTitle: "Cómo usar el generador de índice",
        howSteps: ["Escribe el tema principal de tu trabajo.", "Selecciona el tipo de trabajo (ensayo, tesis, informe).", "Elige la profundidad deseada.", "Copia el índice generado."],
        purposeTitle: "Para qué sirve",
        purposeText: "Sirve para organizar las ideas de un trabajo académico antes de empezar a escribir.",
        tipsTitle: "Consejos",
        tips: ["Personaliza las secciones según los requisitos de tu profesor.", "Usa el índice como guía, no como estructura final."],
        moreToolsTitle: "Más herramientas",
        moreToolsIntro: "También puedes generar títulos, introducciones y conclusiones:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Puedo editar el índice después?", a: "Sí, puedes copiarlo y editarlo en tu procesador de textos." }, { q: "¿Funciona para tesis?", a: "Sí, puedes seleccionar la opción de tesis para una estructura más detallada." }]
      },
      en: {
        metaTitle: "Free Outline Generator for Academic Papers",
        metaDescription: "Generate a structured outline for academic papers, essays or theses. Free tool for students.",
        h1: "Outline Generator",
        lead: "Enter your paper topic and generate a structured outline with introduction, body and conclusion.",
        howTitle: "How to use the outline generator",
        howSteps: ["Enter your paper's main topic.", "Select the paper type (essay, thesis, report).", "Choose the desired depth.", "Copy the generated outline."],
        purposeTitle: "What it's for",
        purposeText: "It helps organize ideas for an academic paper before you start writing.",
        tipsTitle: "Tips",
        tips: ["Customize sections based on your professor's requirements.", "Use the outline as a guide, not a final structure."],
        moreToolsTitle: "More tools",
        moreToolsIntro: "You can also generate titles, introductions and conclusions:",
        faqTitle: "FAQ",
        faqs: [{ q: "Can I edit the outline after?", a: "Yes, you can copy and edit it in your word processor." }, { q: "Does it work for theses?", a: "Yes, select the thesis option for a more detailed structure." }]
      },
      pt: {
        metaTitle: "Gerador de índice para trabalhos acadêmicos",
        metaDescription: "Gere um índice estruturado para trabalhos acadêmicos, ensaios ou teses. Ferramenta gratuita para estudantes.",
        h1: "Gerador de índice para trabalhos",
        lead: "Digite o tema do seu trabalho e gere um índice estruturado com introdução, desenvolvimento e conclusão.",
        howTitle: "Como usar o gerador de índice",
        howSteps: ["Digite o tema principal do seu trabalho.", "Selecione o tipo de trabalho (ensaio, tese, relatório).", "Escolha a profundidade desejada.", "Copie o índice gerado."],
        purposeTitle: "Para que serve",
        purposeText: "Serve para organizar as ideias de um trabalho acadêmico antes de começar a escrever.",
        tipsTitle: "Dicas",
        tips: ["Personalize as seções conforme os requisitos do seu professor.", "Use o índice como guia, não como estrutura final."],
        moreToolsTitle: "Mais ferramentas",
        moreToolsIntro: "Você também pode gerar títulos, introduções e conclusões:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Posso editar o índice depois?", a: "Sim, você pode copiá-lo e editá-lo no processador de texto." }, { q: "Funciona para teses?", a: "Sim, selecione a opção de tese para uma estrutura mais detalhada." }]
      }
    }
  },
  assignmentTitleGenerator: {
    routeKey: "assignmentTitleGenerator",
    content: {
      es: {
        metaTitle: "Generador de títulos para trabajos académicos",
        metaDescription: "Genera títulos creativos para trabajos, ensayos y tesis. Herramienta gratuita online para estudiantes.",
        h1: "Generador de títulos para trabajos",
        lead: "Escribe el tema de tu trabajo y recibe sugerencias de títulos creativos y formales para tu proyecto académico.",
        howTitle: "Cómo usar el generador de títulos",
        howSteps: ["Escribe el tema principal de tu trabajo.", "Selecciona el estilo (formal, creativo, mixto).", "Genera títulos y elige el que más te guste.", "Copia el título seleccionado."],
        purposeTitle: "Para qué sirve",
        purposeText: "Sirve para encontrar el título perfecto para tu trabajo académico cuando no sabes cómo empezar.",
        tipsTitle: "Consejos",
        tips: ["Elige un título claro que refleje el contenido.", "Combina palabras clave de tu investigación."],
        moreToolsTitle: "Más herramientas",
        moreToolsIntro: "También puedes generar índices, introducciones y conclusiones:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Puedo generar varios títulos?", a: "Sí, la herramienta genera varias opciones para elegir." }, { q: "¿Los títulos son originales?", a: "Son sugerencias basadas en tu tema, siéntete libre de modificarlos." }]
      },
      en: {
        metaTitle: "Free Assignment Title Generator Online",
        metaDescription: "Generate creative titles for papers, essays and theses. Free online tool for students.",
        h1: "Assignment Title Generator",
        lead: "Enter your paper topic and get creative and formal title suggestions for your academic project.",
        howTitle: "How to use the title generator",
        howSteps: ["Enter your paper's main topic.", "Select the style (formal, creative, mixed).", "Generate titles and pick your favorite.", "Copy the selected title."],
        purposeTitle: "What it's for",
        purposeText: "It helps you find the perfect title for your academic paper when you don't know where to start.",
        tipsTitle: "Tips",
        tips: ["Choose a clear title that reflects the content.", "Combine keywords from your research."],
        moreToolsTitle: "More tools",
        moreToolsIntro: "You can also generate outlines, introductions and conclusions:",
        faqTitle: "FAQ",
        faqs: [{ q: "Can I generate multiple titles?", a: "Yes, the tool generates several options to choose from." }, { q: "Are the titles original?", a: "They are suggestions based on your topic, feel free to modify them." }]
      },
      pt: {
        metaTitle: "Gerador de títulos para trabalhos acadêmicos",
        metaDescription: "Gere títulos criativos para trabalhos, ensaios e teses. Ferramenta gratuita online para estudantes.",
        h1: "Gerador de títulos para trabalhos",
        lead: "Digite o tema do seu trabalho e receba sugestões de títulos criativos e formais para seu projeto acadêmico.",
        howTitle: "Como usar o gerador de títulos",
        howSteps: ["Digite o tema principal do seu trabalho.", "Selecione o estilo (formal, criativo, misto).", "Gere títulos e escolha o que mais gostar.", "Copie o título selecionado."],
        purposeTitle: "Para que serve",
        purposeText: "Serve para encontrar o título perfeito para seu trabalho acadêmico quando você não sabe por onde começar.",
        tipsTitle: "Dicas",
        tips: ["Escolha um título claro que reflita o conteúdo.", "Combine palavras-chave da sua pesquisa."],
        moreToolsTitle: "Mais ferramentas",
        moreToolsIntro: "Você também pode gerar índices, introduções e conclusões:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Posso gerar vários títulos?", a: "Sim, a ferramenta gera várias opções para escolher." }, { q: "Os títulos são originais?", a: "São sugestões baseadas no seu tema, sinta-se à vontade para modificá-los." }]
      }
    }
  },
  introductionGenerator: {
    routeKey: "introductionGenerator",
    content: {
      es: {
        metaTitle: "Generador de introducciones para trabajos",
        metaDescription: "Genera párrafos de introducción para trabajos académicos, ensayos y tesis. Herramienta gratuita online.",
        h1: "Generador de introducciones",
        lead: "Escribe el tema de tu trabajo y genera un párrafo de introducción estructurado y listo para usar.",
        howTitle: "Cómo usar el generador de introducciones",
        howSteps: ["Escribe el tema principal de tu trabajo.", "Selecciona el tono (formal, divulgativo, mixto).", "Elige la extensión del párrafo.", "Copia la introducción generada."],
        purposeTitle: "Para qué sirve",
        purposeText: "Sirve para crear el primer párrafo de tu trabajo académico con una estructura clara que presenta el tema y los objetivos.",
        tipsTitle: "Consejos",
        tips: ["Personaliza la introducción con tus propias ideas.", "Asegúrate de que presente claramente el tema y propósito."],
        moreToolsTitle: "Más herramientas",
        moreToolsIntro: "También puedes generar conclusiones, títulos e índices:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Puedo editar la introducción?", a: "Sí, úsala como base y ajústala a tu estilo personal." }, { q: "¿Qué extensión tiene?", a: "Depende de la opción seleccionada, entre 3 y 6 oraciones." }]
      },
      en: {
        metaTitle: "Free Introduction Generator for Academic Papers",
        metaDescription: "Generate introduction paragraphs for academic papers, essays and theses. Free online tool.",
        h1: "Introduction Generator",
        lead: "Enter your paper topic and generate a structured introduction paragraph ready to use.",
        howTitle: "How to use the introduction generator",
        howSteps: ["Enter your paper's main topic.", "Select the tone (formal, explanatory, mixed).", "Choose the paragraph length.", "Copy the generated introduction."],
        purposeTitle: "What it's for",
        purposeText: "It helps create the first paragraph of your academic paper with a clear structure presenting the topic and objectives.",
        tipsTitle: "Tips",
        tips: ["Customize the introduction with your own ideas.", "Make sure it clearly presents the topic and purpose."],
        moreToolsTitle: "More tools",
        moreToolsIntro: "You can also generate conclusions, titles and outlines:",
        faqTitle: "FAQ",
        faqs: [{ q: "Can I edit the introduction?", a: "Yes, use it as a base and adjust to your personal style." }, { q: "How long is it?", a: "It depends on the selected option, between 3 and 6 sentences." }]
      },
      pt: {
        metaTitle: "Gerador de introduções para trabalhos acadêmicos",
        metaDescription: "Gere parágrafos de introdução para trabalhos acadêmicos, ensaios e teses. Ferramenta gratuita online.",
        h1: "Gerador de introduções",
        lead: "Digite o tema do seu trabalho e gere um parágrafo de introdução estruturado e pronto para usar.",
        howTitle: "Como usar o gerador de introduções",
        howSteps: ["Digite o tema principal do seu trabalho.", "Selecione o tom (formal, divulgativo, misto).", "Escolha a extensão do parágrafo.", "Copie a introdução gerada."],
        purposeTitle: "Para que serve",
        purposeText: "Serve para criar o primeiro parágrafo do seu trabalho acadêmico com uma estrutura clara que apresenta o tema e os objetivos.",
        tipsTitle: "Dicas",
        tips: ["Personalize a introdução com suas próprias ideias.", "Certifique-se de que apresente claramente o tema e o propósito."],
        moreToolsTitle: "Mais ferramentas",
        moreToolsIntro: "Você também pode gerar conclusões, títulos e índices:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Posso editar a introdução?", a: "Sim, use como base e ajuste ao seu estilo pessoal." }, { q: "Qual a extensão?", a: "Depende da opção selecionada, entre 3 e 6 frases." }]
      }
    }
  },
  conclusionGenerator: {
    routeKey: "conclusionGenerator",
    content: {
      es: {
        metaTitle: "Generador de conclusiones para trabajos",
        metaDescription: "Genera párrafos de conclusión para trabajos académicos, ensayos y tesis. Herramienta gratuita online.",
        h1: "Generador de conclusiones",
        lead: "Escribe el tema de tu trabajo y genera un párrafo de conclusión que sintetice los puntos principales.",
        howTitle: "Cómo usar el generador de conclusiones",
        howSteps: ["Escribe el tema principal de tu trabajo.", "Resume los puntos clave que quieres incluir.", "Selecciona el tono deseado.", "Copia la conclusión generada."],
        purposeTitle: "Para qué sirve",
        purposeText: "Sirve para cerrar tu trabajo académico con un párrafo que resuma los hallazgos y reflexiones finales.",
        tipsTitle: "Consejos",
        tips: ["Asegúrate de que la conclusión refleje el contenido del trabajo.", "Evita introducir ideas nuevas en la conclusión."],
        moreToolsTitle: "Más herramientas",
        moreToolsIntro: "También puedes generar introducciones, títulos e índices:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Puedo modificar la conclusión?", a: "Sí, úsala como punto de partida y ajústala a tu trabajo." }, { q: "¿Qué debe incluir una conclusión?", a: "Un resumen de los puntos clave y una reflexión final sobre el tema." }]
      },
      en: {
        metaTitle: "Free Conclusion Generator for Academic Papers",
        metaDescription: "Generate conclusion paragraphs for academic papers, essays and theses. Free online tool.",
        h1: "Conclusion Generator",
        lead: "Enter your paper topic and generate a conclusion paragraph that summarizes the main points.",
        howTitle: "How to use the conclusion generator",
        howSteps: ["Enter your paper's main topic.", "Summarize the key points to include.", "Select the desired tone.", "Copy the generated conclusion."],
        purposeTitle: "What it's for",
        purposeText: "It helps close your academic paper with a paragraph summarizing findings and final thoughts.",
        tipsTitle: "Tips",
        tips: ["Make sure the conclusion reflects the paper content.", "Avoid introducing new ideas in the conclusion."],
        moreToolsTitle: "More tools",
        moreToolsIntro: "You can also generate introductions, titles and outlines:",
        faqTitle: "FAQ",
        faqs: [{ q: "Can I modify the conclusion?", a: "Yes, use it as a starting point and adjust to your paper." }, { q: "What should a conclusion include?", a: "A summary of key points and a final reflection on the topic." }]
      },
      pt: {
        metaTitle: "Gerador de conclusões para trabalhos acadêmicos",
        metaDescription: "Gere parágrafos de conclusão para trabalhos acadêmicos, ensaios e teses. Ferramenta gratuita online.",
        h1: "Gerador de conclusões",
        lead: "Digite o tema do seu trabalho e gere um parágrafo de conclusão que sintetize os pontos principais.",
        howTitle: "Como usar o gerador de conclusões",
        howSteps: ["Digite o tema principal do seu trabalho.", "Resuma os pontos-chave que deseja incluir.", "Selecione o tom desejado.", "Copie a conclusão gerada."],
        purposeTitle: "Para que serve",
        purposeText: "Serve para fechar seu trabalho acadêmico com um parágrafo que resuma os achados e reflexões finais.",
        tipsTitle: "Dicas",
        tips: ["Certifique-se de que a conclusão reflita o conteúdo do trabalho.", "Evite introduzir ideias novas na conclusão."],
        moreToolsTitle: "Mais ferramentas",
        moreToolsIntro: "Você também pode gerar introduções, títulos e índices:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Posso modificar a conclusão?", a: "Sim, use como ponto de partida e ajuste ao seu trabalho." }, { q: "O que deve incluir uma conclusão?", a: "Um resumo dos pontos-chave e uma reflexão final sobre o tema." }]
      }
    }
  },
  textSummarizer: {
    routeKey: "textSummarizer",
    content: {
      es: {
        metaTitle: "Resumidor de texto por caracteres | Clipnexo",
        metaDescription: "Resume textos largos a un número exacto de caracteres. Herramienta gratis para estudiantes, tareas, resúmenes, publicaciones y documentos.",
        h1: "Resumidor de texto por caracteres",
        lead: "Pega tu texto, elige el número máximo de caracteres y obtén un resumen instantáneo manteniendo las ideas principales. Sin registro ni envío de datos a servidores.",
        howTitle: "Cómo usar el resumidor de texto",
        howSteps: [
          "Pega o escribe el texto que quieres resumir.",
          "Elige el número máximo de caracteres del resumen.",
          "Selecciona el tipo de resumen y el tono.",
          "Haz clic en Resumir texto.",
          "Copia el resultado o ajusta el límite si necesitas un resumen más corto.",
        ],
        purposeTitle: "Para qué sirve esta herramienta",
        purposeText: "Este resumidor te ayuda a reducir textos largos manteniendo las ideas principales. Es útil para tareas, apuntes, publicaciones, descripciones, resúmenes académicos y textos con límite de caracteres.",
        tipsTitle: "Consejos para resumir mejor",
        tips: [
          "Elige el tipo de resumen Corto para extraer solo las ideas esenciales.",
          "Usa el tono Académico para trabajos universitarios y el tono Claro para publicaciones.",
          "Revisa siempre el resumen final y ajústalo según el contexto de tu trabajo.",
          "Si el resumen no cubre lo que necesitas, prueba con un tipo más detallado.",
          "Usa esta herramienta como apoyo para comprender y organizar mejor tus ideas.",
        ],
        moreToolsTitle: "Herramientas relacionadas",
        moreToolsIntro: "Explora más herramientas gratuitas para estudiantes y creadores:",
        faqTitle: "Preguntas frecuentes",
        faqs: [
          { q: "¿Puedo elegir cuántos caracteres tendrá el resumen?", a: "Sí, puedes elegir cualquier límite entre 100 y 10,000 caracteres." },
          { q: "¿El resumen se guarda en algún servidor?", a: "No. Todo el procesamiento ocurre en tu navegador. Tu texto no se guarda ni se envía a servidores." },
          { q: "¿Sirve para trabajos académicos?", a: "Sí. Puedes usar el tono Académico y el tipo Detallado para obtener resúmenes más adecuados para contextos universitarios." },
          { q: "¿Puedo resumir textos para redes sociales?", a: "Sí. Usa el tono Simple o Claro con un límite bajo para crear descripciones cortas para publicaciones." },
          { q: "¿El resumen es exacto al límite de caracteres?", a: "Se aproxima al límite sin superarlo. Si una oración completa excede el límite, se recorta con puntos suspensivos." },
        ]
      },
      en: {
        metaTitle: "Text Summarizer by Characters | Clipnexo",
        metaDescription: "Summarize long texts to a specific character limit. Free tool for students, assignments, summaries, posts and documents.",
        h1: "Text summarizer by characters",
        lead: "Paste your text, choose the maximum character count and get an instant summary keeping the main ideas. No registration or data sent to servers.",
        howTitle: "How to use the text summarizer",
        howSteps: [
          "Paste or type the text you want to summarize.",
          "Choose the maximum character count for the summary.",
          "Select the summary type and tone.",
          "Click Summarize text.",
          "Copy the result or adjust the limit for a shorter summary.",
        ],
        purposeTitle: "What this tool is for",
        purposeText: "This summarizer helps you reduce long texts while keeping the main ideas. It is useful for assignments, notes, posts, descriptions, academic summaries and texts with character limits.",
        tipsTitle: "Tips for better summaries",
        tips: [
          "Choose the Short summary type to extract only essential ideas.",
          "Use the Academic tone for university papers and the Clear tone for social media posts.",
          "Always review the final summary and adjust it to your context.",
          "If the summary does not cover what you need, try a more detailed type.",
          "Use this tool as support to better understand and organize your ideas.",
        ],
        moreToolsTitle: "Related tools",
        moreToolsIntro: "Explore more free tools for students and creators:",
        faqTitle: "Frequently asked questions",
        faqs: [
          { q: "Can I choose how many characters the summary will have?", a: "Yes, you can choose any limit between 100 and 10,000 characters." },
          { q: "Is the summary saved on a server?", a: "No. All processing happens in your browser. Your text is not saved or sent to servers." },
          { q: "Is it useful for academic work?", a: "Yes. Use the Academic tone and Detailed type for summaries more suitable for university contexts." },
          { q: "Can I summarize texts for social media?", a: "Yes. Use the Simple or Clear tone with a low character limit to create short descriptions for posts." },
          { q: "Is the summary exact to the character limit?", a: "It approximates the limit without exceeding it. If a full sentence exceeds the limit, it is trimmed with ellipsis." },
        ]
      },
      pt: {
        metaTitle: "Resumidor de texto por caracteres | Clipnexo",
        metaDescription: "Resuma textos longos para um limite exato de caracteres. Ferramenta grátis para estudantes, tarefas, resumos e documentos.",
        h1: "Resumidor de texto por caracteres",
        lead: "Cole seu texto, escolha o número máximo de caracteres e obtenha um resumo instantâneo mantendo as ideias principais. Sem registro ou envio de dados a servidores.",
        howTitle: "Como usar o resumidor de texto",
        howSteps: [
          "Cole ou digite o texto que deseja resumir.",
          "Escolha o número máximo de caracteres do resumo.",
          "Selecione o tipo de resumo e o tom.",
          "Clique em Resumir texto.",
          "Copie o resultado ou ajuste o limite para um resumo mais curto.",
        ],
        purposeTitle: "Para que serve esta ferramenta",
        purposeText: "Este resumidor ajuda você a reduzir textos longos mantendo as ideias principais. É útil para tarefas, anotações, publicações, descrições, resumos acadêmicos e textos com limite de caracteres.",
        tipsTitle: "Dicas para resumir melhor",
        tips: [
          "Escolha o tipo de resumo Curto para extrair apenas as ideias essenciais.",
          "Use o tom Acadêmico para trabalhos universitários e o tom Claro para publicações.",
          "Sempre revise o resumo final e ajuste-o conforme o contexto do seu trabalho.",
          "Se o resumo não cobrir o que você precisa, tente um tipo mais detalhado.",
          "Use esta ferramenta como apoio para compreender e organizar melhor suas ideias.",
        ],
        moreToolsTitle: "Ferramentas relacionadas",
        moreToolsIntro: "Explore mais ferramentas gratuitas para estudantes e criadores:",
        faqTitle: "Perguntas frequentes",
        faqs: [
          { q: "Posso escolher quantos caracteres terá o resumo?", a: "Sim, você pode escolher qualquer limite entre 100 e 10.000 caracteres." },
          { q: "O resumo é salvo em algum servidor?", a: "Não. Todo o processamento acontece no navegador. Seu texto não é salvo nem enviado a servidores." },
          { q: "Serve para trabalhos acadêmicos?", a: "Sim. Use o tom Acadêmico e o tipo Detalhado para obter resumos mais adequados ao contexto universitário." },
          { q: "Posso resumir textos para redes sociais?", a: "Sim. Use o tom Simples ou Claro com um limite baixo para criar descrições curtas para publicações." },
          { q: "O resumo é exato no limite de caracteres?", a: "Ele se aproxima do limite sem ultrapassá-lo. Se uma frase completa exceder o limite, ela é cortada com reticências." },
        ]
      }
    }
  },
  textParaphraser: {
    routeKey: "textParaphraser",
    content: {
      es: {
        metaTitle: "Parafraseador de texto gratis | Clipnexo",
        metaDescription: "Reescribe textos con un estilo claro, formal o simple. Herramienta gratis para mejorar redacción, tareas, apuntes y documentos.",
        h1: "Parafraseador de texto gratis",
        lead: "Pega tu texto, elige un estilo y obtén una versión parafraseada manteniendo el sentido original.",
        howTitle: "Cómo usar el parafraseador",
        howSteps: ["Pega o escribe el texto que quieres parafrasear.", "Selecciona el estilo deseado.", "Haz clic en Parafrasear.", "Copia el resultado o ajústalo manualmente."],
        purposeTitle: "Para qué sirve",
        purposeText: "Te ayuda a reformular textos manteniendo la idea principal. Útil para mejorar redacción, evitar repeticiones y explorar diferentes formas de expresar una misma idea.",
        tipsTitle: "Consejos",
        tips: ["Revisa siempre el texto parafraseado para asegurar que mantiene el sentido original.", "Usa esta herramienta como apoyo para mejorar tu redacción, no para copiar trabajos ajenos.", "Prueba diferentes estilos para encontrar el que mejor se adapte a tu contexto."],
        moreToolsTitle: "Herramientas relacionadas",
        moreToolsIntro: "Explora más herramientas para mejorar tus textos:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿El texto parafraseado es original?", a: "La herramienta transforma la estructura del texto, pero debes revisarlo y adaptarlo a tu estilo." }, { q: "¿Se guarda mi texto?", a: "No. Todo el procesamiento ocurre en tu navegador." }]
      },
      en: {
        metaTitle: "Free Text Paraphraser | Clipnexo",
        metaDescription: "Rewrite texts in a clear, formal or simple style. Free tool to improve writing, assignments, notes and documents.",
        h1: "Free text paraphraser",
        lead: "Paste your text, choose a style and get a paraphrased version keeping the original meaning.",
        howTitle: "How to use the paraphraser",
        howSteps: ["Paste or type the text you want to paraphrase.", "Select the desired style.", "Click Paraphrase.", "Copy the result or adjust it manually."],
        purposeTitle: "What it's for",
        purposeText: "It helps you rephrase texts while keeping the main idea. Useful for improving writing, avoiding repetition and exploring different ways to express ideas.",
        tipsTitle: "Tips",
        tips: ["Always review the paraphrased text to ensure it keeps the original meaning.", "Use this tool to support your writing, not to copy someone else's work.", "Try different styles to find the best fit for your context."],
        moreToolsTitle: "Related tools",
        moreToolsIntro: "Explore more tools to improve your texts:",
        faqTitle: "FAQ",
        faqs: [{ q: "Is the paraphrased text original?", a: "The tool transforms the text structure, but you should review and adapt it to your style." }, { q: "Is my text saved?", a: "No. All processing happens in your browser." }]
      },
      pt: {
        metaTitle: "Parafraseador de texto grátis | Clipnexo",
        metaDescription: "Reescreva textos com estilo claro, formal ou simples. Ferramenta grátis para melhorar redações, tarefas, notas e documentos.",
        h1: "Parafraseador de texto grátis",
        lead: "Cole seu texto, escolha um estilo e obtenha uma versão parafraseada mantendo o sentido original.",
        howTitle: "Como usar o parafraseador",
        howSteps: ["Cole ou digite o texto que deseja parafrasear.", "Selecione o estilo desejado.", "Clique em Parafrasear.", "Copie o resultado ou ajuste-o manualmente."],
        purposeTitle: "Para que serve",
        purposeText: "Ajuda a reformular textos mantendo a ideia principal. Útil para melhorar a escrita, evitar repetições e explorar diferentes formas de expressão.",
        tipsTitle: "Dicas",
        tips: ["Sempre revise o texto parafraseado para garantir que mantém o sentido original.", "Use esta ferramenta como apoio para melhorar sua escrita, não para copiar trabalhos alheios.", "Experimente estilos diferentes para encontrar o melhor para seu contexto."],
        moreToolsTitle: "Ferramentas relacionadas",
        moreToolsIntro: "Explore mais ferramentas para melhorar seus textos:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "O texto parafraseado é original?", a: "A ferramenta transforma a estrutura do texto, mas você deve revisá-lo e adaptá-lo ao seu estilo." }, { q: "Meu texto é salvo?", a: "Não. Todo o processamento acontece no navegador." }]
      }
    }
  },
  apaCitationGenerator: {
    routeKey: "apaCitationGenerator",
    content: {
      es: {
        metaTitle: "Generador de citas APA gratis | Clipnexo",
        metaDescription: "Crea referencias APA para páginas web, libros, artículos y videos. Herramienta gratis para trabajos académicos y tareas.",
        h1: "Generador de citas APA gratis",
        lead: "Selecciona el tipo de fuente, completa los campos y obtén una referencia en formato APA lista para usar.",
        howTitle: "Cómo usar el generador APA",
        howSteps: ["Selecciona el tipo de fuente.", "Completa los campos requeridos.", "Haz clic en Generar cita.", "Copia la referencia generada."],
        purposeTitle: "Para qué sirve",
        purposeText: "Te ayuda a crear referencias bibliográficas en formato APA para tus trabajos académicos de forma rápida.",
        tipsTitle: "Consejos",
        tips: ["Verifica siempre la referencia según la versión APA requerida por tu institución.", "Asegúrate de incluir todos los datos disponibles de la fuente.", "Revisa el formato final antes de incluirlo en tu bibliografía."],
        moreToolsTitle: "Herramientas relacionadas",
        moreToolsIntro: "Explora más herramientas para estudiantes:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Qué versión de APA usa?", a: "Genera referencias siguiendo el formato APA 7ª edición. Verifica con tu institución si requieren ajustes." }, { q: "¿Puedo guardar mis citas?", a: "No guardamos datos. Copia tus referencias y pégalas en tu documento." }]
      },
      en: {
        metaTitle: "Free APA Citation Generator | Clipnexo",
        metaDescription: "Create APA references for websites, books, articles and videos. Free tool for academic papers, assignments and research.",
        h1: "Free APA citation generator",
        lead: "Select the source type, fill in the fields and get an APA-formatted reference ready to use.",
        howTitle: "How to use the APA generator",
        howSteps: ["Select the source type.", "Fill in the required fields.", "Click Generate citation.", "Copy the generated reference."],
        purposeTitle: "What it's for",
        purposeText: "It helps you create APA-formatted bibliographic references for your academic papers quickly.",
        tipsTitle: "Tips",
        tips: ["Always verify the reference according to the APA version required by your institution.", "Make sure to include all available source data.", "Review the final format before including it in your bibliography."],
        moreToolsTitle: "Related tools",
        moreToolsIntro: "Explore more student tools:",
        faqTitle: "FAQ",
        faqs: [{ q: "Which APA version does it use?", a: "It generates references following APA 7th edition format. Check with your institution if adjustments are needed." }, { q: "Can I save my citations?", a: "We do not save data. Copy your references and paste them into your document." }]
      },
      pt: {
        metaTitle: "Gerador de citações APA grátis | Clipnexo",
        metaDescription: "Crie referências APA para sites, livros, artigos e vídeos. Ferramenta grátis para trabalhos acadêmicos e pesquisas.",
        h1: "Gerador de citações APA grátis",
        lead: "Selecione o tipo de fonte, preencha os campos e obtenha uma referência em formato APA pronta para usar.",
        howTitle: "Como usar o gerador APA",
        howSteps: ["Selecione o tipo de fonte.", "Preencha os campos obrigatórios.", "Clique em Gerar citação.", "Copie a referência gerada."],
        purposeTitle: "Para que serve",
        purposeText: "Ajuda a criar referências bibliográficas em formato APA para seus trabalhos acadêmicos de forma rápida.",
        tipsTitle: "Dicas",
        tips: ["Sempre verifique a referência conforme a versão APA exigida pela sua instituição.", "Certifique-se de incluir todos os dados disponíveis da fonte.", "Revise o formato final antes de incluí-lo na sua bibliografia."],
        moreToolsTitle: "Ferramentas relacionadas",
        moreToolsIntro: "Explore mais ferramentas para estudantes:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Qual versão APA usa?", a: "Gera referências seguindo o formato APA 7ª edição. Verifique com sua instituição se são necessários ajustes." }, { q: "Posso salvar minhas citações?", a: "Não salvamos dados. Copie suas referências e cole-as no seu documento." }]
      }
    }
  },
  textCorrector: {
    routeKey: "textCorrector",
    content: {
      es: {
        metaTitle: "Corrector de texto básico | Clipnexo",
        metaDescription: "Revisa errores comunes, espacios dobles, signos repetidos y frases largas. Herramienta gratis para mejorar textos y tareas.",
        h1: "Corrector de texto básico",
        lead: "Pega tu texto y encuentra errores comunes como espacios dobles, signos repetidos y frases demasiado largas.",
        howTitle: "Cómo usar el corrector",
        howSteps: ["Pega o escribe tu texto.", "Haz clic en Revisar texto.", "Revisa las sugerencias encontradas.", "Aplica las correcciones automáticas o edita manualmente."],
        purposeTitle: "Para qué sirve",
        purposeText: "Te ayuda a detectar problemas comunes en tus textos para mejorar la calidad de tu escritura.",
        tipsTitle: "Consejos",
        tips: ["Esta es una revisión básica. Revisa siempre el texto final.", "Complementa esta herramienta con una lectura manual para detectar errores de contexto.", "Corrige los errores marcados antes de entregar tu trabajo."],
        moreToolsTitle: "Herramientas relacionadas",
        moreToolsIntro: "Explora más herramientas para mejorar tus textos:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Corrige errores gramaticales?", a: "Detecta errores comunes de formato y estructura. No reemplaza un corrector gramatical completo." }, { q: "¿Mis textos son privados?", a: "Sí. Todo el análisis ocurre en tu navegador." }]
      },
      en: {
        metaTitle: "Basic Text Corrector | Clipnexo",
        metaDescription: "Check common errors, double spaces, repeated signs and long sentences. Free tool to improve texts, notes and assignments.",
        h1: "Basic text corrector",
        lead: "Paste your text and find common errors like double spaces, repeated punctuation and overly long sentences.",
        howTitle: "How to use the corrector",
        howSteps: ["Paste or type your text.", "Click Review text.", "Review the suggestions found.", "Apply automatic corrections or edit manually."],
        purposeTitle: "What it's for",
        purposeText: "It helps you detect common issues in your texts to improve your writing quality.",
        tipsTitle: "Tips",
        tips: ["This is a basic review. Always check the final text.", "Complement this tool with manual reading to catch context errors.", "Fix marked errors before submitting your work."],
        moreToolsTitle: "Related tools",
        moreToolsIntro: "Explore more tools to improve your texts:",
        faqTitle: "FAQ",
        faqs: [{ q: "Does it correct grammar errors?", a: "It detects common format and structure errors. It does not replace a full grammar checker." }, { q: "Are my texts private?", a: "Yes. All analysis happens in your browser." }]
      },
      pt: {
        metaTitle: "Corretor de texto básico | Clipnexo",
        metaDescription: "Revise erros comuns, espaços duplos, sinais repetidos e frases longas. Ferramenta grátis para melhorar textos e tarefas.",
        h1: "Corretor de texto básico",
        lead: "Cole seu texto e encontre erros comuns como espaços duplos, sinais repetidos e frases muito longas.",
        howTitle: "Como usar o corretor",
        howSteps: ["Cole ou digite seu texto.", "Clique em Revisar texto.", "Revise as sugestões encontradas.", "Aplique as correções automáticas ou edite manualmente."],
        purposeTitle: "Para que serve",
        purposeText: "Ajuda a detectar problemas comuns nos seus textos para melhorar a qualidade da sua escrita.",
        tipsTitle: "Dicas",
        tips: ["Esta é uma revisão básica. Sempre revise o texto final.", "Complemente esta ferramenta com leitura manual para detectar erros de contexto.", "Corrija os erros marcados antes de entregar seu trabalho."],
        moreToolsTitle: "Ferramentas relacionadas",
        moreToolsIntro: "Explore mais ferramentas para melhorar seus textos:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Corrige erros gramaticais?", a: "Detecta erros comuns de formato e estrutura. Não substitui um corretor gramatical completo." }, { q: "Meus textos são privados?", a: "Sim. Toda a análise acontece no navegador." }]
      }
    }
  },
  pdfToText: {
    routeKey: "pdfToText",
    content: {
      es: {
        metaTitle: "Convertir PDF a texto gratis | Clipnexo",
        metaDescription: "Extrae texto de archivos PDF propios desde el navegador. Herramienta gratis para estudiantes, documentos, apuntes y tareas.",
        h1: "Convertir PDF a texto",
        lead: "Sube tu archivo PDF y extrae el texto para editarlo o copiarlo. Todo el procesamiento ocurre en tu navegador.",
        howTitle: "Cómo usar el conversor",
        howSteps: ["Selecciona o arrastra tu archivo PDF.", "Espera a que se procese el archivo.", "Revisa el texto extraído.", "Copia el texto o descárgalo como TXT."],
        purposeTitle: "Para qué sirve",
        purposeText: "Te permite extraer texto de archivos PDF para editarlo, copiarlo o usarlo en otros documentos.",
        tipsTitle: "Consejos",
        tips: ["Usa solo archivos propios o documentos que tengas permiso de procesar.", "Algunos PDF con imágenes o escaneados pueden no contener texto extraíble.", "El texto extraído puede requerir ajustes de formato."],
        moreToolsTitle: "Herramientas relacionadas",
        moreToolsIntro: "Explora más herramientas para documentos:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Funciona con PDF escaneados?", a: "No. Esta herramienta extrae texto de PDFs que ya contienen texto digital. No realiza OCR." }, { q: "¿Se envían mis archivos a un servidor?", a: "No. Todo el procesamiento es local en tu navegador." }]
      },
      en: {
        metaTitle: "Convert PDF to Text Free | Clipnexo",
        metaDescription: "Extract text from your own PDF files in the browser. Free tool for students, documents, notes and assignments.",
        h1: "Convert PDF to text",
        lead: "Upload your PDF file and extract the text for editing or copying. All processing happens in your browser.",
        howTitle: "How to use the converter",
        howSteps: ["Select or drag your PDF file.", "Wait for the file to process.", "Review the extracted text.", "Copy the text or download as TXT."],
        purposeTitle: "What it's for",
        purposeText: "It lets you extract text from PDF files to edit, copy or use in other documents.",
        tipsTitle: "Tips",
        tips: ["Use only your own files or documents you have permission to process.", "Some scanned or image-based PDFs may not contain extractable text.", "Extracted text may need formatting adjustments."],
        moreToolsTitle: "Related tools",
        moreToolsIntro: "Explore more document tools:",
        faqTitle: "FAQ",
        faqs: [{ q: "Does it work with scanned PDFs?", a: "No. This tool extracts text from PDFs that already contain digital text. It does not perform OCR." }, { q: "Are my files sent to a server?", a: "No. All processing is local in your browser." }]
      },
      pt: {
        metaTitle: "Converter PDF em texto grátis | Clipnexo",
        metaDescription: "Extraia texto de arquivos PDF próprios no navegador. Ferramenta grátis para estudantes, documentos, notas e tarefas.",
        h1: "Converter PDF em texto",
        lead: "Envie seu arquivo PDF e extraia o texto para editar ou copiar. Todo o processamento acontece no navegador.",
        howTitle: "Como usar o conversor",
        howSteps: ["Selecione ou arraste seu arquivo PDF.", "Aguarde o processamento do arquivo.", "Revise o texto extraído.", "Copie o texto ou baixe como TXT."],
        purposeTitle: "Para que serve",
        purposeText: "Permite extrair texto de arquivos PDF para editar, copiar ou usar em outros documentos.",
        tipsTitle: "Dicas",
        tips: ["Use apenas arquivos próprios ou documentos que você tem permissão para processar.", "Alguns PDFs digitalizados ou com imagens podem não conter texto extraível.", "O texto extraído pode precisar de ajustes de formatação."],
        moreToolsTitle: "Ferramentas relacionadas",
        moreToolsIntro: "Explore mais ferramentas para documentos:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Funciona com PDFs digitalizados?", a: "Não. Esta ferramenta extrai texto de PDFs que já contêm texto digital. Não realiza OCR." }, { q: "Meus arquivos são enviados a um servidor?", a: "Não. Todo o processamento é local no navegador." }]
      }
    }
  },
  textToPdf: {
    routeKey: "textToPdf",
    content: {
      es: {
        metaTitle: "Convertir texto a PDF gratis | Clipnexo",
        metaDescription: "Pega tu texto y crea un PDF simple desde el navegador. Herramienta gratis para tareas, apuntes, documentos y trabajos.",
        h1: "Convertir texto a PDF",
        lead: "Escribe o pega tu texto, elige el formato y genera un PDF listo para guardar o imprimir.",
        howTitle: "Cómo usar el conversor",
        howSteps: ["Escribe o pega tu texto.", "Opcional: agrega un título.", "Elige el tamaño de letra y alineación.", "Haz clic en Generar PDF."],
        purposeTitle: "Para qué sirve",
        purposeText: "Te permite crear documentos PDF simples desde cualquier texto para guardar, imprimir o compartir.",
        tipsTitle: "Consejos",
        tips: ["El PDF se genera en tu navegador. No se envía tu texto a servidores.", "Ajusta el tamaño de letra según el tipo de documento.", "Revisa la vista previa antes de guardar."],
        moreToolsTitle: "Herramientas relacionadas",
        moreToolsIntro: "Explora más herramientas para documentos:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿El PDF incluye formato?", a: "El PDF generado es simple e incluye el texto con la alineación y tamaño seleccionados." }, { q: "¿Puedo agregar imágenes?", a: "No en esta versión. Solo se convierte texto plano a PDF." }]
      },
      en: {
        metaTitle: "Convert Text to PDF Free | Clipnexo",
        metaDescription: "Paste your text and create a simple PDF in the browser. Free tool for notes, assignments, documents and school work.",
        h1: "Convert text to PDF",
        lead: "Type or paste your text, choose the format and generate a PDF ready to save or print.",
        howTitle: "How to use the converter",
        howSteps: ["Type or paste your text.", "Optional: add a title.", "Choose font size and alignment.", "Click Generate PDF."],
        purposeTitle: "What it's for",
        purposeText: "It lets you create simple PDF documents from any text to save, print or share.",
        tipsTitle: "Tips",
        tips: ["The PDF is generated in your browser. Your text is not sent to servers.", "Adjust the font size according to the document type.", "Review the preview before saving."],
        moreToolsTitle: "Related tools",
        moreToolsIntro: "Explore more document tools:",
        faqTitle: "FAQ",
        faqs: [{ q: "Does the PDF include formatting?", a: "The generated PDF is simple and includes the text with the selected alignment and size." }, { q: "Can I add images?", a: "Not in this version. Only plain text is converted to PDF." }]
      },
      pt: {
        metaTitle: "Converter texto em PDF grátis | Clipnexo",
        metaDescription: "Cole seu texto e crie um PDF simples no navegador. Ferramenta grátis para notas, tarefas, documentos e trabalhos.",
        h1: "Converter texto em PDF",
        lead: "Digite ou cole seu texto, escolha o formato e gere um PDF pronto para salvar ou imprimir.",
        howTitle: "Como usar o conversor",
        howSteps: ["Digite ou cole seu texto.", "Opcional: adicione um título.", "Escolha o tamanho da fonte e alinhamento.", "Clique em Gerar PDF."],
        purposeTitle: "Para que serve",
        purposeText: "Permite criar documentos PDF simples a partir de qualquer texto para salvar, imprimir ou compartilhar.",
        tipsTitle: "Dicas",
        tips: ["O PDF é gerado no navegador. Seu texto não é enviado a servidores.", "Ajuste o tamanho da fonte conforme o tipo de documento.", "Revise a visualização antes de salvar."],
        moreToolsTitle: "Ferramentas relacionadas",
        moreToolsIntro: "Explore mais ferramentas para documentos:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "O PDF inclui formatação?", a: "O PDF gerado é simples e inclui o texto com alinhamento e tamanho selecionados." }, { q: "Posso adicionar imagens?", a: "Não nesta versão. Apenas texto simples é convertido para PDF." }]
      }
    }
  },
  pomodoroTimer: {
    routeKey: "pomodoroTimer",
    content: {
      es: {
        metaTitle: "Temporizador Pomodoro online | Clipnexo",
        metaDescription: "Usa un temporizador Pomodoro gratis para estudiar, concentrarte y organizar descansos. Funciona online desde el navegador.",
        h1: "Temporizador Pomodoro online",
        lead: "Organiza tu tiempo de estudio con un temporizador Pomodoro. Alterna bloques de trabajo concentrado con descansos programados.",
        howTitle: "Cómo usar el temporizador",
        howSteps: ["Configura la duración de trabajo y descansos.", "Haz clic en Iniciar para comenzar un ciclo.", "Concéntrate hasta que suene la alerta.", "Toma tu descanso y repite."],
        purposeTitle: "Para qué sirve",
        purposeText: "Te ayuda a mantener la concentración usando la técnica Pomodoro: bloques de trabajo intenso seguidos de pausas cortas.",
        tipsTitle: "Consejos",
        tips: ["Empieza con 25 minutos de trabajo y 5 de descanso.", "Después de 4 ciclos, toma un descanso largo de 15 minutos.", "Elimina distracciones durante los bloques de trabajo."],
        moreToolsTitle: "Herramientas relacionadas",
        moreToolsIntro: "Explora más herramientas de productividad:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Qué es la técnica Pomodoro?", a: "Es un método de gestión del tiempo que alterna 25 minutos de trabajo con 5 minutos de descanso." }, { q: "¿Funciona sin conexión?", a: "Sí, el temporizador funciona completamente en el navegador." }]
      },
      en: {
        metaTitle: "Online Pomodoro Timer | Clipnexo",
        metaDescription: "Use a free Pomodoro timer to study, focus and organize breaks. Works online directly from your browser.",
        h1: "Online Pomodoro timer",
        lead: "Organize your study time with a Pomodoro timer. Alternate focused work blocks with scheduled breaks.",
        howTitle: "How to use the timer",
        howSteps: ["Set work and break durations.", "Click Start to begin a cycle.", "Focus until the alert sounds.", "Take your break and repeat."],
        purposeTitle: "What it's for",
        purposeText: "It helps you stay focused using the Pomodoro technique: intense work blocks followed by short breaks.",
        tipsTitle: "Tips",
        tips: ["Start with 25 minutes of work and 5 minutes of rest.", "After 4 cycles, take a long 15-minute break.", "Eliminate distractions during work blocks."],
        moreToolsTitle: "Related tools",
        moreToolsIntro: "Explore more productivity tools:",
        faqTitle: "FAQ",
        faqs: [{ q: "What is the Pomodoro technique?", a: "It's a time management method alternating 25 minutes of work with 5 minutes of rest." }, { q: "Does it work offline?", a: "Yes, the timer runs entirely in the browser." }]
      },
      pt: {
        metaTitle: "Temporizador Pomodoro online | Clipnexo",
        metaDescription: "Use um temporizador Pomodoro grátis para estudar, focar e organizar pausas. Funciona online direto no navegador.",
        h1: "Temporizador Pomodoro online",
        lead: "Organize seu tempo de estudo com um temporizador Pomodoro. Alterne blocos de trabalho focado com pausas programadas.",
        howTitle: "Como usar o temporizador",
        howSteps: ["Configure a duração de trabalho e pausas.", "Clique em Iniciar para começar um ciclo.", "Concentre-se até o alerta soar.", "Faça sua pausa e repita."],
        purposeTitle: "Para que serve",
        purposeText: "Ajuda a manter a concentração usando a técnica Pomodoro: blocos de trabalho intenso seguidos de pausas curtas.",
        tipsTitle: "Dicas",
        tips: ["Comece com 25 minutos de trabalho e 5 de descanso.", "Após 4 ciclos, faça uma pausa longa de 15 minutos.", "Elimine distrações durante os blocos de trabalho."],
        moreToolsTitle: "Ferramentas relacionadas",
        moreToolsIntro: "Explore mais ferramentas de produtividade:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "O que é a técnica Pomodoro?", a: "É um método de gestão do tempo que alterna 25 minutos de trabalho com 5 minutos de descanso." }, { q: "Funciona offline?", a: "Sim, o temporizador funciona completamente no navegador." }]
      }
    }
  },
  gradeAverageCalculator: {
    routeKey: "gradeAverageCalculator",
    content: {
      es: {
        metaTitle: "Calculadora de promedio de notas | Clipnexo",
        metaDescription: "Calcula tu promedio de notas con pesos o porcentajes. Herramienta gratis para estudiantes de colegio, instituto o universidad.",
        h1: "Calculadora de promedio de notas",
        lead: "Agrega tus notas, asígnales un peso porcentual y calcula tu promedio simple y ponderado al instante.",
        howTitle: "Cómo usar la calculadora",
        howSteps: ["Agrega tus evaluaciones con nombre y nota.", "Opcional: asigna un peso porcentual a cada una.", "Selecciona la escala de calificación.", "Revisa tu promedio simple y ponderado."],
        purposeTitle: "Para qué sirve",
        purposeText: "Te permite calcular promedios de notas de forma rápida para saber tu rendimiento académico.",
        tipsTitle: "Consejos",
        tips: ["La suma de los pesos no necesita ser exactamente 100%.", "Usa la escala correcta según tu institución.", "Puedes eliminar filas individualmente si te equivocas."],
        moreToolsTitle: "Herramientas relacionadas",
        moreToolsIntro: "Explora más herramientas para estudiantes:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Qué es el promedio ponderado?", a: "Es un promedio donde cada nota tiene un peso o importancia diferente según su porcentaje." }, { q: "¿Funciona con cualquier escala?", a: "Sí, puedes elegir entre escala 0-20, 0-100 o personalizada." }]
      },
      en: {
        metaTitle: "Grade Average Calculator | Clipnexo",
        metaDescription: "Calculate your grade average with weights or percentages. Free tool for school, college and university students.",
        h1: "Grade average calculator",
        lead: "Add your grades, assign percentage weights and calculate your simple and weighted average instantly.",
        howTitle: "How to use the calculator",
        howSteps: ["Add your evaluations with name and grade.", "Optional: assign a percentage weight to each.", "Select the grading scale.", "Check your simple and weighted average."],
        purposeTitle: "What it's for",
        purposeText: "It lets you calculate grade averages quickly to know your academic performance.",
        tipsTitle: "Tips",
        tips: ["The sum of weights does not need to be exactly 100%.", "Use the correct scale according to your institution.", "You can delete individual rows if you make a mistake."],
        moreToolsTitle: "Related tools",
        moreToolsIntro: "Explore more student tools:",
        faqTitle: "FAQ",
        faqs: [{ q: "What is a weighted average?", a: "It's an average where each grade has a different weight or importance based on its percentage." }, { q: "Does it work with any scale?", a: "Yes, you can choose between 0-20, 0-100, or custom scale." }]
      },
      pt: {
        metaTitle: "Calculadora de média de notas | Clipnexo",
        metaDescription: "Calcule sua média de notas com pesos ou porcentagens. Ferramenta grátis para estudantes de escola, instituto ou universidade.",
        h1: "Calculadora de média de notas",
        lead: "Adicione suas notas, atribua pesos percentuais e calcule sua média simples e ponderada instantaneamente.",
        howTitle: "Como usar a calculadora",
        howSteps: ["Adicione suas avaliações com nome e nota.", "Opcional: atribua um peso percentual a cada uma.", "Selecione a escala de notas.", "Verifique sua média simples e ponderada."],
        purposeTitle: "Para que serve",
        purposeText: "Permite calcular médias de notas rapidamente para saber seu desempenho acadêmico.",
        tipsTitle: "Dicas",
        tips: ["A soma dos pesos não precisa ser exatamente 100%.", "Use a escala correta conforme sua instituição.", "Você pode excluir linhas individualmente se errar."],
        moreToolsTitle: "Ferramentas relacionadas",
        moreToolsIntro: "Explore mais ferramentas para estudantes:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "O que é média ponderada?", a: "É uma média onde cada nota tem um peso ou importância diferente conforme sua porcentagem." }, { q: "Funciona com qualquer escala?", a: "Sim, você pode escolher entre escala 0-20, 0-100 ou personalizada." }]
      }
    }
  },
  studyScheduleGenerator: {
    routeKey: "studyScheduleGenerator",
    content: {
      es: {
        metaTitle: "Generador de horario de estudio | Clipnexo",
        metaDescription: "Crea un horario de estudio según tus materias, días disponibles y horas. Herramienta gratis para organizar mejor tu semana.",
        h1: "Generador de horario de estudio",
        lead: "Ingresa tus materias, elige los días y horas disponibles y genera un horario de estudio equilibrado.",
        howTitle: "Cómo usar el generador",
        howSteps: ["Escribe tus materias separadas por coma.", "Selecciona los días disponibles.", "Elige las horas por día y duración de bloques.", "Haz clic en Generar horario."],
        purposeTitle: "Para qué sirve",
        purposeText: "Te ayuda a organizar tu tiempo de estudio distribuyendo las materias de forma equilibrada durante la semana.",
        tipsTitle: "Consejos",
        tips: ["Incluye todas tus materias para una distribución completa.", "Elige bloques de 45-60 minutos para mantener la concentración.", "Deja espacio para descansos entre bloques."],
        moreToolsTitle: "Herramientas relacionadas",
        moreToolsIntro: "Explora más herramientas para estudiantes:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Puedo personalizar el horario?", a: "El horario generado es una sugerencia. Puedes copiarlo y ajustarlo manualmente." }, { q: "¿Se guarda mi horario?", a: "No guardamos datos. Descarga el horario como TXT para conservarlo." }]
      },
      en: {
        metaTitle: "Study Schedule Generator | Clipnexo",
        metaDescription: "Create a study schedule based on your subjects, available days and hours. Free tool to organize your week better.",
        h1: "Study schedule generator",
        lead: "Enter your subjects, choose available days and hours and generate a balanced study schedule.",
        howTitle: "How to use the generator",
        howSteps: ["Write your subjects separated by commas.", "Select available days.", "Choose hours per day and block duration.", "Click Generate schedule."],
        purposeTitle: "What it's for",
        purposeText: "It helps you organize your study time by distributing subjects evenly throughout the week.",
        tipsTitle: "Tips",
        tips: ["Include all your subjects for a complete distribution.", "Choose 45-60 minute blocks to maintain focus.", "Leave space for breaks between blocks."],
        moreToolsTitle: "Related tools",
        moreToolsIntro: "Explore more student tools:",
        faqTitle: "FAQ",
        faqs: [{ q: "Can I customize the schedule?", a: "The generated schedule is a suggestion. You can copy it and adjust manually." }, { q: "Is my schedule saved?", a: "We do not save data. Download the schedule as TXT to keep it." }]
      },
      pt: {
        metaTitle: "Gerador de horário de estudo | Clipnexo",
        metaDescription: "Crie um horário de estudo com base em matérias, dias disponíveis e horas. Ferramenta grátis para organizar sua semana.",
        h1: "Gerador de horário de estudo",
        lead: "Insira suas matérias, escolha os dias e horas disponíveis e gere um horário de estudo equilibrado.",
        howTitle: "Como usar o gerador",
        howSteps: ["Escreva suas matérias separadas por vírgula.", "Selecione os dias disponíveis.", "Escolha as horas por dia e duração dos blocos.", "Clique em Gerar horário."],
        purposeTitle: "Para que serve",
        purposeText: "Ajuda a organizar seu tempo de estudo distribuindo as matérias de forma equilibrada durante a semana.",
        tipsTitle: "Dicas",
        tips: ["Inclua todas as suas matérias para uma distribuição completa.", "Escolha blocos de 45-60 minutos para manter a concentração.", "Deixe espaço para pausas entre blocos."],
        moreToolsTitle: "Ferramentas relacionadas",
        moreToolsIntro: "Explore mais ferramentas para estudantes:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Posso personalizar o horário?", a: "O horário gerado é uma sugestão. Você pode copiá-lo e ajustar manualmente." }, { q: "Meu horário é salvo?", a: "Não salvamos dados. Baixe o horário como TXT para conservá-lo." }]
      }
    }
  },
  usernameGenerator: {
    routeKey: "usernameGenerator",
    content: {
      es: {
        metaTitle: "Generador de nombres de usuario | Clipnexo",
        metaDescription: "Crea ideas de nombres de usuario para TikTok, Instagram, YouTube, juegos o marca personal. Herramienta gratis y rápida.",
        h1: "Generador de nombres de usuario",
        lead: "Ingresa una palabra clave, elige un estilo y genera 20 ideas de nombres de usuario únicos.",
        howTitle: "Cómo usar el generador",
        howSteps: ["Escribe una palabra clave o nombre.", "Selecciona el estilo que prefieras.", "Haz clic en Generar.", "Copia los nombres que más te gusten."],
        purposeTitle: "Para qué sirve",
        purposeText: "Te ayuda a encontrar ideas creativas para nombres de usuario en redes sociales, juegos o plataformas digitales.",
        tipsTitle: "Consejos",
        tips: ["Combina palabras clave cortas para obtener mejores resultados.", "Prueba diferentes estilos para explorar más opciones.", "Verifica que el nombre esté disponible en la plataforma antes de usarlo."],
        moreToolsTitle: "Herramientas relacionadas",
        moreToolsIntro: "Explora más herramientas para creadores:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Los nombres generados están disponibles?", a: "La herramienta genera ideas creativas. Debes verificar la disponibilidad en cada plataforma." }, { q: "¿Cuántos nombres genera?", a: "Genera 20 sugerencias. Puedes regenerar para obtener más opciones." }]
      },
      en: {
        metaTitle: "Username Generator | Clipnexo",
        metaDescription: "Create username ideas for TikTok, Instagram, YouTube, games or personal brands. Free and fast online tool.",
        h1: "Username generator",
        lead: "Enter a keyword, choose a style and generate 20 unique username ideas.",
        howTitle: "How to use the generator",
        howSteps: ["Write a keyword or name.", "Select your preferred style.", "Click Generate.", "Copy the names you like best."],
        purposeTitle: "What it's for",
        purposeText: "It helps you find creative ideas for usernames on social media, games or digital platforms.",
        tipsTitle: "Tips",
        tips: ["Combine short keywords for better results.", "Try different styles to explore more options.", "Verify the name is available on the platform before using it."],
        moreToolsTitle: "Related tools",
        moreToolsIntro: "Explore more creator tools:",
        faqTitle: "FAQ",
        faqs: [{ q: "Are the generated names available?", a: "The tool generates creative ideas. You must verify availability on each platform." }, { q: "How many names does it generate?", a: "It generates 20 suggestions. You can regenerate for more options." }]
      },
      pt: {
        metaTitle: "Gerador de nomes de usuário | Clipnexo",
        metaDescription: "Crie ideias de nomes de usuário para TikTok, Instagram, YouTube, jogos ou marca pessoal. Ferramenta grátis e rápida.",
        h1: "Gerador de nomes de usuário",
        lead: "Insira uma palavra-chave, escolha um estilo e gere 20 ideias de nomes de usuário únicos.",
        howTitle: "Como usar o gerador",
        howSteps: ["Escreva uma palavra-chave ou nome.", "Selecione o estilo de sua preferência.", "Clique em Gerar.", "Copie os nomes que mais gostar."],
        purposeTitle: "Para que serve",
        purposeText: "Ajuda a encontrar ideias criativas para nomes de usuário em redes sociais, jogos ou plataformas digitais.",
        tipsTitle: "Dicas",
        tips: ["Combine palavras-chave curtas para obter melhores resultados.", "Experimente estilos diferentes para explorar mais opções.", "Verifique se o nome está disponível na plataforma antes de usá-lo."],
        moreToolsTitle: "Ferramentas relacionadas",
        moreToolsIntro: "Explore mais ferramentas para criadores:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "Os nomes gerados estão disponíveis?", a: "A ferramenta gera ideias criativas. Você deve verificar a disponibilidade em cada plataforma." }, { q: "Quantos nomes gera?", a: "Gera 20 sugestões. Você pode regenerar para mais opções." }]
      }
    }
  },
  contentCalendarGenerator: {
    routeKey: "contentCalendarGenerator",
    content: {
      es: {
        metaTitle: "Generador de calendario de contenido | Clipnexo",
        metaDescription: "Crea un calendario de contenido para redes sociales según tu nicho, plataforma y frecuencia de publicación. Gratis y online.",
        h1: "Generador de calendario de contenido",
        lead: "Define tu nicho, plataforma y período para generar un calendario con ideas de contenido, formato y llamados a la acción.",
        howTitle: "Cómo usar el generador",
        howSteps: ["Escribe tu nicho o tema principal.", "Selecciona la plataforma y duración.", "Haz clic en Generar calendario.", "Copia el calendario o descárgalo como TXT."],
        purposeTitle: "Para qué sirve",
        purposeText: "Te ayuda a planificar contenido para redes sociales con ideas diarias organizadas por tema, formato y llamado a la acción.",
        tipsTitle: "Consejos",
        tips: ["Usa nichos específicos para obtener ideas más relevantes.", "Adapta las sugerencias a tu estilo y audiencia.", "Planifica con anticipación para mantener constancia en tus publicaciones."],
        moreToolsTitle: "Herramientas relacionadas",
        moreToolsIntro: "Explora más herramientas para creadores:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Las ideas son únicas?", a: "La herramienta genera sugerencias basadas en tu nicho. Adáptalas a tu contenido real." }, { q: "¿Puedo generar para múltiples plataformas?", a: "Selecciona una plataforma a la vez para obtener ideas más enfocadas." }]
      },
      en: {
        metaTitle: "Content Calendar Generator | Clipnexo",
        metaDescription: "Create a social media content calendar based on your niche, platform and posting frequency. Free online tool.",
        h1: "Content calendar generator",
        lead: "Define your niche, platform and period to generate a calendar with content ideas, format and calls to action.",
        howTitle: "How to use the generator",
        howSteps: ["Write your niche or main topic.", "Select the platform and duration.", "Click Generate calendar.", "Copy the calendar or download as TXT."],
        purposeTitle: "What it's for",
        purposeText: "It helps you plan social media content with daily ideas organized by topic, format and call to action.",
        tipsTitle: "Tips",
        tips: ["Use specific niches to get more relevant ideas.", "Adapt suggestions to your style and audience.", "Plan ahead to maintain consistency in your posts."],
        moreToolsTitle: "Related tools",
        moreToolsIntro: "Explore more creator tools:",
        faqTitle: "FAQ",
        faqs: [{ q: "Are the ideas unique?", a: "The tool generates suggestions based on your niche. Adapt them to your actual content." }, { q: "Can I generate for multiple platforms?", a: "Select one platform at a time for more focused ideas." }]
      },
      pt: {
        metaTitle: "Gerador de calendário de conteúdo | Clipnexo",
        metaDescription: "Crie um calendário de conteúdo para redes sociais conforme nicho, plataforma e frequência de publicação. Grátis e online.",
        h1: "Gerador de calendário de conteúdo",
        lead: "Defina seu nicho, plataforma e período para gerar um calendário com ideias de conteúdo, formato e chamadas para ação.",
        howTitle: "Como usar o gerador",
        howSteps: ["Escreva seu nicho ou tema principal.", "Selecione a plataforma e duração.", "Clique em Gerar calendário.", "Copie o calendário ou baixe como TXT."],
        purposeTitle: "Para que serve",
        purposeText: "Ajuda a planejar conteúdo para redes sociais com ideias diárias organizadas por tema, formato e chamada para ação.",
        tipsTitle: "Dicas",
        tips: ["Use nichos específicos para obter ideias mais relevantes.", "Adapte as sugestões ao seu estilo e público.", "Planeje com antecedência para manter consistência nas publicações."],
        moreToolsTitle: "Ferramentas relacionadas",
        moreToolsIntro: "Explore mais ferramentas para criadores:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "As ideias são únicas?", a: "A ferramenta gera sugestões baseadas no seu nicho. Adapte-as ao seu conteúdo real." }, { q: "Posso gerar para várias plataformas?", a: "Selecione uma plataforma por vez para ideias mais focadas." }]
      }
    }
  }
};
