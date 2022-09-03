import { FaTrash } from "react-icons/fa";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id }, // we know which client we are deleting we will passed another para pf objs, in that we will add variables obj
    // we want deleteClient api to also reflect on UI, like if it will delete client from backend it should aslo instant remove from UI so we don't need to refresh the page.

    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }], // 1 way // here we also deleting the project associated with the client.
    // update(cache, { data: { deleteClient } }) {
    //   // 2 way // here we have a func'update' where we are passing the 'cache' and 'data' with the response of deleteClient
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS }); // it will get the query from the cache.
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
