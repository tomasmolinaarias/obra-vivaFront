import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    CheckCircle2,
    AlertCircle,
    FileText,
    Upload,
    User,
    Building2,
    HardHat,
    Stethoscope,
    ClipboardCheck,
    Calendar,
    PenTool,
} from "lucide-react";

export default function UsuarioDetallePage() {
    // Mock Data based on the sketch
    const worker = {
        name: "Juan Pérez González",
        role: "Maestro Primera",
        company: "Constructora Las Peñas (Subcontrato)",
        status: "Permanente",
        avatar: "JP",
    };

    const documentation = [
        { title: "Ficha de Ingreso", status: "completed" },
        { title: "Entrega de EPP", status: "completed" },
        { title: "Inducción de Seguridad de Obra", status: "completed" },
        { title: "Reglamento Interno (RIOHS)", status: "pending" },
    ];

    const health = [
        { title: "Afiliación Mutual de Seguridad", status: "completed" },
        { title: "Exámenes Preocupacionales", status: "missing", action: "Adjuntar" },
    ];

    const talks = [
        { title: "5 Minutos - Trabajo en Altura", date: "20/12/2025", status: "signed" },
        { title: "Uso Correcto de EPP", date: "18/12/2025", status: "signed" },
        { title: "Riesgos Eléctricos", date: "Today", status: "pending_signature" },
    ];

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
            {/* Header Profile */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white p-6 rounded-xl border shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border-2 border-white shadow-sm">
                        <User className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{worker.name}</h1>
                        <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <HardHat className="h-4 w-4" /> {worker.role}
                            </span>
                            <span className="hidden md:inline">•</span>
                            <span className="flex items-center gap-1">
                                <Building2 className="h-4 w-4" /> {worker.company}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                        {worker.status}
                    </Badge>
                    <Button>
                        Editar Perfil
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Documentación */}
                <Card className="shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                            Documentación
                        </CardTitle>
                        <CardDescription>Documentos contractuales y de seguridad</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {documentation.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <span className="text-sm font-medium text-slate-700">{doc.title}</span>
                                {doc.status === "completed" ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                    <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
                                        Pendiente
                                    </Badge>
                                )}
                            </div>
                        ))}
                        <Separator />
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 opacity-60">
                            <span className="text-sm font-medium text-slate-700 line-through">Documentación Técnica</span>
                            <span className="text-xs text-slate-400">No requerida</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Salud Ocupacional */}
                <Card className="shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Stethoscope className="h-5 w-5 text-red-500" />
                            Salud Ocupacional
                        </CardTitle>
                        <CardDescription>Mutualidades y exámenes médicos</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {health.map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-700">{item.title}</span>
                                    {item.status === "completed" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                    {item.status === "missing" && <AlertCircle className="h-5 w-5 text-red-500" />}
                                </div>
                                {item.action === "Adjuntar" && (
                                    <Button variant="outline" size="sm" className="w-full mt-1 border-dashed text-slate-500 hover:text-slate-700">
                                        <Upload className="h-4 w-4 mr-2" /> Adjuntar Documento
                                    </Button>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Charlas & Seguridad */}
                <Card className="shadow-sm border-slate-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <ClipboardCheck className="h-5 w-5 text-green-600" />
                            Charlas de Seguridad
                        </CardTitle>
                        <CardDescription>Asistencia y firmas pendientes</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {talks.map((talk, idx) => (
                            <div key={idx} className="flex items-start justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-slate-700">{talk.title}</p>
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <Calendar className="h-3 w-3" /> {talk.date}
                                    </div>
                                </div>
                                {talk.status === "signed" ? (
                                    <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                        <PenTool className="h-3 w-3" /> Firmada
                                    </div>
                                ) : (
                                    <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700">
                                        Firmar
                                    </Button>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
