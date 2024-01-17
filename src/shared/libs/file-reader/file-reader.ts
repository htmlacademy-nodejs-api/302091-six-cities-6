import { readFileSync } from 'node:fs';

import {
  RentalOffer,
  City,
  HousingType,
  Convenience,
} from '../../types/index.js';
import { FileReader } from './types.js';
import { getAuthor, getLocation, getTypedCollection } from './helpers.js';

export class TSVFileReader implements FileReader {
  constructor(filename: string) {
    this.filename = filename;
  }

  private rawData = '';
  private filename: string;

  read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  toArray(): RentalOffer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
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
        author,
        coordinates,
        commentsNumber,
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
        author: getAuthor(author),
        coordinates: getLocation(coordinates),
        commentsNumber: Number(commentsNumber),
      }));
  }
}
