import type { Request, Response, NextFunction } from "express";
// Importa os tipos do Express usados no middleware
// Request representa a requisição recebida
// Response representa a resposta que será enviada ao cliente
// NextFunction representa a função que permite seguir para o próximo middleware/controller

import prismaClient from "../prisma.js";
// Importa a instância do Prisma Client
// Ela permite consultar o banco de dados

export const isAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
// Cria e exporta um middleware chamado isAdmin
// Ele verifica se o usuário logado possui permissão de administrador
// O async permite usar await dentro da função
// Promise<void> indica que essa função não retorna dados diretamente

    const user_id = req.user_id;
    // Pega o ID do usuário salvo dentro da requisição
    // Esse user_id normalmente foi adicionado antes pelo middleware isAuthenticated

    if (!user_id) {
    // Verifica se não existe user_id na requisição
    // Isso indica que o usuário não está autenticado corretamente

        res.status(401).json({
            error: "Usuário sem Permissão",
        });
        // Retorna status 401, indicando que o usuário não tem autorização

        return;
        // Encerra a execução do middleware
        // Isso impede que o código continue
    }

    const user = await prismaClient.user.findFirst({
    // Busca no banco de dados um usuário com o ID recebido

        where: {
            id: user_id
        }
        // Define a condição da busca
        // Procura o usuário cujo id seja igual ao user_id
    });

    if (!user) {
    // Verifica se nenhum usuário foi encontrado no banco

        res.status(401).json({
            error: "Usuário sem permissão",
        });
        // Retorna erro 401, pois o usuário não existe ou não é válido

        return;
        // Para a execução do middleware
    }

    if (user.role !== "ADMIN") {
    // Verifica se o tipo/perfil do usuário é diferente de ADMIN
    // Se não for ADMIN, ele não pode acessar a rota protegida

        res.status(401).json({
            error: "Usuário sem permissão",
        });
        // Retorna erro 401 informando falta de permissão

        return;
        // Encerra a execução para não liberar acesso
    }

    // Usuário é admin... então segue normal...
    next();
    // Chama o próximo middleware ou controller da rota
    // Só chega aqui se o usuário existir e tiver role ADMIN
}

//Resumo do fluxo:
//Pega user_id -> busca usuário no banco -> verifica se existe -> verifica se é ADMIN -> libera acesso