import React , {useState} from 'react'

const SAssignment = () => {
  const [activeLink, setActiveLink] = useState("Assigned");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const assignments = [
    {
      id: 1,
      unitName: "Unit 1",
      postedDate: "2023-04-24",
      teacherName: "Teacher 1",
      dueDate: "2023-04-30",
      subjectName: "Subject 1",
      filePreview: "file_preview_url",
    },
    {
      id: 2,
      unitName: "Unit 2",
      postedDate: "2023-04-25",
      teacherName: "Teacher 2",
      dueDate: "2023-05-01",
      subjectName: "Subject 2",
      filePreview: "file_preview_url",
    },
    // Add more assignments as needed
  ];
  return (
    <>
    <nav className="navbar">
      <div className="navbar-left">To-do</div>
      <div className="navbar-right">
        <div
          className={`navbar-link ${activeLink === "Assigned" ? "active" : ""}`}
          onClick={() => handleLinkClick("Assigned")}
        >
          Assigned
        </div>
        <div
          className={`navbar-link ${
            activeLink === "Missing" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("Missing")}
        >
          Missing
        </div>
        <div
          className={`navbar-link ${activeLink === "Done" ? "active" : ""}`}
          onClick={() => handleLinkClick("Done")}
        >
          Done
        </div>
      </div>
    </nav>
    <section className="assignment-list">
      <h2>This Week</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            <div className="assignment-details">
              <div className="assignment-icon">Assignment Icon</div>
              <div className="assignment-info">
                <div className="unit-name">{assignment.unitName}</div>
                <div className="posted-on">
                  Posted on {assignment.postedDate} · {assignment.teacherName}
                </div>
              </div>
              <div className="assignment-due">
                Due on: {assignment.dueDate}
                <div className="subject-name">{assignment.subjectName}</div>
                <button className="right-arrow-button">→</button>
              </div>
            </div>
            <div className="file-preview">
              <img src={assignment.filePreview} alt="File Preview" />
            </div>
            {/* Add assignment details/questions section here */}
          </li>
        ))}
      </ul>
    </section>
    </>
  )
}

export default SAssignment