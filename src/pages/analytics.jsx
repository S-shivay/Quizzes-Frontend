import React, { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/analytics";

const Analytics = ({id}) => { // Ensure quizId is passed as a prop
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAnalytics = async () => {
    try {
      const data = await fetchAnalytics(id); // Pass the quizId here
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error loading analytics:", error.message);
      setError("Error fetching analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) { // Ensure quizId is available
      loadAnalytics();
    } else {
      setError("Quiz ID is not provided");
      setLoading(false);
    }
  }, [id]); // Depend on quizId for re-fetching if it changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Quiz Analytics</h2>
      {analyticsData ? (
        <div>
          <p>Impressions: {analyticsData.impressions}</p>
          <p>Total Responses: {analyticsData.responses}</p>
          <p>Correct Responses: {analyticsData.correctResponses}</p>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Analytics;
