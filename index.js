const express = require("express");


const userRouter=require('./routes/users')
const bookRouter=require('./routes/books')

const app = express();

const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Home page"
    })
})

app.use('/users',userRouter);
app.use('/books',bookRouter);



// app.all('*',(req,res)=>{
//     res.status(500).json({
//         message:"not build yet"})
// })

app.listen(PORT, () => {
    console.log(`server is up and running on http://localhost:${PORT}`);

})