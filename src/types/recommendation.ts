import { Job } from "./job";

export interface RecommendationItem {
  job: Job;
  score: number;
  reasoning: string;
}

export interface RecommendationsResponse {
  recommendations: RecommendationItem[];
  cached: boolean;
}
