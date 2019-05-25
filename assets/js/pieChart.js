
var pieChart = function(dataPoints,radius,x,y)
{
      this.dataPoints = dataPoints;
      this.radius = radius;
      this.x = x;
      this.y = y;
     
      this.draw = function(ctx)
      {    
           var start_angle = 0;
           var end_angle;
           console.log(dataPoints.y);
           
            for(var i = 0;i < dataPoints.length;i++)
            {   
                ctx.strokeStyle = dataPoints[i].color;
                console.log(ctx.fillStyle);
                var body = document.querySelector("body");
                //body.style.backgroundColor = dataPoints[0].color;
                ctx.beginPath(); 
                ctx.fillStyle = dataPoints[i].color;
                end_angle = start_angle + (dataPoints[i].y)*2;
                ctx.moveTo(x,y);
                ctx.arc(x,y,radius,start_angle*Math.PI,end_angle*Math.PI);
                console.log(start_angle,end_angle);
               
                //ctx.closePath();
                ctx.fill();
                start_angle = end_angle;
            }
          //Legend
             ctx.strokeStyle = "black"
             ctx.font = '30px serif';
             ctx.strokeText('Legend', 600, 100);
             
             ctx.font = "20px serif"
             for(var i = 0;i < dataPoints.length;i++)
             {     ctx.fillStyle = dataPoints[i].color;
                   ctx.fillRect(600,150+i*50,20,20);
                   ctx.strokeText(dataPoints[i].label,640,150+50*i+15);
             }

      }
}




