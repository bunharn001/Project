import React from 'react';
import './Home.css';

function Home() {
  return (
    <main className="home">
      <section className="home__hero">
        <div className="home__hero-inner">
          <h1 className="home__title">ยินดีต้อนรับสู่ DreamProject</h1>
          <p className="home__subtitle">
            สร้างไอเดียให้เป็นจริง รวดเร็ว เรียบง่าย และทรงพลัง
          </p>
          <div className="home__cta">
            <a className="btn btn--primary" href="#get-started">เริ่มต้นใช้งาน</a>
            <a className="btn btn--ghost" href="#learn-more">เรียนรู้เพิ่มเติม</a>
          </div>
        </div>
      </section>

      <section id="learn-more" className="home__features">
        <div className="home__features-grid">
          <div className="feature">
            <div className="feature__icon" aria-hidden>⚡️</div>
            <h3 className="feature__title">รวดเร็ว</h3>
            <p className="feature__text">พร้อมใช้งานทันที ไม่ต้องตั้งค่าซับซ้อน</p>
          </div>
          <div className="feature">
            <div className="feature__icon" aria-hidden>🧩</div>
            <h3 className="feature__title">ยืดหยุ่น</h3>
            <p className="feature__text">ปรับแต่งได้ตามความต้องการของทีมคุณ</p>
          </div>
          <div className="feature">
            <div className="feature__icon" aria-hidden>🔒</div>
            <h3 className="feature__title">มั่นคงปลอดภัย</h3>
            <p className="feature__text">ออกแบบโดยคำนึงถึงความปลอดภัยเป็นหลัก</p>
          </div>
        </div>
      </section>

      <section id="get-started" className="home__panel">
        <h2>เริ่มต้นใน 3 ขั้นตอน</h2>
        <ol className="home__steps">
          <li>ติดตั้งและรันโครงการ</li>
          <li>เชื่อมต่อกับ Backend</li>
          <li>ปรับแต่งหน้าและคอมโพเนนต์</li>
        </ol>
        <a className="btn btn--primary" href="#">เปิดเอกสาร</a>
      </section>

      <footer className="home__footer">
        <small>© {new Date().getFullYear()} DreamProject</small>
      </footer>
    </main>
  );
}

export default Home;
