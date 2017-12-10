var express=require('express');
var app=express();
var fs=require('fs');

//for the static files
app.use('/public', express.static(__dirname + '/public'));


app.get('/',function(req,res){
	return res.redirect('./public/home.html');
});


app.get('/music',function(req,res){

	var fileId=req.query.id;
	var file=__dirname+'/music/'+fileId;
	fs.exists(file,function(exists){
		if(exists)
		{
			var rstream=fs.createReadStream(file);
			rstream.pipe(res);
		}
		else
		{
			res.send('Error 404 !!!');
			res.end();
		}
	});

});

app.get('/download',function(req,res){

	var fileId=req.query.id;
	var file=__dirname+'/music/'+fileId;
	//var file='https://www.youtube.com/watch?v=kJQP7kiw5Fk';
	fs.exists(file,function(exists){
		if(exists)
		{
			res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
			res.setHeader('Content-Type', 'application/audio/mpeg3');
			var rstream=fs.createReadStream(file);
			rstream.pipe(res);
		}
		else{
			res.send("Its a 404");
			res.end();
		}
	});






});

app.listen(3003,function(){
	console.log('Your are listening to 3003');
});