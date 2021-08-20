

class Game {
    constructor(ctn, gw, gh) {
        this.container = ctn;
        this.gw = gw;
        this.gh = gh;
        this.isTutrial = false;
        this.luckyTime = 0;
        this.windows = Array.from(this.container.querySelectorAll("*[id$=_w]"));
        this.prevData = {};
        this.scenes = {
            "start": {},
            "title": {},
            "tutrial": {},
            "tutrial2": {},
            "credit": {},
            "credit2": {},
            "select": {},
            "title": {},
            "kakegoe1": {},
            "intro": {},
            "kakegoe2": {},
            "call": {},
            "result": {},
            "restart_wait": {},
            "gameover": {},
            "restart_waitfromgameover": {},
            "credit": {},
        }


        this.SEs = {
            "start": {}
        }
        
        this.createObject();
        this.initGame();
        
        this.obj = {
            "start_b": this.container.querySelector("#start_b"),
            "tutrial_b": this.container.querySelector("#tutrial_b"),
            "credit_b": this.container.querySelector("#credit_b"),
            "backfromcredit_b": this.container.querySelector("#backfromcredit_b"),
        }
        this.obj["start_b"].onclick = () => {
            if (this.cur_window == "title_w") {
                this.setScene("select");
                SEs.play("start");
            }
        }
        this.obj["tutrial_b"].onclick = () => {
            if (this.cur_window == "title_w") {
                this.isTutrial = true;
                this.setScene("tutrial");
                SEs.play("start");
            }
        }
        this.obj["credit_b"].onclick = () => {
            if (this.cur_window == "title_w") {
                this.setScene("credit");
                SEs.play("system/ok");
            }
        }
        this.obj["backfromcredit_b"].onclick = () => {
            if (this.cur_window == "credit_w") {
                this.setScene("title"); 
            }
        }

        

        const mousedownEvent = () => {
            if (this.scene == "kakegoe1" && this.turn["taiko1_count"] < this.turn["selectedlyric"].length) {
                SEs.play("system/taiko");
                const time = Date.now() - this.turn["taiko1_starttime"] - (window_delay + taiko_delay);
                this.turn["taiko1_times_player"].push(time)
                const rhythmScore = this.calcRhythmScore(time - this.turn["taiko1_times"][this.turn["taiko1_count"]])
                this.addScore(rhythmScore);
                // console.log(time, this.turn["taiko1_times"][this.turn["taiko1_count"]], rhythmScore);
                this.turn["taiko1_count"]++;

            }
            else if (this.scene == "kakegoe2" && this.turn["taiko2_count"] < this.turn["lyric"].length) {
                SEs.play("system/taiko");
                const time = Date.now() - this.turn["taiko2_starttime"] - ( + taiko_delay);
                this.turn["taiko2_times_player"].push(time)

                const rhythmScore = this.calcRhythmScore(time - this.turn["taiko2_times"][this.turn["taiko2_count"]])
                this.addScore(rhythmScore);
                //  console.log(time, this.turn["taiko2_times"][this.turn["taiko2_count"]], rhythmScore);

                this.turn["taiko2_count"]++;
            }
            else if (this.scene == "restart_wait") {
                this.setScene("select")
            }
            else if (this.scene == "restart_waitfromgameover") {
                this.setScene("title")
                this.initGame();
            }
            else if (this.scene == "tutrial") {
                this.setScene("tutrial2")
            }
            else if (this.scene == "tutrial2") {
                this.setScene("title")
            }
            else if (this.scene == "tutrial") {
                this.setScene("tutrial2")
            }
            else if (this.scene == "tutrial2") {
                this.setScene("title")
            }
        }


        this.container.querySelector("#nextcredit").onclick = () => {
            if (this.cur_window == "credit_w") {
                this.setScene("credit2"); 
            }
        }

        this.container.querySelector("#backfromcredit_b").onclick = () => {
            if (this.cur_window == "credit2_w") {
                this.setScene("title"); 
            }
        }

        if (typeof this.container.ontouchstart === "undefined") {
            this.container.onmousedown = mousedownEvent; 
        }
        else {
            this.container.ontouchstart = mousedownEvent; 
        }

        const lyric_bs = Array.from(this.container.querySelector("#select_bs").children)
        lyric_bs.forEach(e=>{
            e.onclick = ()=>{
                const num = parseInt(e.classList[0].slice(1))
                this.turn["selectedlyric"] = Lyrics[num]
                if (this.lucky === 3) {
                    this.turn["lyric"] = Lyrics[num];
                    const holomen_filter1 = Holomen.filter(m=>m["lyric_type"] === num);
                    const holomen_filter = holomen_filter1[parseInt(Math.random() * holomen_filter1.length)]
                    this.setHolomen(Holomen.indexOf(holomen_filter));
                }
                this.setScene("kakegoe1");
            }
        })
    }

