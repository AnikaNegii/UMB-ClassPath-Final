import type { Building, Room, Route, StartPoint } from './types'

// ─── BUILDINGS ────────────────────────────────────────────────────────────────

export const buildings: Building[] = [
  {
    id: 'university-hall',
    name: 'University Hall',
    code: 'UH',   // TODO_PLACEHOLDER: verify official building code
    floors: 4,    // TODO_PLACEHOLDER: verify total floor count
    blurb: 'TODO_PLACEHOLDER',
  },
  {
    id: 'wheatley-hall',
    name: 'Wheatley Hall',
    code: 'WH',   // TODO_PLACEHOLDER
    floors: 5,    // TODO_PLACEHOLDER
    blurb: 'TODO_PLACEHOLDER',
  },
  {
    id: 'mccormack-hall',
    name: 'McCormack Hall',
    code: 'MC',   // TODO_PLACEHOLDER
    floors: 7,    // TODO_PLACEHOLDER
    blurb: 'TODO_PLACEHOLDER',
  },
  {
    id: 'campus-center',
    name: 'Campus Center',
    code: 'CC',   // TODO_PLACEHOLDER
    floors: 3,    // TODO_PLACEHOLDER
    blurb: 'TODO_PLACEHOLDER',
  },
  {
    id: 'integrated-science-complex',
    name: 'Integrated Science Complex',
    code: 'ISC',  // TODO_PLACEHOLDER
    floors: 6,    // TODO_PLACEHOLDER
    blurb: 'TODO_PLACEHOLDER',
  },
  {
    id: 'healey-library',
    name: 'Healey Library',
    code: 'HL',   // TODO_PLACEHOLDER
    floors: 4,    // TODO_PLACEHOLDER
    blurb: 'TODO_PLACEHOLDER',
  },
  {
    id: 'quinn-administration',
    name: 'Quinn Administration Building',
    code: 'QA',   // TODO_PLACEHOLDER
    floors: 4,    // TODO_PLACEHOLDER
    blurb: 'TODO_PLACEHOLDER',
  },
]

// ─── ROOMS ────────────────────────────────────────────────────────────────────

