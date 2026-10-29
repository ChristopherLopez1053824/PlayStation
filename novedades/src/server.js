// Servicio NOVEDADES — los lanzamientos más recientes de la tienda.
// Microservicio independiente: su propia API y sus propios datos (en memoria).
// No conoce al gateway, al catálogo ni a la biblioteca; solo responde por sus novedades.
import express from 'express'
import { fileURLToPath } from 'node:url'

const app = express()
const PORT = process.env.PORT || 4003

// "Base de datos" en memoria (igual que los demás servicios del lab).
// Cada novedad es un lanzamiento reciente con los mismos campos que un juego.
const NOVEDADES = [
  { id: 1, titulo: 'God of War Ragnarök',    genero: 'Acción/Aventura', precio: 69.99, fechaLanzamiento: '2026-10-24' },
  { id: 2, titulo: "Marvel's Spider-Man 2",  genero: 'Acción',          precio: 69.99, fechaLanzamiento: '2026-10-18' },
  { id: 3, titulo: 'The Last of Us Part II', genero: 'Aventura',        precio: 39.99, fechaLanzamiento: '2026-10-10' },
  { id: 4, titulo: 'Gran Turismo 7',         genero: 'Carreras',        precio: 59.99, fechaLanzamiento: '2026-09-30' },
  { id: 5, titulo: 'Horizon Forbidden West', genero: 'RPG de acción',   precio: 49.99, fechaLanzamiento: '2026-09-22' },
  { id: 6, titulo: 'Ghost of Tsushima',      genero: 'Acción/Aventura', precio: 49.99, fechaLanzamiento: '2026-09-15' },
]

app.get('/novedades', (req, res) => {
  res.json(NOVEDADES)
})

app.get('/novedades/:id', (req, res) => {
  const novedad = NOVEDADES.find(n => n.id === Number(req.params.id))
  if (!novedad) return res.status(404).json({ error: 'Novedad no encontrada' })
  res.json(novedad)
})

export default app

// Solo escucha cuando se ejecuta directamente (no al importarlo desde las pruebas).
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => console.log(`[novedades] escuchando en :${PORT}`))
}
