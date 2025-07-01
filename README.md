
# 🔗 Encurtador de URLs — Projeto Node.js + MongoDB

Este projeto é um encurtador de URLs simples

Ele permite que o usuário insira uma URL longa e receba uma versão curta para compartilhamento, com redirecionamento automático ao acessá-la.

---

## ✨ Funcionalidades

- ✅ Encurtar URLs longas com um código único
- ✅ Redirecionar a URL curta para a original
- ✅ Exibir lista de URLs encurtadas no front-end
- ✅ Armazenamento persistente com MongoDB
- ✅ Interface HTML simples com integração JS via `fetch`
- ✅ Evita duplicações e retorna link já existente se aplicável

---

## ⚙️ Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [ShortId](https://www.npmjs.com/package/shortid)
- HTML + CSS + JavaScript (frontend simples)
- `dotenv` para variáveis de ambiente

---

## 🚀 Como rodar o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/GabrielSampaioS/Projeto.EncurtandoURL.git
cd Projeto.EncurtandoURL

# Instale as dependências
npm install

# Crie o arquivo .env e configure a URI do MongoDB
echo "MONGO_URI=mongodb://localhost:27017/EncurtandoURL" > .env

# Inicie o servidor
node index.js
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Estrutura de Pastas

```
Projeto.EncurtandoURL/
├── controllers/
│   └── UrlController.js
├── models/
│   └── Url.js
├── public/
│   ├── index.html
│   └── css/
│       └── style.css
├── routes/
│   └── urlRoutes.js
├── .env
├── index.js
└── package.json
```

---

## 📌 Endpoints da API

| Método | Rota             | Descrição                              |
|--------|------------------|----------------------------------------|
| GET    | `/`              | Página inicial                         |
| POST   | `/encurtar`      | Encurta uma URL                        |
| GET    | `/lista`         | Retorna todas as URLs encurtadas       |
| GET    | `/:codigoCurto`  | Redireciona para a URL original        |
| GET    | `/excluir`       | Deletar URL do NoSql                   |

---

## 🧠 Estratégias para gerar URLs encurtadas

A geração de códigos únicos para cada URL é uma parte crítica do projeto. Aqui estão as abordagens analisadas:

### 1. `Math.random()`

```js
const code = Math.random().toString(36).substring(2, 8);
```

- ✅ Simples
- ❌ Alta chance de colisão em alto volume
- ❌ Não garante unicidade entre os códigos

Exemplo de saida: 

```cmd
4f3sda
z8p7lt
9k1a2b
```

**⚠️ Não recomendado para produção**

---

### 2. **ID incremental (ex: contador no banco)**

```js
let counter = await getNextSequenceValue();
```

- ✅ Unicidade garantida
- ✅ Pode gerar códigos muito curtos
- ❌ Requer controle manual e concorrência
- ❌ Escalabilidade comprometida

Exemplo de saida: 
```cmd
1
2
3
```

**✔️ Útil em sistemas controlados ou internos**

---

### 3. **UUID (Universally Unique Identifier)**

```js
const { v4: uuidv4 } = require('uuid');
const code = uuidv4().substring(0, 8);
```

- ✅ Altíssima unicidade
- ❌ Códigos grandes (mesmo cortando)
- ❌ Pouco amigável para URLs curtas

UUID completo: 
```cmd
b4b52226-c84b-4e41-bba6-4f759894fd5e
```

Somente 8 primeiros caracteres:
```cmd
b4b52226
```

**✔️ Bom para sistemas que priorizam segurança e unicidade**

---

### 4. **shortid (usado no projeto)**

```js
const shortid = require('shortid');
const codigoCurto = shortid.generate();
```

- ✅ Rápido, leve, fácil de usar
- ✅ Garante unicidade com baixa chance de colisão
- ✅ Gera códigos curtos e legíveis
- ❌ [Obsoleto oficialmente](https://github.com/dylang/shortid/issues/133), mas ainda funcional

Exemplo de saida: 
```cmd
S1Z89D7kz
rk4DjkL-M
BksQ5qD0Z
```


**✔️ Ideal para projetos pequenos e MVPs**

---

## 🧪 Validações implementadas

- Checagem se a URL é string válida
- Verificação de duplicação no banco
- Código de erro HTTP apropriado em falhas
- Front-end ignora URLs duplicadas

---

## 💡 Melhorias futuras

- [ ] Validação com biblioteca como `Zod` ou `Joi`
- [ ] Personalização do código curto
- [ ] Expiração automática das URLs
- [ ] Painel administrativo com login
- [ ] Analytics simples (número de cliques por URL)
- [ ] API com autenticação via token

---

## 🛡️ Considerações de segurança

- URLs são armazenadas sem sanitização: ideal implementar proteção contra XSS
- Validação de formato de URL pode ser expandida com regex ou libs
- Recomendado implementar rate limiting para evitar abuso

---

## 🎥 Inspiração 
Este projeto foi inspirado pelo vídeo do canal **[Augusto Galego](https://www.youtube.com/@GutoGalego)**:  
🔗 [Codando um encurtador de URL na prática](https://youtu.be/gHfpFFA3zIQ)

## 🙌 Conclusão

Este projeto foi desenvolvido com o objetivo de aprender e aplicar conceitos práticos de back-end com Express e MongoDB. Ele cobre desde o roteamento até o controle de dados persistentes, e apresenta uma base sólida para expansão de funcionalidades.

---

**Desenvolvido por Gabriel Sampaio 💻**
