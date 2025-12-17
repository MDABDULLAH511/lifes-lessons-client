import React from "react";
import HomeHeroSlider from "./HomeHeroSlider";
import FeaturedLessons from "./FeaturedLessons";
import Container from "../../Components/Container";
import { FiHeart, FiUser, FiTrendingUp, FiBookOpen } from "react-icons/fi";
import TopContributors from "./TopContributors";
import MostSavedLessons from "./MostSavedLessons";

const Home = () => {
  return (
    <div>
      <HomeHeroSlider />

      <FeaturedLessons />

      {/* Why Learning From Life Matters */}
      <Container>
        <section className="py-10 md:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 lg:w-8/12 mx-auto">
              <h2 className="font-bold text-xl md:text-4xl">
                Why Learning From Life Matters
              </h2>
              <p className="font-semibold my-3">
                Life is full of lessons that shape who we are. Learning from
                real experiences helps us grow, make better decisions, and
                understand ourselves and others more deeply. Each story and
                challenge offers wisdom that textbooks can’t teach.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <FiTrendingUp size={32} />,
                  title: "Real Growth",
                  text: "Lessons built from real-life experiences.",
                },
                {
                  icon: <FiBookOpen size={32} />,
                  title: "Shared Wisdom",
                  text: "Learn from people across cultures.",
                },
                {
                  icon: <FiUser size={32} />,
                  title: "Emotional Awareness",
                  text: "Understand mindset and emotions.",
                },
                {
                  icon: <FiHeart size={32} />,
                  title: "Community Learning",
                  text: "Grow together through shared stories.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 text-center shadow"
                >
                  <div className="text-primary mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>

      <TopContributors />

      <MostSavedLessons />
    </div>
  );
};

export default Home;
