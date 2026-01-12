import React from "react";
import Container from "../../Components/Container";
import {
  FiBook,
  FiHeart,
  FiTrendingUp,
  FiUsers,
  FiTarget,
  FiSmile,
} from "react-icons/fi";

const Categories = () => {
  const categories = [
    {
      icon: <FiBook size={40} />,
      title: "Personal Growth",
      description: "Lessons on self-improvement and personal development.",
    },
    {
      icon: <FiHeart size={40} />,
      title: "Relationships",
      description:
        "Insights into building and maintaining healthy relationships.",
    },
    {
      icon: <FiTrendingUp size={40} />,
      title: "Career Success",
      description:
        "Stories and advice on professional growth and achievements.",
    },
    {
      icon: <FiUsers size={40} />,
      title: "Community",
      description: "Experiences from community involvement and social impact.",
    },
    {
      icon: <FiTarget size={40} />,
      title: "Goal Achievement",
      description: "Tales of overcoming obstacles and reaching dreams.",
    },
    {
      icon: <FiSmile size={40} />,
      title: "Happiness & Wellness",
      description: "Lessons on finding joy and maintaining mental health.",
    },
  ];

  return (
    <Container>
      <section className="py-10 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold text-2xl md:text-4xl mb-4">
              Explore Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover lessons across various aspects of life. Each category
              offers unique insights and experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-xl mb-2 text-center">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Categories;
