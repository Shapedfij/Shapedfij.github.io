if (window.addEventListener) {
  window.addEventListener('load', function () {

    function Pixel(id, x, y, type) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.type = type;
    }
    
    var Pixel_Log = [];
    var canvas, context, tool;
    var index_count = 0;

    function display_pixel_log() {
      for(i = index_count; i < Pixel_Log.length; i++) {
        if(Pixel_Log[i].type == "begin") {
          context.beginPath();
          context.moveTo(Pixel_Log[i].x, Pixel_Log[i].y);
        } else {
        context.lineTo(Pixel_Log[i].x, Pixel_Log[i].y);
        context.stroke();
        }
        index_count++;
      }
    }

    function init() {
      canvas = document.getElementById('imageView');
      if (!canvas) {
        alert('Error: I cannot find the canvas element!');
        return;
      }

      if (!canvas.getContext) {
        alert('Error: no canvas.getContext!');
        return;
      }

      context = canvas.getContext('2d');
      if (!context) {
        alert('Error: failed to getContext!');
        return;
      }

      tool = new tool_pencil();

      canvas.addEventListener('mousedown', ev_canvas, false);
      canvas.addEventListener('mousemove', ev_canvas, false);
      canvas.addEventListener('mouseup', ev_canvas, false);
    }

    function tool_pencil() {
      var tool = this;
      this.started = false;

      this.mousedown = function (ev) {
        Pixel_Log.push(new Pixel(Pixel_Log.length - 1, ev._x, ev._y, "begin"));
        tool.started = true;
      };

      this.mousemove = function (ev) {
        if (tool.started) {
          Pixel_Log.push(new Pixel(Pixel_Log.length - 1, ev._x, ev._y, "move"));
          console.log("X: " + Pixel_Log[Pixel_Log.length-1].x + " Y: " + Pixel_Log[Pixel_Log.length-1].y);
          display_pixel_log();
        }
      };

      this.mouseup = function (ev) {
        if (tool.started) {
          tool.mousemove(ev);
          tool.started = false;
        }
      };
    }

    function ev_canvas(ev) {
      if (ev.layerX || ev.layerX == 0) { // Firefox
        ev._x = ev.layerX;
        ev._y = ev.layerY;
      } else if (ev.offsetX || ev.offsetX == 0) { // Opera
        ev._x = ev.offsetX;
        ev._y = ev.offsetY;
      }

      var func = tool[ev.type];
      if (func) {
        func(ev);
      }
    }

    init();

  }, false);
}
