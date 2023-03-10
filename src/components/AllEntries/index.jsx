/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  GET_ALL_ENTRIES,
  BACKEND_URL,
  DELETE_ENTRY,
  CREATE_ENTRY,
} from '../../constants/apiEndPoints';
import NewEntryForm from '../NewEntryForm';
import edit from '../../assets/user-edit-text-message-note@3x.png';
import deleteIcon from '../../assets/trash-delete-recycle-bin-bucket-waste@3x.png';
import makeRequest from '../../utils/makeRequest';
import './AllEntries.css';

const AllEntries = ({ contentType }) => {
  const [entries, setEntries] = useState([]);
  const [fields, setFields] = useState([]);
  const [addEntry, setAddEntry] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    makeRequest(BACKEND_URL, GET_ALL_ENTRIES(contentType.id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((data) => {
      setEntries(data);
      if (data.length !== 0) {
        const allfields = Object.keys(data[0].value);
        setFields(allfields);
      }
    });
  }, [contentType]);

  const handleDeleteEntry = (id) => {
    makeRequest(BACKEND_URL, DELETE_ENTRY(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        setEntries((prevEntries) =>
          prevEntries.filter((entry) => entry.id !== id)
        );
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          alert(error.response.data.message);
          localStorage.removeItem('token');
          navigate('/');
        }
      });
  };
  const updateEntry = (data, id) => {
    makeRequest(BACKEND_URL, CREATE_ENTRY(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        ...data,
      },
    })
      .then((response) => {
        setEntries([...entries, response]);
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          alert(e.response.data.message);
          localStorage.removeItem('token');
          navigate('/');
        }
      });
  };

  return (
    <div className="content-page">
      <div className="content-page-title">
        {entries.length !== 0 && <h1>{contentType.name}</h1>}
      </div>
      <div className="total-entries">
        <div className="count-entry">{entries.length} Entries Found</div>
        <div
          className="add-entry"
          onClick={() => {
            setAddEntry(true);
          }}
        >
          Add a new entry
        </div>
        {addEntry && (
          <div className="modal-container-entries">
            <div className="addtype-modal-entries">
              <NewEntryForm
                updateEntry={updateEntry}
                name={contentType.name}
                id={contentType.id}
                setAddEntry={setAddEntry}
              />
            </div>
          </div>
        )}
      </div>
      {entries.length !== 0 ? (
        <div className="container-entries">
          <div className="attributes">
            <div className="left-entry">
              <div>ID</div>
              {fields.map((field) => (
                <div key={field}> {field}</div>
              ))}
            </div>
            <div className="right-entry">Actions</div>
          </div>
          <div />
          <div className="entries-values">
            {entries.map((entry) => (
              <div key={entry.id} className="entry">
                <div className="left-entry">
                  <div>{entry.id}</div>
                  {Object.keys(entry.value).map((key, index) => (
                    <div key={index}>{entry.value[key]}</div>
                  ))}
                </div>
                <div className="right-entry">
                  <img src={edit} />
                  <img
                    src={deleteIcon}
                    onClick={() => {
                      handleDeleteEntry(entry.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

AllEntries.propTypes = {
  contentType: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default AllEntries;
