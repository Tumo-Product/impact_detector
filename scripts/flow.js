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

    addWords(currentWord);

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
    console.log("-----------------------------------");
    view.updatePair(getWord(index), getWord(index - 1), getWord(index + 1), dir);
}

const addWords = async (index) => {
    view.addPair(getWord(index), getWord(index - 1), getWord(index + 1));
}

const onPlay = async () => {
    await view.onPlay();
    $("#play").attr("onclick", "check()");
}

const check = async () => {
    view.flashCircle(); // flash play button circle

    // Cooldown
    $("#play").attr("onclick", "");
    await timeout (800);
    $("#play").attr("onclick", "check()");
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

    console.log(data.elements[newIndex]);

    return data.elements[newIndex];
}

$(onPageLoad);