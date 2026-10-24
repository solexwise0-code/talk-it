const tabs = ['Home', 'Discover', 'Chats', 'Groups', 'Favorites'];

const friendsSeed = [
  { id: 1, name: 'Maya Chen', mood: 'Just dropped a new reel', status: 'online', accent: '#8b5cf6' },
  { id: 2, name: 'Daniel Ross', mood: 'Planning the weekend meetup', status: 'typing', accent: '#f59e0b' },
  { id: 3, name: 'Zoe Hart', mood: 'On a coffee break', status: 'offline', accent: '#10b981' },
  { id: 4, name: 'Sofia Lane', mood: 'Sharing playlist updates', status: 'online', accent: '#22c55e' },
  { id: 5, name: 'Ari Patel', mood: 'Sending voice note', status: 'online', accent: '#ef4444' },
];

const stories = [
  { id: 1, name: 'Maya', tint: '#8b5cf6', status: 'online' },
  { id: 2, name: 'Ari', tint: '#f97316', status: 'online' },
  { id: 3, name: 'Zoe', tint: '#10b981', status: 'offline' },
  { id: 4, name: 'Nina', tint: '#ec4899', status: 'online' },
  { id: 5, name: 'Leo', tint: '#38bdf8', status: 'online' },
];

const initialThreads = {
  1: [
    { id: 1, sender: 'Maya', text: 'The launch party is going to be insane tonight 😍', time: '9:12 AM', me: false },
    { id: 2, sender: 'You', text: 'I already saved the best playlist. Let’s keep the vibe warm and social.', time: '9:14 AM', me: true },
    { id: 3, sender: 'Maya', text: 'Perfect — I’ll bring the photo booth ideas too.', time: '9:15 AM', me: false },
    { id: 4, sender: 'You', text: 'Amazing. I’ll handle the invite list and the welcome decor.', time: '9:17 AM', me: true },
  ],
  2: [
    { id: 1, sender: 'Daniel', text: 'I booked the rooftop lounge for Saturday. Want in?', time: '8:32 AM', me: false },
    { id: 2, sender: 'You', text: 'Absolutely, I’ll bring the extra chairs and a speaker.', time: '8:35 AM', me: true },
  ],
  3: [
    { id: 1, sender: 'Zoe', text: 'I found the perfect coffee spot near the park.', time: 'Yesterday', me: false },
    { id: 2, sender: 'You', text: 'Perfect — I’m in. Let’s go after lunch.', time: 'Yesterday', me: true },
  ],
  4: [
    { id: 1, sender: 'Sofia', text: 'The new playlist is live. You need to hear it.', time: '10:02 AM', me: false },
  ],
  5: [
    { id: 1, sender: 'Ari', text: 'I sent a voice note to the group.', time: '6:41 PM', me: false },
    { id: 2, sender: 'You', text: 'I’ll listen in a minute, thanks!', time: '6:42 PM', me: true },
  ],
};

const initialPosts = [
  {
    id: 1,
    author: 'Maya Chen',
    text: 'Tonight’s gathering is going to be a vibe. Bring your favorite playlist and your warmest energy ✨',
    time: '2h ago',
    likes: 128,
    comments: 24,
    accent: '#8b5cf6',
    liked: false,
  },
  {
    id: 2,
    author: 'Ari Patel',
    text: 'Sunset walk, cold drinks, and conversations that actually matter. That’s the mood today.',
    time: '4h ago',
    likes: 206,
    comments: 18,
    accent: '#ef4444',
    liked: true,
  },
];

const activity = [
  { title: 'New messages', value: '148', delta: '+12%' },
  { title: 'Active friends', value: '42', delta: '+9%' },
  { title: 'Group chats', value: '19', delta: '+4%' },
];

