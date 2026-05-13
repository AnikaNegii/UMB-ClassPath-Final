import { notFound } from 'next/navigation'
import {
  buildings,
  getBuildingById,
  getRoomsByBuildingAndFloor,
  getFloorsByBuilding,
} from '@/lib/data'
import { BreadcrumbBar } from '@/components/BreadcrumbBar'
import { RoomSelector } from '@/components/RoomSelector'

export function generateStaticParams() {
  return buildings.flatMap(b =>
    getFloorsByBuilding(b.id).map(floor => ({ building: b.id, floor: String(floor) }))
  )
}

interface Props {
  params: Promise<{ building: string; floor: string }>
}

export async function generateMetadata({ params }: Props) {
  const { building: buildingId, floor } = await params
  const building = getBuildingById(buildingId)
  return {
    title: building
      ? `${building.name} — Level ${floor} — ClassPath`
      : 'Floor — ClassPath',
  }
}

export default async function FloorPage({ params }: Props) {
  const { building: buildingId, floor: floorParam } = await params
  const building = getBuildingById(buildingId)
  if (!building) notFound()

  const floorNum = parseInt(floorParam, 10)
  if (isNaN(floorNum)) notFound()

  const validFloors = getFloorsByBuilding(buildingId)
  if (!validFloors.includes(floorNum)) notFound()

  const rooms = getRoomsByBuildingAndFloor(buildingId, floorNum)

  return (
    <>
      <BreadcrumbBar
        items={[
          { label: 'Browse', href: '/browse' },
          { label: building.name, href: `/browse/${buildingId}` },
          { label: `Level ${floorNum}` },
        ]}
      />

      <main className="flex flex-1 flex-col pb-6">
        <header className="px-4 pb-3 pt-4">
          <h1 className="font-heading text-2xl font-bold text-foreground">Select Location</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {building.name} · Level {floorNum}
          </p>
        </header>

        <RoomSelector rooms={rooms} />
      </main>
    </>
  )
}
