export class ProductRequest {
  name: string;
  description: string;
  nutrition: string;
  category_id: number;
  product_img: string;
}

export class ProductResponse {
  id: number;
  name: string;
  description: string;
  nutrition: string;
  category_id?: number;
  category_name?: string;
  product_img: string;
}
