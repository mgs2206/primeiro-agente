require('dotenv').config();
const express = require('express'); // O novo "carteiro"
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-3-flash-preview",
    systemInstruction: "Você é um consultor sarcástico. Seja breve."
});

// Mantemos a memória global para este teste simples
const chat = model.startChat({ history: [] });

// Criamos uma "Rota". É como um endereço específico no seu site.
// Quando alguém acessar seu-site.com/chat, isso aqui acontece:
app.get('/chat', async (req, res) => {
    // 1. Pegamos a mensagem que veio na URL (ex: ?msg=Ola)
    const mensagemUsuario = req.query.msg;

    if (!mensagemUsuario) {
        return res.send("Erro: Digite uma mensagem na URL! Exemplo: /chat?msg=Ola");
    }

    try {
        // 2. O Agente pensa
        const resultado = await chat.sendMessage(mensagemUsuario);
        const resposta = resultado.response.text();
        
        // 3. O servidor responde para o navegador
        res.send(resposta);
    } catch (erro) {
        res.send("Erro na IA: " + erro.message);
    }
});

// O servidor fica ouvindo na porta 3000
app.listen(3000, () => {
    console.log("🚀 Servidor rodando! Acesse: http://localhost:3000/chat?msg=Ola");
});