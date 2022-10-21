import CartPage from "./components/CartPage";
import ProductDetailPage from "./components/ProductDetailPage";
import { init } from "./router/router";

export default function App({ $app }) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  };

  const breadcrumb = new Breadcrumb({
    $app, initialState: this.state.depth
  });

  const nodes = new Nodes({
    $app, initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    },

    onClick: (node) => {
      if (node.type === "DIRECTORY") {
        // DIRECTORY
      } else if (node.type === "FILE") {
        // FILE
      }
    }
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  };

  const init = async () => {
    try {
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes;
      })
    } catch (e) {
      // error
    }
  }

  init();
}
