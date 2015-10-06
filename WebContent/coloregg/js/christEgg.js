var	pid = "",
	url = "",
	tryAgain = false,
	canShare = false,
	sharePic = true,
	showFirst = true;
	picUrl = "/images/default.png",
	imgUrl = null,
	timer = null,
	baseUrl = "";
if(langType == "en_US")
{
	picUrl = "/images/default_en.png";
}
//检查用户是否安装了adobe player
function flashChecker(){
	var hasFlash=true;         //是否安装了flash
	var isIE=/*@cc_on!@*/0;      //是否IE浏览器

	if(isIE)
	{
		var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash'); 
		if(swf) {
			hasFlash=false;
		}
	}else{
		if (navigator.plugins && navigator.plugins.length > 0){
			var swf=navigator.plugins["Shockwave Flash"];
		    if (swf)
		    {
				hasFlash=false;
   			}
		}
	}
	return hasFlash;
}

if(flashChecker()){
	document.getElementById("flashContent").innerHTML=lang.downAdobe;
}
//给flash调用的要复制到剪贴板内的值
function getNewUrl(){
	return lang.copyPrefix+baseUrl+url;
}
//获取指定值之间的随机值
function getRandom(min,max){
	return parseInt(Math.random()*(max-min+1)+min);
}
//生成flash
function makeFlash(flashvars,attributes,swf,content,width,height){
    var params = {};
    params.quality = "high";
    params.bgcolor = "#e7e7e7";
    params.allowscriptaccess = "always";
    params.allowfullscreen = "true";
    if(swf == "ChristmasEgg")
    {

		params.wmode = "window";
		
    }
    else
    {
    	params.wmode = "opaque";
    }
    // Jerry 2015-10-06 13:17PM 
    /*
    swfobject.embedSWF(
        sourceUrl+"/"+swf+".swf?2012122291133", content, 
        width, height, 
        "10.2.0", "playerProductInstall.swf", 
        flashvars, params, attributes);*/
    
    swfobject.embedSWF(
            "coloregg/js/ChristmasEgg.swf", content, 
            width, height, 
            "10.2.0", "playerProductInstall.swf", 
            flashvars, params, attributes);
    // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
    swfobject.createCSS("#"+content, "display:block;text-align:left;"); 	
}
//隐藏菜单
function hideMenu1(){
	//$("#menu").slideUp(1000);
	$("#menu").css({"visibility":"hidden"});
}
//显示菜单
function showMenu1(callback){
	//$("#menu").show(0);
	$("#menu").css({"visibility":"visible"});
	document.getElementById("menu").style.display="block";
	//setTimeout(200,function(){
		document.getElementById("SimpleClipBoard").setContent(baseUrl+url);
		hideMenu();
	//});
}
//隐藏背景
function hideMenu(){
	$(".panel").hide();
	hideCollectPanel();
}
//显示背景
function showMenu(){
	$(".panel").fadeIn(5000);
	showCollectPanel();
}
//我要制作
function makePicture(){
	tryAgain = true;
	imgUrl = null;
	hideMenu1();
	document.getElementById("ChristmasEgg").startEdit();
}
//再玩一次
function btnPlay(){
	// if(tryAgain){
	// 	btnTryPlay();
	// }
	// else
	// {
		btnPlayAgain();
	// }
}
function btnPlayAgain(){
	hideMenu();
	clearTimeout(timer);
	timer = null;
	document.getElementById("ChristmasEgg").playAgain();
}
//flash复制url到剪贴板后调用的消息
function copySuccess(){
	document.getElementById("ChristmasEgg").track("shareLink",baseUrl+url);
	alert(lang.copyTip);
}
/***
	flash统计方法
	@param val 统计key
	@param url 统计值
****/
function track(val,url){
	document.getElementById("ChristmasEgg").track(val,url||"");
}
//flash制作完成后调用的方法,会回传刚刚制作完成的图片的pid
function makeFinsh(pid){
	clearTimeout(timer);
	timer = null;
	url="id/"+pid;
	showMenu1();
	alert(lang.makeFinish);
	
}

