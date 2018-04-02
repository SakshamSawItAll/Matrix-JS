var c = document.getElementById("c");
var ctx = c.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;

var char = "01";
char = char.split("");

var fs = 16;
var columns = c.width/fs;
var bc=0;

var drops = [];
for(var x = 0; x < columns; x++)
	drops[x] = c.width*10; 
var colors = ["#00f","#0f0","#fff","#000","#f00","#00f","#fff","#f00","#000"];
var colorbg = ["rgba(0, 0, 0, 0.05)","rgba(0, 0, 0, 0.05)","rgba(0, 0, 0, 0.05)","rgba(255, 255, 255, 0.05)","rgba(255, 255, 255, 0.05)","rgba(255, 255, 255, 0.05)","rgba(0, 0, 255, 0.05)","rgba(0, 0, 255, 0.05)","rgba(0, 0, 255, 0.05)"];

function modi()
{
	bc+=1;
	if(bc/9>0)
		bc=0;
	var ccc = 'rgba(';
	for(var i=0;i<3;i++){
		ccc+=(105+Math.floor(Math.random()*150)).toString();
		ccc+=', ';
	}
	ccc+='1)';
	colors[bc] = ccc;
}
function draw()
{
	ctx.fillStyle = colorbg[bc];
	ctx.fillRect(0, 0, c.width, c.height);

	ctx.fillStyle = colors[bc];
	ctx.font = fs + "px arial";
	for(var i = 0; i < drops.length; i++)
	{
		var text = char[Math.floor(Math.random()*char.length)];
		ctx.fillText(text, i*fs, drops[i]*fs*0.9);
		
		if(drops[i]*fs > c.height && Math.random() > 0.95)
			drops[i] = 0;
		drops[i]++;
	}

}
setInterval(modi, 4000);
setInterval(draw, 40);

