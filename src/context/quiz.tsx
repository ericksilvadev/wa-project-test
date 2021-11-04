import { createContext, ReactNode, useState } from 'react';

interface IQuizProvider {
  children: ReactNode;
}

interface IQuestions {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface IQuizContext {
  setQuestions: (param: IQuestions[]) => void;
  questions: IQuestions[] | null;
  setQuantity: (param: number | string) => void;
  quantity: number | string;
}

export const QuizContext = createContext({} as IQuizContext);

export const QuizProvider = ({ children }: IQuizProvider) => {
  const [questions, setQuestions] = useState<IQuestions[] | null>(null);
  const [quantity, setQuantity] = useState<number | string>('');

  return (
    <QuizContext.Provider
      value={{ setQuestions, questions, setQuantity, quantity }}
    >
      {children}
    </QuizContext.Provider>
  );
};
