import React, { useState, useEffect } from "react";
import axios from "axios";

function MedicalList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const doctorsPerPage = 10;
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/medicos");
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;
  const displayedDoctors = doctors.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="mx-auto px-4 pt-12 sm:px-6 lg:px-8">
      <h2 className="text-center font-bold text-teal-600 sm:text-5xl sm:leading-tight sm:tracking-tight mb-6 bg-gray-100">
        Medical List
      </h2>
      <div className="overflow-hidden rounded-lg shadow-md">
        <table className="mx-auto w-full table-auto bg-white">
          <thead>
            <tr>
              <th
                className="border text-white bg-teal-600 border-slate-200 p-2"
                style={{ width: "50%" }}
              >
                Professional
              </th>
              <th
                className="border text-white bg-teal-600 border-slate-200 p-2"
                style={{ width: "50%" }}
              >
                Specialty
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedDoctors.map((doctor) => (
              <tr key={doctor.id}>
                <td
                  className="border border-slate-200 p-2 capitalize"
                  style={{ width: "50%" }}
                >
                  {doctor.medicName} {doctor.medicLastname}
                </td>
                <td
                  className="border border-slate-200 p-2 capitalize"
                  style={{ width: "50%" }}
                >
                  {doctor.specialty}
                </td>
              </tr>
            ))}
            {Array.from(
              { length: Math.max(0, 10 - displayedDoctors.length) },
              (_, index) => (
                <tr key={`empty-${index}`} className="border border-slate-200">
                  <td className="p-2">-</td>
                  <td className="p-2">-</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        {totalPages > 1 && (
          <div className="mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`bg-teal-500 text-white px-4 py-2 rounded-lg mb-4 ${
                  currentPage === index + 1 && "bg-teal-700"
                }`}
                onClick={() => handlePageChange(index + 1)}
                style={{ marginRight: "8px" }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalList;
