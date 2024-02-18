import {
  HousingType,
  Convenience,
  City,
  User,
  Location,
} from '../../../types/index.js';

export class CreateHousingDto {
  public authorId: string;
  public name: string;
  public description: string;
  public date: Date;
  public city: City;
  public previewImage: string;
  public photos: string[];
  public isPremium: boolean;
  public housingType: HousingType;
  public roomsNumber: number;
  public guestsNumber: number;
  public cost: number;
  public conveniences: Convenience[];
  public user: User;
  public coordinates: Location;
}
