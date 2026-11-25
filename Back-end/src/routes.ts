import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { AuthUserController } from "./controllers/user/AuthUserController.js";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController.js";
import { ListCategoryController } from "./controllers/category/ListCategoryController.js";

import { validateSchema } from "./middlewares/validateSchema.js";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";
import { isAdmin } from "./middlewares/isAdmin.js";

import { authSchema } from "./schemas/userSchema.js";
import { createCategorySchema } from "./schemas/categorySchema.js";

const router = Router();

// Cria um usuário
router.post(
  "/users",
  validateSchema(authSchema),
  new CreateUserController().handle
);

// Login (autenticação)
router.post(
  "/session",
  validateSchema(authSchema),
  new AuthUserController().handle
);

// Cria categoria (só administrador)
router.post(
  "/category",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle
);

// Lista categorias (qualquer usuário logado)
router.get(
  "/category",
  isAuthenticated,
  new ListCategoryController().handle
);

export { router };