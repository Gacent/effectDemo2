(function($){
	var PageSwitch=(function(){
		function PageSwitch(element,options){
			this.settings=$.extend(true,$.fn.PageSwitch.defaults,options||{});		//合并多个对象
			this.element=element;
			this.init();
		}
		PageSwitch.prototype={
			//初始化插件
			//实现：初始化dom结构，布局，分页及绑定事件
			init:function(){
				var me=this;
				me.selectors=me.settings.selectors;
				me.sections=me.selectors.sections;
				me.section=me.selectors.section;
				
				me.direction=me.settings.direction=='vertical'?true:false;
				me.pagesCount=me.pagesCount();
				me.index=(me.settings.index>=00&&me.settings.index<me.pagesCount)?me.settings.index:0;
				
				if(!me.direction){
					me._initLayout();
				}
				
				if(me.settings.pagination){
					me._initPaging();
				}
				
				me._initEvent();
			},
			//获取滑动页面数量
			pagesCount:function(){
				return this.section.length;
			},
			//获取滑动的宽度或高度
			switchLength:function(){
				return this.direction?this.element.height():this.element.width();		//如果竖向滑动
			},
			//主要针对横屏进行页面布局
			_initLayout:function(){
				var me=this;
				var width=(me.pagesCount*100)+'%',
					cellWidth=(100/me.pagesCount).toFixed(2)+'%';
				me.sections.width(width);
				me.section.width(cellWidth).css('float','left');
			},
			//实现分页的dom结构及css
			_initPaging:function(){
				var me=this;
					pagesClass=me.selectors.page.substring(1);
					activeClass=me.selectors.active.substring(1);
				var pageHtml='<ul class='+pagesClass+'>';
				for(var i=0;i<me.pagesCount;i++){
					pageHtml+='<li></li>';
				}
				me.element.append(pageHtml);
				var pages=me.element.find(me.selectors.page);
				me.pageItem=pages.find('li');
				me.pageItem.eq(me.index).addClass(me.activeClass);
				
				if(me.direction){
					pages.addClass('vertical');
				}else{
					pages.addClass('horizontal');
				}
				
			},
			//初始化插件事件
			_initEvent:function(){
				var me=this;
				me.element.on('click',me.selectors.pages+' li',function(){
					me.index=$(this).index();
					me._scrollPage();
				}
			},
		}
		return PageSwitch;
	})();
	$.fn.PageSwitch=function(options){
		alert(this);
		return this.each(function(){
			var me=$(this),
			    instance=me.data('PageSwitch');
			if(!instance){
				instance=new PageSwitch(me,options);
				me.data('PageSwitch',instance);		//单例模式
			}
			if($.type(options)==='string') return instance[options]();
		})
	}
	//默认参数
	$.fn.PageSwitch.defaults={
		selectors:{
			sections:'.sections',
			section:'.section',
			page:'.pages',
			active:'.active'
		},
		index:0,				//默认从第一页开始展示
		easing:'ease',
		duration:500,
		loop:false,				//自动动画吗
		pagination:true,		//是否进行分页处理
		keyboard:true,
		direction:'vertical',	//竖屏滑动
		callback:''
	}
	$(function(){
		$('[data-PageSwitch]').PageSwitch();		//初始化插件，如果要自定义的初始化需要在js中加参数
	})
})(jQuery)