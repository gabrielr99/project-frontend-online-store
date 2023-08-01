import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';
import { getProductsFromCategoryAndQuery } from './services/api';
import './styles/app.css';

class App extends Component {
  state = {
    categoryId: '',
    query: '',
    productsFromQuery: [],
    isRenderByCategory: false,
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      query: value,
    });
  };

  getValueInputCategory = async ({ target: { id } }) => {
    const { query } = this.state;
    const fetchReturn = await getProductsFromCategoryAndQuery(id, query);
    this.setState({
      categoryId: id,
      productsFromQuery: fetchReturn.results,
      isRenderByCategory: true,
    });
  };

  onButtonClick = async () => {
    const { categoryId, query } = this.state;
    const fetchReturn = await getProductsFromCategoryAndQuery(categoryId, query);
    this.setState({
      productsFromQuery: fetchReturn.results,
    });
  };

  render() {
    const { productsFromQuery, query, isRenderByCategory } = this.state;
    return (
      <div>
        <Header
          onInputChange={ this.onInputChange }
          onButtonClick={ this.onButtonClick }
        />
        <Switch>
          <Route exact path="/">
            <ProductList
              products={ productsFromQuery }
              query={ query }
              getValueInputCategory={ this.getValueInputCategory }
              isRenderByCategory={ isRenderByCategory }
            />
          </Route>
          <Route exact path="/cart" component={ Cart } />
          <Route
            exact
            path="/product-details/:id"
            render={ (routeProps) => (
              <ProductDetails
                { ...routeProps }
              />
            ) }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
