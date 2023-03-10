/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import makeRequest from '../../utils/makeRequest';
import { BACKEND_URL, GET_ALL_COLLECTION } from '../../constants/apiEndPoints';
import './NewEntryForm.css';

const NewEntryForm = ({ name, id, setAddEntry, updateEntry }) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [fields, setFields] = useState([]);
  useEffect(() => {
    makeRequest(BACKEND_URL, GET_ALL_COLLECTION, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        const collection = response.filter((item) => item.id === id);
        setFields(collection[0].fields);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          alert(error.response.data.message);
          localStorage.removeItem('token');
          navigate('/');
        }
      });
  }, []);

  const onSubmit = (data) => {
    updateEntry(data, id);
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>New {name}</h1>
        {fields.length !== 0 &&
          fields.map((field) => (
            <div key={field} className="field">
              <label htmlFor={field}>{field}</label>
              <input type="string" name={field} {...register(field)} />
            </div>
          ))}
        <div className="entries-form-buttons">
          <button
            type="button"
            className="cancel"
            onClick={() => setAddEntry(false)}
          >
            Cancel
          </button>
          <button type="submit" className="add-button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

NewEntryForm.propTypes = {
  updateEntry: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  setAddEntry: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
export default NewEntryForm;
