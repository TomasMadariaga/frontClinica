import horariosHospitalImage from "../images/horarios-hospital.jpg";
import horariosInternadoImage from "../images/horarios-internado.jpg";
import horariosLaboratoriosImage from "../images/horarios-laboratorios.jpg";
import horariosVacunatoriosImage from "../images/horarios-vacunatorios.jpg";

const Visits = () => {
  document.title = "Visits"
  return (
    <div className="mx-auto w-2/4 p-6 bg-white m-3 rounded-md shadow-md">
      <h2 className="text-3xl text-center mb-6 font-bold text-teal-600">
        Hours of Operation and Visits
      </h2>

      <section className="mb-6 text-justify">
        <p>
          Always thinking about the safety, comfort, and well-being of the
          community, our Hospital has established hours for its various
          services, aiming to prioritize general order and the normal
          development of activities. Consult here the hours of operation for our
          different services.
        </p>
      </section>

      <h3 className="text-2xl mb-4 text-teal-600 font-semibold">Hospital</h3>
      <hr className="border-t-2 border-gray-300 mb-4" />

      {/* Card 1 - Public Attention */}
      <div className="bg-gray-50 rounded p-6 mb-6 flex flex-col sm:flex-row">
        <div className="card-content flex-1">
          <h3 className="text-2xl mb-4 font-semibold text-teal-600">
            PUBLIC ATTENTION
          </h3>
          <p className="mb-2">
            <strong>Monday to Friday:</strong>
          </p>
          <p>06:00 AM to 8:00 PM</p>
          <p className="mb-2">
            <strong>Weekends and Holidays:</strong>
          </p>
          <p>24-hour External Guard Attention</p>
        </div>
        <img
          src={horariosHospitalImage}
          alt="Horarios Hospital"
          className="flex-shrink-0 w-full sm:w-1/3 rounded mt-4 sm:mt-0"
        />
      </div>

      {/* Card 2 - Laboratories */}
      <div className="bg-gray-50 rounded p-6 mb-6 flex flex-col sm:flex-row">
        <div className="card-content flex-1">
          <h3 className="text-2xl mb-4 font-semibold text-teal-600">
            LABORATORIES
          </h3>
          <p className="mb-2">
            <strong>
              Hematology, Oncology, Genetics, and Molecular Biology Laboratory:
            </strong>
            <p>07:30 AM to 7:00 PM </p>
          </p>
          <p className="mb-2">
            <strong>Clinical Biochemistry Laboratory:</strong>
          </p>
          <p className="mb-2">
            Monday to Friday, 07:00 AM to 7:00 PM (Santagada Ave.)
          </p>
          <p className="mb-2">
            <strong>Microbiology Laboratory:</strong>
            <p>Monday to Friday, 07:00 AM to 7:00 PM </p>
          </p>
          <p className="mb-2">
            <strong>Hemotherapy: Extractions:</strong>
            <p>Monday to Friday, 07:00 AM to 1:30 PM </p>
          </p>
          <p className="mb-2">
            <strong>Hemotherapy: Blood Bank:</strong>
            <p>Monday to Friday, 07:00 AM to 3:30 PM</p>
          </p>
        </div>
        <img
          src={horariosLaboratoriosImage}
          alt="Horarios Laboratorio"
          className="flex-shrink-0 w-full sm:w-1/3 rounded mt-4 sm:mt-0"
        />
      </div>

      {/* Card 3 - Vaccination centers */}
      <div className="bg-gray-50 rounded p-6 mb-6 flex flex-col sm:flex-row">
        <div className="card-content flex-1">
          <h3 className="text-2xl mb-4 font-semibold text-teal-600">
            VACCINATION CENTERS
          </h3>
          <div className="bg-orange-100 p-4 rounded mb-4">
            <p className="text-gray-500">
              <strong>IMPORTANT:</strong> Stock of vaccines varies according to
              availability and daily demand.
            </p>
          </div>
          <p className="mb-2">
            <strong>MONDAY TO FRIDAY:</strong>
          </p>
          <p className="mb-2">Clinica Online (Santaga Ave.)</p>
          <p className="mb-2">
            <strong>General Vaccination Center:</strong>
          </p>
          <p className="mb-2">08:00 AM to 1:00 PM</p>
        </div>
        <img
          src={horariosVacunatoriosImage}
          alt="Horarios Vacunatorio"
          className="flex-shrink-0 w-full sm:w-1/3 rounded mt-2 sm:mt-0 m-3"
        />
      </div>

      <h3 className="text-2xl mb-4 text-teal-600 font-semibold">
        Visit to Inpatients
      </h3>
      <hr className="border-t-2 border-gray-300 mb-4" />

      {/* Card 4 - Visit to Inpatients */}
      <div className="bg-gray-50 rounded p-6 mb-6 flex flex-col sm:flex-row">
        <div className="card-content flex-1">
          <h3 className="text-2xl mb-4 font-semibold text-teal-600">
            MAIN HEADQUARTERS:
          </h3>
          <p className="mb-2">
            <strong>General Ward: </strong>
          </p>
          <p>4:00 PM to 8:00 PM</p>

          <p className="mb-2">
            <strong>
              Intensive Care Unit (ICU) / Coronary Care Unit (CCU):
            </strong>
          </p>
          <p>1:00 PM to 2:00 PM and 7:00 PM to 8:00 PM</p>

          <p className="mb-2">
            <strong>Neonatology:</strong>
          </p>
          <p>4:00 PM to 8:00 PM</p>

          <p className="mb-2">
            <strong>Maternity:</strong>
          </p>
          <p>4:00 PM to 8:00 PM</p>

          <p className="mb-2">
            <strong>Special Adult Care Unit:</strong>
          </p>
          <p>11:00 AM to 12:00 PM and 6:30 PM to 8:30 PM</p>
        </div>
        <img
          src={horariosInternadoImage}
          alt="Horarios Ineternado"
          className="flex-shrink-0 w-full sm:w-1/3 rounded mt-4 sm:mt-0"
        />
      </div>
    </div>
  );
};

export default Visits;
