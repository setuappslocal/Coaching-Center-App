import { useState } from "react";

// ── Fake Data ──────────────────────────────────────────────────────────────
const STUDENTS = [
  { id: "S001", name: "Priya Sharma",     parent: "Suresh Sharma",   phone: "9876543210", subject: "Mathematics", active: true },
  { id: "S002", name: "Rahul Verma",      parent: "Vijay Verma",     phone: "9876543211", subject: "Science",     active: true },
  { id: "S003", name: "Anjali Reddy",     parent: "Ravi Reddy",      phone: "9876543212", subject: "English",     active: true },
  { id: "S004", name: "Mohammed Ali",     parent: "Basheer Ali",     phone: "9876543213", subject: "Mathematics", active: true },
  { id: "S005", name: "Divya Nair",       parent: "Suresh Nair",     phone: "9876543214", subject: "Science",     active: true },
  { id: "S006", name: "Kiran Kumar",      parent: "Ramesh Kumar",    phone: "9876543215", subject: "English",     active: true },
  { id: "S007", name: "Sneha Patil",      parent: "Anil Patil",      phone: "9876543216", subject: "Mathematics", active: true },
  { id: "S008", name: "Arjun Singh",      parent: "Harpal Singh",    phone: "9876543217", subject: "Science",     active: true },
];

const ATTENDANCE = [
  { id: "A001", studentId: "S001", studentName: "Priya Sharma",   date: "2026-06-09", status: "Present", markedBy: "Mr. Kumar" },
  { id: "A002", studentId: "S002", studentName: "Rahul Verma",    date: "2026-06-09", status: "Absent",  markedBy: "Mr. Kumar" },
  { id: "A003", studentId: "S003", studentName: "Anjali Reddy",   date: "2026-06-09", status: "Present", markedBy: "Mr. Kumar" },
  { id: "A004", studentId: "S004", studentName: "Mohammed Ali",   date: "2026-06-09", status: "Late",    markedBy: "Mr. Kumar" },
  { id: "A005", studentId: "S005", studentName: "Divya Nair",     date: "2026-06-09", status: "Present", markedBy: "Mrs. Rao"  },
  { id: "A006", studentId: "S006", studentName: "Kiran Kumar",    date: "2026-06-09", status: "Present", markedBy: "Mrs. Rao"  },
  { id: "A007", studentId: "S007", studentName: "Sneha Patil",    date: "2026-06-09", status: "Absent",  markedBy: "Mrs. Rao"  },
  { id: "A008", studentId: "S008", studentName: "Arjun Singh",    date: "2026-06-09", status: "Present", markedBy: "Mrs. Rao"  },
  { id: "A009", studentId: "S001", studentName: "Priya Sharma",   date: "2026-06-10", status: "Present", markedBy: "Mr. Kumar" },
  { id: "A010", studentId: "S002", studentName: "Rahul Verma",    date: "2026-06-10", status: "Present", markedBy: "Mr. Kumar" },
  { id: "A011", studentId: "S003", studentName: "Anjali Reddy",   date: "2026-06-10", status: "Late",    markedBy: "Mr. Kumar" },
  { id: "A012", studentId: "S004", studentName: "Mohammed Ali",   date: "2026-06-10", status: "Present", markedBy: "Mr. Kumar" },
];

const FEES = [
  { id: "F001", studentId: "S001", studentName: "Priya Sharma",   month: "June 2026",  amount: 500, status: "Paid",     dueDate: "2026-06-20", paidDate: "2026-06-05" },
  { id: "F002", studentId: "S002", studentName: "Rahul Verma",    month: "June 2026",  amount: 500, status: "Not Paid", dueDate: "2026-06-20", paidDate: null },
  { id: "F003", studentId: "S003", studentName: "Anjali Reddy",   month: "June 2026",  amount: 500, status: "Not Paid", dueDate: "2026-06-20", paidDate: null },
  { id: "F004", studentId: "S004", studentName: "Mohammed Ali",   month: "June 2026",  amount: 500, status: "Paid",     dueDate: "2026-06-20", paidDate: "2026-06-08" },
  { id: "F005", studentId: "S005", studentName: "Divya Nair",     month: "June 2026",  amount: 500, status: "Not Paid", dueDate: "2026-06-20", paidDate: null },
  { id: "F006", studentId: "S006", studentName: "Kiran Kumar",    month: "June 2026",  amount: 500, status: "Paid",     dueDate: "2026-06-20", paidDate: "2026-06-10" },
  { id: "F007", studentId: "S007", studentName: "Sneha Patil",    month: "June 2026",  amount: 500, status: "Not Paid", dueDate: "2026-06-20", paidDate: null },
  { id: "F008", studentId: "S008", studentName: "Arjun Singh",    month: "June 2026",  amount: 500, status: "Paid",     dueDate: "2026-06-20", paidDate: "2026-06-12" },
  { id: "F009", studentId: "S001", studentName: "Priya Sharma",   month: "May 2026",   amount: 500, status: "Paid",     dueDate: "2026-05-20", paidDate: "2026-05-15" },
  { id: "F010", studentId: "S002", studentName: "Rahul Verma",    month: "May 2026",   amount: 500, status: "Paid",     dueDate: "2026-05-20", paidDate: "2026-05-18" },
];

