document.addEventListener('DOMContentLoaded', function() {
    var toggle1 = document.getElementById('toggle1');
    var statusText = document.getElementById('statusText');
    var iconDiv = document.getElementById('icon');
    var emojiOff = document.getElementById('emojiOff');
    var emojiOn = document.getElementById('emojiOn');

    // Load the stored state of the toggle and set the switch position, status text, icon background image, and emoji
    chrome.storage.sync.get('enabled', function(data) {
        toggle1.checked = data.enabled;
        statusText.textContent = data.enabled ? "You're Bodenizing! Just reload the uh,\n you know - you know the thing." : "Bodenizer disabled,\n you dog-faced pony soldier!";
        iconDiv.style.backgroundImage = data.enabled ? "url('smiling.png')" : "url('icon.png')";
        emojiOff.style.display = data.enabled ? 'none' : 'inline'; // Hide/show the "off" emoji
        emojiOn.style.display = data.enabled ? 'inline' : 'none'; // Hide/show the "on" emoji
    });

    // Listen for toggle changes, save the new state, and update the status text, icon background image, and emojis
    toggle1.addEventListener('change', function() {
        var enabled = toggle1.checked;
        chrome.storage.sync.set({'enabled': enabled}, function() {
            statusText.textContent = enabled ? "You're Bodenizing! Just reload the uh,\n you know - you know the thing." : "Bodenizer disabled,\n you dog-faced pony soldier!";
            iconDiv.style.backgroundImage = enabled ? "url('smiling.png')" : "url('icon.png')";
            emojiOff.style.display = enabled ? 'none' : 'inline'; // Hide/show the "off" emoji
            emojiOn.style.display = enabled ? 'inline' : 'none'; // Hide/show the "on" emoji
            // Optionally, send a message to the content script to toggle the text replacement
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {action: "toggle", enabled: enabled});
            });
        });
    });
});
