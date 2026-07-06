# Kairos Personalizados

**Kairos Personalizados** é uma plataforma online que permite a criação e personalização de produtos como canecas, garrafas, copos e outros itens, utilizando artes próprias do usuário. O objetivo é oferecer uma experiência simples, intuitiva e criativa para transformar ideias em produtos reais.

---

## Sobre o projeto

O Kairos Personalizados foi desenvolvido para facilitar a personalização de produtos físicos de forma digital. O usuário pode enviar sua arte, ajustar posicionamento, visualizar prévias e criar produtos únicos de forma rápida.

A ideia central é conectar criatividade com personalização real de produtos.

---

## Funcionalidades

- Upload de imagens e artes personalizadas    
- Catálogo de produtos (canecas, garrafas, copos etc.)  
- Pré-visualização do produto final  
- Sistema de pedidos  
- Cadastro e login de usuários  

---

## Tecnologias utilizadas

- Frontend: React + Vite  
- Backend: Node.js / Express  
- Banco de dados: MySQL  
- Armazenamento de imagens: Cloudinary
- Autenticação: JWT  

---

## Estrutura de Pastas
```bash
└── Kairos/
    ├── src/
    │   ├── config
    │   ├── middlewares
    │   ├── auth
    │   ├── controllers
    │   ├── migrations
    │   ├── model
    │   ├── routes
    │   ├── services
    │   └── utils
    └──app.js
```
## Padrão de Commits

Este projeto segue o padrão de Convencional Commits.

```bash
| Tipo    |Descrição                   |  
| feat    | Nova funcionalidade        |
| fix     | Correção de bugs           |
| docs    | Alterações na documentação |
| refactor| Refatoração de código      |
| perf    | Melhoria de performance    |
 ```  

---

## Instalação

```bash
git clone https://github.com/seu-usuario/kairos_personalizados.git

cd kairos_personalizados

npm install

npm run dev
