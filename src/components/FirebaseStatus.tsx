import { AlertCircle, Wifi, WifiOff } from "lucide-react";
import { useFirebaseStatus } from "../hooks/useFirebase";

export function FirebaseStatus() {
  const { isConnected, isLoading } = useFirebaseStatus();

  if (isLoading) {
    return null; // No mostrar nada mientras carga
  }

  if (isConnected) {
    return null; // Todo bien, no mostrar nada
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        <div className="flex-1">
          <h4 className="text-amber-800 font-medium mb-1">Modo Demo Activo</h4>
          <p className="text-amber-700 text-sm">
            La aplicación está funcionando con datos de demostración. Para
            conectar con Firebase, consulta el archivo{" "}
            <code className="bg-amber-100 px-1 rounded">FIREBASE_SETUP.md</code>
            .
          </p>
        </div>
        <WifiOff className="w-5 h-5 text-amber-600" />
      </div>
    </div>
  );
}

// Componente para mostrar en el footer
export function ConnectionIndicator() {
  const { isConnected, isLoading } = useFirebaseStatus();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-500 text-xs">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <span>Conectando...</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 text-xs ${
        isConnected ? "text-green-600" : "text-amber-600"
      }`}
    >
      {isConnected ? (
        <>
          <Wifi className="w-3 h-3" />
          <span>Firebase conectado</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3" />
          <span>Modo demo</span>
        </>
      )}
    </div>
  );
}
