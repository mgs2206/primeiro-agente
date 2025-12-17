

const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const genAI = new GoogleGenerativeAI("AIzaSyDRE8uUZN6-hHfkl2xYP3i7lqt9aI7jEAQ"); // <--- Coloque sua chave!

const model = genAI.getGenerativeModel({ 
    model: "gemini-3-flash-preview",
    systemInstruction: "Você é um consultor sarcástico. Lembre-se do contexto da conversa."
});

// 1. A MÁGICA: Iniciamos uma sessão de chat vazia.
// O objeto 'chat' vai guardar o histórico automaticamente na memória RAM.
const chat = model.startChat({
    history: [], // Começa vazio
});

async function iniciarChat() {
    readline.question('🗣️  Você: ', async (mensagem) => {
        
        if (mensagem.toLowerCase() === "sair") {
            console.log("👋 Encerrando...");
            readline.close();
            return;
        }

        try {
            // 2. Usamos 'chat.sendMessage' em vez de usar o 'model' direto
            const resultado = await chat.sendMessage(mensagem);
            const resposta = resultado.response.text();
            
            console.log(`🤖 Consultor: ${resposta}\n`);
            
            iniciarChat(); // Continua a conversa
            
        } catch (erro) {
            console.log("Erro: " + erro.message);
            readline.close();
        }
    });
}

console.log("--- CHAT COM MEMÓRIA INICIADO ---");
iniciarChat();