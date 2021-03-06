/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.com.cn
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-01-27
 * Description: webview相关
 */
var webUtil = {};

webUtil.getContent = function(webview) {
	var content = "";
	var dbUtil = require('utils/dbUtil');
	var datas = [];
	var template_url = webview.template_url;
	var code = "";
	var name = "";
	if(webview.type == 1) {// pages
		//use db
		datas = dbUtil.getPageByMenuCode(webview.code);
		content = datas[0].content;
		name = "page";
	} else if(webview.type == 2) {//newslist
		var sl_cid = webview.sl_cid;
		datas = dbUtil.getNewsList(sl_cid, 1, 20);
		content = JSON.stringify(datas);
		name = "newsList";
	} else if(webview.type == 4) {//news
		var sl_news_id = webview.sl_news_id;
		datas = dbUtil.getNews(sl_news_id);
		content = JSON.stringify(datas[0]);
		name = "news";
	} else if(webview.type == 5) {//customers
		datas = dbUtil.getPageByMenuCode(webview.code);
		content = datas[0].content;
		name = "pageCustomer";
	} else {
		if(template_url.indexOf("page_template") > 0) {
			code = webview.code + "001";
			datas = dbUtil.getPageByMenuCode(code);
			content = datas[0].content;
			name = "page";
		} else if(template_url.indexOf("page_customer_template") > 0) {
			code = webview.code + "001";
			datas = dbUtil.getPageByMenuCode(code);
			content = datas[0].content;
			name = "pageCustomer";
		} else if(template_url.indexOf("newslist_template") > 0) {
			var sl_cid = webview.sl_cid;
			datas = dbUtil.getNewsList(sl_cid, 1, 20);
			content = JSON.stringify(datas);
			name = "newsList";
		} else if(template_url.indexOf("submenu") > 0) {
			var submenus = [];
			if(webview.menu.code.length == 3) {
				submenus = webview.menu.submenus[0].submenus;
			} else {
				submenus = webview.menu.submenus;
			}
			
			content = JSON.stringify(submenus);
			name = "submenu";
		} else if(template_url.indexOf("page_counselAndFeedback") > 0) {
            name = "pageCounselAndFeedback";
        }
	}
	var menu = JSON.stringify(webview.menu);
	var menuId = webview.menu.id;
	var menuCode = webview.menu.code;
	var banner = {
		banner: webview.menu.banner,
        bannerTitleClass: webview.menu.bannerTitleClass,
        banner_title: webview.menu.banner_title,
	};
	return {
	    name: name,
		menu: menu,
		banner: JSON.stringify(banner),
		menuId: menuId,
		menuCode: menuCode,
		content: content
	};
};

webUtil.setWebviewAttribute = function(webview, menu) {
	webview.menu = menu;
	webview.code = menu.code;
	webview.type = menu.type;
	webview.pageId = menu.pageId;
	webview.newsId = menu.newsId;
	webview.parentCode = menu.parentCode;
	webview.sl_cid = menu.sl_cid;
	webview.template_url = menu.url;
};

exports.webUtil = webUtil;
exports.getContent = webUtil.getContent;
exports.setWebviewAttribute = webUtil.setWebviewAttribute;