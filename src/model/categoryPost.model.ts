export class CategoryPostRequest {
  name: string;
}

export class CategoryPostResponse {
  id: number;
  name: string;
  created_at?: Date;
}
