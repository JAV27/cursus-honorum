$(document).ready(function() {

    var settingsPage = $('div.settings');
    var startMenuPage = $('div.startMenu');

    //Triggers: When settings button is clicked in the header
    //Does: Hides the main page and opens up the settings page
    $("p.settings").on('click', function() {
        settingsPage.show();
        startMenuPage.hide();
    });

    //Triggers: When exit button in settings is clicked
    //Does: Hides the settings page and opens up the main page
    $(".exit").on('click', function() {
        settingsPage.hide();
        startMenuPage.show();
    });

    //Triggers: When option in the settings is clicked
    //Does: Adds a class which underlines the option
    $('p.option').on('click', function() {
        $(this).toggleClass('clk-underline-from-center');
    });

    //To store the user preference settings
    var settings = [
        [], [], [], [], []
    ];

    //Assigns variable to each subarray within settings aray that correspond to the type of setting
    var conjSettings = settings[0], personSettings = settings[1], numberSettings = settings[2], tenseSettings = settings[3], voiceSettings = settings[4];

    //Triggers: When the play button is clicked on the main screen
    $('div.playButton').on('click', function() {

        //Loop through each settings row
        for(var i=0; i<5; i++) {

            //Clears settings array so if playButton is clicked twice it,
            //function doesn't push the same variables twice
            settings[i].splice(0, settings[i].length);

            //For each setting row
            //Find the options which have the class that marks it as a clicked option
            //And push it to the corresponding subarray in the settings array
            $('div.options').eq(i).children('.clk-underline-from-center').each(function() {
                settings[i].push($(this).text());
            });
        }

        //Loops through each settings row
        for(var i=0; i<5; i++) {

            //If: One of the subarrays is empty (No options were clicked)
            //Then: Alert that the user has an empty settings catergory
            if(settings[i].length === 0) {
                alert('You have an empty category in your settings');

                //Breaks out of function so below methods don't run if an array is empty
                return null;
            }
        }

        //Hides the main page, settings button in the header
        //Shows the game screen
        startMenuPage.hide();
        $('p.settings').hide();
        $("div.gameScreen").show();

    });
});
