const { WebSocketServer } = require('ws');

// ⚠️ HARDWARE exposes Local WebSocket for CORE to consume
const wss = new WebSocketServer({ port: 8081 });
console.log('[HW] Sidecar listening on ws://localhost:8081');

wss.on('connection', (ws) => {
  console.log('[HW] Core connected!');
  
  // Mock data loop (Replace with real SerialPort logic later)
  const interval = setInterval(() => {
    const weight = Math.floor(Math.random() * 1000) + 5000;
    const isStable = Math.random() > 0.3;
    ws.send(JSON.stringify({ type: 'WEIGHT', value: weight, stable: isStable }));
  }, 1000);

  ws.on('close', () => {
    console.log('[HW] Core disconnected.');
    clearInterval(interval);
  });
});