export const rooms: Room[] = [
  // University Hall — Level 4 (navigable demo)
  {
    id: 'uh-4170',
    buildingId: 'university-hall',
    floor: 4,
    number: '4170',
    name: 'Classroom 4170',
    type: 'classroom',
    walkingTime: '~4 min',
    navigable: true,
    placeholder: false,
  },
  {
    id: 'uh-4422',
    buildingId: 'university-hall',
    floor: 4,
    number: '4422',
    name: 'Digital Media Lab 4422',
    type: 'lab',
    walkingTime: '~5 min',
    navigable: true,
    placeholder: false,
  },
  {
    id: 'uh-4400',
    buildingId: 'university-hall',
    floor: 4,
    number: '4400',
    name: 'Sculpture Studio 4400',
    type: 'studio',
    walkingTime: '~5 min',
    navigable: true,
    placeholder: false,
  },

  // University Hall — Level 4 placeholder rooms
  {
    id: 'uh-4410',
    buildingId: 'university-hall',
    floor: 4,
    number: '4410',
    name: 'Art Supply Room 4410',
    type: 'studio',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-4430',
    buildingId: 'university-hall',
    floor: 4,
    number: '4430',
    name: 'Photography Studio 4430',
    type: 'studio',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-4450',
    buildingId: 'university-hall',
    floor: 4,
    number: '4450',
    name: 'Storage Room 4450',
    type: 'other',
    navigable: false,
    placeholder: true,
  },

  // University Hall — Level 3 placeholder rooms
  {
    id: 'uh-3300',
    buildingId: 'university-hall',
    floor: 3,
    number: '3300',
    name: 'Research Lab 3300',
    type: 'lab',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-3305',
    buildingId: 'university-hall',
    floor: 3,
    number: '3305',
    name: 'Department Office 3305',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-3315',
    buildingId: 'university-hall',
    floor: 3,
    number: '3315',
    name: 'Classroom 3315',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-3320',
    buildingId: 'university-hall',
    floor: 3,
    number: '3320',
    name: 'Classroom 3320',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-3340',
    buildingId: 'university-hall',
    floor: 3,
    number: '3340',
    name: 'Faculty Lounge 3340',
    type: 'lounge',
    navigable: false,
    placeholder: true,
  },

  // University Hall — Level 2 placeholder rooms
  {
    id: 'uh-2200',
    buildingId: 'university-hall',
    floor: 2,
    number: '2200',
    name: 'Faculty Offices Suite 2200',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-2210',
    buildingId: 'university-hall',
    floor: 2,
    number: '2210',
    name: 'Conference Room A',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-2215',
    buildingId: 'university-hall',
    floor: 2,
    number: '2215',
    name: 'Graduate Reading Room',
    type: 'library',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-2230',
    buildingId: 'university-hall',
    floor: 2,
    number: '2230',
    name: 'Writing Center',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-2250',
    buildingId: 'university-hall',
    floor: 2,
    number: '2250',
    name: 'Seminar Room 2250',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },

  // University Hall — Level 1 placeholder rooms
  {
    id: 'uh-1100',
    buildingId: 'university-hall',
    floor: 1,
    number: '100',
    name: 'Information & Advising Center',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-1102',
    buildingId: 'university-hall',
    floor: 1,
    number: '102',
    name: 'Student Success Center',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-1120',
    buildingId: 'university-hall',
    floor: 1,
    number: '120',
    name: 'Lecture Hall 120',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-1130',
    buildingId: 'university-hall',
    floor: 1,
    number: '130',
    name: 'Classroom 130',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'uh-1150',
    buildingId: 'university-hall',
    floor: 1,
    number: '150',
    name: 'Student Lounge',
    type: 'lounge',
    navigable: false,
    placeholder: true,
  },

  // Wheatley Hall — Floor 1
  {
    id: 'wh-100',
    buildingId: 'wheatley-hall',
    floor: 1,
    number: '100',
    name: 'Main Office',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'wh-105',
    buildingId: 'wheatley-hall',
    floor: 1,
    number: '105',
    name: 'Classroom 105',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'wh-110',
    buildingId: 'wheatley-hall',
    floor: 1,
    number: '110',
    name: 'Classroom 110',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'wh-115',
    buildingId: 'wheatley-hall',
    floor: 1,
    number: '115',
    name: 'Computer Lab 115',
    type: 'lab',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'wh-120',
    buildingId: 'wheatley-hall',
    floor: 1,
    number: '120',
    name: 'Student Services',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'wh-130',
    buildingId: 'wheatley-hall',
    floor: 1,
    number: '130',
    name: 'Conference Room 130',
    type: 'office',
    navigable: false,
    placeholder: true,
  },

  // Wheatley Hall — Floor 2
  {
    id: 'wh-200',
    buildingId: 'wheatley-hall',
    floor: 2,
    number: '200',
    name: 'History Department',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'wh-210',
    buildingId: 'wheatley-hall',
    floor: 2,
    number: '210',
    name: 'Classroom 210',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'wh-215',
    buildingId: 'wheatley-hall',
    floor: 2,
    number: '215',
    name: 'Classroom 215',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'wh-220',
    buildingId: 'wheatley-hall',
    floor: 2,
    number: '220',
    name: 'Seminar Room 220',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'wh-225',
    buildingId: 'wheatley-hall',
    floor: 2,
    number: '225',
    name: 'Faculty Offices',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'wh-230',
    buildingId: 'wheatley-hall',
    floor: 2,
    number: '230',
    name: 'Graduate Suite',
    type: 'office',
    navigable: false,
    placeholder: true,
  },

  // McCormack Hall — Floor 1
  {
    id: 'mc-100',
    buildingId: 'mccormack-hall',
    floor: 1,
    number: '100',
    name: "Dean's Suite",
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'mc-105',
    buildingId: 'mccormack-hall',
    floor: 1,
    number: '105',
    name: 'Lecture Hall A',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'mc-110',
    buildingId: 'mccormack-hall',
    floor: 1,
    number: '110',
    name: 'Lecture Hall B',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'mc-115',
    buildingId: 'mccormack-hall',
    floor: 1,
    number: '115',
    name: 'Political Science Department',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'mc-120',
    buildingId: 'mccormack-hall',
    floor: 1,
    number: '120',
    name: 'Classroom 120',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'mc-130',
    buildingId: 'mccormack-hall',
    floor: 1,
    number: '130',
    name: 'Student Commons',
    type: 'lounge',
    navigable: false,
    placeholder: true,
  },

  // McCormack Hall — Floor 2
  {
    id: 'mc-200',
    buildingId: 'mccormack-hall',
    floor: 2,
    number: '200',
    name: 'Sociology Department',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'mc-205',
    buildingId: 'mccormack-hall',
    floor: 2,
    number: '205',
    name: 'Classroom 205',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'mc-210',
    buildingId: 'mccormack-hall',
    floor: 2,
    number: '210',
    name: 'Research Suite 210',
    type: 'lab',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'mc-215',
    buildingId: 'mccormack-hall',
    floor: 2,
    number: '215',
    name: 'Faculty Offices 215',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'mc-220',
    buildingId: 'mccormack-hall',
    floor: 2,
    number: '220',
    name: 'Seminar Room 220',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'mc-225',
    buildingId: 'mccormack-hall',
    floor: 2,
    number: '225',
    name: 'Graduate Office',
    type: 'office',
    navigable: false,
    placeholder: true,
  },

  // Campus Center — Floor 1
  {
    id: 'cc-100',
    buildingId: 'campus-center',
    floor: 1,
    number: '100',
    name: 'Campus Store',
    type: 'other',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'cc-105',
    buildingId: 'campus-center',
    floor: 1,
    number: '105',
    name: 'Dining Commons',
    type: 'cafe',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'cc-110',
    buildingId: 'campus-center',
    floor: 1,
    number: '110',
    name: 'Food Station',
    type: 'cafe',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'cc-115',
    buildingId: 'campus-center',
    floor: 1,
    number: '115',
    name: 'Student Government Offices',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'cc-120',
    buildingId: 'campus-center',
    floor: 1,
    number: '120',
    name: 'Media & Technology Services',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'cc-125',
    buildingId: 'campus-center',
    floor: 1,
    number: '125',
    name: 'Information Desk',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'cc-130',
    buildingId: 'campus-center',
    floor: 1,
    number: '130',
    name: 'Student Lounge',
    type: 'lounge',
    navigable: false,
    placeholder: true,
  },

  // Campus Center — Floor 2
  {
    id: 'cc-200',
    buildingId: 'campus-center',
    floor: 2,
    number: '200',
    name: 'Club Room A',
    type: 'lounge',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'cc-205',
    buildingId: 'campus-center',
    floor: 2,
    number: '205',
    name: 'Club Room B',
    type: 'lounge',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'cc-210',
    buildingId: 'campus-center',
    floor: 2,
    number: '210',
    name: 'Conference Center',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'cc-215',
    buildingId: 'campus-center',
    floor: 2,
    number: '215',
    name: 'Multipurpose Room 215',
    type: 'other',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'cc-220',
    buildingId: 'campus-center',
    floor: 2,
    number: '220',
    name: 'Administrative Offices',
    type: 'office',
    navigable: false,
    placeholder: true,
  },

  // Integrated Science Complex — Floor 1
  {
    id: 'isc-100',
    buildingId: 'integrated-science-complex',
    floor: 1,
    number: '100',
    name: 'Biology Teaching Lab',
    type: 'lab',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'isc-105',
    buildingId: 'integrated-science-complex',
    floor: 1,
    number: '105',
    name: 'Chemistry Teaching Lab',
    type: 'lab',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'isc-110',
    buildingId: 'integrated-science-complex',
    floor: 1,
    number: '110',
    name: 'Research Prep Room',
    type: 'lab',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'isc-115',
    buildingId: 'integrated-science-complex',
    floor: 1,
    number: '115',
    name: 'Lecture Hall 115',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'isc-120',
    buildingId: 'integrated-science-complex',
    floor: 1,
    number: '120',
    name: 'Science Office Suite',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'isc-125',
    buildingId: 'integrated-science-complex',
    floor: 1,
    number: '125',
    name: 'Instrument Room',
    type: 'lab',
    navigable: false,
    placeholder: true,
  },

  // Integrated Science Complex — Floor 2
  {
    id: 'isc-200',
    buildingId: 'integrated-science-complex',
    floor: 2,
    number: '200',
    name: 'Physics Lab',
    type: 'lab',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'isc-205',
    buildingId: 'integrated-science-complex',
    floor: 2,
    number: '205',
    name: 'Computer Modeling Lab',
    type: 'lab',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'isc-210',
    buildingId: 'integrated-science-complex',
    floor: 2,
    number: '210',
    name: 'Classroom 210',
    type: 'classroom',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'isc-215',
    buildingId: 'integrated-science-complex',
    floor: 2,
    number: '215',
    name: 'Research Suite 215',
    type: 'lab',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'isc-220',
    buildingId: 'integrated-science-complex',
    floor: 2,
    number: '220',
    name: 'Department Office',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'isc-225',
    buildingId: 'integrated-science-complex',
    floor: 2,
    number: '225',
    name: 'Graduate Lab 225',
    type: 'lab',
    navigable: false,
    placeholder: true,
  },

  // Healey Library — Floor 1
  {
    id: 'hl-100',
    buildingId: 'healey-library',
    floor: 1,
    number: '100',
    name: 'Circulation Desk',
    type: 'library',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'hl-105',
    buildingId: 'healey-library',
    floor: 1,
    number: '105',
    name: 'Reference Services',
    type: 'library',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'hl-110',
    buildingId: 'healey-library',
    floor: 1,
    number: '110',
    name: 'Computer Stations',
    type: 'lab',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'hl-115',
    buildingId: 'healey-library',
    floor: 1,
    number: '115',
    name: 'Group Study Room A',
    type: 'library',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'hl-120',
    buildingId: 'healey-library',
    floor: 1,
    number: '120',
    name: 'Group Study Room B',
    type: 'library',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'hl-125',
    buildingId: 'healey-library',
    floor: 1,
    number: '125',
    name: 'Periodicals Room',
    type: 'library',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'hl-130',
    buildingId: 'healey-library',
    floor: 1,
    number: '130',
    name: 'Assistive Technology Center',
    type: 'other',
    navigable: false,
    placeholder: true,
  },

  // Healey Library — Floor 2
  {
    id: 'hl-200',
    buildingId: 'healey-library',
    floor: 2,
    number: '200',
    name: 'Special Collections',
    type: 'library',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'hl-205',
    buildingId: 'healey-library',
    floor: 2,
    number: '205',
    name: 'Quiet Reading Room',
    type: 'library',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'hl-210',
    buildingId: 'healey-library',
    floor: 2,
    number: '210',
    name: 'Archives',
    type: 'library',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'hl-215',
    buildingId: 'healey-library',
    floor: 2,
    number: '215',
    name: 'Multimedia Room',
    type: 'lab',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'hl-220',
    buildingId: 'healey-library',
    floor: 2,
    number: '220',
    name: 'Staff Office',
    type: 'office',
    navigable: false,
    placeholder: true,
  },

  // Quinn Administration — Floor 1
  {
    id: 'qa-100',
    buildingId: 'quinn-administration',
    floor: 1,
    number: '100',
    name: "Chancellor's Office",
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'qa-105',
    buildingId: 'quinn-administration',
    floor: 1,
    number: '105',
    name: 'Admissions Office',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'qa-110',
    buildingId: 'quinn-administration',
    floor: 1,
    number: '110',
    name: 'Financial Aid Office',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'qa-115',
    buildingId: 'quinn-administration',
    floor: 1,
    number: '115',
    name: "Bursar's Office",
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'qa-120',
    buildingId: 'quinn-administration',
    floor: 1,
    number: '120',
    name: "Registrar's Office",
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'qa-125',
    buildingId: 'quinn-administration',
    floor: 1,
    number: '125',
    name: 'Student Affairs Suite',
    type: 'office',
    navigable: false,
    placeholder: true,
  },

  // Quinn Administration — Floor 2
  {
    id: 'qa-200',
    buildingId: 'quinn-administration',
    floor: 2,
    number: '200',
    name: 'Human Resources',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'qa-205',
    buildingId: 'quinn-administration',
    floor: 2,
    number: '205',
    name: 'Faculty Senate Room',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'qa-210',
    buildingId: 'quinn-administration',
    floor: 2,
    number: '210',
    name: 'Conference Room A',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'qa-215',
    buildingId: 'quinn-administration',
    floor: 2,
    number: '215',
    name: "Provost's Office",
    type: 'office',
    navigable: false,
    placeholder: true,
  },
  {
    id: 'qa-220',
    buildingId: 'quinn-administration',
    floor: 2,
    number: '220',
    name: 'Academic Affairs',
    type: 'office',
    navigable: false,
    placeholder: true,
  },
]

