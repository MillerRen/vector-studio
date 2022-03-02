export default {
  
}

var Path = paper.Path;
    var path;
    var tool = new paper.Tool({
        name: 'pencil',

    });

    tool.onMouseDown = function (event) {
        path = new Path({
            strokeColor: '#009dec'
        });
        path.moveTo(event.point)
    }

    tool.onMouseDrag = function (event) {
        path.lineTo(event.point);
    }

    tool.onMouseUp = function (event) {
        path.simplify();
    }