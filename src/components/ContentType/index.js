import React from 'react';
import './ContentType.css';
import PropTypes from 'prop-types';
import search from '../../assets/icon-search-dark.png';

const ContenType = ({ collection }) => {
  return (
    <div>
      <div className="content-page-title">
        <h1>Content Types</h1>
      </div>
      <div className="container-build">
        <div className="sidebar">
          {collection.length !== 0 && (
            <div className="sidebar-count">
              <h2>{collection.length} Types</h2>
              <img src={search} alt="search" />
            </div>
          )}

          <button type="button" className="add-type-button">
            + New Type
          </button>
          <div className="all-buttons">
            {collection.length !== 0 &&
              collection.map((item) => (
                <div className="button-content-type" key={item.id}>
                  <div>{item.name}</div>
                  <div>{item.fields.length}</div>
                </div>
              ))}
          </div>
        </div>
        <div className="fields">sfdds</div>
      </div>
    </div>
  );
};

ContenType.propTypes = {
  collection: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      fields: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default ContenType;
