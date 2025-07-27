import mongoose from "mongoose";

const mongodbUri: string = process.env.MONGO_DB as string;

// mongoose.connect(mongodbUri)
// .then(()=>console.log('Connected to the database'))
// .catch(error => console.error('Error connecting database '+ error.message))

async function dbConnect() {
  try {
    await mongoose.connect(mongodbUri);
    console.log("Database connnected");
  } catch (error: unknown) {
    console.log("Database could not connected ", error);
  }
}

dbConnect();
