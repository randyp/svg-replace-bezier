svg-replace-bezier is a library for replacing bezier curves with line segments

This is accomplished by using [svg-path-parse](https://github.com/hughsk/svg-path-parser) to parse the path, and using a portion of the [antigrain geometry library](http://www.antigrain.com/) compiled with [emscripten](http://kripken.github.io/emscripten-site/) to convert the bezier curves to line segments.

### example
``` javascript
var replaceBezier = require('svg-replace-bezier');

replaceBezier.d('M100,200 Q100,100 250,200 Q400,300 400,200'); /* outputs 'M100,200 L100.146484375,....' */
```

### demo
* [page](http://randyp.github.io/svg-replace-bezier/demo/index.html)
* [source] (demo)
