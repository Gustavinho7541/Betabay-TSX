import prisma from "../../../lib/prisma.js";

interface CreateCategoryRequest {
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CreateCategoryRequest) {
        try {
            const category = await prisma.category.create({
                data: {
                    name,
                },

                // Define quais campos serão retornados após a criação
                // Isso evita retornar informações desnecessárias
                select: {
                    // Retorna o ID da categoria criada
                    id: true,

                    // Retorna o nome da categoria
                    name: true,

                    // Retorna a data de criação da categoria
                    createdAt: true,
                },
            });

            // Retorna a categoria criada
            return category;
        } catch (erro) {
            // Lança um novo erro personalizado
            // Esse erro pode ser tratado no middleware global de erros
            throw new Error("Falha ao criar Categoria");
        }
    }
}

// Exporta o service para ser utilizado em controllers ou outros arquivos
export default new CreateCategoryService();