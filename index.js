import serverless from "serverless-http";
import express  from "express";
import cors  from "cors";


const app =  express();
app.use(cors());
app.use(express.json({limit:"30mb" ,extended:true}))
app.use(express.urlencoded({limit:"30mb" ,extended:true}))


app.get("/",(req,res)=>{
    res.send("I am Running");
})

function calculateDifference(vector1, vector2) {
    return Math.sqrt(vector1.reduce((acc, val, index) => acc + (val - vector2[index]) ** 2, 0));
}
const bookCollection={
    "Book1":[6,3],
    "Book2":[3,5],
    "Book3":[7,5],
    "Book4":[4,5],
    "Book5":[2,4],
    "Book6":[5,2],
    "Book7":[1,3],
    "Book8":[7,4],
    "Book9":[5,3],
    "Book10":[4,2]
    
}
const genreCollection = {
  "Thriller":[7,1],
  "Drama":[2,4],
  "Fear":[5,1],
  "Action":[2,6],
  "Romance":[7,3],
} 
const personalityCollection = {
    "Introvert":[6,2],
    "Extrovert":[3,5]
}

app.post('/',async(req, res)=>{
  const {params1, params2} = req.body;
  const genreVector = genreCollection[params1];
  const personalityVector = personalityCollection[params2];
  const userVector = genreVector.map((value, index)=>
      value + personalityVector[index]
  );
  const vectorDiff = [];
  
  for(let key in bookCollection)
  {
  
      const diff = calculateDifference(userVector, bookCollection[key]);
      vectorDiff.push({diff,key});
  }
  vectorDiff.sort((a, b) => a.diff - b.diff);
  const matchedBooks = vectorDiff.slice(0,2);
  console.log(matchedBooks)
  res.json(matchedBooks)
})
const port=7000;
app.listen(port,()=>{
    console.log("App is running at 7000")
})
export const handler = serverless(app)