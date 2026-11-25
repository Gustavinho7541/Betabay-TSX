// Importa a instância do Prisma Client
// Responsável pela comunicação com o banco de dados
import prismaClient from "../../prisma/index.js";


// Classe responsável pela lógica de listagem de categorias
class ListCategoryService {

    // Método assíncrono para buscar categorias no banco
    async execute() {

        // Bloco de tentativa para tratamento de erros
        try {

            // Busca todas as categorias cadastradas
            const categories = await prismaClient.category.findMany({

                // Define quais campos serão retornados
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                },

                // Ordena as categorias pela data de criação
                // "desc" = mais recentes primeiro
                orderBy: {
                    createdAt: "desc",
                },
            });

            // Retorna a lista de categorias
            return categories;

        // Captura possíveis erros
        } catch (erro) {

            // Lança um erro personalizado
            throw new Error("Falha ao buscar categorias");
        }
    }
}


// Exporta o service para ser utilizado no controller
export { ListCategoryService }