import { User, Location, UserType } from '../../types/index.js';

export function getUser(str = ''): User {
  const [name, email, avatar, pass, type] = str.split(';').filter(Boolean);

  return ({name, email, avatar, pass, type: type as UserType});
}

export function getLocation(str = ''): Location {
  const [latitude, longitude] = str.split(';').filter(Boolean);

  return ({
    latitude: Number(latitude),
    longitude: Number(longitude),
  });
}

export function getTypedCollection<T>(str = ''): T[] {
  return str.split(';').filter(Boolean) as T[];
}
