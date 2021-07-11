console.log("HS Person Link Remover active");

let runDelinker;

// Save the current window location (url)
let oldHref = document.location.href;

// This needs to run multiple times to catch all the links. Don't ask me why.
// Hence it runs every 100 ms until all links have been removed.
function delink() {
    // Find every link element
    let people = document.getElementsByClassName("article-personlink");

    // If there are none, stop running
    if (people.length == 0) complete();

    for (var i = 0; i < people.length; i++) {
        // Replace the link with similar-looking element
        people[i].outerHTML = "<b>" + people[i].innerHTML + "</b>";
    }
}

// Stop checking for links if there are none left
function complete() {
    clearInterval(runDelinker);
}

// Start delinker if the url changes
function watchForWindowChange() {
    if (document.location.href != oldHref) {
        oldHref = document.location.href;
        runDelinker = setInterval(delink, 100);
    }
}

// Run delinker for the first time, subsequent runs happen if the window changes
runDelinker = setInterval(delink, 100);

// Watch out for window change.
// This sadly needs to run at all times, but checking an if statement every second shouldn't be too much of a resource hog.
setInterval(watchForWindowChange, 1000);
