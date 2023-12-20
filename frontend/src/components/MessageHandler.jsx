// MessageHandler.jsx

import { useState, useCallback } from 'react';

const MessageHandler = ({ onMessagesUpdate, onBotTypingStatusChange }) => {
  const handleSendMessage = useCallback(async (userInput) => {
    // Add the user message to the messages array
    onMessagesUpdate({ text: userInput, sender: 'user' });
    onBotTypingStatusChange(true); // Set the bot typing indicator to true
    console.log("Calling the OpenAI API");

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) {
        // If the HTTP status code is not okay, log the status and throw an error
        console.error('HTTP error:', response.status);
        throw new Error(`HTTP error: ${response.status}`);
      }

      const botMessages = await response.json();
      onBotTypingStatusChange(false); // Set the bot typing indicator to false

      // Add the ChatGPT responses to the messages array
      onMessagesUpdate(...botMessages);
    } catch (error) {
      console.error('Error:', error);
      onBotTypingStatusChange(false); // Ensure we set typing to false if there's an error
      onMessagesUpdate({ text: 'Error: Unable to get a response from the server.', sender: 'bot' });
    }
  }, [onMessagesUpdate, onBotTypingStatusChange]);

  // Return a context or provide a callback via props to send messages from the ChatBox
  return { handleSendMessage };
};

export default MessageHandler;
