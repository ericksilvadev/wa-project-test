interface IQuestions {
  incorrect_answers: string[];
  correct_answer: string;
  category: string;
  type: string;
  difficulty: string;
  question: string;
}

const decodeQuestions = (questions: IQuestions[]) => {
  console.log(questions);

  const parser = new DOMParser();

  console.log(parser.parseFromString(questions[0].question, 'text/html').body.innerText);

  const decoded = questions.map(
    ({ category, type, difficulty, question, correct_answer, incorrect_answers }) => ({
      category: parser.parseFromString(category, 'text/html').body.innerText,
      type,
      difficulty,
      question: parser.parseFromString(question, 'text/html').body.innerText,
      correct_answer: parser.parseFromString(correct_answer, 'text/html').body.innerText,
      incorrect_answers: incorrect_answers.map(
        (incorrect) => parser.parseFromString(incorrect, 'text/html').body.innerText
      ),
    })
  );
  return decoded;
};

export default decodeQuestions;
