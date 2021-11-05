const shuffleAnswers = (incorrect: string[], correct: string) => {
  const answers = [
    ...incorrect.map((q) => ({ answer: q, correct: false })),
    { answer: correct, correct: true },
  ];

  const randomArray: number[] = [];

  // Create a random array from 0 to 3

  while (randomArray.length < answers.length) {
    const randomNumber: number = Math.round(
      Math.random() * (answers.length - 1)
    );

    if (!randomArray.includes(+randomNumber)) {
      randomArray.push(+randomNumber);
    }
  }

  // Use the random array to change the position of the answers

  const shuffledAnswers = randomArray.map((number) => answers[number]);

  return shuffledAnswers;
};

export default shuffleAnswers;
