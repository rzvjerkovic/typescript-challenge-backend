import { Request, Response } from 'express'
import { stopService } from 'src/services/stop.service'

/**
 * Get a line from the store
 */
export async function deleteStop(req: Request<{ stopId: string }>, res: Response) {
  try {
    const [success] = stopService.deleteStop(req.params.stopId)
    if (success) {
      res.status(200).send({ message: `Stop ${req.params.stopId} deleted` })
    } else {
      res.status(404).send({ error: 'Stop not found' })
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete stop' })
  }
}
