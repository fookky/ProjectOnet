const moongoose = require("mongoose");
const post = require("./models/post");
const comment = require("./models/comment");
const learn = require("./models/learn");
const department = require("./models/department");

const data = [
    {
        name:"3 of swords" ,
        image:"https://i.pinimg.com/564x/c7/c7/55/c7c755588cc9cea0ed125caabd12d7cf.jpg",
        desc:"ได้ 3 แต้ม",
        author:"No name"
    },
    {   name:"The temperance" ,
        image:"https://i.pinimg.com/564x/66/23/b8/6623b83603dc5298a5a5991c1e5ac3fb.jpg",
        desc:"ชานมไข่มุก 1 แก้ว",
        author:"No name"
    },
    {   name:"The justice" ,
        image:"https://i.pinimg.com/564x/74/3b/86/743b864115f766234370a56fc35f81aa.jpg",
        desc:"ครั้งหน้าเอาใหม่นะ",
        author:"No name"
    }
]

const learns = [
    {
        name:"3 of swords" ,
        image:"https://i.pinimg.com/564x/c7/c7/55/c7c755588cc9cea0ed125caabd12d7cf.jpg",
        desc:"ได้ 3 แต้ม",
        author:"No name"
    },
    {   name:"The temperance" ,
        image:"https://i.pinimg.com/564x/66/23/b8/6623b83603dc5298a5a5991c1e5ac3fb.jpg",
        desc:"ชานมไข่มุก 1 แก้ว",
        author:"No name"
    },
    {   name:"The justice" ,
        image:"https://i.pinimg.com/564x/74/3b/86/743b864115f766234370a56fc35f81aa.jpg",
        desc:"ครั้งหน้าเอาใหม่นะ",
        author:"No name"
    }
    
]

const departments = [
    {
        name:"3 of swords" ,
        image:"https://i.pinimg.com/564x/c7/c7/55/c7c755588cc9cea0ed125caabd12d7cf.jpg",
        desc:"ได้ 3 แต้ม",
        author:"No name"
    },
    {   name:"The temperance" ,
        image:"https://i.pinimg.com/564x/66/23/b8/6623b83603dc5298a5a5991c1e5ac3fb.jpg",
        desc:"ชานมไข่มุก 1 แก้ว",
        author:"No name"
    },
    {   name:"The justice" ,
        image:"https://i.pinimg.com/564x/74/3b/86/743b864115f766234370a56fc35f81aa.jpg",
        desc:"ครั้งหน้าเอาใหม่นะ",
        author:"No name"
    }
]


function seedDB(){
    post.remove({},function(err){
        if(err){
            console.log("remove susses");
        }
        console.log("Drop susses");
        data.forEach(function(seed){
            post.create(seed,function(error,post){
                if(error){
                    console.log(err);
                }else{
                    console.log("add post susses");
                    // comment.create({
                    //     text: "eazy",
                    //     username:"fookky"
                    // },function(err,comment){
                    //     if(err){
                    //         console.log(err);
                    //     }else{
                    //         post.comments.push(comment);
                    //         post.save();
                    //         console.log("Create comment success");
                    //     }
                    // });
                }
            });
        });

    });
}

module.exports = seedDB;