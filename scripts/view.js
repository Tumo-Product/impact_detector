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
    addPair: async (current, top, bottom) => {
        elements.append(view.getBar("top",      top.name,       currentWord - 1));
        elements.append(view.getBar("current",  current.name,   currentWord));
        elements.append(view.getBar("bottom",   bottom.name,    currentWord + 1));

        $(".current").attr("onclick", "toggleButton()");
        await timeout(5);
        view.fitText(".bar", {x: 40, y: 30});
    },
    updatePair: async (current, top, bottom, dir) => {
        scrolling = true;
        
        elements.find(dir < 0 ? ".bottom" : ".top").addClass(dir < 0 ? "offscreenBottom" : "offscreenTop");

        elements.find(".current").addClass(dir < 0 ? "bottom" : "top");
        elements.find(".current").removeClass("current");

        elements.find(dir < 0 ? ".top" : ".bottom").addClass("current");
        elements.find(dir < 0 ? ".top" : ".bottom").removeClass(dir < 0 ? "top" : "bottom");
        if (data.elements.length >= 3) {
            elements.find(".current p").text(current.name);
        }

        if (dir < 0) {
            elements.find(".current").before(view.getBar("offscreenTop",    top.name, currentWord - 1));
            $(".offscreenTop p").css("font-size", "+=0.01"); // Don't ask me why.

            if (getWord(currentWord - 1).enabled) {
                $(".offscreenTop p").css("font-size", getWord(currentWord - 1).fontSize);
                $(".offscreenTop p").css("max-width", "none");
            }
            else {
                view.fitText(".offscreenTop", {x: 40, y: 30});
            }
        } else {
            elements.find(".current").after(view.getBar("offscreenBottom",  bottom.name, currentWord + 1));
            $(".offscreenBottom p").css("font-size", "+=0.01"); // Don't ask me why.

            if (getWord(currentWord + 1).enabled) {
                $(".offscreenBottom p").css("font-size", getWord(currentWord + 1).fontSize);
                $(".offscreenBottom p").css("max-width", "none");
            }
            else {
                view.fitText(".offscreenBottom", {x: 40, y: 30});
            }
        }

        elements.find(dir < 0 ? ".offscreenTop" : ".offscreenBottom").addClass(dir < 0 ? "top" : "bottom");
        elements.find(dir < 0 ? ".offscreenTop" : ".offscreenBottom").removeClass(dir < 0 ? "offscreenTop" : "offscreenBottom");

        await timeout (600);
        elements.find(dir < 0 ? ".offscreenBottom" : ".offscreenTop").remove();

        $(".bar").attr("onclick", "");
        $(".current").attr("onclick", "toggleButton()");

        scrolling = false;
    },
    toggleButton: async (enabled) => {
        if (enabled) {
            $(".current").removeClass("insetShadow");
            $(".current").addClass("outsideShadow");
            $(".current p").animate({ fontSize: "+=2" }, 200);
            $(".current p").css("max-width", 400);
            getWord(currentWord).fontSize = parseInt($(".current p").css("font-size")) + 3;
        } else {
            $(".current").removeClass("outsideShadow");
            $(".current").addClass("insetShadow");
            $(".current p").animate({ fontSize: "-=2" }, 200);
            await timeout(200);
            $(".current p").css("max-width", 350);
        }
    },
    onPlay: async () => {
        $("#play").addClass("disable");
        $("#status span").last().text(data.elements.length);
        $("#status").addClass("show");
        $(".question").css("opacity", 0);

        $("#play svg").css("opacity", 0);
        await timeout (200);
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

        view.fitText("#finalValues .roundRect", {x: 20, y: 0}, {fontSize: 50, marginTop: 45}, true);

        $(".outcome").addClass("showOutcome");
        $(".outcomeOverlay").addClass("showOutcome");
    },
    fitText: (parent, offset, defaultSettings, applyMargin) => {
        if (offset === undefined) offset = {x: 0, y: 0};

		$(parent).each(function () {
			let size, marginSize;
            let paragraph = $(this).find("p").first();

            if (defaultSettings !== undefined) {
                paragraph.css("font-size", defaultSettings.fontSize);
                paragraph.css("margin-top", defaultSettings.marginTop);
            }

			while (paragraph.height() > $(this).height() - offset.y || paragraph.width() > $(this).width() - offset.x) {
                size        = parseInt(paragraph.css("font-size"),  10);

				paragraph.css("font-size", size - 1.5);

                if (applyMargin === true) {
                    marginSize  = parseFloat(paragraph.css("margin-top"), 10);
                    paragraph.css("margin-top", marginSize + 1.3);
                }
			}
		});
	},
}