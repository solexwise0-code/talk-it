const contacts = [
  { id: 1, name: 'Maya Chen', status: 'online', accent: '#7c3aed', lastSeen: '2 min ago' },
  { id: 2, name: 'Daniel Ross', status: 'typing', accent: '#f59e0b', lastSeen: 'typing...' },
  { id: 3, name: 'Zoe Hart', status: 'offline', accent: '#10b981', lastSeen: '1 hr ago' },
  { id: 4, name: 'Ari Patel', status: 'online', accent: '#ef4444', lastSeen: 'online' },
  { id: 5, name: 'Sofia Lane', status: 'online', accent: '#06b6d4', lastSeen: 'active' },
];

const messages = [
  { id: 1, from: 'them', text: 'Hey! Are we still on for the launch call today?', time: '9:14 AM' },
  { id: 2, from: 'me', text: 'Absolutely. I uploaded the final deck and the notes are in the shared folder.', time: '9:15 AM' },
  { id: 3, from: 'them', text: 'Perfect — also, can we add the product teaser section before the pricing slide?', time: '9:16 AM' },
  { id: 4, from: 'me', text: 'Yes, I can adjust that. I’ll keep the visuals cleaner and stronger for the final audience.', time: '9:17 AM' },
  { id: 5, from: 'them', text: 'Nice. Let’s keep it tight and confident. I’ll send the revision checklist after lunch.', time: '9:18 AM' },
];

const trends = [
  { label: 'Replies', value: '94%', delta: '+12%' },
  { label: 'New chats', value: '1.4k', delta: '+8%' },
  { label: 'Avg. response', value: '2.3m', delta: '-18%' },
];

function App() {
  const activeContact = contacts[0];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark">T</div>
          <div>
            <p className="eyebrow">Workspace</p>
            <h1>Talk it</h1>
          </div>
        </div>

        <div className="nav-group">
          <button className="nav-item active">Messages</button>
          <button className="nav-item">Teams</button>
          <button className="nav-item">Calls</button>
          <button className="nav-item">Files</button>
        </div>

        <div className="panel-header">
          <span>Inbox</span>
          <button>+ New</button>
        </div>

        <div className="contact-list">
          {contacts.map((contact) => (
            <div key={contact.id} className={`contact-card ${contact.id === activeContact.id ? 'active' : ''}`}>
              <div className="avatar" style={{ background: contact.accent }}>
                {contact.name.charAt(0)}
              </div>
              <div className="contact-main">
                <div className="contact-topline">
                  <strong>{contact.name}</strong>
                  <span>{contact.lastSeen}</span>
                </div>
                <p>{contact.status === 'typing' ? 'I’m fine-tuning the latest edits...' : 'Shared the updated brief earlier today.'}</p>
              </div>
              {contact.status === 'online' && <span className="dot online" />}
              {contact.status === 'typing' && <span className="dot typing" />}
              {contact.status === 'offline' && <span className="dot offline" />}
            </div>
          ))}
        </div>
      </aside>

      <main className="chat-panel">
        <header className="chat-header">
          <div className="conversation-meta">
            <div className="avatar large" style={{ background: activeContact.accent }}>
              {activeContact.name.charAt(0)}
            </div>
            <div>
              <h2>{activeContact.name}</h2>
              <span className={`presence ${activeContact.status}`}>{activeContact.status}</span>
            </div>
          </div>

          <div className="header-actions">
            <button className="ghost-btn">Call</button>
            <button className="ghost-btn">Video</button>
            <button className="primary-btn">Schedule</button>
          </div>
        </header>

        <div className="stats-row">
          {trends.map((trend) => (
            <div key={trend.label} className="stat-card">
              <span>{trend.label}</span>
              <strong>{trend.value}</strong>
              <em>{trend.delta}</em>
            </div>
          ))}
        </div>

        <div className="messages-box">
          {messages.map((message) => (
            <div key={message.id} className={`bubble-row ${message.from === 'me' ? 'outgoing' : 'incoming'}`}>
              <div className="bubble">
                <p>{message.text}</p>
                <time>{message.time}</time>
              </div>
            </div>
          ))}
        </div>

        <div className="composer">
          <button className="chip">😊</button>
          <button className="chip">📎</button>
          <input type="text" value="Let’s finalize the launch copy and..." readOnly />
          <button className="send-btn">Send</button>
        </div>
      </main>
    </div>
  );
}

export default App;
