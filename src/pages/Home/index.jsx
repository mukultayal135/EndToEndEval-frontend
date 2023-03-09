import React from 'react';
import { AllCollection } from '../../components';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="collection-type">
        <div className="title-home">
          <h1>CMS+</h1>
        </div>
        <AllCollection />
      </div>
      <div className="add-type">fsdf</div>
      <div className="add-field">fsdf</div>
    </div>
  );
};

export default Home;
