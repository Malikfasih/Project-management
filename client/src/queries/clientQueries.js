import { gql } from "@apollo/client"; // gql is used to make query

export const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;
