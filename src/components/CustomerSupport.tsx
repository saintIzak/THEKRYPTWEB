import { useState } from 'react';
import { MessageCircle, X, Send, Headphones, Package, Truck, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    timestamp: Date;
}

export default function CustomerSupport() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'bot',
            text: 'Hi! How can I help you today?',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');

        // Auto-reply and redirect to WhatsApp
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: "Thank you for contacting us! Opening WhatsApp now...",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);

            // Open WhatsApp with pre-filled message
            setTimeout(() => {
                const whatsappMessage = encodeURIComponent(`Hello THE KRYPT! I need help with: ${inputValue}`);
                const whatsappUrl = `https://wa.me/254750404477?text=${whatsappMessage}`;
                window.open(whatsappUrl, '_blank');

                // Show confirmation message
                const confirmMessage: Message = {
                    id: (Date.now() + 2).toString(),
                    sender: 'bot',
                    text: "WhatsApp opened! Just click 'Send' to send your message to us.",
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, confirmMessage]);
            }, 1500);
        }, 1000);
    };

    const handleQuickAction = (action: string) => {
        setInputValue(action);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 rounded-none bg-red-600 px-3 py-2 sm:px-4 sm:py-3 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] border border-red-500 transition-all hover:scale-105 animate-bounce-slow"
                >
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <div className="flex flex-col items-start text-[8px] sm:text-[10px] font-black uppercase tracking-widest">
                        <span>WE ARE ONLINE</span>
                        <span className="opacity-70">NEED INTEL?</span>
                    </div>
                    <span className="absolute -right-1 -top-1 flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center bg-white text-[7px] sm:text-[8px] font-black text-red-600">
                        1
                    </span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 h-[450px] sm:h-[500px] w-[calc(100vw-32px)] sm:w-96 rounded-none border-2 border-red-600 bg-zinc-950 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-red-600 px-4 py-3 text-white">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-none bg-white/20">
                                <Headphones className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-black uppercase tracking-tighter text-sm">TACTICAL SUPPORT</h3>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
                                    <span>SYSTEMS ONLINE</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-white/20 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex h-[calc(500px-180px)] flex-col gap-4 overflow-y-auto bg-zinc-900 p-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-none px-4 py-2 ${message.sender === 'user'
                                        ? 'bg-red-600 text-white font-bold'
                                        : 'bg-zinc-800 text-white border border-zinc-700'
                                        }`}
                                >
                                    <p className="text-xs">{message.text}</p>
                                    <p className="mt-1 text-[8px] font-black uppercase tracking-widest opacity-50">
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-2">
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuickAction('Track Order')}
                                className="flex-shrink-0 border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-red-600 hover:text-red-500 rounded-none text-[10px] font-black uppercase tracking-widest"
                            >
                                <Package className="mr-1 h-3 w-3" />
                                TRACK ORDER
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuickAction('Shipping Info')}
                                className="flex-shrink-0 border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-red-600 hover:text-red-500 rounded-none text-[10px] font-black uppercase tracking-widest"
                            >
                                <Truck className="mr-1 h-3 w-3" />
                                SHIPPING INFO
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuickAction('Returns')}
                                className="flex-shrink-0 border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-red-600 hover:text-red-500 rounded-none text-[10px] font-black uppercase tracking-widest"
                            >
                                <RotateCcw className="mr-1 h-3 w-3" />
                                RETURNS
                            </Button>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-zinc-800 bg-zinc-950 p-4">
                        <div className="flex gap-2">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="TYPE MESSAGE..."
                                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-red-600 rounded-none text-xs font-bold uppercase tracking-widest"
                            />
                            <Button
                                onClick={handleSend}
                                className="bg-red-600 hover:bg-red-700 rounded-none"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

