import { setItem } from "../util/storage";

const MAX_DISPLAY_COUNT = 5;

export default function SelectedLanguage({ $target, initialState, onDelete }) {
  this.$element = document.createElement("div");
  this.$element.className = "SelectedLanguage";
  this.state = initialState;

  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;

    if (this.state.length > MAX_DISPLAY_COUNT) {
      const startPosition = this.state.length - MAX_DISPLAY_COUNT;
      this.state = this.state.slice(
        startPosition,
        MAX_DISPLAY_COUNT + startPosition
      );
    }

    this.render();
  };

  this.render = () => {
    setItem("selectedLanguages", this.state);

    this.$element.innerHTML = `
    <ul>
        ${this.state.map((item) => `<li>${item}</li>`).join("")}
    </ul>
    `;
  };

  this.$element.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const text = $li.textContent;
      const selectedIndex = this.state.findIndex((item) => item === text);

      if (selectedIndex > -1) {
        onDelete([
          ...this.state.slice(0, selectedIndex),
          ...this.state.slice(selectedIndex + 1),
        ]);
      }
    }
  });

  this.render();
}
