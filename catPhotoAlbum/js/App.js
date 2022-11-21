import { requestApi } from "./api/api.js";
import Breadcrumb from "./components/Breadcrumb.js";
import ImageView from "./components/ImageView.js";
import Loading from "./components/Loading.js";
import Nodes from "./components/Nodes.js";

const cache = {};

export default function App({ $app }) {
  this.state = {
    isRoot: true,
    isLoading: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  };

  const loading = new Loading({ $app, initialState: this.state.isLoading });

  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedNodeImage,
  });

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: [],
    onClick: (index) => {
      if (index === null) {
        this.setState({
          ...this.state,
          isRoot: true,
          depth: [],
          nodes: cache.root,
        });
        return;
      }
      if (index === this.state.depth.length - 1) {
        return;
      }

      const nextState = { ...this.state };
      const nextDepth = this.state.depth.slice(0, index + 1);

      this.setState({
        ...nextState,
        depth: nextDepth,
        nodes: cache[nextDepth[nextDepth.length - 1].id],
      });
    },
  });

  const nodes = new Nodes({
    $app,
    initialState: [],

    onClick: async (node) => {
      try {
        if (node.type === "DIRECTORY") {
          if (cache[node.id]) {
            this.setState({
              ...this.state,
              isRoot: false,
              depth: [...this.state.depth, node],
              nodes: cache[node.id],
            });
          } else {
            const nextNodes = await requestApi(node.id);
            this.setState({
              ...this.state,
              isRoot: false,
              depth: [...this.state.depth, node],
              nodes: nextNodes,
            });

            cache[node.id] = nextNodes;
          }
        } else if (node.type === "FILE") {
          this.setState({
            ...this.state,
            isRoot: false,
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
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: cache.root,
          });
        } else {
          this.setState({
            ...nextState,
            isRoot: false,
            nodes: cache[prevNodeId],
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
        isLoading: false,
        isRoot: true,
        nodes: rootNodes,
      });

      cache.root = rootNodes;
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
