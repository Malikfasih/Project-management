import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      status
    }
  }
`;

// to get single project
export const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;