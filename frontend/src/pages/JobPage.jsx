import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`http://localhost:4000/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch job");
        }
        const data = await res.json();
        setJob(data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const deleteJob = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:4000/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete job");
      }

      // Optional: clear local state (not strictly needed if we navigate)
      setJob(null);

      // Navigate away so the deleted job isn't visible anymore.
      // Adjust this path to your jobs list route (e.g. "/jobs" or "/").
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to delete job");
    }
  };

  // ---------- Render states ----------
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (!job) {
    // This might happen if the job doesn't exist or was just deleted
    return <div>Job not found.</div>;
  }

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
      <p>Contact Email: {job.company.contactEmail}</p>
      <p>Contact Phone: {job.company.contactPhone}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Posted Date: {job.postedDate}</p>

      <Link to={`/edit-job/${id}`}>
        <button>Edit Job</button>
      </Link>

      <button onClick={deleteJob} style={{ marginLeft: "1rem" }}>
        Delete Job
      </button>
    </div>
  );
};

export default JobPage;
