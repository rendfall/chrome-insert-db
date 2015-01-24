
function changeRemote(e){
    localStorage["remote"] = e.target.src;
    chrome.permissions.request({
        permissions: [remote]
    }, function(granted) {
        // The callback argument will be true if the user granted the permissions.
        if (granted) {
            saveOptions();
            alert('zapisano');
        } else {
            alert('nO!');
        }
    });
}

// Saves options to chrome.storage
function saveOptions() {
    var remote = document.getElementById('remote').value;
    chrome.storage.sync.set({
        remote: remote
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Zapisano.';
        setTimeout(function() {
          status.textContent = '';
    }, 750);
  });
}

function closeOptions(){
    chrome.tabs.getCurrent(function(tab) {
        chrome.tabs.remove(tab.id, function() { });
    });
}

// Restores using the preferences
// stored in chrome.storage.
function restoreOptions() {
    var remote = (localStorage["remote"] != 'undefined') ? localStorage["remote"] : '';
    document.getElementById('remote').value = remote;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', changeRemote);
document.getElementById('cancel').addEventListener('click', closeOptions);