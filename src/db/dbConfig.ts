import mongoose from "mongoose";

export async function connectDb() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log(`Mongo Database connected successfully with host: ${connection.host}`)
        })
    } catch (error: any) {
        console.log("Error connecting to the Database: ", error.message)
    }
}