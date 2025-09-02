import React, { useMemo } from 'react';
import './Home.css';

// Simple weekly business hours (11:00-22:00 everyday)
const HOURS = [
  { label: 'อาทิตย์', open: '11:00', close: '22:00' },
  { label: 'จันทร์', open: '11:00', close: '22:00' },
  { label: 'อังคาร', open: '11:00', close: '22:00' },
  { label: 'พุธ', open: '11:00', close: '22:00' },
  { label: 'พฤหัสบดี', open: '11:00', close: '22:00' },
  { label: 'ศุกร์', open: '11:00', close: '23:00' },
  { label: 'เสาร์', open: '11:00', close: '23:00' },
];

function toMins(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function useOpenNow(hours) {
  return useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0=Sunday
    const mins = now.getHours() * 60 + now.getMinutes();
    const today = hours[day];
    if (!today?.open || !today?.close) return { open: false, today };
    const isOpen = toMins(today.open) <= mins && mins < toMins(today.close);
    return { open: isOpen, today };
  }, [hours]);
}

function Home() {
  const status = useOpenNow(HOURS);

  const menuHighlights = [
    { name: 'แกงเขียวหวานไก่', price: 180, tags: ['เผ็ดกลาง'], emoji: '🥘' },
    { name: 'ผัดไทยกุ้งสด', price: 160, tags: ['ฮาลาล'], emoji: '🍤' },
    { name: 'ส้มตำไทย', price: 95, tags: ['เผ็ด'], emoji: '🥗' },
    { name: 'ข้าวเหนียวมะม่วง', price: 120, tags: ['มังสวิรัติ'], emoji: '🥭' },
  ];

  const specials = [
    { name: 'ชุดมื้อเที่ยงไทยแท้', detail: 'เลือกได้ 1 จานหลัก + 1 ของหวาน + น้ำ', price: 199 },
    { name: 'ปลากะพงทอดน้ำปลา', detail: 'เสิร์ฟพร้อมน้ำจิ้มซีฟู้ด', price: 350 },
  ];

  const promos = [
    { title: 'Happy Hour 15:00–17:00', desc: 'เครื่องดื่มลด 20%' },
    { title: 'โปรวันเกิด', desc: 'ส่วนลด 10% เมื่อยืนยันบัตรประชาชน' },
  ];

  const reviews = [
    { name: 'Nok', text: 'รสชาติดีมาก บริการน่ารัก กลับมาอีกแน่นอน!' },
    { name: 'Bank', text: 'ผัดไทยหอมมาก เส้นหนึบกำลังดี ราคาสมเหตุผล' },
    { name: 'Aom', text: 'บรรยากาศดี รูปสวยทุกจาน แนะนำข้าวเหนียวมะม่วง' },
  ];

  return (
    <main className="home">
      {/* Navbar */}
      <nav className="home__nav">
        <div className="home__nav-inner">
          <a href="#" className="home__brand">DreamBistro</a>
          <div className="home__nav-links">
            <a href="#menu">เมนู</a>
            <a href="#specials">พิเศษวันนี้</a>
            <a href="#contact">ติดต่อเรา</a>
            <a href="/login">เข้าสู่ระบบ</a>
            <a className="home__nav-tel" href="tel:+6612345678">โทร 012-345-678</a>
          </div>
        </div>
      </nav>

      {/* Hero with CTAs */}
      <section className="home__hero">
        <div className="home__hero-inner">
          <h1 className="home__title">ลิ้มลองรสไทยแท้ ในบรรยากาศอบอุ่น</h1>
          <p className="home__subtitle">
            คัดสรรวัตถุดิบคุณภาพ ปรุงสดใหม่ทุกวัน พร้อมต้อนรับคุณและคนพิเศษ
          </p>
          <div className="home__cta">
            <a className="btn btn--primary" href="#reserve">จองโต๊ะ</a>
            <a className="btn btn--ghost" href="#menu">ดูเมนู</a>
            <a className="btn btn--ghost" href="https://line.me/" target="_blank" rel="noreferrer">สั่งเดลิเวอรี</a>
          </div>
          <div className={`home__status ${status.open ? 'is-open' : 'is-closed'}`}>
            {status.open ? 'เปิดอยู่ตอนนี้' : 'ปิดอยู่ในขณะนี้'} · วันนี้ {status.today.open}–{status.today.close}
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="home__features">
        <h2 className="home__section-title">เมนูแนะนำ</h2>
        <div className="home__features-grid">
          {menuHighlights.map((m) => (
            <div key={m.name} className="feature">
              <div className="feature__icon" aria-hidden>{m.emoji}</div>
              <h3 className="feature__title">{m.name}</h3>
              <p className="feature__text">฿{m.price} · {m.tags.join(' / ')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Specials Today */}
      <section id="specials" className="home__panel">
        <h2>พิเศษวันนี้</h2>
        <ul className="list">
          {specials.map((s) => (
            <li key={s.name} className="list__item">
              <div>
                <strong>{s.name}</strong>
                <div className="muted">{s.detail}</div>
              </div>
              <div className="price">฿{s.price}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Promotions */}
      <section className="home__panel">
        <h2>โปรโมชั่น</h2>
        <div className="cards">
          {promos.map((p) => (
            <div key={p.title} className="card">
              <div className="card__title">{p.title}</div>
              <div className="card__text">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="home__panel">
        <h2>รีวิวจากลูกค้า</h2>
        <div className="cards cards--3">
          {reviews.map((r, i) => (
            <div key={i} className="card card--quote">
              <div className="card__text">“{r.text}”</div>
              <div className="card__title">— {r.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="home__panel">
        <h2>แกลเลอรี</h2>
        <div className="gallery">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="gallery__item" aria-hidden />
          ))}
        </div>
      </section>

      {/* Reservation Anchor */}
      <section id="reserve" className="home__panel">
        <h2>จองโต๊ะ</h2>
        <p className="muted">โทรหาเรา หรือจองผ่าน LINE ได้เลย</p>
        <div className="home__cta">
          <a className="btn btn--primary" href="tel:+6612345678">โทร 012-345-678</a>
          <a className="btn btn--ghost" href="https://line.me/" target="_blank" rel="noreferrer">จองผ่าน LINE</a>
        </div>
      </section>

      {/* Hours */}
      <section className="home__panel">
        <h2>เวลาเปิด–ปิด</h2>
        <ul className="hours">
          {HOURS.map((h, idx) => (
            <li key={h.label} className={`hours__row ${idx === new Date().getDay() ? 'today' : ''}`}>
              <span>{h.label}</span>
              <span>{h.open} – {h.close}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Map & Contact */}
      <section id="contact" className="home__panel">
        <h2>ติดต่อและแผนที่</h2>
        <div className="contact">
          <div className="contact__info">
            <div>123 ถนนสุขุมวิท เขตคลองเตย กรุงเทพฯ 10110</div>
            <div>โทร <a href="tel:+6612345678">012-345-678</a> · <a href="mailto:hello@dreambistro.example">hello@dreambistro.example</a></div>
            <div>LINE: <a href="https://line.me/" target="_blank" rel="noreferrer">@dreambistro</a></div>
            <div className="home__cta" style={{ marginTop: 12 }}>
              <a className="btn btn--primary" href="https://maps.google.com/?q=DreamBistro" target="_blank" rel="noreferrer">เปิดใน Google Maps</a>
              <a className="btn btn--ghost" href="https://apple.co/maps" target="_blank" rel="noreferrer">เปิดใน Apple Maps</a>
            </div>
          </div>
          <div className="contact__map">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.7049644201656!2d100.556!3d13.736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBangkok!5e0!3m2!1sen!2sth!4v0000000000"
              width="100%"
              height="240"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <footer className="home__footer">
        <small>© {new Date().getFullYear()} DreamBistro</small>
      </footer>
    </main>
  );
}

export default Home;
