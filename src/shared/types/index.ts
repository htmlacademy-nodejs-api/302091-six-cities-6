export enum UserTypes {
    ordinary = 'обычный',
    pro = 'pro',
}

export enum City {
    Paris,
    Cologne,
    Brussels,
    Amsterdam,
    Hamburg,
    Dusseldorf,
}

export enum HousingType {
    apartment,
    house,
    room,
    hotel,
}

export enum Conveniences {
    Breakfast,
    'Air conditioning',
    'Laptop friendly workspace',
    'Baby seat',
    Washer,
    Towels,
    Fridge,
}

export type Author = {
    name: string;
    email: string;
    avatar?: string;
    pass: string;
    type: UserTypes;
};

export type Coordinates = Record<'latitude' | 'longitude', number>;

export type RentalOffer = {
    name: string;
    description: string;
    date: Date;
    city: City;
    previewImage: string;
    photos: string[];
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    housingType: HousingType;
    roomsNumber: number;
    guestsNumber: number;
    cost: number;
    conveniences: Conveniences[];
    author: Author;
    coordinates: Coordinates;
    commentsNumber?: number;
};

export type Comment = {
    text: string;
    date: Date;
    rating: number;
    author: Author;
};
