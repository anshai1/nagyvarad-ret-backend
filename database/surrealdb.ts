import Surreal from 'surrealdb.js'
import * as dotenv from 'dotenv'

dotenv.config()

const {
  DB_URL,
  DB_USER,
  DB_PASS
} = process.env

const db = new Surreal(DB_URL)

export async function initDB() {
  try {
    console.log('Initializing database...')
    if (!DB_USER || !DB_PASS || !DB_URL) {
      throw new Error('DB_USERNAME or DB_PASSWORD not set')
    }
    await db
      .connect(DB_URL)
      .then(() => {
        console.log('Connected to database')
      })
      .catch((err) => {
        console.log('Error connecting to database', err)
      })

    db
      .signin({
        user: DB_USER,
        pass: DB_PASS
      })
      .then((res) => {
        console.log('Signed in to database', res)
      })
      .catch((err) => {
        console.log('Error signing in to database', err)
      })

    await db.use('test', 'test')
    return true
  } catch (err) {
    console.error(err)
  }
}

export default db