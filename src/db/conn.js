const mongoose=require('mongoose');
const atlas=`mongodb+srv://simmiblog:pass@cluster0.nfi5nqa.mongodb.net/?retryWrites=true&w=majority`
// require('../../dotenv').config();

mongoose
  .connect(atlas, {
    useNewUrlParser: true
    // useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


// mongoose.connect(atlas,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// },(err,client)=>{
//     if(err)throw err;
//     db=client.db(dbnm)
//     userCollection=db.collection("data");
//     Posts=db.collection("posts");
//     console.log(`Connected MongoDB: ${atlas}`)
//     console.log(`Database: ${dbnm}`)
//   })
//   .then((res)=>{
//     console.log('connected')
//   }).catch(()=>{
//     console.log('not-connected')
// })