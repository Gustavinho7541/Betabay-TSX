// Define uma classe responsável pela lógica do usuário 
class CreateUserService {

    // Método assíncrono (permite usar await futuramente)
    async execute(p0: { name: any; email: any; password: any; }) {

        // Exibe uma mensagem no console para indicar que o serviço foi executado
        console.log("EXECUTANDO SERVIÇOOO");

        // Retorna uma mensagem simulando a criação de um usuário (corrigido as aspas no final)
        return "USUARIO ANDRÉ CRIADO!!";
    }
}

// Exporta a classe para que possa ser usada em outros arquivos (ex: controllers)
export { CreateUserService };
