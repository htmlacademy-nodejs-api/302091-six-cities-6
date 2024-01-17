export enum UserType {
    Ordinary = 'Ordinary',
    Pro = 'Pro',
}

export enum City {
    Paris = 'Paris',
    Cologne = 'Cologne',
    Brussels = 'Brussels',
    Amsterdam = 'Amsterdam',
    Hamburg = 'Hamburg',
    Dusseldorf = 'Dusseldorf',
}

export enum HousingType {
    Apartment = 'apartment',
    House = 'house',
    Room = 'room',
    hotel = 'Hotel',
}

export enum Convenience {
    Breakfast = 'Breakfast',
    AirConditioning = 'Air conditioning',
    LaptopFriendlyWorkspace = 'Laptop friendly workspace',
    BabySeat = 'Baby seat',
    Washer = 'Washer',
    Towels = 'Towels',
    Fridge = 'Fridge',
}

export type Author = {
    name: string;
    email: string;
    avatar?: string;
    pass: string;
    type: UserType;
};

export type Location = Record<'latitude' | 'longitude', number>;

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
    conveniences: Convenience[];
    author: Author;
    coordinates: Location;
    commentsNumber: number;
};

export type Comment = {
    text: string;
    date: Date;
    rating: number;
    author: Author;
};
