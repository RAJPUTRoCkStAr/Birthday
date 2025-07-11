import React, { useEffect, useState, useRef } from 'react';
import { Heart, Star, Gift, Cake, Sparkles, Music, Camera, Moon as Balloon, PartyPopper, Sun, Zap, Crown, Flower2, Smile, Coffee, Book, Gamepad2, Headphones, Palette } from 'lucide-react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cakeClicked, setCakeClicked] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [gameScore, setGameScore] = useState(0);
  const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);
  const cakeRef = useRef<HTMLDivElement>(null);
  const audioRefs = useRef<HTMLAudioElement[]>([]);

  const birthdaySongs = [
    { 
      title: "Happy Birthday to You", 
      artist: "Traditional", 
      duration: "0:30",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" // Placeholder - you can replace with actual birthday song URLs
    },
    { 
      title: "Birthday Celebration", 
      artist: "Party Mix", 
      duration: "2:42",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    { 
      title: "Happy Birthday Song", 
      artist: "Kids Version", 
      duration: "1:30",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    { 
      title: "Birthday Party Time", 
      artist: "Celebration Band", 
      duration: "3:15",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    { 
      title: "Wish You Happy Birthday", 
      artist: "Birthday Singers", 
      duration: "2:20",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    { 
      title: "Birthday Melody", 
      artist: "Happy Tunes", 
      duration: "1:45",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    }
  ];

  const birthdayGames = [
    { name: "Pop the Balloons", icon: "🎈", description: "Pop colorful balloons for points!" },
    { name: "Make a Wish", icon: "⭐", description: "Collect shooting stars!" },
    { name: "Catch the Confetti", icon: "🎊", description: "Catch falling confetti!" },
    { name: "Birthday Bingo", icon: "🎯", description: "Match birthday symbols!" }
  ];

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    setCurrentSong(prev => prev === birthdaySongs.length - 1 ? 0 : prev + 1);
  };

  const playGame = (gameName) => {
    setActiveGame(gameName);
    setGameScore(0);
  };

  const popBalloon = () => {
    setGameScore(prev => prev + 10);
  };

  const makeWish = () => {
    setGameScore(prev => prev + 5);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Trigger animations after mount
    setTimeout(() => setIsVisible(true), 100);
    
    // Initialize audio elements
    audioRefs.current = birthdaySongs.map((song, index) => {
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        // Auto play next song
        playNextSong();
      });
      audio.addEventListener('error', (e) => {
        console.log(`Audio error for song ${index}:`, e);
      });
      return audio;
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      // Cleanup audio elements
      audioRefs.current.forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);

  const handleCakeClick = () => {
    console.log('Cake clicked!'); // Debug log
    setCakeClicked(true);
    setCakeCut(true);
    setCandlesBlown(true);
    setShowConfetti(true);
    
    // Add shake effect to cake
    if (cakeRef.current) {
      cakeRef.current.classList.add('animate-shake');
    }
    
    // Reset after animation
    setTimeout(() => {
      setCandlesBlown(false);
      setShowConfetti(false);
      setCakeClicked(false);
      setCakeCut(false);
      if (cakeRef.current) {
        cakeRef.current.classList.remove('animate-shake');
      }
    }, 6000);
  };

  const generateConfetti = () => {
    return [...Array(100)].map((_, i) => (
      <div
        key={i}
        className="absolute w-3 h-3 animate-confetti pointer-events-none"
        style={{
          left: `${Math.random() * 100}%`,
          backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#00b894'][Math.floor(Math.random() * 10)],
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 3}s`,
          borderRadius: Math.random() > 0.5 ? '50%' : '0%'
        }}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 overflow-hidden relative">
      {/* Enhanced Mouse Follower */}
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full opacity-70 animate-pulse-fast"></div>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full opacity-40 animate-ping"></div>
      </div>

      {/* Enhanced Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {generateConfetti()}
        </div>
      )}

      {/* Enhanced Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float-${i % 4} opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          >
            {i % 12 === 0 && <Heart className="text-pink-400 w-6 h-6 drop-shadow-lg" />}
            {i % 12 === 1 && <Star className="text-yellow-400 w-6 h-6 drop-shadow-lg" />}
            {i % 12 === 2 && <Sparkles className="text-purple-400 w-6 h-6 drop-shadow-lg" />}
            {i % 12 === 3 && <Balloon className="text-blue-400 w-6 h-6 drop-shadow-lg" />}
            {i % 12 === 4 && <Crown className="text-yellow-500 w-6 h-6 drop-shadow-lg" />}
            {i % 12 === 5 && <Flower2 className="text-pink-500 w-6 h-6 drop-shadow-lg" />}
            {i % 12 === 6 && <Zap className="text-yellow-500 w-6 h-6 drop-shadow-lg" />}
            {i % 12 === 7 && <Gift className="text-green-400 w-6 h-6 drop-shadow-lg" />}
            {i % 12 === 8 && <Music className="text-purple-500 w-6 h-6 drop-shadow-lg" />}
            {i % 12 === 9 && <Smile className="text-orange-400 w-6 h-6 drop-shadow-lg" />}
            {i % 12 === 10 && <PartyPopper className="text-red-400 w-6 h-6 drop-shadow-lg" />}
            {i % 12 === 11 && <Sun className="text-yellow-600 w-6 h-6 drop-shadow-lg" />}
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-pink-300/30 to-purple-300/30"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        {/* Enhanced Animated Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 animate-pulse-slow"></div>
          <div className="absolute top-40 right-32 w-32 h-32 bg-gradient-to-r from-blue-300 to-green-300 rounded-full opacity-20 animate-bounce-slow"></div>
          <div className="absolute bottom-32 left-32 w-48 h-48 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 animate-spin-slow"></div>
          <div className="absolute bottom-20 right-20 w-36 h-36 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-green-300 to-blue-300 rounded-full opacity-15 animate-float-0"></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-red-300 to-pink-300 rounded-full opacity-15 animate-float-1"></div>
        </div>
        
        <div className={`text-center z-10 transition-all duration-2000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="mb-16 relative">
            <div className="relative">
              <h1 className="text-8xl md:text-[14rem] font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x drop-shadow-2xl leading-none">
                Happy
              </h1>
              <div className="absolute -top-12 -right-12 animate-bounce-slow">
                <Crown className="text-yellow-500 w-24 h-24 drop-shadow-lg" />
              </div>
            </div>
            <div className="relative mt-8">
              <h1 className="text-8xl md:text-[14rem] font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x drop-shadow-2xl leading-none">
                Birthday!
              </h1>
              <div className="absolute -top-8 -right-8 animate-spin-slow">
                <PartyPopper className="text-yellow-500 w-24 h-24 drop-shadow-lg" />
              </div>
            </div>
          </div>
          
          <p className="text-4xl md:text-5xl text-gray-700 mb-16 animate-fade-in-up font-bold drop-shadow-lg">
            ✨ Wishing you a day as amazing as you are! ✨
          </p>
          
          <div className="flex justify-center space-x-8 mb-20 flex-wrap">
            {[Gift, Cake, Music, Heart, Star, Sparkles, Crown, Flower2].map((Icon, i) => (
              <div 
                key={i}
                className="animate-bounce hover:animate-spin transition-all duration-300 cursor-pointer transform hover:scale-150 m-2" 
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <Icon className="text-pink-500 w-20 h-20 drop-shadow-lg hover:text-purple-500 transition-colors duration-300" />
              </div>
            ))}
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="animate-bounce mt-20">
            <div className="w-8 h-12 border-3 border-purple-400 rounded-full mx-auto relative bg-white/20 backdrop-blur-sm">
              <div className="w-2 h-4 bg-purple-400 rounded-full mx-auto mt-2 animate-pulse"></div>
            </div>
            <p className="text-purple-600 mt-4 font-bold text-xl">Scroll for more magic ✨</p>
          </div>
        </div>
      </section>

      {/* Enhanced Interactive Cake Section */}
      <section className="py-40 relative">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-yellow-100/60 to-orange-100/60"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-8xl md:text-9xl font-black text-gray-800 mb-8 animate-slide-in-left drop-shadow-lg">
              🎂 Make a Wish! 🎂
            </h2>
            <div className="w-40 h-3 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto animate-expand rounded-full"></div>
            <p className="text-2xl text-gray-600 mt-8 font-semibold">Click the magical cake below! ✨</p>
          </div>
          
          <div className="flex justify-center">
            <div 
              ref={cakeRef}
              className="relative group cursor-pointer transform hover:scale-110 transition-all duration-500 select-none"
              onClick={handleCakeClick}
            >
              {/* Enhanced Cake Base with Glow Effect */}
              {/* Lights Off Overlay */}
              {cakeCut && (
                <div className="absolute inset-0 bg-black/80 rounded-3xl z-50 animate-fade-in flex items-center justify-center">
                  <div className="text-center animate-slide-in-up">
                    <div className="w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl shadow-2xl mb-6 flex items-center justify-center overflow-hidden relative">
                      <img 
                        src="https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=400" 
                        alt="Birthday Memory" 
                        className="w-full h-full object-cover rounded-2xl animate-zoom-in"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-purple-500/20 rounded-2xl"></div>
                      <div className="absolute top-4 right-4">
                        <Heart className="text-red-400 w-8 h-8 animate-heartbeat drop-shadow-lg" />
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Star className="text-yellow-400 w-6 h-6 animate-spin drop-shadow-lg" />
                      </div>
                    </div>
                    <p className="text-white text-2xl font-bold mb-2 drop-shadow-lg">🎉 Happy Birthday! 🎉</p>
                    <p className="text-pink-300 text-lg drop-shadow-lg">A special memory just for you! ✨</p>
                  </div>
                </div>
              )}
              
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl blur-xl opacity-30 animate-pulse-slow scale-110"></div>
                
                {/* Bottom Layer - Larger */}
                <div className={`w-96 h-40 bg-gradient-to-b from-amber-200 to-amber-500 rounded-2xl shadow-2xl relative overflow-hidden transition-all duration-1000 mx-auto ${
                  cakeCut ? 'transform scale-110' : ''
                }`}>
                  {/* Cake Cut Line */}
                  {cakeCut && (
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 h-full bg-gradient-to-b from-amber-200 to-amber-500 animate-slide-left"></div>
                      <div className="w-1 h-full bg-white shadow-lg animate-pulse"></div>
                      <div className="w-1/2 h-full bg-gradient-to-b from-amber-200 to-amber-500 animate-slide-right"></div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  <div className="absolute bottom-4 left-6 right-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full shadow-lg"></div>
                  <div className="absolute top-4 left-8 w-8 h-8 bg-gradient-to-r from-red-300 to-pink-300 rounded-full animate-pulse"></div>
                  <div className="absolute top-8 right-12 w-6 h-6 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full animate-bounce"></div>
                </div>
                
                {/* Middle Layer - Enhanced */}
                <div className={`w-80 h-36 bg-gradient-to-b from-pink-200 to-pink-500 rounded-2xl shadow-xl relative -mt-6 overflow-hidden transition-all duration-1000 mx-auto ${
                  cakeCut ? 'transform scale-110' : ''
                }`}>
                  {/* Cake Cut Line */}
                  {cakeCut && (
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 h-full bg-gradient-to-b from-pink-200 to-pink-500 animate-slide-left"></div>
                      <div className="w-1 h-full bg-white shadow-lg animate-pulse"></div>
                      <div className="w-1/2 h-full bg-gradient-to-b from-pink-200 to-pink-500 animate-slide-right"></div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  <div className="absolute bottom-4 left-6 right-6 h-5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full shadow-lg"></div>
                  <div className="absolute top-6 left-10 w-6 h-6 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-spin-slow"></div>
                  <div className="absolute top-12 right-16 w-4 h-4 bg-gradient-to-r from-green-300 to-blue-300 rounded-full animate-pulse"></div>
                </div>
                
                {/* Top Layer - Enhanced */}
                <div className={`w-72 h-32 bg-gradient-to-b from-purple-200 to-purple-500 rounded-2xl shadow-lg relative -mt-6 overflow-hidden transition-all duration-1000 mx-auto ${
                  cakeCut ? 'transform scale-110' : ''
                }`}>
                  {/* Cake Cut Line */}
                  {cakeCut && (
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 h-full bg-gradient-to-b from-purple-200 to-purple-500 animate-slide-left"></div>
                      <div className="w-1 h-full bg-white shadow-lg animate-pulse"></div>
                      <div className="w-1/2 h-full bg-gradient-to-b from-purple-200 to-purple-500 animate-slide-right"></div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  <div className="absolute top-6 left-12 w-5 h-5 bg-gradient-to-r from-pink-300 to-red-300 rounded-full animate-bounce"></div>
                  <div className="absolute top-10 right-14 w-4 h-4 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full animate-pulse"></div>
                </div>
                
                {/* Enhanced Candles */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex space-x-4 justify-center">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="relative">
                      {/* Candle */}
                      <div className={`w-3 h-12 bg-gradient-to-b ${
                        i % 3 === 0 ? 'from-yellow-200 to-yellow-500' :
                        i % 3 === 1 ? 'from-pink-200 to-pink-500' :
                        'from-blue-200 to-blue-500'
                      } rounded-full shadow-lg`}></div>
                      {/* Flame */}
                      <div 
                        className={`absolute -top-3 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
                          candlesBlown ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                        }`}
                      >
                        <div className="w-2 h-4 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-flicker shadow-lg"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-200 rounded-full animate-pulse opacity-70"></div>
                      </div>
                      {/* Enhanced Smoke when blown */}
                      {candlesBlown && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                          <div className="w-1 h-8 bg-gray-400 opacity-70 rounded-full animate-smoke"></div>
                          <div className="w-1 h-6 bg-gray-300 opacity-50 rounded-full animate-smoke ml-1" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Enhanced Decorative Elements */}
                <div className="absolute top-8 left-12 animate-spin-slow">
                  <Flower2 className="text-pink-500 w-8 h-8 drop-shadow-lg" />
                </div>
                <div className="absolute top-12 right-12 animate-pulse">
                  <Star className="text-yellow-500 w-8 h-8 drop-shadow-lg" />
                </div>
                <div className="absolute top-16 left-20 animate-bounce">
                  <Heart className="text-red-500 w-6 h-6 drop-shadow-lg" />
                </div>
                <div className="absolute top-16 right-20 animate-pulse">
                  <Sparkles className="text-purple-500 w-6 h-6 drop-shadow-lg" />
                </div>
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 animate-float-0">
                  <Crown className="text-gold-400 w-7 h-7 drop-shadow-lg" />
                </div>
              </div>
              
              <div className="text-center mt-16">
                <p className="text-3xl text-gray-700 animate-pulse font-bold drop-shadow-md mb-4">
                  {candlesBlown ? "🎉 Wish Made! Your dreams will come true! 🎉" : "Click the magical cake to blow out the candles! 🕯️"}
                </p>
                {candlesBlown && (
                  <div className="animate-fade-in-up">
                    <p className="text-xl text-purple-600 mb-2">
                      ✨ May all your dreams come true! ✨
                    </p>
                    <p className="text-lg text-pink-600">
                      🌟 Another year of amazing adventures awaits! 🌟
                    </p>
                  </div>
                )}
                {!candlesBlown && (
                  <p className="text-lg text-gray-600 animate-bounce">
                    ⬆️ Tap the cake above ⬆️
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Birthday Timeline Section */}
      <section className="py-40 bg-gradient-to-r from-blue-100 to-purple-100 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-8xl md:text-9xl font-black text-gray-800 mb-8 animate-slide-in-right drop-shadow-lg">
              🎈 Your Special Day Timeline 🎈
            </h2>
            <div className="w-40 h-3 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto animate-expand rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {[
              { time: "Morning", icon: Sun, title: "Wake up to Birthday Magic!", desc: "The sun shines brighter on your special day! ☀️", color: "from-yellow-400 to-orange-400" },
              { time: "Afternoon", icon: Gift, title: "Surprise Time!", desc: "Unwrap the joy and excitement of your birthday gifts! 🎁", color: "from-green-400 to-blue-400" },
              { time: "Evening", icon: Cake, title: "Cake & Celebration!", desc: "Blow out the candles and make your wishes come true! 🎂", color: "from-pink-400 to-purple-400" },
              { time: "Night", icon: Star, title: "Starlit Dreams!", desc: "End the day with beautiful dreams and gratitude! ⭐", color: "from-purple-400 to-blue-400" }
            ].map((item, i) => (
              <div key={i} className="flex items-center mb-16 animate-fade-in-up" style={{animationDelay: `${i * 0.3}s`}}>
                <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300`}>
                  <item.icon className="text-white w-12 h-12" />
                </div>
                <div className="flex-1 ml-8 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">{item.time}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Photo Gallery */}
      <section className="py-40 bg-gradient-to-r from-purple-100 to-pink-100 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-8xl md:text-9xl font-black text-gray-800 mb-8 animate-slide-in-right drop-shadow-lg">
              📸 Memory Lane 📸
            </h2>
            <div className="w-40 h-3 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto animate-expand rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 hover:rotate-2 transition-all duration-700 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="w-full h-96 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 flex items-center justify-center group-hover:from-yellow-300 group-hover:via-pink-300 group-hover:to-purple-300 transition-all duration-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Camera className="text-gray-600 w-24 h-24 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 drop-shadow-lg" />
                  <div className="absolute top-6 right-6">
                    <Heart className="text-red-400 w-8 h-8 opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <Star className="text-yellow-400 w-6 h-6 opacity-0 group-hover:opacity-100 animate-spin transition-opacity duration-300" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-8 left-8 text-white">
                    <p className="text-2xl font-bold drop-shadow-lg">Beautiful Memory #{i + 1}</p>
                    <p className="text-lg opacity-90">A moment to treasure forever ✨</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Fun Activities Section */}
      <section className="py-40 bg-gradient-to-r from-green-100 to-blue-100 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-8xl md:text-9xl font-black text-gray-800 mb-8 animate-slide-in-left drop-shadow-lg">
              🎮 Birthday Fun Zone 🎮
            </h2>
            <div className="w-40 h-3 bg-gradient-to-r from-green-500 to-blue-500 mx-auto animate-expand rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Gamepad2, title: "Birthday Games", desc: "Play fun birthday games!", color: "from-blue-400 to-purple-400", isInteractive: true, type: "games" },
              { icon: Music, title: "Birthday Music", desc: "Listen to birthday songs!", color: "from-pink-400 to-red-400", isInteractive: true, type: "music" },
              { icon: Book, title: "Story Time", desc: "Create new birthday memories!", color: "from-green-400 to-blue-400" },
              { icon: Palette, title: "Art & Craft", desc: "Express your creativity!", color: "from-yellow-400 to-orange-400" },
              { icon: Coffee, title: "Sweet Treats", desc: "Indulge in birthday goodies!", color: "from-brown-400 to-yellow-400" },
              { icon: Headphones, title: "Music Vibes", desc: "Listen to birthday songs!", color: "from-purple-400 to-pink-400" },
              { icon: Camera, title: "Photo Booth", desc: "Capture the magic!", color: "from-teal-400 to-blue-400" },
              { icon: Sparkles, title: "Make Wishes", desc: "Dream big on your day!", color: "from-pink-400 to-purple-400" }
            ].map((activity, i) => (
              <div
                key={i}
                className={`bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-rotate-2 transition-all duration-500 animate-fade-in-up cursor-pointer group ${
                  activity.isInteractive ? 'border-2 border-purple-300 hover:border-purple-500' : ''
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => {
                  if (activity.type === 'games') {
                    // Show games modal or section
                    document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' });
                  } else if (activity.type === 'music') {
                    // Show music player or section
                    document.getElementById('music-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${activity.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <activity.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">{activity.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{activity.desc}</p>
                {activity.isInteractive && (
                  <div className="mt-4 text-sm text-purple-600 font-semibold animate-pulse">
                    Click to explore! ✨
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Birthday Music Player Section */}
      <section id="music-section" className="py-40 bg-gradient-to-r from-purple-100 to-pink-100 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-black text-gray-800 mb-8 animate-slide-in-right drop-shadow-lg">
              🎵 Birthday Playlist 🎵
            </h2>
            <div className="w-40 h-3 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto animate-expand rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Music Player */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mb-12 border border-white/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center animate-spin-slow">
                    <Music className="text-white w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{birthdaySongs[currentSong].title}</h3>
                    <p className="text-gray-600">{birthdaySongs[currentSong].artist}</p>
                  </div>
                </div>
                <div className="text-purple-600 font-bold text-lg">
                  {birthdaySongs[currentSong].duration}
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-6 mb-6">
                <button 
                  onClick={() => setCurrentSong(prev => prev === 0 ? birthdaySongs.length - 1 : prev - 1)}
                  className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                >
                  ⏮️
                </button>
                <button 
                  onClick={togglePlayPause}
                  className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg text-2xl"
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <button 
                  onClick={playNextSong}
                  className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                >
                  ⏭️
                </button>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className={`bg-gradient-to-r from-pink-400 to-purple-400 h-2 rounded-full transition-all duration-1000 ${
                  isPlaying ? 'w-3/4 animate-pulse' : 'w-1/4'
                }`}></div>
              </div>
              
              {isPlaying && (
                <div className="text-center text-purple-600 animate-bounce">
                  <div className="flex items-center justify-center space-x-2">
                    <span>🎶</span>
                    <span className="animate-pulse">Now Playing...</span>
                    <span>🎶</span>
                  </div>
                  <div className="mt-2 text-sm">
                    Click the play button to hear the music! 🔊
                  </div>
                </div>
              )}
              
              {!isPlaying && (
                <div className="text-center text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <span>🎵</span>
                    <span>Ready to play birthday music!</span>
                    <span>🎵</span>
                  </div>
                  <div className="mt-2 text-sm">
                    Click play to start the celebration! 🎉
                  </div>
                </div>
              )}
            </div>
            
            {/* Song List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {birthdaySongs.map((song, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentSong(i)}
                  className={`bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 ${
                    currentSong === i ? 'border-purple-400 bg-purple-50/80' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{song.title}</h4>
                      <p className="text-gray-600">{song.artist}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-purple-600 font-semibold">{song.duration}</span>
                      {currentSong === i && isPlaying && (
                        <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Birthday Games Section */}
      <section id="games-section" className="py-40 bg-gradient-to-r from-blue-100 to-green-100 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-black text-gray-800 mb-8 animate-slide-in-left drop-shadow-lg">
              🎮 Birthday Games 🎮
            </h2>
            <div className="w-40 h-3 bg-gradient-to-r from-blue-500 to-green-500 mx-auto animate-expand rounded-full"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Game Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {birthdayGames.map((game, i) => (
                <div
                  key={i}
                  onClick={() => playGame(game.name)}
                  className={`bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 cursor-pointer border-2 ${
                    activeGame === game.name ? 'border-blue-400 bg-blue-50/80' : 'border-transparent'
                  }`}
                >
                  <div className="text-6xl mb-4 text-center animate-bounce">{game.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{game.name}</h3>
                  <p className="text-gray-600 text-center">{game.description}</p>
                  {activeGame === game.name && (
                    <div className="mt-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">Score: {gameScore}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Active Game Area */}
            {activeGame && (
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/30">
                <div className="text-center mb-8">
                  <h3 className="text-4xl font-bold text-gray-800 mb-4">🎯 {activeGame} 🎯</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-4">Score: {gameScore}</div>
                </div>
                
                {activeGame === "Pop the Balloons" && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-4 max-w-2xl mx-auto">
                    {[...Array(24)].map((_, i) => (
                      <div
                        key={i}
                        onClick={popBalloon}
                        className="w-16 h-20 bg-gradient-to-b from-red-300 to-red-500 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg flex items-center justify-center text-2xl animate-float-0"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        🎈
                      </div>
                    ))}
                  </div>
                )}
                
                {activeGame === "Make a Wish" && (
                  <div className="grid grid-cols-5 md:grid-cols-8 gap-4 max-w-3xl mx-auto">
                    {[...Array(40)].map((_, i) => (
                      <div
                        key={i}
                        onClick={makeWish}
                        className="w-12 h-12 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full cursor-pointer hover:scale-125 transition-transform duration-300 shadow-lg flex items-center justify-center text-xl animate-pulse"
                        style={{ animationDelay: `${i * 0.05}s` }}
                      >
                        ⭐
                      </div>
                    ))}
                  </div>
                )}
                
                {activeGame === "Catch the Confetti" && (
                  <div className="relative h-96 bg-gradient-to-b from-blue-100 to-purple-100 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-confetti cursor-pointer hover:scale-150 transition-transform duration-300"
                          style={{
                            left: `${Math.random() * 90}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                          }}
                          onClick={() => setGameScore(prev => prev + 15)}
                        >
                          🎊
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-2xl">
                      🧺
                    </div>
                  </div>
                )}
                
                {activeGame === "Birthday Bingo" && (
                  <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto">
                    {['🎂', '🎈', '🎁', '🎉', '🎊', '🕯️', '🎵', '🌟', '💖', '🎯', '🎪', '🎭', '🎨', '🎸', '🎤', '🎬', '📸', '🎳', '🎲', '🃏', '🎪', '🎠', '🎡', '🎢', '🎪'].map((emoji, i) => (
                      <div
                        key={i}
                        onClick={() => setGameScore(prev => prev + 20)}
                        className="w-16 h-16 bg-white rounded-xl shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300 flex items-center justify-center text-2xl border-2 border-gray-200 hover:border-purple-400"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="text-center mt-8">
                  <button
                    onClick={() => setActiveGame(null)}
                    className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
                  >
                    Choose Another Game 🎮
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Wishes Section */}
      <section className="py-40 relative">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-100/60 to-green-100/60"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-8xl md:text-9xl font-black text-gray-800 mb-8 animate-slide-in-left drop-shadow-lg">
              💝 Heartfelt Wishes 💝
            </h2>
            <div className="w-40 h-3 bg-gradient-to-r from-blue-500 to-green-500 mx-auto animate-expand rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { text: "May your birthday sparkle with joy and laughter! Here's to another year of amazing adventures and beautiful memories! 🌟", icon: Sun, color: "from-yellow-400 to-orange-400" },
              { text: "Wishing you endless happiness, love, and all the cake you can eat! Let's celebrate the wonderful person you are! 🎉", icon: PartyPopper, color: "from-pink-400 to-purple-400" },
              { text: "Hope your special day is filled with all your favorite things and wonderful surprises that make you smile! 💖", icon: Heart, color: "from-red-400 to-pink-400" },
              { text: "Another year older, another year more fabulous! Keep shining bright like the star you are and inspiring everyone around you! ✨", icon: Star, color: "from-purple-400 to-blue-400" },
              { text: "May all your birthday wishes come true and bring you joy throughout the year! You deserve all the happiness in the world! 🎁", icon: Gift, color: "from-green-400 to-blue-400" },
              { text: "Celebrating the amazing person you are today and always! Happy Birthday superstar, keep being awesome! 🎈", icon: Balloon, color: "from-blue-400 to-purple-400" },
              { text: "Here's to a year filled with new adventures, exciting opportunities, and dreams coming true! You've got this! 🚀", icon: Zap, color: "from-yellow-400 to-red-400" },
              { text: "May your birthday be as sweet as cake, as bright as candles, and as special as you are to everyone who knows you! 🎂", icon: Cake, color: "from-pink-400 to-yellow-400" },
              { text: "Wishing you a day full of love, laughter, and all the things that make you happiest! You deserve the very best! 👑", icon: Crown, color: "from-gold-400 to-yellow-400" }
            ].map((wish, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-rotate-1 transition-all duration-700 animate-fade-in-up cursor-pointer group border border-white/20"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className={`p-4 rounded-full bg-gradient-to-r ${wish.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <wish.icon className="text-white w-10 h-10" />
                  </div>
                  <div className="flex-1 ml-6 h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300"></div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-300">{wish.text}</p>
                <div className="mt-6 flex justify-end">
                  <Sparkles className="text-purple-400 w-6 h-6 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grand Finale */}
      <section className="py-40 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-finale opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <Star className="text-yellow-400 w-5 h-5 drop-shadow-lg" />
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-7xl md:text-9xl font-black text-gray-800 mb-16 animate-slide-in-up drop-shadow-2xl">
              🌟 You're Simply Amazing! 🌟
            </h2>
            <p className="text-4xl md:text-5xl text-gray-700 mb-16 animate-fade-in-up font-bold drop-shadow-lg">
              May this new year of your life overflow with love, laughter, and endless blessings!
            </p>
            
            <div className="flex justify-center space-x-10 mb-20 flex-wrap">
              {[Heart, Star, Gift, Cake, Sparkles, Crown, Flower2, Zap, Music, Sun].map((Icon, i) => (
                <div
                  key={i}
                  className="animate-bounce hover:animate-spin transition-all duration-300 cursor-pointer transform hover:scale-150 m-3"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <Icon className="text-pink-500 w-20 h-20 drop-shadow-lg hover:text-purple-500 transition-colors duration-300" />
                </div>
              ))}
            </div>
            
            <div className="text-9xl md:text-[12rem] animate-pulse-slow mb-12 drop-shadow-lg">
              🎊 🎉 🎂 🎈 🎁
            </div>
            
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto border border-white/30">
              <p className="text-3xl text-gray-800 font-bold mb-6">
                "Age is merely the number of years the world has been enjoying you!"
              </p>
              <p className="text-xl text-purple-600 font-medium mb-4">
                Keep being the wonderful person you are! 💜
              </p>
              <p className="text-lg text-gray-600">
                Here's to another year of making the world brighter with your presence! ✨
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;