
class Holomen {
    constructor(name) {
        this.name = name

    }
}

class Game {
    constructor() {

    }
}


document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector("#intro").innerHTML="Hello!";
    const cw = document.documentElement.clientWidth;
    const ch = document.documentElement.clientHeight;

    const [gw, gh] = ((cw, ch)=>{
        const aspect = 16 / 9;
        const ret = [0, 0]
        if (ch / cw > aspect) {
            ret[0] = cw;
            ret[1] = cw * aspect;
        }
        else {
            ret[0] = ch / aspect;
            ret[1] = ch;
        }
        return ret;
    })(cw, ch);

    document.querySelector("main").style.width = gw + "px";
    document.querySelector("main").style.height = gh + "px";
})
