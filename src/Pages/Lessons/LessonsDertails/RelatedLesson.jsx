import React from "react";

const RelatedLesson = () => {
  return (
    <div>
      <div className="pb-15 md:pb-20">
        <div>
          <h2 className="font-bold text-xl md:text-2xl mb-5 pb-1 border-b border-gray-300">
            Similar Lessons by Category
          </h2>
        </div>

        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4   gap-6">
            {lessons.map((lesson, ind) => (
              <LessonCard key={ind} lesson={lesson} />
            ))}
          </div> */}
      </div>
      {/* related 6 lessons */}

        <div className="pb-15 md:pb-20">
        <div>
          <h2 className="font-bold text-xl md:text-2xl mb-5 pb-1 border-b border-gray-300">
            Lessons with a Similar Emotional Tone
          </h2>
        </div>
        {/* All Public Lesson Card Item */}
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4   gap-6">
            {lesson.map((lesson, ind) => (
              <LessonCard key={ind} lesson={lesson} />
            ))}
          </div> */}
      </div>
    </div>
  );
};

export default RelatedLesson;
