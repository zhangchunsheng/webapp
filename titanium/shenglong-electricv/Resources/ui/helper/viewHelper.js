var viewHelper = {};
viewHelper.createSubMenu = function(window, webview, opts) {
	var arrowWidth = 30,
		arrowHeight = 30,
		arrowTop = 5,
		arrowIndex = 101,
		arrowLeft = 0,
		arrowRight = 0,
		arrowBgColor = 'A9A9A9',
		opacity = 1,
		scrollBgColor = '#F8F8FF',
		scrollBgIndex = 100,
		scrollBgTop = 0,
		contentWidth = 440,
		contentHeight = 40,
		submenuHeight = 30,
		scrollViewWidth = 260,// 320 arrowWidth
		marginLeft = 10,
		buttonWidth = 60,
		fontSize = 13,
		fontWidth = 15,
		fontColor = '#808080',
		borderColor = '#DCDCDC',
		activeFontColor = '#A52A2A',
		activeBorderColor = 'C0C0C0',
		activeBgColor = '#000';
	
	
	var submenus = opts.menu.submenus;
	
	contentWidth = 0;
	for(var i = 0, l = submenus.length ; i < l ; i++) {
		submenuName = submenus[i].showName;
		buttonWidth = fontWidth * submenuName.length;
		contentWidth += buttonWidth + marginLeft;
	}
	contentWidth += 20;
	if(contentWidth < 260) {
		contentWidth = 260;
	}
	
	var transform_arrow = Ti.UI.create2DMatrix();
	transform_arrow.scale(0.5, 0.5);
	
	var leftBg = Ti.UI.createView({
		contentWidth: arrowWidth,
		contentHeight: contentHeight,
		top: scrollBgTop,
		left: 0,
		height: contentHeight,
		width: arrowWidth,
		backgroundColor: arrowBgColor,
		zIndex: scrollBgIndex,
		opacity: opacity
	});
	var leftImage = Ti.UI.createView({
		backgroundImage: '/images/icon_arrow_left.png',
		height: arrowHeight,
		width: arrowWidth,
		top: arrowTop,
		left: arrowLeft,
		visible: false,
		zIndex: arrowIndex,
		opacity: opacity,
		transform: transform_arrow
	});
	leftBg.add(leftImage);
	window.add(leftBg);
	var rightBg = Ti.UI.createView({
		contentWidth: arrowWidth,
		contentHeight: contentHeight,
		top: scrollBgTop,
		right: 0,
		height: contentHeight,
		width: arrowWidth,
		backgroundColor: arrowBgColor,
		zIndex: scrollBgIndex,
		opacity: opacity
	});
	var rightImage = Ti.UI.createView({
		backgroundImage: 'images/icon_arrow_right.png',
		height: arrowHeight,
		width: arrowWidth,
		top: arrowTop,
		right: arrowRight,
		zIndex: arrowIndex,
		opacity: opacity
	});
	rightBg.add(rightImage);
	window.add(rightBg);
	
	var scrollView = Titanium.UI.createScrollView({
		contentWidth: contentWidth,
		contentHeight: contentHeight,
		top: scrollBgTop,
		height: contentHeight,
		width: scrollViewWidth,
		//borderRadius: 10,
		backgroundColor: scrollBgColor,
		zIndex: scrollBgIndex,
		opacity: opacity
	});
	
	scrollView.addEventListener('scroll', function(e) {
		Ti.API.info('x ' + e.x + ' y ' + e.y);
		
		if(e.x > 10) {
			leftImage.show();
		} else {
			leftImage.hide();
		}
		if(e.x < contentWidth - scrollViewWidth - 10) {
			rightImage.show();
		} else {
			rightImage.hide();
		}
	});
	
	window.add(scrollView);
	
	var submenuView = [];
	var submenuLabel = [],
		submenuName = "",
		left = 0,
		url = "",
		submenuBgColor,
		submenuBorderColor,
		submenuFontColor,
		activeTabIndex = 0;
	for(var i = 0, l = submenus.length ; i < l ; i++) {
		submenuName = submenus[i].showName;
		buttonWidth = fontWidth * submenuName.length;
		if(i == 0) {
			left = marginLeft;	
		} else {
			left = submenuView[i - 1].getLeft() + submenuView[i - 1].getWidth() + marginLeft;
		}
		if(i == activeTabIndex) {
			submenuBgColor = activeBgColor;
			submenuBorderColor = activeBorderColor;
			submenuFontColor = activeFontColor;
		} else {
			submenuBgColor = scrollBgColor;
			submenuBorderColor = borderColor;
			submenuFontColor = fontColor;
		}
		submenuView.push(Ti.UI.createView({
			backgroundColor: submenuBgColor,
			borderRadius: 10,
			borderWidth: 1,
			borderColor: submenuBorderColor,
			width: buttonWidth,
			height: submenuHeight,
			left: left
		}));
		scrollView.add(submenuView[i]);
		submenuLabel.push(Ti.UI.createLabel({
			text: submenuName,
			font: {fontSize: fontSize},
			color: submenuFontColor,
			width: 'auto',
			textAlign: 'center',
			height: 'auto'
		}));
		submenuView[i].add(submenuLabel[i]);
		if(submenus[i].url == "") {
			url = "http://m.shenglong-electric.com.cn/";
		} else {
			url = submenus[i].url;
		}
		(function(url) {
			submenuView[i].addEventListener('click', function(e) {
				webview.setUrl(url);
				webview.reload();
			});
		})(url);
	}
};
exports.viewHelper = viewHelper;
exports.createSubMenu = viewHelper.createSubMenu;