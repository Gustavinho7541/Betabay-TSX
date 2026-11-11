
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(router);

// Inicialização do servidor
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
