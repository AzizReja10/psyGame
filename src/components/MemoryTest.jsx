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
        <div className="back" onClick={onBack}>← back</div>
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
      <div className="back" onClick={onBack}>← back</div>
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
