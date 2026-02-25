import { type SVGProps } from "react";

import styles from "./cow-anatomy.module.css";

export type HoofFootSectionId =
  | "hoof-foot-top-1"
  | "hoof-foot-top-2"
  | "hoof-foot-top-3"
  | "hoof-foot-top-4"
  | "hoof-foot-top-5"
  | "hoof-foot-top-6"
  | "hoof-foot-mid-10"
  | "hoof-foot-mid-0"
  | "hoof-foot-mid-13"
  | "hoof-foot-bottom-1"
  | "hoof-foot-bottom-2"
  | "hoof-foot-bottom-3"
  | "hoof-foot-bottom-4"
  | "hoof-foot-bottom-5"
  | "hoof-foot-bottom-6";

export const HOOF_FOOT_SECTION_IDS: HoofFootSectionId[] = [
  "hoof-foot-top-1",
  "hoof-foot-top-2",
  "hoof-foot-top-3",
  "hoof-foot-top-4",
  "hoof-foot-top-5",
  "hoof-foot-top-6",
  "hoof-foot-mid-10",
  "hoof-foot-mid-0",
  "hoof-foot-mid-13",
  "hoof-foot-bottom-1",
  "hoof-foot-bottom-2",
  "hoof-foot-bottom-3",
  "hoof-foot-bottom-4",
  "hoof-foot-bottom-5",
  "hoof-foot-bottom-6",
];

export type HoofFootSectionClick = {
  sectionId: HoofFootSectionId;
  sectionNumber: number;
};

export type CowHoofFootSvgProps = Omit<SVGProps<SVGSVGElement>, "onClick"> & {
  onSectionClick?: (section: HoofFootSectionClick) => void;
  activeSectionIds?: ReadonlyArray<HoofFootSectionId>;
  sectionClassNames?: Partial<Record<HoofFootSectionId, string>>;
  showHitboxes?: boolean;
};

type SectionDef = {
  id: HoofFootSectionId;
  number: number;
  d: string;
  hitboxD?: string;
  cx: number;
  cy: number;
  textClassName?: string;
  hideVisual?: boolean;
};

const TOP_OUTER_PATH =
  "M137.59 229.621C166.718 258.63 220.12 248.96 247.861 246.197C268.667 244.125 294.467 233.765 322.763 233.765C358.134 233.765 397.665 239.981 424.713 246.197C446.351 251.17 483.663 259.328 499.615 260.71C514.872 264.163 548.301 264.846 559.953 256.558C574.517 246.197 568.97 227.159 565.87 217.06C561.161 201.712 545.388 177.818 520.421 148.809C496.01 120.447 449.68 70.0774 368.537 28.628C282.238 -15.4548 222.894 1.69092 170.879 28.628C118.864 55.5652 98.0571 92.656 98.0571 134.304C98.0571 165.386 106.381 198.539 137.59 229.621Z";

const BOTTOM_OUTER_PATH =
  "M127.067 362.857C156.075 333.848 209.257 343.518 236.885 346.28C257.605 348.353 283.299 358.713 311.479 358.713C346.704 358.713 386.073 352.497 413.009 346.28C434.559 341.307 471.717 333.15 487.603 331.768C502.798 328.315 536.089 327.632 547.693 335.92C562.197 346.281 556.672 365.319 553.586 375.418C548.896 390.765 533.188 414.658 508.323 443.667C484.013 472.029 437.874 522.397 357.064 563.846C271.12 607.928 212.02 590.783 160.219 563.846C108.418 536.91 87.6968 499.819 87.6968 458.171C87.6968 427.09 95.9859 393.938 127.067 362.857Z";

const TOP_DIVIDER_PATHS = [
  "M249.942 244.125C238.845 227.548 213.74 189.007 210.411 150.881C207.082 112.754 221.703 72.6108 227.945 58.1062",
  "M325.91 233.503C355.039 216.926 391.424 186.106 391.424 155.025C391.424 111.894 340.685 78.6181 317.104 66.8763",
  "M422.633 244.125V231.692C451.068 235.836 510.435 240.395 520.422 225.476C532.905 206.827 499.616 161.249 472.568 140.528C450.929 123.952 374.779 68.0134 339.409 51.4286",
  "M472.567 140.529L493.373 119.8",
  "M188.318 20.8346C200.108 38.102 236.21 74.2136 281.151 74.2136C326.093 74.2136 352.586 39.6869 360.215 24.4917",
];

