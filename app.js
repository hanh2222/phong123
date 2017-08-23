var cron = require('node-cron');
var api = require('./lib/api')

var token = "EAAAAAYsX7TsBABZBPZAbsukr6hHuZABnJRSZCJRBODLKK6B1tLra4l3f4A0h5fUdb76iyD77GWUjnt4kaJobZApNUYbZALhatDS1VV6kIyTSl0FrQhSHmadoyjpp4BpW5ZBgpnpFtHLhPOZA47m9BeWSE6oXaZAkqq9Mxmkzxj8ZCkOwZDZD" // token full quyền vào đây
var arrayCmt = ["hello",]


cron.schedule('*/5 * * * *', () => {  // đến 30 phút sẽ chạy
	//chỉ lấy 5 bài viết 
    api.autoCmt(token,arrayCmt,5)
});
