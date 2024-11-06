export class RegisterUserRequest {
  username: string;
  email: string;
  password: string;
  roleId: number;
  profile_img: string;
}

export class UserResponse {
  id: number;
  username: string;
  email: string;
  roleId: number;
  profile_img: string;
  token?: string;
}
