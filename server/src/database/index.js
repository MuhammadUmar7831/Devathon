import mongoose from "mongoose";

const connectDB = async()=>{
    try{
      const connection = await mongoose.connect(`${process.env.MONGODB_URL}`)
      console.log(`MongoDB Connected!! DB HOST: ${connection.connection.host}`)
    }catch(error){
        console.log("Mongo DB connection Error: ", error)
        process.exit(1)
    }
}


export default connectDB