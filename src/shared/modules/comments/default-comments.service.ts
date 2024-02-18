import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';

import { CommentsService } from './comments.interface.js';
import { CommentsEntity } from './comments.entity.js';
import { CreateCommentDto } from './dto/index.js';

@injectable()
export class DefaultCommentService implements CommentsService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel)
    private readonly commentModel: types.ModelType<CommentsEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentsEntity>> {
    const result = await this.commentModel.create(dto);

    this.logger.info(`Новый комментарий для объявления ${dto.offerId} создан.`);

    return result;
  }

  public async findByOfferId(
    offerId: string,
    limit = 50
  ): Promise<DocumentType<CommentsEntity>[]> {
    return (
        this.commentModel
            .find({offerId}, null, { limit })
            .sort({ createdAt: -1 })
            .populate({ path: 'offerId' })
            .exec()
    );
  }
}
