# Desafio Front-end Fluig - Relembrando o enunciado

Deveria-se desenvolver um aplicativo de Lista de tarefas.

Nesse aplicativo devia ser possível criar listas, e dentro delas adicionar tarefas. Deveria ser possível editar, remover e alterar o status da tarefa (possa concluir uma tarefa, por exemplo).

## Requisitos

- [x] Utilizar [JSON Server](https://github.com/typicode/json-server) como um fake REST API.
- [x] Utilizar a última versão do framework Angular
- [x] Utilizar o Bootstrap, versão 3 ou 4, como folha de estilo base

## Como rodar o projeto?

- Clone o projeto disponível em [Github](https://github.com/mateus-bombassaro/taskmanager-app-angular).
- Instale globalmente o [JSON Server](https://github.com/typicode/json-server).
- Acesse a pasta em que clonou o projeto em seu computador.
- Acesse a pasta task-manager-app dentro desse projeto.
- Rode o fake REST API disponibilizado com este comando `json-server --delay 500 db.json`.
- Rode o comando `ng serve --open` em uma segunda aba do terminal.
- A aplicação de gerenciamento de tarefas estará disponível na porta `http://localhost:4200`


## Diferenciais

- [ ] Teste unitário / E2E - Por conta do tempo de desenvolvimento esse diferencial não foi realizado.
- [x] Preocupações com a usabilidade - uso a responsividade do bootstrap para garantir ajuste de layout em telas de diferentes tamanhos.
- [x] Validações nos campos - Os títulos das tarefas e listas devem possuir entre 3 e 50 caracteres e são obrigatórios nos formulários. 
- [x] Organização do código - A organização está explicada na próxima sessão.


## Organização do código
A organização macro do projeto foi feito dividindo-o em quatro pastas principais, sendo elas:
  - Components: Possui os componentes criados com foco na experiência visual do usuário. O primeiro é uma navbar exibida no topo de todas as telas da
  aplicação e que permite ao usuário voltar ao início a qualquer momento. O segundo componente trata-se de um loader que é exibido enquanto são disparadas
  chamadas à API e a aplicação espera seu retorno, para que o usuário tenha noção de que existe algum processamento sendo feito.

  - Models: Essa pasta descreve os modelos de dados das duas principais entidades do sistema sendo elas as Listas de Tarefas e as Tarefas.

  - Modules: Nessa pasta foram criados os componentes de negócio que refletem e interagem diretamente com as entidades da aplicação, sendo três. A primeira uma listagem
  com todas as listas de tarefas criadas pelo usuário, onde é permitido acessar a edição de uma lista, criar uma nova, deletar uma existente ou visualizar as tarefas de uma lista
  específica. O segundo componente trata-se de uma lista de tarefas de uma lista específica, onde é possível deletar uma tarefa, acessar sua edição, adicionar uma nova tarefa a 
  essa determinada lista ou alterar seu status para concluído. A terceira e última entidade trata-se de um formulário de cadastro ou edição que é compartilhado entre as duas entidades
  pelo fato de ambas terem apenas um campo homônimo que é possível editar, seu título.

  - Services: Nesta pasta estão contidos todos os métodos que fazem comunicação direta com a API disponibilizada para o desafio e tratamento de erro em caso de falha nas requisições. 
