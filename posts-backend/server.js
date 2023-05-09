import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRoutes } from './routes/userRoutes.js'
import { postRoutes } from './routes/postRoutes.js'
import models, { sequelize } from './models/index.js'
import { errorHandler } from './middlewares/errorMiddleware.js'

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.use(errorHandler)

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`)
    })
  });

