const view = {
    correct: 0,
    row: `<div class="row"></div>`,

    addPair: (current, top, bottom) => {
        elements.append(`<div class="bar top">      <div class="inside"></div><p>${top.name}</p>    </div>`);
        elements.append(`<div class="bar current">  <div class="inside"></div><p>${current.name}</p></div>`);
        elements.append(`<div class="bar bottom">   <div class="inside"></div><p>${bottom.name}</p> </div>`);
    },
    updatePair: async (current, top, bottom, dir) => {
        scrolling = true;
        
        elements.find(dir > 0 ? ".bottom" : ".top").addClass(dir > 0 ? "offscreenBottom" : "offscreenTop");


        elements.find(".current").addClass(dir > 0 ? "bottom" : "top");
        elements.find(".current").removeClass("current");

        elements.find(dir > 0 ? ".top" : ".bottom").addClass("current");
        elements.find(dir > 0 ? ".top" : ".bottom").removeClass(dir > 0 ? "top" : "bottom");
        if (data.length >= 3) {
            elements.find(".current p").text(current.name);
        }

        if (dir > 0) {
            elements.find(".current").before(`<div class="bar offscreenTop"><div class="inside"></div><p>${top.name}</p></div>`);
        } else {
            elements.find(".current").after(`<div class="bar offscreenBottom"><div class="inside"></div><p>${bottom.name}</p></div>`);
        }

        view.fitText();
        elements.find(dir > 0 ? ".offscreenTop" : ".offscreenBottom").addClass(dir > 0 ? "top" : "bottom");
        elements.find(dir > 0 ? ".offscreenTop" : ".offscreenBottom").removeClass(dir > 0 ? "offscreenTop" : "offscreenBottom");

        await timeout (600);
        elements.find(dir > 0 ? ".bottom p" : ".top p").text(dir > 0 ? bottom.name : top.name);
        elements.find(dir > 0 ? ".offscreenBottom" : ".offscreenTop").remove();

        scrolling = false;
    },
    addBar: (position, text) => {
        return `<div class="bar ${position}" onclick="view.clicked()"><div class="inside"></div><p>${text}</p></div>`;
    },
    clicked: () => {
        
    },
    onPlay: async () => {
        $("#status span").last().text(data.length);
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
    updateStatus: () =>{
        $("#status span").first().text(++view.correct);
    },
    shake: async () => {
        $(".current").addClass("shake");
        await timeout(820);
        $(".current").removeClass("shake");
    },
    end: async () => {
        await timeout(200);
        let classes = [".elements", ".right", ".elementsOverlay", ".rightOverlay"];

        for (let i = 0; i < classes.length; i++) {
            $(classes[i]).addClass("closed");
        }

        $("#play").addClass("goUnder");
        $("#status").removeClass("show");

        await timeout(1000);
        $(".outcome").show();
        $(".outcome").addClass("showOutcome");

        let rowCount = Math.ceil(originalData.length / 3);
        let itemCount = 0;

        for (let i = 0; i < rowCount; i++) {
            $(".outcome").append(view.row);
            
            for (let j = 0; j < 3; j++) {
                view.createItem($(".row").eq(i), originalData[itemCount].text, originalData[itemCount].value);
                itemCount++;

                if (itemCount == originalData.length) {
                    return;
                }
            }

            await timeout(200);
        }
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