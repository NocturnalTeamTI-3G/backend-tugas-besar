export class PostRequest {
  title: string;
  content: string;
  category_id: number;
  post_img: string;
}

export class PostResponse {
  id: number;
  title: string;
  content: string;
  category_id: number;
  user_id: number;
  post_img: string;
  views?: number;
  likes?: number;
  created_at?: Date;
  updated_at?: Date;
}
