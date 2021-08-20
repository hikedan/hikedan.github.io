



class SEs {

    static init() {
        try {
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            SEs.context = new AudioContext();
            SEs.loadSEAll()
        }
        catch(e) {
            alert('このブラウザでは音が再生できないぺこ');
        }
    }

    static loadSEAll() {
        SEs.files.forEach(se=>{
            const request = new XMLHttpRequest();
            request.open('GET', `audio/${se}.mp3`, true);
            request.responseType = 'arraybuffer';
          
            request.onload = function() {
                SEs.context.decodeAudioData(request.response, function(buffer) {
                SEs.audio[se] = buffer;
              });
            }
            request.send();
        });
    }

    static play(se, endedevent=null) {
        // console.log("SE: ", se);
        if (SEs.files.indexOf(se) < 0) {
            console.log("ないSEぺこ: ", se);
            return;
        }

        const source = SEs.context.createBufferSource(); 
        source.buffer = this.audio[se];
        if (endedevent) {                      
            source.onended = endedevent;
        }  
        source.connect(SEs.context.destination);       
        source.start(0);
    }
}

SEs.audio = []

SEs.files = [
"gameover",
"lucky",
"start",
"atari",
"hazure/hazurepeko",
"hazure/hazurepeko_1",
"hazure/hazurepeko_10",
"hazure/hazurepeko_11",
"hazure/hazurepeko_12",
"hazure/hazurepeko_13",
"hazure/hazurepeko_14",
"hazure/hazurepeko_15",
"hazure/hazurepeko_16",
"hazure/hazurepeko_17",
"hazure/hazurepeko_18",
"hazure/hazurepeko_19",
"hazure/hazurepeko_2",
"hazure/hazurepeko_20",
"hazure/hazurepeko_21",
"hazure/hazurepeko_22",
"hazure/hazurepeko_23",
"hazure/hazurepeko_3",
"hazure/hazurepeko_4",
"hazure/hazurepeko_5",
"hazure/hazurepeko_6",
"hazure/hazurepeko_7",
"hazure/hazurepeko_8",
"hazure/hazurepeko_9",
"lucky_start/1",
"lucky_start/2",
"lucky_start/3",
"lucky_start/4",
"system/back",
"system/ok",
"system/select",
"system/taiko",
"taiko/coco1_1",
"taiko/coco1_2",
"taiko/coco1_3",
"taiko/coco1_4",
"taiko/coco1_5",
"taiko/coco1_6",
"taiko/coco2_1",
"taiko/coco2_2",
"taiko/coco2_3",
"taiko/coco2_4",
"taiko/coco2_5",
"taiko/coco2_6",
"taiko/coco_call",
"taiko/coco_callp",
"taiko/coco_intro",
"taiko/flare1_1",
"taiko/flare1_2",
"taiko/flare1_3",
"taiko/flare1_4",
"taiko/flare1_5",
"taiko/flare1_6",
"taiko/flare_call",
"taiko/flare_intro",
"taiko/flare_miss",
"taiko/flare_pass",
"taiko/kanata1_1",
"taiko/kanata1_2",
"taiko/kanata1_3",
"taiko/kanata1_4",
"taiko/kanata1_5",
"taiko/kanata1_6",
"taiko/kanata_call1",
"taiko/kanata_call2",
"taiko/kanata_callp",
"taiko/kanata_intro",
"taiko/kanata_miss",
"taiko/kanmei_call",
"taiko/luna1_1",
"taiko/luna1_2",
"taiko/luna1_3",
"taiko/luna_call",
"taiko/luna_intro",
"taiko/marine1_1",
"taiko/marine1_2",
"taiko/marine1_3",
"taiko/marine1_4",
"taiko/marine1_5",
"taiko/marine1_6",
"taiko/marine2_1",
"taiko/marine2_2",
"taiko/marine2_3",
"taiko/marine2_4",
"taiko/marine2_5",
"taiko/marine2_6",
"taiko/marine_call1",
"taiko/marine_call2",
"taiko/marine_intro",
"taiko/mymelo_call",
"taiko/noel1_1",
"taiko/noel1_2",
"taiko/noel1_3",
"taiko/noel1_4",
"taiko/noel1_5",
"taiko/noel1_6",
"taiko/noel2_1",
"taiko/noel2_2",
"taiko/noel2_3",
"taiko/noel2_4",
"taiko/noel2_5",
"taiko/noel2_6",
"taiko/noel_call",
"taiko/noel_intro",
"taiko/pekora1_1",
"taiko/pekora1_2",
"taiko/pekora1_3",
"taiko/pekora1_4",
"taiko/pekora1_5",
"taiko/pekora1_6",
"taiko/pekora_call",
"taiko/pekora_intro",
"taiko/rushia1_1",
"taiko/rushia1_2",
"taiko/rushia1_3",
"taiko/rushia1_4",
"taiko/rushia1_5",
"taiko/rushia1_6",
"taiko/rushia2_1",
"taiko/rushia2_2",
"taiko/rushia2_3",
"taiko/rushia2_4",
"taiko/rushia2_5",
"taiko/rushia2_6",
"taiko/rushia_call",
"taiko/rushia_intro",
"taiko/rushia_miss",
"taiko/towa1_1",
"taiko/towa1_2",
"taiko/towa1_3",
"taiko/towa1_4",
"taiko/towa1_5",
"taiko/towa1_6",
"taiko/towa1_7",
"taiko/towa1_8",
"taiko/towa_call",
"taiko/towa_callp",
"taiko/towa_intro",
"taiko/watame1_1",
"taiko/watame1_2",
"taiko/watame1_3",
"taiko/watame1_4",
"taiko/watame1_5",
"taiko/watame1_6",
"taiko/watame_call",
"taiko/watame_callp",
"taiko/watame_intro",
"taiko/yagoo_call",

]