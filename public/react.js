/* eslint-disable react/no-multi-comp */
/* eslint-disable react/react-in-jsx-scope */
const { HashRouter, Route, Link, withRouter } = ReactRouterDOM;

const Home = () => <h2>Home</h2>;

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      products: store.getState().products,
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({ products: store.getState().products })
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { products } = this.state;
    const { pathname } = this.props.location;

    const links = [
      { text: 'Home', to: '/' },
      { text: `Products (${products.length})`, to: '/products' },
      { text: 'Create A Product', to: '/products/create' },
    ];

    return (
      <div id="nav">
        {links.map((link, idx) => (
          <Link
            key={idx}
            to={link.to}
            className={pathname === link.to ? 'active' : ''}
          >
            {link.text}
          </Link>
        ))}
      </div>
    );
  }
}

const ConnectedNav = withRouter(Nav);

class Products extends React.Component {
  constructor() {
    super();
    this.state = {
      products: store.getState().products,
    };
    this.destroy = this.destroy.bind(this);
  }

  async componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({ products: store.getState().products })
    );

    try {
      const { data } = await axios.get('/api/products');
      store.dispatch(addProds(data));
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  async destroy(product) {
    try {
      await axios.delete(`/api/products/${product.id}`);
      store.dispatch(deleteProd(product));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const products = this.state.products;
    return (
      <div>
        <h2>Products</h2>
        <ul id="products">
          {products.map(product => (
            <li key={product.id}>
              <div>{product.name}</div>
              <button onClick={() => this.destroy(product)}>Destroy</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class ProductCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.create = this.create.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.create();
  }

  async create() {
    try {
      const { data } = await axios.post('/api/products', this.state);
      store.dispatch(addProd(data));
      this.props.history.push('/products');
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { name } = this.state;
    const { onSubmit, onChange } = this;
    return (
      <div>
        <h2>Create A Product</h2>
        <form onSubmit={onSubmit}>
          <input
            name="name"
            onChange={onChange}
            value={name}
            placeholder="enter a new product"
          />
          <button disabled={!name}>Save</button>
        </form>
      </div>
    );
  }
}

const ConnectedForm = withRouter(ProductCreate);

const App = () => (
  <HashRouter>
    <h1>Acme Products</h1>
    <ConnectedNav />
    <div id="content">
      <Route exact path="/" component={Home} />
      <Route path="/products" exact component={Products} />
      <Route path="/products/create" component={ConnectedForm} />
    </div>
  </HashRouter>
);
const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