const NOTICES = [
  { id: "N001", title: "Holiday Notice",    text: "Classes are cancelled on June 20th due to a public holiday.", targetClass: "All",         sendDate: "2026-06-12", sentStatus: "Yes" },
  { id: "N002", title: "Monthly Test",      text: "Monthly test on June 25th covering chapters 4 and 5.",        targetClass: "Mathematics", sendDate: "2026-06-13", sentStatus: "Yes" },
  { id: "N003", title: "Fee Reminder",      text: "This is a reminder that June fees are due by June 20th.",    targetClass: "All",         sendDate: "2026-06-14", sentStatus: "Yes" },
  { id: "N004", title: "Extra Class",       text: "Extra class scheduled for Science students on June 22nd.",   targetClass: "Science",     sendDate: "2026-06-15", sentStatus: "No"  },
  { id: "N005", title: "PTM Notice",        text: "Parent Teacher Meeting on June 28th from 10 AM to 1 PM.",    targetClass: "All",         sendDate: "2026-06-18", sentStatus: "No"  },
];

// ── Helpers ────────────────────────────────────────────────────────────────
const statusBadge = (status) => {
  const map = {
    "Present":  { bg: "#dcfce7", color: "#166534", label: "Present" },
    "Absent":   { bg: "#fee2e2", color: "#991b1b", label: "Absent"  },
    "Late":     { bg: "#fef9c3", color: "#854d0e", label: "Late"    },
    "Paid":     { bg: "#dcfce7", color: "#166534", label: "Paid"    },
    "Not Paid": { bg: "#fee2e2", color: "#991b1b", label: "Not Paid"},
    "Yes":      { bg: "#dcfce7", color: "#166534", label: "Sent"    },
    "No":       { bg: "#f3f4f6", color: "#6b7280", label: "Pending" },
  };
  const s = map[status] || { bg: "#f3f4f6", color: "#6b7280", label: status };
  return (
    <span style={{ background: s.bg, color: s.color, borderRadius: 99, padding: "3px 10px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  );
};

const Avatar = ({ name, color }) => {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{ width: 38, height: 38, borderRadius: "50%", background: color || "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#3730a3", flexShrink: 0 }}>
      {initials}
    </div>
  );
};

const avatarColors = ["#dbeafe","#fce7f3","#dcfce7","#fef9c3","#ede9fe","#ffedd5","#e0f2fe","#f0fdf4"];
const getColor = (id) => avatarColors[parseInt(id.replace(/\D/g,"")) % avatarColors.length];

// ── Shared Components ──────────────────────────────────────────────────────
const SearchBar = ({ value, onChange, placeholder }) => (
  <div style={{ position: "relative", marginBottom: 12 }}>
    <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "#9ca3af" }}>🔍</span>
    <input
      value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder || "Search..."}
      style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, background: "#f9fafb", outline: "none", boxSizing: "border-box" }}
    />
  </div>
);

const Row = ({ left, right, onClick, style }) => (
  <div onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "#fff", borderRadius: 12, border: "1px solid #f3f4f6", cursor: onClick ? "pointer" : "default", transition: "box-shadow 0.15s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", ...style }}
    onMouseEnter={e => onClick && (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)")}
    onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)")}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>{left}</div>
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 8 }}>{right}</div>
  </div>
);

const SectionHeader = ({ title, count, action }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
    <div>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111827" }}>{title}</h2>
      {count !== undefined && <span style={{ fontSize: 12, color: "#9ca3af" }}>{count} records</span>}
    </div>
    {action}
  </div>
);

