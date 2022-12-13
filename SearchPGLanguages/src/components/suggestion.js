export default function Suggestion({ $target, initialState, onSelect }) {
  this.$element = document.createElement("div");
  this.$element.className = "Suggestion";
  $target.appendChild(this.$element);

  this.state = {
    selectedIndex: 0,
    items: initialState.items,
    keyword: "",
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  };

  this.renderMatchedItem = (keyword, item) => {
    const matchedText = item.match(new RegExp(keyword, "gi"))[0];
    return item.replace(
      new RegExp(matchedText, "gi"),
      `<span class="Suggestion__item--matched">${matchedText}</span>`
    );
  };

  this.render = () => {
    const { selectedIndex, keyword, items = [] } = this.state;
    if (items.length > 0) {
      this.$element.style.display = "block";
      this.$element.innerHTML = `
            <ul>
                ${items
                  .map(
                    (item, idx) =>
                      `<li class="${
                        idx === selectedIndex
                          ? "Suggestion__item--selected"
                          : ""
                      }" data-index="${idx}">${this.renderMatchedItem(
                        keyword,
                        item.ProgrammingLanguage
                      )}</li>`
                  )
                  .join("")}
            </ul>
        `;
    } else {
      this.$element.style.display = "none";
      this.$element.innerHTML = "";
    }
  };

  this.$element.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { index } = $li.dataset;
      try {
        const { ProgrammingLanguage } = this.state.items[parseInt(index)];
        onSelect(ProgrammingLanguage);
      } catch (e) {
        alert("Something wrong! Not processed normally");
      }
    }
  });

  window.addEventListener("keyup", (e) => {
    if (this.state.items.length > 0) {
      const { selectedIndex } = this.state;
      const lastIndex = this.state.items.length - 1;
      const navigationKeys = ["ArrowUp", "ArrowDown"];
      let nextIndex = selectedIndex;

      if (navigationKeys.includes(e.key)) {
        if (e.key === "ArrowUp") {
          nextIndex = selectedIndex === 0 ? lastIndex : nextIndex - 1;
        } else if (e.key === "ArrowDown") {
          nextIndex = selectedIndex === lastIndex ? 0 : nextIndex + 1;
        }

        this.setState({
          ...this.state,
          selectedIndex: nextIndex,
        });
      } else if (e.key === "Enter") {
        const { ProgrammingLanguage } =
          this.state.items[this.state.selectedIndex];
        onSelect(ProgrammingLanguage);
      }
    }
  });

  this.render();
}
