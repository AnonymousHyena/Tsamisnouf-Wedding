(function (global) {
    var tsw = {};
    var language = 1; // 0 for English, 1 for Greek
    var secret = 0;
    var active = 0;
    var homeHtmlUrl = "snippets/home-snippet.html";
    //   var rsvpHtmlUrl = "snippets/rsvp-snippet.html";
    //   var directionsHtmlUrl = "snippets/directions-snippet.html";
    //   var directionsHtmlUrlGr = "snippets/directions-snippet-gr.html";
    //   var giftsHtmlUrl = "snippets/gifts-snippet.html";
    //   var giftsHtmlUrlGr = "snippets/gifts-snippet-gr.html";
    //   var teamHtmlUrl = "snippets/about-snippet.html";
    //   var teamHtmlUrlGr = "snippets/about-snippet-gr.html";
    var koumparoi = [
        { "image": "teo", "name": "Theodore Vasiloudis", "title": "Best Man", "namegr": "Θοδωρής Βασιλούδης", "titlegr": "Κουμπάρος" },
        { "image": "jason", "name": "Jason Loukaidis", "title": "Best Man", "namegr": "Ιάσονας Λουκαΐδης", "titlegr": "Κουμπάρος" },
        { "image": "eugenia", "name": "Eugenia Bozika", "title": "Best Woman", "namegr": "Ευγενία Μποζίκα", "titlegr": "Κουμπάρα" },
        { "image": "statics", "name": "Stathis Bozikas", "title": "Best Man", "namegr": "Στάθης Μποζίκας", "titlegr": "Κουμπάρος" },
        { "image": "maliaros", "name": "Giorgos Malliaros", "title": "Best Man", "namegr": "Γιώργος Μαλλιαρός", "titlegr": "Κουμπάρος" },
        { "image": "lafa", "name": "Christos Lafantaris", "title": "Best Man", "namegr": "Χρήστος Λαφαντάρης", "titlegr": "Κουμπάρος" }
    ]
    // Convenience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };
    // Show loading icon inside element identified by 'selector'.
    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };
    // Return substitute of '{{propName}}' 
    // with propValue in given 'string' 
    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string
            .replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    };
    var shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 != currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;

    };
    // Remove the class 'active' from home and switch to Menu button
    // var switchMenuToActive = function (buttonIndex) {
    //   // Remove 'active' from home button
    //   var classes = document.querySelector("#navHomeButton").className;
    //   classes = classes.replace(new RegExp("active", "g"), "");
    //   document.querySelector("#navHomeButton").className = classes;

    //   // var classes = document.querySelector("#navMenuRSVPButton").className;
    //   // classes = classes.replace(new RegExp("active", "g"), "");
    //   // document.querySelector("#navMenuRSVPButton").className = classes;

    //   // var classes = document.querySelector("#navMenuDirButton").className;
    //   // classes = classes.replace(new RegExp("active", "g"), "");
    //   // document.querySelector("#navMenuDirButton").className = classes;

    //   // var classes = document.querySelector("#navMenuGiftButton").className;
    //   // classes = classes.replace(new RegExp("active", "g"), "");
    //   // document.querySelector("#navMenuGiftButton").className = classes;

    //   // var classes = document.querySelector("#navMenuTeamButton").className;
    //   // classes = classes.replace(new RegExp("active", "g"), "");
    //   // document.querySelector("#navMenuTeamButton").className = classes;

    //   var menuSelector;
    //   active = buttonIndex;
    //   if (buttonIndex==0){menuSelector="#navHomeButton";}
    //   // else if (buttonIndex==1){menuSelector="#navMenuRSVPButton";}
    //   // else if (buttonIndex==2){menuSelector="#navMenuDirButton";}
    //   // else if (buttonIndex==3){menuSelector="#navMenuGiftButton";}
    //   // else if (buttonIndex==4){menuSelector="#navMenuTeamButton";}
    //   // Add 'active' to menu button if not already there
    //   classes = document.querySelector(menuSelector).className;
    //   if (classes.indexOf("active") == -1) {
    //     classes += " active";
    //     document.querySelector(menuSelector).className = classes;
    //   }
    // };
    // On page load (before images or CSS), show home view
    document.addEventListener("DOMContentLoaded", function (event) { tsw.loadHomePage(); });

    tsw.loadHomePage = function () {
        showLoading("#main-content");
        // switchMenuToActive(0);
        $ajaxUtils.sendGetRequest(
            homeHtmlUrl,
            function (homeHtml) { insertHtml("#main-content", homeHtml); },
            false);
    };
    tsw.loadRSVPPage = function () {
        showLoading("#main-content");
        // switchMenuToActive(1);
        $ajaxUtils.sendGetRequest(
            rsvpHtmlUrl,
            function (rsvpHtml) { insertHtml("#main-content", rsvpHtml); },
            false);
    };
    tsw.loadDirectionsPage = function () {
        showLoading("#main-content");
        // switchMenuToActive(2);
        $ajaxUtils.sendGetRequest(
            directionsHtmlUrl,
            function (directionsHtml) { insertHtml("#main-content", directionsHtml); },
            false);

    };
    tsw.loadGiftsPage = function () {
        showLoading("#main-content");
        // switchMenuToActive(3);
        $ajaxUtils.sendGetRequest(
            giftsHtmlUrl,
            function (giftsHtml) { insertHtml("#main-content", giftsHtml); },
            false);

    };
    tsw.loadTeamPage = function () {
        showLoading("#main-content");
        // switchMenuToActive(4);
        if (language == 0) {
            $ajaxUtils.sendGetRequest(
                teamHtmlUrl,
                function (teamHtml) {
                    koumparoi = shuffle(koumparoi);
                    var rnd;
                    for (var i = 0; i < 6; i++) {
                        rnd = Math.random();
                        if (rnd <= 0.025) {
                            teamHtml = insertProperty(teamHtml, "img" + i, koumparoi[i].image + "_egg")
                        }
                        else {
                            teamHtml = insertProperty(teamHtml, "img" + i, koumparoi[i].image)
                        }
                        teamHtml = insertProperty(teamHtml, "name" + i, koumparoi[i].name)
                        teamHtml = insertProperty(teamHtml, "title" + i, koumparoi[i].title)
                    }
                    insertHtml("#main-content", teamHtml);
                },
                false);
        }
        else {
            $ajaxUtils.sendGetRequest(
                teamHtmlUrlGr,
                function (teamHtml) {
                    koumparoi = shuffle(koumparoi);
                    var rnd;
                    for (var i = 0; i < 6; i++) {
                        rnd == Math.random();
                        if (rnd <= 0.025) {
                            teamHtml = insertProperty(teamHtml, "img" + i, koumparoi[i].image + "_egg")
                        }
                        else {
                            teamHtml = insertProperty(teamHtml, "img" + i, koumparoi[i].image)
                        }
                        teamHtml = insertProperty(teamHtml, "name" + i, koumparoi[i].namegr)
                        teamHtml = insertProperty(teamHtml, "title" + i, koumparoi[i].titlegr)
                    }
                    insertHtml("#main-content", teamHtml);
                },
                false);
        }
    };
    tsw.toggleSecret = function (state) {
        if (state == 0) {
            if (language == 1) {
                document.querySelector("#secret").innerHTML = document.querySelector("#secret").innerHTML.replace('Μικρούλης', 'Μίλτος');
            } else {
                document.querySelector("#secret-eng").innerHTML = document.querySelector("#secret-eng").innerHTML.replace('Wee Lad', 'Miltos');
            }
        }
        else if (state == 1) {
            if (language == 1) {
                document.querySelector("#secret").innerHTML = document.querySelector("#secret").innerHTML.replace('Μίλτος', 'Μικρούλης');
            } else {
                document.querySelector("#secret-eng").innerHTML = document.querySelector("#secret-eng").innerHTML.replace('Miltos', 'Wee Lad');
            }
        }
    };
    tsw.toggleLanguage = function () {
        // Print all document elements with the data-i18n-key attribute
        console.log(document.querySelectorAll("[data-i18n-key]"));

        if (language == 1) lang = "en";
        else lang = "el";

        // Read the JSON file
        $.getJSON(`./lang/${lang}.json`, function (data) {
            // Iterate over each element with the data-i18n-key attribute
            document
                .querySelectorAll("[data-i18n-key]")
                .forEach(function (element) {
                    // Get the key from the data-i18n-key attribute
                    const key = element.getAttribute("data-i18n-key");
                    // Split the key into parts
                    const keys = key.split(".");
                    console.log(keys);
                    let text = data;
                    // Traverse the JSON object using the keys
                    for (const k of keys) {
                        if (!text[k]) {
                            text = null;
                            break;
                        }
                        text = text[k];
                    }
                    // If the text is found, set it as the innerHTML of the element
                    if (text) {
                        element.innerHTML = text;
                    }
                });
        }); 

        language = 1 - language;
    };
    // open link in new tab
    tsw.openLink = function (url) {
        var win = window.open(url, '_blank');
        win.focus();
    };

    global.$tsw = tsw;

})(window);