interface CachedRecommendation {
  patientId: string;
  recommendations: any;
  createdAt: Date;
  expiresAt: Date;
}

export class RecommendationCacheService {
  private cache: Map<string, CachedRecommendation> = new Map();
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas em millisegundos

  set(patientId: string, recommendations: any): void {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.CACHE_DURATION);

    this.cache.set(patientId, {
      patientId,
      recommendations,
      createdAt: now,
      expiresAt,
    });

    console.log(
      `Cache salvo para paciente ${patientId}, expira em ${expiresAt}`
    );
  }

  get(patientId: string): any | null {
    const cached = this.cache.get(patientId);

    if (!cached) {
      console.log(`Cache não encontrado para paciente ${patientId}`);
      return null;
    }

    const now = new Date();
    if (now > cached.expiresAt) {
      console.log(`Cache expirado para paciente ${patientId}, removendo...`);
      this.cache.delete(patientId);
      return null;
    }

    console.log(`Cache válido encontrado para paciente ${patientId}`);
    return cached.recommendations;
  }

  delete(patientId: string): void {
    this.cache.delete(patientId);
    console.log(`Cache removido para paciente ${patientId}`);
  }

  // Limpar cache expirado automaticamente
  clearExpired(): void {
    const now = new Date();
    const expiredKeys: string[] = [];

    this.cache.forEach((cached, key) => {
      if (now > cached.expiresAt) {
        expiredKeys.push(key);
      }
    });

    expiredKeys.forEach((key) => {
      this.cache.delete(key);
    });

    if (expiredKeys.length > 0) {
      console.log(`${expiredKeys.length} caches expirados removidos`);
    }
  }

  // Invalidar cache quando dados médicos mudarem
  invalidateForPatient(patientId: string): void {
    this.delete(patientId);
  }
}

// Singleton instance
export const recommendationCache = new RecommendationCacheService();

// Limpar cache expirado a cada hora
setInterval(
  () => {
    recommendationCache.clearExpired();
  },
  60 * 60 * 1000
);
