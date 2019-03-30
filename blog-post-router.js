const express = require('express');
const router = express.Router();
const {ListBlogs} = require('./blog-post-model');



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
 
	blogArray.forEach(item => {
		if (item.author == Tauthor){
			empty = false;
			Blogs.push(item);
		}
	});
	if(empty){
	res.status(404).json({
		message : "Author not found in the list",
		status : 404
	});
	}
else
	res.status(200).json({
				message : "Successfully sent the blog by the author",
				status : 200,
				Blogs : Blogs
			});

	
} else
res.status(404).json({
		message : "No author sent",
		status : 404
	});


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

	blogArray.push(objectToAdd);
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
		message: " Mising iD",
		status: 400
		});

 	}


 }

 let Id2 = req.body.id;

if (Id1 == Id2){
 blogArray.forEach((item,index) =>{
 	if (item.id == Id1){
 		blogArray.splice(index,1)
	res.status(202).json({
		message: " object deleted",
		status: 202
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