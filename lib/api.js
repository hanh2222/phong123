const request = require('request')
const Feedid = require('../models/feedid')
const apiUrl = "https://graph.facebook.com/v2.3/"

var postComment = (id,msg,token) => {
	msgEncode = encodeURIComponent(msg)
	request.get(apiUrl + id + '/comments?method=post&message=' + msgEncode + "&access_token=" + token, (err,res,body) => {
		body = JSON.parse(body)
		if(body.id){
			console.log(`đã comment "${msg}" bài viết https://facebook.com/${id}`)	
			}
		if(body.error){
			console.log(body.error)
		}
	})
}

var likePost = (id,token) => {
	request.get(apiUrl + id + "/reactions?method=post&type=LIKE&access_token=" + token,(err,res,body) => {
		body = JSON.parse(body)
		if(!body.success){
				console.log(body.error)
		}else{
			console.log("Đã like https://facebook.com/" + id)
		}
	})
}

var autoCmt = (token,arrayCmt,limit) => {
		request.get(`${apiUrl}364997627165697/feed?fields=id,message&limit=${limit}&access_token=${token}`,(err,res,body) => {
			body = JSON.parse(body)
			for(var i in  body.data){				
				if(body.data[i].message){
					var msg = body.data[i].message.toLowerCase()
					if(msg.indexOf("#j2team_share") != -1){ // tìm những bài viết có #j2team_share
						const msgCmt = randomArray(arrayCmt)
				 		const id = body.data[i].id
				 		Feedid.findOne({feedid : id}) // tìm trong mongo
				 		.then((result) => {
							if(result){
								//next()		
							}else{
								var feedid = new Feedid({
									feedid : id
								})
								feedid.save() // lưu vào mongo để không trùng id
								.then((doc) => {
									likePost(doc.feedid,token)
									postComment(doc.feedid,msgCmt,token)
								})
								
							}
						})
				 	}
				}
			}
		})
}


var randomArray = (ary) => { 
	var aryNumber = []
	for(var i = 0; i < ary.length; i++){
		aryNumber.push(i)
		if(aryNumber.length == ary.length){
			var textRandom =  aryNumber.join("") // chuyển các key thành string
			return	ary[makeid(textRandom)]
		}
	}
}

//random số để lấy ra id
function makeid(textRandom) { 
  var text = "";
  var possible = textRandom

  for (var i = 0; i < 1; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports  = { autoCmt }