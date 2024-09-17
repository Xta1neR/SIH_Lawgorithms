
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Copy, User, Bot, MessageCircle, X } from 'lucide-react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export default function LawBot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
  const MODEL_NAME = "gemini-1.5-pro-latest";
  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetyConfig = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT, // Category for harassment
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_HIGH, // High threshold for blocking
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, // Category for sexually explicit content
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_HIGH, // High threshold for blocking
    },
    {
      category: HarmCategory.HARM_CATEGORY_VIOLENCE, // Category for violence
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_HIGH, // High threshold for blocking
    },
    {
      category: HarmCategory.HARM_CATEGORY_MEDICAL, // Category for medical content
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_HIGH, // High threshold for blocking
    },
    {
      category: HarmCategory.HARM_CATEGORY_ILLEGAL, // Category for illegal content
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_HIGH, // High threshold for blocking
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, // Category for dangerous content
      threshold: HarmBlockThreshold.HARM_BLOCK_THRESHOLD_HIGH, // High threshold for blocking
    }
  ];


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI.getGenerativeModel({ model: MODEL_NAME }).startChat({
          generationConfig,
          safetyConfig,
          history: messages.map((msg) => ({
            text: msg.text,
            role: msg.role,
          })),
        });
        setChat(newChat);
      } catch (e) {
        setError("Failed to start chat");
      }
    };
    initChat();
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    try {
      const userMessage = {
        text: userInput,
        role: "user",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");

      if (chat) {
        const result = await chat.sendMessage(userInput);
        const botMessage = {
          text: result.response.text(),
          role: "bot",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (e) {
      setError("Failed to send message");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a temporary "Copied!" message here
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 rounded-full p-4 shadow-lg hover:shadow-white-300 transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl flex flex-col" style={{ width: '350px', height: '600px' }}>
          <header className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h1 className="text-xl font-bold">LawBot</h1>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-600 rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </header>
          
          <main className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start space-x-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "bot" && <Bot className="w-8 h-8 text-blue-500 flex-shrink-0" />}
                  <div className={`group relative max-w-[70%] rounded-lg p-3 shadow-lg transition-all duration-300 hover:shadow-xl ${
                    msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100"
                  }`}>
                    <p>{msg.text}</p>
                    <span className="text-xs opacity-50 mt-1 block">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                    <button
                      onClick={() => copyToClipboard(msg.text)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  {msg.role === "user" && <User className="w-8 h-8 text-blue-500 flex-shrink-0" />}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 bg-gray-50">
              <div className="flex items-center space-x-2">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                  rows="1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg hover:shadow-white-300 rounded-full p-3"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </main>
          {error && <div className="p-4 bg-red-100 text-red-700">{error}</div>}
        </div>
      )}
    </div>
  );
}