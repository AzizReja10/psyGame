import React from 'react'
import { TextAnimate } from "@/components/ui/text-animate"
const Home = ({ onPick, onLeaderboard }) => {
  return (
    <div className='wrap'>
      <div className="kicker enter enter-1"><TextAnimate animation="blurInUp" by="word" as="h1">two-minute cognitive tests</TextAnimate></div>

      <h1 className='grad-text enter enter-2'>How sharp is your brain, right now?</h1>
      <p className='lede enter enter-3'>
        Two short tests grounded in real psychology research. See your numbers, compare against typical human ranges,
        and save your best run.
      </p>
      <p className="lede enter enter-4" style={{fontWeight:'bolder', marginTop: '6px'}}> Hold  the button to see changes.</p>
      <div className="stack enter enter-4">
        <div className="testrow" style={{cursor:'pointer'}} onClick={() => onPick('reaction')}>
          <div>
            <div className="name">Reaction Time</div>
            <div className="desc">Click the instant the screen turns green.</div>
          </div>
          <div className="go">→</div>
        </div>
        <div className="testrow" style={{cursor: 'pointer'}} onClick={() => onPick('memory')}>
          <div>
            <div className="name">Working memory</div>
            <div className="desc">Repeat back growing digit sequences.</div>
          </div>
          <div className="go">→</div>
        </div>
      </div>
<button className='viewLeader' style={{cursor:'pointer'}} onClick={onLeaderboard}>
  <span>View Leaderboard</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 74 74"
    height="34"
    width="34"
  >
    <circle stroke-width="3" stroke="black" r="35.5" cy="37" cx="37"></circle>
    <path
      fill="black"
      d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
    ></path>
  </svg>
</button>
      {/* <div className="lb-toggle enter enter-4" style={{cursor:'pointer'}} onClick={onLeaderboard}>view leaderboard</div> */}
      <footer>
        Reaction ranges from Deary et al. (2011); memory span from Miller's "7 ± 2" (1956).
      </footer>
    </div>
  )
}

export default Home
