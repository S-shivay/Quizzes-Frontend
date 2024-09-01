import { useEffect, useState } from "react";
import { fetchQuizzes } from "../services/quiz";

function Dashboard() {
  const [quizStats, setQuizStats] = useState({
    quizzesCreated: 0,
    questionsCreated: 0,
    impressions: 0,
  });

  const [trendingQuizzes, setTrendingQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuizzes();
        console.log("Dashboard data:", data); // Debugging

        setQuizStats({
          quizzesCreated: data.quizzesCreated || 0,
          questionsCreated: data.questionsCreated || 0,
          impressions: data.totalImpressions || 0,
        });

        setTrendingQuizzes(data.trendingQuizzes || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error.message);
        setTrendingQuizzes([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="stats">
        <div className="stat-box">
          <h4>Quizzes Created</h4>
          <p>{quizStats.quizzesCreated}</p>
        </div>
        <div className="stat-box">
          <h4>Questions Created</h4>
          <p>{quizStats.questionsCreated}</p>
        </div>
        <div className="stat-box">
          <h4>Total Impressions</h4>
          <p>{quizStats.impressions}</p>
        </div>
      </div>

      <div className="trending-quizzes">
        <h2>Trending Quizzes</h2>
        <div className="quiz-list">
          {trendingQuizzes.length > 0 ? (
            trendingQuizzes.map((quiz, index) => (
              <div key={index} className="quiz-box">
                <h3>{quiz.name}</h3>
                <p>Created on: {new Date(quiz.date).toLocaleDateString()}</p>
                <p>Impressions: {quiz.impressions}</p>
              </div>
            ))
          ) : (
            <p>No trending quizzes available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
