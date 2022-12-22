import { routeChange } from "../router/router.js";
import { getItem, setItem } from "../util/storage.js";

export default function SelectedOptions({ $target, initialState }) {
  const $component = document.createElement("div");
  $target.appendChild($component);

  this.state = initialState;

  this.getTotalPrice = () => {
    const { product, selectedOptions } = this.state;
    const { price: productPrice } = product;

    return selectedOptions.reduce((acc, option) => {
      return acc + (productPrice + option.optionPrice) * option.quantity;
    }, 0);
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { product, selectedOptions = [] } = this.state;

    if (product && selectedOptions) {
      $component.innerHTML = `<h3>Selected Products</h3>
        <ul>
          ${selectedOptions
            .map(
              (selectedOption) => `
            <li>
              ${selectedOption.optionName} $ ${
                product.price + selectedOption.optionPrice
              }
              <input type="text" data-option-id="${
                selectedOption.optionId
              }" value="${selectedOption.quantity}" />
            </li>
          `
            )
            .join("")}
        </ul>
        <div class="ProductDetail__totalPrice">$ ${this.getTotalPrice()}</div>
        <button class="OrderButton">Order</button>
      `;
    }
  };

  this.render();

  $component.addEventListener("input", (e) => {
    if (e.target.tagName === "INPUT") {
      try {
        const nextQuantity = parseInt(e.target.value || 0);
        const nextSelectedOptions = [...this.state.selectedOptions];

        if (typeof nextQuantity === "number") {
          const { product } = this.state;

          const optionId = parseInt(e.target.dataset.optionId);
          const option = product.productOptions.find(
            (option) => option.id === optionId
          );
          const selectedOptionIndex = nextSelectedOptions.findIndex(
            (selectedOption) => selectedOption.optionId === optionId
          );

          const quantity =
            option.stock >= nextQuantity ? nextQuantity : option.stock;
          nextSelectedOptions[selectedOptionIndex].quantity = quantity;

          this.setState({
            ...this.state,
            selectedOptions: nextSelectedOptions,
          });

          const $newInput =
            $component.querySelectorAll("input")[selectedOptionIndex];
          $newInput.setSelectionRange(
            String(quantity).length,
            String(quantity).length
          );
          $newInput.focus();
        }
      } catch (e) {
        console.error(e);
      }
    }
  });

  $component.addEventListener("click", (e) => {
    const { selectedOptions } = this.state;
    if (e.target.className === "OrderButton") {
      const cartData = getItem("products_cart", []);

      setItem(
        "products_cart",
        cartData.concat(
          selectedOptions.map((selectedOption) => ({
            productId: selectedOption.productId,
            optionId: selectedOption.optionId,
            quantity: selectedOption.quantity,
          }))
        )
      );

      routeChange("/cart");
    }
  });
}
