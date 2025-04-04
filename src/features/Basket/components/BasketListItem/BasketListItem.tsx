import React from "react";
import { IProduct } from "../../../Product/services/types/get-product-list-response.type";
import { Flex } from "antd";
import "./BasketListItem.scss";

interface IBasketListItemProps extends IProduct {
  quantity: number;
}

const BasketListItem: React.FC<IBasketListItemProps> = ({
  image,
  title,
  quantity,
  price,
}) => {
  const total = (price * quantity).toFixed(2);

  return (
    <Flex className="basket-item" align="center" gap={16}>
      <img className="basket-item__image" src={image} alt={title} />
      <div className="basket-item__info">
        <div className="basket-item__title">{title}</div>
        <div className="basket-item__details">
          ${price} × {quantity} = <strong>${total}</strong>
        </div>
      </div>
    </Flex>
  );
};

export default BasketListItem;
