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
    image: 'https://images.pexels.com/photos/33630927/pexels-photo-33630927.jpeg?auto=compress&cs=tinysrgb&w=1280',
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
    image: 'https://images.pexels.com/photos/32981432/pexels-photo-32981432.jpeg?auto=compress&cs=tinysrgb&w=640',
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
    image: 'https://images.pexels.com/photos/14746411/pexels-photo-14746411.jpeg?auto=compress&cs=tinysrgb&w=640',
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
    image: 'https://images.pexels.com/photos/34824202/pexels-photo-34824202.jpeg?auto=compress&cs=tinysrgb&w=640',
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
    image: 'https://images.pexels.com/photos/8386437/pexels-photo-8386437.jpeg?auto=compress&cs=tinysrgb&w=640',
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
    image: 'https://images.pexels.com/photos/9799702/pexels-photo-9799702.jpeg?auto=compress&cs=tinysrgb&w=640',
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
    image: 'https://images.pexels.com/photos/7005685/pexels-photo-7005685.jpeg?auto=compress&cs=tinysrgb&w=640',
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
    image: 'https://images.pexels.com/photos/12657546/pexels-photo-12657546.jpeg?auto=compress&cs=tinysrgb&w=640',
    created: new Date('2026-05-08T15:30:00'),
    updated: new Date('2026-05-08T18:00:00'),
    author: 7,
    category: 3,
  },
  {
    id: 9,
    title: 'Pesquisadores criam material capaz de se regenerar sozinho',
    subTitle: 'Descoberta pode revolucionar indústrias aeroespacial e médica.',
    content: `
    <p>Cientistas anunciaram o desenvolvimento de um novo polímero inteligente capaz de reparar pequenos danos automaticamente sem intervenção humana. O material reage ao calor ambiente e reorganiza suas moléculas após sofrer rachaduras superficiais.</p>

    <p>Os pesquisadores acreditam que a tecnologia poderá ser aplicada em próteses médicas, telas flexíveis e até revestimentos de aeronaves. <strong>Os testes mostraram recuperação de até 92% da estrutura original</strong> em menos de duas horas.</p>

    <p>Especialistas afirmam que o avanço representa um passo importante na criação de materiais mais duráveis e sustentáveis, reduzindo desperdícios industriais e custos de manutenção.</p>
  `,
    image: 'https://images.pexels.com/photos/8533136/pexels-photo-8533136.jpeg?auto=compress&cs=tinysrgb&w=640',
    created: new Date('2026-05-09T08:00:00'),
    updated: new Date('2026-05-09T10:15:00'),
    author: 4,
    category: 4,
  },
  {
    id: 10,
    title: 'Empresa apresenta carro elétrico com autonomia recorde',
    subTitle: 'Modelo promete percorrer mais de mil quilômetros com uma única carga.',
    content: `
    <p>Uma fabricante de veículos revelou nesta semana um novo carro elétrico de alta performance capaz de ultrapassar a marca de 1.000 quilômetros de autonomia. O modelo utiliza baterias de estado sólido, tecnologia considerada o futuro do setor automotivo.</p>

    <p>Além do alcance impressionante, o veículo pode recuperar 80% da carga em apenas 12 minutos. <strong>Analistas apontam que o anúncio aumenta a pressão competitiva</strong> sobre outras montadoras globais.</p>

    <p>O lançamento oficial está previsto para o próximo semestre, inicialmente em mercados da Europa e Ásia.</p>
  `,
    image: 'https://images.pexels.com/photos/24376862/pexels-photo-24376862.jpeg?auto=compress&cs=tinysrgb&w=640',
    created: new Date('2026-05-09T11:30:00'),
    updated: new Date('2026-05-09T13:00:00'),
    author: 6,
    category: 4,
  },
  {
    id: 11,
    title: 'Museu inaugura exposição imersiva sobre o oceano',
    subTitle: 'Experiência utiliza projeções em 360 graus e realidade aumentada.',
    content: `
    <p>O novo espaço interativo leva visitantes para uma jornada virtual pelas profundezas do oceano. Tubarões, baleias e recifes de corais são projetados em paredes gigantes enquanto sensores reproduzem sons e movimentos marítimos.</p>

    <p>A exposição também possui uma área educativa dedicada aos impactos ambientais causados pela poluição plástica. <strong>Organizadores esperam receber mais de 500 mil visitantes</strong> até o encerramento da temporada.</p>

    <p>Escolas públicas terão acesso gratuito ao evento em dias específicos da semana.</p>
  `,
    image: 'https://images.pexels.com/photos/1452701/pexels-photo-1452701.jpeg?auto=compress&cs=tinysrgb&w=640',
    created: new Date('2026-05-10T09:45:00'),
    updated: new Date('2026-05-10T12:20:00'),
    author: 2,
    category: 3,
  },
  {
    id: 12,
    title: 'Cidade testa ônibus movidos totalmente a hidrogênio',
    subTitle: 'Projeto busca reduzir emissões de carbono no transporte público.',
    content: `
    <p>A prefeitura iniciou a fase experimental de uma nova frota de ônibus movidos a hidrogênio verde. Os veículos emitem apenas vapor d’água e possuem autonomia superior aos modelos elétricos tradicionais.</p>

    <p>Segundo autoridades locais, a iniciativa faz parte do plano de neutralidade climática previsto para 2040. <strong>Os primeiros testes reduziram em 70% os custos operacionais</strong> em comparação aos veículos a diesel.</p>

    <p>Especialistas observam que o principal desafio ainda é expandir a infraestrutura de abastecimento da tecnologia.</p>
  `,
    image: 'https://images.pexels.com/photos/13012408/pexels-photo-13012408.jpeg?auto=compress&cs=tinysrgb&w=640',
    created: new Date('2026-05-10T14:00:00'),
    updated: new Date('2026-05-10T16:40:00'),
    author: 5,
    category: 1,
  },
  {
    id: 13,
    title: 'Jogador bate recorde histórico em campeonato internacional',
    subTitle: 'Atleta marcou cinco gols em uma única partida decisiva.',
    content: `
    <p>O atacante protagonizou uma atuação histórica durante a semifinal do campeonato internacional, quebrando um recorde que permanecia intacto há mais de três décadas.</p>

    <p>A performance gerou enorme repercussão nas redes sociais e colocou o jogador entre os favoritos ao prêmio de melhor atleta da temporada. <strong>Torcedores lotaram o aeroporto para recepcionar a equipe</strong> após a classificação para a final.</p>

    <p>Com a vitória, o clube garantiu presença na competição mundial do próximo ano.</p>
  `,
    image: 'https://images.pexels.com/photos/17390399/pexels-photo-17390399.jpeg?auto=compress&cs=tinysrgb&w=640',
    created: new Date('2026-05-11T18:30:00'),
    updated: new Date('2026-05-11T22:10:00'),
    author: 1,
    category: 2,
  },
  {
    id: 14,
    title: 'Estudo revela crescimento acelerado de cidades inteligentes',
    subTitle: 'Tecnologia urbana avança em mobilidade e segurança pública.',
    content: `
    <p>Um levantamento internacional mostrou que investimentos em infraestrutura inteligente cresceram significativamente nos últimos dois anos. Sistemas automatizados de trânsito e monitoramento urbano lideram as iniciativas.</p>

    <p>Especialistas afirmam que sensores conectados em tempo real podem melhorar o fluxo de veículos, reduzir acidentes e otimizar serviços públicos. <strong>Mais de 300 cidades aderiram a projetos de digitalização urbana</strong> apenas neste ano.</p>

    <p>O relatório também alerta para desafios relacionados à privacidade de dados e segurança cibernética.</p>
  `,
    image: 'https://images.pexels.com/photos/33803484/pexels-photo-33803484.jpeg?auto=compress&cs=tinysrgb&w=640',
    created: new Date('2026-05-12T07:50:00'),
    updated: new Date('2026-05-12T09:10:00'),
    author: 7,
    category: 5,
  },
  {
    id: 15,
    title: 'Cientistas detectam sinais promissores em exoplaneta distante',
    subTitle: 'Atmosfera do planeta apresenta compostos ligados à presença de água.',
    content: `
    <p>Uma equipe de pesquisadores anunciou a descoberta de compostos químicos promissores na atmosfera de um exoplaneta localizado a cerca de 120 anos-luz da Terra. A análise foi realizada utilizando dados coletados pelo telescópio James Webb.</p>

    <p>Os cientistas identificaram traços de vapor d’água e metano, elementos considerados fundamentais na busca por ambientes potencialmente habitáveis. <strong>A descoberta reacendeu debates sobre vida fora da Terra</strong> dentro da comunidade científica internacional.</p>

    <p>Apesar do entusiasmo, especialistas reforçam que ainda não existem evidências concretas de organismos vivos no planeta analisado.</p>
  `,
    image: 'https://images.pexels.com/photos/18507018/pexels-photo-18507018.jpeg?auto=compress&cs=tinysrgb&w=640',
    created: new Date('2026-05-12T18:40:00'),
    updated: new Date('2026-05-12T20:00:00'),
    author: 4,
    category: 4,
  },
  {
    id: 16,
    title: 'Aplicativo de idiomas registra crescimento recorde no Brasil',
    subTitle: 'Busca por qualificação profissional impulsiona plataformas digitais.',
    content: `
    <p>Empresas do setor de educação online registraram um aumento expressivo no número de novos usuários durante o primeiro semestre. Cursos de inglês e espanhol lideraram a procura entre jovens adultos.</p>

    <p>Segundo especialistas, a popularização do trabalho remoto internacional incentivou profissionais a investirem em qualificação linguística. <strong>O número de assinaturas premium cresceu quase 60%</strong> em relação ao mesmo período do ano anterior.</p>

    <p>Além de idiomas tradicionais, cursos de coreano e japonês também apresentaram forte crescimento impulsionado pela cultura pop asiática.</p>
  `,
    image: 'https://images.pexels.com/photos/14814047/pexels-photo-14814047.jpeg?auto=compress&cs=tinysrgb&w=640',
    created: new Date('2026-05-13T08:20:00'),
    updated: new Date('2026-05-13T10:10:00'),
    author: 2,
    category: 5,
  },
  {
    id: 17,
    title: 'Tempestade solar intensa pode afetar comunicações por satélite',
    subTitle: 'Agências espaciais monitoram atividade incomum do Sol.',
    content: `
    <p>Observatórios internacionais detectaram uma forte ejeção de massa coronal direcionada parcialmente à Terra. O fenômeno pode causar interferências em sistemas de GPS, comunicações via satélite e redes elétricas.</p>

    <p>A tempestade solar foi classificada entre as mais intensas do ciclo atual da atividade solar. <strong>Empresas de telecomunicações já iniciaram protocolos preventivos</strong> para minimizar possíveis impactos.</p>

    <p>Especialistas afirmam que auroras boreais poderão ser vistas em regiões incomuns caso o fenômeno atinja grande intensidade geomagnética.</p>
  `,
    image: 'https://images.pexels.com/photos/87611/sun-fireball-solar-flare-sunlight-87611.jpeg?auto=compress&cs=tinysrgb&w=640',
    created: new Date('2026-05-13T13:50:00'),
    updated: new Date('2026-05-13T15:00:00'),
    author: 6,
    category: 4,
  },
  {
    id: 18,
    title: 'Streaming anuncia adaptação de clássico da literatura brasileira',
    subTitle: 'Produção contará com elenco internacional e estreia global.',
    content: `
    <p>Uma grande plataforma de streaming confirmou a adaptação audiovisual de um dos romances mais importantes da literatura brasileira. O projeto será produzido em parceria com estúdios estrangeiros.</p>

    <p>A série terá oito episódios e promete modernizar elementos da narrativa original sem perder sua essência cultural. <strong>As gravações começam ainda este ano</strong> em cidades históricas do Nordeste brasileiro.</p>

    <p>O anúncio gerou forte repercussão nas redes sociais, com leitores divididos entre entusiasmo e preocupação com possíveis mudanças no roteiro.</p>
  `,
    image: 'https://images.pexels.com/photos/67654/pexels-photo-67654.jpeg?auto=compress&cs=tinysrgb&w=640',
    created: new Date('2026-05-13T16:30:00'),
    updated: new Date('2026-05-13T18:15:00'),
    author: 7,
    category: 3,
  },
  {
    id: 19,
    title: 'Mercado de games cresce impulsionado por jogos independentes',
    subTitle: 'Pequenos estúdios conquistam espaço com projetos inovadores.',
    content: `
    <p>O setor de jogos eletrônicos registrou crescimento significativo neste ano, especialmente no segmento independente. Jogos produzidos por pequenas equipes vêm alcançando milhões de downloads em plataformas digitais.</p>

    <p>Analistas apontam que a criatividade e a liberdade artística têm atraído jogadores cansados de fórmulas repetitivas das grandes franquias. <strong>Eventos focados em desenvolvedores independentes bateram recordes de audiência</strong> em transmissões online.</p>

    <p>Ferramentas acessíveis de desenvolvimento também contribuíram para democratizar a produção de jogos ao redor do mundo.</p>
  `,
    image: 'https://images.pexels.com/photos/9409819/pexels-photo-9409819.jpeg?auto=compress&cs=tinysrgb&w=640',
    created: new Date('2026-05-14T09:10:00'),
    updated: new Date('2026-05-14T11:00:00'),
    author: 5,
    category: 3,
  },
  {
    id: 20,
    title: 'Nova vacina experimental apresenta resultados positivos',
    subTitle: 'Pesquisadores destacam eficácia elevada nos testes iniciais.',
    content: `
    <p>Uma vacina experimental desenvolvida por pesquisadores europeus apresentou resultados considerados promissores em testes clínicos preliminares. O imunizante utiliza tecnologia de RNA mensageiro de nova geração.</p>

    <p>Segundo os cientistas, os voluntários demonstraram forte resposta imunológica e baixos índices de efeitos colaterais graves. <strong>A próxima etapa envolverá milhares de participantes</strong> em diversos países.</p>

    <p>Especialistas reforçam que ainda serão necessários anos de acompanhamento antes da aprovação definitiva pelas agências reguladoras.</p>
  `,
    image: 'https://images.pexels.com/photos/6075033/pexels-photo-6075033.jpeg?auto=compress&cs=tinysrgb&w=640',
    created: new Date('2026-05-14T12:00:00'),
    updated: null,
    author: 1,
    category: 4,
  },
];
