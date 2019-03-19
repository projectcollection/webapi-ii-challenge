const express = require('express')
const postsRouter = require('./posts/postsRouter')

const app = express()

const postsBase = '/api/posts'

app.use(express.json())
app.use(`${postsBase}`, postsRouter)



const port = 5000

app.listen(port, () => console.log(`running on port ${port}`))