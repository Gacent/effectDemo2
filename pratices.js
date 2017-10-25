function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	return getComputedStyle(obj,false)[attr];
}
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var flag=true;
		for(var attr in json){
			var icu=0;
			if(attr=='opacity'){
				icu=Math.round(parseFloat(getStyle(obj,attr))*100);
			}
			else{
				icu=parseInt(getStyle(obj,attr));
			}
			var speed=(json[attr]-icu)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(json[attr]-icu==0){
				flag=true;
			}else{
				flag=false;
			}
			if(attr=='opacity'){
				obj.style.aliter='alpha(opacity:'+icu+speed+')';
				obj.style.opacity=(icu+speed)/100;
			}else{
				obj.style[attr]=icu+speed+'px';
			}
			if(flag){
				if(fn){
					fn();
				}
			}
		}
	},30)
}