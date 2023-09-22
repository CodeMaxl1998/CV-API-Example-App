import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const ApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);

  const getApplicants = () => {
    fetch('http://localhost:3002/proxy/applicants')
    .then(response => response.json())
    .then(data => setApplicants(data))
    .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    getApplicants();
  }, []);

  return (
    <div>
      <h1>Applicants</h1>
      {applicants.map(applicant => (
        <div key={applicant.applicantId}>
          <h3><Link to={`/applicant/${applicant.applicantId}`}>{applicant.name}</Link></h3>
        </div>
      ))}
    </div>
  );
}

export default ApplicantsPage;