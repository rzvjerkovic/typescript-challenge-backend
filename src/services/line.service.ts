import { LINES } from 'src/constants/lines'
import { TransitLine, TransitStop } from 'src/types/line'

import { v4 as uuidv4 } from 'uuid'

export class LineService {
  private lines: { [lineId: string]: TransitLine }

  constructor() {
    this.lines = LINES
  }

  /**
   * Check wehter a line exists
   * @param lineId Id of the line to be checked
   */
  hasLine(lineId: string): boolean {
    return !!this.lines[lineId]
  }

  /**
   * Get all lines
   * @param lineId Id of the line
   */
  getLines(): { [id: string]: TransitLine } {
    return this.lines
  }

  /**
   * Get a line by it's id
   * @param lineId Id of the line
   */
  getLine(lineId: string): TransitLine {
    return this.lines[lineId]
  }

  /**
   * Add a new line
   * @param newLineId New id of the line. Cannot be an id that already exists
   * @param stops Array of stops for the new line. Note: A line needs a minimum of two stops.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addLine(newLineId: string, stops: TransitStop[]): void {}

  /**
   * Add a stop to a line
   * @param lineId Id of the line
   * @param stop the stop you want to add
   * @param reference id of a reference stop
   * @param position defines if the new stop is added before or after the existing stop
   */
  addStop(lineId: string, stop: TransitStop, reference: string, position: 'before' | 'after' = 'after'): void {
    const line = LINES[lineId]
    const referenceStopIndex = line.stops.findIndex((s) => s.id === reference)

    if (referenceStopIndex === -1) {
      throw new Error(`Stop with ID ${reference} not found in line ${lineId}`)
    }

    const newStop = { ...stop, id: uuidv4() }
    const insertIndex = position === 'after' ? referenceStopIndex + 1 : referenceStopIndex

    if (position === 'after') {
      line.stops[referenceStopIndex].nextId = newStop.id

      newStop.prevId = reference

      if (insertIndex < line.stops.length) {
        const nextStop = line.stops[insertIndex]
        nextStop.prevId = newStop.id
        newStop.nextId = nextStop.id
      } else {
        newStop.nextId = null
      }
    } else {
      line.stops[referenceStopIndex].prevId = newStop.id
      newStop.nextId = reference

      if (referenceStopIndex > 0) {
        const prevStop = line.stops[referenceStopIndex - 1]
        prevStop.nextId = newStop.id
        newStop.prevId = prevStop.id
      } else {
        newStop.prevId = null
      }
    }

    line.stops.splice(insertIndex, 0, newStop)
  }

  /**
   * Deletes a stop from a line
   * @param stopId
   */
  deleteStop(lineId: string, stopId: string) {
    const line = LINES[lineId]
    const stopIndex = line.stops.findIndex((stop) => stop.id === stopId)

    if (stopIndex === -1) {
      throw new Error(`Stop with ID ${stopId} not found in line ${lineId}`)
    }

    const previousStop = line.stops[stopIndex - 1] || null
    const nextStop = line.stops[stopIndex + 1] || null

    if (previousStop) {
      previousStop.nextId = nextStop ? nextStop.id : null
    }
    if (nextStop) {
      nextStop.prevId = previousStop ? previousStop.id : null
    }

    line.stops = line.stops.filter((stop) => stop.id !== stopId)
  }
}

export const lineService = new LineService()
