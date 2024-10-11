import { Request, Response } from "express";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { CreateUserUsecase } from "./CreateUserUseCase";

const usersRepository = new UsersRepository();
class CreateUserController {
    async handle(request: Request, response: Response) {
        const { displayName, email, password, image } = request.body;

        const createUserUseCase = new CreateUserUsecase(usersRepository);

        const user = await createUserUseCase.execute({
            displayName,
            email,
            password,
            image,
        });

        return response.status(201).json(user);
    }
}

export { CreateUserController };
