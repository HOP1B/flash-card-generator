"use client";
import { BookOpen, Clock } from "lucide-react";

const courses = [
  { title: "English Grammar → Grammar in Use", unit: "Unit 2 / 162", daysAgo: "2 days ago" },
  { title: "Understanding Force and Motion", unit: "Unit 2 / 12", daysAgo: "3 days ago" },
  { title: "Mathematics: Discovery or Invention?", unit: "Unit 2 / 5", daysAgo: "7 days ago" },
  { title: "Mathematics: Discovery or Invention?", unit: "Unit 2 / 5", daysAgo: "7 days ago" },
  { title: "Exploring the Wonders of Mathematics", unit: "Unit 1 / 5", daysAgo: "8 days ago" },
  { title: "Exploring the Wonders of Mathematics", unit: "Unit 2 / 5", daysAgo: "8 days ago" },
  { title: "Exponential Expressions Mastery", unit: "Unit 2 / 5", daysAgo: "22 days ago" },
];

const Discover = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-4 mb-6">
        <div className="flex-1 p-4 bg-purple-100 rounded-xl text-center">
          <h2 className="font-semibold text-lg">Start a Lesson</h2>
          <p className="text-sm text-gray-600">Learn something new!</p>
        </div>
        <div className="flex-1 p-4 bg-blue-100 rounded-xl text-center">
          <h2 className="font-semibold text-lg">Get a Solution</h2>
          <p className="text-sm text-gray-600">Solve a problem</p>
        </div>
      </div>

      <ul className="space-y-4">
        {courses.map((course, index) => (
          <li key={index} className="flex justify-between items-center p-4 bg-gray-50 border rounded-lg shadow">
            <div className="flex items-center gap-3">
              <BookOpen className="text-purple-600 w-5 h-5" />
              <div>
                <p className="font-semibold">{course.title}</p>
                <p className="text-sm text-gray-500">{course.unit}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>{course.daysAgo}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Discover;


