import SingleOrderBook from "./SingleOrderBook";
import { OrderBookProps } from "./types";
import "./index.css";
import useOrderBook from "./useOrderBook";

/**
 *
 * OrderBook component can be reused anywhere in a React application
 *
 */
export default function OrderBook({
  currency,
  marketIndex,
  className,
  ...rest
}: OrderBookProps & { className?: string; style?: React.CSSProperties }) {
  const { data } = useOrderBook({ currency, marketIndex });

  return (
    <div className={`order-book ${className}`} {...rest}>
      {!data ? (
        <div className="order-book__loader">Loading...</div>
      ) : (
        <>
          <SingleOrderBook
            orderType="bids"
            currency={currency}
            orderBook={data}
          />
          <SingleOrderBook
            orderType="asks"
            currency={currency}
            orderBook={data}
          />
        </>
      )}
    </div>
  );
}
