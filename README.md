# Hora do duelo

Para iniciar nosso repositório pro challenge: `git init`

Para iniciar nosso projeto: `yarn init -y`

Crie o arquivo *.gitignore* e adicione a pasta *node_modules* para evitar uma catástrofe universal.

**E QUE COMECE O DESAFIO!**

---

# Qual o desafio?

Essa será uma aplicação para armazenar repositórios do seu portfólio, que irá permitir a criação, listagem, atualização e remoção dos repositórios, e além disso permitir que os repositórios possam receber "likes".

Para isso, vamos utilizar o template criado pela Rocketseat, com a camada de testes e rotas já feitas (além das bibliotecas já importadas). Como? Basta executar um `git  clone` passando a URL do repositório do template.

Após clonar o repositório e realizar um merge com o seu projeto, execute um `yarn install` para instalar todas as dependências do template.

# E agora?

O primeiro passo é entender o código. Seguindo o conceito de TDD, já temos um bom norte (uma vez que todos os testes já estão feitos). Além disto, a descrição do desafio deixa bem claro o que deve ser feito também. Unindo o útil ao agradável, vamos ao básico:

### [GET] /repositories

O clássico, vamos retornar um JSON com toda a nossa coleção *repositories*.

### [POST] /repositories

Seguindo o padrão RESTful, vamos inserir um novo repositório à nossa coleção. Devemos buscar no *body* do *request* os parâmetros title, url e techs e montar um objeto (nosso novo repositório) inserindo o atributo id (através da biblioteca *uuid*) e adicionar o atributo likes, iniciando em zero. No fim, devemos retornar o repositório inserido.

### [PUT] /repositories/:id

O verbo PUT representa uma atualização na nossa coleção. Assim como no *POST*, Devemos buscar no *body* do *request* os parâmetros title, url e techs. Além disto, vamos buscar o atributo id no parâmetro *params* do *request*. Se o ID for um UUID válido e existir na nossa coleção, vamos atualizar o respectivo e retornar o repositório atualizado. Caso contrário, vamos retornar um erro 400.

### [DELETE] /repositories/:id

O verbo DELETE representa uma remoção na nossa coleção. Vamos buscar o atributo id no parâmetro *params* do *request*. Se o ID for um UUID válido e existir na nossa coleção, vamos remover o item do nosso repositório e retornar um 204 (sucesso sem conteúdo). Caso contrário, vamos retornar um erro 400.

### [POST] /repositories/:id/like

Aqui, a interpretação do verbo POST é um pouco mais complexa. A natureza desta rota é de aumentar o número de likes (+1) em um repositório da nossa coleção. Logo, vem a mente que estamos tratando de um update. Porém, devemos visualizar o like como uma entidade. Isto é, contextualize com o Facebook, por exemplo. Quando você dá um like em um post, o post recebe +1 like, porém é registrada a informação de que você deu o like no post. Ou seja, temos uma entidade sendo criada (e o +1 na quantidade total de likes é uma consequência desta entidade sendo criada). No exemplo do desafio, estamos trabalhando apenas com o +1 (a fim de não problematizar o desafio). Voltando, nesta rota vamos buscar o atributo id no parâmetro *params* do *request*. Se o ID for um UUID válido e existir na nossa coleção, vamos aumentar o número de likes do item do nosso repositório por +1 e retornar um 200, com o repositório cujo atualizamos o número de likes. Caso contrário, vamos retornar um erro 400.