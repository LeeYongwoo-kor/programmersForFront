export default function ImageView({ $app, initialState, onClick }) {
  this.state = initialState;
  this.onClick = onClick;
  this.$target = document.createElement("div");
  this.$target.className = "ImageView Modal";

  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `<div class="content">${
      this.state ? `<Img src="${this.state}">` : ""
    }</div>`;

    const onClickEventHandler = () => this.onClick(this.state);

    if (this.state) {
      this.$target.style.display = "block";
      this.$target.addEventListener("click", onClickEventHandler);
    } else {
      this.$target.style.display = "none";
      this.$target.removeEventListener("click", onClickEventHandler);
    }
  };

  this.render();
}
