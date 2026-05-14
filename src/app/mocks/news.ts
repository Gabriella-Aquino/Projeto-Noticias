import { INews } from '../types/news';

export const newsMock: INews[] = [
  {
    id: 1,
    title: 'James Webb revela imagens inéditas de galáxias distantes',
    subTitle:
      'Cientistas comemoram avanço na observação espacial com detalhes nunca antes vistos do "Amanhecer Cósmico".',
    content: `
      <p>Uma equipe internacional de astrônomos publicou, nesta terça-feira, resultados fascinantes obtidos pelo Telescópio Espacial James Webb (JWST). Pela primeira vez, foram detectados sinais claros de formação estelar intensa em galáxias situadas a mais de <strong>13,4 bilhões de anos-luz</strong> da Terra, datando de apenas 300 milhões de anos após o Big Bang.</p>
      
      <p>Diferente de todas as observações anteriores feitas pelo Hubble, esta nova evidência sugere que o universo primitivo era muito mais ativo e populado do que as teorias cosmológicas atuais previam. As galáxias detectadas são surpreendentemente brilhantes e massivas para o período em que surgiram, o que desafia os modelos de simulação de evolução do cosmos.</p>
      
      <blockquote>
        <strong>"Estamos reescrevendo o cronograma do cosmos. Não esperávamos encontrar sistemas tão organizados em uma era tão jovem do universo"</strong>, afirmou a Dra. Elena Vance, astrofísica líder do projeto no Goddard Space Flight Center.
      </blockquote>

      <p>As imagens capturadas através dos instrumentos de infravermelho (NIRCam) revelam nuvens densas de gás e poeira estelar. Esses aglomerados são os berçários onde as primeiras estrelas de "População III" — astros massivos compostos apenas de hidrogênio e hélio — teriam brilhado pela primeira vez. A observação desses detalhes permite entender melhor como a nossa própria Via Láctea iniciou seu processo de formação.</p>

      <p>O próximo passo da missão envolve a análise espectroscópica dessas galáxias para identificar a presença de elementos químicos mais pesados, como oxigênio e carbono. Segundo os pesquisadores, se esses elementos forem encontrados, significará que gerações de estrelas já haviam morrido e enriquecido o meio interestelar muito antes do que se imaginava ser possível.</p>
      
      <p>A comunidade científica global celebrou os dados, afirmando que o James Webb finalmente atingiu seu objetivo primário: observar o "Amanhecer Cósmico", o momento exato em que a luz das primeiras estrelas viajou pelo espaço vazio para dar fim à era das trevas universais.</p>
    `,
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
    created: new Date('2026-05-12T10:00:00'),
    updated: new Date('2026-05-13T09:30:00'),
    author: 1,
    category: 4,
    main: true,
  },
  {
    id: 2,
    title: 'Seleção brasileira vence amistoso internacional',
    subTitle: 'Equipe garantiu vitória nos minutos finais da partida em Wembley.',
    content: `
      <p>A seleção brasileira venceu por 2 a 1 em um amistoso emocionante realizado nesta sexta-feira. O jogo foi marcado por uma forte retranca do adversário, que dificultou as infiltrações brasileiras durante a maior parte do tempo.</p>
      <p>O gol decisivo saiu aos 43 minutos do segundo tempo, após uma jogada individual brilhante pela lateral esquerda. <strong>O técnico destacou a resiliência do grupo</strong>, afirmando que o entrosamento está evoluindo para as competições oficiais que começam no próximo semestre.</p>
      <p>A torcida presente no estádio lotado celebrou a atuação dos jovens estreantes, que trouxeram velocidade e criatividade ao meio-campo da equipe nacional.</p>
    `,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
    created: new Date('2026-05-02T16:00:00'),
    updated: new Date('2026-05-02T18:30:00'),
    author: 1,
    category: 2,
  },
  {
    id: 3,
    title: 'Nova série de fantasia domina plataformas de streaming',
    subTitle: 'Produção bate recordes de audiência na estreia mundial.',
    content: `
      <p>A nova série épica conquistou milhões de espectadores logo no primeiro final de semana. Com um orçamento recorde e efeitos visuais de ponta, a produção já é considerada um dos maiores lançamentos da década no gênero de fantasia.</p>
      <p>Críticos elogiaram a profundidade do roteiro e a construção do mundo fictício, que adapta fielmente a obra literária original. <strong>A expectativa é que a segunda temporada seja confirmada ainda este mês</strong>, dado o engajamento massivo nas redes sociais.</p>
      <p>A trilha sonora, composta por artistas premiados, também se tornou um fenômeno à parte, dominando as paradas de streaming de música globalmente.</p>
    `,
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
    created: new Date('2026-05-03T09:00:00'),
    updated: new Date('2026-05-03T11:00:00'),
    author: 2,
    category: 3,
  },
  {
    id: 4,
    title: 'Congresso debate novas medidas econômicas',
    subTitle: 'Propostas incluem mudanças tributárias e novos incentivos fiscais.',
    content: `
      <p>Parlamentares discutiram nesta semana novas propostas voltadas para o crescimento do mercado nacional. O foco principal é a redução da carga tributária sobre produtos tecnológicos, visando atrair novos investimentos estrangeiros.</p>
      <p>Analistas econômicos alertam que, embora a medida seja positiva para o consumo, <strong>é necessário um ajuste fiscal rigoroso</strong> para evitar o aumento da inflação no longo prazo. O projeto deve passar por votação final na próxima terça-feira.</p>
      <p>O governo defende que os novos incentivos permitirão que pequenas e médias empresas modernizem seu parque industrial, gerando mais empregos e aumentando a competitividade do país.</p>
    `,
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620',
    created: new Date('2026-05-04T14:20:00'),
    updated: new Date('2026-05-04T16:45:00'),
    author: 3,
    category: 1,
  },
  {
    id: 5,
    title: 'Especialista analisa tendências da tecnologia em 2026',
    subTitle: 'Inteligência artificial segue como o maior destaque do mercado global.',
    content: `
      <p>Especialistas apontam que a inteligência artificial continuará crescendo de forma exponencial nos próximos anos. O impacto em áreas como educação e saúde já é visível, com diagnósticos médicos mais precisos e ensino personalizado.</p>
      <p><strong>"A IA não é mais uma promessa, é a infraestrutura do futuro"</strong>, afirmou o consultor sênior em tecnologia. O grande desafio agora reside na ética e na regulamentação do uso desses dados em larga escala.</p>
      <p>O mercado de trabalho também está se adaptando, com uma demanda crescente por profissionais que saibam integrar ferramentas de automação em fluxos de trabalho criativos e técnicos.</p>
    `,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    created: new Date('2026-05-05T08:30:00'),
    updated: new Date('2026-05-05T10:00:00'),
    author: 5,
    category: 5,
  },
  {
    id: 6,
    title: 'Pesquisa aponta aumento no uso de energia solar',
    subTitle: 'Famílias buscam alternativas sustentáveis para reduzir custos mensais.',
    content: `
      <p>O número de residências utilizando energia solar aumentou 40% no último ano. A queda nos preços das placas fotovoltaicas e novas linhas de crédito facilitaram o acesso para a classe média.</p>
      <p>Além da economia financeira, <strong>a preocupação com a sustentabilidade</strong> tem sido um fator decisivo para os novos consumidores. O sistema permite que o excesso de energia gerado seja vendido de volta para a rede elétrica local.</p>
      <p>Governos estaduais estão estudando novos subsídios para condomínios populares, visando democratizar o acesso à energia limpa e reduzir a pressão sobre as hidrelétricas nacionais.</p>
    `,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276',
    created: new Date('2026-05-06T12:00:00'),
    updated: new Date('2026-05-06T14:15:00'),
    author: 6,
    category: 4,
  },
  {
    id: 7,
    title: 'Time conquista campeonato após disputa acirrada',
    subTitle: 'A decisão histórica terminou nos pênaltis diante de um estádio lotado.',
    content: `
      <p>Após um empate dramático no tempo regulamentar, a final foi decidida nas cobranças de pênaltis. O goleiro da equipe vencedora se tornou o herói da noite ao defender duas cobranças consecutivas.</p>
      <p>O título marca o fim de um jejum de dez anos sem conquistas expressivas para o clube. <strong>A torcida invadiu as ruas</strong> para celebrar o troféu que coloca a equipe de volta no topo do ranking nacional.</p>
      <p>Especialistas destacam que a mudança na gestão técnica no início da temporada foi fundamental para reconstruir a confiança do elenco e implementar um esquema tático mais ofensivo.</p>
    `,
    image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a',
    created: new Date('2026-05-07T21:00:00'),
    updated: new Date('2026-05-07T23:50:00'),
    author: 3,
    category: 2,
  },
  {
    id: 8,
    title: 'Festival cultural reúne milhares de pessoas na capital',
    subTitle: 'Evento gratuito contou com música, dança e gastronomia internacional.',
    content: `
      <p>O festival aconteceu durante todo o final de semana e recebeu artistas nacionais e internacionais. Palcos espalhados pelo centro da cidade ofereceram desde apresentações de jazz até oficinas de danças folclóricas.</p>
      <p>O setor gastronômico foi um dos mais procurados, com chefs renomados oferecendo pratos de diversas culturas. <strong>A organização estimou um público de 200 mil pessoas</strong> ao longo dos três dias de evento.</p>
      <p>A segurança e o transporte público foram reforçados, garantindo que o festival ocorresse sem incidentes graves, sendo elogiado pela prefeitura como um exemplo de ocupação urbana positiva.</p>
    `,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    created: new Date('2026-05-08T15:30:00'),
    updated: new Date('2026-05-08T18:00:00'),
    author: 7,
    category: 3,
  },
];
