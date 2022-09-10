import SearchInput from "./components/searchInput";

export default function App({ $target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  this.setState = (nextStage) => {};

  const searchInput = new SearchInput({
    $target,
    initialState: "",
  });
}
