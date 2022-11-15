import { requestApi } from "./api/api.js";
import Breadcrumb from "./components/Breadcrumb.js";
import ImageView from "./components/ImageView.js";
import Loading from "./components/Loading.js";
import Nodes from "./components/Nodes.js";

export default function App({ $app }) {
  this.state = {
    isRoot: false,
    isLoading: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  };

  const loading = new Loading(this.state.isLoading);

  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedNodeImage,
  });

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
  });

  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },

    onClick: async (node) => {
      try {
        if (node.type === "DIRECTORY") {
          const nextNodes = await requestApi(node.id);
          this.setState({
            ...this.state,
            depth: [...this.state.depth, node],
            nodes: nextNodes,
          });
        } else if (node.type === "FILE") {
          this.setState({
            ...this.state,
            selectedFilePath: node.filePath,
          });
        }
      } catch (e) {
        throw new Error("onClick(): Error occurred!");
      }
    },

    onBackClick: async () => {
      try {
        const nextState = { ...this.state };
        nextState.depth.pop();

        const prevNodeId =
          nextState.depth.length === 0
            ? null
            : nextState.depth[nextState.depth.length - 1].id;

        if (prevNodeId === null) {
          const rootNodes = await requestApi();
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: rootNodes,
          });
        } else {
          const prevNodes = await requestApi(prevNodeId);

          this.setState({
            ...nextNodes,
            isRoot: false,
            nodes: prevNodes,
          });
        }
      } catch (e) {
        throw new Error("onBackClick(): Error occurred!");
      }
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageView.setState(this.state.selectedFilePath);
    loading.setState(this.state.isLoading);
  };

  const init = async () => {
    try {
      this.setState({
        ...this.state,
        isLoading: true,
      });
      const rootNodes = await requestApi();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (e) {
      throw new Error("init(): Error occurred!");
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  };

  init();
}
