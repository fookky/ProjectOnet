const moongoose = require("mongoose");
const post = require("./models/post");

const data = [
    {
        name:"3 of swords" ,
        image:"https://i.pinimg.com/564x/c7/c7/55/c7c755588cc9cea0ed125caabd12d7cf.jpg",
        desc:"ได้ 3 แต้ม"
    },
    {   name:"The temperance" ,
        image:"https://i.pinimg.com/564x/66/23/b8/6623b83603dc5298a5a5991c1e5ac3fb.jpg",
        desc:"ชานมไข่มุก 1 แก้ว"
    },
    {   name:"The justice" ,
        image:"https://i.pinimg.com/564x/74/3b/86/743b864115f766234370a56fc35f81aa.jpg",
        desc:"ครั้งหน้าเอาใหม่นะ"
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
                    console.log("add post error");
                }else{
                    console.log("add post susses");
                }
            });
        });

    });
}
module.exports = seedDB;