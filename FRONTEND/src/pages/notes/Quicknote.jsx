import React from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { MdPlayArrow, MdCheck, MdDelete } from 'react-icons/md';
import { BsFillMicFill } from 'react-icons/bs';

const QuickNote = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('/mnt/data/2c03701f-3171-4939-b421-038d81da7ed7.png')",
      }}
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-[350px] md:max-w-[450px] lg:max-w-[550px]">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2 text-xl md:text-2xl font-semibold">
            <FaMicrophone className="text-teal-600" />
            QuickNote Vocal
          </div>
          <span className="text-gray-500 text-sm md:text-base">Mercredi 18 juin 2025</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-red-100 flex items-center justify-center mb-2 md:mb-4">
            <BsFillMicFill className="text-red-500 text-4xl md:text-5xl lg:text-6xl" />
            <div className="absolute inset-0 rounded-full border-[10px] md:border-[12px] border-red-200 animate-ping"></div>
          </div>
          <p className="text-red-500 font-medium md:text-lg">
            Enregistrement... <span className="ml-1">0:05</span>
          </p>

          <div className="flex gap-4 md:gap-6 mt-4 md:mt-6">
            <button className="bg-blue-500 p-2 md:p-3 rounded-full text-white text-xl md:text-2xl hover:bg-blue-600 transition">
              <MdPlayArrow />
            </button>
            <button className="bg-green-500 p-2 md:p-3 rounded-full text-white text-xl md:text-2xl hover:bg-green-600 transition">
              <MdCheck />
            </button>
            <button className="bg-red-500 p-2 md:p-3 rounded-full text-white text-xl md:text-2xl hover:bg-red-600 transition">
              <MdDelete />
            </button>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <label className="block text-gray-700 font-medium mb-1 md:text-lg">
            Transcription
          </label>
          <div className="relative">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 md:p-3 resize-none text-sm md:text-base h-24 md:h-32 lg:h-40"
              placeholder="Votre transcription apparaîtra ici..."
            ></textarea>
            <span className="absolute bottom-2 md:bottom-3 right-2 md:right-3 text-gray-400 text-sm md:text-base italic">✎</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4 md:mt-6">
          <span className="bg-red-100 text-red-600 text-xs md:text-sm px-3 py-1 rounded-full">
            #Urgent
          </span>
          <span className="bg-teal-100 text-teal-600 text-xs md:text-sm px-3 py-1 rounded-full">
            #Idées
          </span>
        </div>

        <button className="w-full mt-6 md:mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold transition">
          Enregistrer la note
        </button>
      </div>
    </div>
  );
};

export default QuickNote;