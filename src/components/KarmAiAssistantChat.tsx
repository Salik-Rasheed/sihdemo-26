import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types/karmai';
import { karmaAiService } from '../services/karmaiService';
import { Bot, Send, X, Sparkles, MessageSquare, ArrowRight, RefreshCw } from 'lucide-react';

interface KarmAiAssistantChatProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const KarmAiAssistantChat: React.FC<KarmAiAssistantChatProps> = ({ isOpen, onClose, onNavigateToTab }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "MSG-INIT",
      sender: "KARM_AI",
      text: "Namaste! 👋 Welcome to Karm AI Assistant.\n\nAsk me anything — greetings, portal navigation, ideas for developing your skills, or any question you have!",
      timestamp: "Just now",
      suggestedActions: [
        { label: "💡 Ideas to develop my skills", action: "skill-ideas" },
        { label: "❓ How do I use this website?", action: "website-help" },
        { label: "📊 What are my skill gaps?", action: "gaps" },
        { label: "🎓 Recommended iGOT courses", action: "course" }
      ]
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `USER-${Date.now()}`,
      sender: 'USER',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputPrompt("");
    setIsTyping(true);

    setTimeout(() => {
      const responseMsg = karmaAiService.getAssistantResponse(query);
      setMessages(prev => [...prev, responseMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action: string, label: string) => {
    if (action === 'gap-analysis' || action === 'gaps') {
      onNavigateToTab('gap-analysis');
      onClose();
    } else if (action === 'igot-courses' || action === 'start-course' || action === 'course') {
      onNavigateToTab('igot-courses');
      onClose();
    } else if (action === 'upload-studio' || action === 'material-studio') {
      onNavigateToTab('material-studio');
      onClose();
    } else if (action === 'plan' || action === 'learning-path') {
      onNavigateToTab('learning-path');
      onClose();
    } else if (action === 'competency-profile') {
      onNavigateToTab('competency-profile');
      onClose();
    } else if (action === 'admin-dashboard' || action === 'org-heatmap') {
      onNavigateToTab('org-heatmap');
      onClose();
    } else if (action === 'sys-settings') {
      onNavigateToTab('sys-settings');
      onClose();
    } else if (action === 'dashboard') {
      onNavigateToTab('dashboard');
      onClose();
    } else {
      handleSend(label);
    }
  };

  // Helper to render markdown bolding & formatting nicely
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, lIdx) => {
      if (!line.trim()) return <div key={lIdx} className="h-1.5" />;
      
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={lIdx} className={lIdx > 0 ? 'mt-1' : ''}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-extrabold text-slate-950 dark:text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={pIdx} className="italic text-slate-600 dark:text-slate-300">{part.slice(1, -1)}</em>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="card-panel max-w-xl w-full rounded-2xl bg-white border border-slate-300 shadow-2xl relative flex flex-col h-[600px] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <span>Karm AI Assistant</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900 text-purple-200 border border-purple-700 font-bold">
                  AI Active
                </span>
              </h3>
              <p className="text-[11px] text-slate-300">MoSPI Skill Intelligence & iGOT Advisor</p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Close Assistant"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-grow p-4 overflow-y-auto space-y-3.5 bg-slate-50 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'USER' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-3.5 rounded-2xl max-w-[88%] leading-relaxed shadow-sm ${
                  m.sender === 'USER'
                    ? 'bg-[#047857] text-white font-medium rounded-br-xs'
                    : 'bg-white text-slate-900 font-normal border border-slate-200 rounded-bl-xs'
                }`}
              >
                {renderFormattedText(m.text)}
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-slate-400 px-1 mt-0.5 font-medium">
                {m.timestamp}
              </span>

              {/* Suggested Action Pills */}
              {m.suggestedActions && m.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                  {m.suggestedActions.map((act, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleActionClick(act.action, act.label)}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-[11px] transition shadow-xs flex items-center space-x-1 hover:shadow-sm"
                    >
                      <span>{act.label}</span>
                      <ArrowRight className="h-3 w-3 text-purple-600" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-2 p-3 rounded-2xl bg-white border border-slate-200 text-slate-500 text-xs w-max rounded-bl-xs">
              <Sparkles className="h-3.5 w-3.5 text-purple-600 animate-spin" />
              <span className="font-semibold text-slate-600">Karm AI is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Karm AI about your skill gaps, courses, or quizzes..."
            className="flex-grow bg-slate-100 border border-slate-300 focus:border-purple-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900 outline-none transition"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputPrompt.trim() || isTyping}
            className="p-2.5 rounded-xl bg-[#047857] hover:bg-[#065f46] disabled:opacity-40 text-white font-bold transition border border-[#047857] flex items-center justify-center"
          >
            <Send className="h-4 w-4 text-white" />
          </button>
        </div>

      </div>
    </div>
  );
};
