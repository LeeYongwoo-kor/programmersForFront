export default function ProuctListPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "ProductListPage";

  $page.innerHTML = "<h1>Product List</h1>";

  this.render = () => {
    $target.appendChild($page);
  };
}
