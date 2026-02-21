import { type SVGProps } from "react";

import styles from "./cow-anatomy.module.css";

export type HoofSideFootSectionId =
  | "hoof-side-top-7"
  | "hoof-side-top-8"
  | "hoof-side-top-9"
  | "hoof-side-bottom-11"
  | "hoof-side-bottom-12";

export const HOOF_SIDE_FOOT_SECTION_IDS: HoofSideFootSectionId[] = [
  "hoof-side-top-7",
  "hoof-side-top-8",
  "hoof-side-top-9",
  "hoof-side-bottom-11",
  "hoof-side-bottom-12",
];

export type HoofSideFootSectionClick = {
  sectionId: HoofSideFootSectionId;
  sectionNumber: number;
};

export type CowHoofSideFootSvgProps = Omit<SVGProps<SVGSVGElement>, "onClick"> & {
  onSectionClick?: (section: HoofSideFootSectionClick) => void;
  activeSectionIds?: ReadonlyArray<HoofSideFootSectionId>;
  sectionClassNames?: Partial<Record<HoofSideFootSectionId, string>>;
  showHitboxes?: boolean;
};

type SectionDef = {
  id: HoofSideFootSectionId;
  number: number;
  d: string;
  cx: number;
  cy: number;
  textClassName?: string;
};

const TOP_OUTER_PATH =
  "M253.332 143.335C210.937 191.2 110.876 296.618 63.5801 341.634C188.942 338.785 426.494 342.893 448.212 336.506C477.273 327.958 506.334 305.735 511.462 264.708C516.551 223.997 508.487 189.491 516.591 162.139C524.695 134.788 542.233 109.146 552.49 104.017L359.319 6.57715C343.934 31.6494 295.727 95.4698 253.332 143.335Z";

const BOTTOM_LEFT_OUTER_PATH =
  "M279.641 388.059C237.246 435.924 137.185 541.341 89.8892 586.358C145.087 585.103 196.796 585.487 267.475 585.376L380.385 428.618L279.641 388.059Z";

const BOTTOM_RIGHT_OUTER_PATH =
  "M472.467 582.088C509.876 571.984 534.951 545.913 538.971 496.851L380.385 429.714L267.475 585.376C357.319 585.236 460.235 585.391 472.467 582.088Z";

const TOP_DIVIDER_PATHS = [
  "M253.332 143.335L512.662 251.032",
  "M241.366 339.926L355.901 184.364",
];

const BOTTOM_DIVIDER_PATHS = ["M216 586L374 543"];

const SECTIONS: SectionDef[] = [
  {
    id: "hoof-side-top-7",
    number: 7,
    d: "M 67.250 339.250 L 163.750 241.750 L 253.250 145.000 L 352.750 185.750 L 240.500 339.250 Z",
    cx: 222.531,
    cy: 253.224,
  },
  {
    id: "hoof-side-top-8",
    number: 8,
    d: "M 243.750 338.250 L 355.250 187.000 L 511.500 252.250 L 508.000 277.750 L 502.000 293.000 L 494.000 305.500 L 474.000 323.750 L 450.000 335.000 L 426.250 337.750 L 380.000 339.000 Z",
    cx: 397.924,
    cy: 270.764,
  },
  {
    id: "hoof-side-top-9",
    number: 9,
    d: "M 255.500 142.250 L 317.000 67.750 L 359.500 8.250 L 549.750 104.250 L 540.250 113.500 L 530.250 128.000 L 515.000 163.250 L 512.000 181.750 L 511.750 249.000 Z",
    cx: 426.426,
    cy: 115.102,
  },
  {
    id: "hoof-side-bottom-11",
    number: 11,
    d: "M 93.250 584.500 L 186.000 490.750 L 279.500 389.750 L 378.000 430.000 L 279.750 566.750 L 275.500 568.500 L 276.500 571.000 L 267.000 584.000 L 222.500 584.250 L 221.000 582.500 L 213.250 584.250 Z",
    cx: 244.455,
    cy: 509.738,
    textClassName: styles.indicatorTextSmall,
  },
  {
    id: "hoof-side-bottom-12",
    number: 12,
    d: "M 270.250 583.500 L 280.000 570.000 L 285.750 567.500 L 283.500 565.750 L 284.250 564.000 L 381.250 431.250 L 537.750 497.750 L 533.000 524.000 L 520.750 549.250 L 502.000 567.750 L 476.500 580.000 L 455.500 582.750 L 402.750 584.000 Z",
    cx: 422.041,
    cy: 518.507,
    textClassName: styles.indicatorTextSmall,
  },
];

function cx(...classNames: Array<string | undefined | false>): string {
  return classNames.filter(Boolean).join(" ");
}

export function CowHoofSideFootSvg({
  className,
  onSectionClick,
  activeSectionIds = [],
  sectionClassNames,
  showHitboxes = false,
  ...svgProps
}: CowHoofSideFootSvgProps) {
  const handleSectionClick = (sectionId: HoofSideFootSectionId, sectionNumber: number) => {
    onSectionClick?.({ sectionId, sectionNumber });
  };

  return (
    <svg
      {...svgProps}
      className={cx(styles.root, showHitboxes && styles.showHitboxes, className)}
      viewBox="0 0 680 597"
      role="img"
      aria-label="Interactive cow hoof side anatomy"
    >
      <rect className={styles.labelBadge} x="532.758" y="30.694" width="128.467" height="62.162" rx="4.385" />
      <text className={styles.labelText} x="596.992" y="61.775">
        A
      </text>

      {SECTIONS.map((section) => {
        const isActive = activeSectionIds.includes(section.id);

        return (
          <g
            key={section.id}
            id={`section-${section.id}`}
            data-section-id={section.id}
            data-section-number={section.number}
            className={cx(styles.section, isActive && styles.sectionActive, sectionClassNames?.[section.id])}
            onClick={() => handleSectionClick(section.id, section.number)}
          >
            <path className={styles.hitbox} d={section.d} />
            <path className={styles.visual} d={section.d} />
            <circle className={styles.indicator} cx={section.cx} cy={section.cy} r="18.636" />
            <text
              className={cx(styles.indicatorText, section.textClassName)}
              x={section.cx}
              y={section.cy + 1}
            >
              {section.number}
            </text>
          </g>
        );
      })}

      <path className={styles.outline} d={TOP_OUTER_PATH} />
      <path className={styles.outline} d={BOTTOM_LEFT_OUTER_PATH} />
      <path className={styles.outline} d={BOTTOM_RIGHT_OUTER_PATH} />

      {TOP_DIVIDER_PATHS.map((d) => (
        <path key={d} className={styles.divider} d={d} />
      ))}

      {BOTTOM_DIVIDER_PATHS.map((d) => (
        <path key={d} className={styles.dashedDivider} d={d} />
      ))}
    </svg>
  );
}

export default CowHoofSideFootSvg;
