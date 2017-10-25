(function($){
	var PageSwitch=(function(){
		function PageSwitch(element,options){
			this.settings=$.extend(true,$.fn.PageSwitch.defaults,options||{});		//�ϲ��������
			this.element=element;
			this.init();
		}
		PageSwitch.prototype={
			//��ʼ�����
			//ʵ�֣���ʼ��dom�ṹ�����֣���ҳ�����¼�
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
			//��ȡ����ҳ������
			pagesCount:function(){
				return this.section.length;
			},
			//��ȡ�����Ŀ�Ȼ�߶�
			switchLength:function(){
				return this.direction?this.element.height():this.element.width();		//������򻬶�
			},
			//��Ҫ��Ժ�������ҳ�沼��
			_initLayout:function(){
				var me=this;
				var width=(me.pagesCount*100)+'%',
					cellWidth=(100/me.pagesCount).toFixed(2)+'%';
				me.sections.width(width);
				me.section.width(cellWidth).css('float','left');
			},
			//ʵ�ַ�ҳ��dom�ṹ��css
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
			//��ʼ������¼�
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
				me.data('PageSwitch',instance);		//����ģʽ
			}
			if($.type(options)==='string') return instance[options]();
		})
	}
	//Ĭ�ϲ���
	$.fn.PageSwitch.defaults={
		selectors:{
			sections:'.sections',
			section:'.section',
			page:'.pages',
			active:'.active'
		},
		index:0,				//Ĭ�ϴӵ�һҳ��ʼչʾ
		easing:'ease',
		duration:500,
		loop:false,				//�Զ�������
		pagination:true,		//�Ƿ���з�ҳ����
		keyboard:true,
		direction:'vertical',	//��������
		callback:''
	}
	$(function(){
		$('[data-PageSwitch]').PageSwitch();		//��ʼ����������Ҫ�Զ���ĳ�ʼ����Ҫ��js�мӲ���
	})
})(jQuery)