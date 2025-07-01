import React, { useEffect, useRef, useState } from 'react';
import { FaMicrophone, FaUpload, FaKeyboard, FaArrowRight, FaGithub, FaLinkedin, FaTwitter, FaWaveSquare, FaMagic, FaTextWidth } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import image from "../assets/images/image.png"; 
import './home.css';
import {FeatureCard} from './components/FeatureCard';
import { FaUser, FaSignOutAlt ,FaBars } from 'react-icons/fa';

export const UserTopBar = () => {
  // Données fake user
  const fakeUser = {
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    avatar: null // Utilisera l'icône FaUser
  };

  // States
  const [user, setUser] = useState(fakeUser);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fonctions
  const handleLogin = () => setUser(fakeUser);
  const handleLogout = () => {
    setUser(null);
    setIsDropdownVisible(false);
  };
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Animation
  const ref = useRef();
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <>
      {/* Barre principale */}
      <motion.div className="w-full">
        <div className="relative flex items-center justify-between w-full py-4 px-4 sm:px-6 lg:px-8">
          {/* Partie gauche - Logo et menu mobile */}
          <div className="flex items-center space-x-4">
            {/* Bouton menu mobile (seulement sur petits écrans) */}
            <button className="md:hidden text-blue-400" onClick={toggleMobileMenu}>
              <FaBars className="text-xl" />
            </button>
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-15 h-15 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-600 to-green-500">
                <FaMicrophone className="text-white text-4xl" />
              </div>
              <div className="hidden sm:block">
                <h2 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
                  Voxtranscribe
                </h2>
                <p className="hidden md:block text-xs text-gray-400">Transcription vocale intelligente</p>
              </div>
            </div>
          </div>

          {/* Titre central (caché sur mobile) */}
          <motion.h1 
            ref={ref} 
            initial="hidden" 
            animate={controls} 
            variants={{ 
              visible: { opacity: 1, y: 0 }, 
              hidden: { opacity: 0, y: -50 } 
            }} 
            transition={{ duration: 0.8 }}
            className="hidden md:block text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight text-blue-400 text-center px-4 mx-4"
          >
            Donnez <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">voix</span> à vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">idées</span>
          </motion.h1>

          {/* Partie droite - Utilisateur */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <>
                {/* Version desktop */}
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-xl font-medium text-white">Bonjour, {user.name.split(' ')[0]}</span>
                  <span className="hidden lg:block text-md text-gray-400 truncate max-w-[160px]">{user.email}</span>
                </div>
                
                {/* Avatar */}
                <div className="relative">
                  <button 
                    className="w-8 h-8 sm:w-15 sm:h-15 rounded-full bg-gradient-to-br from-blue-600/20 to-green-500/20 flex items-center justify-center hover:opacity-80 transition-opacity"
                    onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                  >
                    <FaUser className="text-blue-400 text-sm sm:text-base" />
                  </button>
                  
                  {isDropdownVisible && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                        Connecté
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button 
                onClick={handleLogin}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-md text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Connexion
              </button>
            )}
          </div>
        </div>

        {/* Titre pour mobile (affiché seulement en dessous de md) */}
        <motion.h1 
          className="md:hidden text-2xl font-bold leading-tight text-blue-400 text-center px-4 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Donnez <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">voix</span> à vos idées
        </motion.h1>
      </motion.div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800/95 w-full py-3 px-4 absolute z-40">
          {user ? (
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600/20 to-green-500/20 flex items-center justify-center">
                  <FaUser className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="text-red-400 py-2 px-4 text-left flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Déconnexion
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-md text-left"
            >
              Connexion
            </button>
          )}
        </div>
      )}
    </>
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
      <motion.div>
        <UserTopBar />
        </motion.div>
      <div className="relative w-full">
        <div className="absolute inset-1 z-0">
          <img  src={image} alt="Background"  className="w-full h-full object-cover rounded-xl" />
          <div className="absolute bg-cover bg-center inset-0"></div>
        </div>
        <div className="relative z-10 w-full text-center mb-10 px-4 sm:px-6 pb-32 pt-10">
          <motion.div  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}  transition={{ duration: 0.8, type: 'spring' }}  className="flex justify-center pt-54 mb-10 w-full" >
            <div className="relative p-8 w-59 h-59 mt-3 translate-y-15">
              <motion.div  animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 bg-blue-100/30 rounded-full blur-md" onClick={() => navigate('/note')} />
              <div className="relative rounded-full shadow-xl"></div>
              <motion.div  animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 rounded-full border-4 border-blue-200/50 pointer-events-none"/>
            </div>
          </motion.div>
          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block mt-30 translate-y-6" >
            <button onClick={() => navigate('/note')} className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-bold py-4 px-8 rounded-xl text-lg md:text-xl transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Essayer maintenant <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </button>
          </motion.div>
        </div>
      </div>
     {/* Main Content */}
      <div className="w-full pt-10 pb-30 relative flex-grow overflow-hidden">
        {/* Bulles floues d'arrière-plan */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-80 h-80 rounded-full blur-[150px] top-1/4 -left-20 bg-green-500"></div>
          <div className="absolute w-96 h-96 rounded-full blur-[120px] top-1/3 right-1/4 bg-purple-600/80"></div>
          <div className="absolute w-72 h-72 rounded-full blur-[110px] -bottom-20 -right-20 bg-blue-600/80"></div>
        </div>
        {/* Contenu principal */}
        <div className="relative z-10">
          <div className='max-w-6xl mx-auto px-4 sm:px-6 text-center'>
            <h1 className='text-2xl md:text-5xl font-bold text-white mb-6 border-b border-purple-800 pb-10'>
              Les services disponibles
            </h1>
          </div>
          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl mx-5 sm:text-2xl md:text-3xl mb-10 font-bold max-w-3xl md:mx-auto leading-relaxed text-blue-400/90 pt-10"
          >
            La transcription vocale intelligente qui <span className="font-semibold text-green-400">capture chaque mot</span> avec une précision remarquable.
          </motion.p>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 my-12">
              <FeatureCard 
                icon={<FaMicrophone className="text-4xl md:text-5xl text-blue-400" />} 
                title="Enregistrement intelligent" 
                description="Parlez naturellement et obtenez une transcription précise en temps réel avec notre technologie de reconnaissance vocale de pointe." 
                delay={0.2}
                onClick={() => navigate('/note')}
              />
              <FeatureCard 
                icon={<FaUpload className="text-4xl md:text-5xl text-green-400" />} 
                title="Importation facile" 
                description="Transformez vos fichiers audio existants (MP3, WAV) en texte éditable en quelques secondes seulement." 
                delay={0.4}
                onClick={() => navigate('/upload')}
              />
              <FeatureCard 
                icon={<FaKeyboard className="text-4xl md:text-5xl text-red-400" />} 
                title="Édition avancée" 
                description="Corrigez, formatez et organisez vos transcriptions avec notre suite complète d'outils d'édition intuitifs." 
                delay={0.6}
                onClick={() => navigate('/edit')}
              />
            </div>
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