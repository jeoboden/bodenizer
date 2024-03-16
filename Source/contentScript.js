// Function to replace text
function replaceText(text) {
    if (!text) return text;
    text = text.replace(/Biden/g, 'Boden');
    text = text.replace(/Joe/g, 'Jeo');
    return text;
}

// Function to recursively replace text in nodes
function replaceTextInNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        node.textContent = replaceText(node.textContent);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(replaceTextInNode);
    }
}

// Function to observe the DOM and replace text in added nodes
function observeDOM() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach(replaceTextInNode);
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Check the extension's enabled state and act accordingly
chrome.storage.sync.get('enabled', function(data) {
    if (data.enabled) {
        document.body.childNodes.forEach(replaceTextInNode);
        observeDOM();
    }
});

// Listen for toggle messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggle") {
        // Reloading the page to reflect changes based on the new state
        window.location.reload();
    }
});