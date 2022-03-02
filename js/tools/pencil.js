import icon from '../../img/tools/tool_draw.svg?raw'

var Path = paper.Path
var path = null
var tool = new paper.Tool({
  name: 'pencil',
  test: 'ssss'
})

tool.onMouseDown = function (event) {
  console.log(this)
  path = new Path()
  path.moveTo(event.point)
}

tool.onMouseDrag = function (event) {
  path.lineTo(event.point)
}

tool.onMouseUp = function (event) {
  path.simplify()
}

tool.icon = icon

export default tool