//Variables
var fullChart;

//Takes in: The endings of the chart and a rootValue for the word
function chart(rootValue, firstSing, secondSing, thirdSing, firstPlu, secondPlu, thirdPlu) {

    //Adds the root of the word to each corresponding ending
    //Broken up into two arrays by number (singular, plural)
    this.number = [
        [rootValue + firstSing, rootValue + secondSing, rootValue + thirdSing],
        [rootValue + firstPlu, rootValue + secondPlu, rootValue + thirdPlu]
    ]
}

//Takes in: A word object and how to conjugate it
//Returns: The word string in conjugated form
function conjugate(word, person, number, voice, tense) {

    //Takes the one ending needed from the chart
    return fullChart.number[number][person-1];
}

//Takes in: A word object and the options needed to get the full chart
function getChart(word, voice, tense, bool) {

    //Root word variables
    var inf = word.inf;
    var pp3 = word.pp3;
    var pp4 = word.pp4;
    var conj = word.conj;

    //If voice is active go to the active charts for the tense
    //If voice is passive go to the passive charts for the tense
    switch(voice) {
        case "Active":
            switch(tense) {
                case "Present":
                    activePresentConj(inf, conj);
                    break;
                case "Imperfect":
                    activeImperfectConj(inf, conj);
                    break;
                case "Future":
                    activeFutureConj(inf, conj);
                    break;
                case "Perfect":
                    activePerfectConj(pp3);
                    break;
                case "Plu Perfect":
                    activePluPerfectConj(pp3);
                    break;
                case "Future Perfect":
                    activeFuturePerfectConj(pp3);
                    break;
                default:
                    return null;
            }
            break;
        case "Passive":
            switch(tense) {
                case "Present":
                    passivePresentConj(inf, conj);
                    break;
                case "Imperfect":
                    passiveImperfectConj(inf, conj);
                    break;
                case "Future":
                    passiveFutureConj(inf, conj);
                    break;
                case "Perfect":
                    passivePerfectConj(pp4, bool);
                    break;
                case "Plu Perfect":
                    passivePluPerfectConj(pp4, bool);
                    break;
                case "Future Perfect":
                    passiveFuturePerfectConj(pp4, bool);
                    break;
                default:
                    return null;
            }
            break;
        default:
            return null;
    }
}

//All the chart conjugation functions
//Takes in: the root needed and a conjugation if need be
//Does: Sets the corresponding chart to the fullChart variable

function activePresentConj(inf, conj) {
    var infRoot = inf.substring(0, inf.length-3);
    switch(conj) {
        case "1":
            fullChart = new chart(infRoot, "o", "as", "at", "amus", "atis", "ant");
            break;
        case "2":
            fullChart = new chart(infRoot, "eo", "es", "et", "emus", "etis", "ent");
            break;
        case "3":
            fullChart = new chart(infRoot, "o", "is", "it", "imus", "itis", "unt");
            break;
        case "3io":
            fullChart = new chart(infRoot, "io", "is", "it", "imus", "itis", "iunt");
            break;
        case "4":
            fullChart = new chart(infRoot, "io", "is", "it", "imus", "itis", "iunt");
            break;
        default:
            return null;
    }
}

function activeImperfectConj(inf, conj) {
    var infRoot = inf.substring(0, inf.length-3);

    switch(conj) {
        case "1":
            fullChart = new chart(infRoot, "abam", "abas", "abat", "abamus", "abatis", "abant");
            break;
        case "2":
            fullChart = new chart(infRoot, "ebam", "ebas", "ebat", "ebamus", "ebatis", "ebant");
            break;
        case "3":
            fullChart = new chart(infRoot, "ebam", "ebas", "ebat", "ebamus", "ebatis", "ebant");
            break;
        case "3io":
            fullChart = new chart(infRoot, "iebam", "iebas", "iebat", "iebamus", "iebatis", "iebant");
            break;
        case "4":
            fullChart = new chart(infRoot, "iebam", "iebas", "iebat", "iebamus", "iebatis", "iebant");
            break;
        default:
            return null;
    }
}