// ─── ROUTES ───────────────────────────────────────────────────────────────────
// Waypoints are calibrated to the real floor plan images (3400×2020 coordinate space).
// Level 1: main entrance at south tip, corridor runs east to elevator at ~(2380, 410).
// Level 4: elevator exits at ~(2040, 810); art studios upper section, classrooms lower.

export const routes: Route[] = [
  // ── Route: Classroom 4170 ──────────────────────────────────────────────────
  {
    id: 'route-uh-4170',
    roomId: 'uh-4170',
    startLabel: 'Main Entrance — University Hall',
    waypoints: [
      { id: 'uh-entrance',      x: 1520, y: 1840, floor: 1, label: 'Main Entrance' },
      { id: 'uh-lobby',         x: 1590, y: 1490, floor: 1, label: 'Entrance Lobby' },
      { id: 'uh-atrium',        x: 1760, y: 1100, floor: 1, label: 'Atrium' },
      { id: 'uh-corridor-l1',   x: 2100, y: 680,  floor: 1, label: 'Main Corridor' },
      { id: 'uh-elev-l1',       x: 2380, y: 410,  floor: 1, label: 'Elevator — Level 1' },
      { id: 'uh-elev-l4',       x: 2040, y: 810,  floor: 4, label: 'Elevator — Level 4' },
      { id: 'uh-corridor-l4',   x: 1700, y: 760,  floor: 4, label: 'Level 4 Corridor' },
      { id: 'uh-4170-entry',    x: 1430, y: 1080, floor: 4, label: 'Classroom 4170' },
    ],
    steps: [
      {
        waypointId: 'uh-entrance',
        instruction: 'Start at the main entrance of University Hall.',
      },
      {
        waypointId: 'uh-lobby',
        instruction: 'Enter through the main doors and cross the entrance lobby.',
      },
      {
        waypointId: 'uh-atrium',
        instruction: 'Continue through the atrium toward the main building.',
      },
      {
        waypointId: 'uh-corridor-l1',
        instruction: 'Turn right and walk east along the main corridor.',
      },
      {
        waypointId: 'uh-elev-l1',
        instruction: 'Find the elevator bank on your right near Stair 3.',
      },
      {
        waypointId: 'uh-elev-l4',
        instruction: 'Take the elevator up to Level 4.',
        isFloorChange: true,
      },
      {
        waypointId: 'uh-corridor-l4',
        instruction: 'Exit the elevator and head west along the corridor.',
      },
      {
        waypointId: 'uh-4170-entry',
        instruction: 'Classroom 4170 is on your left in the classroom wing. You have arrived.',
      },
    ],
  },

  // ── Route: Digital Media Lab 4422 ─────────────────────────────────────────
  {
    id: 'route-uh-4422',
    roomId: 'uh-4422',
    startLabel: 'Main Entrance — University Hall',
    waypoints: [
      { id: 'uh-entrance',      x: 1520, y: 1840, floor: 1, label: 'Main Entrance' },
      { id: 'uh-lobby',         x: 1590, y: 1490, floor: 1, label: 'Entrance Lobby' },
      { id: 'uh-atrium',        x: 1760, y: 1100, floor: 1, label: 'Atrium' },
      { id: 'uh-corridor-l1',   x: 2100, y: 680,  floor: 1, label: 'Main Corridor' },
      { id: 'uh-elev-l1',       x: 2380, y: 410,  floor: 1, label: 'Elevator — Level 1' },
      { id: 'uh-elev-l4',       x: 2040, y: 810,  floor: 4, label: 'Elevator — Level 4' },
      { id: 'uh-corridor-l4',   x: 1700, y: 760,  floor: 4, label: 'Level 4 Corridor' },
      { id: 'uh-corridor-mid',  x: 1700, y: 560,  floor: 4, label: 'Level 4 Corridor (mid)' },
      { id: 'uh-4422-entry',    x: 1520, y: 380,  floor: 4, label: 'Digital Media Lab 4422' },
    ],
    steps: [
      {
        waypointId: 'uh-entrance',
        instruction: 'Start at the main entrance of University Hall.',
      },
      {
        waypointId: 'uh-lobby',
        instruction: 'Enter through the main doors and cross the entrance lobby.',
      },
      {
        waypointId: 'uh-atrium',
        instruction: 'Continue through the atrium toward the main building.',
      },
      {
        waypointId: 'uh-corridor-l1',
        instruction: 'Turn right and walk east along the main corridor.',
      },
      {
        waypointId: 'uh-elev-l1',
        instruction: 'Find the elevator bank on your right near Stair 3.',
      },
      {
        waypointId: 'uh-elev-l4',
        instruction: 'Take the elevator up to Level 4.',
        isFloorChange: true,
      },
      {
        waypointId: 'uh-corridor-l4',
        instruction: 'Exit the elevator and head west along the corridor.',
      },
      {
        waypointId: 'uh-corridor-mid',
        instruction: 'Continue west past the classroom wing and toward the studios.',
      },
      {
        waypointId: 'uh-4422-entry',
        instruction: 'Digital Media Lab 4422 is in the studio cluster on your left. You have arrived.',
      },
    ],
  },

  // ── Route: Sculpture Studio 4400 ──────────────────────────────────────────
  {
    id: 'route-uh-4400',
    roomId: 'uh-4400',
    startLabel: 'Main Entrance — University Hall',
    waypoints: [
      { id: 'uh-entrance',      x: 1520, y: 1840, floor: 1, label: 'Main Entrance' },
      { id: 'uh-lobby',         x: 1590, y: 1490, floor: 1, label: 'Entrance Lobby' },
      { id: 'uh-atrium',        x: 1760, y: 1100, floor: 1, label: 'Atrium' },
      { id: 'uh-corridor-l1',   x: 2100, y: 680,  floor: 1, label: 'Main Corridor' },
      { id: 'uh-elev-l1',       x: 2380, y: 410,  floor: 1, label: 'Elevator — Level 1' },
      { id: 'uh-elev-l4',       x: 2040, y: 810,  floor: 4, label: 'Elevator — Level 4' },
      { id: 'uh-corridor-l4',   x: 1700, y: 760,  floor: 4, label: 'Level 4 Corridor' },
      { id: 'uh-corridor-mid',  x: 1700, y: 560,  floor: 4, label: 'Level 4 Corridor (mid)' },
      { id: 'uh-corridor-far',  x: 2000, y: 560,  floor: 4, label: 'Level 4 Corridor (far)' },
      { id: 'uh-4400-entry',    x: 2180, y: 320,  floor: 4, label: 'Sculpture Studio 4400' },
    ],
    steps: [
      {
        waypointId: 'uh-entrance',
        instruction: 'Start at the main entrance of University Hall.',
      },
      {
        waypointId: 'uh-lobby',
        instruction: 'Enter through the main doors and cross the entrance lobby.',
      },
      {
        waypointId: 'uh-atrium',
        instruction: 'Continue through the atrium toward the main building.',
      },
      {
        waypointId: 'uh-corridor-l1',
        instruction: 'Turn right and walk east along the main corridor.',
      },
      {
        waypointId: 'uh-elev-l1',
        instruction: 'Find the elevator bank on your right near Stair 3.',
      },
      {
        waypointId: 'uh-elev-l4',
        instruction: 'Take the elevator up to Level 4.',
        isFloorChange: true,
      },
      {
        waypointId: 'uh-corridor-l4',
        instruction: 'Exit the elevator and head west along the corridor.',
      },
      {
        waypointId: 'uh-corridor-mid',
        instruction: 'Continue west toward the studio wing.',
      },
      {
        waypointId: 'uh-corridor-far',
        instruction: 'Continue east past the Digital Media cluster toward the far studios.',
      },
      {
        waypointId: 'uh-4400-entry',
        instruction: 'Sculpture Studio 4400 is the large space ahead on your right. You have arrived.',
      },
    ],
  },
]

