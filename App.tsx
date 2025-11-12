import React from 'react';

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <span className={`text-lg filter drop-shadow-lg ${filled ? 'text-yellow-400' : 'text-gray-600'}`}>
    {filled ? '★' : '☆'}
  </span>
);

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-black/25 text-[#9aa3ae] text-xs font-medium px-2.5 py-1.5 rounded-full ${className}`}>
    {children}
  </div>
);

const DownloadButton: React.FC<{
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'green' | 'blue';
}> = ({ href, onClick, children, variant = 'green' }) => {
  const baseClasses = "py-3 px-6 rounded-xl font-bold inline-flex items-center justify-center gap-2.5 shadow-lg transition-all duration-300 whitespace-nowrap text-sm w-full";
  
  const variantClasses = {
    green: "bg-gradient-to-b from-[#24c26b] to-[#1bb05a] hover:from-[#29d978] hover:to-[#1eb863] text-[#04210c] shadow-green-900/40",
    blue: "bg-gradient-to-b from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white shadow-sky-900/40",
  };

  return (
    <a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
          alert(`Downloading for ${variant === 'green' ? 'Android' : 'iOS'}...`);
        }
      }}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </a>
  );
};

const App: React.FC = () => {
  const screenshots = [
    'https://picsum.photos/seed/ss1/640/360',
    'https://picsum.photos/seed/ss2/640/360',
    'https://picsum.photos/seed/ss3/640/360',
  ];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  // Fix: Replaced NodeJS.Timeout with ReturnType<typeof setTimeout> for browser compatibility.
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const goToPrevious = React.useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? screenshots.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, screenshots.length]);

  const goToNext = React.useCallback(() => {
    const isLastSlide = currentIndex === screenshots.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, screenshots.length]);

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(goToNext, 4000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, goToNext]);

  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="max-w-[1100px] mx-auto p-5 sm:p-7 text-white">
      <header className="flex flex-col md:flex-row gap-4 md:gap-[18px] items-center">
        <div className="w-[86px] h-[86px] rounded-xl bg-gradient-to-b from-[#183a2b] to-[#173727] flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/60">
          <img src="https://picsum.photos/id/1/128/128" alt="game icon" className="w-[68px] h-[68px] object-cover rounded-[10px]" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-xl lg:text-2xl font-bold mb-[6px]">Download Terraria (MOD, Unlimited Items) 1.4.4.9.8 free on Android & iOS</h1>
          <p className="text-[#9aa3ae] text-sm">SOS Games Srl · Adventure · AN1.COM style landing</p>
        </div>
        <div className="flex flex-col gap-2.5 items-center md:items-end w-full md:w-auto max-w-xs">
          <DownloadButton href="#" variant="green" onClick={() => {}}>Download for Android</DownloadButton>
          <DownloadButton href="#" variant="blue" onClick={() => {}}>Download for iOS</DownloadButton>
        </div>
      </header>

      <main className="flex flex-col lg:flex-row gap-5 mt-6">
        <aside className="w-full lg:w-[280px] lg:flex-shrink-0">
          <div className="bg-[#111318] p-3 rounded-xl shadow-xl shadow-black/60">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">Android & iOS</div>
                <div className="text-xs text-[#9aa3ae]">Version: 1.4.4.9.8</div>
              </div>
              <div className="text-center">
                <div className="font-bold">144.9MB</div>
                <div className="text-xs text-[#9aa3ae]">Size</div>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 bg-[#111318] rounded-2xl p-4 sm:p-[18px] shadow-xl shadow-black/70">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 flex-wrap">
                 <div className="flex items-center gap-2" aria-label="3.6 out of 5 stars">
                    <div className="flex gap-1">
                      <StarIcon filled={true} />
                      <StarIcon filled={true} />
                      <StarIcon filled={true} />
                      <StarIcon filled={false} />
                      <StarIcon filled={false} />
                    </div>
                    <div className="font-bold">3.6</div>
                    <div className="text-sm text-[#9aa3ae]">(8223)</div>
                  </div>
                <Badge>MOD - Unlimited Items</Badge>
              </div>
              <div className="mt-2 text-sm text-[#9aa3ae]">Android & iOS · Version: 1.4.4.9.8 · 144.9MB</div>
            </div>
          </div>

          <p className="mt-3.5 text-[#d7e3ee] leading-relaxed text-sm">
            Terraria (MOD, Unlimited Items) - pixel game in which you are waiting for an extraordinary world that is filled with unusual creatures who want to destroy you. You will advance along tangled jungles and other maps. You can also pump out the characteristics of your character, because with each level passed, your opponents will become more dangerous. This MOD gives you unlimited items to explore freely.
          </p>

          <h2 className="font-bold text-lg mt-5 mb-3">Screenshots</h2>
          <div
            className="relative w-full overflow-hidden rounded-xl shadow-md border-4 border-white/5 bg-[#0b1115]"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {screenshots.map((src, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <img
                    src={src}
                    alt={`Screenshot ${index + 1}`}
                    className="w-full h-[150px] md:h-[180px] object-cover block"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors focus:outline-none z-10"
              aria-label="Previous screenshot"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors focus:outline-none z-10"
              aria-label="Next screenshot"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {screenshots.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>


          <h2 className="font-bold text-lg mt-5 mb-3">Questions and Answers</h2>
          <div className="mt-3.5 p-3 rounded-xl bg-gradient-to-b from-white/5 to-transparent">
            <div className="font-semibold">Is this MOD safe to install?</div>
            <div className="text-sm text-[#9aa3ae] mt-1.5">
              Always scan APK files and install from sources you trust. This page is a template example — replace with your own safety notes.
            </div>
          </div>
          
        </section>
      </main>
    </div>
  );
};

export default App;