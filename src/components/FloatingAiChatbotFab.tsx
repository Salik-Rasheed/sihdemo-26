import React from 'react';
import { Bot, Sparkles, MessageSquare } from 'lucide-react';

interface FloatingAiChatbotFabProps {
  onOpenChat: () => void;
  isOpen: boolean;
}

export const FloatingAiChatbotFab: React.FC<FloatingAiChatbotFabProps> = ({ onOpenChat, isOpen }) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-20 md:bottom-7 right-5 md:right-7 z-50 group">
      
      {/* Tooltip on Hover */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold whitespace-nowrap shadow-xl border border-slate-700 animate-fade-in pointer-events-none">
        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
        <span>Ask Karm AI Assistant</span>
        <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-slate-900" />
      </div>

      {/* Outer Glowing Ring Container */}
      <button
        onClick={onOpenChat}
        className="relative flex items-center justify-center p-[3px] rounded-full bg-gradient-to-tr from-[#047857] via-[#059669] to-emerald-400 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none ring-4 ring-[#047857]/20"
        aria-label="Open Karm AI Assistant"
      >
        {/* Inner Floating Button matching WhatsApp Meta AI style */}
        <div className="h-13 w-13 sm:h-14 sm:w-14 rounded-full bg-[#091328] hover:bg-[#065f46] text-white flex items-center justify-center relative transition-colors shadow-inner">
          <Bot className="h-7 w-7 text-white stroke-[2.2] transform group-hover:rotate-12 transition-transform duration-300" />

          {/* Active AI Sparkle Badge */}
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 font-black text-[9px] flex items-center justify-center border-2 border-[#091328] shadow-xs">
            ✨
          </span>

          {/* Live Pulsing Online Green Indicator */}
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-[#091328] animate-ping" />
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-[#091328]" />
        </div>
      </button>

    </div>
  );
};
