import { User } from "@prisma/client";
import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";

interface IUsersRepository {
    create({
        displayName,
        email,
        password,
        image,
    }: ICreateUsersDTO): Promise<User>;
    findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
