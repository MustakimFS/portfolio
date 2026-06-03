'use client'

/**
 * Launch Parameters — full case-study body.
 *
 * Sections (each <section id="…"> matches an entry in `SECTIONS` below so the
 * sticky CaseStudySidebar can highlight the active one):
 *   overview · highlights · context · problem · process · visual · final · retro
 */

import HeroHeading from '@/components/typography/HeroHeading'
import SectionLabel from '@/components/typography/SectionLabel'
import FigureCaption from '@/components/project/FigureCaption'

export const LAUNCH_PARAMETERS_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The Problem' },
  { id: 'process', label: 'Process' },
  { id: 'visual', label: 'Visual Design' },
  { id: 'final', label: 'Final Designs' },
  { id: 'retro', label: 'Retrospective' },
]

export default function LaunchParametersCaseStudy() {
  return (
    <div className="space-y-24">
      <Overview />
      <Highlights />
      <Context />
      <Problem />
      <Process />
      <VisualDesign />
      <FinalDesigns />
      <Retrospective />
    </div>
  )
}

// ── 1. Overview ───────────────────────────────────────────────────────────

function Overview() {
  return (
    <section id="overview" className="scroll-mt-24">
      <SectionLabel className="mb-4">Overview</SectionLabel>
      <HeroHeading
        sans="Launch parameters in"
        accent="one click from Earth."
        size="md"
        className="mb-8"
      />

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-6 text-[15px] leading-relaxed">
        <Meta label="My Role" value="Solo Engineer · Product Designer" />
        <p className="text-bone-muted">
          Sole engineer and product designer, responsible for the orbital physics
          engine, TypeScript web rebuild, 3D globe interaction, dashboard-ready
          exports, visualization layer, and Power BI support package.
        </p>

        <Meta label="Team" value="Solo" />
        <p className="text-bone-muted">
          Concept originally prototyped as a Python CLI toolkit in 2022 during
          undergrad. Reconstructed, expanded, and ported to a full interactive
          web app in 2026. Current status: shipped locally, ready for GitHub
          publication.
        </p>

        <Meta label="Stack" value="React · TypeScript · Three.js · Python · Open-Meteo · Nominatim" />
        <p className="text-bone-muted">
          React + Vite web app backed by a TypeScript physics engine. The globe
          is rendered with Three.js / react-three-fiber / drei using a NASA Blue
          Marble texture. Live elevation comes from the Open-Meteo Elevation API;
          reverse geocoding from OpenStreetMap Nominatim. The v1 toolkit is pure
          Python with matplotlib and Power BI export support.
        </p>

        <Meta label="Timeline" value="2022 prototype → 2026 web rebuild" />
        <p className="text-bone-muted">
          Launch Parameters is an interactive launch-planning tool where a user
          clicks any point on Earth and gets mission parameters for reaching orbit
          or departing toward another planet. It estimates launch azimuth,
          rotation assist, delta-v, launch windows, propellant mass, and
          trajectory geometry from the chosen location, payload, destination, and
          vehicle configuration. The project started as a dashboard-style
          analytics concept and became a hostable web app because the key
          experience needed to be spatial: pick a real place, see the Earth, and
          understand why geography changes the launch.
        </p>
      </div>
    </section>
  )
}

// ── 2. Highlights ─────────────────────────────────────────────────────────

