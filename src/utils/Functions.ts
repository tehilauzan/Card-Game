import { CONVERT_ROYAL_TO_VALUE } from "../utils/Consts";

function isRoyal(value: string) {
  return value in CONVERT_ROYAL_TO_VALUE;
}
export function setValueOfCard(valuePlayer: string) {
  return isRoyal(valuePlayer)
    ? CONVERT_ROYAL_TO_VALUE[valuePlayer as keyof typeof CONVERT_ROYAL_TO_VALUE]
    : parseInt(valuePlayer);
}
