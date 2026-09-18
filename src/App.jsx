import React from 'react'
import { useState, useEffect } from 'react';
import Home from './components/Home';
import MemoryTest from './components/MemoryTest';
import ReactionTest from './components/ReactionTest';
import Leaderboard from './components/Leaderboard';
import { CursorifyProvider,DefaultCursor } from '@cursorify/react';
const App = () => {
  const [view, setView] = useState('home');
  useEffect(() => {
    function handleMove(e) {
      const s = document.getElementById('spotlight');
      if (s) {
        s.style.left = e.clientX + 'px';
        s.style.top = e.clientY + 'px';
      }
    }
    document.addEventListener('mousemove', handleMove);
    return () => document.removeEventListener('mousemove', handleMove);
  }, []);
  return (
    <CursorifyProvider
      enabled={true}
      cursor={<DefaultCursor />}
      opacity={1}
      delay={3}
      defaultCursorVisible={false}
      breakpoint={0}>
      <>
       <div className="big-aurora">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>
      <div className="spotlight" id='spotlight'></div>
      {view === 'home' && <Home onPick={setView} onLeaderboard={() => setView('leaderboard')} />}
      {view === 'reaction' && (
        <ReactionTest onBack={() => setView('home')} onLeaderboard={() => setView('leaderboard')} />
      )}
      {view === 'memory' && (
        <MemoryTest onBack={() => setView('home')} onLeaderboard={() => setView('leaderboard')} />
      )}
      {view === 'leaderboard' && <Leaderboard onBack={() => setView('home')} />}
      </>
    </CursorifyProvider>
    
  )
}

export default App
