import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaBookOpen, FaUsers } from "react-icons/fa";

const AdminAnalyticsPage = () => {
  const axiosSecure = useAxiosSecure();

  // ================= USER GROWTH =================
  const { data: lessonGrowth = [] } = useQuery({
    queryKey: ["lesson-growth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard/lesson-growth");
      return res.data;
    },
  });

  // ================= USER GROWTH =================
  const { data: userGrowth = [] } = useQuery({
    queryKey: ["user-growth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard/user-growth");
      return res.data;
    },
  });

  return (
    <div className="p-6 space-y-6">
      {/* ===== HEADER ===== */}
      <div className="text-center">
        <h2 className="font-bold text-xl md:text-2xl mb-1">
          Admin Analytics Dashboard
        </h2>
        <p className="mb-5 ">Monitor lesson creation and user growth trends</p>
      </div>

      {/* ===== CHART CARDS ===== */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Lesson Growth */}
        <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-2xl shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <FaBookOpen className="text-blue-500 text-xl" />
            <h3 className="font-semibold text-gray-700">Lesson Growth</h3>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={lessonGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4582f3" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="bg-linear-to-br from-amber-50 to-white p-6 rounded-2xl shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <FaUsers className="text-amber-500 text-xl" />
            <h3 className="font-semibold text-gray-700">User Growth</h3>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
