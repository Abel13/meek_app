export interface ICard {
  id: number;
  number: number;
  suit: number;
  symbol: string;
  isShackle: false;
}

export interface ICardState {
  card: ICard[];
}