    isHolomen(men_m) {
        if (0 <= men_m && men_m < Holomen.length) {
            return 1;
        }
        else if (0 <= men_m - NotHolomen_ID_start && men_m - NotHolomen_ID_start  <= NotHolomen.length){
            return 0;
        }
        else {
            return -1;
        }
    }

    getMen(men_m) {

        const m_type = this.isHolomen(men_m)
        if (m_type===1) {
            return Holomen[men_m];
        }
        else if (m_type===0) {
            return NotHolomen[men_m - NotHolomen_ID_start];
        }
        else {
            console.log("誰？")
            return null;
        }
    }

    getParent(men_m) {
        const m_type = this.isHolomen(men_m);
        if (m_type === 1) {
            return this.getMen(men_m);
        }
        else if (m_type === 0) {
            return Holomen[NotHolomen[men_m - NotHolomen_ID_start]["parent_id"]];
        }
        else {
            return this.getMen(men_m);
        }
    }

    setHolomen(m) {
        // IDからホロメンかnotホロメンを得る
        let holomen_n;
        if (typeof m === "string") {
            holomen_n = Holomen.findIndex(m2=>m2["key"] === m);
            if (holomen_n < 0) {
                holomen_n = NotHolomen.findIndex(m2=>m2["key"] === m);
                if (holomen_n < 0) {
                    console.log("誰？");
                    return;
                }
                holomen_n += NotHolomen_ID_start;
            }
        }
        else {
            holomen_n = m;
        }
        this.setHolomenNum(holomen_n)
    }

    setHolomenNum(holomen_n) {

        this.turn["holomen"] = holomen_n;
        if (this.isHolomen(this.turn["holomen"]) === 1) {
            this.container.querySelector("#intro").innerText = this.getParent(this.turn["holomen"]).intro;
        }
        this.container.querySelector("#call_face").src = `image/photo/${this.getMen(this.turn["holomen"]).key}.png`;
        this.turn["lyric"] = Lyrics[this.getMen(this.turn["holomen"])["lyric_type"]];
    }

    addScore(sc) {
        const isMarine = this.prevData["judge"] && this.prevData["holomen"] === 4;
        const hosei = isMarine ? 3 : 1;
        this.setScore(this.score + sc * hosei);
    }

    setScore(sc) {
        if (!isNaN(sc)) {
            this.score = Math.min(SCORE_MAX, sc);
            this.container.querySelector("#score").innerText = this.score;
        }
        else {
            console.log("スコアがおかしなったぺこ")
        }
    }

