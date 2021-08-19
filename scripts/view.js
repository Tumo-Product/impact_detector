const view = {
    correct: 0,
    row: `<div class="row"></div>`,

    getBar: (classes, text, i) => {
        if (getWord(i).enabled) {
            classes += " outsideShadow";
        } else {
            classes += " insetShadow";
        }

        let bar = `<div class="bar ${classes}"><div class="inside"></div><p>${text}</p></div>`;
        return bar;
    },
    addPair: (current, top, bottom) => {
        elements.append(view.getBar("top",      top.name,       currentWord - 1));
        elements.append(view.getBar("current",  current.name,   currentWord));
        elements.append(view.getBar("bottom",   bottom.name,    currentWord + 1));

        $(".current").attr("onclick", "toggleButton()");
    },
    updatePair: async (current, top, bottom, dir) => {
        scrolling = true;
        
        elements.find(dir < 0 ? ".bottom" : ".top").addClass(dir < 0 ? "offscreenBottom" : "offscreenTop");

        elements.find(".current").addClass(dir < 0 ? "bottom" : "top");
        elements.find(".current").removeClass("current");

        elements.find(dir < 0 ? ".top" : ".bottom").addClass("current");
        elements.find(dir < 0 ? ".top" : ".bottom").removeClass(dir < 0 ? "top" : "bottom");
        if (data.length >= 3) {
            elements.find(".current p").text(current.name);
        }

        if (dir < 0) {
            elements.find(".current").before(view.getBar("offscreenTop",    top.name, currentWord - 1));
        } else {
            elements.find(".current").after(view.getBar("offscreenBottom",  bottom.name, currentWord + 1));
        }

        view.fitText();
        elements.find(dir < 0 ? ".offscreenTop" : ".offscreenBottom").addClass(dir < 0 ? "top" : "bottom");
        elements.find(dir < 0 ? ".offscreenTop" : ".offscreenBottom").removeClass(dir < 0 ? "offscreenTop" : "offscreenBottom");

        await timeout (600);
        elements.find(dir < 0 ? ".bottom p" : ".top p").text(dir < 0 ? bottom.name : top.name);
        elements.find(dir < 0 ? ".offscreenBottom" : ".offscreenTop").remove();

        $(".bar").attr("onclick", "");
        $(".current").attr("onclick", "toggleButton()");

        scrolling = false;
    },
    toggleButton: (enabled) => {
        if (enabled) {
            $(".current").removeClass("insetShadow");
            $(".current").addClass("outsideShadow");
        } else {
            $(".current").removeClass("outsideShadow");
            $(".current").addClass("insetShadow");
        }
    },
    onPlay: async () => {
        $("#play").addClass("goUnder");
        $("#status span").last().text(data.elements.length);
        $("#status").addClass("show");
        $(".question").css("opacity", 0);

        $("#play svg").css("opacity", 0);
        await timeout (500);
        $("#play svg").remove();
        $(".icon").load(href + "graphics/checkmark.svg");
        $(".icon").addClass("checkmark");

        await timeout (1000);
        $(".question").hide("opacity", 0);

        let classes = [".elements", ".elementsOverlay"];
        for (let i = 0; i < classes.length; i++) {
            $(classes[i]).removeClass("closed");
        }

        $("#values").removeClass("offscreen");
    },
    toggleFlash: async(color) => {
		$(`#${color}`).css("opacity", 1);
		await timeout(500);
		$(`#${color}`).css("opacity", 0);
	},
    flashCircle: async() => {
        $(".circle").css("opacity", 0);
        await timeout(300);
        $(".circle").css("opacity", 1);
    },
    updateStatus: async (increment) => {
        if (increment)
            $("#status span").first().text(++view.correct);
        else
            $("#status span").first().text(--view.correct);
    },
    shake: async () => {
        $(".current").addClass("shake");
        await timeout(820);
        $(".current").removeClass("shake");
    },
    end: async (outcomeText, kg, msqr, mj) => {
        $(".elements").addClass("closed");
        $(".elementsOverlay").addClass("closed");

        $("#status").removeClass("show");
        $("#values").addClass("offscreen");
        $("#play").addClass("goUnder");

        await timeout(1000);

        $("#outcomeText").text(outcomeText);
        $("#finalValues  #kg     .value").text(kg);
        $("#finalValues  #msqr   .value").text(msqr);
        $("#finalValues  #mj     .value").text(mj);

        $(".outcome").addClass("showOutcome");
        $(".outcomeOverlay").addClass("showOutcome");
    },
    createItem: async (elements, text, value) => {
        let item = `<div class="item">
                        <p>${text}</p>
                        <div class="bar"></div>
                        <p>${value}</p>
                    </div>`;

        elements.append(item);
    },
    fitText: () => {
		$(`.current`).each(function () {
			let size;

			while ($(this).find("p").width() > $(this).width() - 10) {
				size = parseInt($(this).find("p").css("font-size"), 10);
				$(this).find("p").css("font-size", size - 1);
			}
		});
	},
}