export declare interface IHotel {
    hotelId: string,
    hotelName: string,
    minPrice: number,
    images: string[],
    city: string,
    address: string,
    hotelStar: number,
    rating: number,
    ratingCount: number,
    travelStyleCategory: string,
    companionTypeCategory: string,
    attractionTypeCategory: string,
    facilities: IFacility[]
};

export declare interface IFacility {
    facilityType: string,
    facilityName: string, 
    isGeneralFacilities: string
}

export declare interface IHotelRoom {
    roomId: string,
    hotelId: string,
    roomName: string,
    price: number,
    maxPerson: number,
    bedDesc: string,
    facilities: IFacility[],
    images: string[]
}


