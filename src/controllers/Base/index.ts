import { Request, Response } from 'express';
import { DestroyOptions, Op, UpdateOptions } from 'sequelize';

export abstract class BaseService<T> {
  constructor(private model: any) {}

  public async get(request: Request, response: Response): Promise<Response<T>> {
    this.model
      .findAll({})
      .then((data: T[]) => response.json(data))
      .catch((err: Error) => response.status(500).json(err));
    return response;
  }

  public async create(
    request: Request,
    response: Response
  ): Promise<Response<T>> {
    const params: T = request.body;
    this.model
      .create(params)
      .then((data: T) => response.status(201).json(data))
      .catch((err: Error) => response.status(500).json(err));
    return response;
  }

  public async find(
    request: Request,
    response: Response
  ): Promise<Response<T>> {
    const dataId: string = request.params.id;

    this.model
      .findByPk(dataId)
      .then((data: T | null) => {
        if (data) {
          response.json(data);
        } else {
          response.status(404).json({ errors: ['Content not found'] });
        }
      })
      .catch((err: Error) => response.status(500).json(err));
    return response;
  }

  public async update(
    request: Request,
    response: Response
  ): Promise<Response<T>> {
    const dataId: string = request.params.id;
    const params: T = request.body;

    const options: UpdateOptions = {
      where: { id: dataId },
      limit: 1,
    };

    this.model
      .update(params, options)
      .then(() => response.status(202).json({ data: 'success' }))
      .catch((err: Error) => response.status(500).json(err));
    return response;
  }

  public async delete(
    request: Request,
    response: Response
  ): Promise<Response<T>> {
    const dataId: string = request.params.id;
    const options: DestroyOptions = {
      where: { id: dataId },
      limit: 1,
    };
    this.model
      .destroy(options)
      .then(() => response.status(204).json({ data: 'success' }))
      .catch((err: Error) => response.status(500).json(err));
    return response;
  }
  public async search(
    request: Request,
    response: Response
  ): Promise<Response<T>> {
    const { value, key } = request.body;
    this.model
      .findAll({
        where: {
          [key]: {
            [Op.like]: `%${value}%`,
          },
        },
      })
      .then((data: T[]) => response.json(data))
      .catch((err: Error) => response.status(500).json(err));
    return response;
  }
}
