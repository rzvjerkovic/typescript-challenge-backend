import { Router } from 'express'

import { deleteStop } from './delete-stop'

export const transitStopsRouter = Router()

transitStopsRouter.get('/:stopId', deleteStop)
