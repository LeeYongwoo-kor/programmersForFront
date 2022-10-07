import { routeChange } from "../router/router.js";
import { request } from "../api/api.js";
import { getItem } from "../util/storage.js";
import Cart from "../components/Cart.js";

export default function CartPage({ $target }) {
  let cartComponent = null;

  const $page = document.createElement("div");
  $page.className = "CartPage";

  $page.innerHTML = "<h1>Cart</h1>";

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const cartData = getItem("products_cart", []);
  this.state = {
    products: null,
  };

  this.render = () => {
    if (cartData.length === 0) {
      alert("Your cart is empty!");
      routeChange("/");
    } else {
      $target.appendChild($page);

      if (this.state.products && !cartComponent) {
        cartComponent = new Cart({
          $target: $page,
          initialState: this.state.products,
        });
      }
    }
  };

  this.fetchProducts = async () => {
    const products = await Promise.all(
      cartData.map(async (cartItem) => {
        const product = await request(`/products/${cartItem.productsId}`);
        const selectedOption = product.productOptions.find(
          (option) => option.id === cartItem.optionId
        );

        return {
          imageUrl: product.imageUrl,
          productName: product.name,
          quantity: cartItem.quantity,
          productPrice: product.price,
          optionName: selectedOption.name,
          optionPrice: selectedOption.price,
        };
      })
    );

    this.setState({ products });
  };

  this.fetchProducts();
}
