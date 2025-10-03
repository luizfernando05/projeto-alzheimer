import { CohereClient } from 'cohere-ai';

interface PatientProfile {
  name: string;
  age: number;
  gender: string;
  predictionResult: string;
  confidenceScore: number;
  mmseScore?: number;
  hasSymptoms: boolean;
}

interface Recommendation {
  category: string;
  title: string;
  description: string;
  icon: string;
}

interface RecommendationResponse {
  personalizedMessage: string;
  recommendations: Recommendation[];
}

export class CohereService {
  private cohere: CohereClient;

  constructor() {
    const apiKey = process.env.COHERE_API_KEY;

    if (!apiKey) {
      console.warn('COHERE_API_KEY não configurada - usando fallback');
    }

    this.cohere = new CohereClient({
      token: apiKey || '',
    });
  }

  async generateRecommendations(
    patientProfile: PatientProfile
  ): Promise<RecommendationResponse> {
    // Se não tem API key, usar fallback diretamente
    if (!process.env.COHERE_API_KEY) {
      console.log('Usando recomendações fallback - API key não configurada');
      return this.getFallbackRecommendations(patientProfile);
    }

    try {
      console.log('Gerando recomendações com Cohere Chat API...');

      const response = await this.cohere.chat({
        model: 'command-nightly',
        message: this.buildPrompt(patientProfile),
        temperature: 0.7,
        maxTokens: 1000,
        preamble:
          'Você é um assistente médico especializado em Alzheimer que gera recomendações personalizadas baseadas no perfil do paciente.',
      });

      return this.parseResponse(response.text, patientProfile);
    } catch (error) {
      console.error('Erro ao gerar recomendações com Cohere:', error);
      return this.getFallbackRecommendations(patientProfile);
    }
  }

  private buildPrompt(profile: PatientProfile): string {
    return `
Gere recomendações personalizadas para um paciente com as seguintes características:

Nome: ${profile.name}
Idade: ${profile.age} anos
Gênero: ${profile.gender}
Resultado da predição: ${profile.predictionResult}
Score de confiança: ${Math.round(profile.confidenceScore * 100)}%
Score MMSE: ${profile.mmseScore || 'Não disponível'}
Presença de sintomas: ${profile.hasSymptoms ? 'Sim' : 'Não'}

Responda APENAS com um JSON válido no seguinte formato:
{
  "personalizedMessage": "Uma mensagem personalizada e empática de 2-3 frases sobre a condição do paciente, usando o nome ${profile.name}",
  "recommendations": [
    {
      "category": "nutrition",
      "title": "Alimentação",
      "description": "Recomendação específica sobre alimentação para este perfil",
      "icon": "🥗"
    },
    {
      "category": "exercise",
      "title": "Atividade Física",
      "description": "Recomendação específica sobre exercícios para este perfil",
      "icon": "🏃‍♀️"
    },
    {
      "category": "cognitive",
      "title": "Estimulação Cognitiva",
      "description": "Recomendação específica sobre atividades cognitivas para este perfil",
      "icon": "🧠"
    },
    {
      "category": "social",
      "title": "Suporte Social",
      "description": "Recomendação específica sobre apoio social para este perfil",
      "icon": "👥"
    }
  ]
}

Não inclua nenhum texto adicional, apenas o JSON.
`;
  }

  private parseResponse(
    responseText: string,
    profile: PatientProfile
  ): RecommendationResponse {
    try {
      console.log('Resposta bruta da Cohere:', responseText);

      // Limpar a resposta removendo possíveis marcadores de código
      let cleanedResponse = responseText
        .trim()
        .replace(/```json\s*|\s*```/g, '')
        .replace(/```\s*|\s*```/g, '')
        .trim();

      // Se a resposta começar e terminar com chaves, tentar parse direto
      if (cleanedResponse.startsWith('{') && cleanedResponse.endsWith('}')) {
        const parsed = JSON.parse(cleanedResponse);

        // Validar estrutura
        if (
          parsed.personalizedMessage &&
          parsed.recommendations &&
          Array.isArray(parsed.recommendations) &&
          parsed.recommendations.length > 0
        ) {
          console.log('Recomendações parsadas com sucesso da Cohere');
          return parsed;
        }
      }

      throw new Error('Estrutura de resposta inválida ou incompleta');
    } catch (error) {
      console.error('Erro ao fazer parse da resposta da Cohere:', error);
      console.log('Usando recomendações fallback');
      return this.getFallbackRecommendations(profile);
    }
  }

  private getFallbackRecommendations(
    profile: PatientProfile
  ): RecommendationResponse {
    const isPositive = profile.predictionResult
      .toLowerCase()
      .includes('positive');

    const baseMessage = isPositive
      ? `${profile.name}, com base na análise realizada, identificamos um padrão que requer atenção especial. É importante adotar medidas preventivas para manter sua qualidade de vida e bem-estar cognitivo.`
      : `${profile.name}, os resultados da análise são tranquilizadores. Continue mantendo hábitos saudáveis para preservar sua saúde cognitiva e bem-estar geral.`;

    // Personalizar recomendações baseado no perfil
    const nutritionDesc =
      profile.mmseScore && profile.mmseScore < 24
        ? 'Dieta mediterrânea com foco em ômega-3, antioxidantes e suplementos específicos para função cerebral. Evite açúcares e alimentos processados.'
        : 'Mantenha uma dieta rica em frutas, vegetais, grãos integrais, peixes e azeite de oliva para proteção cerebral contínua.';

    const exerciseDesc =
      profile.age > 70
        ? 'Exercícios de baixo impacto como caminhadas leves, hidroginástica e tai chi, adaptados para sua faixa etária.'
        : 'Exercícios aeróbicos moderados como caminhadas, natação ou dança por 30 minutos, 5 vezes por semana.';

    const cognitiveDesc = isPositive
      ? 'Atividades cognitivas estruturadas: leitura diária, quebra-cabeças complexos, jogos de memória e terapia ocupacional.'
      : 'Mantenha a mente ativa com leitura, aprendizado de novas habilidades e atividades criativas como pintura ou música.';

    const socialDesc = profile.hasSymptoms
      ? 'Busque apoio especializado, participe de grupos de apoio e mantenha forte rede familiar. Considere acompanhamento psicológico.'
      : 'Mantenha conexões sociais ativas, participe de atividades comunitárias e cultive relacionamentos familiares.';

    return {
      personalizedMessage: baseMessage,
      recommendations: [
        {
          category: 'nutrition',
          title: 'Alimentação',
          description: nutritionDesc,
          icon: '🥗',
        },
        {
          category: 'exercise',
          title: 'Atividade Física',
          description: exerciseDesc,
          icon: '🏃‍♀️',
        },
        {
          category: 'cognitive',
          title: 'Estimulação Cognitiva',
          description: cognitiveDesc,
          icon: '🧠',
        },
        {
          category: 'social',
          title: 'Suporte Social',
          description: socialDesc,
          icon: '👥',
        },
      ],
    };
  }
}

export default CohereService;
