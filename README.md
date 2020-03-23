# Desafio Bridge - Christian Aurich Zanettini Martins

## Descrição
Essa aplicação possui uma tela básica onde pode ser inserido um número natural (inteiro e positivo) e utilizar um botão para verificar se ele é primo, e quais são seus divisores.

## Tecnologias

A linguagem Javascript foi escolhida para o desenvolvimento tanto do Front-end quanto do Back-end.

O controle do padrão do código Javascript foi feito com auxílio do [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb).

O processo de desenvolvimento foi realizado com auxílio de algumas tecnologias gerenciadas pelo [yarn](https://yarnpkg.com/).

No **Back-end** foi utilizado o [Node.js®](https://nodejs.org/pt-br/) para rodar o Javascript no lado do servidor e o framework [Express](https://expressjs.com/pt-br/) para implementá-lo.

Já no **Front-end**, foi utilizada a biblioteca [React](https://pt-br.reactjs.org/) para a implementação da interface com o usuário, com apoio do design system open source [Bold](https://bold.bridge.ufsc.br/), que criado pelo Laboratório Bridge, oferece componentes padronizados.

Na estilização, o [node-sass](https://www.npmjs.com/package/node-sass) permitiu o uso de arquivos .scss. Dessa maneira é possível usar classes css nos elementos sem realizar importações em cada componente React.

## Instalação

**1.** Primeiramente, é necessário possuir instalados na máquina o [Node.js®](https://nodejs.org/pt-br/) e o gerenciador de pacotes [yarn](https://yarnpkg.com/).

**2.** A aplicação deve ser baixada neste repositório em um arquivo *.zip* ou através de um `git clone https://github.com/christianaurichzm/desafio-bridge.git`.

**3.** Com o repositório baixado, acesse a pasta *desafio-bridge-christian-aurich* e execute o comando `yarn install`. Dessa maneira todas as dependências do sistema serão baixadas.

**4.** A inicialização da interface da aplicação pode ser feita através de `yarn start` na mesma pasta.

Ela poderá ser acessada em [http://localhost:3000](http://localhost:3000).

E para utilizá-la em produção `yarn build`.

**5.** Após isso, através de outra instância de terminal, acesse a pasta *src* e execute `node server.js`. Isso iniciará o servidor que rodará na porta *5000*.

**6.** A aplicação já pode ser utilizada com a interface consumindo os serviços do servidor.
