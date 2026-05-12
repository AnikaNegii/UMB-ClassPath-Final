export type RoomType =
  | 'classroom'
  | 'lab'
  | 'studio'
  | 'office'
  | 'lounge'
  | 'cafe'
  | 'library'
  | 'other'

export type RoutePreference = 'standard' | 'accessible'

export type StartPoint = {
  id: string
  buildingId: string
  label: string        // full label e.g. "Main Entrance — University Hall"
  shortLabel: string   // compact label e.g. "Main Entrance"
}

export type Building = {
  id: string
  name: string
  code: string   // TODO_PLACEHOLDER: verify official code
  floors: number // TODO_PLACEHOLDER: verify for non-UH buildings
  blurb: string  // TODO_PLACEHOLDER: verify/write real copy
}

export type Room = {
  id: string
  buildingId: string
  floor: number
  number: string      // display number e.g. "4170"
  name: string        // full display name e.g. "Classroom 4170"
  type: RoomType
  walkingTime?: string // e.g. "~4 min" — only on navigable rooms
  navigable: boolean
  placeholder: boolean // true = generated, needs verification
}

export type Waypoint = {
  id: string
  x: number
  y: number
  floor: number
  label: string
}

export type RouteStep = {
  waypointId: string
  instruction: string
  isFloorChange?: boolean // triggers floor-transition animation
}

export type Route = {
  id: string
  roomId: string
  startLabel: string
  waypoints: Waypoint[]
  steps: RouteStep[]
}

// Geometry for SVG floor plan rendering
export type FloorRect = {
  id: string
  x: number
  y: number
  width: number
  height: number
  label?: string
  type: 'room' | 'corridor' | 'elevator' | 'entry' | 'stair'
  navigableRoomId?: string // links shape to a Room id
}

export type FloorSVGData = {
  buildingId: string
  floor: number
  viewBox: string
  imagePath?: string  // public path to real floor plan PNG; when set, rects are not rendered
  rects: FloorRect[]
}
