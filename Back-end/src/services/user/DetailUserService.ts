import prismaClient from "../../prisma"
// Importa a instância do Prisma Client
// Essa instância é responsável por fazer a comunicação com o banco de dados

class DetailUserService {
// Define uma classe chamada DetailUserService
// Ela segue o padrão de "Service", ou seja, responsável pela regra de negócio

    async execute(user_id: string) {
    // Método assíncrono chamado "execute"
    // Recebe como parâmetro o ID do usuário (user_id)
    // O async permite usar await dentro da função

        try {
        // Início do bloco de tentativa (try)
        // Aqui tentamos executar a busca no banco de dados

            const user = await prismaClient.user.findFirst({
            // Usa o Prisma para buscar um usuário na tabela "user"
            // findFirst retorna o primeiro registro que bater com a condição

                where: {
                    id: user_id
                },
                // Define o filtro da busca
                // Aqui estamos procurando um usuário com o ID recebido

                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                }
                // Define quais campos queremos retornar do banco
                // Isso evita trazer dados desnecessários (boa prática)
            })

            if (!user) {
            // Verifica se nenhum usuário foi encontrado

                throw new Error("Usuário não encontrado")
                // Lança um erro caso não encontre o usuário
                // Esse erro pode ser tratado no controller ou middleware global
            }

            return user;
            // Retorna o usuário encontrado

        } catch (erro) {
        // Caso aconteça qualquer erro dentro do try

            console.log(erro);
            // Mostra o erro no console (útil para debug)

            throw new Error("Usuário não encontrado")
            // Lança um erro genérico
            // OBS: aqui você perde o erro original (não é ideal em produção)
        }

    }
}

export { DetailUserService }
// Exporta a classe para poder ser usada em outros arquivos (ex: controller)