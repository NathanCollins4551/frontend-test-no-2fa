const express = require('express');
const http = require('http');
const router = express.Router();

/**
 * Video Stream Proxy
 * Pipes the external video feed to the frontend to avoid CORS/Mixed content issues
 */
router.get('/video', (req, res) => {
  const proxyReq = http.request('http://localhost:8000/api/tracking/video_feed', (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });
  
  proxyReq.on('error', (e) => {
    console.error('Video proxy error:', e);
    res.status(500).end();
  });
  
  proxyReq.end();
});

module.exports = router;
