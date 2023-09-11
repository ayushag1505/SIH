const express= require('express')
const app= express() ;
const mongoose= require('mongoose') ;
const path= require('path')
const methodOverride= require('method-override')


app.set('view engine', 'ejs') ;
app.set('views', path.join(__dirname, '/views'))

// MiddleWare
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


// MongoDB Connection
mongoose.connect('mongodb+srv://dhruvsingh235443:t1VAf70fOcOk887p@cluster0.mshqacv.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>{
        console.log('DB connected')
    })
    .catch((err)=>{
        console.log('Something Went Wrong') 
        console.log(err) 
    })



// Error Page
app.get('*', (req, res)=>{
    res.send('Page Not Found!!!')
})


// Port Connection
app.listen(8000, (req, res)=>{
    console.log("port Connected at 8000")
})