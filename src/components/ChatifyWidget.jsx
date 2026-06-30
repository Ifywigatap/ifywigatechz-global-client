import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Adjust these imports based on your exact file structure
import { chatifyKnowledge } from '../data/chatifyKnowledge'; 
import { sendMessage, getQuickReplies } from '../services/chatifyService';

const ChatifyWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello 👋 I’m ChatIFY AI, your smart assistant. How can I help you learn today?", sender: 'bot' }
  ]);
  const messagesEndRef = useRef(null);

  // Mock quick replies - replace with getQuickReplies() if needed
  const quickReplies = getQuickReplies();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userText = textToSend.trim();
    setMessages((prev) => [...prev, { id: Date.now(), text: userText, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. Check local knowledge base first
      let foundReply = null;
      for (const item of chatifyKnowledge) {
        if (item.patterns.some(pattern => pattern.test(userText))) {
          foundReply = item.reply;
          break;
        }
      }

      if (foundReply) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev, 
            { id: Date.now() + 1, text: foundReply, sender: 'bot' }
          ]);
          setIsLoading(false);
        }, 600); // Small delay to feel natural
        return;
      }
      
      // 2. Fetch from your backend/Groq API
      // Map existing messages to a standard history format for the AI backend
      const chatHistory = messages.map((msg) => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }));

      const response = await sendMessage(userText, chatHistory);
      const aiReply = response?.reply || "I'm still learning! For more specific information, please use the WhatsApp button above to chat with our team.";
      
      setMessages((prev) => [
        ...prev, 
        { id: Date.now() + 1, text: aiReply, sender: 'bot' }
      ]);
      setIsLoading(false);

    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev, 
        { id: Date.now() + 1, text: "Sorry, I'm experiencing technical difficulties.", sender: 'bot' }
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white dark:bg-slate-900 w-[calc(100vw-2rem)] sm:w-[380px] h-[75dvh] max-h-[600px] min-h-[400px] rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex justify-between items-center shadow-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm text-white">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base tracking-wide">ChatIFY AI</h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Integrated WhatsApp Button */}
                <a
                  href="https://wa.me/2348113722088?text=Hi%20IFYWIGATECHZ%2C%20I%20need%20help"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Chat on WhatsApp"
                >
                  <Phone size={18} />
                </a>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-950 space-y-5 scroll-smooth">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1">
                      <Bot size={16} />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] p-3.5 text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' 
                        : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-4 rounded-2xl rounded-tl-sm shadow-sm flex space-x-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* Quick Replies (Only show if few messages and not loading) */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleSend(reply)} 
                      className="text-[13px] font-medium bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 transition-colors shadow-sm"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm sm:text-base text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center"
                  aria-label="Send message"
                >
                  <Send size={18} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-tr from-blue-600 to-blue-500 text-white p-4 rounded-full shadow-xl shadow-blue-500/30 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-300/50 relative group"
          >
            <MessageCircle size={26} className="relative z-10" />
            {/* Soft ping animation for unread/attention */}
            <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20 group-hover:opacity-0 transition-opacity"></span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatifyWidget;