import { Request, Response } from 'express';
import { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';
import { Board, Column } from '../models';

export abstract class BaseController<T> {
  constructor(private model: any) {}

  public async get(request: Request, response: Response): Promise<Response<T>> {
    let count = 0;
    this.model.count().then((c: number) => (count = c));
    this.model
      .findAll({ limit: 20 })
      .then((data: T[]) => {
        response.header({ 'total-records': count });
        response.json(data);
      })
      .catch((err: Error) => response.status(500).json(err));
    return response;
  }

  public async create(
    request: Request,
    response: Response
  ): Promise<Response<T>> {
    let params: T = request.body;
    const user_id = request.headers.uid || '';
    params = { ...params, user_id };
    this.model
      .create(params)
      .then((result: T) => {
        if (this.model === Board) {
          this.createDefaultColumns(result, String(user_id));
        }
        return response.status(201).json(result);
      })
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
    let params: T = request.body;
    const user_id = request.headers.uid || '';
    params = { ...params, user_id };
    const options: UpdateOptions = {
      where: { id: dataId },
      limit: 1,
    };

    this.model
      .update(params, options)
      .then(() => response.status(202).json({ message: 'success', id: dataId }))
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
      .then(() => response.status(204).json({ message: 'success' }))
      .catch((err: Error) => response.status(500).json(err));
    return response;
  }
  private async createDefaultColumns(data: any, user_id: string) {
    const columns = [
      { title: 'Para melhorar', color: '#ff2948' },
      { title: 'Deu certo', color: '#57b596' },
      { title: 'Ações', color: '#72809a' },
    ];
    for (let column of columns) {
      const { title, color } = column;
      Column.create({
        title,
        color,
        user_id,
        board_id: data.dataValues.id,
      });
    }
    return;
  }
  public async search(options: FindOptions): Promise<Response<T>> {
    return this.model
      .findAll(options)
      .then((success: T[]) => success)
      .catch((err: Error) => err);
  }
}
