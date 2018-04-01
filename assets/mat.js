var c = document.getElementById("c");
var ctx = c.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;

var char = "10";
char = char.split("");

var fs = 3,stFl=0,chFl=0;
var columns = c.width/fs;
var bc=0,bbc=0;

var drops = [];
for(var x = 0; x < columns; x++)
	drops[x] = c.width*20; 
var colors = ["#0f0","#fff","#0f0","#fff"];
var colorbg = ["rgba(0, 0, 0, 0.05)","rgba(0, 0, 0, 0.05)"];

function change(e)
{
	/*bc=bc+1;
	if(bc==colors.length)
		bc=0;*/
	var ccc = 'rgba(';
	for(var i=0;i<3;i++){
		ccc+=(105+Math.floor(Math.random()*150)).toString();
		ccc+=', ';
	}
	ccc+='1)';
	colors[bc] = ccc;
}
function changebg(e)
{
	var key = e.keyCode;
	console.log(key);
	if(key==67||key==99){
		var ccc = 'rgba(';
		for(var i=0;i<3;i++){
			ccc+=Math.floor(Math.random()*105).toString();
			ccc+=', ';
		}
		if(stFl==0 || chFl==1){
			ccc+='0.05)';
			chFl=0;
		}
		else{
			ccc+='1.00)';
			chFl=1;
		}
		colorbg[bbc] = ccc;
		ctx.fillStyle = colorbg[bbc];
		ctx.fillRect(0, 0, c.width, c.height);
	}
}

var x = c.width/2;
var y = c.height/2;


function onMouseUpdate(e) {
    x = e.pageX;
    while(x % fs != 0)
    	x++;
    y = e.pageY;
}

function getMouseX() {
    return x;
}

function getMouseY() {
    return y;
}

function draw()
{
	ctx.fillStyle = colorbg[bbc];
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = colors[bc];
	var t = 0;
	for(var i = 0; i < drops.length; i++)
	{
		var text = char[Math.floor(Math.random()*char.length)];
		ctx.font = fs + "px arial";
		var a = i*fs - x;
		if(a < 0)
			a *= -1;
		if((drops[i]*fs < 0 || drops[i]*fs > c.height) && Math.random() > 0.0)
			drops[i] = Math.random()*Math.abs(i*fs-x);
		for(var z=0;z<=1.2;z+=0.15)
			ctx.fillText(text, i*fs, y - drops[i]*fs*(-z + (a)/500));
		drops[i]++;
	}

}
myVar=setInterval(draw, 40);
function stopMatr(e){

	var key = e.keyCode;
	if(key==115||key==83){
		if(stFl==0){
			clearInterval(myVar);
			for(var j=0;j<20;j++){
				ctx.fillStyle = colorbg[bbc];
				ctx.fillRect(0, 0, c.width, c.height);
			}
			stFl=1;
		}
		else{
			myVar = setInterval(draw,40);
			stFl=0;
			var ccc = 'rgba(';
			for(var i=0;i<3;i++){
				ccc+=Math.floor(Math.random()*105).toString();
				ccc+=', ';
			}
			ccc+='0.05)';
			colorbg[bbc] = ccc;
			ctx.fillStyle = colorbg[bbc];
			ctx.fillRect(0, 0, c.width, c.height);
		}
	}
}

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);
document.addEventListener('click', change, false);
window.addEventListener('keypress', changebg, false);
window.addEventListener('keypress', stopMatr, false);