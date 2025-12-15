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

const AdminDashboardChart = () => {
  const axiosSecure = useAxiosSecure();



  // ================= LESSON GROWTH =================
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
    <div>
      {/* ===== CHARTS ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Lesson Growth */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Lesson Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lessonGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardChart;
