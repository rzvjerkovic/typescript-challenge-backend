import { Router } from 'express'
import { getLine, getLines } from './get-line'
import { addStop } from './add-stop'

export const transitLinesRouter = Router()

transitLinesRouter.get('/all', getLines)
transitLinesRouter.get('/:lineId', getLine)
transitLinesRouter.post('/:lineId/add-stop', addStop)
