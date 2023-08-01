import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/inputQuery.css';

class InputQuery extends Component {
  render() {
    const {
      onInputChange,
      onButtonClick,
    } = this.props;

    return (
      <div className="container-input-search">
        <form
          className="header__form"
          onSubmit={ (event) => event.preventDefault() }
        >
          <input
            className="input-search"
            data-testid="query-input"
            type="text"
            placeholder="Busque um item"
            name="queryInput"
            onChange={ onInputChange }
          />
          <button
            className="search-btn"
            data-testid="query-button"
            type="submit"
            onClick={ onButtonClick }
          >
            <span className="material-symbols-outlined">
              search
            </span>
          </button>
        </form>
      </div>
    );
  }
}

InputQuery.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default InputQuery;
