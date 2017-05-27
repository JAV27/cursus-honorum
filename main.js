$(document).ready(function() {

    var settingsPage = $('div.settings');
    var startMenuPage = $('div.startMenu');

    //Hides the main page and opens up the settings page
    $("p.settings").on('click', function() {
        settingsPage.show();
        startMenuPage.hide();
    });

    //Hides the settings page and opens up the main page
    $(".exit").on('click', function() {
        settingsPage.hide();
        startMenuPage.show();
    });

    //Triggers: When option in the settings is clicked
    //Adds a class which underlines the option
    $('p.option').on('click', function() {
        $(this).toggleClass('clk-underline-from-center');
    });

    //To store the user preference settings
    var settings = [
        [], [], [], [], []
    ];

    //Assigns variable to each subarray within settings aray that correspond to the type of setting
    var conjSettings = settings[0], voiceSettings = settings[1], tenseSettings = settings[2], personSettings = settings[3], numberSettings = settings[4];

    var conjugation;

    var userScreen;

    //Interface object
    function Interface() {

        this.points = 0;
        this.count = 1;
        this.wrong = 0;

        $('.turnNumber').html(this.count + " out of 10");
        this.updatePoints = function() {
            this.points+= 100 * (4-this.wrong);
            $('.points').html(this.points + " points");
        }

        this.updateTurn = function() {
            this.count++;
            $('.turnNumber').html(this.count + " out of 10");
        }
        this.fill = fillInterface;

        this.resetWrongAnwers = function() {
            this.wrong = 0;
            $('div.wrongAnswer').css('opacity', '.1');
        }

        this.showAnswer = function() {
            alert("The answer was " + $('input.submit').attr('id'));
        }

    }

    //Fills out verb into html and calls setForm
    function fillInterface() {

        $.getJSON("https://JAV27.github.io/cursus-honorum/assets/js/words.json", function(data) {

            var newWordList = [];

            for(var i=0;i<data.verbs.length;i++) {
                var num = data.verbs[i].conj;
                if(conjSettings.includes(num.toString())) {
                    newWordList.push(data.verbs[i]);
                }
            }

            var randomIndex = Math.floor(Math.random() * newWordList.length);
            var randomWord = newWordList[randomIndex];

            $('.pp1').html(randomWord.pp1 + ",");
            $('.inf').html(randomWord.inf + ",");
            $('.pp3').html(randomWord.pp3 + ",");
            $('.pp4').html(randomWord.pp4 + ",");

            setForm();
            getChart(randomWord, voice, tense);
            var answer = conjugate(randomWord, person, number, voice, tense);
            $('.submit').attr('id', answer);
        });
    }

    var voice, person, number, tense;

    //gets random settings and puts into html
    function setForm() {

        var voiceIndex = Math.floor(Math.random() * voiceSettings.length);
        voice = voiceSettings[voiceIndex];

        var tenseIndex = Math.floor(Math.random() * tenseSettings.length);
        tense = tenseSettings[tenseIndex];

        var personIndex = Math.floor(Math.random() * personSettings.length);
        person = personSettings[personIndex];

        var numberIndex = Math.floor(Math.random() * numberSettings.length);
        number = numberSettings[numberIndex];

        $('.voice').html(voice);
        $('.tense').html(tense);
        $('.person').html(person);
        $('.number').html(number);

        //needed to run getChart() properly
        if(number === "Singular") {
            number = 0;
        } else if(number === "Plural") {
            number = 1;
        }

        person = person.substring(0,1);

    }

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
        userScreen = new Interface();
        userScreen.fill();
        $('.points').html(userScreen.points + " points");
    });

    function submit() {
        var userInput = $('input').val().trim().toLowerCase();
        if(userInput === $('input.submit').attr('id').toLowerCase()) {
            alert('Correct!');
            $('input[type="text"]').val("");
            userScreen.updatePoints();
            userScreen.updateTurn();
            userScreen.resetWrongAnwers();
            userScreen.fill();
        } else {
            $('input[type="text"]').val("");
            $('div.wrongAnswer').eq(userScreen.wrong++).css('opacity', '1');
            if(userScreen.wrong == 4) {
                userScreen.showAnswer();
                userScreen.updateTurn();
                userScreen.fill();
                userScreen.resetWrongAnwers();
            }
        }
    }

    //Compares user input to answer
    $('input.submit').on('click', submit);
    $('input[type="text"]').keypress(function(e) {
        if(e.which == 13) {
            submit();
        }
    });

});
