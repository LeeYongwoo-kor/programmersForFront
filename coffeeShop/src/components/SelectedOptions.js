export default function SelectedOptions({ $target, initialState }) {
  const $component = document.createElement("div");
  $target.appendChild($component);

  this.state = initialState;

  this.getTotalPrice = () => {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {};

  this.render();
}