//设置是否是图片分享 param val bool  true 是图片 false 是文字
function setSharePic(val){
	sharePic = val;
}
//清空图片地址缓存
function picHasChange(){
	imgUrl = null;
}

/***
	分享到各个社区
	@param val 分享的社区
	@param picurl 图片地址
****/
function share(val){
	if(sharePic&&imgUrl==null)
	{
		document.getElementById("ChristmasEgg").setShareType(val);
		document.getElementById("ChristmasEgg").startUpLoadResult();
	}
	else
	{
		goShare(val,imgUrl);
	}
}	
/***
	分享到各个社区
	@param val 分享的社区
	@param picurl 图片地址
****/
function goShare(val,picurl,appkey){
	if(imgUrl==null){
		picurl = picurl||(baseUrl+picUrl);
		imgUrl = picurl;
	}
	else
	{
		picurl = imgUrl;
	}
	document.getElementById("ChristmasEgg").track("shareTo"+val);
	switch(val)
	{
		case "weibo":
			if(sourceFrom=="standard")
			{
				appkey = appkey||"745926030";
			}
			else
			{
				appkey = appkey||"2998078858";
			}
			if(sharePic)//如果是分享的是制作完成后的图片,则要分享两张图出去
			{
				picurl = encodeURIComponent((baseUrl+picUrl))+"||"+encodeURIComponent(picurl);
			}
			window.open("http://service.weibo.com/share/share.php?title="+encodeURIComponent(lang.shareTitle)+"&url="+encodeURIComponent(baseUrl+url)+"&source="+encodeURIComponent("camera360")+"&appkey="+appkey+"&pic="+(picurl));
			
		break;
		case "Qzone":
			if(sourceFrom=="standard")
			{
				appkey = appkey||"801189434";
			}
			else
			{
				appkey = appkey||"100675052";
			}
			if(sharePic)
			{
				picurl = encodeURIComponent((baseUrl+picUrl))+"|"+encodeURIComponent(picurl);
			}
			else
			{
				picurl = encodeURIComponent(picurl);
			}
			window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?pics="+(picurl)+"&title="+encodeURIComponent(lang.shareTitle)+"&url="+encodeURIComponent(baseUrl+url));
		break;
		case "tencentWeibo":
			if(sourceFrom=="standard")
			{
				appkey = appkey||"100302163";
			}
			else
			{
				appkey = appkey||"801284828";
			}
			if(sharePic)
			{
				picurl = encodeURIComponent((baseUrl+picUrl))+"|"+encodeURIComponent(picurl);
			}
			window.open("http://share.v.t.qq.com/index.php?c=share&a=index&title="+encodeURIComponent(lang.shareTitle)+"&appkey="+appkey+"&pic="+(picurl)+"&url="+encodeURIComponent(baseUrl+url)+"&site="+encodeURIComponent("camera360"));
		break;
		case "facebook":
			if(sourceFrom=="standard")
			{
				appkey = appkey||"432116350172173";
			}
			else
			{
				appkey = appkey||"576161542399151";
			}
			window.open("https://www.facebook.com/dialog/feed?app_id="+appkey+"&link="+encodeURIComponent(baseUrl+url)+"&picture="+(picurl)+"&name="+encodeURIComponent("camera360")+"&description="+encodeURIComponent(lang.shareTitle)+"&redirect_uri=http://web.camera360.com/colorEgg");
		break;
		case "twitter":
			appkey = appkey||"TfPYaBQGxqX4jAD0OgEN8Q";
			window.open("https://twitter.com/intent/tweet?source="+encodeURIComponent("camera360")+"&text="+encodeURIComponent(lang.shareTitle)+"&url="+encodeURIComponent(baseUrl+url));
		break;
	}
	hideLoading();
}
//显示遮罩层
function showLoading(){
	document.getElementById("loading").style.display="block";
}
//隐藏遮罩层
function hideLoading(){
	document.getElementById("loading").style.display="none";
}
//开始计时 25秒后显示菜单
function startShowMenu(){
	clearTimeout(timer);
	timer = null;
	timer = setTimeout(function(){
		document.getElementById("ChristmasEgg").playShowMenuSound();
		showMenu();
	},25000);
}
//获取url跟路径和pid等值
function getId(){
	var adrr = location.href;
	//web.camera360.com分享出去有id的地址
	if(adrr.indexOf("/id/")>-1)
	{
		baseUrl = adrr.split("/id/");
		pid = baseUrl[1];
		baseUrl = baseUrl[0];
		url = "/id/"+pid;
		
	}
	//站内应用的地址
	else if(adrr.indexOf("/site/")>-1)
	{
		baseUrl = adrr.split("/site/");
		baseUrl = baseUrl[0]+"/";
		
		//facebook站内中地址是https的,需要转成http的
		baseUrl.replace("https", "http");
	}
	else
	{
		baseUrl = adrr;
	}
}

