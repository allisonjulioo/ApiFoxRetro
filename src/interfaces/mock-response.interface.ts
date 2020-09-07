export interface MockedResponseInterface {
  status?: number;
  statusText?: string;
  headers?: Record<string, string | string[]>;
  body?: string;
}
