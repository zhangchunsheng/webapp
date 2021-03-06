/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.com.cn
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-01-27
 * Description: 欢迎界面，包括日期，天气，限行等信息
 */
function WelcomeWindow() {
	var date = new Date();
	var self = this;
	var isMobileWeb = Ti.Platform.osname === 'mobileweb',
		isTizen = Ti.Platform.osname === 'tizen',
		isIOS = (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad');
		
	var width = Ti.Platform.displayCaps.platformWidth,
		height = Ti.Platform.displayCaps.platformHeight,
		dpi = Ti.Platform.displayCaps.dpi;
	
	this.isAndroid = Ti.Platform.name === 'android';
	this.isTizen = Ti.Platform.osname === 'tizen';
	
	var config = {
		dateView: {
			color: '#302C69',
			width: 532 / 2,
			height: 70 / 2,
			//height: Ti.UI.SIZE,
			layout: 'horizontal',
			top: 112,
			left: 52 / 2
		},
		todayWeatherView: {
			color: '#272356',
			width: 466 / 2,
			height: 142 / 2,
			backgroundImage: '/images/temperature_bg.png',
			top: 204,
			//opacity: 0.5,
			left: 86 / 2,
			//height: Ti.UI.SIZE,
			layout: 'vertical'
		},
		weatherReportView: {
			color: '#4F4C83',
			width: 466 / 2,
			height: 256 / 2,
			//height: 140,
			top: 400,
			left: 86 / 2
		},
		trafficControlsView: {
			color: '#272557',
			width: 564 / 2,
			height: 254 / 2,
			//backgroundColor: '#BBBFD8',
			backgroundImage: '/images/temperature_bg.png',
			//opacity: 0.5,
			top: 702,
			left: 38 / 2,
			layout: 'vertical',
			subView: {
				trafficControlsTitleImage: {
					backgroundImage: '/images/car_icon.png',
					width: 54 / 2,
					height: 36 / 2,
					top: 36 / 2
				},
				trafficControlsImage: {
					backgroundImage: '/images/forbidden_icon.png',
					width: 36 / 2,
					height: 36 / 2
				}
			}
		},
		enterButtonView: {
			title: '进入应用',
			bottom: 0,
			color: '#302C69',
			width: Ti.UI.FILL,
			height: 100 / 2,
			backgroundColor: '#A1A1AD',
			opacity: 0.5
		}
	};
	
	if(height == 568) {
		config.dateView.top = (config.dateView.top) / 2;
		config.todayWeatherView.top = (config.todayWeatherView.top) / 2;
		config.weatherReportView.top = (config.weatherReportView.top) / 2;
		config.trafficControlsView.top = (config.trafficControlsView.top) / 2;
	} else {
		config.dateView.top = (config.dateView.top - 100) / 2 + 5;
		config.todayWeatherView.top = (config.todayWeatherView.top - 100) / 2;
		config.weatherReportView.top = (config.weatherReportView.top - 140) / 2;
		config.trafficControlsView.top = (config.trafficControlsView.top - 176) / 2;
	}
	
	// 天气预报、车辆先行、定位
	var welcomeWindow = Ti.UI.createWindow({
		title: '盛隆提醒',
		//layout: 'vertical',
		backgroundImage: 'images/springFestival.jpg'
	});
	this.welcomeWindow = welcomeWindow;
	this.weatherImagePath = 'images/weather/icons/day/';
	this.weatherImageCachePath = '';
	
	var fontColor = '#fff';
	this.fontColor = fontColor;
	
	//日期
	var dateView = Ti.UI.createView(config.dateView);
	welcomeWindow.add(dateView);
	this.dateYearLabel = Ti.UI.createLabel({
		color: config.dateView.color,
		font: {fontSize: 30},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: date.getFullYear(),
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	this.dateYearUnitLabel = Ti.UI.createLabel({
		color: config.dateView.color,
		font: {fontSize: 16},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: "年",
		bottom: 5,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	this.dateMonthLabel = Ti.UI.createLabel({
		color: config.dateView.color,
		font: {fontSize: 30},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: (date.getMonth() + 1),
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	this.dateMonthUnitLabel = Ti.UI.createLabel({
		color: config.dateView.color,
		font: {fontSize: 16},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: "月",
		bottom: 5,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	this.dateLabel = Ti.UI.createLabel({
		color: config.dateView.color,
		font: {fontSize: 30},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: date.getDate(),
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	this.dateUnitLabel = Ti.UI.createLabel({
		color: config.dateView.color,
		font: {fontSize: 16},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: "日",
		bottom: 5,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	dateView.add(this.dateYearLabel);
	dateView.add(this.dateYearUnitLabel);
	dateView.add(this.dateMonthLabel);
	dateView.add(this.dateMonthUnitLabel);
	dateView.add(this.dateLabel);
	dateView.add(this.dateUnitLabel);

	
	this.weekday = new Array(7);
	this.weekday[0] = "星期天";
	this.weekday[1] = "星期一";
	this.weekday[2] = "星期二";
	this.weekday[3] = "星期三";
	this.weekday[4] = "星期四";
	this.weekday[5] = "星期五";
	this.weekday[6] = "星期六";
	
	this.spoken_weekday = new Array(7);
	this.spoken_weekday[0] = "周日";
	this.spoken_weekday[1] = "周一";
	this.spoken_weekday[2] = "周二";
	this.spoken_weekday[3] = "周三";
	this.spoken_weekday[4] = "周四";
	this.spoken_weekday[5] = "周五";
	this.spoken_weekday[6] = "周六";
	this.weekLabel = Ti.UI.createLabel({
		color: config.dateView.color,
		font: {fontSize: 16, fontStyle: 'italic'},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: this.weekday[date.getDay()],
		left: 40,
		bottom: 5,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	dateView.add(this.weekLabel);
	
	//天气情况
	var weathersData = [],
		row,
		firstLabelTop = 10,
		firstLabelLeft = 10,
		marginTop = 30,
		marginLeft = 60,
		top,
		left,
		dateLabels = [],
		weatherLabels = [],
		windLabels = [],
		situationImageLabels = [],
		temperatureLabels = [];
	this.dateLabels = dateLabels;
	this.weatherLabels = weatherLabels;
	this.windLabels = windLabels;
	this.situationImageLabels = situationImageLabels;
	this.temperatureLabels = temperatureLabels;
	
	weathersData = this.readFile("data/weather/weather.txt");
	
	var todayWeather = Ti.UI.createView(config.todayWeatherView);
	var todayWeatherView = Ti.UI.createView({
		layout: 'horizontal',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	todayWeather.add(todayWeatherView);
	welcomeWindow.add(todayWeather);
	
	this.temperatureLabel = Ti.UI.createLabel({
		color: config.todayWeatherView.color,
		font: {fontSize: 40},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: weathersData.results[0].weather_data[0].temperature + '',//°
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		top: 12// 71 - (40 + 7)
	});
	todayWeatherView.add(this.temperatureLabel);
	var fileName = this.getFileName(weathersData.results[0].weather_data[0].dayPictureUrl);
	this.situationImageLabel = Ti.UI.createLabel({
		backgroundImage: this.weatherImagePath + fileName,
		width: 42,
		height: 30,
		bottom: 14
	});
	//todayWeatherView.add(this.situationImageLabel);
	this.situationTextLabel = Ti.UI.createLabel({
		color: config.todayWeatherView.color,
		font: {fontSize: 16},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: weathersData.results[0].currentCity,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		left: 10,
		top: 26
	});
	todayWeatherView.add(this.situationTextLabel);
	
	// weathersView
	var weathersView = Ti.UI.createView(config.weatherReportView);
	
	var weather_data = weathersData.results[0].weather_data;
	for(var i = 0 ; i < weather_data.length ; i++) {
		top = firstLabelTop + i * marginTop;
		left = firstLabelLeft;
		//date
		dateLabels.push(Ti.UI.createLabel({
			color: config.weatherReportView.color,
			left: left,
			text: weather_data[i].date.substr(0, 2),
			width: Ti.UI.SIZE,
			height: 20,
			top: top,
			showOffset: {x:5, y:5},
		}));
		weathersView.add(dateLabels[i]);
		
		//temperature
		left = firstLabelLeft + 1 * marginLeft - 20;
		temperatureLabels.push(Ti.UI.createLabel({
			color: config.weatherReportView.color,
			left: left,
			text: weather_data[i].temperature,//°
			width: Ti.UI.SIZE,
			height: 20,
			top: top,
			showOffset: {x:5, y:5},
		}));
		weathersView.add(temperatureLabels[i]);
		
		//picture
		left = firstLabelLeft + 2 * marginLeft;
		fileName = this.getFileName(weather_data[i].dayPictureUrl);
		situationImageLabels.push(Ti.UI.createLabel({
			backgroundImage: this.weatherImagePath + fileName,
			width: 32,//42
			height: 20,//30
			top: top,
			left: left
		}));
		weathersView.add(situationImageLabels[i]);
		
		//weather
		left = firstLabelLeft + 3 * marginLeft + 10;
		weatherLabels.push(Ti.UI.createLabel({
			color: config.weatherReportView.color,
			left: left,
			text: weather_data[i].weather,
			width: Ti.UI.SIZE,
			height: 20,
			top: top,
			showOffset: {x:5, y:5},
		}));
		//weathersView.add(weatherLabels[i]);
		
		//wind
		left = firstLabelLeft + 3 * marginLeft - 10;
		windLabels.push(Ti.UI.createLabel({
			color: config.weatherReportView.color,
			left: left,
			text: weather_data[i].wind,
			width: Ti.UI.SIZE,
			height: 20,
			top: top,
			showOffset: {x:5, y:5},
		}));
		weathersView.add(windLabels[i]);
	}
	welcomeWindow.add(weathersView);
	
	//trafficControls
	trafficControls = this.readFile("data/services/trafficControls.txt");
	
	this.trafficControlsView = Ti.UI.createView(config.trafficControlsView);
	
	var trafficControlsLine1 = Ti.UI.createView({
		layout: 'horizontal',
		height: config.trafficControlsView.height / 3,
   		width: Ti.UI.SIZE
	});
	var trafficControlsLine2 = Ti.UI.createView({
		layout: 'horizontal',
		height: config.trafficControlsView.height / 3,
   		width: Ti.UI.SIZE
	});
	var trafficControlsLine3 = Ti.UI.createView({
		layout: 'horizontal',
		height: config.trafficControlsView.height / 3,
   		width: Ti.UI.SIZE
	});
	this.trafficControlsView.add(trafficControlsLine1);
	this.trafficControlsView.add(trafficControlsLine2);
	this.trafficControlsView.add(trafficControlsLine3);
	
	var trafficControlsTitleImage = Ti.UI.createView(config.trafficControlsView.subView.trafficControlsTitleImage);
	var trafficControlsTitle = Ti.UI.createLabel({
		color: config.trafficControlsView.color,
		font: {fontSize: 20},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: " 禁行车辆",
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		top: config.trafficControlsView.subView.trafficControlsTitleImage.top - 4
	});
	trafficControlsLine1.add(trafficControlsTitleImage);
	trafficControlsLine1.add(trafficControlsTitle);
	
	var trafficControlsImage1 = Ti.UI.createView(config.trafficControlsView.subView.trafficControlsImage);
	trafficControlsLine2.add(trafficControlsImage1);
	this.todayLimitCarWeekLabel = Ti.UI.createLabel({
		color: config.trafficControlsView.color,
		font: {fontSize: 20},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: " " + this.spoken_weekday[date.getDay()] + "：  ",
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	trafficControlsLine2.add(this.todayLimitCarWeekLabel);
	this.todayLimitCarLabel = Ti.UI.createLabel({
		color: config.trafficControlsView.color,
		font: {fontSize: 26,fontWeight: 'bold'},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: trafficControls.todayLimitCarNum.replace("和", "/"),
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	trafficControlsLine2.add(this.todayLimitCarLabel);
	
	var trafficControlsImage2 = Ti.UI.createView(config.trafficControlsView.subView.trafficControlsImage);
	trafficControlsLine3.add(trafficControlsImage2);
	this.tomorrowLimitCarWeekLabel = Ti.UI.createLabel({
		color: config.trafficControlsView.color,
		font: {fontSize: 20},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: " " + this.spoken_weekday[this.getTomorrowWeek(date)] + "：  ",
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	trafficControlsLine3.add(this.tomorrowLimitCarWeekLabel);
	this.tomorrowLimitCarLabel = Ti.UI.createLabel({
		color: config.trafficControlsView.color,
		font: {fontSize: 26,fontWeight: 'bold'},
		//showColor: '#aaa',
		showOffset: {x:5, y:5},
		shadowRadius: 3,
		text: trafficControls.tomorrowLimitCarNum.replace("和", "/"),
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE
	});
	trafficControlsLine3.add(this.tomorrowLimitCarLabel);
	
	welcomeWindow.add(this.trafficControlsView);
	
	enterBtn = Ti.UI.createButton(config.enterButtonView);
	isTizen || (enterBtn.style = Ti.UI.iPhone.SystemButtonStyle.PLAIN);
	welcomeWindow.add(enterBtn);
	enterBtn.addEventListener('click', function() {
		if(welcomeWindow.menuWindow != null) {
			welcomeWindow.menuWindow.close();
			welcomeWindow.menuWindow = null;
		}
		welcomeWindow.close();
	});
	
	welcomeWindow.addEventListener('open', function() {
		self.updateDateLabel();
		var weatherUtil = require('utils/weatherUtil');
		var serviceUtil = require('utils/serviceUtil');
		var weathersData = Ti.App.Properties.getString("weathersData");
		if(weathersData == null || weathersData == "") {
			var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, "data/weather/weather.txt");
			var blob = file.read();
			var readText = blob.text;
			file = null;
			blob = null;
			weathersData = JSON.parse(readText);
		} else {
			self.updateWeatherData(JSON.parse(weathersData));
		}
		
		var trafficControls = Ti.App.Properties.getString("trafficControlsData");
		if(trafficControls == null || trafficControls == "") {
			
		} else {
			self.updateTrafficControlsData(JSON.parse(trafficControls));
		}
		
		weatherUtil.getWeather(function(err, weathersData) {
			serviceUtil.getTrafficControls(function(err, trafficControls) {
				if(weathersData != null) {
					weathersData = JSON.parse(weathersData);
					if(weathersData.error == 0) {
						Ti.App.Properties.setString("weathersData", JSON.stringify(weathersData));
						if(weathersData.status == "success") {
							self.updateWeatherData(weathersData);
						} else {
							Ti.UI.createAlertDialog({
								title: '提示',
								message: '暂不支持该城市天气预报'
							}).show();
						}
					} else {
						Ti.UI.createAlertDialog({
							title: '提示',
							message: '暂不支持该城市天气预报'
						}).show();
					}
				}
				if(trafficControls != null) {
					Ti.App.Properties.setString("trafficControlsData", trafficControls);
					self.updateTrafficControlsData(JSON.parse(trafficControls));
				}
			});
		});
	});
	return welcomeWindow;
};

WelcomeWindow.prototype.createWeathersView = function() {
	
};

WelcomeWindow.prototype.getTomorrowWeek = function(date) {
	var day = date.getDay();
	day++;
	if(day >= 7) {
		day = 0;
	}
	return day;
};

WelcomeWindow.prototype.updateDateLabel = function() {
	var date = new Date();
	var self = this;
	//this.dateLabel.setText(date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日");
	this.dateYearLabel.setText(date.getFullYear());
	this.dateMonthLabel.setText((date.getMonth() + 1));
	this.dateLabel.setText(date.getDate());
	this.weekLabel.setText(this.weekday[date.getDay()]);
};

WelcomeWindow.prototype.updateWeatherData = function(weathersData) {
	var date = new Date();
	var self = this;
	this.temperatureLabel.setText(weathersData.results[0].weather_data[0].temperature);
	this.situationTextLabel.setText(weathersData.results[0].currentCity);
	var weather_data = weathersData.results[0].weather_data;
	var dirName = "day";
	if(date.getHours() >= 6 && date.getHours() <= 18) {
		dirName = "day";
	} else {
		dirName = "night";
	}
	var fileName;
	var url;
	for(var i = 0 ; i < weather_data.length ; i++) {
		if(dirName == "day") {
			url = weather_data[i].dayPictureUrl;
		} else {
			url = weather_data[i].nightPictureUrl;
		}
		fileName = this.getFileName(url);
		
		this.dateLabels[i].setText(weather_data[i].date.substr(0, 2));
		this.weatherLabels[i].setText(weather_data[i].weather);
		this.windLabels[i].setText(weather_data[i].wind);
		this.saveFile(dirName, fileName, i, url, function(i, fileName) {
			self.situationImageLabels[i].setBackgroundImage(fileName);
		});
		this.temperatureLabels[i].setText(weather_data[i].temperature);
	}
};

WelcomeWindow.prototype.updateTrafficControlsData = function(trafficControls) {
	var date = new Date();
	var self = this;
	this.todayLimitCarLabel.setText(trafficControls.todayLimitCarNum.replace("和", "/"));
	this.tomorrowLimitCarLabel.setText(trafficControls.tomorrowLimitCarNum.replace("和", "/"));
};

WelcomeWindow.prototype.readFile = function(fileName) {
	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, fileName);
	var blob = file.read();
	var readText = blob.text;
	file = null;
	blob = null;
	var data = JSON.parse(readText);
	return data;
};

WelcomeWindow.prototype.saveFile = function(dirName, fileName, index, url, callback) {
	var self = this;
	
	var imageDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,            
	    'downloaded_images/');
	if (!imageDir.exists()) {
	    imageDir.createDirectory();
	}
	
	imageDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,            
	    'downloaded_images/' + dirName);
	if (!imageDir.exists()) {
	    imageDir.createDirectory();
	}
	
	var file = Ti.Filesystem.getFile(imageDir.resolve(), fileName);
	if(!file.exists()) {
		var client = Titanium.Network.createHTTPClient();
		client.setTimeout(10000);
		client.onload = function() {
			var file = Ti.Filesystem.getFile(imageDir.resolve(), fileName);
			file.write(this.responseData);
			callback(index, file.nativePath);
		};
		client.onerror = function() {
			var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, self.weatherImagePath + fileName);
			callback(index, file.nativePath);
		};
		client.open('GET', url);
		client.send();
	} else {
		callback(index, file.nativePath);
	}
	file = null;
};

WelcomeWindow.prototype.getFileName = function(url) {
	var fileName = "";
	fileName = url.substr(url.lastIndexOf("/") + 1);
	return fileName;
};

module.exports = WelcomeWindow;
