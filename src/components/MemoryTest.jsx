import { useState,useEffect,useRef } from "react";
import confetti from "canvas-confetti";
import {addScore} from '../lib/storage';
import { drawShareCard,downloadCard } from "../lib/shareCard";
import React from 'react'

const MemoryTest = ({onBack,onLeaderboard}) => {
	const[seq,setSeq]=useState([]);
	const[level,setLevel]=useState(1);
	const[showing,setShowing]=useState(true);
	const[display,setDisplay]=useState('');
	const[userIdx,setUserIdx]=useState(0);
	const[done,setDone]=useState(false);
	const [wrong, setWrong] = useState(false);
  const [popKey, setPopKey] = useState(0);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  const seqRef = useRef([]);
  const startLevel=(prevSeq)=>{
	const next=[...prevSeq,Math.floor(Math.random()*10)];
	seqRef.current=next;
	setSeq(next);
	setUserIdx(0);
	setShowing(true);
	setWrong(false);
	playSequence(next);
  }

  useEffect(() => {
    startLevel([]);
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (showing || done) return;
      if (e.key >= '0' && e.key <= '9') {
        handleDigit(parseInt(e.key, 10));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showing, done, userIdx, level]);

  const playSequence = (sequence) => {
    let i = 0;
    setDisplay('');
    setShowing(true);
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setDisplay(String(sequence[i]));
        setPopKey((k) => k + 1);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDisplay('?');
          setShowing(false);
        }, 500);
      }
    }, 750);
  };

  const handleDigit = (d) => {
    const sequence = seqRef.current;
    if (d === sequence[userIdx]) {
      const nextIdx = userIdx + 1;
      if (nextIdx === sequence.length) {
        setDisplay('✓');
        setPopKey((k) => k + 1);
        confetti({
          particleCount: 36,
          spread: 55,
          startVelocity: 24,
          colors: ['#f2a541', '#3ddc97'],
          origin: { y: 0.45 },
        });
        const nextLevel = level + 1;
        setTimeout(() => {
          setLevel(nextLevel);
          startLevel(sequence);
        }, 650);
      } else {
        setUserIdx(nextIdx);
        setDisplay(String(d));
        setPopKey((k) => k + 1);
      }
    } else {
      setDisplay(String(d));
      setWrong(true);
      setPopKey((k) => k + 1);
      setTimeout(() => {
        setDone(true);
      }, 500);
    }
  };

  const insight = (span) => {
    if (span >= 8) return 'Exceptional — well above the typical range of 7 ± 2 digits.';
    if (span >= 6) return 'Right in the typical adult range (7 ± 2 digits).';
    if (span >= 4) return 'A bit below average — memory span often dips under pressure.';
    return 'Everyone has an off run. Give it another shot.';
  };

  const handleSave = (e) => {
    e.preventDefault();
    addScore('memory', name.trim(), seq.length - 1);
    setSaved(true);
  };

  const handleShare = () => {
    const span = seq.length - 1;
    const url = drawShareCard({
      title: 'Working Memory',
      big: span,
      unit: 'digit span',
      insight: insight(span),
      accent: '#f2a541',
    });
    downloadCard(url, 'memory-span.png');
  };

  const reset = () => {
    setDone(false);
    setSaved(false);
    setName('');
    setLevel(1);
    startLevel([]);
  };

  if (done) {
    const span = seq.length - 1;
    return (
      <div className="wrap">
                  <button className="back" onClick={onBack}>
  <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
  <span>Back</span>
</button>
        <div className="result-panel enter">
          <div className="result-label">your working memory span</div>
          <div className="big amber ticker">
            {span}
            <span style={{ fontSize: 20 }}> digits</span>
          </div>
          <div className="result-insight">{insight(span)}</div>
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
            <div className="result-insight" style={{ color: '#f2a541' }}>Saved ✓</div>
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
      <div className="stage" style={{ cursor: 'default' }}>
        <h2>Level {level}</h2>
        <div className={`digit ${wrong ? 'shake' : 'pop'}`} key={popKey}>
          {display}
        </div>
        {!showing && (
          <div className="pad">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
              <button key={d} className="key" onClick={() => handleDigit(d)}>
                {d}
              </button>
            ))}
          </div>
        )}
        {showing && <p className="sub">watch the sequence</p>}
      </div>
    </div>
  );
}

export default MemoryTest