const AddBtn = ({ onClick, label }) => (
  <button onClick={onClick} style={{ background: "#4f46e5", color: "#fff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
    <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> {label}
  </button>
);

const Modal = ({ title, onClose, children }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
    <div style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", width: "100%", maxWidth: 420, maxHeight: "80vh", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{title}</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" }}>✕</button>
      </div>
      {children}
    </div>
  </div>
);

const Field = ({ label, value, onChange, type = "text", options }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 5 }}>{label}</label>
    {options ? (
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1.5px solid #e5e7eb", fontSize: 14, background: "#f9fafb", outline: "none" }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    ) : (
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1.5px solid #e5e7eb", fontSize: 14, background: "#f9fafb", outline: "none", boxSizing: "border-box" }} />
    )}
  </div>
);

const SaveBtn = ({ onClick, label = "Save" }) => (
  <button onClick={onClick} style={{ width: "100%", background: "#4f46e5", color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>{label}</button>
);

// ── HOME ───────────────────────────────────────────────────────────────────
function Home({ data, setTab }) {
  const totalFees = data.fees.reduce((s, f) => s + f.amount, 0);
  const collected = data.fees.filter(f => f.status === "Paid").reduce((s, f) => s + f.amount, 0);
  const pending = data.fees.filter(f => f.status === "Not Paid").length;
  const todayAtt = data.attendance.filter(a => a.date === "2026-06-09");
  const presentToday = todayAtt.filter(a => a.status === "Present" || a.status === "Late").length;

  const cards = [
    { tab: "students",   icon: "👨‍🎓", label: "Students",   sub: `${data.students.length} enrolled`,      color: "#eff6ff", border: "#bfdbfe", iconBg: "#dbeafe" },
    { tab: "attendance", icon: "📋", label: "Attendance", sub: `${presentToday}/${todayAtt.length} present today`, color: "#f0fdf4", border: "#bbf7d0", iconBg: "#dcfce7" },
    { tab: "fees",       icon: "💰", label: "Fees",       sub: `₹${collected} collected`,               color: "#fffbeb", border: "#fde68a", iconBg: "#fef9c3" },
    { tab: "notices",    icon: "📢", label: "Notices",    sub: `${data.notices.length} total`,           color: "#faf5ff", border: "#e9d5ff", iconBg: "#ede9fe" },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", borderRadius: 16, padding: "22px 20px", marginBottom: 20, color: "#fff" }}>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.75, marginBottom: 4 }}>SetuApps</div>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 2 }}>Coaching Center</div>
        <div style={{ fontSize: 13, opacity: 0.8 }}>Manage students, fees & notices</div>
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 16px", flex: 1 }}>
            <div style={{ fontSize: 11, opacity: 0.75 }}>Total Collected</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>₹{collected}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 16px", flex: 1 }}>
            <div style={{ fontSize: 11, opacity: 0.75 }}>Pending Fees</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{pending} students</div>
          </div>
        </div>
      </div>

      {/* 4 Cards */}
      <div style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Quick Access</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {cards.map(c => (
          <div key={c.tab} onClick={() => setTab(c.tab)}
            style={{ background: c.color, border: `1.5px solid ${c.border}`, borderRadius: 14, padding: "16px 14px", cursor: "pointer", transition: "transform 0.1s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            <div style={{ width: 38, height: 38, background: c.iconBg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 10 }}>{c.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 2 }}>{c.label}</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent Attendance */}
      <div style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Today's Attendance</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {todayAtt.slice(0, 4).map(a => (
          <Row key={a.id}
            left={<><Avatar name={a.studentName} color={getColor(a.studentId)} /><div><div style={{ fontWeight: 600, fontSize: 14 }}>{a.studentName}</div><div style={{ fontSize: 12, color: "#9ca3af" }}>{a.date}</div></div></>}
            right={statusBadge(a.status)} />
        ))}
        {todayAtt.length > 4 && (
          <button onClick={() => setTab("attendance")} style={{ background: "none", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "9px", fontSize: 13, color: "#4f46e5", cursor: "pointer", fontWeight: 600 }}>
            View all {todayAtt.length} records →
          </button>
        )}
      </div>
    </div>
  );
}

// ── STUDENTS ───────────────────────────────────────────────────────────────
function Students({ data, setData }) {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", parent: "", phone: "", subject: "Mathematics" });

  const filtered = data.students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.subject.toLowerCase().includes(search.toLowerCase())
  );

  const addStudent = () => {
    if (!form.name || !form.phone) return;
    const newS = { id: `S${String(data.students.length + 1).padStart(3,"0")}`, ...form, active: true };
    setData(d => ({ ...d, students: [...d.students, newS] }));
    setShowAdd(false);
    setForm({ name: "", parent: "", phone: "", subject: "Mathematics" });
  };

  return (
    <div>
      <SectionHeader title="Students" count={filtered.length} action={<AddBtn onClick={() => setShowAdd(true)} label="Add Student" />} />
      <SearchBar value={search} onChange={setSearch} placeholder="Search by name or subject..." />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(s => (
          <Row key={s.id}
            left={<><Avatar name={s.name} color={getColor(s.id)} /><div><div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{s.name}</div><div style={{ fontSize: 12, color: "#6b7280" }}>{s.subject} · {s.parent}</div></div></>}
            right={<><span style={{ fontSize: 12, color: "#9ca3af" }}>{s.phone}</span><span style={{ color: "#d1d5db" }}>›</span></>} />
        ))}
        {filtered.length === 0 && <div style={{ textAlign: "center", color: "#9ca3af", padding: "32px 0", fontSize: 14 }}>No students found</div>}
      </div>

      {showAdd && (
        <Modal title="Add New Student" onClose={() => setShowAdd(false)}>
          <Field label="Student Name" value={form.name} onChange={v => setForm(f => ({...f, name: v}))} />
          <Field label="Parent Name" value={form.parent} onChange={v => setForm(f => ({...f, parent: v}))} />
          <Field label="Phone Number" value={form.phone} onChange={v => setForm(f => ({...f, phone: v}))} type="tel" />
          <Field label="Subject" value={form.subject} onChange={v => setForm(f => ({...f, subject: v}))} options={["Mathematics","Science","English","Hindi","Social Studies"]} />
          <SaveBtn onClick={addStudent} label="Add Student" />
        </Modal>
      )}
    </div>
  );
}

// ── ATTENDANCE ─────────────────────────────────────────────────────────────
function Attendance({ data, setData }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showMark, setShowMark] = useState(false);
  const [form, setForm] = useState({ studentName: data.students[0]?.name || "", date: "2026-06-18", status: "Present" });

  const filters = ["All", "Present", "Absent", "Late"];
  const filtered = data.attendance.filter(a => {
    const matchSearch = a.studentName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || a.status === filter;
    return matchSearch && matchFilter;
  });

  // Weekly summary
  const summary = {};
  data.attendance.forEach(a => {
    if (!summary[a.studentName]) summary[a.studentName] = { present: 0, total: 0 };
    summary[a.studentName].total++;
    if (a.status === "Present" || a.status === "Late") summary[a.studentName].present++;
  });

  const markAttendance = () => {
    const newA = { id: `A${String(data.attendance.length + 1).padStart(3,"0")}`, studentId: "S001", ...form, markedBy: "Teacher" };
    setData(d => ({ ...d, attendance: [...d.attendance, newA] }));
    setShowMark(false);
  };

  return (
    <div>
      <SectionHeader title="Attendance" count={filtered.length} action={<AddBtn onClick={() => setShowMark(true)} label="Mark" />} />
      <SearchBar value={search} onChange={setSearch} placeholder="Search student..." />

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "5px 14px", borderRadius: 99, border: "1.5px solid", fontSize: 13, fontWeight: 500, cursor: "pointer", borderColor: filter === f ? "#4f46e5" : "#e5e7eb", background: filter === f ? "#eef2ff" : "#fff", color: filter === f ? "#4f46e5" : "#6b7280" }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {filtered.map(a => (
          <Row key={a.id}
            left={<><Avatar name={a.studentName} color={getColor(a.studentId)} /><div><div style={{ fontWeight: 600, fontSize: 14 }}>{a.studentName}</div><div style={{ fontSize: 12, color: "#9ca3af" }}>{a.date}</div></div></>}
            right={statusBadge(a.status)} />
        ))}
        {filtered.length === 0 && <div style={{ textAlign: "center", color: "#9ca3af", padding: "32px 0", fontSize: 14 }}>No records found</div>}
      </div>

      {/* Weekly Summary */}
      <div style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Weekly Summary</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {Object.entries(summary).map(([name, s]) => {
          const pct = Math.round((s.present / s.total) * 100);
          return (
            <div key={name} style={{ background: "#fff", borderRadius: 12, padding: "12px 14px", border: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{name}</span>
                <span style={{ fontWeight: 700, fontSize: 14, color: pct >= 75 ? "#16a34a" : "#dc2626" }}>{pct}%</span>
              </div>
              <div style={{ height: 6, background: "#f3f4f6", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: pct >= 75 ? "#22c55e" : "#ef4444", borderRadius: 99 }} />
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{s.present} of {s.total} days</div>
            </div>
          );
        })}
      </div>

      {showMark && (
        <Modal title="Mark Attendance" onClose={() => setShowMark(false)}>
          <Field label="Student Name" value={form.studentName} onChange={v => setForm(f => ({...f, studentName: v}))} options={data.students.map(s => s.name)} />
          <Field label="Date" value={form.date} onChange={v => setForm(f => ({...f, date: v}))} type="date" />
          <Field label="Status" value={form.status} onChange={v => setForm(f => ({...f, status: v}))} options={["Present","Absent","Late"]} />
          <SaveBtn onClick={markAttendance} label="Mark Attendance" />
        </Modal>
      )}
    </div>
  );
}

// ── FEES ───────────────────────────────────────────────────────────────────
function Fees({ data, setData }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ studentName: data.students[0]?.name || "", month: "June 2026", amount: "500", status: "Not Paid", dueDate: "2026-06-20" });

  const collected = data.fees.filter(f => f.status === "Paid").reduce((s, f) => s + f.amount, 0);
  const pendingAmt = data.fees.filter(f => f.status === "Not Paid").reduce((s, f) => s + f.amount, 0);

  const filtered = data.fees.filter(f => {
    const matchSearch = f.studentName.toLowerCase().includes(search.toLowerCase()) || f.month.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || f.status === filter;
    return matchSearch && matchFilter;
  });

  const addFee = () => {
    const newF = { id: `F${String(data.fees.length + 1).padStart(3,"0")}`, studentId: "S001", ...form, amount: parseInt(form.amount), paidDate: null };
    setData(d => ({ ...d, fees: [...d.fees, newF] }));
    setShowAdd(false);
  };

  return (
    <div>
      <SectionHeader title="Fees" action={<AddBtn onClick={() => setShowAdd(true)} label="Add Record" />} />

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 12, padding: "14px" }}>
          <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 600, marginBottom: 4 }}>✅ COLLECTED</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#15803d" }}>₹{collected}</div>
          <div style={{ fontSize: 11, color: "#6b7280" }}>{data.fees.filter(f => f.status === "Paid").length} payments</div>
        </div>
        <div style={{ background: "#fef2f2", border: "1.5px solid #fecaca", borderRadius: 12, padding: "14px" }}>
          <div style={{ fontSize: 11, color: "#dc2626", fontWeight: 600, marginBottom: 4 }}>⏳ PENDING</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#b91c1c" }}>₹{pendingAmt}</div>
          <div style={{ fontSize: 11, color: "#6b7280" }}>{data.fees.filter(f => f.status === "Not Paid").length} students</div>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search student or month..." />

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {["All","Paid","Not Paid"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "5px 14px", borderRadius: 99, border: "1.5px solid", fontSize: 13, fontWeight: 500, cursor: "pointer", borderColor: filter === f ? "#4f46e5" : "#e5e7eb", background: filter === f ? "#eef2ff" : "#fff", color: filter === f ? "#4f46e5" : "#6b7280" }}>
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(f => (
          <Row key={f.id}
            left={<><Avatar name={f.studentName} color={getColor(f.studentId)} /><div><div style={{ fontWeight: 600, fontSize: 14 }}>{f.studentName}</div><div style={{ fontSize: 12, color: "#9ca3af" }}>{f.month} · ₹{f.amount}</div></div></>}
            right={<><div style={{ textAlign: "right" }}>{statusBadge(f.status)}<div style={{ fontSize: 11, color: "#9ca3af", marginTop: 3 }}>Due {f.dueDate}</div></div></>} />
        ))}
        {filtered.length === 0 && <div style={{ textAlign: "center", color: "#9ca3af", padding: "32px 0", fontSize: 14 }}>No records found</div>}
      </div>

      {showAdd && (
        <Modal title="Add Fee Record" onClose={() => setShowAdd(false)}>
          <Field label="Student Name" value={form.studentName} onChange={v => setForm(f => ({...f, studentName: v}))} options={data.students.map(s => s.name)} />
          <Field label="Month" value={form.month} onChange={v => setForm(f => ({...f, month: v}))} />
          <Field label="Fee Amount (₹)" value={form.amount} onChange={v => setForm(f => ({...f, amount: v}))} type="number" />
          <Field label="Payment Status" value={form.status} onChange={v => setForm(f => ({...f, status: v}))} options={["Paid","Not Paid"]} />
          <Field label="Due Date" value={form.dueDate} onChange={v => setForm(f => ({...f, dueDate: v}))} type="date" />
          <SaveBtn onClick={addFee} label="Add Record" />
        </Modal>
      )}
    </div>
  );
}

