import { useState } from "react";
import { loadLB } from '../lib/storage'
import React from 'react'

const Leaderboard = ({ onBack }) => {
  const [tab, setTab] = useState('reaction');
  const data = loadLB();
  const rows = data[tab] || [];
  return (
    <div className="wrap">
      <div className="back" onClick={onBack}>← back</div>
      <h1 style={{ fontSize: 28 }}>Leaderboard</h1>
      <p className="lede"> Saved on this device only.</p>
      <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
        <button className={'btn ' + (tab === 'reaction' ? 'primary' : '')} onClick={() => setTab('reaction')}>Reaction</button>
        <button className={'btn ' + (tab === 'memory' ? 'primary' : '')} onClick={() => setTab('memory')}>Memory</button>
      </div>
      <div className="panel">
        {rows.length === 0 && <div className="lb-empty">NO scores yet - got set one.</div>}
        {rows.map((r, i) => (
          <div className="lb-row" key={i}>
            <span>
              <span className="lb-rank mono">{i + 1}</span>
              {r.name}
            </span>
            <span className="mono">
              {r.value}
              {tab === 'reaction' ? 'ms' : 'digits'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard
