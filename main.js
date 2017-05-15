$(document).ready(function() {

    var settingsPage = $('div.settings');
    var startMenuPage = $('div.startMenu');

    $("p.settings").on('click', function() {
        settingsPage.show();
        startMenuPage.hide();
    });

    $(".exit").on('click', function() {
        settingsPage.hide();
        startMenuPage.show();
    });

    $('p.option').on('click', function() {
        $(this).toggleClass('clk-underline-from-center');
    });

    var settings = [
        [], [], [], [], []
    ];

    var conjSettings = settings[0], personSettings = settings[1], numberSettings = settings[2], tenseSettings = settings[3], voiceSettings = settings[4];

    $('div.playButton').on('click', function() {

        for(var i=0; i<5; i++) {
            settings[i].splice(0, settings[i].length);

            $('div.options').eq(i).children('.clk-underline-from-center').each(function() {
                settings[i].push($(this).text());
            });
        }

        for(var i=0; i<5; i++) {
            if(settings[i].length === 0) {
                alert('You have an empty category in your settings');
                return null;
            }
        }

        startMenuPage.hide();
        $('p.settings').hide();
        $("div.gameScreen").show();

    });
});
