import icon from '../../img/tools/tool_draw.svg?raw'

var Path = paper.Path
var path = null
var tool = {
  name: 'pencil',
  icon: icon,
  onMouseDown: function (event) {
    path = new Path()
    path.moveTo(event.point)
  },
  onMouseDrag: function (event) {
    path.lineTo(event.point)
  },
  onMouseUp: function (event) {
    path.simplify()
    tool.onchange && tool.onChange(path)
  }
}

export default tool