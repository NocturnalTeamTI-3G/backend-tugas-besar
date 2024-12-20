import { ProductResponse } from './product.model';

export class HistoryScanResponse {
  id: number;
  userId: number;
  disease: string;
  description_disease: string;
  solution_disease: string;
  products?: ProductResponse[];
  face_img: string;
  created_at: Date;
}
