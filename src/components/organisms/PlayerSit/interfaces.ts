import { ICard } from "../../../store/card/interfaces";

export interface Props {
  position: "bottom" | "top";
  playerCards: ICard[];
  life: number;
}
