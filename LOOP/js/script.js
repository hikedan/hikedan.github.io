
let app;

document.addEventListener("DOMContentLoaded", ()=>{
    app = new App(document);
})

function  onYouTubeIframeAPIReady() {
    app.onYouTubeIframeAPIReady();
}

class App {
    constructor(doc) {
        this.doc = doc;
        this.timerID = -1;
        this.playing = false;
        this.player = null;
        this.rate = 1;
        this.init()
        this.loop_start_time = this.offset; // Unit: sec
        this.beat = 4; // 拍子
        this.setCurMeasure(0); // 現在いる小節
        this.f_loop_start = false;
        this.createEvents();
    }

    init() {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        this.callAPI();

        this.setSource(params.get("videoId") || 'GCUK_IyRTY8');
        this.setBPM(params.get("bpm") || 126);
        this.setOffset(params.get("offset") || 0.280); // Unit: sec
        this.setLoopMeasure(2);
        this.setLoop(false);
        this.setIntervalRate(100);
    }
    callAPI() {
        const tag = this.doc.createElement('script');
       
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = this.doc.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    }
    onYouTubeIframeAPIReady() {
        this.loadVideo(this.videoId);
    }


    loadVideo(videoId) {
        if (this.player) {
            this.stop();
            this.player.destroy()
        }
        this.player = new YT.Player('player', {
          height: '360',
          width: '640',
          playerVars: { 'controls': 0 },
          videoId: this.videoId,
          events: {
            'onReady': this.onPlayerReady.bind(this),
            'onStateChange': this.onPlayerStateChange.bind(this)
          }
        });
    }
    onPlayerReady(ev) {
        console.log("準備完了");
    }
    onPlayerStateChange(ev) {
        // -1 – 未開始
        // 0 – 終了
        // 1 – 再生中
        // 2 – 一時停止
        // 3 – バッファリング中
        // 5 – 頭出し済み
        // console.log("onPlayerStateChange:", ev.data);
        if (this.f_loop_start) {
            if (ev.data == 1) {
                this.f_loop_start = false;
                this.timerID = setTimeout(this.loopEnd.bind(this), this.getDuration() * 1000);
            }
        }
    }
    stopVideo() {
        this.player.stopVideo();
    }

    play() {
        const time = this.getOffset() + this.getCurMeasure() * 60 / this.bpm * this.beat;
        this.player.seekTo(time);
        this.player.playVideo();
        this.f_loop_start = true;
        this.doc.querySelector(".ctl_play").innerText = "停止";
    }
    loopEnd() {
        this.pauseVideo();
        this.timerID = setTimeout(this.next.bind(this), this.getDuration() * 100 / this.getIntervalRate() * 1000);
    }

    pauseVideo() {
        this.player.pauseVideo();
    }

    next() {
        const cur_measure = this.getCurMeasure() + (this.getLoop() ? 0 : this.getLoopMeasure());
        this.setCurMeasure(cur_measure);
        this.loop_start_time = this.offset + 60 / this.bpm * this.beat * this.cur_measure;
        this.play();
        console.log(this.getCurMeasure());
    }
    stop() {
        clearInterval(this.timerID);
        this.player.pauseVideo();
        this.f_loop_start = false;
        this.playing = false;
        this.doc.querySelector(".ctl_play").innerText = "再生";
    }

