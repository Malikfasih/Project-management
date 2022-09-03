import mongoose from "mongoose";

const connectDB = async () => {
  const con = await mongoose.connect(process.env.MONGO_URI);

  console.log(
    `Mongodb is connected: ${con.connection.host}`.cyan.underline.bold
  );
};

export default connectDB;
