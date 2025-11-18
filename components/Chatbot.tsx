import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, Bot, User } from 'lucide-react';
import { Chat } from '@google/genai';
import { ChatMessage } from '../types';
import { initializeChat, generateSpeech } from '../services/geminiService';
import { decode, decodeAudioData } from '../utils/audioUtils';
import useLocalStorage from '../hooks/useLocalStorage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>('chatMessages', []);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    setAudioContext(new AudioContext({ sampleRate: 24000 }));
    // Initialize chat with history from local storage.
    // This runs once on mount, loading the previous conversation.
    chatRef.current = initializeChat(messages);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chat = chatRef.current;
      if (!chat) {
        throw new Error("Chat is not initialized. Please refresh the page.");
      }
      const stream = await chat.sendMessageStream({ message: input });
      
      let modelResponse = '';
      const modelMessageId = crypto.randomUUID();

      // Add a placeholder for the model's response
      setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '...' }]);
      
      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages(prev => prev.map(msg => 
          msg.id === modelMessageId ? { ...msg, text: modelResponse } : msg
        ));
      }

    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = error instanceof Error ? error.message : "Sorry, I encountered an error.";
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAudio = async (text: string) => {
    if (!audioContext) return;
    try {
      const base64Audio = await generateSpeech(text);
      if (base64Audio) {
        const audioBuffer = await decodeAudioData(
          decode(base64Audio),
          audioContext,
          24000,
          1,
        );
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
      }
    } catch (error) {
      console.error("Failed to play audio:", error);
      alert("Could not play audio.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl flex flex-col h-[75vh]">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center">
                  <Bot size={20} />
                </div>
              )}
              <div className={`max-w-md p-3 rounded-xl ${msg.role === 'user' ? 'bg-blue-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
                <p className="text-white whitespace-pre-wrap">{msg.text}</p>
                {msg.role === 'model' && msg.text !== '...' && (
                   <button onClick={() => handlePlayAudio(msg.text)} className="mt-2 text-gray-400 hover:text-white transition-colors">
                     <Volume2 size={16} />
                   </button>
                )}
              </div>
               {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center">
                  <User size={20} />
                </div>
              )}
            </div>
          ))}
           <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            disabled={isLoading}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-3 pl-4 pr-12 text-white focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-md disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};