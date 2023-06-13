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

export declare interface ICart {
    hotelId: string,
    hotelName: string,
    startDate: Date,
    endDate: Date,
    room: ICartRoom[]
}

export declare interface ICartRoom {
    roomId: string,
    roomName: string,
    roomPrice: number,
    dayOrNight: number
}


