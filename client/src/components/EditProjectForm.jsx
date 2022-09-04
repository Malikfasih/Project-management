import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutatons';

const EditProjectForm = ({ project }) => {
  const [clientData, setClientData] = useState({
    name: project.name,
    description: project.description,
    status: '',
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, ...clientData },
    refetchQueries: [{ query: GET_PROJECTS, variables: { id: project.id } }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProject(clientData);
  };

  return (
    <div className="mt-3">
      <h3>Update Project Details</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={clientData.name}
            onChange={(e) =>
              setClientData({ ...clientData, name: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={clientData.description}
            onChange={(e) =>
              setClientData({
                ...clientData,
                description: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={clientData.status}
            onChange={(e) =>
              setClientData({
                ...clientData,
                status: e.target.value,
              })
            }
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
