import prismaClient from '../../prisma/index.js';
// Importa a função hash do bcryptjs para criptografar a senha do usuário
import { hash } from 'bcryptjs';

// Interface que define os dados necessários para criar um usuário
interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

// Define uma classe responsável pela lógica de criação de usuário
class CreateUserService {

  // Método assíncrono (permite usar await futuramente, como acesso a banco)
  async execute({ name, email, password }: CreateUserProps) {

    // Busca no banco se já existe um usuário com o mesmo email
    const userAlreadyExist = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    // Verifica se o usuário já existe
    if (userAlreadyExist) {

      // Lança um erro para impedir a criação de usuário duplicado
      throw new Error("Usuário já existente!");

      // ⚠️ Esse console.log nunca será executado (código morto),
      // pois o throw encerra a execução imediatamente
      console.log("Erro! Usuário já existe!");
    }
    // Criptografa a senha antes de salvar no banco (boa prático de segurança)
    const passwordHash = await hash(password, 8);

    // Cria um novo usuário no banco de dados
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createAt: true,
      },
    });

    // Retorna o nome do usuário criado
    return user.name;

  }
}

// Exporta a classe para que possa ser usada em outros arquivos (ex: controllers)
export { CreateUserService };
