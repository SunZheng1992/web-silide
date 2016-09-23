sSlide ={
	node:'',
	num:'',
	hight:'',
	i:1,
	previmg:'img/prev.png',
	nextimg:'img/next.png',
	init:function(node,arr){
		sSlide.node = node;
		sSlide.num = $(node + ' li').length;

		if(typeof(arr) !='undefined')
		{
			sSlide.hight = typeof(arr.hight)=='undefined'?$(node).height():arr.hight;	
		}
		sSlide.setCss();
		sSlide.addHtml();
		sSlide.setTimer();
		$('.slideOl li').each(function(e){
			$(this).hover(function(){
				sSlide.i = e-1;
				sSlide.move('left');
			},function(){

			})
		});
		$(node).hover(function(){
			sSlide.clearTimer();
		},function(){
			sSlide.setTimer();
		});

		$(node).on('click','#prev',function(){
			sSlide.move('left');
		});
		$(node).on('click','#next',function(){
			sSlide.move('right');
		});
	},
	clearTimer:function(){

		clearInterval(sSlide.timer);
	},
	setTimer:function(){
		sSlide.timer = setInterval(function(){
			sSlide.move('left');
		},5000);
	},
	addHtml:function(){
		var prebutton = "<a id='prev' href='javascript:void(0)'> <img  src='"+sSlide.previmg+"' alt='prev'></a><a id='next' href='javascript:void(0)'> <img  src='"+sSlide.nextimg+"' alt='prev'></a>";
		$(sSlide.node).append(prebutton);
	
		$('#prev,#next').css({'position':'absolute','top':'50%','z-index':'999','width':'30px','margin-top':'-15'});
		$('#prev img,#next img').css({'width':'100%'});
		var olHtml = "<ol class='slideOl' id='slidelOl'>";
		for(var i =0;i<sSlide.num;i++)
		{
			olHtml +="<li></li>";
		}
		olHtml += "</ol>";
		$(sSlide.node).append(olHtml);
		$('.slideOl').css({'position':'absolute','top':'85%','left':"50%",'padding':'0','margin-left':-30*sSlide.num+'px','color':'white'});
		$('.slideOl li').css({'float':'left','margin':'0px 10px','padding':'10px','cursor':'pointer','background':'url(img/slide-normal.png) no-repeat','background-size':'100%','list-style-type':'none'});

		$('#prev').css({'left':'10px'});
		$('#next').css({'right':'10px'});
	},
	setCss:function(){
	
		$(sSlide.node).css({'position':'relative','overflow':'hidden','height':sSlide.hight+'px'});
		var width = sSlide.num * 100;
		$(sSlide.node).find('ul').width(width + '%').css({'position':'relative','padding':'0'});
		$(sSlide.node).find('ul li').width(100/sSlide.num +'%');
		$(sSlide.node).find('ul li').css({'float':'left','list-style-type':'none'})
		$(sSlide.node).find('ul li img').width('100%');
	},
	moveLeft:function(){
		$(sSlide.node).find('ul').css('right','100%');
	},
	move:function(derection){
		//$(sSlide.node).find('ul').css(derection,sSlide.i*100+'%');
		
		if(derection=='left')
		{	
			sSlide.i++;

			if(sSlide.i > sSlide.num-1)
			{
				sSlide.i = 0;
			}

			$(sSlide.node).find('ul').animate({right:sSlide.i*100+'%'});
			
			
		}else{
			sSlide.i--;

			if(sSlide.i < 0)
			{
				sSlide.i = sSlide.num-1;
			}

			$(sSlide.node).find('ul').animate({right:sSlide.i*100+'%'});
			
		}
			//$('.slideOl li').eq(sSlide.i).css({'color':'red'});
			$('.slideOl li').each(function(e){
				if(e == sSlide.i)
				{
					$('.slideOl li').eq(e).css({'background':'url(img/slide-selector.png) no-repeat','background-size':'100%'});
				}else{
					$('.slideOl li').eq(e).css({'background':'url(img/slide-normal.png) no-repeat','background-size':'100%'});
				}	
			});
	}

}