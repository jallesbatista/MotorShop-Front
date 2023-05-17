<h1 align="center">
   Motors Shop Front-end
</h1>

<h4 align="justify">Um e-commerce de automóveis onde podemos ser um comprador ou um anunciante.</h4>

## Tabela de conteúdos

- [Linguagens e tecnologias utilizadas](#💻-linguagens-e-tecnologias-utilizadas)
- [Funcionalidades](#🛠-funcionalidades)
- [Instalação - Rodar localmente](#⚙️-instalação---rodar-localmente)
- [Time de Desenvolvimento](#time-de-desenvolvimento)

## 💻 Linguagens e tecnologias utilizadas

<a href="https://www.typescriptlang.org" target="_blank"> <img style="width: 45px; max-width:100%; height: 40px;" alt="typescript"  src="https://skills.thijs.gg/icons?i=typescript"/> </a>
<a href="https://nextjs.org" target="_blank"> <img alt="nextJS" style="width: 50px; max-width:100%; height: 40px;" src="https://skills.thijs.gg/icons?i=next&theme=light"/> </a>
<a href="https://axios-http.com/ptbr/" target="_blank"> <img alt="axios" style="width: 40px; max-width:100%; height: 40px;" src="https://axios-http.com/assets/favicon.ico"/></a>
<a href="https://chakra-ui.com/" target="_blank"> <img src="https://chakra-ui.com/favicon.png" alt="chakra ui"  style="width: 40px; max-width:100%; height: 40px;" /></a>
<a href="https://zod.dev/" target="_blank"> <img src="https://zod.dev/logo.svg" alt="zod" style="width: 40px; max-width:100%; height: 40px;"/></a>
<a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" style="width: 40px; max-width:100%; height: 40px;"/></a>

#### URL base do deploy da aplicação: https://motorshoponline.netlify.app/

---

## 🛠 Funcionalidades

[Voltar para o topo](#tabela-de-conteúdos)

### **Página Login**.

- Login do usuário.

### **Páginas de recuperação de senha:**

- Envio por email do link de recuperação.
- Troca de senha a partir da validação do token contido no link.

### **Página Home:**

- Paginação de anúncios publicados.
- Anúncios com preço 5% abaixo da tabela Fipe terão identificador de boa compra: **$**
- Filtro de veículos por:
  - Modelo
  - Marca
  - Ano
  - Cor
  - Tipo de combustível
  - Quilometragem
  - Preço

### **Página do anunciante pública:**

- Paginação do seus anúncios.
- Identificador de anúncios publicados e não publicados.

### **Página do anunciante privada:**

- Rota com permissão de acesso somente ao anunciante dono da página.
- Paginação do seus anúncios.
- Criação e edição de anúncios com integração de busca e filtragem de marcas e modelos feita por api.

### **Página de detalhamento do anúncio:**

- Galeria de fotos.
- Identificador de anúncio inativo.
- Compra com redirecionamento para whatsapp do anunciante (somente para anúncios ativos e usuários logados).
- Descrição do anúncio.
- Listagem de comentários do anúncio.
- Criação de comentários (somente para usuários logados).
- Edição e exclusão de comentários (somente para usuários logados e nos próprios comentários).

---

## ⚙️ Instalação - Rodar Localmente

[Voltar para o topo](#tabela-de-conteúdos)

    - Repositório
    $ git clone git@github.com:E-Commerce-M6/front_end.git

    - Entre na pasta do arquivo que clonou
    $ code .

    - Dependências
    $ yarn
    ou
    $ npm i

    - Rodar aplicação
    $ yarn dev
    ou
    $ npm run dev

---

## Time de Desenvolvimento

[Voltar para o topo](#tabela-de-conteúdos)

<br>

<div style="display: flex; justify-content:space-between; width:100%; flex-wrap:wrap" >
<div align="center" style="margin-bottom:30px">
<h4 align="center">Jalles Batista</h4>
    <a href="https://github.com/jallesbatista"><img src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="25" width="25" alt="logo github" /><a> 
    <a href="https://www.linkedin.com/in/jallesbatista/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="25" height="25" alt="logo lindedin" /><a>
</div>
<div align="center">
<h4 align="center">Guilherme Felipe Castro</h4>
    <a href="https://github.com/Guilherme-GFC"><img src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="25" width="25" alt="logo github" /><a> 
    <a href="https://www.linkedin.com/in/guilherme-gfc/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="25" height="25" alt="logo lindedin" /><a>
</div>
<div align="center">
<h4 align="center">Felipe Nogueira</h4>
    <a href="https://github.com/Flipsy1"><img src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="25" width="25" alt="logo github" /><a> 
    <a href="https://www.linkedin.com/in/felipe-nogueira-vieira/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="25" height="25" alt="logo lindedin" /><a>
</div>
<div align="center">
<h4 align="center">Rafael Gomes</h4>
    <a href="https://github.com/rafaelsantos7520"><img src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="25" width="25" alt="logo github" /><a> 
    <a href="https://www.linkedin.com/in/rafaelsantos7520/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="25" height="25" alt="logo lindedin" /><a>
</div>
<div align="center">
<h4 align="center">Nicolly Alves</h4>
    <a href="https://github.com/NicollyAlves"><img src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="25" width="25" alt="logo github" /><a> 
    <a href="https://www.linkedin.com/in/nicollyalves/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="25" height="25" alt="logo lindedin" /><a>
</div>
<div align="center">
<h4 align="center">Lucas Lara</h4>
    <a href="https://github.com/lucastdelara"><img src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="25" width="25" alt="logo github" /><a> 
    <a href="https://www.linkedin.com/in/lucastlara/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="25" height="25" alt="logo lindedin" /><a>
</div>
</div>
