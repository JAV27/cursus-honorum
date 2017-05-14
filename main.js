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

    $('div.playButton').on('click', function() {
        var conjSettings = [];
        var personSettings = [];
        var numberSettings = [];
        var tenseSettings = [];
        var voiceSettings = [];
    });
});
