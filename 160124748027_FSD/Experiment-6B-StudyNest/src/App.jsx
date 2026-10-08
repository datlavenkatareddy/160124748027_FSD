import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("Data Structures");
  const [mode, setMode] = useState("Concept");
  const [minutes, setMinutes] = useState("");
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const storedSessions = localStorage.getItem("studynest-sessions");
    if (storedSessions) {
      setSessions(JSON.parse(storedSessions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("studynest-sessions", JSON.stringify(sessions));
  }, [sessions]);

  const addSession = () => {
    if (!topic.trim()) return;

    const session = {
      id: Date.now(),
      topic: topic.trim(),
      subject,
      mode,
      minutes: minutes || 0,
      completed: false
    };

    setSessions((currentSessions) => [...currentSessions, session]);
    setTopic("");
    setMinutes("");
  };

  const toggleSession = (id) => {
    setSessions((currentSessions) =>
      currentSessions.map((session) =>
        session.id === id
          ? { ...session, completed: !session.completed }
          : session
      )
    );
  };

  const deleteSession = (id) => {
    setSessions((currentSessions) =>
      currentSessions.filter((session) => session.id !== id)
    );
  };

  const finishedCount = sessions.filter((session) => session.completed).length;
  const studyMinutes = sessions.reduce(
    (total, session) => total + Number(session.minutes),
    0
  );

  return (
    <main className="page">
      <section className="app-shell">
        <header className="heading">
          <p className="eyebrow">FULL STACK LAB • EXPERIMENT 6B</p>
          <h1>StudyNest</h1>
          <p>Plan your learning and track every study session.</p>
        </header>

        <section className="dashboard">
          <article>
            <span>Sessions</span>
            <strong>{sessions.length}</strong>
          </article>
          <article>
            <span>Finished</span>
            <strong>{finishedCount}</strong>
          </article>
          <article>
            <span>Study Time</span>
            <strong>{studyMinutes} min</strong>
          </article>
        </section>

        <section className="study-form">
          <input
            type="text"
            placeholder="What do you want to study?"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option>Data Structures</option>
            <option>DBMS</option>
            <option>Operating Systems</option>
            <option>Artificial Intelligence</option>
            <option>Mathematics</option>
          </select>

          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option>Concept</option>
            <option>Revision</option>
            <option>Practice</option>
            <option>Test</option>
          </select>

          <input
            type="number"
            min="0"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />

          <button className="add-btn" onClick={addSession}>
            Add Session
          </button>
        </section>

        <section className="sessions">
          {sessions.length === 0 ? (
            <div className="empty">
              <div className="book-icon">📚</div>
              <h3>No study sessions</h3>
              <p>Add a session to begin tracking your study time.</p>
            </div>
          ) : (
            sessions.map((session) => (
              <article
                className={`session ${
                  session.completed ? "finished" : ""
                }`}
                key={session.id}
              >
                <div>
                  <h3>{session.topic}</h3>
                  <p>
                    {session.subject} <span>•</span> {session.mode}{" "}
                    <span>•</span> {session.minutes} minutes
                  </p>
                </div>

                <div className="buttons">
                  <button onClick={() => toggleSession(session.id)}>
                    {session.completed ? "Undo" : "Finish"}
                  </button>
                  <button
                    className="remove"
                    onClick={() => deleteSession(session.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
