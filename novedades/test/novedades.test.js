import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import app from '../src/server.js'

let servidor
let base

before(async () => {
  servidor = app.listen(0)
  await new Promise(resolve => servidor.once('listening', resolve))
  base = `http://localhost:${servidor.address().port}`
})

after(() => new Promise(resolve => servidor.close(resolve)))

test('GET /novedades devuelve la lista de lanzamientos', async () => {
  const r = await fetch(`${base}/novedades`)
  assert.equal(r.status, 200)
  const novedades = await r.json()
  assert.ok(Array.isArray(novedades))
  assert.ok(novedades.length > 0)
  for (const n of novedades) {
    assert.equal(typeof n.id, 'number')
    assert.equal(typeof n.titulo, 'string')
    assert.equal(typeof n.genero, 'string')
    assert.equal(typeof n.precio, 'number')
    assert.equal(typeof n.fechaLanzamiento, 'string')
  }
})

test('GET /novedades/:id devuelve una novedad existente', async () => {
  const r = await fetch(`${base}/novedades/1`)
  assert.equal(r.status, 200)
  const novedad = await r.json()
  assert.equal(novedad.id, 1)
  assert.equal(novedad.titulo, 'God of War Ragnarök')
})

test('GET /novedades/:id devuelve 404 si no existe', async () => {
  const r = await fetch(`${base}/novedades/999`)
  assert.equal(r.status, 404)
  assert.deepEqual(await r.json(), { error: 'Novedad no encontrada' })
})
