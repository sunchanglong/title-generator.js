// Written by Matthew Conlen
// 10 January 2013
//
// Licensed under the WTFPL

// Some Helper Functions
var pickRandomProperty = function(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
};

var toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

// All of the titles, taken from http://en.wikipedia.org/wiki/Corporate_title
var titleList = ["Chairman of the Board", "Chief Executive Officer", "Executive chairman", "Non-executive chairman", "Chief Academic Officer", "Chief accounting officer", "Chief administrative officer", "Chief Analytics Officer", "Chief Audit Executive", "Chief Business Officer", "Chief Business Development Officer", "Chief Brand Officer", "Chief commercial officer", "Chief Communications Officer", "Chief Compliance Officer", "Chief Content Officer", "Chief Creative Officer", "Chief Credit Officer", "Chief Customer Officer", "Chief Data Officer", "Chief Debriefing Officer", "Chief Design Officer", "Chief Diversity Officer", "Chief Electrification Officer", "Chief Engineering Officer", "Chief Executive Officer", "Chief executive manager", "Chief Financial Officer", "Chief Human Resources Officer", "Chief Information Officer", "Chief Information Security Officer", "Chief Innovation Officer", "Chief Intellectual Property Officer", "Chief International Officer", "Chief Investment Officer", "Chief Knowledge Officer", "Chief Legal Officer", "Chief Learning Officer", "Chief Marketing Officer", "Chief Medical Officer", "Chief Networking Officer", "Chief Operating Officer", "Chief Performance Officer", "Chief Privacy Officer", "Chief Process Officer", "Chief Procurement Officer", "Chief Product Officer", "Chief Program Officer", "Chief Promotions Officer", "Chief Quality Officer", "Chief Research Officer", "Chief Revenue Officer", "Chief Risk Officer", "Chief Risk Management Officer", "Chief Sales Officer", "Chief Science Officer", "Chief Search Officer", "Chief Security Officer", "Chief Specialist Officer", "Chief Strategy Officer", "Chief Supply Chain Officer", "Chief Tax Officer", "Chief Technology Officer", "Chief visionary officer", "Chief Web Officer", "Financial Control Officer", "Director", "Fellow", "President", "Secretary or Company secretary", "Secretary-Treasurer", "Treasurer", "Statutory agent", "Superintendent", "Associate", "Supervisor", "Foreman", "General manager", "Manager", "Of Counsel", "Owner", "Partner", "Principal", "Vice Chair", "Vice Chairman", "Vice President", "Middle Manager", "Commissioner"];

var titleDict = {};
var deadList = {"or": true, "of": true, "the": true};


// Hash all of the words in the titles
for (var title_index in titleList) {
    var words = titleList[title_index].split(" ");
    for (var word_index in words) {
        var word = words[word_index];
        if(word.toLowerCase() in deadList) {
            continue;
        }
        titleDict[word] = true;
    }
}


// Generate a new title
function getTitle(min, max) {
    var length = Math.floor(min + (max - min + 1) * Math.random());
    var title = "";
    var curOf = false;
    var officer = false;
    if (Math.random() < 0.4) {
        officer = true;
        length--;
    }
    for (var i=0; i<length; i++) {
        var curWord = pickRandomProperty(titleDict);
        var realCurOf = false;
        if (Math.random() < 0.1 && i > 0 && !curOf) {
            curOf = true;
            realCurOf = true;
            title += "of ";
        }
        if (i > 0 && !realCurOf && endsWith(curWord, "s") && !endsWith(curWord, "ss")) {
            title += "of " + curWord + " ";
        } else {
            title +=  curWord + " ";
        }
        
    }

    if (officer) {
        title += "officer";
    }
    return toTitleCase(title.trim());
}

// Uncomment this to see an example
// console.log(getTitle(3, 5));
