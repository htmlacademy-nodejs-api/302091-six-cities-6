import { defaultClasses, getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import {
  HousingType,
  Convenience,
  City,
  Location,
} from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface HousingEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'housings',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class HousingEntity extends defaultClasses.TimeStamps {
  @prop({ ref: UserEntity, required: true })
  public authorId: Ref<UserEntity>;

  @prop({ required: true, minlength: 10, maxlength: 100 })
  public name: string;

  @prop({ required: true, minlength: 20, maxlength: 1024 })
  public description: string;

  @prop({ required: true })
  public date: Date;

  @prop({ required: true })
  public city: City;

  @prop({ required: true })
  public previewImage: string;

  @prop({ required: true, default: [], type: [String], })
  public photos: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rating: number;

  @prop({
    type: () => String,
    enum: HousingType
  })
  public housingType!: HousingType;

  @prop({ required: true, min: 1, max: 8 })
  public roomsNumber: number;

  @prop({ required: true, min: 1, max: 10 })
  public guestsNumber: number;

  @prop({ required: true, min: 100, max: 100_000 })
  public cost: number;

  @prop({
    required: true,
    default: [],
    type: [String],
    enum: Convenience
  })
  public conveniences: Convenience[];

  @prop({ required: true, default: 0 })
  public commentsNumber: number;

  @prop({
    required: false,
  })
  public coordinates: Location;
}

export const HousingModel = getModelForClass(HousingEntity);
