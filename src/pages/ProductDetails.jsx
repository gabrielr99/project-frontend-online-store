import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import { updateCart } from '../services/localStorage';
// import InputQuery from '../components/InputQuery';

class ProductDetails extends Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({
      product,
    });
  };

  render() {
    const {
      product: { title, thumbnail, price, id },
    } = this.state;
    // const {
    // onInputChange,
    // onButtonClick,
    // } = this.props;

    return (
      <>
        <h2>Detalhes do produto</h2>
        {/* <InputQuery
          onInputChange={ onInputChange }
          onButtonClick={ onButtonClick }
        /> */}
        <p data-testid="product-detail-name">
          { `${title}: R$ ` }
          <span data-testid="product-detail-price">{ price }</span>
        </p>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <button
          className="btn"
          data-testid="product-detail-add-to-cart"
          onClick={ () => updateCart(
            { title, thumbnail, price, id, quantity: 1 },
            1,
          ) }
        >
          <span className="material-symbols-outlined">
            add_shopping_cart
          </span>
        </button>
      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  // onInputChange: PropTypes.func.isRequired,
  // onButtonClick: PropTypes.func.isRequired,
};

export default ProductDetails;
