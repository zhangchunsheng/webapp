/**
 * Copyright(c)2013,zhangchunsheng,www.zhangchunsheng.com.cn
 * Version: 1.0
 * Author: zhangchunsheng
 * Date: 2014-03-13
 * Description: pageTemplate
 * Modification:
 *      甲午年（马年）丁卯月癸未日 农历二月十三
 *          PageTemplate
 */
Ti.include('Template.js');

T.PageTemplate = function(opts) {
    if(opts == null) {
        opts = {
            name: 'page'
        };
    } else {
        opts.name = 'page';
    }
    this.banner = opts.banner;
    this.content = opts.content;
    
    this.bannerTemplate = '<div class="{banner.banner}"></div>\
                        <div class="{banner.bannerTitleClass}">{banner.banner_title}</div>';
    this.contentTemplate = '{content}';
    
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
    this.body.push('</div>\
                    <div class="content">\
                        <div id="content" class="page_content clearfix">');
    this.body.push('{$content}');    
    this.body.push('</div>\
                    </div>\
                </div>\
                <script type="text/javascript" src="website/js/zepto.min.js"></script>\
                <script type="text/javascript" src="website/js/underscore.js"></script>\
            </body>\
        </html>');
    //继承属性
    T.Template.call(this, opts);
};

//继承方法
T.PageTemplate.prototype = new T.Template();