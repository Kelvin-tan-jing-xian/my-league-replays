import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import Fuse from 'fuse.js';

function App() {
  const videoRef = useRef(null);
  const videoData = [
    // { url: '/masteryiGravesStealDrag.mp4', description: 'I alpha to dodge sorakas E silence, waited for graves to smite while smacking him , got the last laugh and last smite. Jokes on you Graves.', keywords: ['steal', 'dragon', 'graves', 'masteryi'] },
    // { url: '/yiViAmbush.mp4', description: 'Predicted Vi location, knew she will gank my top. Waited on tri bush for her to come willingly. Lvl 4 yi can beat lvl 5 Vi.', keywords: ['ambush', 'vi', 'masteryi'] },
    // { url: '/yiLvl2BotGank.mp4', description: 'Invade blue and gromp into lvl 2 gank bot. Ashe burned flash beforehand. They overstepped, just walk in handsomely and whack them to death.', keywords: ['gank', 'bot', 'ashe', 'masteryi', 'invade blue'] },
    // { url: '/yi1v2bot.mp4', description: 'Saw Ashe used ult, knew I will win 1v2 as long as I dodge jhin W using alpha. No hesitation flashed in whacked ashe first, she flash I alpha follow up. In the end killed both and took both flashes as console prizes.', keywords: ['1v2', 'ashe', 'jhin', 'masteryi'] },
    // { url: '/yiLeeSinInvadeRed.mp4', description: 'Knew Lee will eat red since my blue is alive and he starts farming from bot. Went into their jungle, caught him farming red and whacked him with no hesitation. I am one boots up and one recurve bow ahead of items.', keywords: ['invade', 'leesin', 'redbuff', 'masteryi'] },
    // { url: '/yiDiveSoraka.mp4', description: 'Saw minion wave came into turret, I can dodge soraka E easily by walking away. I can stop command to trick her to using E first then I start auto, but she wasted E beforehand like a degenerate, so free kill.', keywords: ['dive', 'soraka', 'masteryi'] },
    // { url: '/yiAmbushSoraka.mp4', description: 'Waited in bush knew soraka will come face check, run to her and dodged her E then alpha to secure kill. Knew she no flash from previous fight. I should back after killing soraka instead of continue pursuing ezreal like high on drugs.', keywords: ['ambush','ezreal', 'soraka', 'masteryi'] },
    // { url: '/yiKillZoe.mp4', description: 'Zoe wasted bubble on minions, so I ran in and kill her.', keywords: ['kill', 'zoe', 'masteryi'] },
    // { url: '/yiKindred1v1.mp4', description: 'yi wins kindred 1v1 as long as got ult to gap close. Just keep whacking him even during his ult, wait til his ult finish then alpha to finish off. Just alpha when kindred low health. AA can reduce alpha cooldown even though he cant die in ult.', keywords: ['1v1', 'kindred', 'masteryi'] },
    // { url: '/yiTakeDrag.mp4', description: 'Knowing Lee Sin starts top clear, his second clear will start at top too, so I just walk to drag directly from base. He cant contest drag cuz he busy clearing top camps. Free drag for me.', keywords: ['free dragon', 'leesin', 'masteryi'] },
    // { url: '/yi1v1Aatrox.mp4', description: 'Lvl 13 Yi with botrk and guinsoos and no E beat Lvl 14 Aatrox with same item numbers. Save alpha to dodge aatrox 3rd Q. Yi is a great counter to Aatrox.', keywords: ['1v1', 'aatrox', 'masteryi'] },
    // { url: '/yiPentaKillSolo.mp4', description: '1v5 penta kill', keywords: ['pentakill', 'solo', 'masteryi'] },
    // { url: '/yiSoloBaron.mp4', description: 'Yi can solo baron with 3 items and 1 boots', keywords: ['solo', 'baron','solo baron', 'masteryi'] },
    // { url: '/yi1v1Garen.mp4', description: 'QSS can remove Garen Slience, allowing yi to win 1v1. Remember to meditate garens ult.', keywords: ['1v1', 'garen', 'masteryi'] },
    // { url: '/yiHuntKarthus.mp4', description: 'I knew Karthus start bot camps and will go top side, so I waited at his red for a free kill.', keywords: ['hunt', 'karthus', 'masteryi'] },
    // { url: '/GarenProxyKayle1.mp4', description: 'Garen vs Kayle rush attack speed boots first, then 2 long swords good enough to proxy. Decide to proxy enemy base if team is getting dragon and no one is backing.', keywords: ['kayle', 'garen', 'proxy'] },
    // { url: '/GarenProxyKayle2.mp4', description: 'Garen vs Kayle rush attack speed boots first, then 2 long swords good enough to proxy. Decide to proxy enemy base if team is getting dragon and no one is backing.', keywords: ['kayle', 'garen', 'proxy', 'base', 'proxybase','proxy base'] },
    // { url: '/GarenProxySett.mp4', description: 'Garen vs Sett rush attack speed boots first then can proxy liao. Never lane with Sett cuz Garen will lose no matter what', keywords: ['sett', 'garen', 'proxy'] },
    // { url: '/GarenProxySett2.mp4', description: 'Decide to proxy base if ally jg is near objectives(grubs). Secured grubs and killed enemy jg wow', keywords: ['sett', 'garen', 'proxy','base','voidgrubs','proxyvoid','proxy voidgrubs','base proxy voidgrubs','proxy base voidgrubs'] },
    // { url: '/GarenProxySett3.mp4', description: 'Knew enemy is busy getting drake, so I proxied knowing they have no time for me. I should have backed after taking two waves enough to buy stridebreaker.', keywords: ['sett', 'garen', 'proxy','base','drake','proxy drake', 'base proxy drake','base drake proxy','drake base proxy','drake proxy base'] },
    // { url: '/KaynLvl1InvadeTopRed.mp4', description: 'Invaded their red took their 3 top camps at start game because I wanna focus on touching the volibear top to get red form fast. Voli spotted me and tot he can kill me but dream on.', keywords: ['volibear', 'kayn', 'invade red','lvl1','raptors start'] },
    // { url: '/kaynTouchingSejuani.mp4', description: 'I saw sejuani walking up to gank top so I ambush her to get red orbs. Thought he would take raptors but taking krugs instead shown by my E, so I just go contest krugs with my Q AND smite while touching him. Got red form at 8min+ thanks to this', keywords: ['sejuani', 'kayn', 'ambush','contest krugs','red orbs'] },
    // { url: '/kaynStealTalonBlue.mp4', description: 'saw talon shown bot lane after taking his bot 3 camps, means he left his top blue open, he take crab and base, giving me time to take top crab and steal his blue', keywords: ['talon', 'kayn', 'steal blue'] },
    { url: '/kaynSpotTalonTakingDrag.mp4', description: 'Saw talon ganked bot and moving to take drag, knew I can contest with smite and R, in the end killed yasuo and secured drag with help of mah team', keywords: ['talon', 'kayn', 'contest drag','yasuo','contest drake','contest dragon'] },
    { url: '/kaynTripleKill.mp4', description: 'Ambushed jhin first then lead to triple kill with help of team.', keywords: ['kayn', 'triple kill','ambush jhin','red kayn'] },
    { url: '/kaynInvadeTopBlueJax.mp4', description: 'Invaded top blue, jax tot can kill me when he lvl 1 what a joke dream on, cleared 3 camps top, scuttle, transition to push top make jax lose 1 wave cuz he no tp.', keywords: ['kayn', 'invade blue','jax','invade top blue'] },
    { url: '/kaynContestDragElise.mp4', description: 'contest drag i won smite contest provided morg help root elise, double knock up vex n renekton to secure kills', keywords: ['kayn', 'elise','vex','renekton','contest drag','contest drake','contest dragon','double knock up'] },
    { url: '/kaynDemolishRenekton.mp4', description: 'saw renekton walk by river from bot to top lvl 1 , ambush him in top river, from then on he no tp so only can walk to lane, so ambush at top lane make him lose 4 waves.', keywords: ['kayn', 'mundo','renekton','lose 4 waves','lvl 3 lvl 1'] },
    { url: '/kaynPickGoodFight.mp4', description: 'saw graves out of sync with team so i targeted him, got yuumi heal ult malz ult setting up team for easy clean up.', keywords: ['kayn', 'graves','engage graves','malz R','yuumi R'] },
    { url: '/kaynSoloKillGraves.mp4', description: 'walk into their jg to find picks since i got ult, saw graves alone , their team top side, so i solo killed him.', keywords: ['kayn', 'graves','kayn solo kill graves','kayn solo graves','kayn graves','kayn 1v1 graves'] },
    { url: '/kaynKillGravesHerald.mp4', description: 'killed graves before he can attempt to steal herald.', keywords: ['kayn', 'graves','herald','herald kill','secure herald'] },
    { url: '/redKaynMidEngage.mp4', description: 'Engaged with team won mid fight and ended.', keywords: ['kayn', 'ezreal','sylas support','mid fight','red kayn','malzahar'] },
    { url: '/kaynTripleKnockUp.mp4', description: 'Q first to get good position for Triple knock up', keywords: ['kayn', 'triple knock up','zed','malzahar'] },
    { url: '/kaynPykeSynergy.mp4', description: 'kayn W synergize with pyke E stun beautiful shit.', keywords: ['kayn', 'pyke','kayn pyke','kayn pyke synergy','kayn w pyke e'] },
    { url: '/kaynWallJuke.mp4', description: 'play around wall cuz lvl 1 only kayn has wall dash, yi and aatrox dont have. Wait til aatrox walk near u then q over wall,else just stand still in wall cuz no one can auto u.', keywords: ['kayn', 'yi','wall juke','kayn yi','kayn wall juke yi','kayn juke yi'] },
    { url: '/kaynNasusRaptorFight.mp4', description: 'went to contest his raptors knowing i have Q and smite, my Q will win contest against nasus E Q', keywords: ['kayn', 'nasus','contest raptors','raptor fight','raptors fight','kayn nasus raptor'] },
    { url: '/kaynKillNasusBlueNKrugs.mp4', description: 'thanks to jg traqcking i knew nasus on blue, after he died i knew the only place he can go is his red and krugs', keywords: ['kayn nasus krugs', 'kayn nasus blue krugs'] },
    { url: '/kaynCounterGankNasus.mp4', description: 'counter ganked nasus bot lane, saw leona still healthy to fight so i commit to counter gank', keywords: ['kayn nasus leona','kayn nasus counter gank bot'] },
    { url: '/kaynKillNasusRed.mp4', description: 'saw him in blue buff so nasus will definitely go red buff after respawn', keywords: ['kayn nasus red buff'] },
    // { url: '/kaynPickGoodFight.mp4', description: '', keywords: ['kayn', 'mundo','renekton','lose 4 waves','lvl 3 lvl 1'] },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const fuseOptions = {
    includeScore: true,
    keys: ['keywords', 'description'],
    threshold: 0.4,
  };

  const fuse = new Fuse(videoData, fuseOptions);
  useEffect(() => {
    const video = videoRef.current;
    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };
    if (video) {
      video.addEventListener('ended', handleEnded);
      video.play();
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

  const handleSearch = (event) => {
    event.preventDefault();
    const results = fuse.search(searchKeyword);

    if (results.length > 0) {
      const bestMatchIndex = videoData.indexOf(results[0].item); // Get index of best match
      setCurrentVideoIndex(bestMatchIndex);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    } else {
      alert('No matching videos found.');
    }
    setSearchKeyword(''); 
  };

  const currentVideo = videoData[currentVideoIndex];

  return (
    <div className="App">
      <h1>My League Highlights</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search keywords"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <video ref={videoRef} width="640" height="360" controls src={currentVideo.url}>
        Your browser does not support the video tag.
      </video>
      <p>{currentVideoIndex + 1}. {currentVideo.description}</p>
      <div>
        <button onClick={handlePrevVideo}>Previous Video</button>
        <button onClick={handleNextVideo}>Next Video</button>
      </div>
    </div>
  );
}

export default App;