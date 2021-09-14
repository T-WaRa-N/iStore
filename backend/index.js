// importing express and assigning to express
const express = require('express')
const app = express()
const fileHandler = require('fs')

// File to store favourite media liste for the user
//const userRequest = require('./iStoreData.json')

// body-paser import
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//helmet for some level of security to the backend app
const helmet = require('helmet')
app.use(helmet())

//importing the fetch dependency
const fetch = require('node-fetch')

//path requirements
const path = require('path')

//In production, Express needs to serve up resources that have been built                       
//from the React app. We allow this by adding the following code
if (process.env.NODE_ENV === 'production'){ 
    app.use(express.static(path.join(__dirname, 'frontend/build'))); 
    app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname,     
    'frontend', 'build','index.html')); 
  }); 
  }

  
//CRUD for data manupulation comes next//
//Post for updating user istore fetched data
app.post('/search', async(req, res)=>{

    const {term, media} = req.body

    //Excecute the block of code inside try first
    try{
        //getting 'term' and 'media' for the  body
        const iStoreRes = await fetch( `https://itunes.apple.com/search?term=${term}&media=${media}&limit=30` )
        const iStoreData = await iStoreRes.json()
        res.json(iStoreData.results)
        
    }
    //When the block of code is not successful catch the message and console.log it out to the cmd
    catch(error){
        console.log("error from the server side "+ error)
    }  
    
})

//if something broke
app.use(function(err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})

// port to run the proxy server 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});