import React from "react";
import Container from "../../Components/Container";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-10 md:py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bold text-2xl md:text-4xl mb-4">
            Ready to Share Your Story?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of learners and contributors in our community. Your
            experiences matter and can inspire others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Get Started Free
              <FiArrowRight className="ml-2" />
            </Link>
            <Link
              to="/lessons"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors inline-flex items-center justify-center"
            >
              Explore Lessons
            </Link>
          </div>
          <p className="text-sm mt-6 opacity-80">
            No credit card required. Start learning and sharing today.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default CallToAction;
