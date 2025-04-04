import { Button, Flex } from "antd";
import { useBasketStore } from "../../../common/stores/basket-store";
import BasketListItem from "../components/BasketListItem/BasketListItem";
import "./BasketList.scss";

const BasketListContainer = () => {
  const { items, clearBasket } = useBasketStore();

  return (
    <div className="basket-list">
      {items.map((product) => (
        <BasketListItem key={product.id} {...product} />
      ))}
      {items.length > 0 ? (
        <Flex justify="end" className="basket-list__footer">
          <Button danger onClick={() => clearBasket()}>
            Clear Basket
          </Button>
        </Flex>
      ) : (
        <strong>The Basket is empty</strong>
      )}
    </div>
  );
};

export default BasketListContainer;
