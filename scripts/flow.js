const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let data;
let elements;

let shuffledWords   = [];
let originalData    = [];
let currentWord     = 0;
let scrolling       = false;
let done            = false;
let href            = window.location.href;

jQuery.event.special.wheel = {
    setup: function( _, ns, handle ) {
        this.addEventListener("wheel", handle, { passive: !ns.includes("noPreventDefault") });
    }
};

const onPageLoad = async () => {
    data = await parser.dataFetch();
    // data = data.data.data.elements;
    $(".question p").text(data.intro);

    href = href.substring(0, href.indexOf("?"));
    elements = $(".elements");
    originalData = JSON.parse(JSON.stringify(data));

    for (let i = 0; i < data.elements; i++) data.elements[i].enabled = false;

    addWords(currentWord);

    $("#kg .value").text(getWord(currentWord).kg);
    $("#msqr .value").text(getWord(currentWord).msqr);
    $("#mj .value").text(getWord(currentWord).mj);

    $(".elements" ).on('wheel', async function (e) { wheel(e) });
    
    loader.toggle();
}

const wheel = (e) => {
    if (!scrolling && !done) {
        let dir = -Math.sign(e.originalEvent.wheelDelta);
        currentWord += dir;
        
        scrollTo(currentWord, dir);
    }
}

const scrollTo = async (index, dir) => {
    view.updatePair(getWord(index), getWord(index - 1), getWord(index + 1), dir);
    $("#values  #kg     .value").text(getWord(index).kg);
    $("#values  #msqr   .value").text(getWord(index).msqr);
    $("#values  #mj     .value").text(getWord(index).mj);
}

const addWords = async (index) => {
    view.addPair(getWord(index), getWord(index - 1), getWord(index + 1));
}

const onPlay = async () => {
    await view.onPlay();
    $("#play").attr("onclick", "check()");
}

const toggleButton = async () => {
    

    getWord(currentWord).enabled = !getWord(currentWord).enabled;
    view.toggleButton(getWord(currentWord).enabled);

    if (getWord(currentWord).enabled)
        view.updateStatus(true)
    else
        view.updateStatus(false);
    
    if (view.correct == data.elements.length)
        $("#play").removeClass("goUnder");
    else
        $("#play").addClass("goUnder");
}

const check = async () => {
    view.flashCircle(); // flash play button circle
    
    console.log(data);
    view.end(data.outcome);
}

const getWord = (newIndex) => {
    let length  = data.elements.length;
    newIndex    %= length;
    
    if (newIndex < 0) {
        newIndex = length + newIndex;
    }
    else if (newIndex == length) {
        newIndex = 0;
    }

    return data.elements[newIndex];
}

$(onPageLoad);