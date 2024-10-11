import { User } from "@prisma/client";
import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../IUsersRepository";
import prismaClient from "../../../../db/prisma";

class UsersRepository implements IUsersRepository {
    async create({
        displayName,
        email,
        password,
        image,
    }: ICreateUsersDTO): Promise<User> {
        const user = await prismaClient.user.create({
            data: {
                displayName,
                email,
                password,
                image,
            },
        });

        return user;
    }
    async findByEmail(email: string): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: { email },
        });
        return user as User;
    }
}

export { UsersRepository };
