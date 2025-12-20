import { useState } from "react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { AlertCircle, Zap } from "lucide-react";

export function RiskMeter() {
    const [riskLevel, setRiskLevel] = useState(15);

    const simulateIncident = () => {
        // Animate the risk level going up
        let progress = 15;
        const interval = setInterval(() => {
            progress += 2;
            setRiskLevel(progress);
            if (progress >= 95) {
                clearInterval(interval);

                // Trigger Toast Alert
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "warning",
                    title: "Detectado: Trabajador sin arnés en Zona B",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    background: "#FEF2F2",
                    color: "#991B1B",
                });
            }
        }, 20); // Fast update for smoothness
    };

    // Determine color and status based on level
    let colorClass = "text-green-500";
    let statusText = "NIVEL SEGURO";

    if (riskLevel > 40 && riskLevel <= 80) {
        colorClass = "text-orange-500";
        statusText = "PRECAUCIÓN";
    } else if (riskLevel > 80) {
        colorClass = "text-red-600";
        statusText = "¡ALERTA CRÍTICA!";
    }

    // Calculate rotation for semi-circle (0 to 180 degrees)
    // 0% -> -90deg (left)
    // 100% -> 90deg (right)


    return (
        <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200">

            {/* Gauge Container */}
            <div className="relative w-64 h-32 overflow-hidden mb-4">
                {/* Background Arc */}
                <div className="absolute top-0 left-0 w-full h-64 rounded-full border-[20px] border-slate-200 box-border"></div>

                {/* Progress Arc - This is a bit tricky with pure CSS borders/rotation without SVG, 
            so we'll use a rotated masking approach or just SVG for better control. 
            Let's use a simpler SVG approach for the meter itself. */}
                <svg viewBox="0 0 200 100" className="w-full h-full">
                    {/* Background path */}
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e2e8f0" strokeWidth="20" strokeLinecap="round" />

                    {/* Value path */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="20"
                        strokeLinecap="round"
                        className={`${colorClass} transition-all duration-300 ease-out`}
                        strokeDasharray="251.2" // Circumference of semi-circle (PI * R) ~ 3.14 * 80
                        strokeDashoffset={251.2 - (251.2 * riskLevel) / 100}
                    />
                </svg>

                {/* Needle/Text Overlay */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <span className={`text-4xl font-bold ${colorClass} transition-colors duration-300`}>
                        {riskLevel}%
                    </span>
                </div>
            </div>

            {/* Status Text */}
            <div className="h-8 mb-6">
                {riskLevel > 80 ? (
                    <div className="flex items-center gap-2 text-red-600 font-bold animate-pulse text-lg">
                        <AlertCircle className="h-6 w-6" />
                        {statusText}
                    </div>
                ) : (
                    <span className={`font-semibold text-lg ${colorClass}`}>
                        {statusText}
                    </span>
                )}
            </div>

            {/* Simulation Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={simulateIncident}
                disabled={riskLevel > 90}
                className="text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center gap-1"
            >
                <Zap className="h-3 w-3" /> Simular Incidente
            </Button>
        </div>
    );
}
