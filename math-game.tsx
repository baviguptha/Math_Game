import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Shield, Trophy } from 'lucide-react';

const MathGame = () => {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState({ num1: 0, num2: 0, operation: '+' });
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Generate a new question
  const generateQuestion = () => {
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * 2)];
    let num1, num2;

    if (operation === '+') {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * (20 - num1)) + 1;
    } else {
      num1 = Math.floor(Math.random() * 15) + 5;
      num2 = Math.floor(Math.random() * num1) + 1;
    }

    setQuestion({ num1, num2, operation });
    setAnswer('');
    setFeedback('');
  };

  // Initialize game
  useEffect(() => {
    generateQuestion();
  }, []);

  // Check answer
  const checkAnswer = () => {
    const userAnswer = parseInt(answer);
    const correctAnswer = question.operation === '+' 
      ? question.num1 + question.num2 
      : question.num1 - question.num2;

    if (userAnswer === correctAnswer) {
      setScore(score + 1);
      setStreak(streak + 1);
      setFeedback('Correct! Well done! 🌟');
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1500);
      setTimeout(generateQuestion, 1500);
    } else {
      setFeedback('Try again! You can do it! 💪');
      setStreak(0);
    }
  };

  // Handle keypress
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <Card className="w-96 p-6 bg-white shadow-lg">
        <CardContent>
          <div className="text-center">
            <div className="flex justify-between mb-4">
              <div className="flex items-center">
                <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
                <span className="text-lg font-bold">Score: {score}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-6 h-6 text-purple-500 mr-2" />
                <span className="text-lg font-bold">Streak: {streak}</span>
              </div>
            </div>

            <div className="text-4xl font-bold mb-8 text-blue-600">
              {question.num1} {question.operation} {question.num2} = ?
            </div>

            <div className="mb-6">
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-24 h-12 text-2xl text-center border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                max="99"
              />
            </div>

            <Button 
              onClick={checkAnswer}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mb-4 w-full"
            >
              Check Answer
            </Button>

            <div className={`text-lg font-semibold mb-4 ${feedback.includes('Correct') ? 'text-green-500' : 'text-orange-500'}`}>
              {feedback}
            </div>

            {showCelebration && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="text-6xl animate-bounce">🎉</div>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
              <Shield className="inline w-4 h-4 mr-1" />
              Keep practicing to become a Math Champion!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MathGame;
