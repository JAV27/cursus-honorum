//JSON Test
$.getJSON("http://JAV27.github.io/cursus-honorum/words.json", function(data) {
    for(var i=0; i<data.verbs.length; i++) {
        $('body').append(data.verbs[i].pp1 + " ");
    }
});
//

//Conjugating
var ACTIVE = 0;
var PASSIVE = 1;
var fullChart;

function chart(rootValue, firstSing, secondSing, thirdSing, firstPlu, secondPlu, thirdPlu) {
    this.singular = [
        rootValue + firstSing,
        rootValue + secondSing,
        rootValue + thirdSing,
    ];

    this.plural = [
        rootValue + firstPlu,
        rootValue + secondPlu,
        rootValue + thirdPlu,
    ];
}

function conjugate(word, person, number, voice, tense) {
    partialConj(word, voice, tense);
}

function partialConj(word, voice, tense) {
    switch(voice) {
        case ACTIVE:
            switch(tense) {
                case PRESENT:
                    activePresentConj(word);
                    break;
                case IMPERFECT:
                    activeImperfectConj(word);
                    break;
                case PERFECT:
                    activePerfectConj(word);
                    break;
                case FUTURE:
                    activeFutureConj(word);
                    break;
                case FUTURE_PERFECT:
                    activeFuturePerfectConj(word);
                    break;
                case PLU_PERFECT:
                    activePluPerfectConj(word);
                    break;
                default:
                    return null;
            }
        case PASSIVE:
            switch(tense) {
                case PRESENT:
                    passivePresentConj(word);
                    break;
                case IMPERFECT:
                    passiveImperfectConj(word);
                    break;
                case PERFECT:
                    passivePerfectConj(word);
                    break;
                case FUTURE:
                    passiveFutureConj(word);
                    break;
                case FUTURE_PERFECT:
                    passiveFuturePerfectConj(word);
                    break;
                case PLU_PERFECT:
                    passivePluPerfectConj(word);
                    break;
                default:
                    return null;
            }
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
    var infSmallRoot = inf.substring(0, inf.length-2);
    var infRoot = inf.substring(0, inf.length-3);
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
    var infShortRoot = inf.substring(0, inf.length-2);
    var infRoot = inf.substring(0, inf.length-3);

    if(conj === ("1" || "2" || "3")) {
        fullChart = new chart(infShortRoot, "bar", "baris", "batur", "bamur", "bamini", "bantur");
    } else if(conj === ("3io" || "4")) {
        fullChart = new chart(infRoot, "iebar", "iebaris", "iebatur", "iebamur", "iebamini", "iebantur");
    }
}

function passiveFutureConj(inf, conj) {
    var smallInfRoot = inf.substring(0, inf.length-2);
    var infRoot = inf.substring(0, inf.length-3);

    if(conj === ("1" || "2")) {
        fullChart = new chart(smallInfRoot, "bor", "beris", "bitur", "bimur", "bimini", "buntur");
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
