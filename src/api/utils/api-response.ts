export class ApiResponse<T> {
  public success: boolean;
  public message: string;
  public data?: T;
  public error?: any;
  public timestamp: string;

  constructor(success: boolean, message: string, data?: T, error?: any) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(data: T, message = 'Operation successful'): ApiResponse<T> {
    return new ApiResponse(true, message, data);
  }

  static error(message: string, error?: any): ApiResponse<undefined> {
    return new ApiResponse(false, message, undefined, error);
  }
}