function Highlights() {
  return (
    <section id="highlights" className="scroll-mt-24">
      <SectionLabel className="mb-4">Highlights</SectionLabel>
      <HeroHeading
        sans="Any point on Earth,"
        accent="a live orbital estimate."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-10 max-w-2xl">
        Launch Parameters turns an arbitrary point on Earth into a live orbital
        mission estimate, combining a{' '}
        <span className="text-bone">physics engine</span>, 3D globe, dashboard
        charts, and open geospatial data. Click a coordinate, get launch azimuth,
        rotation assist, delta-v budget, propellant mass, and launch window,
        without touching a form.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <MetricTile
          value="102"
          label="Validated calculations"
          sub="46 Python + 56 TypeScript tests"
          color="cyan"
        />
        <MetricTile
          value="Any"
          label="lat/lon point"
          sub="No predefined site list required"
          color="cyan"
        />
        <MetricTile
          value="6 CSVs"
          label="+ 4 chart types"
          sub="Dashboard-ready Power BI exports"
          color="cyan"
        />
      </div>

      <div className="space-y-5 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="102 tests across two runtimes.">
          46 Python tests cover the v1 computation toolkit: Earth rotation
          assist, vis-viva, Hohmann transfers, launch windows, rocket equation
          staging, and CSV export validation. 56 TypeScript tests cover the web
          app engine, globe helpers, mission solver, analysis charts, and live
          data logic.
        </Point>
        <Point title="Any lat/lon point, computed in-place.">
          The final web app is not limited to predefined launch sites. It
          computes launch parameters for the exact clicked coordinate (with elevation
          from Open-Meteo and place name from Nominatim) while still showing the
          nearest cataloged site as reference.
        </Point>
        <Point title="6 CSV datasets, 4 static chart types.">
          The v1 export layer supports dashboard workflows with scenario
          summaries, launch windows, payload sweeps, site comparisons, planetary
          data, and launch-site catalogs. Four matplotlib chart types: delta-v
          budget, payload curve, site comparison, and transfer geometry. All
          data is Power BI–ready.
        </Point>
      </div>

      <div className="mt-10 w-full">
        <div className="rounded-xl overflow-hidden border border-ink-border bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/projects/launch-parameters/02-selected-location-dashboard.png"
            alt="Launch Parameters: selected location with trajectory and full dashboard"
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
        <FigureCaption
          number="2.0"
          label="A clicked point becomes a full mission briefing: pin, orbit, azimuth, delta-v, propellant, launch window."
          kind="screenshot"
        />
      </div>
    </section>
  )
}

// ── 3. Context ────────────────────────────────────────────────────────────

function Context() {
  return (
    <section id="context" className="scroll-mt-24">
      <SectionLabel className="mb-4">Context</SectionLabel>
      <HeroHeading
        sans="Geography is the"
        accent="missing variable in launch math."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        Before this project, the original dashboard idea had a common problem:
        the analysis could work, but the interface was too abstract. A launch
        site is not just a dropdown. Latitude, longitude, elevation, Earth
        rotation, orbit inclination, and destination geometry all matter. A
        static dashboard can show the outputs, but it does not make the user{' '}
        <span className="text-bone">feel the geography</span>. The gap was an
        interface that connected the physical Earth to the math.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <QuoteCard
          source="NASA JPL Horizons API documentation"
          quote="Horizons provides programmatic access to solar-system ephemerides, which validates the need for public planetary data in mission-planning tools."
          context="Validates open planetary data as a foundation"
        />
        <QuoteCard
          source="Open-Meteo Elevation API"
          quote="The API accepts latitude/longitude and returns terrain elevation, directly matching the project need to enrich arbitrary click points with elevation data."
          context="Exact API match for the any-point requirement"
        />
        <QuoteCard
          source="OpenStreetMap Nominatim Reverse API"
          quote="Nominatim finds a nearby suitable OSM object rather than a perfect address for the coordinate, shaping the 'rough demographic area name' behavior."
          context="Drove the graceful place-name fallback design"
        />
        <QuoteCard
          source="NASA SRTM / OpenTopography"
          quote="Near-global elevation datasets like SRTM show that terrain-aware launch estimates can be built on open data instead of proprietary map services."
          context="Confirmed open-data viability"
        />
        <QuoteCard
          source="Real user feedback from build review"
          quote="I don't just need the lat and long; I also need the rough demographic area name. The elevation also matters."
          context="Directly drove live elevation + place-name lookup into v2"
          spanFull
        />
      </div>
      <FigureCaption number="1.0" label="Demand signals." kind="diagram" />
    </section>
  )
}

// ── 4. The Problem ────────────────────────────────────────────────────────

