/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.com.cn
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-03-11
 * Description: 创建tabGroup
 */
var tabGroupHelper = {};
tabGroupHelper.createAppTabs = function(tabGroupView, welcomeWindow) {
	var Window = require('ui/common/ApplicationWindowV3'),
		TabView = require('ui/common/view/TabView');
	
	var config = require('ui/config/config'),
		menus = config.menus,
		menu = menus[Ti.App.visitInfo.activeTabIndex];
	
	var logger = require('utils/logger');
	
	var appTabs = [],
		appWin = new Window({
		title: L(menu.name),
		menuName: menu.name,
		menu: menu,
		welcomeWindow: welcomeWindow
	});
	
	var icon = "",
		width = Math.floor(640 / menus.length / 2),
		activeIndex = 0;
		
	for(var i = 0, l = menus.length ; i < l ; i++) {
		if(menus[i].icon == "") {
			icon = "/images/tabs/home.png";
		} else {
			icon = menus[i].icon;
		}
		appTabs.push(new TabView({
			width: width,
			title: L(menus[i].name),
			icon: icon,
			window: appWin,
			tabIndex: i,
			menu: menus[i],
			code: menus[i].code,
			type: menus[i].type,
			pageId: menus[i].pageId,
			newsId: menus[i].newsId,
			parentCode: menus[i].parentCode,
			sl_cid: menus[i].sl_cid,
            template_url: menus[i].url//template
		}));
		tabGroupView.addTab(appTabs[i]);
		
		//bind tab event
		(function(index) {
			appTabs[i].addEventListener('click', function(e) {
				if(tabGroupView.tabIndex == index) {
					return;
				}
				var visitInfo = Ti.App.Properties.getObject('Ti.App.visitInfo');
				visitInfo.activeTabIndex = index;
				Ti.App.Properties.setObject('Ti.App.visitInfo', visitInfo);
				
				var webview = appWin.webview;
				var menu = menus[index];
				
				//改变submenu信息
				var submenu = appWin.submenu;
				submenu.changeSubmenu(menu.submenus);
				visitInfo = Ti.App.Properties.getObject('Ti.App.visitInfo');
				menu = visitInfo.activeMenu[index];
				
				webUtil = require('utils/webUtil');
                webUtil.setWebviewAttribute(webview, menu);
			
                var beginDate = new Date();
                logger.info("---------------getContent start:" + beginDate.getTime());
                content = webUtil.getContent(webview);
                logger.info(content);
                var endDate = new Date();
                logger.info("---------------getContent end:" + endDate.getTime() + " use time:" + (endDate.getTime() - beginDate.getTime()));
                
                var makeHtml = new MakeHtml(content);
                var html = makeHtml.getHtml();
				webview.setHtml(html);
				
				tabGroupView.setActiveTab(visitInfo.activeTabIndex);
			});
		})(i);
	}
	tabGroupView.addWindow(appWin);
	tabGroupView.setActiveTab(activeIndex);
};

tabGroupHelper.bindEvent = function(tabGroup, welcomeWindow) {
	tabGroup.addEventListener("open", function(e) {
		welcomeWindow.open({modal: true});
	});
	tabGroup.addEventListener("focus", function(e) {
		
	});
};

exports.tabGroupHelper = tabGroupHelper;
exports.createAppTabs = tabGroupHelper.createAppTabs;
exports.bindEvent = tabGroupHelper.bindEvent;