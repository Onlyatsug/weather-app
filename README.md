---

````markdown
# 🌤️ Weather App - React

Uma aplicação simples e moderna de previsão do tempo construída com **React** e **OpenWeatherMap API**. Permite ao usuário buscar o clima atual de qualquer cidade do mundo, exibindo informações como temperatura, umidade, vento e ícones visuais baseados na condição climática.

---

## 🔍 Visão Geral

A aplicação exibe:

- Temperatura atual em graus Celsius
- Nome da cidade pesquisada
- Umidade e velocidade do vento
- Ícone representando a condição climática
- Um "badge" indicando a condição térmica (ex.: `hot`, `normal`, `ice`)

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js instalado
- Uma conta no [OpenWeatherMap](https://openweathermap.org/) para gerar uma API key gratuita

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/weather-app.git
cd weather-app
````

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto:

```env
VITE_WEATHER_API=your_openweathermap_api_key
```

4. Inicie o projeto:

```bash
npm run dev
```

---

## ⚙️ Funcionalidades Atuais

✅ Busca de cidade com input manual
✅ Chamada à OpenWeather API
✅ Exibição de temperatura, umidade e vento
✅ Ícones personalizados baseados nas condições climáticas
✅ Layout estilizado com CSS
✅ Badge de calor fixo (`hot`)

---

## 📦 Estrutura de Arquivos

```
src/
│
├── assets/              # Ícones (sol, nuvem, chuva, etc.)
├── components/
│   └── Weather.jsx      # Componente principal
├── Weather.css          # Estilo da aplicação
└── main.jsx             # Entrada do React
```

---

## 🔮 Atualizações Futuras

As seguintes melhorias estão planejadas para o projeto:

### 💡 Funcionalidades

* [ ] **Responsividade**: suporte total a dispositivos móveis (media queries)
* [ ] **Modo Escuro**: alternância entre temas claro e escuro
* [ ] **Tradução (i18n)**: suporte multilíngue (português e inglês)
* [ ] **Geolocalização**: detectar cidade do usuário automaticamente com base no IP ou GPS
* [ ] **Badges dinâmicos**:

  * `ice`: temperaturas < 10°C
  * `normal`: entre 10°C e 30°C
  * `hot`: > 30°C
* [ ] **Horário local**: exibir hora local da cidade pesquisada
* [ ] **Acessibilidade (a11y)** com foco em teclado e leitores de tela
* [ ] **Suporte a teclado**: acionar busca com tecla `Enter`
* [ ] **Tratar Erro**: exibir menssagem de cidade não disponível

---

## 🛠️ Tecnologias Usadas

* [React](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [OpenWeatherMap API](https://openweathermap.org/)
* [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e contribuir!

---

## 🤝 Contribuições

Contribuições são bem-vindas! Abra uma issue ou envie um pull request com sugestões, melhorias ou correções.

---

> Desenvolvido com ☀️ por \[Onlyatsug]

