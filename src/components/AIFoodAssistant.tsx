import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, Plus, RefreshCw } from 'lucide-react';
import { MenuItem, ChatMessage } from '../types/restaurant';
import { MENU_ITEMS } from '../data/restaurantData';

interface AIFoodAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  onSelectItem: (item: MenuItem) => void;
}

export const AIFoodAssistant: React.FC<AIFoodAssistantProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onSelectItem
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Good evening. Welcome to Aurelia. As your Sommelier & Dining Concierge, I can guide you through our seasonal carte, recommend pairings from our cellar, or tailor courses around your dietary preferences and budget.',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<number | undefined>(undefined);
  const [selectedSpice, setSelectedSpice] = useState<number | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Recommend a 3-course romantic dinner',
    'Best vegetarian courses',
    'What wine pairs best with Wagyu?',
    'Lighter courses under $45',
    'Something bold and spicy',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [messages, isOpen, onClose]);

  const handleSend = async (textToSend?: string) => {
    const prompt = (textToSend || input).trim();
    if (!prompt || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          diet: selectedDiet,
          budget: selectedBudget,
          spice: selectedSpice,
          history: messages.slice(-4).map((m) => ({ sender: m.sender, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error('Assistant endpoint error');
      }

      const data = await response.json();

      let matchedDishes: MenuItem[] = [];
      if (Array.isArray(data.suggestedDishes) && data.suggestedDishes.length > 0) {
        matchedDishes = data.suggestedDishes
          .map((id: string) =>
            MENU_ITEMS.find(
              (m) =>
                m.id.toLowerCase() === id.toLowerCase() ||
                m.name.toLowerCase().includes(id.toLowerCase())
            )
          )
          .filter(Boolean) as MenuItem[];
      }

      if (matchedDishes.length === 0) {
        matchedDishes = MENU_ITEMS.filter((item) =>
          data.response.toLowerCase().includes(item.name.toLowerCase())
        ).slice(0, 3);
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text:
          data.response ||
          'I am delighted to guide your palate. Please explore our signature Wagyu or Diver Scallops for an unforgettable evening.',
        suggestedDishes: matchedDishes.length > 0 ? matchedDishes : undefined,
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const keywords = prompt.toLowerCase();
      let fallbackDishes = MENU_ITEMS.slice(0, 2);
      if (keywords.includes('vegetarian')) {
        fallbackDishes = MENU_ITEMS.filter((i) => i.dietary.includes('vegetarian')).slice(0, 2);
      } else if (keywords.includes('wine') || keywords.includes('cocktail')) {
        fallbackDishes = MENU_ITEMS.filter((i) => i.category === 'drinks').slice(0, 2);
      }

      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: `At Aurelia, our seasonal tasting is orchestrated around purity of flavor. Based on your note, our culinary team strongly recommends the ${fallbackDishes
          .map((d) => `${d.name} ($${d.price})`)
          .join(' and ')}. Would you like me to add these to your tasting selection?`,
        suggestedDishes: fallbackDishes,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full sm:w-[460px] h-[92dvh] sm:h-[640px] max-h-[100dvh] bg-[#0c0d11] border border-white/[0.08] sm:rounded-sm shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Sommelier and Concierge AI Desk"
      >
        
        {/* Assistant Header */}
        <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-[#101116] border-b border-white/[0.07] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#c9a84e]/10 border border-[#c9a84e]/30 flex items-center justify-center text-[#c9a84e]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-medium text-[#f7f5f0] tracking-wide">
                Sommelier & Concierge Desk
              </h3>
              <p className="text-[10px] text-[#7d7a72] uppercase tracking-wider">
                Aurelia Digital Maître d’
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7d7a72] hover:text-[#f7f5f0] hover:bg-white/5 rounded-sm transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Quick Bar */}
        <div className="px-4 py-2 bg-[#0e0f14] border-b border-white/[0.05] flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px] text-[#8c8980]">
          <span className="shrink-0 text-[#63615b]">Refine:</span>
          
          <select
            value={selectedDiet}
            onChange={(e) => setSelectedDiet(e.target.value)}
            className="bg-[#14151b] text-[#c9c6bd] px-2 py-1 rounded-sm border border-white/10 text-[11px] focus:outline-none focus:border-[#c9a84e] min-h-[30px]"
            aria-label="Filter by dietary preference"
          >
            <option value="">All Dietary</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-Free</option>
          </select>

          <select
            value={selectedBudget || ''}
            onChange={(e) => setSelectedBudget(e.target.value ? Number(e.target.value) : undefined)}
            className="bg-[#14151b] text-[#c9c6bd] px-2 py-1 rounded-sm border border-white/10 text-[11px] focus:outline-none focus:border-[#c9a84e] min-h-[30px]"
            aria-label="Filter by budget"
          >
            <option value="">Any Budget</option>
            <option value="35">Under $35</option>
            <option value="60">Under $60</option>
            <option value="100">Under $100</option>
          </select>

          <select
            value={selectedSpice !== undefined ? selectedSpice : ''}
            onChange={(e) => setSelectedSpice(e.target.value !== '' ? Number(e.target.value) : undefined)}
            className="bg-[#14151b] text-[#c9c6bd] px-2 py-1 rounded-sm border border-white/10 text-[11px] focus:outline-none focus:border-[#c9a84e] min-h-[30px]"
            aria-label="Filter by heat level"
          >
            <option value="">Any Spice</option>
            <option value="0">Zero Heat</option>
            <option value="1">Mild Heat (1/3)</option>
            <option value="3">Bold Spice (3/3)</option>
          </select>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-6 h-6 rounded-sm bg-[#c9a84e]/10 border border-[#c9a84e]/30 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 text-[#c9a84e]" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div
                  className={`p-3.5 rounded-sm text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#c9a84e] text-[#090a0c] font-medium'
                      : 'bg-[#121319] text-[#dedbd4] border border-white/[0.08]'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Suggested Dishes Mini Cards */}
                {msg.suggestedDishes && msg.suggestedDishes.length > 0 && (
                  <div className="space-y-2 pt-1 text-left">
                    <span className="text-[10px] uppercase tracking-wider text-[#c9a84e] font-medium block">
                      Recommended by the Sommelier:
                    </span>
                    {msg.suggestedDishes.map((dish) => (
                      <div
                        key={dish.id}
                        className="bg-[#15161d] p-2.5 rounded-sm border border-white/[0.08] flex items-center justify-between gap-3 hover:border-[#c9a84e]/40 transition-colors"
                      >
                        <div
                          onClick={() => onSelectItem(dish)}
                          className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
                        >
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-10 h-10 object-cover rounded-sm shrink-0 border border-white/5"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-serif text-[#f7f5f0] truncate">{dish.name}</p>
                            <p className="text-[11px] text-[#c9a84e] tabular-nums font-serif">${dish.price}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => onAddToCart(dish)}
                          className="p-1.5 bg-[#c9a84e] text-[#090a0c] rounded-sm hover:bg-[#d8b85c] transition-colors shrink-0"
                          title="Add to Tasting Flight"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-sm bg-white/10 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-3.5 h-3.5 text-[#dedbd4]" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#8c8980] py-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#c9a84e]" />
              <span className="font-light italic">Consulting cellar logs and head sommelier...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-white/[0.05] bg-[#0e0f14] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 text-[10px] sm:text-[11px] bg-white/[0.04] hover:bg-[#c9a84e]/15 hover:text-[#c9a84e] text-[#8c8980] border border-white/5 rounded-sm whitespace-nowrap transition-colors min-h-[30px] flex items-center"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-[#111217] border-t border-white/[0.08] flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about pairings, seasonal courses, dietary requests..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 bg-[#16171f] text-[#f7f5f0] placeholder-[#63615b] text-base sm:text-xs px-3.5 py-2.5 rounded-sm border border-white/10 focus:outline-none focus:border-[#c9a84e] min-h-[42px]"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 bg-[#c9a84e] text-[#090a0c] hover:bg-[#d8b85c] disabled:opacity-40 disabled:cursor-not-allowed rounded-sm transition-colors min-w-[42px] min-h-[42px] flex items-center justify-center active:scale-95 shrink-0"
            aria-label="Send Query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
