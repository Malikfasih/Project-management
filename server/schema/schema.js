// import { projects, clients } from "../sampleData.js";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} from "graphql";

// mongoose models imported
import Client from "../models/Client.js";
import Project from "../models/Project.js";

//project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    // function returning an object
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      // if we want a project with it's client id, this is how we add relationship to different type/resources
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId); // parent means Project, and it's clientId in the model of Project
      },
    },
  }),
});

// client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    // function returning an object
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// to make a query e.g we want client by it's id, for that we will create root query object:
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      // query to get all clients, as it is a list of clients we will do GraphQllist and pass the type ClientType in it.
      type: new GraphQLList(ClientType),
      // we don't need to add args coz its a list of clients, will just resolve and return list of clients arr.
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      // if we are getting client so we need to which client we are getting it will take in 'Id'
      args: { id: { type: GraphQLID } }, // when we a query from Graphql/ Appolo within our frontend we will be passing an Id what we want for this client.
      //    in return/respond
      resolve(parent, args) {
        // we will put mongoose func here to get a single client
        return Client.findById(args.id);
      },
    },
    projects: {
      // query to get all clients, as it is a list of clients we will do GraphQllist and pass the type ClientType in it.
      type: new GraphQLList(ProjectType),
      // we don't need to add args coz its a list of clients, will just resolve and return list of clients arr.
      resolve(parent, args) {
        // accessing the database
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      // if we are getting client so we need to which client we are getting it will take in 'Id'
      args: { id: { type: GraphQLID } }, // when we a query from Graphql/ Appolo within our frontend we will be passing an Id what we want for this client.
      //    in return/respond
      resolve(parent, args) {
        // we will put mongoose func here to get a single client
        return Project.findById(args.id);
      },
    },
  },
});

// Mutations -> what we add delete update etc

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }, // GraphQlNonNull is used here to make the name must to be added by the client.
        email: { type: new GraphQLNonNull(GraphQLString) }, // GraphQlNonNull is used here to make the email must to be added by the client.
        phone: { type: new GraphQLNonNull(GraphQLString) }, // GraphQlNonNull is used here to make the phone must to be added by the client.
      },
      resolve(parent, args) {
        // Add a Client
        // creating a new client using mongoose model 'Client'
        const client = new Client({
          // below values will come from graphQl query from frontend
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        // here we are saving the created client to db
        return client.save();
      },
    },

    // Delete a Client
    deleteClient: {
      type: ClientType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        // also we will delete the project created by this client which we are deleting
        Project.find({ clientId: args.id });
        return Client.findByIdAndRemove(args.id);
      },
    },

    // Add a project
    AddProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not started",
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
    },

    // Delete Project
    deleteProject: {
      type: ProjectType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id).then((projects) => {
          // projects.forEach((project) => project.remove());
          projects.filter((project) => project.id !== args.id);
        });
      },
    },

    // Update Project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString }, // we didn't using 'GraphQlNonNull' we are updating existing name.
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate", // name of status should be unique
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true } // if it's not there it will create a new project.
        );
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export default schema;
