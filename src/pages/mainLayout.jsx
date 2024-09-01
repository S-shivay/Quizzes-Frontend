import { useState } from "react";
import Sidebar from '../pages/sidebar';
import Dashboard from '../pages/dashboard';
import Analytics from '../pages/analytics';
import CreateQuiz from '../pages/createQuiz';

function MainLayout() {
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const [isCreateQuizModalOpen, setCreateQuizModalOpen] = useState(false);

  const handlePageChange = (page) => {
    if (page === "CreateQuiz") {
      setCreateQuizModalOpen(true); // Open the Create Quiz modal
    } else {
      setSelectedPage(page); // Switch to the selected page
    }
  };

  const renderContent = () => {
    switch (selectedPage) {
      case "Dashboard":
        return <Dashboard />;
      case "Analytics":
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="main-layout">
      <Sidebar setSelectedPage={handlePageChange} />
      <div className={`content ${isCreateQuizModalOpen ? "blurred" : ""}`}>
        {renderContent()}
      </div>

      {/* Render the CreateQuiz modal */}
      {isCreateQuizModalOpen && (
        <CreateQuiz isModalOpen={isCreateQuizModalOpen} onClose={() => setCreateQuizModalOpen(false)} />
      )}
    </div>
  );
}

export default MainLayout;
