/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GET_ALL_ENTRIES, BACKEND_URL } from '../../constants/apiEndPoints';
import edit from '../../assets/user-edit-text-message-note@3x.png';
import deleteIcon from '../../assets/trash-delete-recycle-bin-bucket-waste@3x.png';
import makeRequest from '../../utils/makeRequest';
import './AllEntries.css';

const AllEntries = ({ contentType }) => {
  const [entries, setEntries] = useState([]);
  const [fields, setFields] = useState([]);
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
  return entries.length !== 0 ? (
    <div className="content-page">
      <div className="content-page-title">
        <h1>{contentType.name}</h1>
      </div>
      <div className="total-entries">
        <div className="count-entry">{entries.length} Entries Found</div>
        <div className="add-entry">Add a new entry</div>
      </div>
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
                <img src={deleteIcon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

AllEntries.propTypes = {
  contentType: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
export default AllEntries;
