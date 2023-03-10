/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AllCollection, AllFields, ContentType } from '../../components';
import makeRequest from '../../utils/makeRequest';

import {
  GET_ALL_COLLECTION,
  BACKEND_URL,
  CREATE_CONTENT_TYPE,
  UPDATE_CONTENT_TYPE,
  DELETE_FIELD,
} from '../../constants/apiEndPoints';

import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [collection, setCollection] = useState([]);
  const [pageType, setPageType] = useState('ContentBuild');
  const [contentType, setContentType] = useState(null);
  const [addContentType, setAddContentType] = useState(false);
  const [newType, setType] = useState();

  const handleType = (item) => {
    setContentType(item);
  };

  const handleDeleteField = (id, deletedField) => {
    makeRequest(BACKEND_URL, DELETE_FIELD(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        field: deletedField,
      },
    })
      .then(() => {
        const newCollection = collection.map((item) => {
          if (item.id === id) {
            item.fields = item.fields.filter((field) => field !== deletedField);
          }
          return item;
        });
        setCollection(newCollection);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          alert(error.response.data.message);
          localStorage.removeItem('token');
          navigate('/');
        }
      });
  };
  const handleContentName = (name, id) => {
    makeRequest(BACKEND_URL, UPDATE_CONTENT_TYPE(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        name,
      },
    })
      .then(() => {
        const newCollection = collection.map((item) => {
          if (item.id === id) {
            item.name = name;
          }
          return item;
        });
        setCollection(newCollection);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          alert(error.response.data.message);
          localStorage.removeItem('token');
          navigate('/');
        }
      });
  };
  const newContentType = (e) => {
    setType(e.target.value);
  };

  const handleAddType = () => {
    setAddContentType(!addContentType);
  };
  const addNewType = () => {
    makeRequest(BACKEND_URL, CREATE_CONTENT_TYPE, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        name: newType,
      },
    })
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          alert(error.response.data.message);
          localStorage.removeItem('token');
          navigate('/');
        }
      });
  };
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
  return (
    <div className="home-page">
      <div className="collection-type">
        <div className="title-home">
          <h1>CMS+</h1>
        </div>
        <AllCollection collection={collection} setPageType={setPageType} />
      </div>
      <div className="content-page">
        <div className="content-page-title">
          <h1>Content Types</h1>
        </div>
        <div className="container-build">
          <ContentType
            collection={collection}
            handleType={handleType}
            handleAddType={handleAddType}
          />
          {contentType && (
            <AllFields
              content={contentType}
              handleContentName={handleContentName}
              handleDeleteField={handleDeleteField}
            />
          )}
          {addContentType && (
            <div className="modal-container">
              <div className="addtype-modal">
                <div className="modal-heading">Create a new content type</div>
                <label htmlFor="cotentType">Name of the content type</label>
                <input
                  type="text"
                  name="cotentType"
                  onChange={newContentType}
                />
                <div className="buttons-modal">
                  <button type="button" onClick={handleAddType}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="create"
                    onClick={() => {
                      addNewType();
                      handleAddType();
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
