import { LINES } from 'src/constants/lines'
import { lineService } from './line.service'

type DeleteReturn = [success: boolean, affectedLineIds: string[]]
export class StopService {
  /**
   * Deletes a selected stop
   * Rearranges all the lines that include the selected stop
   * @param stopId
   * @returns {string[]} Return ids of lines that were affected by stop deletion
   */
  deleteStop(stopId: string): string[] {
    const affectedLineIds = Object.values(LINES)
      .filter((line) => line.stops.find((stop) => stop.id === stopId))
      .map((line) => line.id)
    if (!affectedLineIds) {
      throw new Error('No lines found matching the selected stop')
    }
    try {
      affectedLineIds.forEach((lineId) => {
        lineService.deleteStop(lineId, stopId)
      })
    } catch (error) {
      throw new Error(`Unable to delete the stop: ${error}`)
    }

    return affectedLineIds
  }
}

export const stopService = new StopService()
