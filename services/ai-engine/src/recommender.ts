// Content recommendation engine based on user progress and preferences

interface Recommendation {
  courseId: string;
  title: string;
  area: string;
  reason: string;
  score: number; // relevance score 0-1
}

// In production: use collaborative filtering or embeddings
export async function getRecommendations(userId: string): Promise<Recommendation[]> {
  // Placeholder: return curated recommendations for Angolan technical areas
  const recommendations: Recommendation[] = [
    {
      courseId: '3',
      title: 'Instalação Solar no Namibe',
      area: 'energias-renovaveis',
      reason: 'Popular entre engenheiros civis em Angola',
      score: 0.92,
    },
    {
      courseId: '12',
      title: 'Redes de Fibra Óptica',
      area: 'telecomunicacoes',
      reason: 'Crescente demanda no mercado angolano',
      score: 0.85,
    },
    {
      courseId: '13',
      title: 'IA para Produção Petrolífera',
      area: 'inteligencia-artificial',
      reason: 'Combinação com o teu percurso em Petróleo & Gás',
      score: 0.88,
    },
  ];

  // Filter out already-completed courses (would require DB lookup in production)
  console.log(`Generating recommendations for user ${userId}`);
  return recommendations;
}
