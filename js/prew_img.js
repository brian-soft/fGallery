var allImgs = document.querySelectorAll(".group-of-img img");
var allDivs = document.querySelectorAll(".group-of-img");

document.styleSheets[0].insertRule(".backgroundopacity {display:block; transition: opacity .5s;background: rgba(0,0,0,.7); height: 100%; width: 100%; z-index: 10; position: absolute; top: 0; left: 0}", 0);
document.styleSheets[0].insertRule(".closebutton {cursor: pointer; font-size: 34px; text-align:center; line-height:30px; color:white; box-shadow:0px 0px 15px white; border: 4px solid white; border-radius:50%; width:30px; height:30px; position:absolute; right: 2%; top: 5%}", 0);
document.styleSheets[0].insertRule(".hideBackgroundOpacity {opacity: 0.5; visibility:hidden}",0);
document.styleSheets[0].insertRule(".scrollBackgroundOpacity {overflow:hidden; background: #555; position: absolute; left:5%; top: 5%; width: 10%; box-shadow: 0px 0px 15px white; }",0);
document.styleSheets[0].insertRule(".mainImgBackgroundOpacity {transition:background .8s; position: absolute; left: 18%; top: 5%; width: 75%; height: 90%;  background-size: contain; }",0);
document.styleSheets[0].insertRule(".previewImg {cursor:pointer; transition: top .5s,box-shadow .5s;width:90%; margin: 5%; position:relative}",0);
document.styleSheets[0].insertRule(".activePreview {box-shadow:0px 0px 20px 5px lime}",0);
document.styleSheets[0].insertRule(".imgCount {font-family:Arial; font-weight:700; font-size: 12px; background: red; border-radius: 50%;  color: white; height:26px; width:26px; line-height:26px; text-align:center; position:relative; top: -13px; right:-13px; float:right}",0);
document.styleSheets[0].insertRule(".group-of-img:hover .imgCount {transform: rotateY(360deg); transition:transform .7s ease-in-out;}",0);
document.styleSheets[0].insertRule(".group-of-img:hover {transition: border .8s;border:2px solid red}",0);

for (var i = 0; i < allImgs.length; i++) {
	allImgs[i].style.display='none';
	if (allImgs[i].getAttribute("data-background")!=null){
		allImgs[i].parentNode.style.background = 'url('+allImgs[i].src+') center / contain no-repeat';
	}
}

for (var i = 0; i < allDivs.length; i++) {
	var counter = document.createElement('div');
	counter.className = 'imgCount';
	counter.innerHTML = allDivs[i].children.length;
	allDivs[i].appendChild(counter);
}

var heightAllImg;
var backgroundOpacity = document.createElement('div');
backgroundOpacity.className = "hideBackgroundOpacity";
backgroundOpacity.onclick = closeFullScreen;
var scrollDiv = document.createElement('div');
scrollDiv.className = "scrollBackgroundOpacity";
backgroundOpacity.appendChild(scrollDiv);
var mainImgBackgroundOpacity = document.createElement('div');
mainImgBackgroundOpacity.className = "mainImgBackgroundOpacity";
backgroundOpacity.appendChild(mainImgBackgroundOpacity);
var closeButton = document.createElement('div');
closeButton.className = 'closebutton';
closeButton.innerHTML = '&#10006';
closeButton.onclick = closeFullScreen;
backgroundOpacity.appendChild(closeButton);
document.body.appendChild(backgroundOpacity);
var allPreviews;

for (var i = 0; i < allDivs.length; i++) {
	allDivs[i].onclick = showFullScreen;
}

function closeFullScreen(){
	backgroundOpacity.className = "hideBackgroundOpacity";
}

function showFullScreen(event){
	var currentDiv = event.target;
	var imgs = currentDiv.children;
	scrollDiv.innerHTML = "";
	heightAllImg = 0;
	mainImgBackgroundOpacity.style.background = 'url("'+imgs[0].src+'") no-repeat top center';
	mainImgBackgroundOpacity.style.backgroundSize = 'contain';
	for (var i = 0; i < imgs.length; i++){
		if (imgs[i].tagName==='IMG'){
			var prewImg = document.createElement('img');
			if (i===0){
				prewImg.className = 'previewImg activePreview';
			} else {
				prewImg.className = 'previewImg';
			}
			prewImg.src = imgs[i].src;
			scrollDiv.appendChild(prewImg);
			heightAllImg+=prewImg.offsetHeight+parseInt(window.getComputedStyle(prewImg).getPropertyValue("margin-top"))+parseInt(window.getComputedStyle(prewImg).getPropertyValue("margin-bottom"));
		}
	}
	allPreviews = scrollDiv.children;
	backgroundOpacity.className = "backgroundopacity";
}

scrollDiv.onclick = function(event){
	event.stopPropagation();
	if (event.target.tagName==="IMG"){
		for (var i = 0; i < allPreviews.length; i++) {
			allPreviews[i].className = "previewImg";
		}
		event.target.className = "previewImg activePreview";
		mainImgBackgroundOpacity.style.background = 'url("'+event.target.src+'") no-repeat 50% 0%';
		mainImgBackgroundOpacity.style.backgroundSize = 'contain';
	}
}
scrollDiv.onwheel = function(event){	
	var childrensScrollDiv = scrollDiv.children;
	for (var i = 0; i < childrensScrollDiv.length; i++) {
		var top = parseInt(window.getComputedStyle(childrensScrollDiv[i]).getPropertyValue("top"));
		var toplast = parseInt(window.getComputedStyle(childrensScrollDiv[childrensScrollDiv.length-1]).getPropertyValue("top"));
		var heightScrollDiv = parseInt(window.getComputedStyle(scrollDiv).getPropertyValue("height"));
		var maxTop = heightScrollDiv-heightAllImg;
		if (event.deltaY>0 && maxTop<top) {
			if (maxTop+200<top){
				childrensScrollDiv[i].style.top=top-300+"px"; 
			} else {
				childrensScrollDiv[i].style.top=maxTop-60+"px"; 
			}
		} 

		if (event.deltaY<0 && top<0) {
			if (top+300>0){
				childrensScrollDiv[i].style.top="0px";
			} else {
				childrensScrollDiv[i].style.top=top+300+"px";
			}
		}
		
	}
}
window.onresize = updateSizes;
function updateSizes(){
	scrollDiv.style.maxHeight = window.innerHeight-(window.innerHeight*10/100)+"px";
}
updateSizes();