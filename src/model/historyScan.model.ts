export class HistoryScanRequest {
  diseaseId: number;
  productId: number;
  face_img: string;
}

export class HistoryScanResponse {
  id: number;
  userId: number;
  disease: string;
  description_disease: string;
  solution_disease: string;
  product: string;
  description_product: string;
  face_img: string;
  created_at: Date;
}