function Problem() {
  return (
    <section id="problem" className="scroll-mt-24">
      <SectionLabel className="mb-4">The Problem</SectionLabel>
      <HeroHeading
        sans="Five constraints,"
        accent="one spatial product."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        <ConstraintCard
          n="1"
          title="Static hosting"
          body="The portfolio version needed to run as a client-side app without a custom backend. All computation runs in the browser."
          color="cyan"
        />
        <ConstraintCard
          n="2"
          title="Real physics, readable UI"
          body="The math needed to be defensible, but the interface still had to feel like a dashboard, not a physics textbook."
          color="cyan"
        />
        <ConstraintCard
          n="3"
          title="Any-point selection"
          body="The project could not depend only on famous launch sites. Clicked coordinates needed meaningful outputs computed in-place."
          color="cyan"
        />
        <ConstraintCard
          n="4"
          title="Open-data only"
          body="Google Earth-style data was desirable, but the implementation had to avoid paid or fragile APIs. Open-Meteo and Nominatim fit."
          color="cyan"
        />
        <ConstraintCard
          n="5"
          title="Visual density"
          body="Labels, panels, charts, Earth texture, trajectory, and mission controls all had to coexist without hiding each other."
          color="cyan"
        />
      </div>

      <SectionLabel className="mb-4">North-star principles</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <PrincipleCard
          title="Make geography first-class"
          body="The user starts by choosing a place, not by filling out a form. The Earth is the UI."
        />
        <PrincipleCard
          title="Show the budget, not just the answer"
          body="Delta-v, fuel, launch window, and trajectory all explain the result. The output is a mission briefing, not a number."
        />
        <PrincipleCard
          title="Use honest approximations"
          body="Simplify where needed, but name the simplification and keep the calculations defensible: educational, not flight-certified."
        />
      </div>
    </section>
  )
}

// ── 5. Process ────────────────────────────────────────────────────────────

function Process() {
  return (
    <section id="process" className="scroll-mt-24">
      <SectionLabel className="mb-4">Process</SectionLabel>
      <HeroHeading
        sans="Five iterations to make"
        accent="geography feel like physics."
        size="md"
        className="mb-10"
      />

      <div className="space-y-12">
        <Pivot
          version="Iteration 1"
          title="The computation core (Python v1)."
          body="The first rebuild focused on the engine rather than visuals: Python modules for Earth rotation assist, vis-viva, Hohmann transfers, launch windows, rocket equation staging, validation, CLI output, CSV exports, and matplotlib charts. The weakness was obvious: it was accurate and dashboard-ready, but it did not yet feel like the spatial product the concept needed."
          color="cyan"
        />

        <Pivot
          version="Iteration 2"
          title="Web foundation and the first globe."
          body={"The physics was ported to TypeScript and wrapped in a React/Vite app. The first globe was too plain, almost a blue sphere with dots. That changed after feedback: \"I don't see Earth, I only see a blue colored globe.\" The fix was a real NASA Blue Marble texture, launch site labels, country/region/city labels, collision spacing, and a click-to-pin interaction."}
          color="cyan"
        />

        <div className="w-full">
          <div className="rounded-xl overflow-hidden border border-ink-border bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/launch-parameters/01-default-globe.png"
              alt="Default globe state — rotating Earth, grating, labeled launch sites"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
          <FigureCaption
            number="3.2"
            label="Iteration 2 result: NASA Blue Marble texture, graticule, launch-site + region labels."
            kind="screenshot"
          />
        </div>

        <Pivot
          version="Iteration 3"
          title="Exact-point mission planning."
          body="Initially the globe mostly showed the nearest launch site. That missed the core idea. The pivot was to compute launch parameters for the exact clicked coordinate, while still showing the nearest cataloged site as reference. Any coordinate now drives the full physics engine."
          color="cyan"
        />

        <Pivot
          version="Iteration 4"
          title="Usability polish: labels vs panels."
          body="Several visual bugs came from the Three.js/drei HTML label layer fighting with the HUD panels. Labels covered controls, panels looked missing, and the pin scaled oddly at different zoom levels. The fix was stacking-context isolation, opaque panels, click-vs-drag detection, constant screen-size pin scaling, and label collision filtering."
          color="cyan"
        />

        <Pivot
          version="Iteration 5"
          title="Dashboard completion."
          body="Mission controls, trajectory rendering, analysis charts, live elevation, place-name lookup, and hosting setup were added as feature branches. At that point the app stopped being a globe demo and became a usable launch dashboard."
          color="cyan"
        />

        <div className="border-l-2 border-cyan-500/30 pl-4 py-2 max-w-2xl">
          <div className="text-cyan-400 text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            The hardest bug
          </div>
          <p className="text-bone-muted text-[14.5px] leading-relaxed">
            The surprising part was that the hardest polish work was{' '}
            <span className="text-bone">not orbital mechanics</span>. It was
            interface layering: drei HTML labels, WebGL canvas transparency,
            panel stacking, and label collision all made the app feel either
            broken or polished depending on z-index. Several hours of debugging
            were spent on rendering, not physics.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 mt-12">
        <BeforeAfter
          number="3.0"
          title="Globe appearance"
          beforeLabel="Before: generic sphere"
          before="A plain blue sphere with dot markers. No texture, no labels, no sense of actual Earth geography."
          afterLabel="After: NASA Blue Marble"
          after="Real NASA Blue Marble texture, graticule, launch site labels, country/region names, and collision-filtered city labels."
          color="cyan"
        />
        <BeforeAfter
          number="3.1"
          title="Mission computation target"
          beforeLabel="Before: nearest site readout"
          before="Clicked point mostly referenced a nearby cataloged launch site. The selected coordinate itself was not the computation input."
          afterLabel="After: exact coordinate input"
          after="The clicked lat/lon drives the full physics engine. Live elevation and place name enrich the point. Nearest site shown as reference only."
          color="cyan"
        />
        <BeforeAfter
          number="3.2"
          title="HUD / label layering"
          beforeLabel="Before: labels over panels"
          before="Drei HTML labels leaked over the mission control panels. Controls were partially hidden and the layout felt broken."
          afterLabel="After: clean stacking"
          after="Labels live behind the HUD via stacking-context isolation. Label collision logic thins out crowded areas. Panels are fully opaque and always accessible."
          color="cyan"
        />
      </div>
    </section>
  )
}

