import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT_DIR = resolve(import.meta.dirname, '..')

function findLocalJsonFiles(dir) {
  const results = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) results.push(...findLocalJsonFiles(full))
    else if (entry.name.endsWith('.local.json')) results.push(full)
  }
  return results
}

const dirs = process.argv[2]?.split('|') ?? []
const db = {}

for (const dir of dirs) {
  for (const file of findLocalJsonFiles(join(ROOT_DIR, dir))) {
    Object.assign(db, JSON.parse(readFileSync(file, 'utf-8')))
  }
}

writeFileSync(join(ROOT_DIR, 'db.json'), JSON.stringify(db, null, 2))
console.log('db.json generated:', Object.keys(db).join(', '))
