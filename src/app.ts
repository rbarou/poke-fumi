import express from 'express'
import * as routes from './routes'


const app = express()
app.use(express.json())
routes.register(app)

const pokemonsUrl = 'https://pokeapi.co/api/v2/pokemon/'



/*

const createMatch: () => Promise<any> = () => {
    return got.post('http://localhost:5001/match', {
      json: {
          idUser1: 'old-phoenix',
          idUser2: 'great-hobbit',
          type: 'friendly'
      }
    }).json()
  }  
*/
export {app};
