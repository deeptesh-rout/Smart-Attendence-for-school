import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { saveAs } from "file-saver";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const AdminAttendanceRecords = () => {
  const [records, setRecords] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch attendance records (Dummy data for now)
    setRecords([
      { id: 1, event: "Tech Conference", attendee: "John Doe", time: "10:30 AM", date: "2025-03-01" },
      { id: 2, event: "AI Summit", attendee: "Jane Smith", time: "11:15 AM", date: "2025-03-02" },
      { id: 3, event: "Tech Conference", attendee: "Alice Johnson", time: "10:45 AM", date: "2025-03-01" },
      // Add more records as needed
    ]);
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  const handleDownloadCSV = () => {
    const csvData = selectedEvent.records.map(record => `${record.attendee},${record.time},${record.date}`).join("\n");
    const blob = new Blob([`Name,Time,Date\n${csvData}`], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${selectedEvent.event}-attendance.csv`);
  };

  const groupedRecords = records.reduce((acc, record) => {
    if (!acc[record.event]) {
      acc[record.event] = [];
    }
    acc[record.event].push(record);
    return acc;
  }, {});

  return (
    <div 
      className="min-h-screen bg-gray-900 text-white relative overflow-hidden"
      style={{
        backgroundImage: "url('/bg-pattern.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.9, 
      }}
    >
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} role="admin" />

      {/* Main Content */}
      <div className="relative z-10 p-6 md:p-10">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} dashboardUrl="/admin-dashboard" />

        {/* Greeting */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 text-center 
        text-white font-extrabold text-3xl md:text-4xl lg:text-5xl 
        animate-fadeIn drop-shadow-lg mt-6">
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Attendance Records
          </span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-3xl mx-auto mt-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6 md:p-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-500">Event Attendance</h2>

            <div className="space-y-4">
              {Object.keys(groupedRecords).map(event => (
                <div key={event} className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer" onClick={() => handleEventClick({ event, records: groupedRecords[event] })}>
                  <h3 className="text-2xl font-semibold">{event}</h3>
                  <p className="text-gray-400">Date: {groupedRecords[event][0].date}</p>
                  <p className="text-gray-400">Time: {groupedRecords[event][0].time}</p>
                </div>
              ))}
            </div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <Dialog.Title className="text-2xl font-bold mb-4">{selectedEvent?.event}</Dialog.Title>
                <table className="w-full border-collapse border mb-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Time</th>
                      <th className="border p-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEvent?.records.map(record => (
                      <tr key={record.id} className="border">
                        <td className="border p-2">{record.attendee}</td>
                        <td className="border p-2">{record.time}</td>
                        <td className="border p-2">{record.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  onClick={handleDownloadCSV}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg transition-transform hover:scale-105 hover:bg-blue-500 shadow-lg"
                >
                  Download CSV
                </button>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendanceRecords;