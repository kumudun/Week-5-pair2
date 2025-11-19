import JobListing from "../components/JobListing";
import { useEffect, useState } from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("http://localhost:4000/api/jobs");
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="home">
      <div className="job-list">
        {jobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          jobs.map((job) => <JobListing key={job.id} {...job} />)
        )}
      </div>
    </div>
  );
};

export default Home;
