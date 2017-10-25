	  function getStyle(obj,attr){
		  if(obj.currentStyle){
			  return obj.currentStyle[attr];
			  }
		  else{
			  return getComputedStyle(obj,false)[attr];
			  }	
	  }
	//var timer=null;
	
	function startMove(obj,json,fn){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
		var flag=true;
		for(var attr in json)
		{
			//取当前值
			var icu=0;
			if(attr=='opacity'){
			icu=Math.round(parseFloat(getStyle(obj,attr))*100);
				}
			else{
				icu=parseInt(getStyle(obj,attr));
				}
			//算速度
			var speed=(json[attr]-icu)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			//测停止
			if (icu==json[attr]) 
           {
               flag=true;
           }else{
               flag=false;
           }
				if(attr=='opacity'){
					obj.style.filter='alpha(opacity:'+(icu+speed)+')';
					obj.style.opacity=(icu+speed)/100;
					}
				else{
						obj.style[attr]=icu+speed+"px";
				}
			if(flag)
			{
			  
			  if(fn){
				  fn();
		  			}
		  			
			}
			
		}
			  },30)
		}// JavaScript Document