// ── NOTICES ────────────────────────────────────────────────────────────────
function Notices({ data, setData }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ title: "", text: "", targetClass: "All", sendDate: "2026-06-18", sentStatus: "No" });

  const addNotice = () => {
    if (!form.title || !form.text) return;
    const newN = { id: `N${String(data.notices.length + 1).padStart(3,"0")}`, ...form };
    setData(d => ({ ...d, notices: [...d.notices, newN] }));
    setShowAdd(false);
    setForm({ title: "", text: "", targetClass: "All", sendDate: "2026-06-18", sentStatus: "No" });
  };

  const markSent = (id) => {
    setData(d => ({ ...d, notices: d.notices.map(n => n.id === id ? { ...n, sentStatus: "Yes" } : n) }));
  };

  return (
    <div>
      <SectionHeader title="Notices" count={data.notices.length} action={<AddBtn onClick={() => setShowAdd(true)} label="Create" />} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.notices.map(n => (
          <div key={n.id} style={{ background: "#fff", borderRadius: 12, padding: "14px", border: "1px solid #f3f4f6", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", flex: 1, paddingRight: 8 }}>{n.title}</div>
              {statusBadge(n.sentStatus)}
            </div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8, lineHeight: 1.5 }}>{n.text}</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>📅 {n.sendDate} · 🎯 {n.targetClass}</div>
              {n.sentStatus === "No" && (
                <button onClick={() => markSent(n.id)}
                  style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: 7, padding: "4px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  Mark Sent
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <Modal title="Create Notice" onClose={() => setShowAdd(false)}>
          <Field label="Notice Title" value={form.title} onChange={v => setForm(f => ({...f, title: v}))} />
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 5 }}>Notice Text</label>
            <textarea value={form.text} onChange={e => setForm(f => ({...f, text: e.target.value}))} rows={3}
              style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1.5px solid #e5e7eb", fontSize: 14, background: "#f9fafb", outline: "none", boxSizing: "border-box", resize: "vertical" }} />
          </div>
          <Field label="Target Class" value={form.targetClass} onChange={v => setForm(f => ({...f, targetClass: v}))} options={["All","Mathematics","Science","English","Hindi"]} />
          <Field label="Send Date" value={form.sendDate} onChange={v => setForm(f => ({...f, sendDate: v}))} type="date" />
          <SaveBtn onClick={addNotice} label="Create Notice" />
        </Modal>
      )}
    </div>
  );
}

