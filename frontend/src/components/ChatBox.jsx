import React, { useState } from 'react';
import './ChatBox.css';
import TypingIndicator from './TypingIndicator.jsx';

const ChatBox = ({ messages, onSendMessage, isBotTyping }) => {
  const [userInput, setUserInput] = useState('');

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;
    onSendMessage(userInput);
    setUserInput('');
  };

  return (
    <div className="ChatBox">
      <div className="Messages">
        {messages.map((message, index) => (
          <div key={index} className={`Message ${message.sender === 'user' ? 'UserMessage' : 'BotMessage'}`}>
            {message.text}
          </div>
        ))}
      </div>
      {isBotTyping && <TypingIndicator />}
      <form onSubmit={handleSubmit} className="MessageForm">
        <input
          type="text"
          value={userInput}
          onChange={handleInput}
          className="InputField"
          placeholder="Type your message here..."
        />
        <button type="submit" className="SendButton">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
