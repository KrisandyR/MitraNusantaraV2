export interface IParamID {
    id?: string
}

export interface IMyProduct {
    transaction_id :number,
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}