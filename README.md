# 🚀📚 Project Setup Guide

This guide will walk you through setting up and running the frontend (React/pnpm) and backend (NestJS/Yarn) components of this project.

# ⚙️ Prerequisites & Environment Setup

## 🟢 1. Node.js & Corepack

Ensure you have these installed

| Tool          | Command              |
|---            |---                   |
| Node.js       | ```node --version``` |
| nvm           | ```nvm --version```  |
| npm           | ```npm --version```  |

Install corepack using npm

```bash
# Make sure to remove yarn and pnpm binaries first
npm uninstall -g yarn pnpm
npm install -g corepack
```

Enable Corepack to manage yarn and pnpm versions consistently. Corepack ensures that the correct package manager version is used based on your project's configuration.

```bash
corepack enable
```

## 💻 2. Getting Started

### 📥 Clone the Project

Clone the repository from GitHub and enter the project directory:

```bash
git clone https://github.com/NDKhoa1307/knowledge-bonsai-devfest-2025.git
cd knowledge-bonsai-devfest-2025
```

### 📦 Install Project Dependencies

Use the scripts below to handle dependency installation for each service.

#### ⚛️ A. Frontend Dependencies (React, pnpm)

```bash
#!/bin/bash
echo "Installing frontend dependencies with pnpm..."
cd ./frontend
pnpm install
cd ..
echo "Frontend dependencies installed."
```

#### 🌐 B. Backend Dependencies (NestJS, Yarn)

```bash
#!/bin/bash
echo "Installing backend dependencies with Yarn..."
cd ./backend
yarn install
cd ..
echo "Backend dependencies installed."
```

### ▶️ 3. Running the Project

#### ⚛️ Frontend (React)

To start the frontend development server:

```bash
cd ./frontend
pnpm run dev # Check your package.json for the correct start script
```

#### 🌐 Backend (NestJS)

To start the backend development server:

```bash
cd ./backend
yarn run start:dev # Check your package.json for the correct start script
```
