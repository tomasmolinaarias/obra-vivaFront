import planoObra from '@/assets/plano_obra.png';

type NivelRiesgo = 'alto' | 'medio' | 'bajo';

interface RiskPoint {
    x: number;
    y: number;
    nivel: NivelRiesgo;
    label?: string; // Optional label for debugging/clarity
}

const MOCK_RISKS: RiskPoint[] = [
    { x: 20, y: 30, nivel: 'alto', label: 'Zona de excavación' },
    { x: 50, y: 50, nivel: 'medio', label: 'Zona de grúa' },
    { x: 80, y: 80, nivel: 'bajo', label: 'Bodega' }
];

export function RiskHeatmap() {
    const getRiskColor = (nivel: NivelRiesgo) => {
        switch (nivel) {
            case 'alto': return 'bg-red-500 shadow-red-500/50';
            case 'medio': return 'bg-orange-500 shadow-orange-500/50';
            case 'bajo': return 'bg-green-500 shadow-green-500/50';
        }
    };

    return (
        <div className="relative w-full h-[400px] border rounded-xl overflow-hidden bg-slate-100 shadow-inner">
            {/* Real Site Plan Image */}
            <img
                src={planoObra}
                alt="Plano de Obra"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
            />

            {/* Helper Grid (Optional, kept for tech feel) */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-10 mix-blend-multiply">
                {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="border border-slate-400" />
                ))}
            </div>

            {MOCK_RISKS.map((risk, idx) => {
                const colorClass = getRiskColor(risk.nivel);
                const isAlto = risk.nivel === 'alto';

                return (
                    <div
                        key={idx}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                        style={{ left: `${risk.x}%`, top: `${risk.y}%` }}
                    >
                        {/* The Heat point */}
                        <div className={`
              w-8 h-8 rounded-full ${colorClass} opacity-80 blur-[2px] shadow-[0_0_15px_rgba(0,0,0,0.3)]
              ${isAlto ? 'animate-pulse' : ''}
              hover:scale-125 transition-transform duration-300
            `}>
                            {/* Inner dot for precision */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/50 rounded-full" />
                        </div>

                        {/* Optional ping animation for High risks */}
                        {isAlto && (
                            <div className={`absolute -inset-4 rounded-full ${colorClass} opacity-20 animate-ping`} />
                        )}

                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                            {risk.label || risk.nivel.toUpperCase()}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
