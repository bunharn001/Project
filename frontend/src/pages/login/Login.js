import React, { useState } from 'react';
import '../../interfaces/fields/fields.css';
import TextField from '../../interfaces/fields/TextField';
import { login } from '../../http/auth';

function Login() {
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('password123');
  const [showPwd, setShowPwd] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await login({ email, password });
      // Optionally persist token if provided
      if (res && res.token) {
        try { localStorage.setItem('token', res.token); } catch {}
      }
      setSuccess('เข้าสู่ระบบสำเร็จ');
    } catch (err) {
      setError(err.message || 'เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="home" style={{ background: 'var(--md-sys-color-background)' }}>
      <section className="home__panel" style={{ paddingTop: 24 }}>
        <h1 style={{ margin: '0 0 12px' }}>เข้าสู่ระบบ</h1>
        <p className="muted" style={{ margin: '0 0 16px' }}>ส่งข้อมูลไปที่ API: http://localhost:4000/login</p>

        <form className="create__form" onSubmit={onSubmit}>
          <TextField label="Email" name="email" type="email" value={email} onChange={setEmail} required />

          <label className="fld">
            <span className="fld__label">Password *</span>
            <div className="fld__input-wrap">
              <input
                className="fld__input"
                type={showPwd ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="fld__reveal" onClick={() => setShowPwd((s) => !s)} aria-label="toggle password">
                {showPwd ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <div className="create__actions">
            <button className="btn btn--primary" type="submit" disabled={sending}>
              {sending ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </div>

          {error && <div className="card" style={{ padding: 12, marginTop: 8, color: 'crimson' }}>Error: {error}</div>}
          {success && <div className="card" style={{ padding: 12, marginTop: 8, color: 'green' }}>{success}</div>}
        </form>
      </section>
    </main>
  );
}

export default Login;

