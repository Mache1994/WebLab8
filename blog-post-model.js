const uuidv4 = require('uuid/v4')
var a = new Date("2015-03-25");
var b = new Date("2016-04-25");
var c = new Date("2017-06-25");
var d = uuidv4();
var e = uuidv4();
var f = uuidv4();


let blogDB = [
					{
	id: d ,
	title: "Learn to cook in 7 days",
	content: "Article 1",
	author: "Daniel",
	publishDate: a
					},
					{
	id: e,
	title: "Learn to code in 7 days",
	content: "Article 2",
	author: "Maxwel",
	publishDate: b
					},
					{
	id: f,
	title: "Learn to translate in 7 days",
	content: "Article 3",
	author: "Daniel",
	publishDate: c
					}
				];


const ListBlogs = {
	get : function(){
		return blogDB;
	},

	verifyId : function(id){

		blogDB.forEach(item => {
		if ( id == item.id ){
		 	return true
		}
	});
		return false;
	},


		deleteById : function(id){

		blogDB.forEach((item,index) => {
		if ( id == item.id ){
			blogDB.splice (index,1);
		 	return true
		}
	});
		return false;
	},

		updateTitle : function(id, title){

		blogDB.forEach((item,index) => {
		if ( id == item.id )
		{
			blogDB[index].title = title;
		}
											});


		},


		updateContent : function(id, content){

			blogDB.forEach((item,index) => {
		if ( id == item.id )
		{
			blogDB[index].content = content;
		}
											});


		}, 

		updateAutor : function(id, author){

			blogDB.forEach((item,index) => {
		if ( id == item.id )
		{
			blogDB[index].author = author;
		}
											});


		},

		

		updateDate : function(id, date){

			blogDB.forEach((item,index) => {
		if ( id == item.id )
		{
			blogDB[index].publishDate = date;
		}
											});

		},



	verifyAuthor : function(author){
		let blog = [{}];

		blogDB.forEach(item => {
		if ( author == item.author ){
		 	blog.push(item);
		}
	});
		return blog;
	},


	pushF : function (item){
		blogDB.push(item);

	}

	
}

module.exports = {ListBlogs};