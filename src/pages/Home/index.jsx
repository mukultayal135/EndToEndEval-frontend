/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AllCollection, ContentType } from '../../components';
import makeRequest from '../../utils/makeRequest';

import { GET_ALL_COLLECTION, BACKEND_URL } from '../../constants/apiEndPoints';

import './Home.css';

const Home = () => {
  const [collection, setCollection] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [collectionType, setCollectionType] = useState('');
  const [pageType, setPageType] = useState('ContentBuild');

  const navigate = useNavigate();

  useEffect(() => {
    makeRequest(BACKEND_URL, GET_ALL_COLLECTION, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setCollection(response);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          alert(error.response.data.message);
          localStorage.removeItem('token');
          navigate('/');
        }
      });
  }, []);
  return collection.length !== 0 ? (
    <div className="home-page">
      <div className="collection-type">
        <div className="title-home">
          <h1>CMS+</h1>
        </div>
        <AllCollection collection={collection} setPageType={setPageType} />
      </div>
      <div className="content-page">
        {pageType === 'ContentBuild' ? (
          <ContentType collection={collection} />
        ) : (
          <div>{pageType}</div>
        )}
      </div>
    </div>
  ) : (
    <div className="DataLoader">
      <p>Loading....</p>
    </div>
  );
};

export default Home;
