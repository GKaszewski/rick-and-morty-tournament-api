
# Rick and Morty Tournamnet API
An API for [Rick and Morty Tournamnet](https://github.com/GKaszewski/rick-and-morty-tournament).
Using [Rick and Morty API](https://rickandmortyapi.com/)
## Features

 - Characters with rating
 - Rating characters
 - Updating the database with new characters from official [Rick and Morty API](https://rickandmortyapi.com/)

## Dependencies
- [axios](https://github.com/axios/axios)
- [cors](https://www.npmjs.com/package/cors)
- [elo-rating](https://www.npmjs.com/package/elo-rating)
- [express](https://www.npmjs.com/package/express)
- [mongoose](https://mongoosejs.com/)
### Dev
- [nodemon](https://www.npmjs.com/package/nodemon)
## Usage
Clone this repository
```
git clone https://github.com/GKaszewski/rick-and-morty-tournament-api.git
cd rick-and-morty-tournament-api
```
Run `npm install`
Configure `environment.js`
```js
const config = {
    dev: {
        database: {
            uri: 'yourdburi'
        },
        server: {
            host: 'localhost',
            port: 5000
        }
    },
    production: {
        database: {
            uri: 'yourdburi'
        },
        server: {
            host: 'localhost',
            port: 5000
        }
    }
}

module.exports = config;
```
Set `NODE_ENV` to `production` or `dev`.
Run `npm start` and you are done!
## Documentation
### Routes
`/characters`
**GET** 200 - OK
Returns in ascending order of elo rating sorted list of characters.

`/fetch-characters`
**GET** 200 - OK
Fetches characters from [Rick and Morty API](https://rickandmortyapi.com/) converts it into **Character** model and saves it to the database.

`/rate`
**POST** 200 - OK
Request body
```json
{
	"winner": {
		character's model fields
	},
	"loser": {
		character's model fields
	}
}
```
Calculates new elo rating for the pair of characters.

### Models
#### Character
| Field name |Type|
|--|--|
| _id |string|
|  id|  number|
|  name|  string|
| status | string |
|  species| string |
|  gender| string |
|  origin | object  |
| location | object |
| image | string |
| episode | string[] |
|  url | string |
| created | string |
| eloRating | number |

**Notes**
*_id* is a mongodb's id and *id* is a character's id from [Rick and Morty API](https://rickandmortyapi.com/).
*eloRating*'s default value is **1000**.
*Origin*'s and *Location*'s definition
```js
origin : {
	name : string,
	url: string,
}
```
```js
location : {
	name : string,
	url: string,
}
```
