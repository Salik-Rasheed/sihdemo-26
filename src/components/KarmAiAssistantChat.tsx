import React, { useState } from 'react';
import { ChatMessage } from '../types/karmai';
import { karmaAiService } from '../services/karmaiService';
import { Bot, Send, X, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

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
      text: "Namaste Karmayogi! 👋 I am your AI Learning Intelligence Assistant. How can I assist with your competency profile, skill gaps, or iGOT learning roadmap today?",
      timestamp: "Just now",
      suggestedActions: [
        { label: "What is my biggest competency gap?", action: "gaps" },
        { label: "Which iGOT course should I take next?", action: "course" },
        { label: "Create a 30-day learning plan", action: "plan" }
      ]
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState("");

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `USER-${Date.now()}`,
      sender: 'USER',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputPrompt("");

    setTimeout(() => {
      const responseMsg = karmaAiService.getAssistantResponse(query);
      setMessages(prev => [...prev, responseMsg]);
    }, 400);
  };

  const handleActionClick = (action: string) => {
    if (action === 'gap-analysis' || action === 'gaps') {
      onNavigateToTab('gap-analysis');
      onClose();
    } else if (action === 'igot-courses' || action === 'start-course' || action === 'course') {
      onNavigateToTab('igot-courses');
      onClose();
    } else if (action === 'upload-studio') {
      onNavigateToTab('material-studio');
      onClose();
    } else if (action === 'plan') {
      onNavigateToTab('learning-path');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="card-panel max-w-lg w-full rounded-2xl bg-white border border-slate-300 shadow-2xl relative flex flex-col h-[560px]">
        
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <span>KarmAI Assistant</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-900 text-purple-200 border border-purple-700">AI Active</span>
              </h3>
              <p className="text-[11px] text-slate-300">Contextual Skill Intelligence Advisor</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'USER' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                  m.sender === 'USER'
                    ? 'bg-blue-700 text-white font-semibold rounded-br-none'
                    : 'bg-white text-slate-900 font-medium border border-slate-200 shadow-2xs rounded-bl-none'
                }`}
              >
                {m.text}
              </div>

              {/* Suggested Action Pills */}
              {m.suggestedActions && m.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {m.suggestedActions.map((act, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (act.action === 'gaps' || act.action === 'course' || act.action === 'plan') {
                          handleSend(act.label);
                        } else {
                          handleActionClick(act.action);
                        }
                      }}
                      className="px-2.5 py-1 rounded bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-[11px] transition shadow-2xs"
                    >
                      {act.label} →
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 rounded-b-2xl flex items-center space-x-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask KarmAI about your skill gaps or courses..."
            className="flex-grow bg-slate-100 border border-slate-300 rounded px-3 py-2 text-xs font-semibold text-slate-900 outline-none"
          />
          <button
            onClick={() => handleSend()}
            className="p-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold transition border border-blue-800"
          >
            <Send className="h-4 w-4 text-orange-300" />
          </button>
        </div>

      </div>
    </div>
  );
};
