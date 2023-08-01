import React, { Component } from 'react';
import { removeCartId, updateCart } from '../services/localStorage';

class Cart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({
      cart,
    });
  }

  updateStateLocalStore = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({
      cart,
    });
  };

  increaseItemCart = ({ id }) => {
    updateCart({ id }, 1);
    this.updateStateLocalStore();
  };

  decreaseItemCart = ({ id, quantity }) => {
    if (quantity - 1 === 0) {
      return;
    }
    const DECREASE = -1;
    updateCart({ id }, DECREASE);
    this.updateStateLocalStore();
  };

  removeItemCart = ({ id }) => {
    removeCartId({ id });
    this.updateStateLocalStore();
  };

  render() {
    const {
      cart,
    } = this.state;

    return (
      <div>
        {cart.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (
            cart.map(({ id, title, thumbnail, price, quantity }) => (
              <div key={ id }>
                <button
                  data-testid="remove-product"
                  onClick={ () => this.removeItemCart({ id }) }
                >
                  <span className="material-symbols-outlined">
                    delete
                  </span>
                </button>
                <img src={ thumbnail } alt={ title } />
                <p data-testid="shopping-cart-product-name">{title}</p>
                <p>{ price }</p>
                <div>
                  <button
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.decreaseItemCart({ id, quantity }) }
                  >
                    <span className="material-symbols-outlined">
                      remove
                    </span>
                  </button>
                  <p
                    data-testid="shopping-cart-product-quantity"
                  >
                    {`Quantidade: ${quantity}`}
                  </p>
                  <button
                    data-testid="product-increase-quantity"
                    onClick={ () => this.increaseItemCart({ id }) }
                  >
                    <span className="material-symbols-outlined">
                      add
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
      </div>
    );
  }
}

export default Cart;
