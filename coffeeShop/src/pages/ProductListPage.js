import { request } from "../api/api.js";
import ProductList from "../components/ProductList.js";

export default function ProuctListPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "ProductListPage";

  $page.innerHTML = "<h1>Product List</h1>";

  this.render = () => {
    $target.appendChild($page);
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.fetchProducts = async () => {
    const products = await request("/products");
    this.setState(products);
  };

  this.fetchProducts()
    .then(() => {
      new ProductList({
        $target: $page,
        initialState: this.state,
      });
    })
    .catch(() => alert("Failed to load list!"));
}
