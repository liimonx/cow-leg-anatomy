import { HOOF_FOOT_SECTION_IDS } from "./CowHoofFootSvg";
import { HOOF_SIDE_FOOT_SECTION_IDS } from "./CowHoofSideFootSvg";
import { LEG_SECTION_IDS } from "./CowLegSvg";

export const COW_ANATOMY_ID_MAP = {
  cowHoofFoot: HOOF_FOOT_SECTION_IDS,
  cowHoofSideFoot: HOOF_SIDE_FOOT_SECTION_IDS,
  cowLeg: LEG_SECTION_IDS,
} as const;