    setHp(hp) {
        if (!isNaN(hp)) {
            this.hp = hp;
            this.container.querySelector("#hp").innerHTML = this.hp;
            this.container.querySelector("#hp").innerHTML = [...Array(this.hp)].fill(`<img src="image/hp.png">`).join("");

        }
        else {
            console.log("hpがおかしなったぺこ")
        }
    }
    setLucky(lucky) {

        if (lucky < 3) {
            this.lucky = lucky;
        }
        else if (!isNaN(lucky)) {

            this.lucky = 3;
            if (this.luckyTime === 0) {
                this.luckyTime = 5;
                const files = SEs.files.filter(se=>se.startsWith("lucky_start"));
                const file = files[parseInt(Math.random() * files.length)];
                SEs.play(file);
            }
        }
        else {
            console.log("幸運ポイントがおかしなったぺこ")
            return;
        }
        this.container.querySelector("#lucky").innerHTML = [...Array(this.lucky)].fill(`<img src="image/lucky.png">`).join("");
    }

    calcRhythmScore(d_ms) {
        const isWatame = this.scene === "kakegoe2" && this.judge() && this.getMen(this.turn["holomen"]).key === "watame";
        const watamehosei = isWatame ? 20 : 1;
        return parseInt(100 / ((d_ms * .03) ** 2 + 1)) * watamehosei;
    }

    initGame() {
        this.turn = {};
        this.setScene("start");
        this.setScore(0);
        this.setHp(5);
        this.setLucky(0);
        const cur = Array.from(this.container.querySelector("#holomenicons").children);
        if (cur.length > 0) {
            cur[0].remove();
        }
    }

    initTurn() {
        this.turn["selectedlyric"] = null;
        this.turn["mul"] = 1;
        this.turn["next_mul"] = 1;
        this.setHolomen(parseInt(Math.random() * Holomen.length));
        // 幸運0のときぺこちゃんをマイメロにする
        if (this.turn["holomen"] === 0 && this.lucky === 0) {
            this.setHolomen('mymelo');
        }


        this.turn["taiko1_starttime"] = 0;
        this.turn["taiko2_starttime"] = 0;
        this.turn["taiko1_times"] = [];
        this.turn["taiko1_times_player"] = [];
        this.turn["taiko2_times_player"] = [];
        let sum = 0;
        this.turn["taiko2_times"] = this.turn["lyric"].map(e=>e.beat).map(e=>sum += e*taiko_beat_ms);
        this.turn["taiko2_times"].unshift(0);
        this.turn["taiko1_count"] = 0;
        this.turn["taiko2_count"] = 0;
        this.turn["choice"] = [this.turn["holomen"]];
        // while (this.turn["choice"].length < 3) {
        //     const kouho = parseInt(Math.random() * (Holomen.length + NotHolomen.length));
        //     if (this.turn["choice"].indexOf(kouho)<0) {
        //         this.turn["choice"].push(kouho);
        //     }
        // }
        
        this.container.querySelector("#intro").style.display = "none";
        this.container.querySelector("#call").style.display = "none";
    }

    setSize(w, h) {
        this.w = w
        this.h = h
    }

