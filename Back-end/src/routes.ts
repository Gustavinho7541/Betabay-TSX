import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController.js";

import { validateSchema } from "./middlewares/validateSchema.js";

import { authSchema } from "./schemas/userSchema.js";
import { AuthUserController } from "./controllers/user/AuthUserController.js";

const router = Router();

router.post(
    "/users",
    validateSchema(authSchema),
    new CreateUserController().handle
);

export { router };

// Define uma rota do tipo POST no caminho "/session"
// Essa rota será usada para autenticação (login do usuário)
router.post(

  "/session", // endpoint da rota (ex: http://localhost:3000/session)

  // Middleware que valida os dados enviados no body da requisição
  // Ele usa um schema (authUserSchema) para garantir que email e senha estejam corretos
  validateSchema(authSchema),

  // Controller responsável por processar a requisição
  // Aqui ele executa o método handle, que faz a autenticação do usuário
  new AuthUserController().handle
);

