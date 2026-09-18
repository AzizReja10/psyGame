import { useState } from "react";
import { loadLB } from '../lib/storage'
import React from 'react'

const Leaderboard = ({ onBack }) => {
  const [tab, setTab] = useState('reaction');
  const data = loadLB();
  const rows = data[tab] || [];
  return (
    <div className="wrap">
      <button className="back" onClick={onBack}>
        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
        <span>Back</span>
      </button>
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
