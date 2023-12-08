import { User } from "src/modules/user/entities/user.entity";

export class IAuthResponse {
  token: string;
  user: User;
}

export type CustomResponse = {
  status: number;
  code: string;
  success: boolean;
  message: string|string[];
};

export type ResponseError = {
  data: {};
  response: CustomResponse;
};

export type ResponseSuccess<T> = {
  data: T;
  response: CustomResponse;
};

export type BaseResponse<T = undefined> = T extends undefined
  ? ResponseError
  : ResponseSuccess<T>;
