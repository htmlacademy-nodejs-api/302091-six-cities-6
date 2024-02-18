import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';

import { HousingService } from './housing-service.interface.js';
import { HousingEntity } from './housing.entity.js';
import { CreateHousingDto } from './index.js';

@injectable()
export class DefaultHousingService implements HousingService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.HousingModel)
    private readonly offerModel: types.ModelType<HousingEntity>
  ) {}

  public async create(dto: CreateHousingDto): Promise<DocumentType<HousingEntity>> {
    const result = await this.offerModel.create(dto);

    this.logger.info(`Новое объявление создано: ${dto.name}`);

    return result;
  }

  public async find(): Promise<DocumentType<HousingEntity>[]> {
    const LIMIT = 60;
    const result = await this.offerModel.aggregate([
      {
        $lookup: {
          from: 'comments',
          let: { offerId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
            { $group: { _id: null, rating: { $avg: '$rating' }, commentsNumber: { $sum: 1 } } },
          ],
          as: 'comments'
        }
      },
      {
        $addFields: {
          id: { $toString: '$_id'},
          commentsNumber: { $arrayElemAt: ['$comments.commentsNumber', 0] },
          rating: { $arrayElemAt: ['$comments.rating', 0] },
        }
      },
      {
        $unset: 'comments'
      },
      {
        $limit: LIMIT
      },
    ])
    .exec();

    return result;
  }


  public async findById(
    offerId: string
  ): Promise<DocumentType<HousingEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }
}
