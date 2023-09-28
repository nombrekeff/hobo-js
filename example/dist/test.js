"use strict";
exports.__esModule = true;
var path_1 = require("path");
var hobo_1 = require("../src/hobo");
var root = hobo_1.doc();
var pp = hobo_1.p('Im text').id('pppp').aa('title', 'a paragraph');
hobo_1.div().p().ca('hey');
// Styles
// Inline (get list of all styles and properties, mostly. and autocomplete)
hobo_1.div().sa('background', 'red');
hobo_1.div().ss({ background: 'red' });
hobo_1.div().on('click', function () {
    console.log('Hey');
});
var grid = hobo_1.div().ca('grid');
hobo_1.attach(grid);
for (var i = 0; i < 5; i++) {
    hobo_1.div(i.toString());
}
hobo_1.detach();
// Simplify adding multiple items, instead of loop
// multi(div, 4, (t, i) => t.text = i);
// div[4]((i) => i);
// Inside a style tag
// (get list of all styles and properties, mostly. and autocomplete)
hobo_1.style({
    '#ppp': {
        background: 'blue',
        'align-content': 'center'
    }
});
// Add scripts
// Somehow make it so the script inside is directly inserted into the generated html
hobo_1.script(function () {
    var el = document.querySelector('#pppp');
    el.style.color;
    // OR
    // const element = pp.sc.select();
});
hobo_1.save(hobo_1.generate(root.doc), path_1["default"].join(__dirname, 'test.html'));
