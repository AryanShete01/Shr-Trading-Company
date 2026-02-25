"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Phone, MapPin, Clock, Info } from "lucide-react";
import Image from "next/image";

type Message = {
    id: string;
    type: "bot" | "user";
    text: string;
};

const predefinedResponses: Record<string, string> = {
    "products": "We specialize in premium paints (Nerolac, Berger), industrial hardware, certified electrical systems, and durable plumbing materials. Are you looking for something specific?",
    "location": "We are located on the Akole-Sangamner Rd, Akole, Maharashtra 422601. Visit our showroom for physical inspection of our materials!",
    "hours": "Our trading hours are Monday to Saturday, from 9:00 AM to 8:00 PM. We look forward to serving you.",
    "bulk": "Yes, we handle large-scale procurement and bulk orders for contractors and infrastructure projects. Please contact our technical desk for quotes.",
    "contact": "You can reach us directly at +91 99222 34646 or email us at shreerajtradingco@yahoo.com.",
    "owner": "Shreeraj Trading Company was founded by Vikasrao Shete and Vijay Shete. We are proud to be a family-owned business serving the community since 1995.",
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            type: "bot",
            text: "Welcome to Shreeraj Trading Co! How can we assist with your building or hardware needs today?",
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (text: string, isQuickReply = false) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg: Message = { id: Date.now().toString(), type: "user", text };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");

        // Simulate bot typing delay
        setTimeout(() => {
            let botText = "Thank you for reaching out! For detailed inquiries, please connect with us on WhatsApp or call our desk directly.";

            if (isQuickReply && predefinedResponses[text]) {
                botText = predefinedResponses[text];
            } else {
                // Simple keyword matching for typed messages
                const lowerText = text.toLowerCase();
                if (lowerText.includes("paint") || lowerText.includes("hardware") || lowerText.includes("product")) botText = predefinedResponses["products"];
                if (lowerText.includes("where") || lowerText.includes("location") || lowerText.includes("address")) botText = predefinedResponses["location"];
                if (lowerText.includes("time") || lowerText.includes("hour") || lowerText.includes("open")) botText = predefinedResponses["hours"];
                if (lowerText.includes("bulk") || lowerText.includes("wholesale")) botText = predefinedResponses["bulk"];
                if (lowerText.includes("phone") || lowerText.includes("contact") || lowerText.includes("call") || lowerText.includes("email")) botText = predefinedResponses["contact"];
                if (lowerText.includes("owner") || lowerText.includes("founder") || lowerText.includes("who owns")) botText = predefinedResponses["owner"];
            }

            const botMsg: Message = { id: (Date.now() + 1).toString(), type: "bot", text: botText };
            setMessages(prev => [...prev, botMsg]);
        }, 600);
    };

    const quickReplies = [
        { id: "products", label: "Our Products", icon: <Package size={14} /> },
        { id: "location", label: "Store Location", icon: <MapPin size={14} /> },
        { id: "hours", label: "Business Hours", icon: <Clock size={14} /> },
        { id: "contact", label: "Contact Info", icon: <Info size={14} /> },
    ];

    const whatsappUrl = "https://wa.me/919767287755?text=Hello%20Shreeraj%20Trading%20Co.,%20I%20have%20an%20inquiry.";

    return (
        <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[90] font-sans">
            {/* Chatbot Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/30 transition-all duration-500 hover:scale-110 active:scale-95 z-50 relative ${isOpen ? "rotate-90 opacity-0 pointer-events-none" : "rotate-0 opacity-100"}`}
                aria-label="Open chat"
            >
                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20 hidden md:block"></div>
                <MessageCircle size={28} />
            </button>

            {/* Chatbot Panel */}
            <div className={`absolute bottom-0 right-0 w-[calc(100vw-3rem)] sm:w-[380px] bg-[#0f172a] rounded-[2rem] border border-white/10 shadow-3xl shadow-black/50 overflow-hidden flex flex-col transition-all duration-500 origin-bottom-right ${isOpen ? "scale-100 opacity-100 translate-y-0 pointer-events-auto" : "scale-50 opacity-0 translate-y-10 pointer-events-none"}`} style={{ height: "600px", maxHeight: "calc(100vh - 6rem)" }}>

                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-primary-hover p-5 flex items-center justify-between relative overflow-hidden shrink-0">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <Bot className="text-white" size={20} />
                        </div>
                        <div>
                            <h3 className="text-white font-black text-sm tracking-tight leading-none mb-1">Shreeraj Assistant</h3>
                            <div className="flex items-center gap-1.5 text-[10px] text-white/80 font-bold uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors relative z-10"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}>
                            <div className={`max-w-[85%] rounded-2xl p-4 sm:p-5 text-sm font-medium leading-relaxed ${msg.type === "user"
                                ? "bg-primary text-white rounded-br-sm shadow-xl shadow-primary/10"
                                : "bg-white/5 border border-white/10 text-slate-300 rounded-bl-sm"
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages[messages.length - 1]?.type === "bot" && (
                    <div className="px-5 pb-2 flex gap-2 overflow-x-auto scrollbar-none shrink-0 fade-in">
                        {quickReplies.map((reply) => (
                            <button
                                key={reply.id}
                                onClick={() => handleSend(reply.id, true)}
                                className="whitespace-nowrap px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-[11px] font-bold tracking-wide hover:bg-primary/20 hover:text-white hover:border-primary/50 transition-all"
                            >
                                {reply.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-white/5 shrink-0">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                        className="flex items-center gap-2 relative mb-3"
                    >
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim()}
                            className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover transition-colors shrink-0"
                        >
                            <Send size={16} className={inputValue.trim() ? "translate-x-0.5 -translate-y-0.5 transition-transform" : ""} />
                        </button>
                    </form>

                    {/* WhatsApp Handoff */}
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all group"
                    >
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        Connect on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}

// Temporary icon to avoid import issues from lucide-react if 'Package' wasn't auto-imported
function Package({ size, className }: { size?: number, className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
}
