window.onload = function() {
	var container = document.getElementById('container');
	var list = document.getElementById('list');
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var index = 1;
	var animating = false;
	var timer;

	//显示图片坐标按钮
	function showBtn(){
		for(var i = 0; i < buttons.length; i++){
			if(buttons[i].className == 'checked'){
				buttons[i].className = '';
				break;//这里使用break是为了跳出整个showBtn函数，所以不能用return替代
			}
		}
		buttons[index-1].className = 'checked';
		
	}

	//切换图片动画效果
	function animate(offset){
		animating = true;
		var newLeft = parseInt(list.style.left) + offset;
		var time = 300; //位移总时间
		var interval = 10; //位移间隔时间
		var speed = offset/(time/interval); //位移速度

		function go(){
			if(speed < 0 && parseInt(list.style.left) > newLeft || (speed > 0 && parseInt(list.style.left) < newLeft)){
				list.style.left = parseInt(list.style.left) + speed + 'px';
				setTimeout(go,interval); //当停顿一段时间后继续执行函数
			}else{
				animating = false;
				list.style.left = newLeft + 'px';

				if (newLeft > 0){
					list.style.left = -2400 + 'px';
				}else if(newLeft < -2400){
					list.style.left = 0 + 'px';
				}
			}
		}

		go();
		

		// list.style.left = parseInt(list.style.left) + offset + 'px';
	}

	//图片自动轮播
	function play(){
		timer = setInterval(function(){
			next.onclick();
		},3000);
	}

	//停止图片自动轮播
	function stop(){
		clearInterval(timer);
	}

	//切换下一个
	next.onclick = function(){
		if(index == 5){
			index=1;
		}else{
			index +=1;
		}

		if (!animating) { //当切换完一个完整的图片时，再继续调用函数，避免短时间因多次触发事件造成占用大量内存
			animate(-600);
		}
		showBtn();
	}

	//切换上一个
	prev.onclick = function() {
		if(index == 1){
			index=5;
		}else{
			index -=1;
		}

		if(!animating){ //当切换完一个完整的图片时，再继续调用函数，避免短时间因多次触发事件造成占用大量内存
			animate(600);
		}
		showBtn();
	}

	for(var i = 0; i<buttons.length; i++){
		buttons[i].onclick = function(){
			if(this.className == 'checked'){//当点击已选择的图片时，不再继续执行一下代码，避免浪费内存
				return;
			}
			var myIndex = parseInt(this.getAttribute('index'));
			var offset = -600 * (myIndex - index);
			animate(offset);//切换到指定的图片
			index = myIndex;
			showBtn();//显示指定图片的状态按钮颜色
		}
	}

	container.onmouseover = stop; //鼠标移入时，停止图片自动轮播
	container.onmouseout = play; //鼠标移出时，图片恢复自动轮播

	play(); //页面初始化时，图片自动轮播
}