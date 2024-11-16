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
  category_id?: number;
  user_id?: number;
  username?: string;
  profile_img?: string;
  category_name?: string;
  post_img: string;
  views?: number;
  likes?: number;
  isLiked?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
