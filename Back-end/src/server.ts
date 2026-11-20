
import express, { type ErrorRequestHandler } from "express";
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

// Inicia o servidor e exibe uma mensagem no console quando estiver rodando
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});

// Middleware global de tratamento de erros do Express
// Ele captura qualquer erro lançado na aplicação (ex: throw new Error)
const errorHandler: ErrorRequestHandler = (error, _, res, _next) => {

    // Verifica se o erro é uma instância da classe Error
    if(error instanceof Error) {

        // Retorna status 400 (erro do cliente) com a mensagem do erro
        return res.status(400).json({
            error: error.message,
        })
    }

    // Caso não seja um erro conhecido, retorna erro genérico do servidor
    return res.status(500).json({
        error: "Internal server error!"
    })
};

app.use(errorHandler);