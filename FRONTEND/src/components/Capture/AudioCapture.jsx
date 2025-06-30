import { useReactMediaRecorder } from 'react-media-recorder';

const VoiceRecorder = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl
  } = useReactMediaRecorder({ audio: true });


  const handleDownload = () => {
    if (!mediaBlobUrl) return;
    
    const link = document.createElement('a');
    link.href = mediaBlobUrl;
    link.download = `enregistrement-${new Date().toISOString()}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Traduction des status pour un affichage plus user-friendly
  const statusMessages = {
    idle: "Prêt à enregistrer",
    recording: "Enregistrement en cours...",
    stopped: "Enregistrement terminé"
  };

  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Enregistrement vocal</h2>
      
      <div className="flex flex-wrap gap-3 mb-4">
        <button 
          onClick={startRecording}
          disabled={status === 'recording'}
          className={`px-4 py-2 rounded-md font-medium ${
            status === 'recording' 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Démarrer
        </button>
        
        <button 
          onClick={stopRecording}
          disabled={status !== 'recording'}
          className={`px-4 py-2 rounded-md font-medium ${
            status !== 'recording' 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Arrêter
        </button>
        
        {mediaBlobUrl && (
          <>
            <button 
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium"
            >
              Télécharger
            </button>
            <button 
              onClick={clearBlobUrl}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium"
            >
              Effacer
            </button>
          </>
        )}
      </div>

      <div className="mb-4">
        <p className={`font-medium ${
          status === 'recording' ? 'text-red-600' : 'text-gray-600'
        }`}>
          Statut: {statusMessages[status] || status}
        </p>
        {status === 'recording' && (
          <div className="mt-2 flex items-center">
            <div className="h-2 w-2 rounded-full bg-red-600 mr-2 animate-pulse"></div>
            <span className="text-sm text-red-600">En cours</span>
          </div>
        )}
      </div>
      
      {mediaBlobUrl && (
        <div className="mt-4">
          <audio 
            src={mediaBlobUrl} 
            controls 
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;