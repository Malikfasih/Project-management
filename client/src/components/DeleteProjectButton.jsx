import { useNavigate } from 'react-router-dom'; // to redirect back to home page after del
import { GET_PROJECTS } from '../queries/projectQueries';
import { useMutation } from '@apollo/client';
import { DELETE_PROJECT } from '../mutations/projectMutatons';
import { FaTrash } from 'react-icons/fa';

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],

    // update(cache, { data: {deleteProject}}){
    // const {projects} = cache.readQuery({ query: GET_PROJECTS}),
    // }
  });
  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