const BOTTOM_DIVIDER_PATHS = [
  "M238.956 348.353C227.905 364.929 202.903 403.469 199.588 441.595C196.273 479.721 210.834 519.864 217.05 534.368",
  "M314.612 358.975C343.621 375.551 379.856 406.371 379.856 437.451C379.856 480.582 329.326 513.857 305.843 525.599",
  "M410.937 348.353V360.785C439.255 356.641 498.377 352.082 508.323 367.001C520.756 385.65 487.603 431.227 460.666 451.947C439.117 468.524 363.28 524.461 328.055 541.046",
  "M460.666 451.948L481.387 472.676",
  "M177.586 571.639C189.328 554.372 225.281 518.261 270.038 518.261C314.794 518.261 341.178 552.787 348.776 567.982",
];

function circlePath(cx: number, cy: number, r: number): string {
  return `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} Z`;
}

const SECTIONS: SectionDef[] = [
  {
    id: "hoof-foot-top-6",
    number: 6,
    d: "M 99.000 131.250 L 101.000 112.500 L 105.250 97.250 L 113.000 80.750 L 123.250 66.250 L 138.500 51.000 L 153.250 40.000 L 187.750 22.000 L 206.250 42.750 L 226.500 58.250 L 217.250 84.500 L 211.000 112.250 L 209.000 129.500 L 210.000 157.750 L 215.000 178.750 L 223.000 199.500 L 249.000 244.750 L 211.500 248.750 L 182.000 248.000 L 160.000 242.750 L 144.000 234.000 L 124.250 213.000 L 109.000 186.750 L 101.000 159.500 Z",
    cx: 150.181,
    cy: 163.335,
  },
  {
    id: "hoof-foot-top-3",
    number: 3,
    d: "M 190.000 21.000 L 211.500 12.000 L 233.750 6.000 L 255.000 3.000 L 274.500 2.750 L 316.250 9.000 L 345.750 19.000 L 358.250 26.000 L 344.000 45.250 L 323.000 62.000 L 300.750 71.000 L 273.500 73.000 L 251.000 68.000 L 228.500 57.000 L 207.500 41.000 Z",
    hitboxD:
      "M 160.000 -15.000 L 255.000 -35.000 L 325.000 -20.000 L 380.000 0.000 L 344.000 45.250 L 323.000 62.000 L 300.750 71.000 L 273.500 73.000 L 251.000 68.000 L 228.500 57.000 L 207.500 41.000 Z",
    cx: 275.149,
    cy: 33.983,
  },
  {
    id: "hoof-foot-top-4",
    number: 4,
    d: "M 211.000 131.750 L 217.000 93.500 L 228.500 59.750 L 249.750 69.750 L 272.250 75.000 L 292.000 74.750 L 317.250 68.000 L 347.500 87.000 L 374.000 112.500 L 383.000 126.250 L 388.000 138.500 L 390.000 161.500 L 385.000 176.750 L 373.000 194.500 L 355.250 212.000 L 328.500 231.000 L 325.000 232.750 L 291.500 236.000 L 251.250 244.750 L 231.250 211.500 L 219.000 184.000 L 212.000 157.000 Z",
    cx: 292.688,
    cy: 145.796,
  },
  {
    id: "hoof-foot-top-5",
    number: 5,
    d: "M 319.250 66.250 L 340.750 53.000 L 395.000 86.000 L 471.750 141.000 L 493.000 161.000 L 511.750 186.250 L 521.000 206.750 L 522.000 218.750 L 520.000 224.500 L 510.750 230.750 L 494.500 234.000 L 452.500 234.000 L 422.000 230.750 L 421.250 244.000 L 373.750 236.000 L 330.000 232.750 L 355.000 215.000 L 375.750 194.500 L 388.750 173.500 L 392.500 153.500 L 387.750 131.500 L 374.000 109.250 L 351.000 87.000 Z",
    cx: 435.195,
    cy: 183.067,
  },
  {
    id: "hoof-foot-top-2",
    number: 2,
    d: "M 341.500 50.250 L 361.750 26.250 L 396.500 45.000 L 433.500 69.250 L 463.750 93.000 L 491.750 120.000 L 472.250 139.000 L 403.500 89.250 Z",
    hitboxD:
      "M 341.500 50.250 L 380.000 0.000 L 460.000 25.000 L 530.000 90.000 L 472.250 139.000 L 403.500 89.250 Z",
    cx: 435.195,
    cy: 90.985,
  },
  {
    id: "hoof-foot-top-1",
    number: 1,
    d: "M 423.750 233.250 L 465.500 236.750 L 495.500 236.000 L 511.500 232.750 L 521.750 225.500 L 524.000 219.500 L 524.000 211.250 L 515.750 189.000 L 497.750 163.250 L 474.500 140.750 L 493.750 121.250 L 524.750 155.250 L 551.000 190.000 L 564.000 214.250 L 568.500 238.000 L 565.750 248.750 L 557.500 257.000 L 544.000 261.000 L 517.000 262.000 L 474.750 256.000 L 424.000 245.000 Z",
    hitboxD:
      "M 424.000 245.000 L 423.750 233.250 L 465.500 236.750 L 495.500 236.000 L 511.500 232.750 L 521.750 225.500 L 524.000 219.500 L 524.000 211.250 L 515.750 189.000 L 497.750 163.250 L 474.500 140.750 L 530.000 90.000 L 570.000 130.000 L 600.000 180.000 L 615.000 230.000 L 610.000 260.000 L 590.000 280.000 L 540.000 290.000 L 480.000 280.000 Z",
    cx: 540.431,
    cy: 237.878,
  },
  {
    id: "hoof-foot-mid-10",
    number: 10,
    d: circlePath(152.373, 297.073, 30),
    hitboxD: circlePath(152.373, 297.073, 50),
    cx: 152.373,
    cy: 297.073,
    textClassName: styles.indicatorTextSmall,
    hideVisual: true,
  },
  {
    id: "hoof-foot-mid-0",
    number: 0,
    d: circlePath(323.382, 297.073, 30),
    hitboxD: circlePath(323.382, 297.073, 50),
    cx: 323.382,
    cy: 297.073,
    hideVisual: true,
  },
  {
    id: "hoof-foot-mid-13",
    number: 13,
    d: circlePath(536.047, 297.073, 30),
    hitboxD: circlePath(536.047, 297.073, 50),
    cx: 536.047,
    cy: 297.073,
    textClassName: styles.indicatorTextSmall,
    hideVisual: true,
  },
  {
    id: "hoof-foot-bottom-6",
    number: 6,
    d: "M 88.750 455.000 L 92.000 426.000 L 100.000 402.500 L 113.000 380.500 L 133.750 358.250 L 151.250 349.000 L 175.250 344.000 L 206.250 344.000 L 237.750 347.500 L 212.000 393.250 L 203.000 417.500 L 199.000 436.000 L 198.000 458.750 L 201.000 485.250 L 215.500 534.500 L 196.000 549.250 L 177.250 570.250 L 160.000 562.750 L 136.250 548.000 L 110.000 522.750 L 100.250 507.500 L 94.000 492.750 L 90.000 476.250 Z",
    cx: 123.872,
    cy: 454.927,
  },
  {
    id: "hoof-foot-bottom-3",
    number: 3,
    d: "M 179.250 571.000 L 198.000 550.250 L 220.000 534.000 L 244.500 523.000 L 266.500 519.250 L 291.750 522.000 L 313.000 531.250 L 332.750 547.250 L 347.000 566.500 L 333.500 573.750 L 306.500 583.000 L 265.500 589.750 L 239.000 589.000 L 220.750 586.000 L 191.000 577.000 Z",
    hitboxD:
      "M 179.250 571.000 L 198.000 550.250 L 220.000 534.000 L 244.500 523.000 L 266.500 519.250 L 291.750 522.000 L 313.000 531.250 L 332.750 547.250 L 347.000 566.500 L 340.000 610.000 L 265.000 630.000 L 200.000 615.000 L 150.000 595.000 Z",
    cx: 266.379,
    cy: 560.163,
  },
  {
    id: "hoof-foot-bottom-4",
    number: 4,
    d: "M 200.000 451.000 L 202.000 430.750 L 209.000 406.000 L 223.000 376.000 L 240.250 348.000 L 289.000 358.000 L 313.500 359.750 L 319.750 363.000 L 344.500 381.000 L 362.000 398.500 L 374.000 417.000 L 378.750 433.500 L 378.000 447.750 L 375.000 458.250 L 361.000 481.750 L 336.750 505.000 L 305.500 524.750 L 283.000 518.000 L 264.250 517.250 L 240.750 522.000 L 217.250 532.500 L 204.250 490.750 Z",
    cx: 272.956,
    cy: 435.195,
  },
  {
    id: "hoof-foot-bottom-5",
    number: 5,
    d: "M 308.250 525.500 L 334.000 509.750 L 358.750 487.750 L 375.000 463.750 L 381.000 440.250 L 378.000 421.000 L 367.000 401.500 L 347.750 381.000 L 319.500 359.750 L 366.000 356.000 L 409.750 348.250 L 410.250 362.000 L 448.500 358.000 L 477.000 358.000 L 496.500 361.000 L 507.000 366.750 L 509.750 373.000 L 510.000 379.750 L 502.000 402.250 L 484.000 428.000 L 460.750 450.750 L 381.500 507.750 L 328.750 539.750 Z",
    cx: 422.041,
    cy: 415.464,
  },
  {
    id: "hoof-foot-bottom-2",
    number: 2,
    d: "M 330.000 541.250 L 386.750 506.750 L 460.000 453.750 L 479.750 472.250 L 455.000 496.750 L 423.750 521.750 L 384.000 548.000 L 350.750 566.000 L 348.500 565.500 Z",
    hitboxD:
      "M 330.000 541.250 L 386.750 506.750 L 460.000 453.750 L 520.000 510.000 L 480.000 545.000 L 430.000 580.000 L 340.000 610.000 Z",
    cx: 417.656,
    cy: 505.353,
  },
  {
    id: "hoof-foot-bottom-1",
    number: 1,
    d: "M 412.000 347.750 L 477.000 334.000 L 502.500 330.750 L 528.500 331.000 L 542.000 334.000 L 551.750 341.000 L 556.000 351.000 L 556.000 361.500 L 549.000 384.500 L 534.000 409.500 L 508.000 442.750 L 481.000 471.000 L 462.750 451.750 L 486.750 428.000 L 503.000 404.750 L 511.750 382.250 L 512.000 373.750 L 509.750 367.000 L 500.250 360.000 L 481.500 356.250 L 447.000 356.000 L 412.250 359.500 Z",
    hitboxD:
      "M 412.250 359.500 L 412.000 347.750 L 485.000 315.000 L 515.000 310.000 L 545.000 310.000 L 565.000 315.000 L 580.000 325.000 L 590.000 340.000 L 595.000 365.000 L 590.000 395.000 L 570.000 430.000 L 520.000 510.000 L 462.750 451.750 L 486.750 428.000 L 503.000 404.750 L 511.750 382.250 L 512.000 373.750 L 509.750 367.000 L 500.250 360.000 L 481.500 356.250 L 447.000 356.000 Z",
    cx: 533.854,
    cy: 356.268,
  },
];

