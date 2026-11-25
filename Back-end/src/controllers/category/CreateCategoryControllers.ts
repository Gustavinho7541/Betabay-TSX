import CreateCategoryService from "../../services/category/CreateCategoryService.js";
import type { Request, Response } from "express";

// Controllers recebem os dados da requisição e retornam respostas
class CreateCategoryController {

    // Método assíncrono responsável por processar a requisição
    // O async permite usar await dentro do método
    async handle(req: Request, res: Response) {

        // Pega o campo "name" enviado no corpo da requisição
        // Exemplo:
        // {
        //   "name": "Bebidas"
        // }
        const { name } = req.body;

        // Chama o método execute da instância exportada pelo service
        // Envia o nome da categoria para ser salvo no banco
        // O await espera a operação terminar
        const category = await CreateCategoryService.execute({ name: name })

        // Retorna status HTTP 201 (Created)
        // Indica que um novo registro foi criado com sucesso
        // Também retorna os dados da categoria criada em JSON
        res.status(201).json(category)
    }
}


// Exporta o controller para ser utilizado nas rotas da aplicação
export { CreateCategoryController }