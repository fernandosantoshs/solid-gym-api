# App

## Requisitos Funcionais

- Deve ser possível se cadastrar;
- Deve ser possível se autenticar;
- Deve ser possível obter o perfil de usuário logado;
- Deve ser possível obter o número de checkins realizados pelo usuário logado;
- Deve ser possível obter o histórico de checkins;
- Deve ser possível o usuário buscar academias próximas;
- Deve ser possível o usuário buscar uma academias pelo nome;
- Deve ser possível o usuário realizar checkin em uma academia;
- Deve ser possível validar o checkin de um usuário;
- Deve ser possível cadastrar uma academia;

## Regras de negócio

- O usuário não deve conseguir se cadastrar com email já existente;
- O usuário não pode fazer dois checkins no mesmo dias;
- O usuário não pode fazer checkin se não estiver perto (100m) da academia;
- O Checkin só pode ser validado até 20 minutos após criado;
- O checkin só pode ser validado por administradores;
- A academia só pode ser cadastrada por administradores;

## Requisitos não funcionais

- A senha do usuário precisa estar criptografada;
- Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- Todas as listas de dados precisam estar paginadas com 20 itens por página;
- O usuário deve ser identificado por um JWT;
