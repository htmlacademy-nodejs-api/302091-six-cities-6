import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

import { UserEntity } from '../user/user.entity.js';
import { HousingEntity } from '../housing/housing.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentsEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentsEntity extends defaultClasses.TimeStamps {
    @prop({
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 1024,
    })
    public text: string;
  
    @prop({ required: true })
    public date: string;

    @prop({ required: true, min: 1, max: 5, })
    public rating: number

    @prop({ required: true, ref: UserEntity })
    public userId: Ref<UserEntity>;
  
    @prop({ required: true, ref: HousingEntity })
    public offerId: Ref<HousingEntity>;
}

export const CommentsModel = getModelForClass(CommentsEntity);
