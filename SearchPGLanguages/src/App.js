import { fetchedLanguagesByKeyword } from "./api/api";
import SearchInput from "./components/searchInput";
import SelectedLanguages from "./components/selectedLanguages";
import Suggestion from "./components/suggestion";
import debounce from "./util/debounce";
import { getItem } from "./util/storage";
import CONSTANTS from "./constants/constants";

export default function App({ $target }) {
  this.state = {
    fetchedLanguages: [],
    selectedLanguages: getItem("selectedLanguages"),
    keyword: "",
    noResults: false,
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    suggestion.setState({
      selectedIndex: 0,
      items: this.state.fetchedLanguages,
      keyword: this.state.keyword,
      noResults: this.state.noResults,
    });
    selectedLanguages.setState(this.state.selectedLanguages);
  };

  const selectedLanguages = new SelectedLanguages({
    $target,
    initialState: this.state.selectedLanguages,
    onDelete: (removedLanguages) => {
      this.setState({
        ...this.state,
        selectedLanguages: removedLanguages,
      });
    },
  });

  new SearchInput({
    $target,
    initialState: "",
    onChange: debounce(async (keyword) => {
      // 입력한 검색어가 다 지워진 경우, fetchLanguages를 초기화
      if (!keyword || keyword.length === 0 || !keyword.trim()) {
        this.setState({
          fetchedLanguages: [],
        });
      } else {
        const languages = await fetchedLanguagesByKeyword(
          keyword,
          CONSTANTS.SUGGESTION.listLimit
        );
        const { noResults } = languages;
        if (noResults) {
          this.setState({
            fetchedLanguages: [],
            noResults: true,
          });
        } else {
          this.setState({
            fetchedLanguages: languages,
            keyword: keyword,
            noResults: false,
          });
        }
      }
    }, CONSTANTS.SEARCH_INPUT.debounceDelay),
  });

  const suggestion = new Suggestion({
    $target,
    initialState: {
      selectedIndex: 0,
      items: [],
      keyword: "",
      noResults: false,
    },
    onSelect: (language) => {
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