var browserName = navigator.userAgent.toLowerCase();
var chromeUseEmbedPlugin = false;
var mybrowser = {
	version: (browserName.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
	safari: /webkit/i.test(browserName) && !this.chrome,
	opera: /opera/i.test(browserName),
    firefox:/firefox/i.test(browserName),
	ie: /msie/i.test(browserName) && !/opera/.test(browserName),
	mozilla: /mozilla/i.test(browserName) && !/(compatible|webkit)/.test(browserName) && !this.chrome,
    chrome: /chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)
}
if(mybrowser.chrome==true){
	var domPluginsArray = navigator.plugins;
	for(var i=0;i<1;i++){
		var plugin = domPluginsArray[i];
		for(var j=0;j<plugin.length;j++){
			var mimeType = plugin[j];
			if(mimeType.description=="Shockwave Flash"){
				chromeUseEmbedPlugin = true;
			} 
		}
	}
}

$(function(){
	getId();
	if(sourceFrom == "facebook" || sourceFrom == 'standard')
	{
		$("html,body").css({"position":"relative"});
	}
	makeFlash({
		defaultImgs:"coloregg/js/1.jpg, coloregg/js/2.jpg",
		picId:pid,
		langType:langType,
		sourceFrom:sourceFrom,
		baseUrl:sourceUrl,
		sounds:"coloregg/js/1.mp3",
		// putUrl:baseUrl+"/site/putUrl"
		putUrl:baseUrl+"/site/putUrl",
		uploadUrl:uploadUrl,
		trackUrl:"http://qboxwws2.camera360.com/",
		showMenuLimit:"300",
		chromeUseEmbedPlugin:chromeUseEmbedPlugin
	},{
		id:"ChristmasEgg",
		name:"ChristmasEgg",
		align:"middle"
	},"ChristmasEgg","flashContent",512,512);

	makeFlash({
		content:baseUrl+url,
		showTime:3000
	},{
		id:"SimpleClipBoard",
		name:"SimpleClipBoard",
		align:"middle"
	},"SimpleClipBoard","copyContent",70,70);
	
});

//第一次的时候显示收藏面板
function showCollectPanel(){
	if(showFirst)
	{
		$(".collect").fadeIn(5000);
	}
}
function hideCollectPanel(){
	$(".collect").hide();
}
//关闭收藏面板
function closeCollect(){
	$(".collect").fadeOut(500);
	document.getElementById("ChristmasEgg").track("closeCollect");
	showFirst = false;
}

function collectToFavorite(){
	addFavorite(baseUrl,document.getElementsByTagName("title")[0].innerText);
	document.getElementById("ChristmasEgg").track("collect");
}

//添加到收藏夹
function addFavorite(sURL, sTitle)
{        
	try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert(lang.failed);
        }
    }
}





