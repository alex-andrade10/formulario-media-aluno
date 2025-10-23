const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h2>Calculadora de Média</h2>
    <form action="/resultado" method="post">
      Nome: <input type="text" name="nome" required><br><br>
      Nota 1: <input type="number" name="nota1" step="0.1" required><br><br>
      Nota 2: <input type="number" name="nota2" step="0.1" required><br><br>
      <button type="submit">Calcular</button>
    </form>
  `);
});

app.post('/resultado', (req, res) => {
  const nome = req.body.nome;
  const nota1 = parseFloat(req.body.nota1);
  const nota2 = parseFloat(req.body.nota2);
  const media = (nota1 + nota2) / 2;

  let situacao = '';
  if (media >= 6) situacao = 'Aprovado';
  else if (media >= 2) situacao = 'Exame Final';
  else situacao = 'Reprovado';

  res.send(`
    <h2>Resultado</h2>
    <p>Nome: ${nome}</p>
    <p>Nota 1: ${nota1}</p>
    <p>Nota 2: ${nota2}</p>
    <p>Média: ${media.toFixed(2)}</p>
    <p>Situação: <strong>${situacao}</strong></p>
    <a href="/">Voltar</a>
  `);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