    createEvents() {
        const ctl = this.doc.getElementById("control_container");

        // play
        this.doc.body.addEventListener('keypress', (ev=>{
            if (ev.target == ev.currentTarget && ev.code == "Space") this.play_clicked();
        }).bind(this));
        this.doc.querySelector(".play_control").addEventListener("click", this.play_clicked.bind(this));

        // source
        ctl.querySelector(".ctl_source input").addEventListener("click", this.stop.bind(this));


        // video
        ctl.querySelector(".ctl_bpm input").addEventListener("click", this.stop.bind(this));
        ctl.querySelector(".ctl_offset input").addEventListener("click", this.stop.bind(this));
        // tool
        ctl.querySelector(".ctl_loopmeasure input").addEventListener("click", this.stop.bind(this));
        ctl.querySelector(".ctl_loop input").addEventListener("click", this.stop.bind(this));
        ctl.querySelector(".ctl_playbackrate select").addEventListener("click", this.stop.bind(this));
        ctl.querySelector(".ctl_intervalrate input").addEventListener("click", this.stop.bind(this));
        // status
        ctl.querySelector(".ctl_curmeasure input").addEventListener("click", this.stop.bind(this));
        ctl.querySelector(".ctl_curmeasure button.ctl_prev2").addEventListener("click", (ev=>{this.stop();this.moveCurMeasure(-4*this.getLoopMeasure());}).bind(this));
        ctl.querySelector(".ctl_curmeasure button.ctl_prev").addEventListener("click", (ev=>{this.stop();this.moveCurMeasure(-1*this.getLoopMeasure());}).bind(this));
        ctl.querySelector(".ctl_curmeasure button.ctl_next").addEventListener("click", (ev=>{this.stop();this.moveCurMeasure(1*this.getLoopMeasure());}).bind(this));
        ctl.querySelector(".ctl_curmeasure button.ctl_next2").addEventListener("click", (ev=>{this.stop();this.moveCurMeasure(4*this.getLoopMeasure());}).bind(this));

        // -------------------------------------------

        // source
        ctl.querySelector(".ctl_source input").addEventListener("change", (ev=>this.setSource(ev.target.value)).bind(this));

        // video
        ctl.querySelector(".ctl_bpm input").addEventListener("change", (ev=>this.setBPM(ev.target.value)).bind(this));
        ctl.querySelector(".ctl_offset input").addEventListener("change", (ev=>this.setOffset(ev.target.value)).bind(this));
        // tool
        ctl.querySelector(".ctl_loopmeasure input").addEventListener("change", (ev=>this.setLoopMeasure(ev.target.value)).bind(this));
        ctl.querySelector(".ctl_loop input").addEventListener("change", (ev=>this.setLoop(ev.target.value)).bind(this));
        ctl.querySelector(".ctl_playbackrate select").addEventListener("change", (ev=>this.setPlaybackRate(ev.target.value)).bind(this));
        ctl.querySelector(".ctl_intervalrate input").addEventListener("change", (ev=>this.setIntervalRate(ev.target.value)).bind(this));
        // status
        ctl.querySelector(".ctl_curmeasure input").addEventListener("change", (ev=>this.setCurMeasure(ev.target.value)).bind(this));

    }

    // events
    play_clicked(ev) {
        this.playing = !this.playing;
        if (this.playing) {
            this.play();
        }
        else {
            this.stop();
        }
    }

    //source 
    
    setSource(v) {
        const videoId2 = ((videoId)=> {
            if (videoId.startsWith("https://www.youtube.com/watch?v=")) {
                return videoId.split("=")[1];
            }
            else {
                return videoId;
            }
        })(v);
        this.videoId = videoId2;
        this.doc.querySelector(".source_control input").value = videoId2;
        if (typeof YT !== 'undefined')
            this.loadVideo();
    }

    // video
    setBPM(v) {
        const v2 = parseFloat(v);
        this.bpm = v2;
        this.doc.querySelector(".ctl_bpm input").value = v2;

    }
    setOffset(v) {
        const v2 = parseFloat(v);
        this.offset = v2;
        this.doc.querySelector(".ctl_offset input").value = v2;
    }
    getOffset() {
        return this.offset;
    }

    // tool
    setLoopMeasure(v) {
        const v2 = parseInt(v);
        this.loop_measure = v2;
        this.doc.querySelector(".ctl_loopmeasure input").value = v2;
    }

    getLoopMeasure() {
        return this.loop_measure;
    }

    setLoop(b) {
        this.loop = !!b;
    }

    getLoop() {
        return this.loop;
    }

    setPlaybackRate(v) {
        const v2 = parseFloat(v);
        this.rate = v2;
        this.player.setPlaybackRate(v2);
    }

    setIntervalRate(v) {
        const v2 = Math.max(parseInt(v), 10);
        this.interval_rate = v2;
        this.doc.querySelector(".ctl_intervalrate input").value = v2;
    }

    getIntervalRate() {
        return this.interval_rate;
    }

    // status
    setCurMeasure(v) {
        const v2 = Math.max(parseInt(v), 0);

        this.cur_measure = v2;
        this.doc.querySelector(".ctl_curmeasure input").value = v2;
    }

    moveCurMeasure(v) {
        const v2 = parseInt(v);
        const measure = this.getCurMeasure() + v2;
        this.setCurMeasure(measure);
    }
    
    getCurMeasure() {
        return this.cur_measure;
    }

    // innerparams
    getDuration() {
        return 60 / this.bpm * this.beat * this.loop_measure / this.rate;
    }
}
