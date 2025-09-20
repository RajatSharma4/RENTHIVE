import mongoose from 'mongoose'

const DBURL = `mongodb+srv://rajatmern:rajatcluster@mycluster.wwkkig5.mongodb.net/project_db`

export const dbConnect = async()=>{
    try{
     const connection = await mongoose.connect(DBURL)
     console.log(`database connection establish successfully`);
     
    }
    catch(err){
        console.log(err);
        
    }
}



