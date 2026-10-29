# Microservicio Novedades

Servicio independiente de la PlayStation Store que expone los **lanzamientos recientes**
(la sección "Novedades" del menú). Usa Node + Express y datos en memoria, igual que
`catalogo` y `biblioteca`.

> **Suposición documentada:** en el frontend "Novedades" es solo un enlace del menú
> (`gateway/public/index.html`), sin lógica asociada. En el contexto de una tienda de juegos
> se interpreta como la lista de juegos recién lanzados. No se implementaron noticias,
> notificaciones ni operaciones de escritura porque el código existente no las define.

## Endpoints

| Método | Ruta             | Descripción                                      |
|--------|------------------|--------------------------------------------------|
| GET    | `/novedades`     | Devuelve todas las novedades.                    |
| GET    | `/novedades/:id` | Devuelve una novedad por id o `404` si no existe.|

Campos de una novedad: `id`, `titulo`, `genero`, `precio`, `fechaLanzamiento`.

Ejemplo:

```bash
curl http://localhost:4003/novedades
curl http://localhost:4003/novedades/1
```

## Ejecución local

```bash
cd novedades
npm install
npm start          # http://localhost:4003
npm test           # pruebas con node:test
```

## Docker (aislado)

```bash
docker compose -f novedades/compose.yml up --build
```

## Configuración

| Variable | Valor por defecto | Uso                          |
|----------|-------------------|------------------------------|
| `PORT`   | `4003`            | Puerto HTTP del servicio.    |

No se conecta al gateway ni a otros microservicios: la integración queda para una tarea posterior.
