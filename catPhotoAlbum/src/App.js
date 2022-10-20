import CartPage from "./components/CartPage";
import ProductDetailPage from "./components/ProductDetailPage";
import { init } from "./router/router";

export default function App({ $target }) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  };

  const breadcrumb = new Breadcrumb();
  const nodes = new Nodes();

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
