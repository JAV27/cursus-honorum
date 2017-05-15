//Variables
var firstPerson = 1, secondPerson = 2, thirdPerson = 3, singular = 0, plural = 1, active = 0, passive = 1, present = 0, imperfect = 1, future = 2, perfect = 3, pluPerfect =4, futurePerfect = 5;
var fullChart;

//JSON Test
$.getJSON("http://JAV27.github.io/cursus-honorum/assets/js/words.json", function(data) {
    console.log(conjugate(data.verbs[1], firstPerson, plural, passive, futurePerfect));
});

//Conjugating
function chart(rootValue, firstSing, secondSing, thirdSing, firstPlu, secondPlu, thirdPlu) {
    this.number = [
        [rootValue + firstSing, rootValue + secondSing, rootValue + thirdSing],
        [rootValue + firstPlu, rootValue + secondPlu, rootValue + thirdPlu]
    ]
}

function conjugate(word, person, number, voice, tense) {
    getChart(word, voice, tense);
    return fullChart.number[number][person-1];
}

function getChart(word, voice, tense) {
    var inf = word.inf;
    var pp3 = word.pp3;
    var pp4 = word.pp4;
    var conj = word.conj;

    switch(voice) {
        case active:
            switch(tense) {
                case present:
                    activePresentConj(inf, conj);
                    break;
                case imperfect:
                    activeImperfectConj(inf, conj);
                    break;
                case future:
                    activeFutureConj(inf, conj);
                    break;
                case perfect:
                    activePerfectConj(pp3);
                    break;
                case pluPerfect:
                    activePluPerfectConj(pp3);
                    break;
                case futurePerfect:
                    activeFuturePerfectConj(pp3);
                    break;
                default:
                    return null;
            }
            break;
        case passive:
            switch(tense) {
                case present:
                    passivePresentConj(inf, conj);
                    break;
                case imperfect:
                    passiveImperfectConj(inf, conj);
                    break;
                case future:
                    passiveFutureConj(inf, conj);
                    break;
                case perfect:
                    passivePerfectConj(pp4);
                    break;
                case pluPerfect:
                    passivePluPerfectConj(pp4);
                    break;
                case futurePerfect:
                    passiveFuturePerfectConj(pp4);
                    break;
                default:
                    return null;
            }
            break;
        default:
            return null;
    }
}

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

    if(conj === ("1" || "2")) {
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

    if(conj === ("1" || "2" || "3")) {
        fullChart = new chart(infSmallRoot, "bar", "baris", "batur", "bamur", "bamini", "bantur");
    } else if(conj === ("3io" || "4")) {
        fullChart = new chart(infRoot, "iebar", "iebaris", "iebatur", "iebamur", "iebamini", "iebantur");
    }
}

function passiveFutureConj(inf, conj) {
    var infRoot = inf.substring(0, inf.length-3);
    var infSmallRoot = inf.substring(0, inf.length-2);

    if(conj === ("1" || "2")) {
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

function passivePerfectConj(pp4) {
    fullChart = new chart(pp4, " sum", " es", " est", " sumus", " estis", " sunt");
}

function passivePluPerfectConj(pp4) {
    fullChart = new chart(pp4, " eram", " eras", " erat", " eramus", " eratis", " erant");
}

function passiveFuturePerfectConj(pp4) {
    fullChart = new chart(pp4, " ero", " eris", " erit", " erimus", " eritus", " erunt");
}
//
