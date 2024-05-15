var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var cors=require('cors');
var mysql=require('mysql'); 
var db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodedb'
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get("/api/get/",function(req,res){
    var selectsql="select * from userinfo";
    db.query(selectsql,function(error,result){
        res.send(result);
    });
});
app.get("/api/get/:id",function(req,res){
    const {id}=req.params;
    var selectsql="select * from userinfo where id=?";
    db.query(selectsql,id,function(error,result){
        if(error) {
            console.log(error);
        }
        res.send(result);
    }); 
});
app.put("/api/put/:id",function(req,res){
    const {id}=req.params;
    const {name,address,contactno,emailaddress}=req.body;
    var updatesql="update userinfo set name=?, address=?, contactno=?, emailaddress=? where id=?";
    db.query(updatesql,[name,address,contactno,emailaddress,id],function(error,result){
        if(error) {
            console.log(error);
        }
        res.send(result);
    }); 
});
app.post("/api/post/",function(req,res){
    var name=req.body.name;
    var address=req.body.address;
    var contactno=req.body.contactno;
    var emailaddress=req.body.emailaddress;
    var sql="insert into userinfo(name,address, contactno, emailaddress) values('"+name+"','"+address+"','"+contactno+"','"+emailaddress+"')";
    db.query(sql,function(error,result){
        if(error){
            console.log(error);
        }
    });
});
app.delete("/delete/:id",function(req,res){
    const {id} =req.params;
    var sql="delete from userinfo where id=?";
    db.query(sql,id,function(error,result){
        if(error){
            console.log(error);
        }
    });
});
app.get("/",function(req,res){
    // var sql="insert into userinfo(name,gender,address,contactno,emailaddress) values('Saniya','Female','Mumbai','9453318798','saniya@gmail.com')";
    // db.query(sql,function(err,res){
    //     console.log('error',err);
    //     console.log('response',res);
    // })
    res.send("hello express");
});
app.listen(5000);