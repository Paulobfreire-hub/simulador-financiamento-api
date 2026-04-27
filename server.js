const express = require('express');
const app = express();

app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
    res.send("API de financiamento rodando 🚀");
});

// Rota de simulação
app.post('/simular', (req, res) => {
    const { valor, entrada, juros, parcelas } = req.body;

    if (!valor || !juros || !parcelas) {
        return res.status(400).json({ erro: "Dados inválidos" });
    }

    const financiado = valor - (entrada || 0);
    const taxa = juros / 100;

    const parcela = (financiado * taxa) / (1 - Math.pow(1 + taxa, -parcelas));
    const total = parcela * parcelas;

    res.json({
        parcela: Number(parcela.toFixed(2)),
        total: Number(total.toFixed(2)),
        juros_pago: Number((total - financiado).toFixed(2))
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