// ─── START POINTS ─────────────────────────────────────────────────────────────
// University Hall has two accessible entrances

export const startPoints: StartPoint[] = [
  {
    id: 'uh-main',
    buildingId: 'university-hall',
    label: 'Main Entrance — University Hall',
    shortLabel: 'Main Entrance (South)',
  },
  {
    id: 'uh-west',
    buildingId: 'university-hall',
    label: 'West Entrance — University Hall',
    shortLabel: 'West Entrance (Lobby)',
  },
]

// ─── WEST-ENTRANCE ROUTES ─────────────────────────────────────────────────────
// Start from the west lobby entrance; waypoints in 3400×2020 image coordinate space.

const westRoutes: Route[] = [
  {
    id: 'route-uh-4170-west',
    roomId: 'uh-4170',
    startLabel: 'West Entrance — University Hall',
    waypoints: [
      { id: 'uh-west-entrance',  x: 540,  y: 520, floor: 1, label: 'West Entrance' },
      { id: 'uh-west-corridor',  x: 1400, y: 460, floor: 1, label: 'Main Corridor' },
      { id: 'uh-elev-l1',        x: 2380, y: 410, floor: 1, label: 'Elevator — Level 1' },
      { id: 'uh-elev-l4',        x: 2040, y: 810, floor: 4, label: 'Elevator — Level 4' },
      { id: 'uh-corridor-l4',    x: 1700, y: 760, floor: 4, label: 'Level 4 Corridor' },
      { id: 'uh-4170-entry',     x: 1430, y: 1080, floor: 4, label: 'Classroom 4170' },
    ],
    steps: [
      { waypointId: 'uh-west-entrance', instruction: 'Enter through the West Entrance on the lobby level.' },
      { waypointId: 'uh-west-corridor', instruction: 'Walk east along the main corridor toward the elevators.' },
      { waypointId: 'uh-elev-l1',       instruction: 'Continue to the elevator bank at the far end of the corridor.' },
      { waypointId: 'uh-elev-l4',       instruction: 'Take the elevator up to Level 4.', isFloorChange: true },
      { waypointId: 'uh-corridor-l4',   instruction: 'Exit the elevator and head left into the main corridor.' },
      { waypointId: 'uh-4170-entry',    instruction: 'Room 4170 is on your right. You have arrived.' },
    ],
  },
  {
    id: 'route-uh-4422-west',
    roomId: 'uh-4422',
    startLabel: 'West Entrance — University Hall',
    waypoints: [
      { id: 'uh-west-entrance',  x: 540,  y: 520, floor: 1, label: 'West Entrance' },
      { id: 'uh-west-corridor',  x: 1400, y: 460, floor: 1, label: 'Main Corridor' },
      { id: 'uh-elev-l1',        x: 2380, y: 410, floor: 1, label: 'Elevator — Level 1' },
      { id: 'uh-elev-l4',        x: 2040, y: 810, floor: 4, label: 'Elevator — Level 4' },
      { id: 'uh-corridor-l4',    x: 1700, y: 760, floor: 4, label: 'Level 4 Corridor' },
      { id: 'uh-corridor-mid',   x: 1700, y: 560, floor: 4, label: 'Level 4 Corridor (mid)' },
      { id: 'uh-4422-entry',     x: 1520, y: 380, floor: 4, label: 'Digital Media Lab 4422' },
    ],
    steps: [
      { waypointId: 'uh-west-entrance', instruction: 'Enter through the West Entrance on the lobby level.' },
      { waypointId: 'uh-west-corridor', instruction: 'Walk east along the main corridor toward the elevators.' },
      { waypointId: 'uh-elev-l1',       instruction: 'Continue to the elevator bank at the far end of the corridor.' },
      { waypointId: 'uh-elev-l4',       instruction: 'Take the elevator up to Level 4.', isFloorChange: true },
      { waypointId: 'uh-corridor-l4',   instruction: 'Exit the elevator and head left into the main corridor.' },
      { waypointId: 'uh-corridor-mid',  instruction: 'Continue north past Classroom 4170.' },
      { waypointId: 'uh-4422-entry',    instruction: 'Digital Media Lab 4422 is on your left. You have arrived.' },
    ],
  },
  {
    id: 'route-uh-4400-west',
    roomId: 'uh-4400',
    startLabel: 'West Entrance — University Hall',
    waypoints: [
      { id: 'uh-west-entrance',  x: 540,  y: 520, floor: 1, label: 'West Entrance' },
      { id: 'uh-west-corridor',  x: 1400, y: 460, floor: 1, label: 'Main Corridor' },
      { id: 'uh-elev-l1',        x: 2380, y: 410, floor: 1, label: 'Elevator — Level 1' },
      { id: 'uh-elev-l4',        x: 2040, y: 810, floor: 4, label: 'Elevator — Level 4' },
      { id: 'uh-corridor-l4',    x: 1700, y: 760, floor: 4, label: 'Level 4 Corridor' },
      { id: 'uh-corridor-mid',   x: 1700, y: 560, floor: 4, label: 'Level 4 Corridor (mid)' },
      { id: 'uh-corridor-far',   x: 2000, y: 560, floor: 4, label: 'Level 4 Corridor (far)' },
      { id: 'uh-4400-entry',     x: 2180, y: 320, floor: 4, label: 'Sculpture Studio 4400' },
    ],
    steps: [
      { waypointId: 'uh-west-entrance', instruction: 'Enter through the West Entrance on the lobby level.' },
      { waypointId: 'uh-west-corridor', instruction: 'Walk east along the main corridor toward the elevators.' },
      { waypointId: 'uh-elev-l1',       instruction: 'Continue to the elevator bank at the far end of the corridor.' },
      { waypointId: 'uh-elev-l4',       instruction: 'Take the elevator up to Level 4.', isFloorChange: true },
      { waypointId: 'uh-corridor-l4',   instruction: 'Exit the elevator and head left into the main corridor.' },
      { waypointId: 'uh-corridor-mid',  instruction: 'Continue north past Classroom 4170.' },
      { waypointId: 'uh-corridor-far',  instruction: 'Pass the Digital Media Lab and continue east.' },
      { waypointId: 'uh-4400-entry',    instruction: 'Sculpture Studio 4400 is on your right. You have arrived.' },
    ],
  },
]

