/**
 * Home component that renders a chatbot interface.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * <Home />
 * 
 * @description
 * This component initializes a chat using Google Generative AI and allows users to send messages.
 * It also provides a theme switcher between light and dark modes.
 * 
 * @typedef {Object} Message
 * @property {string} text - The text of the message.
 * @property {string} role - The role of the message sender (user or bot).
 * @property {Date} timestamp - The timestamp of the message.
 * 
 * @typedef {Object} ThemeColors
 * @property {string} primary - The primary background color.
 * @property {string} secondary - The secondary background color.
 * @property {string} accent - The accent color.
 * @property {string} text - The text color.
 * 
 * @state {Message[]} message - The list of messages in the chat.
 * @state {string} userInput - The current user input.
 * @state {Object|null} chat - The chat instance.
 * @state {string} theme - The current theme (light or dark).
 * @state {string|null} error - The error message, if any.
 * 
 * @constant {string} API_KEY - The API key for Google Generative AI.
 * @constant {string} MODEL_NAME - The model name for Google Generative AI.
 * 
 * @constant {Object} generationConfig - The configuration for message generation.
 * @constant {number} generationConfig.temperature - The temperature for generation.
 * @constant {number} generationConfig.topK - The topK value for generation.
 * @constant {number} generationConfig.topP - The topP value for generation.
 * @constant {number} generationConfig.maxOutputTokens - The maximum output tokens for generation.
 * 
 * @constant {Object[]} safetyConfig - The safety configuration for message generation.
 * @constant {HarmCategory} safetyConfig[].category - The harm category.
 * @constant {HarmBlockThreshold} safetyConfig[].threshold - The harm block threshold.
 * 
 * @function handleSendMessage - Sends a message to the chat.
 * @async
 * 
 * @function handleThemeChange - Changes the theme of the chat interface.
 * @param {Event} e - The change event.
 * 
 * @function getThemeColors - Gets the colors for the current theme.
 * @returns {ThemeColors} The colors for the current theme.
 * 
 * @function handleKeyPress - Handles the key press event for sending a message.
 * @param {KeyboardEvent} e - The keyboard event.
 * 
 * @useEffect Initializes the chat when the component mounts.
 * 
 */


"use client"


import Head from 'next/head';

// Import necessary hooks from React
import { useState, useEffect,useRef } from 'react';

import { Button } from '@/components/ui/button';

// Import the GoogleGenerativeAI class from the @google/generative-ai package
import {
  GoogleGenerativeAI, // Class for interacting with Google Generative AI
  HarmCategory, // Enum for different harm categories
  HarmBlockThreshold, // Enum for different harm block thresholds
} from "@google/generative-ai"; // The package providing Google Generative AI functionalities


