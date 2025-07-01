import React, { useState, useEffect, useRef } from 'react';
import { FaUpload, FaSave, FaPlay, FaStop, FaMicrophone, FaWifi } from 'react-icons/fa';
import { MdDelete, MdWifiOff } from 'react-icons/md';

const Quicknote = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioList, setAudioList] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState(null);
  const [networkStatus, setNetworkStatus] = useState({
    online: navigator.onLine,
    speechApiAvailable: false,
    mediaApiAvailable: false
  });

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  // Fonction helper pour les messages d'erreur
  const getErrorMessage = (errorCode) => {
    const errors = {
      'no-speech': 'Aucune parole détectée',
      'aborted': 'Reconnaissance vocale annulée',
      'audio-capture': 'Problème de capture audio',
      'network': 'Erreur de connexion avec le service de reconnaissance vocale',
      'not-allowed': 'Permission microphone refusée',
      'service-not-allowed': 'Service de reconnaissance non autorisé',
      'bad-grammar': 'Erreur dans la grammaire de reconnaissance',
      'language-not-supported': 'Français non supporté',
      'lyrics-not-found': 'Paroles non trouvées pour cette chanson',
      'offline-mode': 'Fonctionnalité disponible seulement en ligne',
      'google-api-error': 'Erreur avec le service Google'
    };
    return errors[errorCode] || `Erreur (${errorCode})`;
  };

  // Recherche des paroles via Google (simulation)
  const searchLyricsWithGoogle = async (filename) => {
    try {
      const cleanName = filename.replace(/\.[^/.]+$/, "");
      const [artist, title] = cleanName.split(" - ");
      
      if (!artist || !title) {
        throw new Error("lyrics-not-found");
      }

      const mockGoogleResponse = {
        lyrics: `Paroles de ${title} par ${artist}\n\n[Couplet 1]\n...\n\n[Refrain]\n...`
      };

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return mockGoogleResponse.lyrics || "Paroles non disponibles via Google";
    } catch (error) {
      console.error("Erreur recherche paroles Google:", error);
      throw new Error("google-api-error");
    }
  };

  // Charger les enregistrements existants et configurer la reconnaissance vocale
  useEffect(() => {
    // Vérifier les capacités du navigateur
    const speechAvailable = 'webkitSpeechRecognition' in window;
    const mediaAvailable = 'mediaDevices' in navigator && 'MediaRecorder' in window;
    
    setNetworkStatus(prev => ({
      ...prev,
      speechApiAvailable: speechAvailable,
      mediaApiAvailable: mediaAvailable
    }));

    // Chargement des enregistrements
    try {
      const savedAudios = JSON.parse(localStorage.getItem('audioNotes')) || [];
      setAudioList(savedAudios);
    } catch (e) {
      console.error('Erreur chargement enregistrements:', e);
    }

    // Configuration réseau
    const handleOnline = () => setNetworkStatus(prev => ({...prev, online: true}));
    const handleOffline = () => setNetworkStatus(prev => ({...prev, online: false}));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initialisation reconnaissance vocale
    if (speechAvailable) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'fr-FR';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscription(prev => {
          const base = prev.split('\n\n')[0] || '';
          return `${base}\n\n${finalTranscript}${interimTranscript}`;
        });
      };

      recognitionRef.current.onerror = (event) => {
        const errorMsg = getErrorMessage(event.error);
        console.error('Erreur reconnaissance:', event.error, errorMsg);
        setError(errorMsg);
        if (isRecording) {
          stopRecording();
        }
      };

      recognitionRef.current.onend = () => {
        setIsTranscribing(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      clearInterval(timerRef.current);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Gestion des fichiers audio
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes('audio')) {
      setAudioFile(file);
      setAudioUrl(URL.createObjectURL(file));
      setError(null);
    } else {
      setError('Veuillez sélectionner un fichier audio valide (MP3, WAV)');
    }
  };

  // Transcription audio et recherche de paroles
  const transcribeAudio = async () => {
    if (!audioUrl) {
      setError('Aucun fichier audio à transcrire');
      return;
    }

    setIsTranscribing(true);
    setTranscription("Traitement en cours...\n\n");
    setError(null);

    try {
      // Essayer d'abord de trouver les paroles via Google
      if (networkStatus.online) {
        try {
          const lyrics = await searchLyricsWithGoogle(audioFile.name);
          setTranscription(`Paroles trouvées pour "${audioFile.name}":\n\n${lyrics}`);
          setIsTranscribing(false);
          return;
        } catch (e) {
          console.log("Recherche de paroles Google échouée:", e.message);
        }
      }

      // Si pas de paroles trouvées ou hors ligne, utiliser la reconnaissance vocale
      if (recognitionRef.current) {
        if (!networkStatus.online) {
          throw new Error('offline-mode');
        }
        recognitionRef.current.start();
      } else {
        throw new Error('Reconnaissance vocale non disponible');
      }
    } catch (e) {
      console.error('Erreur transcription:', e);
      setError(getErrorMessage(e.message) || 'Erreur lors de la transcription');
      setIsTranscribing(false);
    }
  };

  // Gestion enregistrement audio local
  const startRecording = () => {
    if (!networkStatus.mediaApiAvailable) {
      setError('Enregistrement audio non supporté par votre navigateur');
      return;
    }

    setIsRecording(true);
    setRecordingTime(0);
    audioChunksRef.current = [];
    setError(null);

    navigator.mediaDevices.getUserMedia({ 
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      }
    })
      .then(stream => {
        const options = { 
          mimeType: 'audio/webm;codecs=opus',
          audioBitsPerSecond: 128000
        };
        
        try {
          mediaRecorderRef.current = new MediaRecorder(stream, options);
        } catch (e) {
          console.warn("Option webm non supportée, utilisation par défaut");
          mediaRecorderRef.current = new MediaRecorder(stream);
        }
        
        mediaRecorderRef.current.ondataavailable = (e) => {
          console.log("Chunk audio reçu, taille:", e.data.size);
          audioChunksRef.current.push(e.data);
        };
        
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: mediaRecorderRef.current.mimeType || 'audio/wav'
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audioFile = new File([audioBlob], `enregistrement-${new Date().toISOString()}.webm`, { 
            type: mediaRecorderRef.current.mimeType || 'audio/webm'
          });
          
          setAudioFile(audioFile);
          setAudioUrl(audioUrl);
          setTranscription("Enregistrement local terminé. Cliquez sur Transcrire pour analyser.");
        };
        
        mediaRecorderRef.current.start(100); // Collecte des chunks chaque 100ms
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);

        if (networkStatus.online && recognitionRef.current) {
          recognitionRef.current.start();
          setTranscription("Enregistrement en cours...\n\n");
        } else {
          setTranscription("Enregistrement local en cours...\n\n");
        }
      })
      .catch(err => {
        console.error("Erreur microphone:", err);
        setError(getErrorMessage(err.message) || 'Accès au microphone refusé');
        setIsRecording(false);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    clearInterval(timerRef.current);
    
    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Sauvegarde des notes
  const saveToLocalStorage = () => {
    if (!audioFile || !transcription.trim()) {
      setError('Aucune transcription à sauvegarder');
      return;
    }

    try {
      const newAudioNote = {
        id: Date.now(),
        fileName: audioFile.name,
        size: (audioFile.size / 1024).toFixed(2),
        transcription: transcription,
        date: new Date().toLocaleString(),
        audioUrl: audioUrl
      };

      const updatedAudios = [...audioList, newAudioNote];
      setAudioList(updatedAudios);
      localStorage.setItem('audioNotes', JSON.stringify(updatedAudios));
      
      setAudioFile(null);
      setAudioUrl('');
      setTranscription('');
      setRecordingTime(0);
      setError(null);
    } catch (e) {
      console.error('Erreur sauvegarde:', e);
      setError('Erreur lors de la sauvegarde');
    }
  };

  // Suppression d'un enregistrement
  const deleteRecording = (id) => {
    try {
      const updatedAudios = audioList.filter(audio => audio.id !== id);
      setAudioList(updatedAudios);
      localStorage.setItem('audioNotes', JSON.stringify(updatedAudios));
    } catch (e) {
      console.error('Erreur suppression:', e);
      setError('Erreur lors de la suppression');
    }
  };

  // Contrôle lecture audio
  const togglePlayback = () => {
    if (audioRef.current) {
      console.log("URL audio:", audioUrl);
      console.log("Audio readyState:", audioRef.current.readyState);
      
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => {
          console.error('Erreur lecture:', e, e.message);
          setError(`Erreur de lecture: ${e.message}`);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Formatage du temps
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[450px]">
        {/* En-tête avec indicateur réseau */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-blue-800">
            <FaMicrophone className="text-blue-600" />
            Transcription Vocale
            {!networkStatus.online && (
              <span className="text-xs text-red-600 ml-2 flex items-center">
                <MdWifiOff className="mr-1" /> Hors ligne
              </span>
            )}
          </div>
          <span className="text-gray-500 text-sm md:text-base">
            {new Date().toLocaleDateString()}
          </span>
        </div>

        {/* Affichage des erreurs */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {/* Section enregistrement */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex flex-col items-center mb-4">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!networkStatus.mediaApiAvailable}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl ${
                isRecording 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : networkStatus.mediaApiAvailable 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-400 cursor-not-allowed'
              } transition-colors`}
              title={!networkStatus.mediaApiAvailable ? "Enregistrement non supporté" : ""}
            >
              {isRecording ? <FaStop /> : <FaMicrophone />}
            </button>
            {isRecording && (
              <div className="mt-2 text-red-600 font-medium flex items-center">
                <span className="animate-pulse">●</span>
                <span className="ml-2">{formatTime(recordingTime)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Upload de fichier */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Ou sélectionnez un fichier audio
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1 cursor-pointer">
              <div className={`border-2 border-dashed rounded-lg p-4 text-center transition ${
                audioFile ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500'
              }`}>
                {audioFile ? (
                  <div className="text-green-700 font-medium truncate">
                    {audioFile.name}
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-500">Glissez-déposez ou cliquez pour sélectionner</p>
                    <p className="text-xs text-gray-400 mt-1">Formats supportés: .mp3, .wav, .webm</p>
                  </div>
                )}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="audio/*"
                  onChange={handleFileChange}
                />
              </div>
            </label>
            {audioFile && (
              <button 
                onClick={() => {
                  setAudioFile(null);
                  setAudioUrl('');
                  setIsPlaying(false);
                }}
                className="p-2 text-red-500 hover:text-red-700 transition"
              >
                <MdDelete className="text-2xl" />
              </button>
            )}
          </div>
        </div>

        {/* Contrôles audio */}
        {audioFile && (
          <div className="mb-6 bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">Fichier audio</span>
              <span className="text-sm text-gray-500">
                {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
            
            <div className="flex justify-center gap-4">
              <button 
                onClick={togglePlayback}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full"
              >
                {isPlaying ? <FaStop /> : <FaPlay />}
              </button>
              
              <button
                onClick={transcribeAudio}
                disabled={isTranscribing}
                className={`flex items-center gap-2 py-3 px-4 rounded-lg font-semibold ${
                  isTranscribing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {isTranscribing 
                  ? networkStatus.online 
                    ? 'Recherche paroles...' 
                    : 'Enregistrement...'
                  : 'Transcrire/Rechercher paroles'
                }
              </button>
            </div>
            
            <audio
              ref={audioRef}
              src={audioUrl}
              controls
              className="w-full mt-4"
              onEnded={() => setIsPlaying(false)}
              onError={(e) => {
                console.error("Erreur audio:", e);
                setError('Erreur de lecture du fichier audio');
              }}
            />
          </div>
        )}

        {/* Zone de transcription */}
        {transcription && (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Transcription
            </label>
            <div className="relative">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 resize-none h-40 focus:ring-2 focus:ring-blue-500"
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                placeholder="La transcription apparaîtra ici..."
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                {transcription.length} caractères
              </div>
            </div>
            
            <button
              onClick={saveToLocalStorage}
              disabled={!transcription.trim()}
              className={`mt-4 w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                !transcription.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              <FaSave />
              Sauvegarder
            </button>
          </div>
        )}

        {/* Historique des enregistrements */}
        {audioList.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">Historique</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {audioList.map((audio) => (
                <div key={audio.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium truncate">{audio.fileName}</span>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-2">{audio.date}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <button 
                      onClick={() => {
                        setAudioUrl(audio.audioUrl);
                        setAudioFile(new File([], audio.fileName));
                        setIsPlaying(false);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                    >
                      <FaPlay size={14} /> Écouter
                    </button>
                    
                    <button 
                      onClick={() => {
                        setTranscription(audio.transcription);
                        setAudioUrl(audio.audioUrl);
                        setAudioFile(new File([], audio.fileName));
                      }}
                      className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                    >
                      <FaSave size={14} /> Charger
                    </button>
                    
                    <button 
                      onClick={() => deleteRecording(audio.id)}
                      className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                    >
                      <MdDelete size={16} /> Supprimer
                    </button>
                  </div>
                  
                  {audio.transcription && (
                    <details className="mt-2">
                      <summary className="text-sm text-gray-600 cursor-pointer">Voir transcription</summary>
                      <p className="text-sm text-gray-700 mt-2 p-2 bg-white rounded">
                        {audio.transcription}
                      </p>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quicknote;