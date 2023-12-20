// App.jsx
import { useState } from 'react';
import './App.css';
import ChatBox from './components/ChatBox.jsx';
import Header from './components/Header.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MessageHandler from './components/MessageHandler'; // Import MessageHandler

function App() {
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Callback to update messages
  const handleMessagesUpdate = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // Callback to update bot typing status
  const handleBotTypingStatusChange = (status) => {
    setIsBotTyping(status);
  };

  const messageHandler = MessageHandler({
    onMessagesUpdate: handleMessagesUpdate,
    onBotTypingStatusChange: handleBotTypingStatusChange,
  });

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <header className="App-header">
                <h1>Chat with <span style={{ color: '#49dfc4' }}>GPT</span></h1>
              </header>
              <ChatBox
                messages={messages}
                onSendMessage={messageHandler.handleSendMessage}
                isBotTyping={isBotTyping}
              />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
