"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/*
function romanToInt(s: string): number {
  const romanMap: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const current = romanMap[s[i] as keyof typeof romanMap];
    const next = romanMap[s[i + 1] as keyof typeof romanMap];
    if (next > current) {
      total += next - current;
      i++;
    } else {
      total += current;
    }
  }
  return total;
}
*/

export default function RomanQuizGame() {
  const romanNumerals = [
    { roman: "I", value: 1 },
    { roman: "II", value: 2 },
    { roman: "III", value: 3 },
    { roman: "IV", value: 4 },
    { roman: "V", value: 5 },
    { roman: "VI", value: 6 },
    { roman: "VII", value: 7 },
    { roman: "VIII", value: 8 },
    { roman: "IX", value: 9 },
    { roman: "X", value: 10 },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = romanNumerals[currentQuestion].value;
    if (parseInt(userAnswer) === correctAnswer) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(`Wrong! The correct answer is ${correctAnswer}`);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < romanNumerals.length) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer("");
        setFeedback("");
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setUserAnswer("");
    setScore(0);
    setFeedback("");
    setShowResult(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Roman Numerals Quiz
          </h1>
          {showResult ? (
            <div className="text-center">
              <p className="text-xl mb-4">
                Your Score: {score}/{romanNumerals.length}
              </p>
              <Button onClick={handleRestart}>Play Again</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="mb-4 text-lg text-center">
                What is the value of{" "}
                <span className="font-semibold">
                  {romanNumerals[currentQuestion].roman}
                </span>
                ?
              </p>
              <Input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter a number"
                className="mb-4"
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
              {feedback && (
                <motion.p
                  className="mt-4 text-center font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {feedback}
                </motion.p>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