// Define the Home component as the default export
export default function Home() {
  // State to store chat messages
  const [message, setMessage] = useState([]);
  // State to store user input from the text field
  const [userInput, setUserInput] = useState("");
  // State to store the chat instance
  const [chat, setChat] = useState(null);
  // State to store the current theme (light or dark)
  const [theme, setTheme] = useState("light");
  // State to store any error messages
  const [error, setError] = useState(null);
  


  // API key for Google Generative AI
  
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
  // Model name for the generative AI
  const MODEL_NAME = "gemini-1.5-flash";

  // Create an instance of GoogleGenerativeAI with the API key
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Configuration for the generative AI model
  const generationConfig = {
    temperature: 0.9, // Controls the randomness of the output
    topK: 1, // Limits the sampling pool to the top K tokens
    topP: 1, // Limits the sampling pool to the top P probability mass
    maxOutputTokens: 2048, // Maximum number of tokens in the output
  };

  // Safety configuration to filter harmful content
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

  // useEffect hook to initialize the chat when the component mounts
  useEffect(() => {
    const initChat = async () => {
      try {
        // Start a new chat with the generative AI model
        const newChat = await genAI.getGenerativeModel({ model: MODEL_NAME }).startChat({
          generationConfig, // Pass the generation configuration
          safetyConfig, // Pass the safety configuration
          history: message.map((mssg) => ({
            text: mssg.text, // Map message text
            role: mssg.role, // Map message role
          })),
        });
        // Set the chat instance in state
        setChat(newChat);
      } catch (e) {
        // Set an error message if chat initialization fails
        setError("failed to start chat");
      }
    };
    initChat();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to handle sending a message
  const handleSendMessage = async () => {
    try {
      // Create a user message object
      const userMessage = {
        text: userInput, // User input text
        role: "user", // Role is user
        timestamp: new Date(), // Current timestamp
      };
      // Add the user message to the message state
      setMessage((prevMessage) => [...prevMessage, userMessage]);
      // Clear the user input field
      setUserInput("");

      // If chat instance exists, send the message
      if (chat) {
        const result = await chat.sendMessage(userInput);
        // Create a bot message object from the response
        const botMessage = {
          text: result.response.text(), // Bot response text
          role: "bot", // Role is bot
          timestamp: new Date(), // Current timestamp
        };
        // Add the bot message to the message state
        setMessage((prevMessage) => [...prevMessage, botMessage]);
      }
    } catch (e) {
      // Set an error message if sending the message fails
      setError("failed to send Message");
    }
  };

  // Function to handle theme change
  const handleThemeChange = (e) => {
    setTheme(e.target.value); // Update the theme state with the selected value
  };

  // Function to get theme colors based on the current theme
  const getThemeColors = () => {
    switch (theme) {
      case "dark":
        return {
          primary: "bg-gray-900", // Primary background color for dark theme
          secondary: "bg-gray-800", // Secondary background color for dark theme
          accent: "bg-yellow-500", // Accent color for dark theme
          text: "text-gray-100", // Text color for dark theme
        };
      case "light":
        return {
          primary: "bg-white", // Primary background color for light theme
          secondary: "bg-gray-100", // Secondary background color for light theme
          accent: "bg-blue-500", // Accent color for light theme
          text: "text-gray-900", // Text color for light theme
        };
      default:
        return {
          primary: "bg-white", // Default primary background color
          secondary: "bg-gray-100", // Default secondary background color
          accent: "bg-blue-500", // Default accent color
          text: "text-gray-900", // Default text color
        };
    }
  };

  // Function to handle key press events in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default action
      handleSendMessage(); // Call the handleSendMessage function
    }
  };

  // Get the theme colors based on the current theme state
  const { primary, secondary, accent, text } = getThemeColors();

  // Render the component
  return (


  
    <div className={`flex flex-col  p-4 ${primary}`} style={{  height: '90vh', overflow: 'hidden'}}>
      <div className="flex justify-between items-center mb-4" >
        <h1 className={`text-2xl font-bold ${text}`}  style={{ color: 'rgb(59, 130, 246)'} }>LawBot</h1>
        <div className="flex space-x-2">
          <label htmlFor="theme" className={`text-sm ${text}`}>Theme :</label>
          <select
            id="theme"
            value={theme}
            onChange={handleThemeChange}
            className={`p-1 rounded-md border ${text}`}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* <div className={`flex-1 overflow-y-auto ${secondary} rounded-md p-2`} style={{ background: 'linear-gradient(180deg, rgba(255,179,0,1) 8%, rgba(255,255,255,1) 59%, rgba(4,88,46,1) 98%)' }}> */}
      <div className={`flex-1 overflow-y-auto ${secondary} rounded-md p-4`} style={{backgroundColor:'white',boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1), var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
  '--tw-shadow-colored': '0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)',fontFamily: 'Poppins, sans-serif'}}>
        {message.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block p-2 rounded-lg max-w-[60%] break-words ${msg.role === "user" ? `bg-[#b4c5e4] text-black` : `bg-[#fbfff1] text-black`}`}>
          {msg.text}
        </span>
            <p className={`text-xs ${text} mt-1`}>
              {msg.role === "user" ? "You" : "Bot"} - {msg.timestamp.toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex items-center mt-4" style={{ columnGap: '0.5rem' }}>
        <input
          type="text"
          placeholder='Type a message...'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className={`flex-1 p-2 rounded-l-md border ${text}`}
           style={{ borderRadius:"0.5rem" }}
        />
        <Button
        variant={'secondaryOutline'}
          onClick={handleSendMessage}
          style={{ borderRadius:"0.5rem 3rem 3rem 0.5rem" }}
        >
          Send
        </Button>
      </div>
    </div>
    
  );
}