// dev-reload.js - Only include during development
if (window.location.hostname === 'localhost' || window.location.hostname === 'https://milanzinterior.vercel.app/') {
    const socket = new WebSocket('ws://localhost:8080');
    
    socket.onmessage = function(event) {
        if (event.data === 'reload') {
            window.location.reload();
        }
    };
    
    // Fallback to polling if WebSocket fails
    setTimeout(() => {
        if (socket.readyState !== WebSocket.OPEN) {
            setInterval(() => {
                fetch(window.location.href, {
                    method: 'HEAD',
                    cache: 'no-cache',
                    headers: { 'Cache-Control': 'no-cache' }
                }).catch(() => {});
            }, 1000);
        }
    }, 2000);
}