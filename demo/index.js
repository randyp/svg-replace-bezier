var replaceBezier = require('../svg-replace-bezier.js');
var $ = require('jquery');
$(document).ready(function () {
    //setup clones in table form
    {

        $('body > svg')
            //insert hr before each svg
            .each(function (index) {
                if (index > 0) {
                    $('<hr/>').insertBefore($(this));
                }

            })
            //wrap all svgs in row and col
            .wrap("<div class='row'><div class='col-md-6'></div></div>");


        //clone all cols into a second col
        $('body div.col-md-6').each(function () {
            var $this = $(this);
            var $clone = $this.clone().addClass('interpolate-me');
            $clone.appendTo($this.parent());
        });
    }

    $('body .interpolate-me svg path').each(function () {
        replaceBezier.path(this);
    });

});
