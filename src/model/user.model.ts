export class RegisterUserRequest {
  username: string;
  email: string;
  password: string;
  role_id: number;
  profile_img: string;
  gender: string;
}

export class UpdateUserRequest {
  username: string;
  email: string;
  password: string;
  role_id: number;
  profile_img: string;
  gender: string;
}

export class LoginUserRequest {
  email: string;
  password: string;
}

export class UserResponse {
  id: number;
  username: string;
  email: string;
  gender: string;
  role_id: number;
  profile_img?: string;
  created_at?: Date;
  token?: string;
}
