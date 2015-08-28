svg-replace-bezier is a library for replacing bezier curves with line segments

This is accomplished by using [svg-path-parse](https://github.com/hughsk/svg-path-parser) to parse the path, and using a portion of the [antigrain geometry library](http://www.antigrain.com/) compiled with [emscripten](http://kripken.github.io/emscripten-site/) to convert the bezier curves to line segments.


