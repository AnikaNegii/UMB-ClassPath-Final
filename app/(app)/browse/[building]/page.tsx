import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, GraduationCap, BookOpen, Building2, Users, FlaskConical, LibraryBig, Briefcase } from 'lucide-react'
import { buildings, getBuildingById, getFloorsByBuilding, getRoomCountByFloor } from '@/lib/data'
import { BreadcrumbBar } from '@/components/BreadcrumbBar'
import type { ElementType } from 'react'

export function generateStaticParams() {
  return buildings.map(b => ({ building: b.id }))
}

const BUILDING_ICONS: Record<string, ElementType> = {
  'university-hall':            GraduationCap,
  'wheatley-hall':              BookOpen,
  'mccormack-hall':             Building2,
  'campus-center':              Users,
  'integrated-science-complex': FlaskConical,
  'healey-library':             LibraryBig,
  'quinn-administration':       Briefcase,
}

const FLOOR_DESCRIPTIONS: Record<string, Record<number, string>> = {
  'university-hall': {
    1: 'Main entrance, lobby & ground level',
    4: 'Classrooms, labs & studios',
  },
}

interface Props {
  params: Promise<{ building: string }>
}

export async function generateMetadata({ params }: Props) {
  const { building: buildingId } = await params
  const building = getBuildingById(buildingId)
  return { title: building ? `${building.name} — ClassPath` : 'Building — ClassPath' }
}

export default async function BuildingPage({ params }: Props) {
  const { building: buildingId } = await params
  const building = getBuildingById(buildingId)
  if (!building) notFound()

  const floors = getFloorsByBuilding(buildingId)
  const Icon = BUILDING_ICONS[buildingId] ?? Building2

  return (
    <>
      <BreadcrumbBar
        items={[
          { label: 'Browse', href: '/browse' },
          { label: building.name },
        ]}
      />

      <main className="flex-1 px-4 pb-6 pt-4">
        <header className="pb-5">
          <h1 className="font-heading text-2xl font-bold text-foreground">Select Floor</h1>
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {building.name}
          </div>
        </header>

        <ul className="space-y-2.5" role="list" aria-label={`Floors in ${building.name}`}>
          {floors.map(floor => {
            const roomCount = getRoomCountByFloor(buildingId, floor)
            const desc =
              FLOOR_DESCRIPTIONS[buildingId]?.[floor] ??
              `${roomCount} room${roomCount !== 1 ? 's' : ''}`

            return (
              <li key={floor} role="listitem">
                <Link
                  href={`/browse/${buildingId}/${floor}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 outline-none hover:bg-accent/30 focus-visible:ring-2 focus-visible:ring-ring active:opacity-80"
                  aria-label={`Level ${floor}, ${roomCount} rooms`}
                >
                  {/* L-badge */}
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary font-heading text-sm font-bold text-white">
                    L{floor}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-[15px] font-semibold text-foreground">
                      Level {floor}
                    </p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>

                  <ChevronRight
                    className="size-4 shrink-0 text-muted-foreground/40 transition-transform duration-[180ms] group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </main>
    </>
  )
}
