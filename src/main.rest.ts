import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/types/component.enum.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { createHousingContainer } from './shared/modules/housing/housing.container.js';
import { createCommentsContainer } from './shared/modules/comments/comments.container.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createHousingContainer(),
    createCommentsContainer(),
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);

  await application.init();
}

bootstrap();
