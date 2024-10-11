import { error } from "console";
import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class CreateUserUsecase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({ displayName, email, password, image }: ICreateUsersDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new Error("User already registered");
        }

        const user = await this.usersRepository.create({
            displayName,
            email,
            password,
            image,
        });
        return user;
    }
}

export { CreateUserUsecase };
