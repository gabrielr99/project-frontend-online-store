import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import { updateCart } from '../services/localStorage';
import Category from '../components/Category';
import '../styles/productList.css';

class ProductList extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.fetchGetCategories();
  }

  fetchGetCategories = async () => {
    const resultApiCategories = await getCategories();
    this.setState({
      categories: resultApiCategories,
    });
  };

  render() {
    const {
      categories,
    } = this.state;

    const {
      products,
      query,
      getValueInputCategory,
      isRenderByCategory,
    } = this.props;

    return (
      <div className="main-container">
        <aside className="category-aside">
          <div>
            <h3>Categorias</h3>
            <hr />
          </div>
          {
            categories.map(({ name, id }) => (
              <Category
                key={ id }
                id={ id }
                name={ name }
                getValueInputCategory={ getValueInputCategory }
              />
            ))
          }
        </aside>
        {
          query.length === 0 && !isRenderByCategory
            ? (
              <section className="initial-message">
                <h2>Nenhum produto foi encontrado</h2>
                <p data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
              </section>
            )
            : (
              <main className="products-container">
                {products.map(({ title, thumbnail, price, id }) => (
                  <div
                    className="product-card"
                    data-testid="product"
                    key={ id }
                  >
                    <p className="product-name">{title}</p>
                    <Link
                      to={ `/product-details/${id}` }
                      data-testid="product-detail-link"
                    >
                      <img src={ thumbnail } alt={ title } />
                    </Link>
                    <p>{ `R$ ${price}` }</p>
                    <button
                      className="btn"
                      data-testid="product-add-to-cart"
                      onClick={ () => updateCart(
                        { title, thumbnail, price, id, quantity: 1 },
                        1,
                      ) }
                    >
                      <span className="material-symbols-outlined">
                        add_shopping_cart
                      </span>
                    </button>
                  </div>
                ))}
              </main>
            )
        }
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
  query: PropTypes.string.isRequired,
  getValueInputCategory: PropTypes.func.isRequired,
  isRenderByCategory: PropTypes.bool.isRequired,
};

export default ProductList;
