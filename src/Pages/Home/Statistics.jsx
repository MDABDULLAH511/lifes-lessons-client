import React from "react";
import Container from "../../Components/Container";
import { FiUsers, FiBookOpen, FiHeart, FiTrendingUp } from "react-icons/fi";

const Statistics = () => {
  const stats = [
    {
      icon: <FiUsers size={40} />,
      number: "10,000+",
      label: "Active Learners",
    },
    {
      icon: <FiBookOpen size={40} />,
      number: "5,000+",
      label: "Life Lessons Shared",
    },
    {
      icon: <FiHeart size={40} />,
      number: "50,000+",
      label: "Favorites Saved",
    },
    {
      icon: <FiTrendingUp size={40} />,
      number: "95%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <Container>
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold text-2xl md:text-4xl mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Numbers that tell our story of growth and community engagement.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-primary mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="font-bold text-3xl md:text-4xl mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Statistics;
