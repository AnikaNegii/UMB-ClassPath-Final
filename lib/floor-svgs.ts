import type { FloorSVGData } from './types'

// UH floor plans use the real architectural PNGs (3400×2200).
// ViewBox crops to 2020px height to remove the title block at the bottom.
// Waypoints in data.ts are calibrated to pixel positions within these images.

export const UH_LEVEL_1: FloorSVGData = {
  buildingId: 'university-hall',
  floor: 1,
  viewBox: '0 0 3400 2020',
  imagePath: '/030-University Hall-1.png',
  rects: [],
}

export const UH_LEVEL_4: FloorSVGData = {
  buildingId: 'university-hall',
  floor: 4,
  viewBox: '0 0 3400 2020',
  imagePath: '/030-University Hall-4.png',
  rects: [],
}

export const floorSVGs: FloorSVGData[] = [UH_LEVEL_1, UH_LEVEL_4]

export function getFloorSVG(buildingId: string, floor: number) {
  return floorSVGs.find(f => f.buildingId === buildingId && f.floor === floor)
}
