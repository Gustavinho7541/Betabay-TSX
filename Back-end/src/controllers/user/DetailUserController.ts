import { type Request, type Response } from 'express';
// Importa os tipos Request e Response do Express
// Request representa a requisição recebida
// Response representa a resposta que será enviada ao cliente

import { DetailUserService } from '../../services/user/DetailUserService.js'
// Importa o service responsável por buscar os detalhes do usuário no banco de dados

class DetailUserController {
// Cria a classe DetailUserController
// O Controller é responsável por receber a requisição e devolver uma resposta

    async handle(req: Request, res: Response) {
    // Cria o método assíncrono handle
    // Esse método será chamado quando a rota de detalhes do usuário for acessada
    // O async permite usar await dentro dele

        const user_id = req.user_id;
        // Pega o ID do usuário que está salvo dentro da requisição
        // Normalmente esse req.user_id é adicionado por um middleware de autenticação
        // Exemplo: o middleware valida o token JWT e coloca o ID do usuário em req.user_id

        const detailUser = new DetailUserService();
        // Cria uma instância da classe DetailUserService
        // Esse service contém a regra de negócio para buscar os dados do usuário

        const user = await detailUser.execute(user_id);
        // Chama o método execute do service, passando o ID do usuário
        // O await espera a busca no banco de dados terminar
        // O resultado será armazenado na variável user

        return res.json(user)
        // Retorna os dados do usuário em formato JSON como resposta da API
    }
}

export { DetailUserController };