    setScene(sc) {
        if (sc in this.scenes) {
            // console.log('scene:', sc)
            this.scene = null;
            setTimeout(()=>{
                this.scene = sc;
            }, 200);
            switch (sc) {
                case "start":
                    this.setWindow('title_w', true);
                    break;
                case "title":
                    this.setWindow('title_w');
                    break;
                case "tutrial":
                    this.setWindow('howto_w');
                    break;
                case "tutrial2":
                    this.setWindow('howto2_w');
                    break;
                case "credit":
                    this.setWindow('credit_w');        
                    break;
                case "credit2":
                    this.setWindow('credit2_w');
                    break;
                case "select":
                    this.initTurn()
                    this.setWindow('select_w');
                    break;
                case "kakegoe1":
                    this.setWindow('play_w');
                    // setTimeout(this.createTaiko1, 1000, this);
                    let sum = 0;
                    this.turn["taiko1_times"] = this.turn["selectedlyric"].map(l=>l.beat).map(e=>sum += e*taiko_beat_ms);
                    this.turn["taiko1_times"].unshift(0);
                    const len = this.turn["taiko1_times"].slice(-1)[0] + window_delay + taiko_delay + taiko_delay_post;
                    setTimeout(()=>this.setScene("intro"), len);
                    setTimeout(this.createTaiko1, window_delay, this);
                    this.turn["taiko1_starttime"] = Date.now();
                    
                    break;
                case "intro":
                    this.container.querySelector("#taiko1_tutrial").style.display = "none";
                    this.container.querySelector("#intro").style.display = "block";
                    SEs.play(`taiko/${this.getParent(this.turn["holomen"]).key}_intro`, ()=>this.setScene("kakegoe2"));
                    
                    break;
                case "kakegoe2":
                    const len2 = this.turn["taiko2_times"].slice(-1)[0] + taiko_delay + taiko_delay_post;
                    setTimeout(()=>this.setScene("call"), len2);
                    setTimeout(this.createTaiko2, 0, this);
                    this.turn["taiko2_starttime"] = Date.now();
                    break;
                case "call":

                    const file = SEs.files.find(se=>se.startsWith(`taiko/${this.getMen(this.turn["holomen"]).key}_call`));
                    SEs.play(file, ()=>this.setScene("result"));
                    this.container.querySelector("#call").style.display = "block";
                    break;
                case "result":
                    {
                        if (this.judge()) {
                            SEs.play("atari", ()=>this.setScene("restart_wait"));
                            this.addScore(this.getMen(this.turn["holomen"])["score"]);
                            // ルーナボーナス
                            if (this.getMen(this.turn["holomen"]).key === "luna") {
                                this.setHp(5);
                            }
                            // トワボーナス
                            if (this.getMen(this.turn["holomen"]).key === "towa") {
                                this.setLucky(this.lucky + 1);
                            }
                        }
                        else {
                            const files = SEs.files.filter(se=>se.startsWith("hazure"));
                            const file = files[parseInt(Math.random() * files.length)];
                            this.setHp(this.hp - 1);
                            // るしあメンヘラ
                            if (this.getMen(this.turn["holomen"]).key === "rushia") {
                                this.container.querySelector("#call_face").src = `image/photo/rushia_miss.png`;
                                this.setHp(0);
                                SEs.play("taiko/rushia_miss");
                            }
                            SEs.play(file, ()=>{
                                if (this.hp === 0) {
                                    this.setScene("gameover");
                                } 
                                else {
                                    this.setScene("restart_wait");
                                }
                            });
                        }
                    }
                    if (this.luckyTime > 0) {
                        this.luckyTime--;
                        if (this.luckyTime == 0) {
                            this.setLucky(0);
                        }
                    } 
                    this.alterIcon();
                    this.prevData = {
                        "holomen": this.turn["holomen"],
                        "judge": this.judge()
                    }
                    break;
                case "restart_wait":
                    break;
                case "gameover":
                    this.setWindow('gameover_w'); 
                    SEs.play("gameover", ()=>this.setScene("restart_waitfromgameover"));
                    break;

            }
        }
        else {
            console.log("ないシーンぺこ");
        }
    }

    judge() {
        return Lyrics.indexOf(this.turn["selectedlyric"]) === Lyrics.indexOf(this.turn["lyric"]) && this.isHolomen(this.turn["holomen"]);
    }

    setWindow(w, fast=false) {
        if (this.windows.map(e=>e.id).indexOf(w) >= 0) {
            this.cur_window = null;
            
            
            this.windows.filter(e=>e.id != w).forEach(e => {
                e.style.pointerEvents = "none";
                e.classList.remove("appear_w", "appearfast_w")
                e.classList.add(fast?"disappearfast_w":"disappear_w")
            });
            this.container.querySelector(`#${w}`).style.pointerEvents = 'auto';
            this.container.querySelector(`#${w}`).classList.add(fast?"appearfast_w":"appear_w")
            this.container.querySelector(`#${w}`).classList.remove("disappear_w", "disappearfast_w")
            setTimeout(() => {
                this.cur_window = w;
            }, fast?0:1000); 
        }
        else {
            console.log("ないウィンドウ");
        }
    }


