export class RegisterUserRequest {
  username: string;
  email: string;
  password: string;
  role_id: number;
  profile_img: string;
}

export class LoginUserRequest {
  email: string;
  password: string;
}

export class UserResponse {
  id: number;
  username: string;
  email: string;
  role_id: number;
  profile_img: string;
  created_at?: Date;
  token?: string;
}
