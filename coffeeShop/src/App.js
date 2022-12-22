import CartPage from "./pages/CartPage.js";
import ProductListPage from "./pages/ProductListPage.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import { init } from "./router/router.js";

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;

    $target.innerHTML = "";

    if (pathname === "/") {
      new ProductListPage({ $target }).render();
    } else if (pathname.indexOf("/products") === 0) {
      const [, , productId] = pathname.split("/");
      new ProductDetailPage({
        $target,
        productId,
      }).render();
    } else if (pathname === "/cart") {
      new CartPage({ $target }).render();
    }
  };

  init(this.route);

  this.route();

  window.addEventListener("popstate", this.route);
}