function App() {
  const [friends, setFriends] = useState(friendsSeed);
  const [threads, setThreads] = useState(initialThreads);
  const [selectedFriendId, setSelectedFriendId] = useState(1);
  const [search, setSearch] = useState('');
  const [messageDraft, setMessageDraft] = useState('');
  const [postDraft, setPostDraft] = useState('');
  const [posts, setPosts] = useState(initialPosts);
  const [activeTab, setActiveTab] = useState('Home');

  const filteredFriends = friends.filter((friend) => {
    const term = search.toLowerCase();
    return friend.name.toLowerCase().includes(term) || friend.mood.toLowerCase().includes(term);
  });

  const selectedFriend = friends.find((friend) => friend.id === selectedFriendId) || friends[0];
  const currentMessages = threads[selectedFriendId] || [];

  const handleSendMessage = () => {
    const trimmed = messageDraft.trim();
    if (!trimmed) return;

    const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const incoming = {
      id: Date.now(),
      sender: 'You',
      text: trimmed,
      time,
      me: true,
    };

    setThreads((prev) => ({
      ...prev,
      [selectedFriendId]: [...(prev[selectedFriendId] || []), incoming],
    }));

    setFriends((prev) =>
      prev.map((friend) =>
        friend.id === selectedFriendId ? { ...friend, status: 'online' } : friend,
      ),
    );

    setMessageDraft('');
  };

  const handlePublishPost = () => {
    const trimmed = postDraft.trim();
    if (!trimmed) return;

    const next = {
      id: Date.now(),
      author: 'You',
      text: trimmed,
      time: 'just now',
      likes: 0,
      comments: 0,
      accent: '#38bdf8',
      liked: false,
    };

    setPosts((prev) => [next, ...prev]);
    setPostDraft('');
  };

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

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
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`nav-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
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
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search friends, chats, stories..."
            />
          </div>

          <div className="topbar-actions">
            <button type="button" className="icon-button">+</button>
            <button type="button" className="primary-button">
              Create post
            </button>
          </div>
        </header>

        <section className="stories-section">
          <div className="section-heading">
            <h2>Stories</h2>
            <button type="button">View all</button>
          </div>

          <div className="stories-row">
            {stories.map((story) => (
              <div
                key={story.id}
                className="story-card"
                style={{ background: `linear-gradient(135deg, ${story.tint}, rgba(15,23,42,0.3))` }}
              >
                <div className="story-ring" />
                <span>{story.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="feed-layout">
          <div className="feed-column">
            <div className="composer-card">
              <div className="avatar large" style={{ background: selectedFriend.accent }}>
                {selectedFriend.name.charAt(0)}
              </div>

              <input
                type="text"
                className="composer-input"
                value={postDraft}
                onChange={(event) => setPostDraft(event.target.value)}
                placeholder="What are you up to this evening?"
              />

              <button type="button" className="primary-button small" onClick={handlePublishPost}>
                Post
              </button>
            </div>

            <div className="posts-list">
              {posts.map((post) => (
                <article key={post.id} className="post-card">
                  <div className="post-top">
                    <div className="avatar" style={{ background: post.accent }}>
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <strong>{post.author}</strong>
                      <span>{post.time}</span>
                    </div>
                  </div>

                  <p className="post-body">{post.text}</p>

                  <div className="post-actions">
                    <button
                      type="button"
                      className={`like-button ${post.liked ? 'liked' : ''}`}
                      onClick={() => toggleLike(post.id)}
                    >
                      {post.liked ? '♥ Liked' : '♡ Like'}
                    </button>
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="message-thread">
              <div className="thread-header">
                <h3>{selectedFriend.name}</h3>
                <span className={`status-dot ${selectedFriend.status}`} />
              </div>

              <div className="messages-wrap">
                {currentMessages.map((message) => (
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
                <button type="button">😊</button>
                <button type="button">📎</button>
                <input
                  type="text"
                  value={messageDraft}
                  onChange={(event) => setMessageDraft(event.target.value)}
                  placeholder="Reply..."
                />
                <button type="button" className="send-button" onClick={handleSendMessage}>
                  Send
                </button>
              </div>
            </div>
          </div>

          <aside className="right-panel">
            <div className="panel-card">
              <div className="panel-header-row">
                <h3>Friends</h3>
                <button type="button">See all</button>
              </div>

              {filteredFriends.map((friend) => (
                <button
                  key={friend.id}
                  type="button"
                  className={`friend-item ${friend.id === selectedFriendId ? 'selected' : ''}`}
                  onClick={() => setSelectedFriendId(friend.id)}
                >
                  <div className="avatar" style={{ background: friend.accent }}>
                    {friend.name.charAt(0)}
                  </div>
                  <div className="friend-meta">
                    <strong>{friend.name}</strong>
                    <span>{friend.mood}</span>
                  </div>
                  <span className={`status-dot ${friend.status}`} />
                </button>
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
