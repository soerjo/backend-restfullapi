export interface IResponseDto<T> {
  status?: number;
  message?: string;
  data?: T;
}

export class ResponseDto<T> implements IResponseDto<T> {
  status = 200;
  message = 'success';
  data: T;
  constructor(obj?: IResponseDto<T>) {
    Object.assign(this, obj);
  }
}
