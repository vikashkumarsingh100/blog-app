var express=require('express');
var app=express();
var bodyParser = require('body-parser')
var methodoverride=require("method-override");
app.use(methodoverride("_method"));
 

 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
const mongodb=require('mongodb');
const mongoose = require('mongoose');
app.set("view engine","ejs");

app.use(express.static(__dirname+"/public"));
mongoose.connect('mongodb://localhost:27017/blogapp', {useNewUrlParser: true, useUnifiedTopology: true});
//var bparser=require('body-parser');
const schema=new mongoose.Schema({
    title:{
        type:String
    },
    image:{
        type:String
    },
    body:{
        type:String
    },
    comments:{
        type:String

    }
});
const a=mongoose.model('Blog',schema);
a.insertMany({
    title:"first blog",
    image:"https://images.unsplash.com/photo-1510254497705-baa8e93b6a79?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8Ym84alFLVGFFMFl8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    body:"Welcome to the launch of the new and improved Horderly website and my first blog post! My name is Jamie Hord of Horderly Professional Organizing and I am so excited to share with you MORE of what Horderly has to offer! The amount of ideas, how-to’s and inspiration whirling around in my head is ready to jump out. I wanted to start by telling you why I created this blog, what you will be seeing more of in my posts, and my overall experience of revamping my website.",
   
   
})

app.get('/',function(req,res){
    res.redirect('/blogs');
})
app.get('/blogs',function(req,res){
     a.find({}).then(function(result)
    {
        // if(error)
        // return "error";
       // console.log(result);
        res.render('index',{result:result});
    }
    )
    app.post("/blogs/create",function(req,res){
      a.insertMany(req.body,function(error,docs){
          if(error)
          return console.log(error);
          res.redirect("/blogs");
      })
    })
   
    
})
app.get("/blogs/new",function(req,res){
    res.render("new");
})
app.get("/blogs/:id",function(req,res){
a.findById(req.params.id).then(function(result){
res.render("show",{result:result})
}).catch(function(error){
    res.send(error);
})
app.get("/blogs/:id/edit",function(req,res){
    a.findById(req.params.id).then(function(data){
        res.render("edit",{data:data})
    }
    ).catch(function(error){
        res.send(error);
    })

})
app.put("/blogs/:id",function(req,res){
    a.findByIdAndUpdate(req.params.id,req.body).then(function(data){
res.redirect("/blogs/"+req.params.id)
    }).catch(function(error){
        res.send(error)
    })})
})
app.delete("/blogs/:id",function(req,res){
    
 a.findByIdAndRemove(req.params.id).
 then(function(data){
     res.redirect("/blogs")
 }).catch(function(error){
     res.redirect("/blogs")
 })
})
app.listen(3000,function(){
    console.log("server connected");
})





