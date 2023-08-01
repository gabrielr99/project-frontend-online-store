import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/category.css';

class Category extends Component {
  render() {
    const {
      id,
      name,
      getValueInputCategory,
    } = this.props;

    return (
      <label
        className="label-category"
        htmlFor={ id }
        data-testid="category"
      >
        <input
          className="input-category"
          type="radio"
          id={ id }
          name="categories"
          onClick={ getValueInputCategory }
          value={ name }
        />
        { name }
      </label>
    );
  }
}

Category.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  getValueInputCategory: PropTypes.func.isRequired,
};

export default Category;
