import { buildings, getRoomsByBuilding, getFloorsByBuilding } from '@/lib/data'
import { BuildingCard } from '@/components/BuildingCard'

export const metadata = { title: 'Browse campus — ClassPath' }

export default function BrowsePage() {
  // Campus Center is the featured building; everything else goes in the grid
  const featuredId = 'campus-center'
  const featured   = buildings.find(b => b.id === featuredId) ?? buildings[0]
  const rest        = buildings.filter(b => b.id !== featured.id)

  return (
    <main className="flex-1 px-4">
      <header className="pb-4 pt-10">
        <h1 className="font-heading text-2xl font-bold text-foreground">Browse campus</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Explore buildings, floors, and rooms.
        </p>
      </header>

      <div className="pb-10 space-y-3">
        {/* Featured building — full width */}
        <BuildingCard
          building={featured}
          floorCount={getFloorsByBuilding(featured.id).length}
          roomCount={getRoomsByBuilding(featured.id).length}
          index={0}
          featured
        />

        {/* Remaining buildings — 2-col grid with equal-height cards */}
        <ul
          className="grid grid-cols-2 gap-3"
          role="list"
          aria-label="Campus buildings"
        >
          {rest.map(({ id, ...b }, i) => {
            const building = { id, ...b }
            return (
              <li key={id} role="listitem">
                <BuildingCard
                  building={building}
                  floorCount={getFloorsByBuilding(id).length}
                  roomCount={getRoomsByBuilding(id).length}
                  index={i + 1}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
