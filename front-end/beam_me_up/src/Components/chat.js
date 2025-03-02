import React, { useState } from "react";
import axios from "axios";

const ChatWithGemini = () => {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { sender: "user", text: message };
        setChatHistory([...chatHistory, userMessage]);

        try {
            const response = await axios.post("http://localhost:8080/api/gemini/chat", { userMessage: message });
            const botMessage = { sender: "gemini", text: response.data.reply };
            setChatHistory([...chatHistory, userMessage, botMessage]);
        } catch (error) {
            console.error("Error:", error);
        }

        setMessage("");
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", textAlign: "center" }}>
            <h2>Chat with Google Gemini</h2>
            <div style={{ border: "1px solid #ddd", padding: "10px", minHeight: "200px" }}>
                {chatHistory.map((msg, index) => (
                    <p key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
                        <strong>{msg.sender === "user" ? "You" : "Gemini"}:</strong> {msg.text}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={{ width: "80%", padding: "10px", marginTop: "10px" }}
            />
            <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "10px" }}>Send</button>
        </div>
    );
};

export default ChatWithGemini;