import express from "express"
import cors from "cors"
import lyricsFinder from "lyrics-finder"
import SpotifyWebApi from "spotify-web-api-node"
import dotenv from "dotenv"

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

const PORT = 3001
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, err => {
  if (err) console.log(err)
  console.log("listening on port", PORT)
})