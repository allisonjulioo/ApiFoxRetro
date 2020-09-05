import { Request, Response } from 'express';

export interface BaseInterface<T> {
  readonly get: (request: Request, response: Response) => Promise<Response<T>>;
  readonly create: (
    request: Request,
    response: Response
  ) => Promise<Response<T>>;
  readonly find: (request: Request, response: Response) => Promise<Response<T>>;
  readonly update: (
    request: Request,
    response: Response
  ) => Promise<Response<T>>;
  readonly delete: (
    request: Request,
    response: Response
  ) => Promise<Response<T>>;
  readonly search: (
    request: Request,
    response: Response
  ) => Promise<Response<T>>;
}
