

const APP = {};


window.onload = function()
{
    APP.svgelement = document.getElementById("svg");

    gridLines();

    threePoint();
    fourPoint();
    sixPoint();
    eightPoint();
}


function gridLines()
{
    const width = 800;
    const height = 600;
    const spacing = 100;

    for(let x = 0; x <= width; x += spacing)
    {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    	line.setAttributeNS(null, "x1", x);
    	line.setAttributeNS(null, "y1", 0);
    	line.setAttributeNS(null, "x2", x);
    	line.setAttributeNS(null, "y2", 600);

        line.setAttributeNS(null, "stroke", "#D0D0D0");

    	APP.svgelement.appendChild(line);
    }

    for(let y = 0; y <= height; y += spacing)
    {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    	line.setAttributeNS(null, "x1", 0);
    	line.setAttributeNS(null, "y1", y);
    	line.setAttributeNS(null, "x2", 800);
    	line.setAttributeNS(null, "y2", y);

        line.setAttributeNS(null, "stroke", "#D0D0D0");

    	APP.svgelement.appendChild(line);
    }
}


function drawPoints(points, colour)
{
    for(const point of points)
    {
	    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        circle.setAttributeNS(null, "cx", point[0]);
	    circle.setAttributeNS(null, "cy", point[1]);
	    circle.setAttributeNS(null, "r", 2);

	    circle.setAttributeNS(null, "fill", colour);

	    APP.svgelement.appendChild(circle);
    }
}


function generatePath(points, relative)
{
    let type = null;

    if(points.length === 3)
    {
        type = "Q";
    }
    else if(points.length === 4)
    {
        type = "C";
    }
    else if(points.length % 2 === 0)
    {
        type = "C";
    }
    else
    {
        throw 'Number of points must be 3 or an even number more than 3';
    }

    const pathPoints = ["M ", points[0][0], ",", points[0][1], type];

    for(let p = 1, l = points.length; p < l; p++)
    {
        if(p >= 4 && p % 2 === 0)
            pathPoints.push("S");

        pathPoints.push(points[p][0]);
        pathPoints.push(",");
        pathPoints.push(points[p][1]);
    }

    return pathPoints.join(" ");
}


function drawBezier(pathString, stroke)
{
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttributeNS(null, "d", pathString);
    path.setAttributeNS(null, "stroke", stroke);
    path.setAttributeNS(null, "fill", "transparent");
    path.setAttributeNS(null, "stroke-width", "1px");
    document.getElementById("svg").appendChild(path);
}


function threePoint()
{
    const points = [[50,50],[150,550],[750,50]];

    drawPoints(points, "#FF0000");

    const pathString = generatePath(points, false);

    drawBezier(pathString, "#FF0000");
}


function fourPoint()
{
    const points = [[50,50],[50,550],[750,550],[750,150]];

    drawPoints(points, "#00C000");

    const pathString = generatePath(points, false);

    drawBezier(pathString, "#00C000");
}


function sixPoint()
{
    const points = [[50,50],[150,500],[500,400],[400,200],[650,150],[750,50]];

    drawPoints(points, "#0000FF");

    const pathString = generatePath(points, false);

    drawBezier(pathString, "#0000FF");
}


function eightPoint()
{
    const points = [[50,50],[50,350],[250,200],[400,300],[200,450],[500,500],[650,200],[750,550]];

    drawPoints(points, "#FF8000");

    const pathString = generatePath(points, false);

    drawBezier(pathString, "#FF8000");
}
