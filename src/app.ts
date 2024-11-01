import { json } from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import { transitLinesRouter } from './api/transit-lines'
import { transitStopsRouter } from './api/transit-stops'
import cors from 'cors'

export const app = express()

app.use(morgan('dev'))

app.use(json())

app.use(cors())

app.use('/transit-lines', transitLinesRouter)
app.use('/transit-stops', transitStopsRouter)
