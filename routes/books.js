const express= require('express');
const {books}=require('../data/books.json')
const {users}=require('../data/users.json')
const router=express.Router();

/**
 * route /users
 * method GET
 * description GET all the list of users in the system
 * access: public
 * parameter: none
 */

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    })
})

/**
 * route /users/id
 * method GET
 * description:get a user by their id
 * access: public
 * parameter: id
 */

router.get('/:id', (req, res) => {

    const bookId = Number(req.params.id);
    const book = books.find((each) => each.id === bookId)

    if (!book) {
        return res.status(200).json({
            success: false,
            data: (`book not found for ${bookId}`)
        })

    }
    res.status(200).json({
        success: true,
        data: book
    })
})

/**
 * route /books
 * method POST
 * description: Register a new book
 * access: public
 * parameter: none
 */

router.post('/', (req, res) => {
    const {id,name,author, genre,price,publisher}=req.body;
    if(!id || !name || !author|| !genre || !price || !publisher){
        return res.status(400).json({
            success: false,
            message:`please provide all the required feilds`

        })
    }
    const book =books.find((each)=>each.id===id)
    if(book){
        return res.status(409).json({
            success: false,
            message:`book already exists with id ${id}`

        })
    }
    books.push({ 
        id,name,author, genre,price,publisher
    })

    res.status(400).json({
            success: false,
            message:`book created successfully` 

        })
})
/**
 * route /books/:id
 * method Put
 * description: updating a book by their id
 * access: public
 * parameter: id
 */

router.put('/:id', (req, res)=>{
     const bookId = Number(req.params.id);
    const data = req.body;
    const book = books.find((each) => each.id === bookId)

    if(!book){
        return res.status(404).json({
            success: false,
            message:`book not found with id:${bookId}` 
        })
    }
    const bookUpdate=books.map((each)=>{
        if(each.id===bookId){
            return {
                ...each,
                ...data,

            }
            return each
        }
    })
    res.status(200).json({
        success: true,
        data:bookUpdate,
        message:`book updated`
    })
})

/**
 * route /users/:id
 * method delete
 * description: Deleting a user by their ID
 * access: public
 * parameter: id
 */

router.delete('/:id', (req, res)=>{
    const bookId = Number(req.params.id);

    const book = books.find((each) => each.id === bookId)

    if(!book){
        return res.status(404).json({
            success: false,
            message:`book not found with id:${userId}` 
        })
    }
    //method 1 
    const updatedBook=books.filter((each)=>each.id !==bookId)


    //method 2
    // const index=books.indexOf(book);
    //books.splice(index,1)
    
     res.status(200).json({
        success: true,
        data:updatedBook,
        message:`book deleted`
    })
    
})
/**
 * route /books/issued/for-user
 * method Get
 * description: Get all issued book
 * access: public
 * parameter: none
 */

router.get('/issued/for-user',(req,res)=>{

    const userWithIssuedBooks=users.filter((each)=>{
        if(each.issuedbook){
            return each;
        }
    })

    const issuedbook=[];
    userWithIssuedBooks.forEach((each)=>{
        const book=books.find((book)=>book.id===each.issuedbook);
          if (!book) return;

        book.issuedby=book.name;
        book.issuedDate=each.issueddate;
        book.returnDate=each.returndate;

        issuedbook.push(book)

    })
    if(!issuedbook===0){
        return res.status(404).json({
            success:false,
            message:"no book issued yet"
        })
    }


    res.status(200).json({
        success:true,
        message:book
        
    })

})


module.exports =router;