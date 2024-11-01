import { Request, Response } from 'express'
import { lineService } from 'src/services/line.service'

/**
 * Get a line from the store
 */
export async function getLine(req: Request<{ lineId: string }>, res: Response) {
  const line = lineService.getLine(req.params.lineId)
  if (line) {
    res.status(200).send(line)
  } else {
    res.status(400).send({ error: 'Not found' })
  }
}

/**
 * Get all lines from the store
 */
export async function getLines(req: Request<{}>, res: Response) {
  const lines = await lineService.getLines()

  res.status(200).send(lines)
}
