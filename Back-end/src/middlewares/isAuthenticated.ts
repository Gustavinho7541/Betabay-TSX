import type { Request, Response, NextFunction } from 'express'
// Importa os tipos do Express:
// Request → dados da requisição
// Response → resposta que será enviada
// NextFunction → função usada para passar o controle para o próximo middleware

// @ts-ignore jsonwebtoken typings are not installed in this project
import { verify } from 'jsonwebtoken'
// Importa a função verify da biblioteca jsonwebtoken
// Ela é responsável por validar e decodificar o token JWT

interface PayLoad {
    sub: string;
}
// Define a estrutura esperada do payload do token JWT
// "sub" (subject) normalmente guarda o ID do usuário

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
// Cria um middleware chamado isAuthenticated
// Ele será usado para proteger rotas (ex: só usuários logados podem acessar)

    const authToken = req.headers.authorization
    // Pega o header "Authorization" da requisição
    // Normalmente vem assim: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

    if (!authToken) {
        // Verifica se o token foi enviado

        return res.status(401).json({
            error: "Token não fornecido"
        })
        // Retorna erro 401 (não autorizado) se não houver token
    }

    const [, token] = authToken.split(" ");
    // Divide o header em duas partes: "Bearer" e o token
    // Ignora a primeira parte e pega apenas o token
    // Exemplo: ["Bearer", "TOKEN_AQUI"]

    try {
        // Tenta validar o token

        const { sub } = verify(
            token!,
            process.env.JWT_SECRET as string
        ) as PayLoad
        // Verifica se o token é válido usando a chave secreta (JWT_SECRET)
        // Se for válido, extrai o payload
        // Aqui estamos pegando o "sub", que é o ID do usuário

        req.user_id = sub;
        // Adiciona o ID do usuário dentro do objeto req
        // Isso permite acessar o user_id em qualquer rota protegida

        return next();
        // Chama o próximo middleware ou controller
        // Isso significa: "autenticação OK, pode continuar"

    } catch (erro) {
        // Se o token for inválido, expirado ou mal formado

        return res.status(401).json({
            error: "Token inválido"
        })
        // Retorna erro 401 (não autorizado)
    }
}