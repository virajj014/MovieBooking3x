export interface MovieCardType {
    title: string;
    portraitImgUrl: string;
    landscapeImgUrl: string;
    _id: string;
    rating: number;
    genre: string[];
    description: string;
    duration: number;
    cast: CelebrityCardType[];
    crew: CelebrityCardType[];

}

export interface CelebrityCardType{
    name: string;
    imageUrl: string;
    _id: string;
    role: string;
}