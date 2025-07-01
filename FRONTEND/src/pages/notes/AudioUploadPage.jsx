import React, { useState } from 'react';
import { FaUpload, FaSave, FaPlay, FaStop } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const AudioUploadPage = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes('audio')) {
      setAudioFile(file);
    }
  };

  const handleTranscribe = () => {
    setIsTranscribing(true);
    // Simuler la transcription
    setTimeout(() => {
      setTranscription("Ceci est une transcription simulée de votre fichier audio. Le texte a été généré automatiquement à partir de l'audio uploadé.");
      setIsTranscribing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[450px]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-blue-800">
            <FaUpload className="text-blue-600" />
            Importer un Audio
          </div>
          <span className="text-gray-500 text-sm md:text-base">{new Date().toLocaleDateString()}</span>
        </div>

        {/* Zone d'upload */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Sélectionnez un fichier audio (MP3, WAV)
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1 cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition">
                {audioFile ? (
                  <div className="text-blue-600 font-medium truncate">
                    {audioFile.name}
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-500">Glissez-déposez ou cliquez pour sélectionner</p>
                    <p className="text-xs text-gray-400 mt-1">Formats supportés: .mp3, .wav</p>
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
                onClick={() => setAudioFile(null)}
                className="p-2 text-red-500 hover:text-red-700 transition"
              >
                <MdDelete className="text-2xl" />
              </button>
            )}
          </div>
        </div>

        {/* Bouton de transcription */}
        {audioFile && (
          <div className="mb-6">
            <button
              onClick={handleTranscribe}
              disabled={isTranscribing}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-colors ${
                isTranscribing
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isTranscribing ? 'Transcription en cours...' : 'Transcrire l\'audio'}
            </button>
          </div>
        )}

        {/* Contrôle audio */}
        {audioFile && (
          <div className="mb-6 bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Fichier audio</span>
              <span className="text-sm text-gray-500">
                {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
            <div className="flex gap-4 justify-center">
              <button 
                className="bg-blue-500 p-2 rounded-full text-white text-xl hover:bg-blue-600 transition"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <FaStop /> : <FaPlay />}
              </button>
            </div>
          </div>
        )}

        {/* Transcription */}
        {transcription && (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 md:text-lg">
                Transcription
              </label>
              <div className="relative">
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 resize-none text-base h-40 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={transcription}
                  onChange={(e) => setTranscription(e.target.value)}
                />
                <span className="absolute bottom-3 right-3 text-gray-400 text-sm italic">✎</span>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <span className="bg-red-100 text-red-600 text-xs md:text-sm px-3 py-1 rounded-full">
                #Urgent
              </span>
              <span className="bg-blue-100 text-blue-600 text-xs md:text-sm px-3 py-1 rounded-full">
                #Travail
              </span>
            </div>

            <button 
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              disabled={!transcription}
            >
              <FaSave />
              Enregistrer la transcription
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioUploadPage;