import { Order, OrderBook, OrderBookProps } from "./types";
import useSWRImmutable from "swr/immutable";

export default function useOrderBook({
  currency,
  marketIndex,
}: OrderBookProps) {
  const swr = useSWRImmutable<OrderBook, any, string[]>(
    [
      "https://dex-mainnet-webserver.zeta.markets/orderbooks",
      currency,
      marketIndex,
    ],
    ([url, currency, marketIndex]) =>
      fetch(
        `${url}/${currency}?${encodeURIComponent(
          "marketIndexes[]"
        )}=${marketIndex}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          return response.json();
        })
        .then(([orderBook]) => {
          const maxSize = Math.max(
            ...orderBook.asks.map((ask: Order) => ask.size),
            ...orderBook.bids.map((bid: Order) => bid.size)
          );
          return { ...orderBook, maxSize };
        }),
    {
      refreshInterval: 5000, // 5 seconds
    }
  );

  return swr;
}
