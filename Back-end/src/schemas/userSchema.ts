import { z } from "zod";

//Cria um schema de validação para login de usuário
export const authSchema = z.object({
    body: z.object({
        //DEfine que deve ser uma string no formato de emaio válido
       email: z.email({message: "Precisa ser um email válido!"}),
       password: z.string({message: "Senha obrigatória!"}).min(1, {message: "Senha é Obrigatória!"})
})
})