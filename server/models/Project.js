import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId, // when we create a new record it will going to assign an Id that is obj Id.
    ref: "Client", // we pertain/relate ClientId to Client model
  },
});

const Project = mongoose.model("project", ProjectSchema);

export default Project;