const allRoutes: Route[] = [...routes, ...westRoutes]

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function getBuildingById(id: string) {
  return buildings.find(b => b.id === id)
}

export function getRoomById(id: string) {
  return rooms.find(r => r.id === id)
}

export function getRoomsByBuilding(buildingId: string) {
  return rooms.filter(r => r.buildingId === buildingId)
}

export function getRoomsByBuildingAndFloor(buildingId: string, floor: number) {
  return rooms.filter(r => r.buildingId === buildingId && r.floor === floor)
}

export function getFloorsByBuilding(buildingId: string): number[] {
  const floors = new Set(
    rooms.filter(r => r.buildingId === buildingId).map(r => r.floor)
  )
  return Array.from(floors).sort((a, b) => a - b)
}

export function getRoomCountByFloor(buildingId: string, floor: number) {
  return rooms.filter(r => r.buildingId === buildingId && r.floor === floor).length
}

export function getRouteByRoomId(roomId: string) {
  return routes.find(r => r.roomId === roomId)
}

export function getRouteByRoomIdAndStart(roomId: string, startId: string) {
  return allRoutes.find(r => r.roomId === roomId && r.startLabel.toLowerCase().includes(
    startId === 'uh-west' ? 'west' : 'main'
  ))
}

export function getStartPoints() {
  return startPoints
}

export function searchRooms(query: string): Room[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return rooms.filter(
    r =>
      r.name.toLowerCase().includes(q) ||
      r.number.toLowerCase().includes(q) ||
      getBuildingById(r.buildingId)?.name.toLowerCase().includes(q)
  )
}
