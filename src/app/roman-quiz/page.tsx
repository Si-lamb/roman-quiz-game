"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

// Unused utility function for Roman numeral conversion - commented out for now
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

// Function to generate a random Roman numeral along with its corresponding integer value
function getRandomRoman(): [string, number] {
  const values = [1, 4, 9, 12, 27, 40, 58, 90, 99, 400, 500, 944, 1000];
  const romanValues = [
    "I",
    "IV",
    "IX",
    "XII",
    "XXVII",
    "XL",
    "LVIII",
    "XC",
    "XCIX",
    "CD",
    "D",
    "CMXLIV",
    "M",
  ];
  const index = Math.floor(Math.random() * values.length);
  return [romanValues[index], values[index]];
}

export default function RomanQuizGame() {
  // Setup state: current question, user's answer, and feedback message
  const [[roman, correct], setQuestion] = useState(getRandomRoman());
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (parseInt(userAnswer) === correct) {
      setFeedback("✅ Correct!");
      setTimeout(() => {
        setQuestion(getRandomRoman());
        setUserAnswer("");
        setFeedback("");
      }, 1000);
    } else {
      setFeedback("❌ Try again!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="space-y-6 py-8">
          <h1 className="text-2xl font-bold text-center">
            🧠 Roman Numeral Quiz
          </h1>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-center text-4xl font-mono"
          >
            {roman}
          </motion.div>
          <Input
            type="number"
            value={userAnswer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserAnswer(e.target.value)
            }
            placeholder="Enter the number"
            className="text-center text-lg"
          />
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
          {feedback && (
            <div className="text-center text-lg font-semibold">{feedback}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
