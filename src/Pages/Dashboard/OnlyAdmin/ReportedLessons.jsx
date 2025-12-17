import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { TbReportSearch } from "react-icons/tb";
import { FaFlag, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const reportModalRef = useRef();
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Load reported lessons data
  const {
    refetch,
    data: reportedLessons = [],
    isLoading,
  } = useQuery({
    queryKey: ["reportedLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports/lessons");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Open modal with selected lesson reports
  const openReportModal = (lesson) => {
    setSelectedLesson(lesson);
    reportModalRef.current.showModal();
  };

  //Handle Delete Lesson from lessons and reports
  const handleDeleteLesson = async (lessonId) => {
    Swal.fire({
      title: "Delete this lesson?",
      text: "This will remove the lesson and all related reports!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/lessons/${lessonId}`);

        if (res.data.lessonDeleted) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Lesson and reports removed.",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
        }
      }
    });
  };

  //   Handle delete single reports from reports
  const handleIgnoreReport = async (reportId) => {
    const res = await axiosSecure.delete(`/reports/${reportId}`);

    if (res.data.deletedCount) {
      // remove from modal state
      setSelectedLesson((prev) => ({
        ...prev,
        reports: prev.reports.filter((report) => report._id !== reportId),
      }));

      // background data refresh
      refetch();
      toast.success("Report ignored successfully");
    }
  };

  return (
    <div className="bg-accent/5 m-2 md:m-15 p-2 md:p-10 rounded-xl">
      {/* Page Header */}
      <div className="text-center mb-10 lg:w-8/12 mx-auto">
        <h2 className="font-bold text-xl md:text-4xl">Reported Lessons</h2>
        <p className="font-semibold my-3">
          Review all reported lessons. Check report count, view reasons, and
          reporter details to take appropriate actions.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra my-custom-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Lesson Title</th>
              <th>Report Count</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reportedLessons.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center font-semibold">
                  No reported lessons found 🎉
                </td>
              </tr>
            )}

            {reportedLessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <th>{index + 1}</th>
                <td>{lesson.lessonTitle}</td>

                <td className="numberFont flex items-center gap-2 border-b-0">
                  <FaFlag className="text-red-500" />
                  {lesson.reportCount}
                </td>

                <td>
                  {/* View reports */}
                  <button
                    onClick={() => openReportModal(lesson)}
                    className="actionBtn tooltip mr-3"
                    data-tip="View Reports"
                  >
                    <TbReportSearch size={18} />
                  </button>

                  {/* Delete lesson */}
                  <button
                    onClick={() => handleDeleteLesson(lesson._id)}
                    className="actionBtn tooltip text-red-500"
                    data-tip="Delete Lesson"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report Details Modal */}
      <dialog ref={reportModalRef} className="modal modal-middle">
        <div className="modal-box max-w-4xl">
          <h3 className="font-bold text-xl mb-4">
            Reports for:{" "}
            <span className="text-primary">{selectedLesson?.lessonTitle}</span>
          </h3>

          {/* Reports List */}
          <div className="overflow-x-auto">
            <table className="table table-zebra my-custom-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Reason</th>
                  <th>Reported By</th>
                  <th>Date</th>
                  <th>Ignore</th>
                </tr>
              </thead>
              <tbody>
                {selectedLesson?.reports?.map((report, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{report.reason}</td>
                    <td>{report.reportedBy}</td>
                    <td className="numberFont">
                      {new Date(report.reportedAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        onClick={() => handleIgnoreReport(report._id)}
                        className="btn  btn-sm bg-yellow-400 text-black shadow border-0"
                      >
                        Ignore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn border-0 shadow bg-[#e03233] text-white">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ReportedLessons;