function activeFutureConj(inf, conj) {
    var infRoot = inf.substring(0, inf.length-3);
    var infSmallRoot = inf.substring(0, inf.length-2);

    if(conj === "1" || conj === "2") {
        fullChart = new chart(infSmallRoot, "bo", "bis", "bit", "bimis", "bitis", "bunt");
    }

    switch(conj) {
        case "3":
            fullChart = new chart(infRoot, "am", "es", "et", "emus", "etus", "ent");
            break;
        case "3io":
            fullChart = new chart(infRoot, "iam", "ies", "iet", "iemus", "ietus", "ient");
            break;
        case "4":
            fullChart = new chart(infRoot, "iam", "ies", "iet", "iemus", "ietus", "ient");
            break;
        default:
            return null;
    }
}

function activePerfectConj(pp3) {
    var pp3Root = pp3.substring(0, pp3.length-1);

    fullChart = new chart(pp3Root, "i", "isti", "it", "imus", "istis", "erunt");
}

function activePluPerfectConj(pp3) {
    var pp3Root = pp3.substring(0, pp3.length-1);

    fullChart = new chart(pp3Root, "eram", "eras", "erat", "eramus", "eratis", "erant");
}

function activeFuturePerfectConj(pp3) {
    var pp3Root = pp3.substring(0, pp3.length-1);

    fullChart = new chart(pp3Root, "ero", "eris", "erit", "erimus", "eritis", "erint");
}

function passivePresentConj(inf, conj) {
    var infRoot = inf.substring(0, inf.length-3);

    switch(conj) {
        case "1":
            fullChart = new chart(infRoot, "or", "aris", "atur", "amur", "amini", "antur");
            break;
        case "2":
            fullChart = new chart(infRoot, "eor", "eris", "etur", "emur", "emini", "entur");
            break;
        case "3":
            fullChart = new chart(infRoot, "or", "eris", "itur", "imur", "imini", "untur");
            break;
        case "3io":
            fullChart = new chart(infRoot, "ior", "eris", "itur", "imur", "imini", "untur");
            break;
        case "4":
            fullChart = new chart(infRoot, "ior", "iris", "itur", "imur", "imini", "untur");
        default:
            return null;
    }
}

function passiveImperfectConj(inf, conj) {
    var infRoot = inf.substring(0, inf.length-3);
    var infSmallRoot = inf.substring(0, inf.length-2);

    if(conj === "1" || conj === "2" || conj ==="3") {
        fullChart = new chart(infSmallRoot, "bar", "baris", "batur", "bamur", "bamini", "bantur");
    } else if(conj === "3io" || conj === "4") {
        fullChart = new chart(infRoot, "iebar", "iebaris", "iebatur", "iebamur", "iebamini", "iebantur");
    }
}

function passiveFutureConj(inf, conj) {
    var infRoot = inf.substring(0, inf.length-3);
    var infSmallRoot = inf.substring(0, inf.length-2);

    if(conj === "1" || conj === "2") {
        fullChart = new chart(infSmallRoot, "bor", "beris", "bitur", "bimur", "bimini", "buntur");
    }

    switch(conj) {
        case "3":
            fullChart = new chart(infRoot, "ar", "eris", "etur", "emur", "emini", "entur");
            break;
        case "3io":
            fullChart = new chart(infRoot, "iar", "ieris", "ietur", "iemur", "iemini", "ientur");
            break;
        case "4":
            fullChart = new chart(infRoot, "iar", "ieris", "ietur", "iemur", "iemini", "ientur");
            break;
        default:
            return null;
    }
}

function passivePerfectConj(pp4, bool) {
    if(bool) {
        pluralPP4 = pp4.substring(0,pp4.length-2) + 'i';
        fullChart = new chart(pluralPP4, "", "", "", " sumus", " estis", " sunt");
    } else {
        fullChart = new chart(pp4, " sum", " es", " est", "", "", "");
    }
}

function passivePluPerfectConj(pp4, bool) {
    if(bool) {
        pluralPP4 = pp4.substring(0,pp4.length-2) + 'i';
        fullChart = new chart(pluralPP4, "", "", "", " eramus", " eratis", " erant");
    } else {
        fullChart = new chart(pp4, " eram", " eras", " erat", "", "", "");
    }
}

function passiveFuturePerfectConj(pp4, bool) {
    if(bool) {
        pluralPP4 = pp4.substring(0,pp4.length-2) + 'i';
        fullChart = new chart(pluralPP4, "", "", "", " erimus", " eritis", " erunt");
    } else {
        fullChart = new chart(pp4, " ero", " eris", " erit", "", "", "");
    }
}
