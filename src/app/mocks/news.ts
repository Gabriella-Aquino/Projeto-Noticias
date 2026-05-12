import { INews } from '../types/news';

export const newsMock: INews[] = [
  {
    title: 'Novo telescópio revela imagens inéditas de galáxias distantes',
    subTitle: 'Cientistas comemoram avanço na observação espacial.',
    content:
      'Pesquisadores divulgaram novas imagens capturadas por um telescópio de última geração. As fotos mostram galáxias extremamente distantes com detalhes nunca vistos anteriormente.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
    created: new Date('2026-05-12'),
    updated: null,
    author: {
      name: 'Ana Souza',
    },
    category: 'ciencia',
    main: true
  },
  {
    title: 'Seleção brasileira vence amistoso internacional',
    subTitle: 'Equipe garantiu vitória nos minutos finais da partida.',
    content:
      'A seleção brasileira venceu por 2 a 1 em um amistoso emocionante realizado nesta sexta-feira. O gol decisivo saiu aos 43 minutos do segundo tempo.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
    created: new Date('2026-05-02'),
    updated: new Date('2026-05-02'),
    author: {
      name: 'Carlos Mendes',
    },
    category: 'esporte',
  },
  {
    title: 'Nova série de fantasia domina plataformas de streaming',
    subTitle: 'Produção bate recordes de audiência na estreia.',
    content:
      'A nova série conquistou milhões de espectadores logo no primeiro final de semana e já é considerada um dos maiores lançamentos do ano.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
    created: new Date('2026-05-03'),
    updated: new Date('2026-05-03'),
    author: {
      name: 'Fernanda Lima',
    },
    category: 'entretenimento',
  },
  {
    title: 'Congresso debate novas medidas econômicas',
    subTitle: 'Propostas incluem mudanças tributárias e incentivos.',
    content:
      'Parlamentares discutiram nesta semana novas propostas econômicas voltadas para o crescimento do mercado nacional e redução de impostos.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620',
    created: new Date('2026-05-04'),
    updated: new Date('2026-05-04'),
    author: {
      name: 'Ricardo Alves',
    },
    category: 'politica',
  },
  {
    title: 'Especialista analisa tendências da tecnologia em 2026',
    subTitle: 'Inteligência artificial segue como destaque do mercado.',
    content:
      'Especialistas apontam que a inteligência artificial continuará crescendo nos próximos anos, impactando áreas como educação, saúde e desenvolvimento de software.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    created: new Date('2026-05-05'),
    updated: new Date('2026-05-05'),
    author: {
      name: 'Juliana Rocha',
    },
    category: 'colunas',
  },
  {
    title: 'Pesquisa aponta aumento no uso de energia solar',
    subTitle: 'Famílias buscam alternativas para reduzir custos.',
    content:
      'O número de residências utilizando energia solar aumentou significativamente no último ano, segundo levantamento divulgado nesta semana.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276',
    created: new Date('2026-05-06'),
    updated: new Date('2026-05-06'),
    author: {
      name: 'Marcos Oliveira',
    },
    category: 'ciencia',
  },
  {
    title: 'Time conquista campeonato após disputa acirrada',
    subTitle: 'Final terminou nos pênaltis diante de estádio lotado.',
    content:
      'Após empate no tempo regulamentar, a decisão foi para os pênaltis e garantiu o título para a equipe vencedora.',
    image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a',
    created: new Date('2026-05-07'),
    updated: new Date('2026-05-07'),
    author: {
      name: 'Patrícia Gomes',
    },
    category: 'esporte',
  },
  {
    title: 'Festival cultural reúne milhares de pessoas',
    subTitle: 'Evento contou com música, dança e gastronomia.',
    content:
      'O festival aconteceu durante todo o final de semana e recebeu artistas nacionais e internacionais em diversas apresentações.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
    created: new Date('2026-05-08'),
    updated: new Date('2026-05-08'),
    author: {
      name: 'Beatriz Costa',
    },
    category: 'entretenimento',
  },
];
