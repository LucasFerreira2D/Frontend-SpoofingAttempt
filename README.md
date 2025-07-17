# Frontend – Sistema de Visualização de Tentativas de Spoofing Facial

Este repositório contém o Frontend desenvolvido em Angular, responsável pela visualização, filtragem e exportação das tentativas de spoofing facial registradas pelo Backend.

Além disso, esta aplicação funciona em conjunto com o aplicativo Android desenvolvido em Jetpack Compose, que realiza o treinamento e a detecção de Live/Spoofing.

---

📋 **Sumário**

* [Funcionalidades](#-funcionalidades)
* [Desenvolvimento do App Android](#-desenvolvimento-do-app-android)
* [Tecnologias](#-tecnologias)
* [Pré-requisitos](#-pré-requisitos)
* [Instalação](#️-instalação)

---

🚀 **Funcionalidades**

* Interface responsiva com tema escuro.
* Visualização detalhada da imagem da tentativa com expansão ao clicar.
* Visualização do local da tentativa através de integração com Google Maps.
* Integração bidirecional com o aplicativo Android (Jetpack Compose) para sincronia de tentativas e resultados de detecção Spoofing.

<img width="1880" height="907" alt="Dashboard Tema Escuro" src="https://github.com/user-attachments/assets/99627b94-d282-480d-9e51-a9ba842a27ea" />
<img width="1887" height="806" alt="Expansão de Imagem" src="https://github.com/user-attachments/assets/b09473df-368e-408f-a5f7-b8c8f29cc9bd" />

---

🎯 **Desenvolvimento do App Android**

O aplicativo móvel, desenvolvido em **Jetpack Compose** e Kotlin, foi projetado para capturar e processar tentativas de spoofing em tempo real, oferecendo as seguintes características:

1. **CameraX + ML Kit**

   * Captura de frames com CameraX.
   * Detecção facial e extração de landmarks via ML Kit.

2. **Pipeline de Inferência**

   * Modelo de CNN treinado em Python/Colab (TensorFlow 2.x) para detecção Live vs. Spoofing.
   * Exportação do modelo para TFLite, integrado ao app via Interpreter.
   * Pré-processamento (redimensionamento, normalização) em tempo real.

3. **Fluxo de Detecção**

   * Tela de Scanner: exibe retângulo de detecção.
   * Feedback visual (verde/vermelho) indicando **Live** ou **Spoofing**.

4. **Sincronização com Backend**

   * Envio assíncrono via Retrofit (REST) dos resultados para o servidor.
   * Gerenciamento de filas off‑line: cache local com Room e WorkManager para reenvio.

5. **Arquitetura e Boas Práticas**

   * **MVVM** com ViewModels e StateFlow.
   * **Hilt** para injeção de dependências.
   * **Coroutines** para operações assíncronas.
   * **Navigation Compose** para fluxo entre telas.

6. **Design e UI**

   * Tema escuro.
   * Componentes customizados: Botões, Cards e Loaders.
   * Suporte a múltiplas densidades de tela.

![Real-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/c54eeac2-4937-4aee-9d93-8489181c1ef1)
![Fraude-ezgif com-video-to-gif-converter (1)](https://github.com/user-attachments/assets/c284f1b1-443f-457c-8542-1f9b4cf13bfe)



---

🛠 **Tecnologias**

* Angular 17

* Angular Material

* TypeScript

* RxJS

* XLSX (SheetJS)

* SCSS

* Node.js & npm

* Jetpack Compose

* Kotlin 1.9+

* CameraX & ML Kit

* TensorFlow Lite

* Retrofit + OkHttp

* Room + WorkManager

* Hilt + Coroutines

---

📦 **Pré-requisitos**

* [Node.js](https://nodejs.org/) (versão 16 ou superior)
* npm (instalado automaticamente com Node.js)
* Android Studio Arctic Fox ou superior
* SDK Android 31+

---

⚙️ **Instalação (Frontend)**

Clone este repositório:

```bash
git clone https://github.com/seu-usuario/frontend-spoofing.git
cd frontend-spoofing
npm install
```

⚙️ **Instalação (App Android)**

Disponível em breve.
