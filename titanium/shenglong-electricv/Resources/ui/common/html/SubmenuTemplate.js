/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.com.cn
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-03-13
 * Description: submenuTemplate
 * Modification:
 *      甲午年（马年）丁卯月癸未日 农历二月十三
 *          SubmenuTemplate
 */
Ti.include('Template.js');

T.SubmenuTemplate = function(opts) {
    if(opts == null) {
        opts = {
            name: 'submenu'
        };
    } else {
        opts.name = 'submenu';
    }
    this.banner = opts.banner;
    this.content = opts.content;
    this.parentMenu = opts.menu;
    this.submenus = opts.content;
    
    this.bannerTemplate = '<div class="{banner.banner}"></div>\
                        <div class="{banner.bannerTitleClass}">{banner.banner_title}</div>';
    this.contentTemplate = '<li class="f_item">\
                        <a href="#" class="f_name" onclick="visitPage({submenu.id})"><span>{submenu.showName}</span></a>\
                    </li>';
    
    this.html = '';
    this.head = '<!DOCTYPE html>\
            <html lang="zh-CN">\
                <head>\
                    <meta charset="UTF-8" />\
                    <link rel="stylesheet" type="text/css" href="website/css/base_mobile.css" />\
                    <link rel="shortcut icon" href="website/favicon.ico" />\
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">\
                    <!--<meta http-equiv="cache-control" content="max-age=0" />\
                    <meta http-equiv="cache-control" content="no-cache" />\
                    <meta http-equiv="expires" content="0" />\
                    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />\
                    <meta http-equiv="pragma" content="no-cache" />-->\
                    <link rel="stylesheet" type="text/css" href="website/css/about.css" />\
                    <title>盛隆电气集团欢迎您!</title>\
                </head>';
    this.body = [];
    this.body.push('<body>\
                <div class="wrapper">\
                    <!--<header class="clearfix">\
                        <div class="logo">\
                            <a href="./index.html"><img src="website/images/logo.png" alt=""/></a>\
                        </div>\
                    </header>-->\
                    <div id="banner" class="slider">');
    this.body.push('{$banner}');
    this.body.push('</div>');
    this.body.push('<div class="content">\
                        <div class="content_wrap clearfix">\
                            <div class="side_bar">\
                                <div class="pages_list">\
                                    <ul id="submenu">');
    this.body.push('{$content}');
    this.body.push('</ul>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <script type="text/javascript" src="website/js/zepto.min.js"></script>\
                <script type="text/javascript" src="website/js/underscore.js"></script>\
                <script type="text/javascript">');
    this.body.push('var submenus = {$submenus};');
    this.body.push('var parentMenu = {$parentMenu};');
    this.body.push('function visitPage(menuId) {\
                        var menu = getMenu(menuId);\
                        var timestamp = (new Date()).getTime();\
                        Ti.App.fireEvent("app:visitPage", {\
                            menu: JSON.stringify(menu),\
                            parentMenu: JSON.stringify(parentMenu),\
                            timestamp: timestamp\
                        });\
                        return false;\
                    }\
                    function getMenu(menuId) {\
                        for(var i = 0 ; i < submenus.length ; i++) {\
                            if(menuId == submenus[i].id) {\
                                return submenus[i];\
                            }\
                        }\
                        return null;\
                    }\
                </script>\
            </body>\
        </html>');
    //继承属性
    T.Template.call(this, opts);
};

//继承方法
T.SubmenuTemplate.prototype = new T.Template();