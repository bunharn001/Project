import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <main className="nf">
      <div className="nf__inner card">
        <h1 className="nf__code">404</h1>
        <p className="nf__text">ไม่พบหน้าที่คุณต้องการ</p>
        <a className="btn btn--primary" href="/">กลับสู่หน้าแรก</a>
      </div>
    </main>
  );
}

export default NotFound;
