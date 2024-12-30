Esta es una app de manejo de tareas creada con Nextjs y TailwindCSS

## Correr local

Para correr en entorno local, primero es necesario instalar las dependencias:

```bash
npm install
```

Luego, es necesario setear las variables de entorno. Para ello, crear un archivo .env con las variables. Las variables necesarias se pueden conseguir en el archivo .env.example

Una vez esto, ya se puede correr el proyecto localmente. Para ello, correr:

```bash
npm run dev
```

Finalmente abrir [http://localhost:3000](http://localhost:3000) en su navegador para ver la app.

## Tests

Para correr los tests, basta con ejecutar:

```bash
npm run test
```

## App desplegada

Si se quiere probar la app desplegada, se puede visitar [https://tasks-fe-mu.vercel.app/](https://tasks-fe-mu.vercel.app/). Si no está disponible, probar estas otras opciones:

[https://tasks-fe-git-master-samerelmazs-projects.vercel.app/](https://tasks-fe-git-master-samerelmazs-projects.vercel.app/)
[https://tasks-fxbtc5s2w-samerelmazs-projects.vercel.app/](https://tasks-fxbtc5s2w-samerelmazs-projects.vercel.app/)

NOTA: Ya que la API está desplegada en la versión gratis de Render, la API puede experimentar delays en la primera carga luego de tiempo de inactividad. Si la app tarda en responder al inicio, esperar hasta que responda, puede tardar hasta 1 minuto. Luego de eso las respuestas deben ser más rapidas.
