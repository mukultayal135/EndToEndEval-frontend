/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import edit from '../../assets/user-edit-text-message-note@3x.png';
import deleteIcon from '../../assets/trash-delete-recycle-bin-bucket-waste@3x.png';
import './AllFields.css';

const AllFields = ({
  content,
  handleContentName,
  handleDeleteField,
  handleAddField,
}) => {
  const [editButton, setEditButton] = useState(false);
  const [addFieldButton, setAddFieldButton] = useState(false);
  const [newField, setNewField] = useState('');
  const [updateName, setUpdateName] = useState('');

  const handleEditName = () => {
    setEditButton(!editButton);
  };

  return (
    <div className="fields">
      <div className="field-content-type">
        <h1>{content.name}</h1>
        <img src={edit} onClick={handleEditName} alt="edit" />
      </div>
      <div className="fields-number">{content.fields.length} Fields</div>
      <button
        type="button"
        className="add-field-button"
        onClick={() => {
          setAddFieldButton(true);
        }}
      >
        Add Another Field
      </button>
      {content.fields.map((field) => (
        <div className="field-div" key={field}>
          <div className="data-type">Ab</div>
          <div className="fieldName padding">{field}</div>
          <div className="text padding">Text</div>
          <img className="padding" src={edit} alt="edit" />
          <img
            className="padding"
            src={deleteIcon}
            onClick={() => {
              handleDeleteField(content.id, field);
            }}
            alt="edit"
          />
        </div>
      ))}
      {editButton && (
        <div className="modal-container">
          <div className="addtype-modal">
            <div className="modal-heading">Edit content type name</div>
            <label htmlFor="cotentType">Name of the content type</label>
            <input
              type="text"
              name="cotentType"
              onChange={(e) => {
                setUpdateName(e.target.value);
              }}
            />
            <div className="buttons-modal">
              <button type="button" onClick={handleEditName}>
                Cancel
              </button>
              <button
                type="button"
                className="create"
                onClick={() => {
                  handleEditName();
                  handleContentName(updateName, content.id);
                }}
              >
                Edit Field
              </button>
            </div>
          </div>
        </div>
      )}
      {addFieldButton && (
        <div className="modal-container">
          <div className="addtype-modal">
            <div className="modal-heading">Add field</div>
            <label htmlFor="cotentType">Name of the Field</label>
            <input
              type="text"
              name="cotentType"
              onChange={(e) => {
                setNewField(e.target.value);
              }}
            />
            <div className="buttons-modal">
              <button
                type="button"
                onClick={() => setAddFieldButton(!addFieldButton)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="create"
                onClick={() => {
                  setAddFieldButton(!addFieldButton);
                  handleAddField(newField, content.id);
                }}
              >
                Add New Field
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

AllFields.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  handleContentName: PropTypes.func.isRequired,
  handleDeleteField: PropTypes.func.isRequired,
  handleAddField: PropTypes.func.isRequired,
};
export default AllFields;
