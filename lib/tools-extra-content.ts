import type { ToolConfig, ToolKey } from "@/lib/tools-content";
import type { SupportedLang } from "@/lib/routes";

export const extraToolsContent: Partial<Record<ToolKey, ToolConfig>> = {
  socialMediaTextGenerator: {
    routeKey: "socialMediaTextGenerator",
    content: {
      es: {
        metaTitle: "Crear textos para redes sociales gratis online",
        metaDescription:
          "Crea textos para Facebook, Instagram, Twitter/X y redes sociales. Genera publicaciones atractivas, rápidas y listas para copiar.",
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
          "Create posts for Facebook, Instagram, Twitter/X and social media. Generate catchy texts that are ready to copy and share.",
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
        metaTitle: "Gerador de textos para redes sociais grátis",
        metaDescription:
          "Crie textos para Facebook, Instagram, Twitter/X e redes sociais. Gere publicações atrativas, rápidas e prontas para copiar.",
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
        metaTitle: "Generador de etiquetas de YouTube gratis online",
        metaDescription:
          "Genera etiquetas de YouTube según tu tema o palabra clave. Crea tags útiles para organizar y optimizar mejor tus videos.",
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
        metaTitle: "Free YouTube Tag Generator Online Tool",
        metaDescription:
          "Generate YouTube tags from a topic or keyword. Create useful tags to organize and optimize your videos quickly.",
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
          "Gere tags para YouTube com base no tema ou palavra-chave. Crie etiquetas úteis para organizar e otimizar seus vídeos.",
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
        metaTitle: "Extractor de etiquetas de YouTube gratis",
        metaDescription:
          "Extrae etiquetas desde textos, títulos o descripciones de YouTube. Obtén palabras clave limpias para organizar tus videos.",
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
        metaTitle: "Free YouTube Tag Extractor Online",
        metaDescription:
          "Extract tags from YouTube texts, titles or descriptions. Get clean keyword ideas to organize your videos more easily.",
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
        metaTitle: "Extrator de tags para YouTube grátis",
        metaDescription:
          "Extraia tags de textos, títulos ou descrições do YouTube. Obtenha palavras-chave limpas para organizar seus vídeos.",
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
        metaTitle: "Generador de hashtags de YouTube gratis",
        metaDescription:
          "Genera hashtags para YouTube según tu tema o nicho. Crea etiquetas limpias para títulos, Shorts y descripciones.",
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
        metaTitle: "Free YouTube Hashtag Generator Tool",
        metaDescription:
          "Generate YouTube hashtags by topic or niche. Create clean tags for titles, Shorts and video descriptions quickly.",
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
        metaTitle: "Gerador de hashtags para YouTube grátis",
        metaDescription:
          "Gere hashtags para YouTube por tema ou nicho. Crie etiquetas limpas para títulos, Shorts e descrições de vídeos.",
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
        metaTitle: "Extractor de hashtags de YouTube gratis",
        metaDescription:
          "Extrae hashtags desde títulos, Shorts o descripciones de YouTube. Copia etiquetas limpias y listas para usar.",
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
        metaTitle: "Free YouTube Hashtag Extractor Tool",
        metaDescription:
          "Extract hashtags from YouTube titles, Shorts or descriptions. Copy clean tags that are ready to use in seconds.",
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
        metaTitle: "Extrator de hashtags do YouTube grátis",
        metaDescription:
          "Extraia hashtags de títulos, Shorts ou descrições do YouTube. Copie etiquetas limpas e prontas para usar.",
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
        metaTitle: "Generador de títulos de YouTube gratis",
        metaDescription:
          "Crea títulos para YouTube según el tema de tu video. Genera ideas claras, atractivas y listas para copiar.",
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
          "Create YouTube titles based on your video topic. Generate clear, catchy and ready-to-copy title ideas quickly.",
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
        metaTitle: "Gerador de títulos para YouTube grátis",
        metaDescription:
          "Crie títulos para YouTube com base no tema do vídeo. Gere ideias claras, atrativas e prontas para copiar.",
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
        metaTitle: "Extractor de títulos de YouTube gratis",
        metaDescription:
          "Extrae y ordena títulos desde textos o listas de videos de YouTube. Limpia resultados y copia ideas rápidamente.",
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
          "Extract and organize YouTube titles from texts or video lists. Clean results and copy title ideas quickly.",
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
        metaTitle: "Extrator de títulos do YouTube grátis",
        metaDescription:
          "Extraia e organize títulos a partir de textos ou listas de vídeos do YouTube. Limpe resultados e copie ideias rapidamente.",
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
        metaTitle: "Comprobador de longitud de título YouTube",
        metaDescription:
          "Revisa la longitud de tu título de YouTube. Cuenta caracteres, mejora el texto y evita títulos demasiado largos.",
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
        metaTitle: "YouTube Title Length Checker Free Tool",
        metaDescription:
          "Check your YouTube title length. Count characters, improve your text and avoid titles that are too long.",
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
        metaTitle: "Verificador de tamanho de título YouTube",
        metaDescription:
          "Verifique o tamanho do título do YouTube. Conte caracteres, melhore o texto e evite títulos muito longos.",
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
        metaTitle: "Generador de descripciones YouTube gratis",
        metaDescription:
          "Crea descripciones para YouTube según el tema de tu video. Genera textos claros, ordenados y listos para copiar.",
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
        metaTitle: "Free YouTube Description Generator Tool",
        metaDescription:
          "Create YouTube descriptions based on your video topic. Generate clear, organized and ready-to-copy text quickly.",
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
        metaTitle: "Gerador de descrições YouTube grátis",
        metaDescription:
          "Crie descrições para YouTube com base no tema do vídeo. Gere textos claros, organizados e prontos para copiar.",
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
        metaTitle: "Extractor de descripción de YouTube gratis",
        metaDescription:
          "Extrae y limpia descripciones de YouTube desde textos pegados. Ordena enlaces, hashtags y contenido rápidamente.",
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
        metaTitle: "Free YouTube Description Extractor Tool",
        metaDescription:
          "Extract and clean YouTube descriptions from pasted text. Organize links, hashtags and content quickly.",
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
        metaTitle: "Extrator de descrição do YouTube grátis",
        metaDescription:
          "Extraia e limpe descrições do YouTube a partir de textos colados. Organize links, hashtags e conteúdo rapidamente.",
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
        metaTitle: "Mayúsculas para títulos de YouTube gratis",
        metaDescription:
          "Convierte títulos de YouTube a mayúsculas, minúsculas o estilo título. Ajusta tus textos rápido antes de publicar.",
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
        metaTitle: "Free YouTube Title Capitalization Tool",
        metaDescription:
          "Convert YouTube titles to uppercase, lowercase or title case. Adjust your text quickly before publishing.",
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
        metaTitle: "Maiúsculas para títulos YouTube grátis",
        metaDescription:
          "Converta títulos do YouTube para maiúsculas, minúsculas ou estilo título. Ajuste seus textos rápido antes de publicar.",
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
        metaTitle: "Generador de código de inserción YouTube",
        metaDescription:
          "Crea código embed de YouTube desde una URL de video. Personaliza tamaño, inicio, controles y copia el iframe.",
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
        metaTitle: "YouTube Embed Code Generator Free Tool",
        metaDescription:
          "Create YouTube embed code from a video URL. Customize size, start time, controls and copy the iframe quickly.",
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
        metaTitle: "Gerador de código de incorporação YouTube",
        metaDescription:
          "Crie código embed do YouTube a partir de uma URL. Personalize tamanho, início, controles e copie o iframe.",
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
          "Você também pode gerar links de tempo, links de inscrição e miniaturas para seus vídeos.",
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
        metaTitle: "Generador de enlaces de tiempo YouTube gratis | Clipnexo",
        metaDescription: "Crea enlaces de YouTube con marca de tiempo. Pega una URL, elige minuto y segundo, y copia el enlace exacto para compartir momentos específicos de tus videos.",
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
        metaTitle: "Free YouTube timestamp link generator tool | Clipnexo",
        metaDescription: "Create YouTube links with a specific timestamp. Paste a URL, choose minutes and seconds, and copy the exact link to share key video moments in seconds.",
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
        metaTitle: "Gerador de links de tempo YouTube grátis | Clipnexo",
        metaDescription: "Crie links do YouTube com marca de tempo. Cole uma URL, escolha o minuto e segundo, e copie o link exato para compartilhar momentos específicos do vídeo.",
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
        metaTitle: "Generador de enlaces de suscripción YouTube | Clipnexo",
        metaDescription: "Crea un enlace de suscripción automática para tu canal de YouTube. Aumenta tus suscriptores con un link directo que pide confirmación al usuario.",
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
        metaTitle: "YouTube subscription link generator tool | Clipnexo",
        metaDescription: "Create an auto-subscription link for your YouTube channel. Boost your subscribers with a direct link that asks users for confirmation immediately.",
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
        metaTitle: "Gerador de links de inscrição YouTube grátis | Clipnexo",
        metaDescription: "Crie um link de inscrição automática para seu canal do YouTube. Aumente seus inscritos com um link direto que pede confirmação ao usuário agora.",
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
        metaTitle: "Descargar miniaturas de YouTube gratis online | Clipnexo",
        metaDescription: "Descarga las miniaturas de cualquier video de YouTube en alta resolución (HD). Solo pega la URL del video y obtén la imagen de portada en segundos.",
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
        metaTitle: "Download YouTube thumbnails free online tool | Clipnexo",
        metaDescription: "Download thumbnails from any YouTube video in high resolution (HD). Just paste the video URL and get the cover image in seconds for free today.",
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
        metaTitle: "Baixar miniaturas do YouTube grátis online | Clipnexo",
        metaDescription: "Baixe as miniaturas de qualquer vídeo do YouTube em alta resolução (HD). Basta colar a URL do vídeo e obter a imagem de capa em segundos grátis.",
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
        metaTitle: "Calculadora de dinero de YouTube gratis online | Clipnexo",
        metaDescription: "Calcula cuánto dinero puede ganar un video o canal de YouTube según las vistas y el CPM estimado. Herramienta gratuita para creadores de contenido.",
        h1: "Calculadora de dinero de YouTube gratis online",
        lead: "Estima los ingresos potenciales de un video de YouTube basándote en el número de visualizaciones y el CPM de tu nicho.",
        howTitle: "Cómo calcular ingresos",
        howSteps: ["Ingresa el número total de vistas.", "Ajusta el CPM estimado (por 1000 vistas).", "Revisa el resultado diario, mensual y anual.", "Compara con diferentes niveles de retención."],
        purposeTitle: "Planificación financiera",
        purposeText: "Esta herramienta ayuda a los creadores a entender el potencial económico de sus canales y a establecer metas de crecimiento realistas.",
        tipsTitle: "Sobre el CPM",
        tips: ["El CPM varía según el país y el nicho.", "Niches de finanzas suelen tener CPM más alto.", "Vistas de países desarrollados pagan mejor."],
        moreToolsTitle: "Más herramientas",
        moreToolsIntro: "Analiza más a fondo tu canal:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Es exacto?", a: "Es una estimación basada en promedios. Los ingresos reales dependen de YouTube Adsense." }]
      },
      en: {
        metaTitle: "Free YouTube money calculator for creators | Clipnexo",
        metaDescription: "Calculate how much money a YouTube video or channel can earn based on views and estimated CPM. Free tool for content creators and marketers today.",
        h1: "Free YouTube money calculator for creators",
        lead: "Estimate potential earnings for a YouTube video based on view count and niche CPM.",
        howTitle: "How to calculate earnings",
        howSteps: ["Enter the total number of views.", "Adjust the estimated CPM (per 1000 views).", "Review daily, monthly and yearly results.", "Compare with different retention levels."],
        purposeTitle: "Financial Planning",
        purposeText: "This tool helps creators understand their channel's economic potential and set realistic growth goals.",
        tipsTitle: "About CPM",
        tips: ["CPM varies by country and niche.", "Finance niches usually have higher CPM.", "Views from developed countries pay better."],
        moreToolsTitle: "More tools",
        moreToolsIntro: "Analyze your channel further:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "Is it accurate?", a: "It is an estimate based on averages. Real earnings depend on YouTube AdSense." }]
      },
      pt: {
        metaTitle: "Calculadora de dinheiro do YouTube grátis online | Clipnexo",
        metaDescription: "Calcule quanto dinheiro um vídeo ou canal do YouTube pode ganhar com base em visualizações e CPM estimado. Ferramenta gratuita para criadores agora.",
        h1: "Calculadora de dinheiro do YouTube grátis online",
        lead: "Estime os ganhos potenciais de um vídeo do YouTube baseando-se no número de visualizações e no CPM do seu nicho.",
        howTitle: "Como calcular ganhos",
        howSteps: ["Insira o número total de views.", "Ajuste o CPM estimado (por 1000 views).", "Revise o resultado diário, mensal e anual.", "Compare com diferentes níveis de retenção."],
        purposeTitle: "Planejamento financeiro",
        purposeText: "Esta ferramenta ajuda criadores a entender o potencial econômico de seus canais e a estabelecer metas de crescimento realistas.",
        tipsTitle: "Sobre o CPM",
        tips: ["O CPM varia por país e nicho.", "Nichos de finanças costumam ter CPM maior.", "Visualizações de países desenvolvidos pagam melhor."],
        moreToolsTitle: "Mais ferramentas",
        moreToolsIntro: "Analise seu canal mais a fundo:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "É exato?", a: "É uma estimativa baseada em médias. Os ganhos reais dependem do YouTube AdSense." }]
      }
    }
  },
  youtubeViewRatioCalculator: {
    routeKey: "youtubeViewRatioCalculator",
    content: {
      es: {
        metaTitle: "Calculadora de proporción de vistas YouTube | Clipnexo",
        metaDescription: "Analiza la proporción de vistas vs suscriptores de tu canal de YouTube. Descubre qué tan viral es tu contenido comparado con tu base de fans actual.",
        h1: "Calculadora de proporción de vistas de YouTube",
        lead: "Calcula el porcentaje de visualizaciones en relación a tus suscriptores para medir el alcance de tus videos.",
        howTitle: "Cómo calcular la proporción",
        howSteps: ["Ingresa el número de suscriptores.", "Ingresa el número de vistas del video.", "Obtén el porcentaje de rendimiento.", "Analiza si el video superó a tu audiencia base."],
        purposeTitle: "Mide tu alcance",
        purposeText: "Una proporción alta indica que tu video está llegando a nuevas audiencias más allá de tus suscriptores actuales.",
        tipsTitle: "Interpretación",
        tips: ["Más del 100% indica potencial viral.", "Entre 10% y 50% es normal para canales sanos.", "Menos del 5% puede indicar problemas de miniatura."],
        moreToolsTitle: "Optimización de videos",
        moreToolsIntro: "Mejora estos números usando:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Qué es una buena proporción?", a: "Depende del tamaño del canal, pero superar el 20% suele ser positivo." }]
      },
      en: {
        metaTitle: "Free YouTube view ratio calculator tool online | Clipnexo",
        metaDescription: "Analyze the views vs subscribers ratio for your YouTube channel. Discover how viral your content is compared to your current fan base easily for free.",
        h1: "Free YouTube view ratio calculator tool online",
        lead: "Calculate the percentage of views relative to your subscribers to measure your video's reach and performance.",
        howTitle: "How to calculate the ratio",
        howSteps: ["Enter the number of subscribers.", "Enter the video's view count.", "Get the performance percentage.", "Analyze if the video exceeded your base audience."],
        purposeTitle: "Measure Your Reach",
        purposeText: "A high ratio indicates that your video is reaching new audiences beyond your current subscribers.",
        tipsTitle: "Interpretation",
        tips: ["Over 100% indicates viral potential.", "Between 10% and 50% is normal for healthy channels.", "Under 5% may indicate thumbnail or title issues."],
        moreToolsTitle: "Video Optimization",
        moreToolsIntro: "Improve these numbers using:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "What is a good ratio?", a: "It depends on channel size, but exceeding 20% is usually positive." }]
      },
      pt: {
        metaTitle: "Calculadora de proporção de views YouTube grátis | Clipnexo",
        metaDescription: "Analise a proporção de visualizações vs inscritos do seu canal do YouTube. Descubra o quão viral é seu conteúdo comparado à sua base de fãs atual.",
        h1: "Calculadora de proporção de views de YouTube",
        lead: "Calcule a porcentagem de visualizações em relação aos seus inscritos para medir o alcance dos seus vídeos.",
        howTitle: "Como usar",
        howSteps: ["Insira o número de inscritos.", "Insira o número de views do vídeo.", "Obtenha a porcentagem de desempenho.", "Analise se o vídeo superou sua audiência base."],
        purposeTitle: "Meça seu alcance",
        purposeText: "Uma proporção alta indica que seu vídeo está alcançando novos públicos além dos seus inscritos atuais.",
        tipsTitle: "Interpretação",
        tips: ["Mais de 100% indica potencial viral.", "Entre 10% e 50% é normal para canais saudáveis.", "Menos de 5% pode indicar problemas de miniatura."],
        moreToolsTitle: "Otimização de vídeos",
        moreToolsIntro: "Melhore estes números usando:",
        faqTitle: "Perguntas frequentes",
        faqs: [{ q: "O que é uma boa proporção?", a: "Depende do tamanho do canal, mas superar 20% costuma ser positivo." }]
      }
    }
  },
  instagramCaptionGenerator: {
    routeKey: "instagramCaptionGenerator",
    content: {
      es: {
        metaTitle: "Generador de captions para Instagram gratis online | Clipnexo",
        metaDescription: "Crea captions para Instagram según tu tema, tono y objetivo. Genera textos atractivos, rápidos y listos para copiar en segundos con nuestra herramienta gratuita.",
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
        metaTitle: "Free Instagram caption generator for better posts | Clipnexo",
        metaDescription: "Create Instagram captions by topic, tone and goal. Generate engaging text ideas that are quick, useful and ready to copy for your social media posts today.",
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
        metaTitle: "Gerador de legendas para Instagram grátis online | Clipnexo",
        metaDescription: "Crie legendas para Instagram por tema, tom e objetivo. Gere textos atrativos, rápidos e prontos para copiar em segundos com nossa ferramenta gratuita agora.",
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
        metaTitle: "Generador de hashtags para Instagram gratis online | Clipnexo",
        metaDescription: "Genera hashtags para Instagram según tu nicho o tema. Crea etiquetas limpias, relevantes y listas para copiar en segundos para mejorar tu alcance orgánico.",
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
        metaTitle: "Free Instagram hashtag generator for your posts | Clipnexo",
        metaDescription: "Generate Instagram hashtags by niche or topic. Create clean, relevant and ready-to-copy tags for posts, reels and stories to grow your account today easily.",
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
        metaTitle: "Gerador de hashtags para Instagram grátis online | Clipnexo",
        metaDescription: "Gere hashtags para Instagram por nicho ou tema. Crie etiquetas limpas, relevantes e prontas para copiar rapidamente e aumentar seu alcance nas redes sociais.",
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
        metaTitle: "Generador de bio para Instagram gratis online | Clipnexo",
        metaDescription: "Crea bios para Instagram según tu marca, nicho o estilo. Genera ideas cortas, claras y listas para copiar en segundos para atraer más seguidores a tu perfil.",
        h1: "Generador de bio para Instagram gratis online",
        lead: "Crea bios para Instagram según tu marca, nicho o estilo. Genera ideas cortas, claras y listas para copiar en segundos.",
        howTitle: "Crea tu bio perfecta",
        howSteps: ["Pon tu nombre o marca.", "Elige estilo y tono.", "Copia la que más te guste."],
        purposeTitle: "Importancia de la bio",
        purposeText: "Tu biografía es tu carta de presentación. Una buena bio convierte visitantes en seguidores.",
        tipsTitle: "Tips para una gran bio",
        tips: ["Usa palabras clave.", "Incluye un llamado a la acción.", "Manténlo corto y directo."],
        moreToolsTitle: "Más para tu perfil",
        moreToolsIntro: "Dale un toque profesional a tu Instagram:",
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "¿Puedo usar emojis?", a: "Nuestras sugerencias ya incluyen emojis optimizados." }]
      },
      en: {
        metaTitle: "Free Instagram bio generator for your profile | Clipnexo",
        metaDescription: "Create Instagram bio ideas by brand, niche or style. Generate short, clear and ready-to-copy profile texts in seconds to grow your online presence faster now.",
        h1: "Free Instagram bio generator for your profile",
        lead: "Create Instagram bio ideas by brand, niche or style. Generate short, clear and ready-to-copy profile texts in seconds.",
        howTitle: "Create your perfect bio",
        howSteps: ["Enter your name or brand.", "Choose style and tone.", "Copy the one you like best."],
        purposeTitle: "Importance of the bio",
        purposeText: "Your bio is your business card. A good bio converts visitors into followers.",
        tipsTitle: "Tips for a great bio",
        tips: ["Use keywords.", "Include a call to action.", "Keep it short and direct."],
        moreToolsTitle: "More for your profile",
        moreToolsIntro: "Give your Instagram a professional touch:",
        faqTitle: "Frequently Asked Questions",
        faqs: [{ q: "Can I use emojis?", a: "Our suggestions already include optimized emojis." }]
      },
      pt: {
        metaTitle: "Gerador de bio para Instagram grátis online | Clipnexo",
        metaDescription: "Crie bios para Instagram por marca, nicho ou estilo. Gere ideias curtas, claras e prontas para copiar em segundos para seu perfil profissional ou pessoal.",
        h1: "Gerador de bio para Instagram grátis online",
        lead: "Crie bios para Instagram por marca, nicho ou estilo. Gere ideias curtas, claras e prontas para copiar em segundos.",
        howTitle: "Crie sua bio perfeita",
        howSteps: ["Coloque seu nome ou marca.", "Escolha estilo e tom.", "Copie a que mais gostar."],
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
        metaTitle: "Ideas para Reels de Instagram gratis online | Clipnexo",
        metaDescription: "Genera ideas para Reels según tu nicho, tema u objetivo. Encuentra propuestas rápidas para crear contenido atractivo y viral para tu audiencia en Instagram.",
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
        metaTitle: "Free Instagram Reels ideas generator online | Clipnexo",
        metaDescription: "Generate Instagram Reels ideas by niche, topic or goal. Find quick content suggestions to create engaging short videos that grow your channel and audience today.",
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
        metaTitle: "Ideias para Reels do Instagram grátis online | Clipnexo",
        metaDescription: "Gere ideias para Reels por nicho, tema ou objetivo. Encontre sugestões rápidas para criar vídeos curtos atrativos e virais para seu perfil do Instagram agora.",
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
        metaTitle: "Ganchos para Reels de Instagram gratis online | Clipnexo",
        metaDescription: "Crea ganchos para Reels según tu tema y estilo. Genera frases iniciales atractivas para captar atención rápidamente y mejorar la retención de tus videos cortos.",
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
        metaTitle: "Free Instagram Reels hook generator online | Clipnexo",
        metaDescription: "Create Instagram Reels hooks by topic and style. Generate catchy opening lines to grab attention in the first seconds and increase your video views and engagement.",
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
        metaTitle: "Ganchos para Reels do Instagram grátis online | Clipnexo",
        metaDescription: "Crie ganchos para Reels por tema e estilo. Gere frases iniciais atrativas para prender atenção rapidamente e melhorar a performance dos seus vídeos no Instagram.",
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
        metaTitle: "Generador de posts para Facebook gratis online | Clipnexo",
        metaDescription: "Crea publicaciones para Facebook según tu tema, tono y objetivo. Genera textos útiles, claros y listos para copiar que aumenten la interacción en tu página hoy.",
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
        metaTitle: "Free Facebook post generator for better content | Clipnexo",
        metaDescription: "Create Facebook posts by topic, tone and goal. Generate useful, clear and ready-to-copy content ideas for your page that attract more followers and engagement.",
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
        metaTitle: "Gerador de posts para Facebook grátis online | Clipnexo",
        metaDescription: "Crie publicações para Facebook por tema, tom e objetivo. Gere textos úteis, claros e prontos para copiar que aumentem o engajamento da sua página profissional agora.",
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
        metaTitle: "Generador de anuncios para Facebook gratis online | Clipnexo",
        metaDescription: "Crea textos para anuncios de Facebook según producto, público y objetivo. Genera ideas claras para campañas y publicaciones publicitarias altamente rentables.",
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
        metaTitle: "Free Facebook ad copy generator for campaigns | Clipnexo",
        metaDescription: "Create Facebook ad copy by product, audience and goal. Generate clear ideas for campaigns, posts and promotions that drive more sales and leads for your business.",
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
        metaTitle: "Gerador de anúncios para Facebook grátis online | Clipnexo",
        metaDescription: "Crie textos para anúncios do Facebook por produto, público e objetivo. Gere ideias claras para campanhas e promoções que convertem mais leads e vendas online.",
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
        metaTitle: "Generador de textos para Marketplace online | Clipnexo",
        metaDescription: "Crea descripciones para Facebook Marketplace según producto, estado y precio. Genera textos claros para vender más rápido y profesionalmente tus productos usados.",
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
        metaTitle: "Free Marketplace text generator for products | Clipnexo",
        metaDescription: "Create Facebook Marketplace descriptions by product, condition and price. Generate clear texts to sell items faster and avoid common questions from buyers easily.",
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
        metaTitle: "Gerador de textos para Marketplace online | Clipnexo",
        metaDescription: "Crie descrições para Facebook Marketplace por produto, estado e preço. Gere textos claros para vender mais rápido e atrair compradores qualificados para seus itens.",
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
        metaTitle: "Generador de guiones para videos cortos gratis | Clipnexo",
        metaDescription: "Crea guiones para TikTok, Reels y Shorts según tu tema. Genera hook, desarrollo, cierre y CTA listos para usar en tus videos para mejorar la retención hoy.",
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
        metaTitle: "Free short video script generator for creators | Clipnexo",
        metaDescription: "Create scripts for TikTok, Reels and Shorts by topic. Generate hook, body, closing and CTA ideas ready to use and viralize your short videos easily right now.",
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
        metaTitle: "Gerador de roteiros para vídeos curtos grátis | Clipnexo",
        metaDescription: "Crie roteiros para TikTok, Reels e Shorts por tema. Gere gancho, desenvolvimento, fechamento e CTA prontos para usar e viralizar seus vídeos curtos nas redes agora.",
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
        faqTitle: "Preguntas frecuentes",
        faqs: [{ q: "Inclui hashtags?", a: "Sim, sugerimos as melhores para o seu tema." }]
      }
    }
  },
  socialMediaCharacterCounter: {
    routeKey: "socialMediaCharacterCounter",
    content: {
      es: {
        metaTitle: "Contador de caracteres para redes sociales | Clipnexo",
        metaDescription: "Cuenta caracteres, palabras, hashtags y emojis para Instagram, TikTok, YouTube, Facebook, LinkedIn y Twitter/X en segundos con límites actualizados para 2024.",
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
        metaTitle: "Social media character counter online tool | Clipnexo",
        metaDescription: "Count characters, words, hashtags and emojis for Instagram, TikTok, YouTube, Facebook, LinkedIn and Twitter/X in seconds with current 2024 limits for you.",
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
        metaTitle: "Contador de caracteres para redes sociais | Clipnexo",
        metaDescription: "Conte caracteres, palavras, hashtags e emojis para Instagram, TikTok, YouTube, Facebook, LinkedIn e Twitter/X em segundos com os limites de 2024 atualizados.",
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
  }
};
