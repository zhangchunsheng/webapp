/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.com.cn
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-01-27
 * Description: 调用百度天气服务
 */
function BaiduService() {
	this.baidu_ak = "N2GcWGsVLdBHg8gQrVUoZwm8";
	this.weatherUrl = "http://api.map.baidu.com/telematics/v3/weather?output=json&ak=" + this.baidu_ak;
}

BaiduService.prototype.getWeatherReport = function(location, callback) {
	var url = this.weatherUrl + "&location=" + location;
	this.request(url, callback);
};

BaiduService.prototype.request = function(url, callback) {
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			callback(null, this.responseText);
		},
		onerror: function(e) {
			callback({}, null);
			Ti.UI.createAlertDialog({
				title: '提示',
				message: '网络连接不给力哦'
			}).show();
		},
		timeout: 10000 // in milliseconds
	});
	// Prepare the connection.
	client.open("GET", url);
	// Send the request.
	client.send();
};

module.exports = BaiduService;