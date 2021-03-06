/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.com.cn
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-01-27
 * Description: 工具
 */
var util = {};

util.pixelsToDPUnits = function(thePixels) {
	return (thePixels / (Ti.Platform.displayCaps.dpi / 160));
};

util.dpUnitsToPixels = function(theDPUnits) {
	return (theDPUnits * (Ti.Platform.displayCaps.dpi / 160));
};

util.getWeekdays = function() {
	this.weekday = new Array(7);
	this.weekday[0] = "星期天";
	this.weekday[1] = "星期一";
	this.weekday[2] = "星期二";
	this.weekday[3] = "星期三";
	this.weekday[4] = "星期四";
	this.weekday[5] = "星期五";
	this.weekday[6] = "星期六";
	return this.weekday;
};

util.getSpokenWeekday = function() {
	this.weekday = new Array(7);
	this.weekday[0] = "周日";
	this.weekday[1] = "周一";
	this.weekday[2] = "周二";
	this.weekday[3] = "周三";
	this.weekday[4] = "周四";
	this.weekday[5] = "周五";
	this.weekday[6] = "周六";
	return this.weekday;
};

/**
 * get first level menu
 * @param {Object} menuId
 */
util.getMenu = function(menuId) {
	var menus = Ti.App.menus;
	for(var i = 0 ; i < menus.length ; i++) {
		if(menus[i].id == menuId) {
			return menus[i];
		}
	}
	return null;
};

exports.util = util;
exports.pixelsToDPUnits = util.pixelsToDPUnits;
exports.dpUnitsToPixels = util.dpUnitsToPixels;
exports.getWeekdays = util.getWeekdays;
exports.getMenu = util.getMenu;