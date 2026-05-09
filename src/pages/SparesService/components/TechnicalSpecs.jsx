import { Settings, Gauge, Layers, Cpu } from 'lucide-react';

const icons = [Settings, Gauge, Layers, Cpu];

function TechnicalSpecs({ specs }) {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {specs.map((spec, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div 
              key={spec.label} 
              className="bg-[#F4F7FB] rounded-xl p-4 hover:shadow-sm transition-all duration-300 flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-[#FF7A1A] opacity-80" />
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF7A1A]">
                  {spec.label}
                </p>
              </div>
              <p className="text-[15px] font-bold text-[#0F1E4A] leading-snug">
                {spec.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TechnicalSpecs;
