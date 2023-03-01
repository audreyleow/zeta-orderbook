import { OrderType } from "../types";
import "./OrderBookRow.css";

interface OrderBookRowProps {
  price: number;
  size: number;
  maxSize: number;
  orderType: OrderType;
}

export default function OrderBookRow({
  price,
  size,
  maxSize,
  orderType,
}: OrderBookRowProps) {
  return (
    <OrderBookRowLayout>
      <OrderBookItem
        isPrice
        className={
          orderType === "asks"
            ? "order-book__price--ask"
            : "order-book__price--bid"
        }
      >
        {price}
        <div
          className={`order-book__size-indicator ${
            orderType === "asks"
              ? "order-book__size-indicator--ask"
              : "order-book__size-indicator--bid"
          }`}
          style={{
            width: (size / maxSize) * 100 + "%",
          }}
        />
      </OrderBookItem>
      <OrderBookItem>{size}</OrderBookItem>
    </OrderBookRowLayout>
  );
}

export const OrderBookRowLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => <div className="order-book__row">{children}</div>;

export const OrderBookItem = ({
  children,
  className,
  isPrice,
  ...rest
}: {
  isPrice?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`order-book__item ${
      isPrice ? "order-book__item--price" : ""
    } ${className ?? ""}`}
    {...rest}
  >
    {children}
  </div>
);
