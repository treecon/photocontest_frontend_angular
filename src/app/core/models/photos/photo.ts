import { User } from "../users/user";

export interface Photo {
    id: string,
    imageURL: string,
    score: number,
    isVoted: false,
    user: User,
}