// ── 6. Visual Design ──────────────────────────────────────────────────────

function VisualDesign() {
  return (
    <section id="visual" className="scroll-mt-24">
      <SectionLabel className="mb-4">Visual Design</SectionLabel>
      <HeroHeading
        sans="Mission control HUD"
        accent="over a real Earth."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        The key branded moment is a grey mission-control HUD over a real Earth,
        with a small pin, graticule, labels, and trajectory overlay. It should
        feel{' '}
        <span className="text-bone italic font-serif">
          operational and technical
        </span>
        , not like a landing page. Dark panels with monospace readouts, a real
        Earth texture, and muted accent colors keep the aesthetic grounded in
        aerospace tooling.
      </p>

      {/* Architecture flow */}
      <div className="bg-ink-raised border border-ink-border rounded-xl p-6 mb-6">
        <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-4">
          System architecture flow
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 text-[13px] font-mono">
          {[
            'Click Earth point',
            'Live data lookup\n(elevation · place name)',
            'Mission config\n(payload · destination · vehicle)',
            'Physics engine\n(azimuth · delta-v · window · mass)',
            'Outputs\n(trajectory · charts · CSVs)',
          ].map((step, i, arr) => (
            <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-0">
              <div className="bg-ink-high border border-ink-border rounded-lg px-3 py-2 text-bone-muted whitespace-pre-line leading-snug">
                {step}
              </div>
              {i < arr.length - 1 && (
                <div className="text-bone-dim text-lg px-3 hidden sm:block">→</div>
              )}
              {i < arr.length - 1 && (
                <div className="text-bone-dim text-lg py-1 sm:hidden">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <FigureCaption number="5.0" label="Architecture flow: click → enrich → configure → compute → output." kind="diagram" />

      {/* Sub-diagrams */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
        <div className="bg-ink-raised border border-ink-border rounded-xl p-5">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Physics pipeline
          </div>
          <pre className="text-[12px] leading-[1.7] text-bone-muted font-mono whitespace-pre-wrap">
{`Inputs
  lat · lon · elevation
  payload · vehicle
  destination

↓
Rotation assist
  (Earth surface speed)
Launch azimuth
  (orbital inclination)
Orbit velocity
  (vis-viva equation)
Ascent losses
  (gravity + drag est.)
Transfer delta-v
  (Hohmann)
Propellant mass
  (Tsiolkovsky / staging)`}
          </pre>
        </div>

        <div className="bg-ink-raised border border-ink-border rounded-xl p-5">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Data flow
          </div>
          <pre className="text-[12px] leading-[1.7] text-bone-muted font-mono whitespace-pre-wrap">
{`Static catalogs
  planetary data
  launch site list

Open-Meteo API
  elevation lookup

Nominatim API
  place name lookup

↓ TypeScript mission solver ↓

UI panels
  location · mission · analysis

Globe overlays
  pin · trajectory · labels

Export
  CSV · Power BI`}
          </pre>
        </div>

        <div className="bg-ink-raised border border-ink-border rounded-xl p-5">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            UI state machine
          </div>
          <pre className="text-[12px] leading-[1.7] text-bone-muted font-mono whitespace-pre-wrap">
{`No selection
  globe idle · labels visible

Click detected
  pin dropped
  live data loading

Earth orbit selected
  orbit ring rendered
  budget computed

Interplanetary selected
  escape path rendered
  transfer window shown

Live data unavailable
  fallback gracefully
  mission still computes`}
          </pre>
        </div>
      </div>
      <FigureCaption number="5.1" label="Physics pipeline · data flow · UI states." kind="diagram" />

      {/* Analysis panel description */}
      <div className="mt-10 max-w-2xl text-bone-muted text-[14.5px] leading-relaxed">
        <p>
          The Analysis panel surfaces the physics pipeline as a readable
          briefing: a delta-v budget bar, the liftoff-mass breakdown by
          stage, and a propellant-vs-payload sweep. Every value traces back
          to the same engine that the v1 Python toolkit validates against
          its 46-test suite.
        </p>
      </div>
    </section>
  )
}

// ── 7. Final Designs ──────────────────────────────────────────────────────

function FinalDesigns() {
  return (
    <section id="final" className="scroll-mt-24">
      <SectionLabel className="mb-4">Final Designs</SectionLabel>
      <HeroHeading
        sans="What shipped:"
        accent="orbit and interplanetary, in two frames."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed max-w-2xl mb-10">
        The product shipped as a hostable single-page web app. The earlier
        sections already covered the default globe, the selected-location
        dashboard, the analysis panel, and the mission-control panel; what
        follows are the two frames that close the story: a trajectory close-up
        and the interplanetary mode.
      </p>

      {/* Frame 1 — trajectory close-up */}
      <div className="max-w-2xl mx-auto">
        <img
          src="/projects/launch-parameters/03-trajectory-globe-detail.png"
          alt="Launch Parameters — trajectory globe detail view"
          className="w-full h-auto block"
          loading="lazy"
        />
        <FigureCaption
          number="7.0"
          label="Trajectory detail — orbit ring rendered on the rotated globe; pin stays screen-size stable."
          kind="screenshot"
        />
      </div>

      {/* Frame 2 — interplanetary */}
      <div className="mt-8 max-w-2xl mx-auto">
        <img
          src="/projects/launch-parameters/04-interplanetary-target.png"
          alt="Launch Parameters — interplanetary target (Mars) selected"
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
      <FigureCaption
        number="7.1"
        label="Interplanetary mode — Mars target: 13.04 km/s delta-v, 1,360,228 kg propellant, launch window Nov 2026."
        kind="screenshot"
      />

      {/* Edge cases */}
      <div className="mt-14">
        <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-5">
          Edge cases handled
        </div>
        <div className="space-y-4 max-w-2xl">
          <EdgeCase
            title="Equatorial launch windows."
            body="An equatorial orbit launched from the equator produces a degenerate plane-crossing calculation. The solver handles that case explicitly instead of dividing by zero."
          />
          <EdgeCase
            title="Click vs drag detection."
            body="The globe only drops a pin on a clean click — dragging to rotate does not accidentally change the launch point. Movement threshold is tracked per-pointer-down event."
          />
          <EdgeCase
            title="Unavailable live data."
            body="If Open-Meteo elevation or Nominatim reverse-geocoding fails, the app falls back gracefully (zero elevation, coordinate string as name) instead of blocking the mission calculation."
          />
        </div>
      </div>

      {/* Hard numbers */}
      <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatTile value="102" label="Total tests" sub="46 Python + 56 TS" />
        <StatTile value="1.04 MB" label="JS bundle" sub="Production build" />
        <StatTile value="2.57 MB" label="Earth texture" sub="NASA Blue Marble" />
        <StatTile value="6 CSVs" label="Export datasets" sub="Power BI ready" />
      </div>
    </section>
  )
}

// ── 8. Retrospective ──────────────────────────────────────────────────────

function Retrospective() {
  return (
    <section id="retro" className="scroll-mt-24">
      <SectionLabel className="mb-4">Retrospective</SectionLabel>
      <HeroHeading
        sans="What worked,"
        accent="what I'd ship differently."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RetroColumn title="Worked">
          <RetroItem
            head="v1 Python → v2 TypeScript split."
            body="Keeping the Python toolkit as the validated analytics base while building the TypeScript web app as a separate product meant both could evolve independently. The v1 tests validated the physics before anything was rendered."
          />
          <RetroItem
            head="Globe-first interaction."
            body="Starting with 'pick a place on Earth' instead of 'fill out a form' made the project far more memorable than a normal dashboard. Geography as the primary UI was the right call."
          />
          <RetroItem
            head="Feature-branch workflow."
            body="Foundation → globe → mission controls → trajectory → charts → live data → hosting → visual fixes. Each branch was reviewable on its own and kept the rebuild readable even as scope grew."
          />
        </RetroColumn>

        <RetroColumn title="Would change">
          <RetroItem
            head="Design the HUD layout earlier."
            body="Panels accumulated around the globe organically, which caused the layering bugs in Iteration 4. A HUD layout spec from the start would have prevented several hours of z-index debugging."
          />
          <RetroItem
            head="Decide on map tiles vs texture earlier."
            body="A single Earth texture works well and avoids paid API dependencies, but it is not Google Earth-level zoom. That trade-off should be a day-one decision, not a late discovery."
          />
          <RetroItem
            head="Separate rendering diagnostics from product logic."
            body="Several bugs were caused by WebGL/HTML layering rather than physics. A dedicated rendering-debug mode from the start would have surfaced those faster."
          />
        </RetroColumn>
      </div>

      <div className="mt-12 border-l-2 border-cyan-500/30 pl-5 py-3 max-w-2xl">
        <div className="text-cyan-400 text-[11px] uppercase tracking-eyebrow font-mono mb-2">
          The biggest surprise
        </div>
        <p className="text-bone-muted text-[14.5px] leading-relaxed">
          <span className="text-bone">The hardest part was not orbital mechanics.</span>{' '}
          It was interface layering. Drei HTML labels, WebGL canvas transparency,
          panel stacking, and label collision made the app feel either broken or
          polished, and the difference between the two was entirely in rendering
          code, not physics.{' '}
          <span className="italic font-serif text-bone">
            The math was the easy part.
          </span>
        </p>
      </div>

      <div className="mt-12 text-bone-muted text-[14px] leading-relaxed max-w-2xl space-y-3">
        <p>
          <span className="text-bone-dim uppercase tracking-eyebrow text-[10.5px] font-mono mr-2">
            Status
          </span>
          Shipped locally. All tests passing. Production build verified at 1.04 MB
          JS. Ready for GitHub publication (no third-party API keys required for
          core physics; live elevation and place-name lookups degrade gracefully
          if APIs are unavailable).
        </p>
        <p>
          <span className="text-bone-dim uppercase tracking-eyebrow text-[10.5px] font-mono mr-2">
            Not claimed
          </span>
          This is an educational / analytical tool. The physics is defensible but
          not aerospace-certified. No claims of mission-grade accuracy, live JPL
          Horizons integration, or Google Earth-level map tiles.
        </p>
      </div>
    </section>
  )
}

// ── shared helpers ────────────────────────────────────────────────────────

function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-1.5">
        {label}
      </div>
      <div className="text-bone text-[14px]">{value}</div>
    </div>
  )
}

function MetricTile({
  value,
  label,
  sub,
  color = 'bone',
}: {
  value: string
  label: string
  sub?: string
  color?: 'cyan' | 'amber' | 'emerald' | 'bone'
}) {
  const colorMap = {
    bone: 'text-bone',
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
  }
  return (
    <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
      <div className={`font-sans font-medium ${colorMap[color]} text-3xl tracking-tightish mb-2 leading-none`}>
        {value}
      </div>
      <div className="text-bone-muted text-sm">{label}</div>
      {sub && <div className="text-bone-dim text-xs mt-1.5">{sub}</div>}
    </div>
  )
}

function Point({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-bone font-medium mb-1.5">{title}</div>
      <div className="text-bone-muted">{children}</div>
    </div>
  )
}

function QuoteCard({
  source,
  quote,
  context,
  spanFull = false,
}: {
  source: string
  quote: string
  context?: string
  spanFull?: boolean
}) {
  return (
    <div
      className={`bg-ink-raised border border-ink-border rounded-xl p-5 ${
        spanFull ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow font-mono mb-2">
        {source}
      </div>
      <blockquote className="text-bone text-[14.5px] leading-snug italic font-serif">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {context && (
        <div className="text-bone-muted text-[12px] mt-3">{context}</div>
      )}
    </div>
  )
}

function ConstraintCard({
  n,
  title,
  body,
  color = 'amber',
}: {
  n: string
  title: string
  body: string
  color?: 'cyan' | 'amber' | 'emerald'
}) {
  const colorMap = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
  }
  const cls = colorMap[color]
  return (
    <div className="bg-ink-raised border border-ink-border rounded-lg p-4 flex items-start gap-3">
      <span className={`w-8 h-8 rounded-md ${cls} flex items-center justify-center text-sm font-mono shrink-0`}>
        {n}
      </span>
      <div>
        <div className="text-bone text-sm font-medium mb-1.5">{title}</div>
        <div className="text-bone-muted text-[13px] leading-relaxed">{body}</div>
      </div>
    </div>
  )
}

function PrincipleCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-ink-raised border border-ink-border rounded-lg p-5">
      <div className="text-bone font-medium text-[14.5px] mb-2 italic font-serif">
        {title}.
      </div>
      <div className="text-bone-muted text-[13px] leading-relaxed">{body}</div>
    </div>
  )
}

function Pivot({
  version,
  title,
  body,
  color = 'emerald',
}: {
  version: string
  title: string
  body: React.ReactNode
  color?: 'cyan' | 'amber' | 'emerald'
}) {
  const colorMap = {
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
  }
  return (
    <div className="max-w-2xl">
      <div className="flex items-baseline gap-3 mb-2">
        <span className={`${colorMap[color]} text-[11px] uppercase tracking-eyebrow font-mono`}>
          {version}
        </span>
        <h4 className="text-bone font-medium text-base">{title}</h4>
      </div>
      <p className="text-bone-muted text-[14.5px] leading-relaxed">{body}</p>
    </div>
  )
}

function BeforeAfter({
  number,
  title,
  beforeLabel,
  before,
  afterLabel,
  after,
  color = 'emerald',
}: {
  number: string
  title: string
  beforeLabel: string
  before: string
  afterLabel: string
  after: string
  color?: 'cyan' | 'amber' | 'emerald'
}) {
  const borderMap = {
    cyan: 'border-cyan-500/20',
    amber: 'border-amber-500/20',
    emerald: 'border-emerald-500/20',
  }
  const textMap = {
    cyan: 'text-cyan-300',
    amber: 'text-amber-300',
    emerald: 'text-emerald-300',
  }
  return (
    <div>
      <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
        {title}
      </div>
      <div className="grid grid-cols-2 gap-4 items-stretch">
        <div className="bg-ink-raised border border-ink-border rounded-lg p-4">
          <div className="text-bone-muted text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            {beforeLabel}
          </div>
          <p className="text-bone-muted text-[13px] leading-relaxed">{before}</p>
        </div>
        <div className={`bg-ink-raised border ${borderMap[color]} rounded-lg p-4`}>
          <div className={`${textMap[color]} text-[11px] uppercase tracking-eyebrow font-mono mb-1`}>
            {afterLabel}
          </div>
          <p className="text-bone-muted text-[13px] leading-relaxed">{after}</p>
        </div>
      </div>
      <FigureCaption number={number} label="" kind="diagram" />
    </div>
  )
}

function FrameCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="bg-ink-raised border border-ink-border rounded-xl p-5 flex gap-5">
      <div className="text-bone-dim font-mono text-[11px] shrink-0 pt-0.5 w-8">{number}</div>
      <div>
        <div className="text-bone font-medium text-[14.5px] mb-1.5">{title}</div>
        <p className="text-bone-muted text-[13.5px] leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function EdgeCase({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-bone-dim shrink-0 mt-2" />
      <div>
        <span className="text-bone text-[14px] font-medium">{title}</span>{' '}
        <span className="text-bone-muted text-[14px]">{body}</span>
      </div>
    </div>
  )
}

function StatTile({
  value,
  label,
  sub,
}: {
  value: string
  label: string
  sub?: string
}) {
  return (
    <div className="bg-ink-raised border border-ink-border rounded-xl p-5">
      <div className="font-sans font-medium text-bone text-2xl tracking-tightish mb-1 leading-none">
        {value}
      </div>
      <div className="text-bone-muted text-sm">{label}</div>
      {sub && <div className="text-bone-dim text-xs mt-1">{sub}</div>}
    </div>
  )
}

function RetroColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
      <h4 className="text-bone font-medium mb-4 text-sm uppercase tracking-eyebrow">
        {title}
      </h4>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function RetroItem({ head, body }: { head: string; body: string }) {
  return (
    <div>
      <div className="text-bone text-[14px] font-medium mb-1">{head}</div>
      <p className="text-bone-muted text-[13px] leading-relaxed">{body}</p>
    </div>
  )
}
