import { createContext, ReactNode, useState } from 'react';

interface IQuizProvider {
  children: ReactNode;
}

interface IQuestions {
  incorrect_answers: string[];
  correct_answer: string;
  category: string;
  type: string;
  difficulty: string;
  question: string;
}

interface IUserAnswers {
  answer: string;
  correct: boolean;
}

interface IQuizContext {
  setQuestions: (param: IQuestions[]) => void;
  questions: IQuestions[];
  setQuantity: (param: number | string) => void;
  quantity: number | string;
  setUserAnswers: (param: IUserAnswers[]) => void;
  userAnswers: IUserAnswers[];
}

export const QuizContext = createContext({} as IQuizContext);

export const QuizProvider = ({ children }: IQuizProvider) => {
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const [quantity, setQuantity] = useState<number | string>('');
  const [userAnswers, setUserAnswers] = useState<IUserAnswers[]>([]);

  return (
    <QuizContext.Provider
      value={{
        setQuestions,
        questions,
        setQuantity,
        quantity,
        setUserAnswers,
        userAnswers,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
