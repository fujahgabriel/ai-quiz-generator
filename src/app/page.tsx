"use client";
import Image from "next/image";
import { useState } from "react";
import quizImage from "./assets/quiz.png";
import Questions from "./components/ui/question";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState(1);
  const [language, setLanguage] = useState("English");
  const [difficulty, setDifficulty] = useState("Easy");
  const [loading, setLoading] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          questions,
          language,
          difficulty,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setQuestionsList(data.questions);
        setLoading(false);
      } else {
        alert("Conversion failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="dark:bg-gradient-to-r from-slate-900  flex flex-col items-center justify-items-center min-h-screen p-6  sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center ">
          {/* Header */}
          <div className="flex flex-col gap-4 items-center ">
            <h1 className="text-center text-4xl sm:text-5xl font-bold">
              AI Quiz Generator
            </h1>
            <p className="text-center  text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Generate quizzes with the help of AI
            </p>
            <Image src={quizImage} alt="Quiz Image" width={250} height={250} />
          </div>

          {/* Form */}
          <div className="flex justify-center gap-4 items-center flex-col">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 justify-center items-center gap-4">
                <div className="flex flex-col gap-2 ">
                  <label
                    htmlFor="question"
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
                  >
                    Questions <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="questions"
                    required
                    onChange={(e: any) => setQuestions(e.target.value)}
                    disabled={loading}
                    className="bg-gray-100 dark:bg-slate-900 dark:border dark:border-slate-500 rounded px-2 py-3 focus:outline-none"
                  >
                    <option value="1">1</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 ">
                  <label
                    htmlFor="language"
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
                  >
                    Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="language"
                    required
                    onChange={(e: any) => setLanguage(e.target.value)}
                    disabled={loading}
                    className="bg-gray-100 dark:bg-slate-900 dark:border dark:border-slate-500 rounded px-2 py-3 focus:outline-none"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Pigin English (Nigerian)">
                      Pigin English (Nigerian)
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 ">
                  <label
                    htmlFor="difficulty"
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
                  >
                    Difficulty <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="difficulty"
                    required
                    onChange={(e: any) => setDifficulty(e.target.value)}
                    disabled={loading}
                    className="bg-gray-100 dark:bg-slate-900 dark:border dark:border-slate-500 rounded px-2 py-3 focus:outline-none"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
              <div className="py-3">
                <label
                  htmlFor="question"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
                >
                  Area of subject: <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="question"
                  id="question"
                  required
                  placeholder="Enter your question here e.g. Mathematics, Science, History, etc."
                  value={question}
                  disabled={loading}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="bg-gray-100 dark:border dark:border-slate-500 dark:bg-slate-900 rounded w-full h-32 px-2 py-2 focus:outline-none"
                ></textarea>
              </div>
              <div className=" flex py-3 justify-center items-center">
                <button
                  disabled={loading}
                  type="submit"
                  className="disabled:bg-slate-800 rounded-md border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                >
                  {loading ? "Generating..." : "Generate Quiz"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-8 md:h-[95vh]">
          {loading ? (
            <>
              <div className="animate-pulse h-42 bg-gray-200 dark:bg-slate-800 rounded mt-1 p-4">
                <p className="animate-pulse h-12 w-full bg-gray-200 dark:bg-slate-900 rounded mt-1"></p>
                <div className="grid grid-cols-2 gap-2 my-1">
                  <div className="animate-pulse h-12 w-full bg-gray-200 dark:bg-slate-900 rounded mt-1"></div>
                  <div className="animate-pulse h-12 w-full bg-gray-200 dark:bg-slate-900 rounded mt-1"></div>
                  <div className="animate-pulse h-12 w-full bg-gray-200 dark:bg-slate-900 rounded mt-1"></div>
                  <div className="animate-pulse h-12 w-full bg-gray-200 dark:bg-slate-900 rounded mt-1"></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-center text-2xl sm:text-3xl font-bold">
                Questions
              </h2>
              <div className="flex justify-center items-center overflow-y-scroll py-4">
                <Questions questions={questionsList} />
              </div>
            </>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="flex  flex-wrap items-center justify-center text-xs py-2">
        &copy; {new Date().getFullYear()} AI Quiz Generator. All rights
        reserved.
      </footer>
    </div>
  );
}
