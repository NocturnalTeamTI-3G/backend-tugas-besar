export class ForgotPasswordRequest {
  email: string;
}

export class ForgotPasswordCheckToken {
  token: string;
}

export class ForgotPasswordUpdate {
  password: string;
}

export class ForgotPasswordResponse {
  email?: string;
  message?: string;
}
