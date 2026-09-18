import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { addScore } from '../lib/storage';
import { drawShareCard, downloadCard } from '../lib/shareCard';
import React from 'react'

const ReactionTest = ({ onBack, onLeaderboard }) => {
  const [phase, setPhase] = useState('idle');
  const [ms, setMs] = useState(0);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false)
  const timeout = useRef(null);
  const start = useRef(0);
  useEffect(() => {
    if (phase === 'result') {
      confetti({
        particleCount: 70,
        spread: 65,
        startVelocity: 32,
        colors: ['#3ddc97', '#f2a541', '#e8ecef'],
        origin: { y: 0.4 },
      });
    }
  }, [phase]);
  function handleClick() {
    if (phase === 'idle') {
      setPhase('waiting');
      const delay = 1400 + Math.random() * 2600;
      timeout.current = setTimeout(() => {
        start.current = performance.now();
        setPhase('go');
      }, delay);
    }
    else if (phase == 'waiting') {
      clearTimeout(timeout.current);
      setPhase('early');
    }
    else if (phase === 'go') {
      const t = Math.round(performance.now() - start.current);
      setMs(t);
      setPhase('result');
    }
    else if (phase === 'early') {
      setPhase('idle');
    }
  }
  function percentile(t) {
    if (t < 150) return 99;
    if (t < 180) return 95;
    if (t < 200) return 90;
    if (t < 220) return 80;
    if (t < 250) return 65;
    if (t < 280) return 50;
    if (t < 320) return 35;
    if (t < 380) return 20;
    return 10;
  }
  const reset = () => {
    setPhase('idle');
    setSaved(false);
    setName('');
  }
  const handleSave = (e) => {
    e.preventDefault();
    addScore('reaction', name.trim(), ms);
    setSaved(true);
  }
  const handleShare = () => {
    const p = percentile(ms);
    const url = drawShareCard({
      title: 'Reaction Time',
      big: ms,
      unit: 'milliseconds',
      insight: `Faster than ${p}% of people tested.`,
      accent: '#3ddc97',
    });
    downloadCard(url, 'reaction-time.png');
  }
  if (phase == 'result') {
    const p = percentile(ms);
    return (
      <div className="wrap">
          <button className="back" onClick={onBack}>
  <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
  <span>Back</span>
</button>
     
        <div className="result-panel enter">
          <div className="result-label">your reaction time</div>
          <div className="big ticker">
            {ms}
            <span style={{ fontSize: 24 }}>ms</span>
          </div>
          <div className="result-insight">
            Faster than <b>{p}%</b> of people tested. Average human visual reaction time is around 250ms.
          </div>
          {!saved ? (
            <form className="name-form" onSubmit={handleSave}>
              <input
                placeholder="your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={16}
              />
              <button className="btn primary" type="submit">Save to leaderboard</button>
            </form>
          ) : (
            <div className="result-insight" style={{ color: '#3ddc97' }}>Saved ✓</div>
          )}
          <div className="btn-row">
            <button className="btn" onClick={handleShare}>Download share card</button>
            <button className="btn" onClick={reset}>Try again</button>
            <button className="btn" onClick={onLeaderboard}>View leaderboard</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="wrap">
      <button className="back" onClick={onBack}>
        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
        <span>Back</span>
      </button>
      <div className={'stage' + (phase === 'go' ? ' go' : '') + (phase === 'early' ? ' early' : '')} onClick={handleClick}>
        {phase === 'idle' && (
          <>
            <h2>Click to start</h2>
            <p className="sub">Then wait for green-don't click early.</p>
          </>
        )}
        {phase === 'waiting' && (
          <>
            <h2>Wait for green...</h2>
            <p className="sub">Stay ready</p>
          </>
        )}
        {phase === 'go' && <h2>Click Now!</h2>}
        {phase === 'early' && (
          <>
            <h2>Too soon</h2>
            <p className="sub">Click to try again</p>
          </>
        )
        }
      </div>
    </div>
  )
}

export default ReactionTest
