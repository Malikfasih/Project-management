import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries"; // imported to update project
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutatons";

const initialState = { name: "", description: "", clientId: "", status: "new" };

const AddProjectModal = () => {
  const [clientData, setClientData] = useState(initialState);

  const [AddProject] = useMutation(ADD_PROJECT, {
    variables: clientData,
    update(cache, { data: { AddProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        //   data: {projects: projects.concat([addProject])}, can also do this way
        data: { projects: [...projects, AddProject] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!data.name || !data.name || !data.phone)
    // return alert("Please fill out all fields");

    AddProject(clientData);
    setClientData(initialState);
  };

  // get clients for select option
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return null;
  if (error) return "Something went wrong";

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProjectModalLabel">
                    New Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form action="" onSubmit={handleSubmit}>
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

                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        id="clientId"
                        className="form-select"
                        value={clientData.clientId}
                        onChange={(e) =>
                          setClientData({
                            ...clientData,
                            clientId: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      data-bs-dismiss={initialState ? "" : "modal"}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddProjectModal;
