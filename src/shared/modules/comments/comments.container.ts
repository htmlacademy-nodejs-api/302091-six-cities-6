import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { Component } from '../../types/component.enum.js';
import { CommentsService } from './comments.interface.js';
import { DefaultCommentService } from './default-comments.service.js';
import { CommentsEntity, CommentsModel } from './comments.entity.js';

export const createCommentsContainer = () => {
  const offerContainer = new Container();

  offerContainer.bind<CommentsService>(Component.CommentService).to(DefaultCommentService);
  offerContainer
    .bind<types.ModelType<CommentsEntity>>(Component.CommentModel)
    .toConstantValue(CommentsModel);

  return offerContainer;
};
