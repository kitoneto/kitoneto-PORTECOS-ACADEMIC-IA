interface TestimonialCardProps {
  quote: string;
  name: string;
  program: string;
  year: number;
  province?: string;
  avatarEmoji?: string;
}

export default function TestimonialCard({ quote, name, program, year, province, avatarEmoji = '👤' }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
      <div className="text-3xl text-yellow-400 font-serif mb-3">"</div>
      <p className="text-gray-700 text-sm flex-1 leading-relaxed italic mb-4">"{quote}"</p>
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
          {avatarEmoji}
        </div>
        <div>
          <p className="font-semibold text-blue-900 text-sm">{name}</p>
          <p className="text-xs text-gray-500">{program} · {year}{province ? ` · ${province}` : ''}</p>
        </div>
      </div>
    </div>
  );
}
