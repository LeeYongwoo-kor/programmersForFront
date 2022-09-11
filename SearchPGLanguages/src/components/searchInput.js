export default function SearchInput({ $target, initialState }) {
  this.$element = document.createElement("form");
  this.$element = className = "SearchInput";
  this.state = initialState;

  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `
        <input class="SearchInput__input" type="text" placeholder="Enter the Programming Languages" value="${this.state}">
    `;

    this.$element.addEventListener("keyup", (e) => {
      onchange(e.target.value);
    });
  };
}
