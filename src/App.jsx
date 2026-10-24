const stories = [
  { id: 1, name: 'Maya', tint: '#8b5cf6', status: 'online' },
  { id: 2, name: 'Ari', tint: '#f97316', status: 'online' },
  { id: 3, name: 'Zoe', tint: '#10b981', status: 'offline' },
  { id: 4, name: 'Nina', tint: '#ec4899', status: 'online' },
  { id: 5, name: 'Leo', tint: '#38bdf8', status: 'online' },
];

const friends = [
  { id: 1, name: 'Maya Chen', mood: 'Just dropped a new reel', status: 'online', accent: '#8b5cf6' },
  { id: 2, name: 'Daniel Ross', mood: 'Planning the weekend meetup', status: 'typing', accent: '#f59e0b' },
  { id: 3, name: 'Zoe Hart', mood: 'On a coffee break', status: 'offline', accent: '#10b981' },
  { id: 4, name: 'Sofia Lane', mood: 'Sharing playlist updates', status: 'online', accent: '#22c55e' },
  { id: 5, name: 'Ari Patel', mood: 'Sending voice note', status: 'online', accent: '#ef4444' },
];

const chatFeed = [
  { id: 1, sender: 'Maya', text: 'The launch party is going to be insane tonight 😍', time: '9:12 AM', me: false },
  { id: 2, sender: 'You', text: 'I already saved the best playlist. Let’s keep the vibe warm and social.', time: '9:14 AM', me: true },
  { id: 3, sender: 'Maya', text: 'Perfect — I’ll bring the photo booth ideas too.', time: '9:15 AM', me: false },
  { id: 4, sender: 'You', text: 'Amazing. I’ll handle the invite list and the welcome decor.', time: '9:17 AM', me: true },
];

const activity = [
  { title: 'New messages', value: '148', delta: '+12%' },
  { title: 'Active friends', value: '42', delta: '+9%' },
  { title: 'Group chats', value: '19', delta: '+4%' },
];

function App() {
  const activeFriend = friends[0];

  return (
    <div className="social-app">
      <aside className="left-rail">
        <div className="brand-block">
          <div className="logo-pill">T</div>
          <div>
            <span className="muted-label">Social</span>
            <h1>Talk it</h1>
          </div>
        </div>

        <nav className="side-nav">
          <button className="nav-button active">Home</button>
          <button className="nav-button">Discover</button>
          <button className="nav-button">Chats</button>
          <button className="nav-button">Groups</button>
          <button className="nav-button">Favorites</button>
        </nav>

        <div className="mini-card">
          <span className="muted-label">Today</span>
          <h3>6 new updates</h3>
          <p>Friends are buzzing about the weekend hangout.</p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="search-box">
            <span>⌕</span>
            <input type="text" value="Search friends, chats, stories..." readOnly />
          </div>
          <div className="topbar-actions">
            <button className="icon-button">+</button>
            <button className="primary-button">Create post</button>
          </div>
        </header>

        <section className="stories-section">
          <div className="section-heading">
            <h2>Stories</h2>
            <button>View all</button>
          </div>

          <div className="stories-row">
            {stories.map((story) => (
              <div key={story.id} className="story-card" style={{ background: `linear-gradient(135deg, ${story.tint}, rgba(15,23,42,0.3))` }}>
                <div className="story-ring" />
                <span>{story.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="feed-layout">
          <div className="feed-column">
            <div className="composer-card">
              <div className="avatar large" style={{ background: activeFriend.accent }}>{activeFriend.name.charAt(0)}</div>
              <div className="composer-input">What are you up to this evening?</div>
              <button className="primary-button small">Post</button>
            </div>

            <div className="message-thread">
              <div className="thread-header">
                <h3>{activeFriend.name}</h3>
                <span className="status-dot online" />
              </div>

              <div className="messages-wrap">
                {chatFeed.map((message) => (
                  <div key={message.id} className={`message-row ${message.me ? 'me' : ''}`}>
                    <div className="message-bubble">
                      <small>{message.sender}</small>
                      <p>{message.text}</p>
                      <time>{message.time}</time>
                    </div>
                  </div>
                ))}
              </div>

              <div className="chat-input-row">
                <button>😊</button>
                <button>📎</button>
                <input type="text" value="Reply to Maya..." readOnly />
                <button className="send-button">Send</button>
              </div>
            </div>
          </div>

          <aside className="right-panel">
            <div className="panel-card">
              <div className="panel-header-row">
                <h3>Friends</h3>
                <button>See all</button>
              </div>

              {friends.map((friend) => (
                <div key={friend.id} className={`friend-item ${friend.id === activeFriend.id ? 'selected' : ''}`}>
                  <div className="avatar" style={{ background: friend.accent }}>{friend.name.charAt(0)}</div>
                  <div className="friend-meta">
                    <strong>{friend.name}</strong>
                    <span>{friend.mood}</span>
                  </div>
                  <span className={`status-dot ${friend.status}`} />
                </div>
              ))}
            </div>

            <div className="panel-card stats-card">
              <h3>Community pulse</h3>
              {activity.map((item) => (
                <div key={item.title} className="metric-row">
                  <span>{item.title}</span>
                  <div>
                    <strong>{item.value}</strong>
                    <em>{item.delta}</em>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default App;
