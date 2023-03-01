import OrderBookRow, {
  OrderBookRowLayout,
  OrderBookItem,
} from "../OrderBookRow";
import { OrderBook, OrderType } from "../types";
import "./SingleOrderBook.css";

interface SingleOrderBookProps {
  orderType: OrderType;
  orderBook: OrderBook;
  currency: string;
}

export default function SingleOrderBook({
  orderType,
  currency,
  orderBook
}: SingleOrderBookProps) {

  return (
    <div className="order-book__single">
      <h2 className="order-book__title">
        {orderType === "bids" ? "Buy" : "Sell"}
      </h2>
      <OrderBookRowLayout>
        <OrderBookItem isPrice className="order-book__item--header">
          Price ($)
        </OrderBookItem>
        <OrderBookItem className="order-book__item--header">
          Size ({currency})
        </OrderBookItem>
      </OrderBookRowLayout>
      {/* sort asks from highest to lowest */}
      <div className="order-book__rows">
        {(orderType === "bids"
          ? orderBook[orderType]
          : [...orderBook[orderType]].reverse()
        ).map((order) => (
          <OrderBookRow
            maxSize={orderBook.maxSize}
            key={order.price}
            orderType={orderType}
            price={order.price}
            size={order.size}
          />
        ))}
      </div>
    </div>
  );
}
