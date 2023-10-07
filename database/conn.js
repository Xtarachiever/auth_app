import mongoose from 'mongoose';

const connectMongo = async() =>{
    try{
        const {connection} = await mongoose.connect(process.env.MONGO_URL);

        if(connection.readyState == 1){
            return Promise.resolve(true)
        }
    } catch(error){
        return Promise.reject(error)
    }
}

export default connectMongo;


// import mongoose from "mongoose";

// let isConnected = false;

// export const connectToDB = async () => {
//     mongoose.set('strictQuery', true);

//     if(isConnected){
//         console.log('MongoDB is already connected');
//         return;
//     }

//     try{
//         await mongoose.connect(process.env.MONGODB_URI, {
//             dbName: "auth_app",
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })

//         isConnected = true;

//         console.log('MongoDB connected')
//     } catch(error) {
//         console.log(error);
//     }
// }