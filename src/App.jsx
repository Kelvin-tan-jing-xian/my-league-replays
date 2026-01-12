import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import Fuse from 'fuse.js';

function App() {
  const videoRef = useRef(null);
  const videoData = [
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
    { url: '/j4StealAtakhan.mp4', description: 'Waited in opponents bush side knowing they wont expect me to be there, Stole atakhan with smite and R', keywords: ['steal atakhan', 'stole atakhan','stealatakhan','j4 steal atakhan'] },
    { url: '/GoodUseOfRiftHerald.mp4', description: 'Saw all of enemy taking bot drag so I use herald on mid and got 2 inner turrets', keywords: ['herald push mid', 'rift herald push mid','rift herald mid push','push mid rift herald','2 mid turrets 1 inihibitor'] },
    { url: '/kaynSoloKillAmumu.mp4', description: 'invaded enemy top took his red quadrant and placed ward and saw amumu walking into me so I ambushed him knowing im stronger with red buff and potion and first to attack, main point was to farm red orbs', keywords: ['kayn amumu', 'invade red quadrant','kayn solo kill amumu'] },
    { url: '/j4OutplayNasus.mp4', description: 'Nasus no flash so I knew as long as I cage him and E Q out he cant do shit, so I baited him into tower and caged and outplayed him', keywords: ['j4 outplay nasus', 'j4 cage nasus'] },
    { url: '/kaynStealBaron.mp4', description: 'flashed in and stole baron', keywords: ['kayn steal baron', 'kayn stole baron'] },
    { url: '/kaynSoloKillMalphite.mp4', description: 'Kayn wins Malphite 1v1 at level 1', keywords: ['kayn solo kill malphite', 'kayn 1v1 malphite', 'kayn malphite level 1', 'kayn malphite lvl 1'] },
    { url: '/kaynKillMalphiteAtRaptors.mp4', description: 'I knew malphite will clear raptors so I invaded and stole his raptors knowing I am stronger early game', keywords: ['kayn solo kill malphite raptors', 'kayn invade malphite raptors'] },
    { url: '/kaynKillMundoAtGromp.mp4', description: 'Saw mundo used smite at blue so I know his gromp is confirm mine', keywords: ['kayn kill mundo at gromp', 'kayn steal mundo gromp'] },
    { url: '/j4WinGrubsFight.mp4', description: 'Stole 2 grubs and won teamfight', keywords: ['j4 steal voidgrubs', 'j4 stole grubs','j4 stole voidgrubs', 'j4 win grubs fight'] },
    { url: '/j4WonMidFight.mp4', description: 'I knew tower was 1hp so I just destroy with 1 auto and baited fizz into fighting me and I know I am stronger than him', keywords: ['tower 1 hp', 'j4 kill fizz mid'] },
    { url: '/j4KillLulu.mp4', description: 'I knew lulu gonna run to zac to save him so I pretend to go for zac but I surprised all in lulu instead', keywords: ['j4 kill lulu'] },
    { url: '/j4WonTeamfightNearDragon.mp4', description: 'I knew I can E Q escape over dragon wall so I R into that position and escaped while trapping the enemy team, setting up my team for teamfight win', keywords: ['j4 win teamfight near dragon', 'j4 win teamfight near drake'] },
    { url: '/j4MalzaharCombo.mp4', description: 'I combo my E Q knockup with malzahar R suppression', keywords: ['j4 malzahar combo'] },
    // { url: '/kayggrgergregreg.mp4', description: 'gregergergergg', keywords: ['kayn', 'mundo'] },
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