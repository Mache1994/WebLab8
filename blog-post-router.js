const express = require('express');
const router = express.Router();
const {ListBlogs} = require('./blog-post-model');
const uuidv4 = require('uuid/v4')



	router.get('/blog-posts', (req, res, next) => {
		let infoOfAllBlogs = ListBlogs.get();
		
	if (infoOfAllBlogs)
		{
		res.status(200).json({
		message : "Successfully sent the list of blogs",
		status : 200,
		sports : infoOfAllBlogs
	});
		} 
	else{

	res.status(500).json({
			message : `Internal server error.`,
			status : 500
		})
		return next();
}

});			

router.get('/blog-posts/:author', (req, res) => {
	if(req.params.author){
	let Tauthor = req.params.author;
	let Blogs = [];
	let empty = true;
 
	let infoOfSomeBlogs = ListBlogs.verifyAuthor(Tauthor);


if (infoOfSomeBlogs)
		{
		res.status(200).json({
		message : "Successfully sent the list of selected author",
		status : 200,
		sports : infoOfSomeBlogs
	});

		} 
	else{

	res.status(400).json({
			message : "No author was found with that name.",
			status : 400
		})
		return next();
}

	
} else
res.status(404).json({
		message : "No author sent",
		status : 404
	});
return next();

});	

//post
router.post('/post-blog',(req, res, next) => {
	
	let requiredFields = ['title', 'content','Author','Date'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			}).send("Finish");
		}
	}
	var H = uuidv4();

	let objectToAdd = {
			id: H,
			title: req.body.title,
			content: req.body.content,
			author: req.body.Author,
			publishDate: req.body.Date
	
	};

	ListBlogs.pushF(objectToAdd);
	res.status(201).json({
		message : "Successfully added the blog",
		status : 201,
		sport : objectToAdd
	});
});

//

router.delete('/delete-blog/:id',(req,res) =>{
if(req.params.id){
let Id1 = req.params.id;
let requiredFields = ['id'];
 for (let i=0; i<requiredFields.length; i++)
 {
 	let currentField = requiredFields[i];

 	if(!(currentField in req.body)){

	res.status(400).json({
		message: " Mising iD in body",
		status: 400
		});

 	}


 }

 let Id2 = req.body.id;

if (Id1 == Id2){

	if (!ListBlogs.deleteById(Id1))
	{
		res.status(202).json({
			message : "Object Deleted.",
			status : 202
		})
		
	}
	else
	{
		res.status(400).json({
			message : "No id was found in the list.",
			status : 400
		})
		return next();
	}
}
else{
	res.status(400).json({
		message: "parameters dont match",
		status: 400
		});
	return next();
}

res.status(404).json({
		message: "object not found",
		status: 404
		});
return next();

}
else
res.status(406).json({
		message: "mising id in arguments",
		status: 406
		});
return next();

});

// put

router.put('/blog-posts/:id',(req,res) =>{
if(req.params.id){
let Id1 = req.params.id;
let requiredFields = ['id'];
 for (let i=0; i<requiredFields.length; i++)
 {
 	let currentField = requiredFields[i];

 	if(!(currentField in req.body)){

	res.status(400).json({
		message: " Mising iD",
		status: 400
		});

 	}


 }

 let Id2 = req.body.id;

if (Id1 == Id2){
 blogArray.forEach((item,index) =>{
 	if (item.id == Id1){

 			if (req.body.title)
 			blogArray[index].title = req.body.title
			if (req.body.content)
 			blogArray[index].content = req.body.content
 			if (req.body.Author)
 			blogArray[index].author = req.body.Author
 			if (req.body.Date)
 			blogArray[index].publishDate = req.body.Date


	res.status(200).json({
		message: " object updated",
		status: 200
		});
 	}


 });
}
else
	res.status(400).json({
		message: "parameters dont match",
		status: 400
		});

res.status(404).json({
		message: "object not found",
		status: 404
		});

}
else
res.status(406).json({
		message: "mising argument",
		status: 406
		});

});

module.exports = router;