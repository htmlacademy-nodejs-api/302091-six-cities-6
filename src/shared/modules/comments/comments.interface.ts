import { DocumentType } from '@typegoose/typegoose';

import { CommentsEntity } from './comments.entity.js';
import { CreateCommentDto } from './dto/index.js';

export interface CommentsService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentsEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentsEntity>[]>;
}
