# 🎬 Calculadora Hollywood Mogul 4

Aplicación web para realizar cálculos del juego Hollywood Mogul 4. Cuenta con un **frontend** en React + Vite y un **backend** en NestJS, con base de datos PostgreSQL.

---

## 📋 Tabla de Contenidos

- [Requisitos Previos](#-requisitos-previos)
- [Instalación Rápida con Docker (Recomendado)](#-instalación-rápida-con-docker-recomendado)
- [Instalación Manual (Desarrollo)](#-instalación-manual-desarrollo)
- [Variables de Entorno](#-variables-de-entorno)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Comandos Útiles](#-comandos-útiles)
- [Acceso a la Aplicación](#-acceso-a-la-aplicación)
- [Solución de Problemas](#-solución-de-problemas)

---

## 🔧 Requisitos Previos

### Para instalación con Docker
| Herramienta     | Versión mínima | Enlace de descarga                            |
|-----------------|----------------|-----------------------------------------------|
| Docker          | 20.x           | [docker.com](https://www.docker.com/get-started/) |
| Docker Compose  | 2.x            | Incluido con Docker Desktop                   |

### Para instalación manual
| Herramienta     | Versión mínima | Enlace de descarga                            |
|-----------------|----------------|-----------------------------------------------|
| Node.js         | 20.x           | [nodejs.org](https://nodejs.org/)             |
| npm             | 9.x            | Incluido con Node.js                          |
| PostgreSQL      | 16.x           | [postgresql.org](https://www.postgresql.org/download/) |

---

## 🐳 Instalación Rápida con Docker (Recomendado)

Esta es la forma más sencilla de levantar todo el proyecto. Un solo comando inicia la base de datos, el backend, el frontend y pgAdmin.

### 1. Clonar el repositorio

```bash
git clone https://github.com/JimRoMa123/Hollywood-Mogul-4-calculator.git
cd calculadoraSofi
```

### 2. Configurar variables de entorno

Copia los archivos de ejemplo (incluido el de la raíz para Docker) según tu sistema operativo y terminal:

**En Linux/macOS o Windows (PowerShell):**
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**En Windows (CMD / Símbolo del sistema):**
```cmd
copy .env.example .env
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

> 💡 Los valores por defecto ya están configurados para funcionar con Docker Compose sin cambios.

### 3. Levantar todos los servicios

```bash
docker compose up --build
```

> 💡 **Tip:** Agrega `-d` al final para ejecutar en segundo plano:
> ```bash
> docker compose up --build -d
> ```

### 4. ¡Listo!

Una vez que todos los contenedores estén corriendo, la aplicación estará disponible en:

| Servicio     | URL                          |
|--------------|------------------------------|
| 🖥️ Frontend  | http://localhost:5173        |
| ⚙️ Backend   | http://localhost:3001        |
| 🗄️ pgAdmin   | http://localhost:5050        |
| 🐘 PostgreSQL| localhost:3000 (puerto mapeado) |

### 5. Detener los servicios

```bash
docker compose down
```

> Para eliminar también los volúmenes de datos (⚠️ borra la base de datos):
> ```bash
> docker compose down -v
> ```

---

## 🛠️ Instalación Manual (Desarrollo)

Usa esta opción si deseas trabajar en el código con recarga en caliente (hot-reload).

### 1. Clonar el repositorio

```bash
git clone https://github.com/JimRoMa123/Hollywood-Mogul-4-calculator.git
cd calculadoraSofi
```

### 2. Configurar la base de datos PostgreSQL

Asegúrate de tener PostgreSQL corriendo. Puedes usar Docker solo para la base de datos:

```bash
docker compose up postgres -d
```

O si tienes PostgreSQL instalado localmente, crea la base de datos:

```sql
CREATE USER sofi WITH PASSWORD 'hollywood2024';
CREATE DATABASE hm4_calculator OWNER sofi;
```

### 3. Configurar variables de entorno

Copia los archivos `.env.example` y ajusta los valores según tu entorno:

**En Linux/macOS o Windows (PowerShell):**
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**En Windows (CMD / Símbolo del sistema):**
```cmd
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

Edita `backend/.env` para que coincida con tu configuración de PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=3000
DB_USERNAME=sofi
DB_PASSWORD=hollywood2024
DB_DATABASE=hm4_calculator
PORT=3001
```

### 4. Instalar dependencias del Backend

```bash
cd backend
npm install
```

> ⚠️ **Nota:** Si usas PostgreSQL local (no Docker), el puerto por defecto es `5432` en lugar de `3000`.

### 5. Iniciar el Backend


```bash
# Modo desarrollo (con hot-reload)
npm run start:dev
```

El backend estará disponible en `http://localhost:3001`.

### 6. Instalar dependencias del Frontend


Abre una **nueva terminal** y ejecuta:

```bash
cd frontend
npm install
```

### 7. Iniciar el Frontend


```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`.

---

## 🔑 Variables de Entorno

El proyecto incluye archivos `.env.example` en la raíz y en cada módulo. Copia estos archivos como `.env` y ajusta los valores según tu entorno.

### Raíz (`.env` - Usado por Docker Compose)

| Variable           | Descripción                                  | Valor por defecto  |
|--------------------|----------------------------------------------|--------------------|
| `DB_USERNAME`      | Usuario de PostgreSQL                        | `sofi`             |
| `DB_PASSWORD`      | Contraseña de PostgreSQL                     | `hollywood2024`    |
| `DB_DATABASE`      | Base de datos de PostgreSQL                  | `hm4_calculator`   |
| `PGADMIN_EMAIL`    | Email de acceso a pgAdmin                    | `admin@hm4.com`    |
| `PGADMIN_PASSWORD` | Contraseña de acceso a pgAdmin               | `admin`            |

### Backend (`backend/.env` - Usado para desarrollo manual)

| Variable      | Descripción                        | Valor por defecto  |
|---------------|------------------------------------|--------------------|
| `DB_HOST`     | Host de la base de datos           | `localhost`        |
| `DB_PORT`     | Puerto de PostgreSQL               | `3000`             |
| `DB_USERNAME` | Usuario de la base de datos        | `sofi`             |
| `DB_PASSWORD` | Contraseña de la base de datos     | `hollywood2024`    |
| `DB_DATABASE` | Nombre de la base de datos         | `hm4_calculator`   |
| `PORT`        | Puerto del servidor backend        | `3001`             |

### Frontend (`frontend/.env`)

| Variable              | Descripción                 | Valor por defecto              |
|-----------------------|-----------------------------|--------------------------------|
| `VITE_API_BASE_URL`   | URL base de la API backend  | `http://localhost:3001/api`    |

### pgAdmin (solo con Docker)

| Variable                   | Valor              |
|----------------------------|--------------------|
| Email de acceso            | `admin@hm4.com`    |
| Contraseña de acceso       | `admin`            |

---

## 📁 Estructura del Proyecto

```
calculadoraSofi/
├── docker-compose.yml        # Orquestación de todos los servicios
├── .env.example              # Variables de entorno raíz para Docker
├── backend/                  # API REST con NestJS
│   ├── src/
│   │   ├── calculator/       # Módulo de cálculos
│   │   ├── engine/           # Motor de cálculos
│   │   ├── history/          # Historial de cálculos
│   │   ├── app.module.ts     # Módulo principal
│   │   └── main.ts           # Punto de entrada
│   ├── .env.example          # Variables de entorno (plantilla)
│   ├── Dockerfile
│   └── package.json
├── frontend/                 # UI con React + Vite
│   ├── src/
│   │   ├── api/              # Llamadas al backend
│   │   ├── components/       # Componentes React
│   │   ├── types/            # Tipos TypeScript
│   │   ├── App.tsx           # Componente principal
│   │   └── main.tsx          # Punto de entrada
│   ├── .env.example          # Variables de entorno (plantilla)
│   ├── Dockerfile
│   └── package.json
└── README.md
```

---

## 📌 Comandos Útiles

### Docker

| Comando                              | Descripción                              |
|--------------------------------------|------------------------------------------|
| `docker compose up --build`          | Construir e iniciar todos los servicios  |
| `docker compose up --build -d`       | Iniciar en segundo plano                 |
| `docker compose down`                | Detener todos los servicios              |
| `docker compose down -v`             | Detener y borrar volúmenes               |
| `docker compose logs -f backend`     | Ver logs del backend en tiempo real      |
| `docker compose logs -f frontend`    | Ver logs del frontend en tiempo real     |
| `docker compose ps`                  | Ver estado de los contenedores           |
| `docker compose restart backend`     | Reiniciar solo el backend                |

### Backend

| Comando               | Descripción                              |
|-----------------------|------------------------------------------|
| `npm run start:dev`   | Iniciar en modo desarrollo (hot-reload)  |
| `npm run build`       | Compilar para producción                 |
| `npm run start:prod`  | Iniciar en modo producción               |
| `npm run test`        | Ejecutar tests unitarios                 |
| `npm run test:e2e`    | Ejecutar tests end-to-end                |
| `npm run lint`        | Verificar estilo de código               |

### Frontend

| Comando              | Descripción                              |
|----------------------|------------------------------------------|
| `npm run dev`        | Iniciar servidor de desarrollo           |
| `npm run build`      | Compilar para producción                 |
| `npm run preview`    | Previsualizar build de producción        |
| `npm run lint`       | Verificar estilo de código               |

---

## 🌐 Acceso a la Aplicación

| Servicio            | URL                        | Descripción                         |
|---------------------|----------------------------|-------------------------------------|
| Frontend            | http://localhost:5173       | Interfaz de usuario                 |
| Backend API         | http://localhost:3001       | API REST                            |
| pgAdmin             | http://localhost:5050       | Administración de base de datos     |

### Conectar pgAdmin a la base de datos

1. Accede a pgAdmin en `http://localhost:5050`
2. Inicia sesión con `admin@hm4.com` / `admin`
3. Haz clic en **Add New Server**
4. En la pestaña **General**: escribe un nombre (ej: `HM4`)
5. En la pestaña **Connection**:
   - Host: `postgres` (nombre del servicio en Docker)
   - Port: `5432`
   - Username: `sofi`
   - Password: `hollywood2024`
6. Haz clic en **Save**

---

## ❓ Solución de Problemas

### El puerto ya está en uso

Si ves un error de puerto en uso, verifica qué proceso lo está usando:

```bash
# Windows
netstat -ano | findstr :3001

# Linux/Mac
lsof -i :3001
```

### Error de conexión a la base de datos

1. Verifica que PostgreSQL esté corriendo
2. Confirma que los valores en `backend/.env` coincidan con tu configuración
3. Si usas Docker, espera unos segundos a que el healthcheck de PostgreSQL pase

### Los contenedores no inician

```bash
# Ver logs de un servicio específico
docker compose logs postgres
docker compose logs backend

# Reconstruir desde cero
docker compose down -v
docker compose up --build
```

### El frontend no se conecta al backend

Verifica que el backend esté corriendo en el puerto `3001` y que no haya problemas de CORS.

---

## 🧰 Tecnologías Utilizadas

| Capa       | Tecnología                              |
|------------|------------------------------------------|
| Frontend   | React 19, TypeScript, Vite, Recharts, Axios |
| Backend    | NestJS, TypeORM, class-validator         |
| Base de datos | PostgreSQL 16                         |
| DevOps     | Docker, Docker Compose                   |

---

<p align="center">Hecho con ❤️ para Hollywood Mogul 4</p>
