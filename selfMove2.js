function getStyle(obj,attr){
	if(obj.currentStyle)
		return obj.currentStyle[attr];
	else
		return getComputedStyle(obj,false)[attr];
}
function startMove(obj,attr,iTarget,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var icu=0;
		if(attr=='opacity'){
			icu=Math.round(parseFloat(getStyle(obj,attr))*100);
		}
		else{
			icu=parseInt(getStyle(obj,attr));
		}
		var speed=(iTarget-icu)/8;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(iTarget==icu){
			clearInterval(obj.timer);
		}
		else{
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(icu+speed)+')';
				obj.style.opacity=(icu+speed)/100;
			}
			else{
				obj.style[attr]=(icu+speed)+'px';
			}
		}
	},30)
}