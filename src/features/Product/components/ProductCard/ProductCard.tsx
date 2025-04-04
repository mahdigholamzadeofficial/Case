import { useState } from "react";
import { IProduct } from "../../services/types/get-product-list-response.type";
import { Loading } from "../../../../common/components/Loading";
import { useBasketStore } from "../../../../common/stores/basket-store";
import "./ProductCard.scss";

const ProductCard = (product: IProduct) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { items, addToBasket, increaseQuantity, decreaseQuantity } =
    useBasketStore();

  const basketItem = items.find((item) => item.id === product.id);
  const quantity = basketItem?.quantity || 0;

  return (
    <div className="product-card">
      {!imageLoaded && (
        <div className="product-card__image-placeholder">
          <Loading />
        </div>
      )}
      <img
        src={product.image}
        alt={product.title}
        className={`product-card__image ${
          imageLoaded ? "product-card__image--loaded" : ""
        }`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
      <h5 className="product-card__title">{product.title}</h5>
      <p className="product-card__price">${product.price}</p>

      {quantity > 0 ? (
        <div className="product-card__basket-controls">
          <button onClick={() => decreaseQuantity(product.id)}>-</button>
          <span className="product-card__basket-quantity">{quantity}</span>
          <button onClick={() => increaseQuantity(product.id)}>+</button>
        </div>
      ) : (
        <button
          className="product-card__add-btn"
          onClick={() => addToBasket(product)}
        >
          Add to Basket
        </button>
      )}
    </div>
  );
};

export default ProductCard;
