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
              <input type="text" data-optionId="${
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
}
