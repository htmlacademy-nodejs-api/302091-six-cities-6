import dayjs from 'dayjs';
import { MockServerData } from '../../interfacas/index.js';
import { User, UserType } from '../../types/index.js';
import { OfferGenerator } from './type.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_VALUE = 1;
const MAX_VALUE = 10;

function getRandomItem<T extends Array<unknown>>(arr: T): T[number] {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

function getRandomBoolean(): boolean {
  return getRandomItem([true, false]);
}

type UsersKey = Record<
    keyof Omit<User, 'type'>, keyof Omit<MockServerData, 'locations'>
>;

export default class TSVOfferGenerator implements OfferGenerator {
  private readonly mockData: MockServerData;

  constructor(mockData: MockServerData) {
    this.mockData = mockData;
  }

  private generateUser(): User {
    const usersKey: UsersKey = {
      name: 'userNames',
      email: 'emails',
      pass: 'passwords',
      avatar: 'avatars',
    } as const;

    const halfUserFields = (
      Object.entries<UsersKey[keyof UsersKey]>(usersKey)
        .reduce((acc, [key, value]) => {
          acc[key as keyof UsersKey] = getRandomItem(this.mockData[value]);

          return acc;
        }, {} as Omit<User, 'type'>)
    );

    const type = getRandomItem(Object.keys(UserType) as UserType[]);

    return { ...halfUserFields, type };
  }

  generate(): string {
    const user = this.generateUser();

    const name = getRandomItem(this.mockData.names);
    const description = getRandomItem(this.mockData.descriptions);
    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const photos = getRandomItem(this.mockData.photos);
    const housingType = getRandomItem(this.mockData.housingTypes);
    const conveniences = getRandomItem(this.mockData.conveniences);

    const isFavorite = getRandomBoolean();
    const isPremium = getRandomBoolean();
    const price = generateRandomValue(100, 100000);
    const roomsNumber = generateRandomValue(MIN_VALUE, 8);
    const rating = generateRandomValue(MIN_VALUE, 5);
    const guestsNumber = generateRandomValue(MIN_VALUE, MAX_VALUE);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const commentsCount = generateRandomValue(MIN_VALUE, MAX_VALUE);
    const location = getRandomItem(this.mockData.locations);

    return [
      name, description, postDate,
      city, previewImage, photos,
      isFavorite, isPremium, rating,
      housingType, roomsNumber, guestsNumber,
      price, conveniences, Object.values(user).join(';'), commentsCount,
      Object.values(location).join(';')
    ].join('\t');
  }
}
