import { Option } from '@/views/TestPage/TestPage';

export interface QuestionType {
  data: Option[];
  item: dataQuestion;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface dataQuestion {
  id: string;
  question: string;
  answer: string | null;
  value: number;
}

export default function QuestionForm({
  data,
  item,
  onChange,
}: QuestionType) {
  return (
    <div className="border-b flex flex-col md:flex-row p-5 gap-5 items-center">
      <div className="md:flex-1">
        <h5>{item.question}</h5>
      </div>
      <div className="w-full md:flex-1">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="countries"
          defaultValue=""
          onChange={(e: any) => {
            onChange(e.target.value)
          }}
          value={item.answer ? item.answer : ''}
        >
          <option value="">
            Choose Answer
          </option>
          {data.map((itemAnswer: Option) => (
            <option key={itemAnswer.label} value={itemAnswer.value}>
              {itemAnswer.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
