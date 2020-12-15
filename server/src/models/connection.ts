import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("You are connected to the DB!");
  } catch (err) {
    console.error(err, "unable to connect to DB");
  }
};

export default connectDB;
