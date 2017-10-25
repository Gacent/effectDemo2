//获取obj对象的样式
//平时obj.style获取的是内联样式表（行间），这个是获取外部或者是内部样式表
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];//IE
		}
	else{
		return getComputedStyle(obj,false)[attr];//FF,false处是否是伪元素
		}
}
//var timer=null;
function startMove1(obj,attr,iTarget,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		//取当前值
		var icu=0;
		if(attr=='opacity'){
			icu=Math.round(parseFloat(getStyle(obj,attr))*100);
			}
		else{
			icu=parseInt(getStyle(obj,attr));
			}
		//算速度
		var speed=(iTarget-icu)/8;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);//ceil向上取整
		//测停止
		if(icu==iTarget){
			clearInterval(obj.timer);
			if(fn){
				fn();
				}
			}
		else{
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(icu+speed)+')';
				obj.style.opacity=(icu+speed)/100;
				}
			else{
					obj.style[attr]=icu+speed+"px";
			}
			
			}
		},30)
	}// JavaScript Document