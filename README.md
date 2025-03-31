# Sistema de Gestão de Pedidos e Aprovação Multi-Empresa

Este projeto é um sistema web completo para gestão de pedidos e aprovações entre múltiplas empresas. Ele permite que empresas cadastradas possam submeter diferentes tipos de pedidos que passam por um fluxo de aprovação administrativo.

## Visão Geral

O sistema consiste em duas partes principais:

- **Frontend**: Interface de usuário para interação com o sistema
- **Backend**: API RESTful para processamento de dados e regras de negócio

## Funcionalidades

### Gestão de Usuários

- Registro de empresas com dados essenciais (Nome, NIF, email, senha)
- Autenticação segura via JWT
- Perfis de usuário com diferentes níveis de acesso

### Gestão de Pedidos

- Submissão de pedidos com campos detalhados
- Suporte a diversos tipos de pedidos:
  - Aquisição de Materiais
  - Solicitação de Serviços
  - Pedido de Reembolso
  - Pedido de Formação
- Fluxo de aprovação com estados definidos (pendente, aprovado, rejeitado)
- Visualização e gestão dos pedidos por empresa

## Tecnologias Utilizadas

### Frontend
- HTML 5
- CSS 3
-  JavaScript
- Axios para comunicação com a API

### Backend

-  JavaScript
- Express.js para criação da API
- Sequelize como ORM para banco de dados
- JWT para autenticação e autorização
- MySql

## Estrutura da API

**Base URL:** `http://localhost:3000/api`

### Endpoints de Pedidos
POST /order - Cria um novo pedido
PUT /order/id - Atualiza um pedido existente
GET /order/order-company - Lista pedidos de uma empresa
GET /order/orders - Lista todos os pedidos

### Endpoints de Usuários
POST /user/register - Registra uma nova empresa
POST /user/login - Autentica um usuário
GET /user/get - Obtém dados do usuário
PUT /user/update - Atualiza dados do usuário