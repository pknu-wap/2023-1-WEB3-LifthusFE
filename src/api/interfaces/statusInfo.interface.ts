export interface StatusInfo {
  code: 200 | 201 | 401 | 406 | 409 | 500;
  message: string;
}