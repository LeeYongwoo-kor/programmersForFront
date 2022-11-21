export default function Breadcrumb({ $app, initialState = [], onClick }) {
  this.state = initialState;
  this.onClick = onClick;

  this.$target = document.createElement("nav");
  this.$target.className = "Breadcrumb";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `<span class="nav-item">root</span>${this.state
      .map((node, idx) => {
        return `<span class="nav-item" data-index="${idx}"> → [${node.name}]</span>`;
      })
      .join("")}`;
  };

  this.render();

  this.$target.addEventListener("click", (e) => {
    const $navItem = e.target.closest(".nav-item");

    if ($navItem) {
      const { index } = $navItem.dataset;
      this.onClick(index ? parseInt(index, 10) : null);
    }
  });
}
