import { getUser, getLocation, getTypedCollection } from '../libs/file-reader/helpers.js';
import { City, Convenience, HousingType, RentalOffer } from '../types/index.js';

export function createRentalOffer(str = ''): RentalOffer[] {
  return str
    .split('\n')
    .filter((row) => row.trim().length > 0)
    .map((line) => line.split('\t'))
    .map<RentalOffer>(([
      name,
      description,
      date,
      city,
      previewImage,
      photos,
      isPremium,
      isFavorite,
      rating,
      housingType,
      roomsNumber,
      guestsNumber,
      cost,
      conveniences,
      user,
      commentsNumber,
      coordinates,
    ]) => ({
      name,
      description,
      date: new Date(date),
      city: city as unknown as City,
      previewImage: previewImage,
      photos: getTypedCollection(photos),
      isPremium: isPremium === 'true',
      isFavorite: isFavorite === 'true',
      rating: Number(rating),
      housingType: housingType as unknown as HousingType,
      roomsNumber: Number(roomsNumber),
      guestsNumber: Number(guestsNumber),
      cost: Number(cost),
      conveniences: getTypedCollection<Convenience>(conveniences),
      user: getUser(user),
      commentsNumber: Number(commentsNumber),
      coordinates: getLocation(coordinates),
    }));
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
