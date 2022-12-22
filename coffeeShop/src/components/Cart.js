import { routeChange } from "../router/router.js";
import { removeItem } from "../util/storage.js";

export default function Cart({ $target, initialState }) {
  const $component = document.createElement("div");
  $component.className = "Cart";
  this.state = initialState;

  $target.appendChild($component);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.getTotalPrice = () => {
    return this.state.reduce((acc, option) => {
      return acc + (option.productPrice + option.optionPrice) * option.quantity;
    }, 0);
  };

  this.render = () => {
    $component.innerHTML = `
        <ul>
            ${this.state
              .map(
                (cartItem) => `
                <li class="Cart__item">
                    <img src="${cartItem.imageUrl}" />
                    <div class="Cart__itemDescription">
                        <div>${cartItem.productName} ${cartItem.optionName} ${
                  cartItem.quantity
                } ea</div>
                        <div>$ ${
                          cartItem.productPrice + cartItem.optionPrice
                        }</div>
                    </div>
                </li>
              `
              )
              .join("")}
        </ul>
        <div class="Cart__totalPrice">
            Total $ ${this.getTotalPrice()}
        </div>
        <button class="OrderButton">Order</button>
    `;

    return $component;
  };

  $component.addEventListener("click", (e) => {
    if (e.target.className === "OrderButton") {
      alert("Your order is complete!");
      removeItem("products_cart");
      routeChange("/");
    }
  });

  this.render();
}
