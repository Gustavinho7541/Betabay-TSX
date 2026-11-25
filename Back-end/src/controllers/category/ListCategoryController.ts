// Importa os tipos Request e Response do Express
// Request representa a requisição recebida
// Response representa a resposta enviada ao cliente
import type { Request, Response } from "express";


// Importa o service responsável pela lógica de listagem de categorias
import { ListCategoryService } from "../../services/category/ListCategoryService.js";


// Classe responsável por controlar a listagem de categorias
class ListCategoryController {

    // Método assíncrono responsável por processar a requisição
    async handle(req: Request, res: Response) {

        // Cria uma instância do service de listagem
        const listCategory = new ListCategoryService();

        // Executa o service para buscar as categorias no banco
        const categories = await listCategory.execute();

        // Retorna status 200 (OK) junto com a lista de categorias
        res.status(200).json(categories);
    }
}


// Exporta o controller para ser utilizado nas rotas
export { ListCategoryController };