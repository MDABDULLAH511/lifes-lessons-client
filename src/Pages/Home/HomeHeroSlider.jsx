import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router";
import Container from "../../Components/Container";

const Home = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      className="h-[88vh] w-full"
    >
      {/* ===== Slide 1 ===== */}
      <SwiperSlide>
        <div
          className="h-full w-full bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1503676260728-1c00da094a0b)",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <Container>
            <div className="relative z-10 h-screen flex items-center justify-center">
              <div className="max-w-3xl text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  Learn From Real Life Experiences
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                  Wisdom isn’t found in theory alone — it’s built through real
                  stories, mistakes, and growth.
                </p>
                <Link
                  to="/public-lessons"
                  className="button-main hover:bg-transparent! border-2 border-primary hover:border-white duration-300"
                >
                  Explore Life Lessons
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </SwiperSlide>

      {/* ===== Slide 2 ===== */}
      <SwiperSlide>
        <div
          className="h-full w-full bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d)",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/30" />

          <Container>
            <div className="relative z-10 h-screen flex items-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Turn Experience Into Insight
                </h1>
                <p className="text-lg mb-6 opacity-90">
                  Every challenge carries a lesson — discover stories that shape
                  stronger minds and better decisions.
                </p>
                <Link
                  to="/register"
                  className="inline-block px-7 py-3 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition"
                >
                  Join the Community
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </SwiperSlide>

      {/* ===== Slide 3 ===== */}
      <SwiperSlide>
        <div
          className="h-full w-full bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
          }}
        >
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          <Container>
            <div className="relative z-10 h-screen flex items-center justify-center">
              <div className="text-center text-white max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Save, Reflect & Grow
                </h1>
                <p className="text-lg mb-8 opacity-95">
                  Build your personal collection of lessons that guide your
                  journey forward.
                </p>
                <Link
                  to="/login"
                  className="inline-block px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-primary transition"
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Home;
