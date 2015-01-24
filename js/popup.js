// This callback function is called when the content script has been 
// injected and returned its results
function onPageDetailsReceived(pageDetails) { 
    document.getElementById('title').value = pageDetails.title; 
    document.getElementById('url').value = pageDetails.url; 
    document.getElementById('description').innerText = pageDetails.description; 
    document.getElementById('tags').value = pageDetails.tags; 
}

function onPageDetailsSetDefaults() {
    chrome.tabs.getSelected(null, function(tab) { //<-- "tab" has all the information
        document.getElementById('url').value = document.getElementById('url').defaultValue = tab.url;
        document.getElementById('title').value = document.getElementById('title').defaultValue = tab.title;
    }); 
}

// Global reference to the status display SPAN
var statusDisplay = null;

// POST the data to the server using XMLHttpRequest
function addMagicLink() {
    // Cancel the form submit
    event.preventDefault();

    // The URL to POST our data to
    var postUrl = 'http://rendfall.pl/add/insertdb.php';

    // Set up an asynchronous AJAX POST request

    // Prepare the data to be POSTed by URLEncoding each field's contents
    var title = encodeURIComponent(document.getElementById('title').value);
    var url = encodeURIComponent(document.getElementById('url').value);
    var description = encodeURIComponent(document.getElementById('description').value);
    var tags = encodeURIComponent(document.getElementById('tags').value);

    var params = 'title=' + title + 
                 '&url=' + url + 
                 '&description=' + description +
                 '&tags=' + tags;

    // Replace any instances of the URLEncoded space char with +
    params = params.replace(/%20/g, '+');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', postUrl + '?' + params, true);
    // Set correct header for form data 
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //xhr.setRequestHeader("Content-length", params.length);
    //xhr.setRequestHeader("Connection", "close");

    // Handle request state change events
    xhr.onreadystatechange = function() { 
        // If the request completed
        if (xhr.readyState == 4) {
            statusDisplay.innerHTML = '';
            if (xhr.status == 200) {
                // If it was a success, close the popup after a short delay
                statusDisplay.innerHTML = 'Zapisano!'; // TODO: get response from remote
                window.setTimeout(window.close, 1000);
            } else {
                // Show what went wrong
                statusDisplay.innerHTML = 'Błąd zapisu: ' + xhr.statusText;
            }
        }
    };

    // Send the request and set status
    xhr.send(params);
    statusDisplay.innerHTML = 'Zapisuję...';
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    onPageDetailsSetDefaults();
    // Cache a reference to the status display SPAN
    statusDisplay = document.getElementById('status-display');
    // Handle the bookmark form submit event with our addMagicLink function
    document.getElementById('addMagicLink').addEventListener('submit', addMagicLink);
    // Get the event page
    // chrome.runtime.getBackgroundPage(function(eventPage) {
    //     // Call the getPageInfo function in the event page, passing in 
    //     // our onPageDetailsReceived function as the callback. This injects 
    //     // content.js into the current tab's HTML
    //     eventPage.getPageDetails(onPageDetailsReceived);
    // });
});