// ── ROOT APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("home");
  const [data, setData] = useState({ students: STUDENTS, attendance: ATTENDANCE, fees: FEES, notices: NOTICES });

  const tabs = [
    { id: "home",       icon: "🏠", label: "Home"       },
    { id: "students",   icon: "👨‍🎓", label: "Students"   },
    { id: "attendance", icon: "📋", label: "Attendance" },
    { id: "fees",       icon: "💰", label: "Fees"       },
    { id: "notices",    icon: "📢", label: "Notices"    },
  ];

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#f8fafc", minHeight: "100vh", maxWidth: 480, margin: "0 auto", position: "relative" }}>
      {/* Top bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f3f4f6", padding: "14px 20px 10px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Coaching Center</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#111827", textTransform: "capitalize" }}>{tab === "home" ? "Dashboard" : tab}</div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 90px" }}>
        {tab === "home"       && <Home       data={data} setTab={setTab} />}
        {tab === "students"   && <Students   data={data} setData={setData} />}
        {tab === "attendance" && <Attendance data={data} setData={setData} />}
        {tab === "fees"       && <Fees       data={data} setData={setData} />}
        {tab === "notices"    && <Notices    data={data} setData={setData} />}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#fff", borderTop: "1px solid #f3f4f6", display: "flex", padding: "8px 0 12px", zIndex: 50 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 0" }}>
            <span style={{ fontSize: 20, lineHeight: 1 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: tab === t.id ? 700 : 500, color: tab === t.id ? "#4f46e5" : "#9ca3af" }}>{t.label}</span>
            {tab === t.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#4f46e5" }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
