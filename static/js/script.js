function sendMessage() {
    var userMessage = $('#user-message').val();
    if (userMessage.trim() === '') {
        return;
    }

    $('#chat-box').append('<div class="chat-message user">' + userMessage.replace(/\n/g, '<br>') + '</div>');
    $('#user-message').val('').css('height', 'auto'); // Reset height after sending

    // Show the loading spinner in the chat box wrapped in a bot message div
    $('#chat-box').append('<div id="loading-spinner" class="chat-message bot"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>');
    $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);

    $.post('/get_response', { message: userMessage }, function(data) {
        $('#loading-spinner').remove(); // Remove the loading spinner
        $('#chat-box').append('<div class="chat-message bot">' + data.response.replace(/\n/g, '<br>') + '</div>');
        $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
    }, 'json');
}

function autoGrow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

// Add event listener for Enter key
$(document).ready(function() {
    $('#user-message').keydown(function(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevent default behavior of adding a new line
            sendMessage();
        }
    });

    // Show welcome message on page load
    showWelcomeMessage();
});

function clearChat() {
    $('#chat-box').empty(); // Clear the chat box
    showWelcomeMessage(); // Show welcome message after clearing
    $('#user-message').val('').css('height', 'auto'); // Reset the input area
}

function showWelcomeMessage() {
    const welcomeMessage = "Hello! How can I assist you today?";
    $('#chat-box').append('<div class="chat-message bot">' + welcomeMessage + '</div>');
    $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
}