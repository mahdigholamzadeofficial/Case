import { Popover } from "antd";
import "./Header.scss";
import { IconBasketCheck } from "@tabler/icons-react";
import { BasketListContainer } from "../../../features";

const HeaderComponent = () => {
  return (
    <header className="header">
      <div className="header__content">
        <h3 className="header__title">CASE</h3>
        <Popover content={<BasketListContainer />} title="Basket List">
          <IconBasketCheck className="header__icon" size={30} />
        </Popover>
      </div>
    </header>
  );
};

export default HeaderComponent;
