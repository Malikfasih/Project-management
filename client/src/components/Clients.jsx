import ClientRow from './ClientRow';
import { GET_CLIENTS } from '../queries/clientQueries';
import { useQuery } from '@apollo/client';
import Spinner from './Spinner';

function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS); // we destructured 3 things from "GET_CLIENTS" query
  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Clients;
