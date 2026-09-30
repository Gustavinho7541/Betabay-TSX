// Corrigido: Removido o 'type' para permitir o uso completo dos métodos do express
// Corrigido: Removido o 'type' para permitir o uso completo dos métodos do express
import type { Request, Response } from "express";

// Corrigido: Adicionado o '.js' no final do caminho como exigido pelo node16/nodenext
import { CreateUserService } from "../../services/user/CreateUserService.js";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password,
        });

        return res.status(201).json({
            message: "Usuário criado com sucesso",
            user,
        });
    }
}

export { CreateUserController };
