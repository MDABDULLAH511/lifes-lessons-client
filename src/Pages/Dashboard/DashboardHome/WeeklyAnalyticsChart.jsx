import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import useAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const WeeklyAnalyticsChart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = {} } = useQuery({
    queryKey: ["weekly-analytics", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics/weekly/${user.email}`);
      return res.data;
    },
  });

  const lessons = data.lessons || [];
  const favorites = data.favorites || [];

  //add lesson + favorite data by week
  const chartData = [];

  lessons.forEach((lesson) => {
    const week = lesson._id.week;
    const fav = favorites.find((f) => f._id.week === week);

    chartData.push({
      week: `Week ${week}`,
      lessons: lesson.lessons,
      favorites: fav ? fav.favorites : 0,
    });
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm w-full">
      <ResponsiveContainer width="100%" height={442}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="lessons"
            stroke="#4582f3"
            strokeWidth={2}
            name="Lessons Created"
          />

          <Line
            type="monotone"
            dataKey="favorites"
            stroke="#f59e0b"
            strokeWidth={2}
            name="Favorites Added"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyAnalyticsChart;
