import React from "react";
import Container from "../../Components/Container";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Life Coach",
      content:
        "This platform has transformed how I share my experiences. The community is incredibly supportive and the lessons I've learned are invaluable.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Entrepreneur",
      content:
        "Reading about others' journeys has given me the courage to pursue my dreams. The insights here are raw and real.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Teacher",
      content:
        "As an educator, I appreciate how these lessons complement traditional learning. They're authentic and inspiring.",
      rating: 5,
    },
    {
      name: "David Rodriguez",
      role: "Software Developer",
      content:
        "The stories shared here have helped me navigate career challenges. Real experiences beat any career advice book.",
      rating: 5,
    },
    {
      name: "Lisa Thompson",
      role: "Parent",
      content:
        "As a mother, I've found incredible wisdom in these personal stories. They help me guide my children with real-world insights.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Retired Executive",
      content:
        "Sharing my 30+ years of experience here has been rewarding. The community's feedback keeps me engaged and learning.",
      rating: 5,
    },
  ];

  return (
    <Container>
      <section className="py-10 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold text-2xl md:text-4xl mb-4">
              What Our Community Says
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from learners and contributors who have found value in our
              platform.
            </p>
          </div>
          <div className="max-w-6xl mx-auto relative">
            {/* Custom Navigation Buttons */}
            <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 transition-all duration-300 hover:scale-110">
              <FiChevronLeft size={24} />
            </button>
            <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 transition-all duration-300 hover:scale-110">
              <FiChevronRight size={24} />
            </button>

            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              loop={true}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="pb-12 px-12"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-xl p-6 shadow-md h-full min-h-[280px] flex flex-col">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FiStar
                          key={i}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 flex-grow">
                      "{testimonial.content}"
                    </p>
                    <div className="mt-auto">
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Testimonials;
