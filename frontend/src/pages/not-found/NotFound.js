import React from 'react';

function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0f172a', color: '#e2e8f0', textAlign: 'center', padding: 16 }}>
      <div>
        <h1 style={{ fontSize: 48, margin: 0 }}>404</h1>
        <p style={{ marginTop: 8 }}>ไม่พบหน้าที่คุณต้องการ</p>
        <a href="/" style={{ display: 'inline-block', marginTop: 16, color: '#ffffff', background: '#6366f1', padding: '10px 14px', borderRadius: 10, textDecoration: 'none', fontWeight: 600 }}>
          กลับสู่หน้าแรก
        </a>
      </div>
    </main>
  );
}

export default NotFound;

