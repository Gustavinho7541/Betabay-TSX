// Importa a biblioteca Zod
// O Zod é usado para validação de dados e criação de schemas
// Ele ajuda a garantir que os dados recebidos estejam corretos
import { z } from 'zod';


// Cria e exporta um schema chamado createCategorySchema
// Esse schema será usado para validar os dados enviados na requisição
export const createCategorySchema = z.object({

    // Define que será validado o corpo da requisição (req.body)
    body: z.object({

        name: z
            // Define que o campo "name" obrigatoriamente deve ser do tipo string
            // Caso não seja texto, retorna essa mensagem personalizada
            .string({ message: "Categoria precisa ser um texto" })

            .min(2, {
                // Define que o texto precisa ter no mínimo 2 caracteres
                // Caso tenha menos, retorna essa mensagem de erro personalizada
                message: "O nome da categoria precisa ter no mínimo 2 letras"
            }),
    })
});