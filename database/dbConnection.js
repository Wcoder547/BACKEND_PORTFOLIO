import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "PORTFOLIO" })
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log(`Some Error Occured while connecting the databse :${err}`);
    });
};

export default dbConnection;
