import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const videoData = [ // Array of video objects with URL and description
    {
      url: '/masteryiGravesStealDrag.mp4',
      description: 'I alpha to dodge sorakas E silence, waited for graves to smite while smacking him , got the last laugh and last smite. Jokes on you Graves.', // Description for video1
    },
    {
      url: '/yiViAmbush.mp4',
      description: 'Predicted Vi location, knew she will gank my top. Waited on tri bush for her to come willingly. Lvl 4 yi can beat lvl 5 Vi.', // Description for video2
    },
    {
      url: '/yiLvl2BotGank.mp4',
      description: 'Invade blue and gromp into lvl 2 gank bot. Ashe burned flash beforehand. They overstepped, just walk in handsomely and whack them to death.', // Description for video3
    },
    {
      url: '/yi1v2bot.mp4',
      description: 'Saw Ashe used ult, knew I will win 1v2 as long as I dodge jhin W using alpha. No hesitation flashed in whacked ashe first, she flash I alpha follow up. In the end killed both and took both flashes as console prizes.', // Description for video3
    },
    {
      url: '/yiLeeSinInvadeRed.mp4',
      description: 'Knew Lee will eat red since my blue is alive and he starts farming from bot. Went into their jungle, caught him farming red and whacked him with no hesitation. I am one boots up and one recurve bow ahead of items.', // Description for video3
    },
    {
      url: '/yiDiveSoraka.mp4',
      description: 'Saw minion wave came into turret, I can dodge soraka E easily by walking away. I can stop command to trick her to using E first then I start auto, but she wasted E beforehand like a degenerate, so free kill.', // Description for video3
    },
    {
      url: '/yiAmbushSoraka.mp4',
      description: 'Waited in bush knew soraka will come face check, run to her and dodged her E then alpha to secure kill. Knew she no flash from previous fight. I should back after killing soraka instead of continue pursuing ezreal like high on drugs.', // Description for video3
    },
    {
      url: '/yiKillZoe.mp4',
      description: 'Zoe wasted bubble on minions, so I ran in and kill her.'
    },
    {
      url: '/yiKindred1v1.mp4',
      description: 'yi wins kindred 1v1 as long as got ult to gap close. Just keep whacking him even during his ult, wait til his ult finish then alpha to finish off. Just alpha when kindred low health. AA can reduce alpha cooldown even though he cant die in ult.'
    },
    {
      url: '/yiTakeDrag.mp4',
      description: 'Knowing Lee Sin starts top clear, his second clear will start at top too, so I just walk to drag directly from base. He cant contest drag cuz he busy clearing top camps. Free drag for me.'
    },
    {
      url: '/yi1v1Aatrox.mp4',
      description: 'Lvl 13 Yi with botrk and guinsoos and no E beat Lvl 14 Aatrox with same item numbers. Save alpha to dodge aatrox 3rd Q. Yi is a great counter to Aatrox.'
    },
    {
      url: '/yiPentaKillSolo.mp4',
      description: '1v5 penta kill'
    },
    {
      url: '/yiSoloBaron.mp4',
      description: 'Yi can solo baron with 3 items and 1 boots'
    },
    {
      url: '/yi1v1Garen.mp4',
      description: 'QSS can remove Garen Slience, allowing yi to win 1v1. Remember to meditate garens ult.'
    },
    {
      url: '/yiHuntKarthus.mp4',
      description: 'I knew Karthus start bot camps and will go top side, so I waited at his red for a free kill.'
    },
    // {
    //   url: '/.mp4',
    //   description: ''
    // },
    // ... more videos with descriptions
  ];  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      //Option 1: Loop the current video
      video.currentTime = 0;
      video.play();

      //Option 2: Play the next video in the array (looping back to the first if at the end)
      // handleNextVideo(); // or handleNextVideo() if you prefer auto-advance
    };

    if (video) {
      video.addEventListener('ended', handleEnded);
      video.play(); // Start playing initially
    }

    return () => {
      if (video) {
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, [currentVideoIndex]);

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoData.length);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videoData.length) % videoData.length);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const currentVideo = videoData[currentVideoIndex]; // Get current video object

  return (
    <div className="App">
      <h1>My League Highlights</h1>
      <video
        ref={videoRef}
        width="640"
        height="360"
        controls
        src={currentVideo.url} // Use currentVideo.url
      >
        Your browser does not support the video tag.
      </video>
      <p>{currentVideo.description}</p> {/* Display the description */}
      <div>
        <button onClick={handlePrevVideo}>Previous Video</button>
        <button onClick={handleNextVideo}>Next Video</button>
      </div>
    </div>
  );
}

export default App;