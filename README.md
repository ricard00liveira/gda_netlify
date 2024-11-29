# Como Instalar e Executar o Front-End do GDA

Este projeto foi criado com [Create React App](https://github.com/facebook/create-react-app).

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior recomendada)
- [npm](https://www.npmjs.com/) (vem junto com o Node.js)
- Um editor de código, como [VS Code](https://code.visualstudio.com/)

## Passo a Passo para Instalar o Projeto

1. **Clone o Repositório:**

   Abra o terminal e execute o seguinte comando para clonar o repositório do projeto:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

   Substitua `<URL_DO_REPOSITORIO>` pela URL do seu repositório.

2. **Acesse o Diretório do Projeto:**

   Navegue até o diretório clonado:

   ```bash
   cd <NOME_DO_DIRETORIO>
   ```

   Substitua `<NOME_DO_DIRETORIO>` pelo nome do diretório onde o projeto foi clonado.

3. **Instale as Dependências:**

   Execute o seguinte comando para instalar todas as dependências necessárias:

   ```bash
   npm install
   ```

4. **Configuração de Variáveis de Ambiente:**

   Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias. Por exemplo:

   ```env
   REACT_APP_API_URL=http://localhost:8000/api/
   ```

   Certifique-se de ajustar o valor conforme o ambiente de desenvolvimento ou produção.

## Como Executar o Projeto

1. **Inicie o Servidor de Desenvolvimento:**

   Execute o comando:

   ```bash
   npm start
   ```

   O aplicativo será iniciado em modo de desenvolvimento. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

2. **Compilar para Produção (Opcional):**

   Para criar uma versão otimizada para produção, use:

   ```bash
   npm run build
   ```

   O comando criará os arquivos na pasta `build`, prontos para deploy.

## Solução de Problemas

- Caso ocorra o erro relacionado a `digital envelope routines`, use o comando:

  ```bash
  node --openssl-legacy-provider ./node_modules/react-scripts/scripts/start.js
  ```

- Para corrigir vulnerabilidades, execute:

  ```bash
  npm audit fix
  ```

---

### Contato

Se tiver dúvidas ou encontrar problemas, sinta-se à vontade para abrir uma issue no repositório ou entrar em contato com o responsável pelo projeto.
