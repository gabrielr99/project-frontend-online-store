import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import PropTypes from 'prop-types';
import InputQuery from './InputQuery';
import logo from '../assets/images/logo.svg';

class Header extends Component {
  render() {
    const {
      onInputChange,
      onButtonClick,
    } = this.props;

    return (
      <header>
        <InputQuery
          onInputChange={ onInputChange }
          onButtonClick={ onButtonClick }
        />
        <nav>
          <Link
            className="nav-link"
            to="/"
          >
            <img src={ logo } alt="Logo Online Store" />
            <div>
              <h1>FRONT-END</h1>
              <h3>Online Store</h3>
            </div>
          </Link>
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
            className="nav-link test"
          >
            <span className="material-symbols-outlined icon-shopping-cart">
              shopping_cart
            </span>
          </Link>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default Header;
