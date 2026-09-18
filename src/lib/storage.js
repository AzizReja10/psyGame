const LB_KEY = 'signal-leaderboard-v1';

export function loadLB() {
  try {
    const raw = localStorage.getItem(LB_KEY);
    return raw ? JSON.parse(raw) : { reaction: [], memory: [] };
  } catch (e) {
    return { reaction: [], memory: [] };
  }
}

export function saveLB(data) {
  try {
    localStorage.setItem(LB_KEY, JSON.stringify(data));
  } catch (e) {}
}

export function addScore(test, name, value) {
  const data = loadLB();
  data[test].push({ name: name || 'Anon', value, date: Date.now() });
  data[test].sort((a, b) => (test === 'reaction' ? a.value - b.value : b.value - a.value));
  data[test] = data[test].slice(0, 10);
  saveLB(data);
  return data;
}