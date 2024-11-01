import { Request, Response } from 'express'
import { lineService } from 'src/services/line.service'
import { TransitStop } from 'src/types/line'

/**
 * Get a line from the store
 */
export async function addStop(
  req: Request<{ lineId: string; reference: string; stop: TransitStop; position: 'after' | 'before' }>,
  res: Response
) {
  const { lineId, stop, position, reference } = req.body
  const line = lineService.getLine(req.body.lineId)

  if (line) {
    try {
      const newLine = lineService.addStop(lineId, stop, reference, position)
      res.status(200).send(newLine)
    } catch (error) {
      throw new Error(`Adding line stop failed: ${error}`)
    }
  } else {
    res.status(400).send({ error: 'Line not found' })
  }
}
