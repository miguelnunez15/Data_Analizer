
# Data Analizer

## Descripción

Data Analizer es una aplicación desarrollada en React y Next.js que permite analizar datos de diversas fuentes. Utiliza Tailwind CSS para el diseño y ESLint para el análisis de código.

## Características

- **Análisis de datos**: Herramientas para cargar y visualizar datos.
- **Interfaz amigable**: Diseño moderno y responsivo con Tailwind CSS.
- **Configuración personalizable**: Variables de entorno y configuración detallada.

## Instalación

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Pasos para la instalación

#### Clona el repositorio:

    git clone <URL_DEL_REPOSITORIO>
    cd Data_Analizer

#### Instala las dependencias:

    npm install

#### Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto y añade las variables necesarias. Puedes usar .env.example como plantilla.

## Uso
Para iniciar la aplicación en modo de desarrollo:

    npm run dev
    
o con yarn:

    yarn dev

La aplicación estará disponible en http://localhost:3000.

## Scripts disponibles
- dev: Inicia la aplicación en modo desarrollo.
- build: Compila la aplicación para producción.
- start: Inicia la aplicación en modo producción.
- lint: Ejecuta ESLint para analizar el código.

## Estructura del proyecto

    ├── public             # Archivos estáticos
    ├── src                # Código fuente
    │   ├── components     # Componentes React
    │   ├── pages          # Páginas Next.js
    │   ├── styles         # Estilos CSS
    │   └── utils          # Utilidades y funciones auxiliares
    ├── .env               # Variables de entorno
    ├── package.json       # Dependencias y scripts
    ├── tailwind.config.ts # Configuración de Tailwind CSS
    └── tsconfig.json      # Configuración de TypeScript

# Contribuir
Las contribuciones son bienvenidas. Por favor, sigue los pasos a continuación para contribuir:

- Haz un fork del repositorio.
- Crea una nueva rama (git checkout -b feature/nueva-feature).
- Realiza tus cambios y haz commit (git commit -am 'Añadir nueva feature').
- Sube tu rama (git push origin feature/nueva-feature).
- Abre un Pull Request.

# Contacto
Para cualquier duda o consulta, puedes contactarme a través de miguelnr152@gmail.com.

