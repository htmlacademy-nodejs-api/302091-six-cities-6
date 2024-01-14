import { Author, Coordinates, UserTypes } from '../../types/index.js';

export function getAuthor(str = ''): Author {
  const [name, email, avatar, pass, type] = str.split(';').filter(Boolean);

  return ({name, email, avatar, pass, type: type as UserTypes});
}

export function getCoordinates(str = ''): Coordinates {
  const [latitude, longitude] = str.split(';').filter(Boolean);

  return ({
    latitude: Number(latitude),
    longitude: Number(longitude),
  });
}

export function getTypedCollection<T>(str = ''): T[] {
  return str.split(';').filter(Boolean) as T[];
}
