function Time(seconds,minutes,hours){
	this.timer=0;
	this.flag=true;
	this.elements=[];
	this.elements[2]=seconds;
	this.elements[1]=minutes;
	this.elements[0]=hours;
}

Time.prototype.Move=function(){
	var that=this;
	that.timer=setInterval(function(){
		that.elements[2].innerText++;
		if(that.elements[2].innerText>59){
			that.elements[1].innerText++;
			that.elements[2].innerText=0;
			if(that.elements[1].innerText>59){
				that.elements[0].innerText++;
				that.elements[1].innerText=0;
				that.elements[2].innerText=0;
				if(that.elements[0].innerText>23){
					that.elements[0].innerText=0;
					that.elements[1].innerText=0;
					that.elements[2].innerText=0;
				}
			}
		}
	},1000)
}

Time.prototype.start=function(){
	clearInterval(this.timer);
	this.Move();
}

Time.prototype.stop=function(){
	clearInterval(this.timer);
}

Time.prototype.zero=function(){
	this.elements[0].innerText=0;this.elements[1].innerText=0;this.elements[2].innerText=0;
	this.stop();
}