const mongoose=require('mongoose');

//create author schema
const authorDataSchema=new mongoose.Schema({
    nameOfAuthor:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
    }
},{"strict":"throw"})

//create user commment schema
const userCommentSchema=new mongoose.Schema({
    nameOfUser:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{"strict":"throw"})

//create article schema
const articleSchema=new mongoose.Schema({
    authorData:{
        type:authorDataSchema,
    },
    articleId:{
        type:Date,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    dateOfCreation:{
        type:String,
        required:true
    },
    dateOfModification:{
        type:String,
        required:true
    },
    comments:{
        type:[userCommentSchema],
    },
    isArticleActive:{
        type:Boolean,
        required:true
    }
},{"strict":"throw"})

const Article = mongoose.model('article',articleSchema);


module.exports=Article;