export interface OrderBookProps {
  currency: string;
  marketIndex: string;
}

export interface OrderBook {
  bids: Order[];
  asks: Order[];
  maxSize: number;
}

export interface Order {
  price: number;
  size: number;
}

export type OrderType = "bids" | "asks";
