/* start index.post.js */
    return Module;
})();
/* end index.post.js */

var pathParse = require('svg-path-parser');

agg.PathCommand.move_to.c = 'M';
agg.PathCommand.line_to.c = 'L';

function convertPathString(pathString, options) {

    var xy = agg._malloc(16);
    var c3 = new agg.curve3();
    var c4 = new agg.curve4();

    if(options){
        if (options.approximationScale) {
            c3.approximationScale(options.approximationScale);
            c4.approximationScale(options.approximationScale);
        }
        if (options.angleTolerance) {
            c3.angleTolerance(options.angleTolerance);
            c4.angleTolerance(options.angleTolerance);
        }
        if (options.cuspLimit) {
            c3.cuspLimit(options.cuspLimit);
            c4.cuspLimit(options.cuspLimit);
        }
    }

    try {
        var converted = [];
        converted.pushAll = function (arr) {
            this.push.apply(this, arr);
        };

        var parsed = pathParse(pathString);
        var lastCommand;
        for (var i = 0; i < parsed.length; i++) {
            if (i > 0) {
                converted.push(' ');
            }
            var command = parsed[i];
            if (command.code === 'Z') {
                converted.push('Z');
            } else if (command.code === 'M' || command.code === 'L') {
                converted.pushAll([command.code, command.x, ',', command.y]);
            } else if (command.code === 'Q' || command.code === 'C' || command.code === 'S') {
                var c, initArgs;
                if (command.code === 'Q') {
                    c3.reset();
                    c3.init(lastCommand.x, lastCommand.y, command.x1, command.y1, command.x, command.y);
                    c = c3;
                } else if (command.code === 'C') {
                    c4.reset();
                    c4.init(lastCommand.x, lastCommand.y, command.x1, command.y1, command.x2, command.y2, command.x, command.y);
                    c = c4;
                } else { //S
                    if (lastCommand.x2) {
                        lastCommand.s_x1 = 2 * lastCommand.x - lastCommand.x2;
                        lastCommand.s_y1 = 2 * lastCommand.y - lastCommand.y2;
                    } else {
                        lastCommand.s_x1 = lastCommand.x;
                        lastCommand.s_y1 = lastCommand.y;
                    }
                    c4.reset();
                    c4.init(lastCommand.x, lastCommand.y, lastCommand.s_x1, lastCommand.s_y1, command.x2, command.y2, command.x, command.y);
                    c = c4;
                }

                var pathCommand, pathCommandIndex, x, y;
                c.vertex(xy, xy + 8); //to get rid of first move command
                while (true) {
                    pathCommandIndex = c.vertex(xy, xy + 8);
                    pathCommand = agg.PathCommand.values[pathCommandIndex];
                    if (!pathCommand) {
                        throw "PathCommand not found: " + pathCommandIndex;
                    }
                    if (pathCommand === agg.PathCommand.stop) {
                        break;
                    }
                    if (!pathCommand.c) {
                        throw ("Unsupported path command: " + pathCommand);
                    }
                    x = agg.getValue(xy, 'double');
                    y = agg.getValue(xy + 8, 'double');
                    converted.pushAll([pathCommand.c, x, ',', y]);
                }
            } else {
                throw 'Command not supported:' + JSON.stringify(command);
            }
            lastCommand = command;
        }
        return converted.join("");
    } finally {
        c3.delete();
        c4.delete();
        agg._free(xy);
    }
}

function convertPath(path, options){
    var d = path.getAttribute('d');
    path.setAttribute('d', convertPathString(d, options));
}

module.exports = {
    d: convertPathString,
    path: convertPath
};
