import icon from '../../img/tools/tool_select.svg?raw'

var hitResult = null
var guide
var hitOptions = {
  tolerance: 3,
  fill: true,
  stroke: true,
  // segments: true,
  curves: true,
  // handles: true,
  bounds: true,
  pixel: true
}

var tool = {
  name: 'select',
  icon: icon,
  onMouseDown: function (event) {
    paper.project.selectedItems.forEach(function (item) {
      item.selected = false
      item.bounds.selected = false
    })
    hitResult = paper.project.hitTest(event.point, hitOptions)
    if (hitResult) {
      // hitResult.item.selected = true
      hitResult.item.bounds.selected = true
    }
  },
  onMouseUp: function (event) {
    var layer = paper.project.activeLayer
    var items = layer.getItems({
      inside: new paper.Rectangle(event.downPoint, event.point)
    })
    .forEach(item => {
      item.bounds.selected = true
    })
    this.onChange && this.onChange(items)
  },
  onMouseDrag: function onMouseDrag (event) {
    if (!hitResult) {
      guide = new paper.Path.Rectangle({
        from: event.downPoint,
        to: event.point,
        strokeWidth: 1,
        strokeColor: '#ccc',
        fillColor: '#fff',
        dashArray: [3, 5]
      })
      guide.fillColor.alpha = 0.5
      guide.removeOn({
        drag: true,
        up: true
      })
      return
    }
  
    var item = hitResult.item
  
    switch (hitResult.type) {
      case 'fill':
      case 'stroke':
      case 'curve':
      case 'pixel':
        item.position = item.position.add(event.delta)
        break
      case 'bounds':
        var sx, sy
        switch (hitResult.name) {
          case 'top-left':
            sx = (item.bounds.width - event.delta.x) / item.bounds.width
            sy = (item.bounds.height - event.delta.y) / item.bounds.height
            item.scale(sx, sy, item.bounds.bottomRight)
            break
          case 'top-right':
            sx = (item.bounds.width + event.delta.x) / item.bounds.width
            sy = (item.bounds.height - event.delta.y) / item.bounds.height
            item.scale(sx, sy, item.bounds.bottomLeft)
            break
          case 'top-center':
            sx = 1
            sy = (item.bounds.height - event.delta.y) / item.bounds.height
            item.scale(sx, sy, item.bounds.bottomCenter)
            break
          case 'bottom-left':
            sx = (item.bounds.width - event.delta.x) / item.bounds.width
            sy = (item.bounds.height + event.delta.y) / item.bounds.height
            item.scale(sx, sy, item.bounds.topRight)
            break
          case 'bottom-right':
            sx = (item.bounds.width + event.delta.x) / item.bounds.width
            sy = (item.bounds.height + event.delta.y) / item.bounds.height
            item.scale(sx, sy, item.bounds.topLeft)
            break
          case 'bottom-center':
            sx = 1
            sy = (item.bounds.height + event.delta.y) / item.bounds.height
            item.scale(sx, sy, item.bounds.topCenter)
            break
          case 'left-center':
            sx = (item.bounds.width - event.delta.x) / item.bounds.width
            sy = 1
            item.scale(sx, sy, item.bounds.rightCenter)
            break
          case 'right-center':
            sx = (item.bounds.width + event.delta.x) / item.bounds.width
            sy = 1
            item.scale(sx, sy, item.bounds.leftCenter)
            break
        }
        break
      default:
        throw new Error('Unknown dir'+hitResult.type)
    }
  }
}

export default tool
