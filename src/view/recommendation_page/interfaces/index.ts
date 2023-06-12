import { LargeNumberLike } from "crypto"

export declare interface IExample {};

export interface IRecomPageProduct{
    title: string,
    img: string,
    price: number,
    city: string,
    regency: string | null,
    rating: number,
    ratingCount: number,
    description: string
    tags: IRecomFilter|IRecomFilter[]
}

export interface IRecomFilter{
    travelWith?: string[]|string,
    packageType: string,
    isLocal: boolean,
    budget: string,
    budgetValue: number
}
