import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const WeeklyAnalyticsBarChart = () => {
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

  // Combine lesson + favorite data by week
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
      <ResponsiveContainer width="100%" height={420}>
        <BarChart data={chartData} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="lessons"
            fill="#4582f3"
            name="Lessons Created"
            radius={[6, 6, 0, 0]}
          />

          <Bar
            dataKey="favorites"
            fill="#f59e0b"
            name="Favorites Added"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyAnalyticsBarChart;
