import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ClinicalHistory = () => {
  document.title = "Medical History"

  const { id } = useParams();
  const userId = localStorage.getItem("id");
  const {
    state: { role },
  } = useAuth();

  if (!id) {
    return <p>No Patient ID provided</p>;
  }

  const [clinicalHistory, setClinicalHistory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDate, setEditedDate] = useState("");
  const [editedSymptoms, setEditedSymptoms] = useState("");
  const [editedTreatment, setEditedTreatment] = useState("");

  useEffect(() => {
    const fetchClinicalHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/historias/info/${id}`
        );
        setClinicalHistory(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClinicalHistory();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedDate(clinicalHistory?.date || "");
    setEditedSymptoms(clinicalHistory?.symptoms || "");
    setEditedTreatment(clinicalHistory?.treatment || "");
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/historias/${id}`,
        {
          date: editedDate || clinicalHistory.date,
          symptoms: editedSymptoms || clinicalHistory.symptoms,
          treatment: editedTreatment || clinicalHistory.treatment,
        }
      );

      setClinicalHistory(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const hasPermissionToView = () => {
    return (
      role &&
      ((role === "patient" && id === userId) ||
        ["medic", "admin", "superadmin"].includes(role))
    );
  };

  const hasPermissionToEdit = () => {
    return role && ["admin", "superadmin", "medic"].includes(role);
  };

  if (!clinicalHistory || !hasPermissionToView()) {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md mt-8 my-3">
      <p className="text-red-500 text-2xl font-semibold">
        Este paciente no posee una historia clinica
      </p>
    </div>
  );
}

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md mt-8 my-3">
      <h2 className="text-3xl font-bold mb-4 text-blue-500">
        Clinical History for Patient:{" "}
        {clinicalHistory?.patientName || patientName}
      </h2>
      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date:
          </label>
          {isEditing ? (
            <input
              className="border rounded-lg p-2 w-full"
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
          ) : (
            <p className="text-gray-800">
              {new Date(clinicalHistory?.date).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Symptoms:
          </label>
          {isEditing ? (
            <input
              className="border rounded-lg p-2 w-full"
              type="text"
              value={editedSymptoms}
              onChange={(e) => setEditedSymptoms(e.target.value)}
            />
          ) : (
            <p className="text-gray-800">{clinicalHistory?.symptoms}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Treatment:
          </label>
          {isEditing ? (
            <input
              className="border rounded-lg p-2 w-full"
              type="text"
              value={editedTreatment}
              onChange={(e) => setEditedTreatment(e.target.value)}
            />
          ) : (
            <p className="text-gray-800">{clinicalHistory?.treatment}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        {hasPermissionToEdit() &&
          (isEditing ? (
            <>
              <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mr-2 hover:bg-blue-600"
                onClick={handleSaveClick}
              >
                Save Changes
              </button>
              <button
                className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={handleEditClick}
            >
              Edit
            </button>
          ))}
      </div>
    </div>
  );
};

export default ClinicalHistory;
