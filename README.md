# Escola Fill Tec API

Projeto de uma aplicação que simula tarefas simples de um sistema escolar para gerenciamento de usuários, matérias e perguntas com alternativas e respostas.

# Tecnologias Utilizadas

* Node.js (v24.13.0)
* NestJS (v11.0.16)
* Docker
* PostgreSQL

# Funcionalidades

* Cadastro, consulta, alteração e exclusão de usuários
* Cadastro, consulta, alteração e exclusão de perguntas e respostas
* Autenticação de usuários via email e senha, com geração de Token para acesso de recursos protegidos.

# Arquitetura

A aplicação segue a arquitetura baseada em módulos do NestJS, implementando os princípios REST:

# Executando o Projeto com Docker

Pré-requisitos

* Node.js instalado (v24.13.0 ou superior)
* NestJS instalado (v11.0.16 ou superior)
* Docker instalado
* Docker Compose instalado
* IDE compatível com Node.js e NestJS (recomendo o Visual Studio Code)

Execução

1. Clonar o repositório
```
git clone https://github.com/ThiagoGaelzer/escola-fill-tec.git
cd escola-fill-tec
```

2. Subir os containers
```
docker-compose up --build
```

3. Acessar aplicação em:
```
http://localhost:3000
```

# Banco de Dados

SGBD: PostgreSQL
Executado local (execução via container Docker é opcional)

Para fins de teste, a base de dados usada no desenvolvimento do aplicativo está disponível em:
https://drive.google.com/file/d/1T0LFGenBS4DgQbk9xwoM71Wd9KxC8H5F/view?usp=sharing

## Como importar no PostgreSQL:

* Crie o banco de dados de destino: clique com o botão direito em "Databases" > Create > Database... e dê um nome a ele.
* Clique com o botão direito sobre o banco de dados recém-criado e selecione "Restore...".
* Configurações na aba Geral (General):
  * Format: Selecione o formato Custom ou Tar.
  * Filename: Clique no ícone de três pontos (...) para localizar e selecionar o arquivo de backup.
* Executar: Clique no botão Restore. O progresso aparecerá no canto inferior direito da tela

# Testando a API

As requisições utilizadas durante o desenvolvimento estão disponíveis em:
https://drive.google.com/file/d/1sfCcbYCXmRPExFhY8bRciAAJzFqk8KPK/view?usp=sharing

## Como importar no Insomnia

* Abrir Insomnia
* Clicar em Import
* Selecionar o arquivo
* Executar as requisições

# Autor

Thiago Pereira Gaelzer
