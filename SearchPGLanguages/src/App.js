import { fetchedLanguages } from "./api/api.ts";
import SearchInput from "./components/searchInput.js";
import Suggestion from "./components/suggestion.js";
import SelectedLanguages from "./components/selectedLanguages.js";

export default function App({ $target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: [],
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    suggestion.setState({
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
    });
    selectedLanguages.setState(this.state.selectedLanguages);
  };

  const selectedLanguages = new SelectedLanguages({
    $target,
    initialState: [],
  });

  const searchInput = new SearchInput({
    $target,
    initialState: "",
    onChange: async (keyword) => {
      // 입력한 검색어가 다 지워진 경우, fetchLanguages를 초기화
      if (keyword.length === 0) {
        this.setState({
          fetchedLanguages: [],
        });
      } else {
        const languages = await fetchedLanguages(keyword);
        this.setState({
          fetchedLanguages: languages,
        });
      }
    },
  });

  const suggestion = new Suggestion({
    $target,
    initialState: {
      cursor: 0,
      selectedIndex: 0,
      items: [],
    },
    onSelect: (language) => {
      alert(language);

      // 이미 선택된 언어인 경우, 맨 뒤에 보내버리기
      const nextSelectedLanguages = [...this.state.selectedLanguages];

      const index = nextSelectedLanguages.findIndex(
        (selectedLanguage) => selectedLanguage === language
      );

      if (index > -1) {
        nextSelectedLanguages.splice(index, 1);
      }
      nextSelectedLanguages.push(language);

      this.setState({
        ...this.state,
        selectedLanguages: nextSelectedLanguages,
      });
    },
  });
}
