'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface MentorChatProps {
  initialMessages?: Message[];
  compact?: boolean;
}

export default function MentorChat({ initialMessages = [], compact = false }: MentorChatProps) {
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.length > 0 ? initialMessages : [
      {
        role: 'assistant',
        content: 'Olá! Sou o teu Mentor IA. Estou aqui para te guiar no teu percurso académico. Como posso ajudar-te hoje?',
        timestamp: new Date().toISOString(),
      },
    ]
  );
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input.trim(), timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (replace with real API call)
    setTimeout(() => {
      const responses = [
        'Excelente pergunta! Vamos analisar isso juntos. Com base no teu progresso actual, recomendo que focuses nas competências fundamentais primeiro.',
        'Entendo a tua dúvida. No contexto angolano, esta é uma questão muito relevante. Deixa-me explicar passo a passo.',
        'Muito bem! Estás no caminho certo. Vejo que completaste 65% do termo. Continua assim e vais atingir os teus objetivos antes do prazo.',
      ];
      const reply: Message = {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`flex flex-col bg-white rounded-2xl border border-gray-200 ${compact ? 'h-80' : 'h-full'}`}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-blue-900 rounded-t-2xl">
        <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-lg">🤖</div>
        <div>
          <p className="font-semibold text-white text-sm">Mentor IA — PORTECOS</p>
          <p className="text-xs text-blue-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Disponível 24/7
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-blue-900 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-1">🤖</div>
            )}
            <div
              className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-900 text-white rounded-tr-sm'
                  : 'bg-gray-100 text-gray-800 rounded-tl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-blue-900 flex items-center justify-center text-xs mr-2">🤖</div>
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Escreve a tua pergunta..."
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
