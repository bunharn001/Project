import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../interfaces/fields/fields.css';
import TextField from '../../interfaces/fields/TextField';
import SelectField from '../../interfaces/fields/SelectField';
import CheckboxGroup from '../../interfaces/fields/CheckboxGroup';
import { createUser } from '../../http/users';

const DIETARY = ['vegetarian', 'vegan', 'halal', 'gluten-free'];
const CATEGORIES = ['Italian', 'Mexican', 'Thai', 'Japanese'];
const ROLES = ['customer', 'admin'];
const SPICE = ['none', 'mild', 'medium', 'hot'];

function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: 'eater Doe',
    email: 'johndoe@example.com',
    password: 'password123',
    phone: '+1234567890',
    role: 'customer',
    avatar: '',
    isActive: true,
    preferences: {
      dietary: ['vegetarian'],
      favoriteCategories: ['Italian', 'Mexican'],
      spiceLevel: 'medium',
    },
  });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(form.password);
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const jsonPreview = useMemo(() => JSON.stringify(form, null, 2), [form]);

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));
  const updatePref = (patch) => setForm((prev) => ({ ...prev, preferences: { ...prev.preferences, ...patch } }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }
    setSending(true);
    setError(null);
    setResult(null);
    try {
      // Force isActive true when creating
      const payload = { ...form, isActive: true };
      const res = await createUser(payload);
      setResult(res);
      // Redirect to login after successful creation
      navigate('/login', { replace: true, state: { from: 'create' } });
    } catch (err) {
      setError(err.message || 'Failed to create user');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="home" style={{ background: 'var(--md-sys-color-background)' }}>
      <section className="home__panel" style={{ paddingTop: 24 }}>
        <h1 style={{ margin: '0 0 12px' }}>Create User</h1>
        <p className="muted" style={{ margin: '0 0 16px' }}>ส่งข้อมูลไปที่ API: http://localhost:4000/api/users</p>

        <form className="create__form" onSubmit={onSubmit}>
          <div className="create__row">
            <TextField label="Name" name="name" value={form.name} onChange={(v) => update({ name: v })} required />
            <TextField label="Email" name="email" type="email" value={form.email} onChange={(v) => update({ email: v })} required />
          </div>

          <div className="create__row">
            <label className="fld">
              <span className="fld__label">Password *</span>
              <div className="fld__input-wrap">
                <input
                  className="fld__input"
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={(e) => update({ password: e.target.value })}
                  required
                />
                <button type="button" className="fld__reveal" onClick={() => setShowPwd((s) => !s)} aria-label="toggle password">
                  {showPwd ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            <label className="fld">
              <span className="fld__label">Confirm Password *</span>
              <div className="fld__input-wrap">
                <input
                  className="fld__input"
                  type={showPwd2 ? 'text' : 'password'}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button type="button" className="fld__reveal" onClick={() => setShowPwd2((s) => !s)} aria-label="toggle confirm password">
                  {showPwd2 ? 'Hide' : 'Show'}
                </button>
              </div>
              <span className={form.password === confirmPassword ? 'fld__hint' : 'fld__error'}>
                {form.password === confirmPassword ? 'พิมพ์รหัสผ่านให้เหมือนกันทั้งสองช่อง' : 'รหัสผ่านไม่ตรงกัน'}
              </span>
            </label>
          </div>

          <div className="create__row">
            <TextField label="Phone" name="phone" type="tel" value={form.phone} onChange={(v) => update({ phone: v })} />
            <SelectField label="Role" name="role" value={form.role} onChange={(v) => update({ role: v })} options={ROLES} />
          </div>

          <div className="create__row">
            <TextField label="Avatar URL" name="avatar" type="url" value={form.avatar} onChange={(v) => update({ avatar: v })} placeholder="https://..." />
          </div>

          <CheckboxGroup label="Dietary" name="dietary" value={form.preferences.dietary} onChange={(v) => updatePref({ dietary: v })} options={DIETARY} />
          <CheckboxGroup label="Favorite Categories" name="favoriteCategories" value={form.preferences.favoriteCategories} onChange={(v) => updatePref({ favoriteCategories: v })} options={CATEGORIES} />
          <SelectField label="Spice Level" name="spiceLevel" value={form.preferences.spiceLevel} onChange={(v) => updatePref({ spiceLevel: v })} options={SPICE} />

          <div className="create__actions">
            <button className="btn btn--primary" type="submit" disabled={sending || form.password !== confirmPassword}>
              {sending ? 'กำลังส่ง...' : 'สร้างผู้ใช้'}
            </button>
          </div>

          {error && <div className="card" style={{ padding: 12, marginTop: 8, color: 'crimson' }}>Error: {error}</div>}
          {result && <div className="card" style={{ padding: 12, marginTop: 8, color: 'green' }}>สร้างผู้ใช้สำเร็จ</div>}
        </form>
      </section>
    </main>
  );
}

export default Create;
