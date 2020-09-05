# Api Teste frontend Soft Truck
Essa api foi criada apenas para complemento do teste, ele foi escrito em typescript

## Principais dependências de trerceiros

- Express
- Jest
- Nodemon
- Typescript
- Sqlite3

## Para rodar o projeto siga os comandos

### Instalar dependências `yarn` ou `npm install`

### Iniciar projeto `npm run dev`

### Rodar testes `yarn test` ou `npm test`

Caso precise rodar em um servidor ou tiver problemas com TypeScript use a versão de produção

### Rodar testes `npm run prod`

## Arquitetura do projeto

src
  controllers
    Contacts
    Filters
  database
  models
  routes
  tests

## Informações do projeto

Essa api é escrita em TypeScript mas não de melhor forma pois ela precisava sair rápido, fiz algumas confirgurações de lint no tsconfig.json só para não ficar tão ruim. </br>
As rotas estão em routes/index.ts</br>
Essa api fornece os seguintes endpoints: </br>

- Listar contatos com base no filtro `GET` `/api/contactsList/:filter`
- Listar iniciais dos contratos cadastrados para o filtro de slide `GET` `/api/filters`
- Criar contato `POST` `/api/contacts`
- Atualizar contato `POST` `/api/contacts/:id`
- Excluir contato `POST` `/api/contacts/:id`


 para criar um contato o arquivo json deve ser dessa forma, eu utilizo o <b>Insonomia</b> mas existem outros como o <b>Postman</b>:

 `
  { 
	"name": "Eduardo", 
  "email": "eduardo@gmail.com", 
	"role": "Ux Designer",
	"tel1": "000000000", 
	"tel2": ""
} 
  
name TEXT NOT NULL</br>
email TEXT NOT NULL</br>
role TEXT NOT NUL</br>
tel1 TEXT NOT NULL</br>
tel2 TEXT NULL</br>

## Não existe validação a não ser as que estão no sql, sejam bonzinhxs.