    createObject() {
        
        // select_w
        const lyrics_num = Lyrics.length;
        Lyrics.forEach((e, idx)=>{
            const div = document.createElement("div");
            div.classList.add(`l${idx}`);
            div.classList.add("lyric_b");
            div.append(e.map(e2=>e2.lyric).join(''));
            div.style.top = (40 + ( idx / lyrics_num * 60)) + "%";
            this.container.querySelector("#select_bs").appendChild(div);

        })
    }

    createTaiko1(this_) {
        const lyric_type = Lyrics.indexOf(this_.turn["selectedlyric"]);
        // this_.createTaiko(this_, lyric_type);
        let t = 0;

        this_.turn["selectedlyric"].forEach((l,idx)=>{
            const div = document.createElement("div");
            div.append(l.lyric);

            setTimeout(() => {
                div.classList.add("taiko", "taikoshape", "appear_taiko");
                div.classList.add(`t${idx}`);
                this_.container.querySelector("#taikos").appendChild(div);
                Holomen.filter(m=>m['lyric_type']===lyric_type).forEach(m=>{
                    setTimeout(() => {SEs.play(`taiko/${m["key"]}1_${idx+1}`);}, taiko_delay);
                })
                
                
            }, t * taiko_beat_ms);
            t += l.beat;
        })
    }

    createTaiko2(this_) {
        const holomen =  this_.getParent(this_.turn["holomen"]);
        const lyric_type = holomen["lyric_type"];
        let t = 0;

        Lyrics[lyric_type].forEach((l,idx)=>{
            const div = document.createElement("div");
            div.append(l.lyric);

            setTimeout(() => {
                div.classList.add("taiko", "taikoshape", "appear_taiko");
                div.classList.add(`t${idx}`);
                this_.container.querySelector("#taikos").appendChild(div);
                setTimeout(() => {SEs.play(`taiko/${holomen["key"]}1_${idx+1}`);}, taiko_delay);
                
                
            }, t * taiko_beat_ms);
            t += l.beat;
        })
    }

    alterIcon() {
        const cur = Array.from(this.container.querySelector("#holomenicons").children);
        if (cur.length > 0) {
            cur[0].classList.add("disappear_icon");
            setTimeout(() => {
                cur[0].remove();
            }, 2000);

            // カップリングボーナス
            
            if (
                this.getMen(this.turn["holomen"]).key === 'flare' && Holomen[this.prevData["holomen"]].key === 'noel'
                || this.getMen(this.turn["holomen"]).key === 'noel' && Holomen[this.prevData["holomen"]].key === 'flare'
                || this.getMen(this.turn["holomen"]).key === 'coco' && Holomen[this.prevData["holomen"]].key === 'kanata'
                || this.getMen(this.turn["holomen"]).key === 'kanata' && Holomen[this.prevData["holomen"]].key === 'coco'
            ) {
                setTimeout(() => {
                    this.addScore(5000);
                }, 1000);
            }
        }

        const m_type = this.isHolomen(this.turn["holomen"])
        if (m_type === 1) {
            const prevholomenicon = document.createElement("div");
            prevholomenicon.classList.add("holomenicon", "appear_icon")
            prevholomenicon.style.backgroundImage = `url(image/icon/${this.getMen(this.turn["holomen"]).key}.jpg)`
            prevholomenicon.style.borderColor = `var(--color-${this.getMen(this.turn["holomen"]).key})`
            this.container.querySelector("#holomenicons").appendChild(prevholomenicon);
        }
        else if (m_type === 0) {
            // Notホロメン
            // const m = this.turn["holomen"] - NotHolomen_ID_start;
        }
    }

}


let game;


document.addEventListener("DOMContentLoaded", ()=>{
    

    // 画面サイズ決める
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

    SEs.init()
    game = new Game(document.querySelector("#game"), gw, gh);
    setPosSize(gw, gh);
    game.setSize(cw, ch);
})