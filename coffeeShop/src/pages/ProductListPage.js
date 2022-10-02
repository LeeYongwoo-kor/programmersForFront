import { request } from "../api/api";
import ProductList from "../components/ProductList";

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

  const fetchProducts = async () => {
    const products = await request("/products");
    this.setState(products);
  };

  const productList = new ProductList({
    $target: $page,
    initialState: this.state,
  });

  fetchProducts();
}
