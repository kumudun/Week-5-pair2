import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const newJob = {
      title,
      type,
      location,
      description,
      salary: Number(salary),
      companyName,
      contactEmail,
      contactPhone,
    };

    try {
      const res = await fetch("http://localhost:4000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to create job");
      }

      navigate("/");
    } catch (err) {
      console.error("Error creating job:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="title">Job title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="type">Job type:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>

        <label htmlFor="description">Job Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="companyName">Company Name:</label>
        <input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />

        <label htmlFor="contactEmail">Contact Email:</label>
        <input
          id="contactEmail"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
        />

        <label htmlFor="contactPhone">Contact Phone:</label>
        <input
          id="contactPhone"
          type="tel"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label htmlFor="salary">Salary:</label>
        <input
          id="salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Job"}
        </button>
      </form>
    </div>
  );
};

export default AddJobPage;
