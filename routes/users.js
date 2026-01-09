const express= require('express');
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
        data: users
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

    const userId = Number(req.params.id);
    const user = users.find((each) => each.id === userId)

    if (!user) {
        return res.status(200).json({
            success: false,
            data: (`user not found for ${userId}`)
        })

    }
    res.status(200).json({
        success: true,
        data: user
    })
})

/**
 * route /users
 * method POST
 * description: Create/register a new user
 * access: public
 * parameter: none
 */

router.post('/', (req, res) => {
    const {id,name,surname,email,subscriptiontype,subscriptiondate}=req.body;
    if(!id || !name || !surname|| !email || !subscriptiontype || !subscriptiondate){
        return res.status(400).json({
            success: false,
            message:`please provide all the required feilds`

        })
    }
    const user =users.find((each)=>each.id===id)
    if(user){
        return res.status(409).json({
            success: false,
            message:`user already exists with id ${id}`

        })
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptiontype,
        subscriptiondate
    })

    res.status(400).json({
            success: false,
            message:`user created successfully` 

        })
})


/**
 * route /users/:id
 * method Put
 * description: updating auser by their id
 * access: public
 * parameter: id
 */

router.put('/:id', (req, res)=>{
     const userId = Number(req.params.id);
    const data = req.body;
    const user = users.find((each) => each.id === userId)

    if(!user){
        return res.status(404).json({
            success: false,
            message:`user not found with id:${userId}` 
        })
    }
    const userUpdate=users.map((each)=>{
        if(each.id===userId){
            return {
                ...each,
                ...data,

            }
            return each
        }
    })
    res.status(200).json({
        success: true,
        data:userUpdate,
        message:`user updated`
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
    const userId = Number(req.params.id);

    const user = users.find((each) => each.id === userId)

    if(!user){
        return res.status(404).json({
            success: false,
            message:`user not found with id:${userId}` 
        })
    }
    //method 1 
    const updatedUser=users.filter((each)=>each.id !==userId)


    //method 2
    // const index=users.indexOf(user);
    //users.splice(index,1)
    
     res.status(200).json({
        success: true,
        data:updatedUser,
        message:`user deleted`
    })


})

/**
 * route /users/subscription-details/:id
 * method delete
 * description: To get 
 * access: public
 * parameter: id
 */
router.get('/subscription-details/:id',(req,res)=>{

     const userId = Number(req.params.id);

    const user = users.find((each) => each.id === userId)

    if(!user){
        return res.status(404).json({
            success: false,
            message:`user not found with id:${userId}` 
        })
    }
    const getDateInDay=(data='')=>{
        let date;
        if(data){
            date= new Date(data)
        }else {
            date= new Date();
        }
        let days=Math.floor(date/(1000*60*60*24));
            return days;
    }

    const subscriptionType=(data)=>{
        if (user.subscriptionType=='basic'){
            date=date+90;
        }else if(user.subscriptionType=='Standard'){
            date=date+180;
        }else if(user.subscriptionType=='Premium'){
            date=date+365;
        }
        return date;
    }
})



module.exports =router;