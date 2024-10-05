import React, { useState } from "react";
import Button from "./button";
import { toast } from "react-hot-toast";

interface QuestionsProps {
  questions: any[];
}

const Questions: React.FC<QuestionsProps> = ({ questions }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState<
    { index: number; question: string; answer: string }[]
  >([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let score = 0;
    answers.forEach((answer) => {
      const correctAnswer = questions[answer.index].answer;
      if (answer.answer === correctAnswer) {
        score++;
      }
    });

    if (score === questions.length) {
      toast(`🎉🙌🥳 Your score is ${score} out of ${questions.length} 🕺🎆🎈`);
    } else {
      toast(`Your score is ${score} out of ${questions.length}`);
    }
    resetAnswers();
  };

  const resetAnswers = () => {
    setAnswers([]);
    setSelectedAnswers({});
  };

  const handleAnswerClick = (i: number, q: any, c: string) => {
    setAnswers((prevAnswers) => {
      const newAnswers = prevAnswers.filter((a) => a.index !== i);
      return [...newAnswers, { index: i, question: q?.question, answer: c }];
    });
    setSelectedAnswers((prevSelected) => ({
      ...prevSelected,
      [i]: c,
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-4 px-4 py-2">
      {questions.map((q: any, i: number) => (
        <div key={i} className="bg-gray-100 dark:bg-slate-800 p-4 rounded">
          <h3 className="text-sm sm:text-lg font-medium py-2">{q?.question}</h3>
          <div className="grid grid-cols-2 gap-2 my-1">
            {q?.choices.map((c: string, j: number) => (
              <Button
                key={j}
                onClick={() => handleAnswerClick(i, q, c)}
                className={`p-2 rounded text-sm font-semibold ${
                  selectedAnswers[i] === c
                    ? "bg-slate-900 text-white"
                    : "bg-gray-200 dark:bg-slate-700"
                }`}
              >
                {c}
              </Button>
            ))}
            <p className={`text-sm ${showAnswer ? "block" : "hidden"}`}>
              Answer: <span className="text-orange-600">{q?.answer}</span>
            </p>
          </div>
        </div>
      ))}
      {questions.length > 0 && (
        <div className="flex justify-between items-center gap-4">
          <Button
            onClick={() => setShowAnswer(!showAnswer)}
            className="bg-gray-200 dark:bg-slate-700 p-2 rounded text-sm font-semibold"
          >
            {showAnswer ? "Hide Answers" : "Show Answers"}
          </Button>
          <Button
            onClick={(e: any) => handleSubmit(e)}
            className="bg-amber-700 p-2 rounded text-sm font-semibold"
          >
            Submit Answers
          </Button>
        </div>
      )}
    </div>
  );
};

export default Questions;
