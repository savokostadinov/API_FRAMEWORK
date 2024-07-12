import { UserData } from "./GetUserData";
import { SupportData } from "./SupportData";

export interface CreateUserResponsePost {
    name: string;
    job: string;
    id: string;
    createdAt: string;
}