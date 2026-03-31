interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

interface StepIndicatorProps {
  steps: Step[];
}

export default function StepIndicator({ steps }: StepIndicatorProps) {
  return (
    <div className="relative">
      {/* Connector line */}
      <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-900 to-yellow-400 z-0" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {steps.map((step, i) => (
          <div key={step.number} className="flex flex-col items-center text-center">
            <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center mb-4 shadow-lg ${
              i % 2 === 0 ? 'bg-blue-900 text-white' : 'bg-yellow-400 text-blue-900'
            }`}>
              <span className="text-2xl">{step.icon}</span>
              <span className="text-xs font-bold mt-0.5">Passo {step.number}</span>
            </div>
            <h3 className="font-bold text-blue-900 text-base mb-1">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
