// const express = require("express");
// const app = express();
// const port = 3000;

// const { extractData } = require("./index");

// app.get("/data", async (req, res) => {
//   const data = await extractData();
//   res.json(data);
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const { extractData } = require("./index");

// const app = express();
// const port = 3000;

// // Conectar ao banco de dados
// mongoose.connect("mongodb://localhost:27017/meu_banco_de_dados", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Criar esquema para modelo de dados
// const respostaSchema = new mongoose.Schema({
//   data: Object,
// });

// // Criar modelo de dados
// const Resposta = mongoose.model("Resposta", respostaSchema);

// // Função para salvar a resposta no banco de dados
// const salvarResposta = (data) => {
//   const novaResposta = new Resposta({ data: data });
//   novaResposta
//     .save()
//     .then((respostaSalva) =>
//       console.log(`Resposta salva no banco de dados: ${respostaSalva}`)
//     )
//     .catch((err) => console.error(err));
// };

// // Executar a extração de dados a cada 20 segundos
// setInterval(async () => {
//   const data = await extractData();
//   salvarResposta(data);
// }, 20000);

// // Rota para obter a última resposta salva no banco de dados
// app.get("/data", async (req, res) => {
//   try {
//     const ultimaResposta = await Resposta.findOne().sort({ $natural: -1 });
//     res.json(ultimaResposta.data);
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .send("Erro ao obter a última resposta salva no banco de dados.");
//   }
// });

// // Iniciar o servidor
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const { extractData } = require("./index");
const dotenv = require("dotenv");

const app = express();
const port = 3000;

// Conectar ao banco de dados
// mongoose.connect("mongodb://localhost:27017/meu_banco_de_dados", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
//mongodb+srv://everton:MongoDb@cluster0.h5v7cj1.mongodb.net/amazona?retryWrites=true&w=majority
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Criar esquema para modelo de dados
// const respostaSchema = new mongoose.Schema({
//   data: Object,
// });

const respostaSchema = new mongoose.Schema(
  {
    data: Object,
  },
  { collection: "somaPedras" }
);

// Criar modelo de dados
const Resposta = mongoose.model("Resposta", respostaSchema);

// Definir tarefa a ser executada a cada 20 segundos
const CronJob = require("cron").CronJob;
const job = new CronJob("*/20 * * * * *", async () => {
  const data = await extractData();

  // Buscar resposta existente no banco de dados
  const resposta = await Resposta.findOne();

  if (resposta) {
    // Atualizar resposta existente com os dados extraídos
    resposta.data = data;
    await resposta.save();
    console.log(`Resposta atualizada no banco de dados: ${resposta}`);
  } else {
    // Criar uma nova resposta com os dados extraídos
    const novaResposta = new Resposta({ data: data });

    // Salvar a nova resposta no banco de dados
    await novaResposta.save();
    console.log(`Resposta salva no banco de dados: ${novaResposta}`);
  }
});

job.start();

// Rota para buscar a resposta mais recente no banco de dados
app.get("/data", async (req, res) => {
  const resposta = await Resposta.findOne();
  res.json(resposta);
});

app.get("/", async (req, res) => {
  res.send("Resposta puppeteer");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

//password: g9fhOJOscFMHZvUG
