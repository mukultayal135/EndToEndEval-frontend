/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import search from '../../assets/icon-search-dark.png';
import './AllCollection.css';

const AllCollection = ({ collection, setPageType }) => {
  return (
    <div className="all-collection">
      <div className="collection-header">
        <h2>COLLECTION TYPES</h2>
        <img src={search} alt="search" />
      </div>
      <div className="collection-list">
        <ul className="collection-item">
          {collection.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setPageType(item.name);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="content-builder"
        onClick={() => {
          setPageType('ContentBuild');
        }}
      >
        <h4>CONTENT TYPE BUILDER</h4>
      </div>
    </div>
  );
};

AllCollection.propTypes = {
  collection: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      fields: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  setPageType: PropTypes.func.isRequired,
};

export default AllCollection;
