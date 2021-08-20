
var css;

const setPosSize = (gw, gh) => {
    style = document.getElementById('css_size');
    css = style.sheet;


    const insertRule = (selector, property, value) => {
        let value2 = value;
        if (["width", "height", "border-width", "font-size", "line-height"].indexOf(property) >= 0 && !isNaN(value)) {
            value2 = value + "px";
        } 

        css.insertRule(`${selector} { ${property}: ${value2} !important; }`, 0);
    };


    // insertRule("#start_b", "background-color", "#00ff00");
    insertRule("html", "font-size", gh * .03);
    insertRule("#title_logo", "top", "10%");

    insertRule(".trans_b", "width", gh * .25);
    insertRule(".trans_b", "font-size", gh * .03);
    insertRule(".trans_b", "height", gh * .25);
    insertRule(".taikoshape,.taiko", "height", gh * .15);
    insertRule(".taikoshape,.taiko", "width", gh * .15);
    insertRule(".taikoshape", "border-width", gh * .01);
    insertRule(".taiko", "font-size", gh * .03);
    insertRule(".taiko", "line-height", gh * .15);
    insertRule("#gameover", "font-size", gh * .06);
    insertRule("#status", "font-size", gh * .028);
    insertRule("#status", "height", gh * .033);
    insertRule(".howto_w dd", "font-size", gh * .025);
    insertRule(".holomenicon", "width", gh * .08);
    insertRule(".holomenicon", "height", gh * .08);
    insertRule(".holomenicon", "border-width", gh * .003);
    insertRule(".credit_list td", "height", gh * .08);
}