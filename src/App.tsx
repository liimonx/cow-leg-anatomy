import { useMemo, useState } from "react";

import {
  CowHoofFootSvg,
  type HoofFootSectionId,
} from "./components/CowHoofFootSvg";
import {
  CowHoofSideFootSvg,
  type HoofSideFootSectionId,
} from "./components/CowHoofSideFootSvg";
import { CowLegSvg, type LegSectionId } from "./components/CowLegSvg";
import { COW_ANATOMY_ID_MAP } from "./components/cowAnatomyIdMap";
import styles from "./App.module.css";

type ClickEvent = {
  component: "hoof-foot" | "hoof-side-foot" | "leg";
  sectionId: string;
  sectionNumber: number;
};

export default function App() {
  const [showHitboxes, setShowHitboxes] = useState(false);
  const [styleTestEnabled, setStyleTestEnabled] = useState(false);
  const [lastClick, setLastClick] = useState<ClickEvent | null>(null);

  const [activeHoofFootSectionIds, setActiveHoofFootSectionIds] = useState<
    HoofFootSectionId[]
  >([]);
  const [activeHoofSideSectionIds, setActiveHoofSideSectionIds] = useState<
    HoofSideFootSectionId[]
  >([]);
  const [activeLegSectionIds, setActiveLegSectionIds] = useState<
    LegSectionId[]
  >([]);

  const [clickLog, setClickLog] = useState<ClickEvent[]>([]);

  const hoofFootSectionClasses = useMemo(
    () =>
      styleTestEnabled
        ? ({ "hoof-foot-top-4": styles.sectionStyleTest } satisfies Partial<
            Record<HoofFootSectionId, string>
          >)
        : undefined,
    [styleTestEnabled],
  );

  const handleClick = (event: ClickEvent) => {
    setLastClick(event);
    setClickLog((previous) => [event, ...previous].slice(0, 8));
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Cow Anatomy Interactive SVG Components</h1>
        <p>
          Click any numbered section to trigger a callback with section number +
          section ID.
        </p>
      </header>

      <div className={styles.topSection}>
        <section className={styles.controls}>
          <button
            type="button"
            onClick={() => setShowHitboxes((value) => !value)}
          >
            {showHitboxes ? "Hide Hitboxes" : "Show Hitboxes"}
          </button>
          <button
            type="button"
            onClick={() => setStyleTestEnabled((value) => !value)}
          >
            {styleTestEnabled
              ? "Disable Style Test"
              : "Style Test: Recolor section hoof-foot-top-4 only"}
          </button>
        </section>

        <section className={styles.statusPanel}>
          <h2>Click Test Output</h2>
          <p>
            {lastClick
              ? `[${lastClick.component}] #${lastClick.sectionNumber} (${lastClick.sectionId})`
              : "No section clicked yet. Waiting for input..."}
          </p>
          <ul>
            {clickLog.map((event, index) => (
              <li key={`${event.component}-${event.sectionId}-${index}`}>
                {`${event.component} \u2192 #${event.sectionNumber} (${event.sectionId})`}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className={styles.diagramGrid}>
        <article className={styles.card}>
          <h3>Hoof Foot</h3>
          <CowHoofFootSvg
            className={styles.diagram}
            showHitboxes={showHitboxes}
            activeSectionIds={activeHoofFootSectionIds}
            sectionClassNames={hoofFootSectionClasses}
            onSectionClick={({ sectionId, sectionNumber }) => {
              setActiveHoofFootSectionIds([sectionId]);
              handleClick({ component: "hoof-foot", sectionId, sectionNumber });
            }}
          />
        </article>

        <article className={styles.card}>
          <h3>Hoof Side Foot</h3>
          <CowHoofSideFootSvg
            className={styles.diagram}
            showHitboxes={showHitboxes}
            activeSectionIds={activeHoofSideSectionIds}
            onSectionClick={({ sectionId, sectionNumber }) => {
              setActiveHoofSideSectionIds([sectionId]);
              handleClick({
                component: "hoof-side-foot",
                sectionId,
                sectionNumber,
              });
            }}
          />
        </article>

        <article className={styles.card}>
          <h3>Leg</h3>
          <CowLegSvg
            className={styles.legDiagram}
            showHitboxes={showHitboxes}
            activeSectionIds={activeLegSectionIds}
            onSectionClick={({ sectionId, sectionNumber }) => {
              setActiveLegSectionIds([sectionId]);
              handleClick({ component: "leg", sectionId, sectionNumber });
            }}
          />
        </article>
      </section>

      <section className={styles.idMap}>
        <h2>ID Map References</h2>
        <p>
          All semantic section IDs exported from each component mapped below:
        </p>
        <div className={styles.idMapContainer}>
          <div>
            <h3>CowHoofFootSvg</h3>
            <code>{COW_ANATOMY_ID_MAP.cowHoofFoot.join("\n")}</code>
          </div>
          <div>
            <h3>CowHoofSideFootSvg</h3>
            <code>{COW_ANATOMY_ID_MAP.cowHoofSideFoot.join("\n")}</code>
          </div>
          <div>
            <h3>CowLegSvg</h3>
            <code>{COW_ANATOMY_ID_MAP.cowLeg.join("\n")}</code>
          </div>
        </div>
      </section>
    </main>
  );
}
