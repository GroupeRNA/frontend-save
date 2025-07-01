import React, { useEffect } from 'react';
import { FaMicrophone, FaUpload, FaKeyboard, FaArrowRight, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import image from "../assets/images/image.png"; 
import './home.css';

const FeatureCard = ({ icon, title, description, delay, onClick }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5, delay }}
      className="bg-indigo-900 p-10 lg:scale-105 rounded-2xl border border-purple-500 shadow-md hover:shadow-lg transition-all hover:-translate-y-2 backdrop-blur-sm cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-4 rounded-full">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-3 text-green-500">{title}</h3>
      <p className="text-gray-400 text-xl">
        {description}
      </p>
    </motion.div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="min-h-screen homebg flex flex-col items-center justify-center text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <motion.h1
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: -50 }
        }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-2xl md:text-6xl font-bold my-10 leading-tight text-blue-400"
      >
        Donnez <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">voix</span> à vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">idées</span>
      </motion.h1>

      <div className="relative w-full">
        <div className="absolute inset-1 z-0">
          <img 
            src={image}
            alt="Background" 
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute bg-cover bg-center inset-0"></div>
        </div>

        <div className="relative z-10 w-full text-center mb-10 px-4 sm:px-6 pb-32 pt-10">
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex justify-center pt-54 mb-10 w-full"
          >
            <div className="relative p-8 w-59 h-59 mt-3 translate-y-15">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 bg-blue-100/30 rounded-full blur-md"
                onClick={() => navigate('/note')}
              />
              <div className="relative rounded-full shadow-xl"></div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-4 border-blue-200/50 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-30 translate-y-6"
          >
            <button
              onClick={() => navigate('/note')}
              className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-bold py-4 px-8 rounded-xl text-lg md:text-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Essayer maintenant <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-purple-850 border-t border-purple-900 w-full pt-10 pb-30 flex-grow">
        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl mx-5 sm:text-2xl md:text-3xl mb-10 font-bold max-w-3xl md:mx-auto leading-relaxed text-blue-400 pt-10"
        >
          La transcription vocale intelligente qui <span className="font-semibold text-green-500">capture chaque mot</span> avec une précision remarquable.
        </motion.p>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 my-12">
            <FeatureCard 
              icon={<FaMicrophone className="text-4xl md:text-5xl text-blue-600" />} 
              title="Enregistrement intelligent" 
              description="Parlez naturellement et obtenez une transcription précise en temps réel avec notre technologie de reconnaissance vocale de pointe." 
              delay={0.2}
              onClick={() => navigate('/note')}
            />
            <FeatureCard 
              icon={<FaUpload className="text-4xl md:text-5xl text-green-500" />} 
              title="Importation facile" 
              description="Transformez vos fichiers audio existants (MP3, WAV) en texte éditable en quelques secondes seulement." 
              delay={0.4}
              onClick={() => navigate('/upload')}
            />
            <FeatureCard 
              icon={<FaKeyboard className="text-4xl md:text-5xl text-red-500" />} 
              title="Édition avancée" 
              description="Corrigez, formatez et organisez vos transcriptions avec notre suite complète d'outils d'édition intuitifs." 
              delay={0.6}
              onClick={() => navigate('/edit')}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-blue-950 text-white py-38 md:py-25 md:scale-125">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center">
                <FaMicrophone className="mr-2" />
                QuickNote Vocal
              </h3>
              <p className="text-blue-200 mt-2 text-sm sm:text-base md:text-lg">
                Transformez votre voix en texte en un clic
              </p>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <FaGithub className="text-2xl sm:text-3xl" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <FaLinkedin className="text-2xl sm:text-3xl" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <FaTwitter className="text-2xl sm:text-3xl" />
              </a>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-blue-300 text-sm sm:text-base mb-4 md:mb-0">
              © {new Date().getFullYear()} QuickNote Vocal. Tous droits réservés.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-300 hover:text-white text-sm sm:text-base transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-blue-300 hover:text-white text-sm sm:text-base transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-blue-300 hover:text-white text-sm sm:text-base transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;