function cx(...classNames: Array<string | undefined | false>): string {
  return classNames.filter(Boolean).join(" ");
}

export function CowHoofFootSvg({
  className,
  onSectionClick,
  activeSectionIds = [],
  sectionClassNames,
  showHitboxes = false,
  ...svgProps
}: CowHoofFootSvgProps) {
  const handleSectionClick = (
    sectionId: HoofFootSectionId,
    sectionNumber: number,
  ) => {
    onSectionClick?.({ sectionId, sectionNumber });
  };

  return (
    <svg
      {...svgProps}
      className={cx(
        styles.root,
        showHitboxes && styles.showHitboxes,
        className,
      )}
      viewBox="0 0 680 597"
      role="img"
      aria-label="Interactive cow hoof front anatomy"
    >
      <rect
        className={styles.labelBadge}
        x="532.758"
        y="30.694"
        width="128.467"
        height="62.162"
        rx="4.385"
      />
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
            className={cx(
              styles.section,
              isActive && styles.sectionActive,
              section.hideVisual && styles.visualHidden,
              sectionClassNames?.[section.id],
            )}
            onClick={() => handleSectionClick(section.id, section.number)}
          >
            <path className={styles.hitbox} d={section.hitboxD ?? section.d} />
            <path className={styles.visual} d={section.d} />
            <circle
              className={styles.indicator}
              cx={section.cx}
              cy={section.cy}
              r="18.636"
            />
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
      <path className={styles.outline} d={BOTTOM_OUTER_PATH} />

      {TOP_DIVIDER_PATHS.map((d) => (
        <path key={d} className={styles.divider} d={d} />
      ))}

      {BOTTOM_DIVIDER_PATHS.map((d) => (
        <path key={d} className={styles.divider} d={d} />
      ))}
    </svg>
  );
}

export default CowHoofFootSvg;
