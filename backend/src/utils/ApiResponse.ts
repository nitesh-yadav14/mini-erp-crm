export class ApiResponse<T = any> {
  constructor(
    public success: boolean,
    public message: string,
    public data?: T
  ) {}
}