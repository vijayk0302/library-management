# library-management

 This a library management API backend for the manage of users and books

 # Root and the Endpoint

 ## /users
 Get:get all the users in the system
 POST: create/register a new user

 ## /user/(id)
 Get: get a user by their id 
 PUT: updating auser by their id
 DELETE: Deleting a user by their ID(check if the user has an issued book ) &&(is there any fing/penalty to be collected)

 ## /user/subscription-details/id
 GET: get a user subscription details
   >> Date of subscription
   >> vaild till
   >> fine if any

## /book
Get: get all the books in the system
Post: Add a new book to the system

## /book/(id)
Get: get a book bye their id 
Put: Update a book bye its id
DELETE: delete a book by its id

## /book/isued
Get: all the book issued books

## /book/issued/withfine
Get: get all issued book with their fine amount

## subscrption Types 
 >> Basic(3 months)
 >> Standard(6 months)
 >> premium (12 months)


>> if a user missed the renewal date, then user should be collected with $100 as fine
>> if a user missed the subscription date, then user should be collected with $100 as fine
>> if a user missed both, then user should be collected with $200 as fine

## command
npm init
npm i express
npm inodemon --save-dev


npm run dev

to restore node modules and package-lock.json --> npm i/npm install
