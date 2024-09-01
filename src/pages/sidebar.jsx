function Sidebar({ setSelectedPage }) {
    return (
      <div className="sidebar">
        <h2>QUIZZIE</h2>
        <button onClick={() => setSelectedPage("Dashboard")}>Dashboard</button>
        <button onClick={() => setSelectedPage("Analytics")}>Analytics</button>
        <button onClick={() => setSelectedPage("CreateQuiz")}>Create Quiz</button>
        <button onClick={() => {
          localStorage.removeItem('token');
          window.location.href = "/register"; 
        }}>Logout</button>
      </div>
    );
  }
  
  export default Sidebar;
  