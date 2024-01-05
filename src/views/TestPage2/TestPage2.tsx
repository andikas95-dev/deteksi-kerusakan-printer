/* eslint-disable @next/next/no-img-element */
'use client';
import QuestionForm, {
  dataQuestion,
} from '@/components/QuestionForm/QuestionForm';
import Image from 'next/image';
import { useState } from 'react';
import { HiMenu, HiOutlineX } from 'react-icons/hi';

export interface Option {
  label: string;
  value: string;
}
interface kData {
  id: string;
  name: string;
  dataQ: string[];
  value: number;
}

export default function TestPage2() {
  const [showSurvey, setShowSurvey] = useState(false);
  const [answerK, setAnswerK] = useState<
    | {
        id: string;
        name: string;
        dataQ: string[];
      }
    | undefined
  >(undefined);

  const [percentAnswer, setPercentAnswer] = useState(0);

  const data: Option[] = [
    {
      label: 'Yes',
      value: 'yes',
    },
    {
      label: 'No',
      value: 'no',
    },
  ];
  const [k, setK] = useState<kData[]>([
    {
      id: 'K1',
      name: 'Paper Jam Error / Print Unable 30,31,32,33,34,35,8F',
      dataQ: ['q1', 'q2', 'q3'],
      value: 0,
    },
    {
      id: 'K2',
      name: 'Catridge cannot detected / Reinstall slowly cannot be detected',
      dataQ: ['q4', 'q5', 'q6'],
      value: 0,
    },
    {
      id: 'K3',
      name: 'Head printer bermasalah',
      dataQ: ['q2', 'q7', 'q8'],
      value: 0,
    },
    {
      id: 'K4',
      name: 'Ink box full',
      dataQ: ['q9'],
      value: 0,
    },
    {
      id: 'K5',
      name: 'Error Scaner / Kesalahan TWAIN atau WIA saat mulai memindai',
      dataQ: ['q10'],
      value: 0,
    },
    {
      id: 'K6',
      name: 'Dinamo motor penggerak head rusak',
      dataQ: ['q11'],
      value: 0,
    },
  ]);

  const [q, setQ] = useState<dataQuestion[]>([
    {
      id: 'q1',
      question: 'Apakah Printer tidak bekerja karena kemacetan kertas?',
      answer: '',
      value: 0.65,
    },
    {
      id: 'q2',
      question:
        'Apakah Printer tidak mau mencetak tidak ada kertas yang sangkut di tandai dengan blinking muncul pesan Error Print Unable 30?',
      answer: '',
      value: 0.46,
    },
    {
      id: 'q3',
      question: 'Apakah Feed atau penarik kertas tidak bekerja?',
      answer: '',
      value: 0.6,
    },
    {
      id: 'q4',
      question: 'Apakah Tinta yang ada di catridge telah habis?',
      answer: '',
      value: 0.8,
    },
    {
      id: 'q5',
      question:
        'Apakah Catridge tinta printer tidak terdeteksi di tandai dengan blinking?',
      answer: '',
      value: 0.55,
    },
    {
      id: 'q6',
      question: 'Apakah Muncul error Close ink cover?',
      answer: '',
      value: 0.75,
    },
    {
      id: 'q7',
      question: 'Apakah Hasil cetakan warna putus-putus?',
      answer: '',
      value: 0.7,
    },
    {
      id: 'q8',
      question:
        'Apakah Warna tidak keluar sama sekali, walaupun sudah dibersihkan berulang kali?',
      answer: '',
      value: 0.5,
    },
    {
      id: 'q9',
      question:
        "Apakah Muncul Troubleshooting in User's guide solution di tampilan display printer di tandai dengan blinking orange?",
      answer: '',
      value: 0.65,
    },
    {
      id: 'q10',
      question: 'Apakah Scaner printer tidak bekerja?',
      answer: '',
      value: 0.78,
    },
    {
      id: 'q11',
      question: 'Apakah Proses mencetak lambat?',
      answer: '',
      value: 0.82,
    },
  ]);

  const resetSurvey = () => {
    setQ(
      q.map((q: dataQuestion) => {
        return {
          ...q,
          answer: '',
        };
      })
    );
  };

  const resetAnswerK = () => {
    setAnswerK(undefined);
    setPercentAnswer(0);
  };

  const handleSubmit = () => {
    const newDataQ = q.filter((q: dataQuestion) => q.answer == 'yes');
    const newDataK = k.map((k: any) => {
      const newDataQ1 = newDataQ.filter((q) =>
        k.dataQ.find((d: string) => d == q.id)
      );
      if (newDataQ1.length == 1) {
        const nilaiCf = newDataQ1.reduce(
          (prev: number, curr: dataQuestion, idx: number) => {
            if (idx == 0) {
              return curr.value;
            }
            const newCal = curr.value * (1 - curr.value);
            return newCal;
          },
          0
        );
        return {
          ...k,
          value: nilaiCf * 100,
        };
      }

      if (newDataQ1.length > 1) {
        // setAnswerK(newData2);

        const nilaiCf = newDataQ1.reduce(
          (
            prev: number,
            curr: dataQuestion,
            idx: number,
            arr: dataQuestion[]
          ) => {
            if (arr.length > 1) {
              if (idx == 0) {
                return curr.value;
              }
              const newCal = prev + curr.value * (1 - prev);
              return newCal;
            }
            return curr.value;
          },
          0
        );
        return {
          ...k,
          value: nilaiCf * 100,
        };
      }
      return {
        ...k,
      };
    });
    setK(newDataK);

    const finishData = newDataK.reduce((prev, curr, idx) => {
      if (curr.value > prev.value || idx == 0) {
        return curr;
      }
      return prev;
    }, 0);
    setAnswerK(finishData);
    setPercentAnswer(finishData.value);
  };

  const changeDataQ = (val: string, id: string) => {
    const newData = q;
    q[0].answer = val;
    setQ(newData);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="px-20 pt-4">
      <h1 className="text-2xl font-bold text-center">Sistem Pakar Dalam Kerusakan Printer</h1>
        <section>
          <div className="w-full flex flex-col">
            {q.flatMap((item) => {
              return (
                <QuestionForm
                  key={item.id}
                  data={data}
                  item={item}
                  onChange={(val) => {
                    const newQ: any = q.map((q: dataQuestion) => {
                      if (q.id == item.id) {
                        return { ...q, answer: val };
                      }
                      return q;
                    });
                    setQ(newQ);
                  }}
                />
              );
            })}
          </div>
          <div className="flex justify-end gap-5 m-5">
            <button
              className="middle none center mr-4 rounded-lg bg-white py-3 px-6 font-sans text-xs font-bold uppercase text-slate-700 border-slate-700 border transition-all hover:shadow-lg hover:border-2 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={() => {
                resetSurvey();
                resetAnswerK();
              }}
            >
              Reset
            </button>
            <button
              className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </button>
          </div>
        </section>

        {answerK !== undefined && (
          <section className="mt-5">
            <h5>
              Dari jawaban yang diberikan terdapat{' '}
              <span className="font-bold text-red-600">{percentAnswer} %</span>{' '}
              kemungkinan terdapat masalah yaitu{' '}
              <span className="font-bold text-red-600">{answerK?.name}</span>
            </h5>

            <table className="w-full table-fixed text-center mt-5">
              <tr className="bg-gray-600 text-white">
                <th>Kode</th>
                <th colSpan={2}>Masalah</th>
                <th>Perentase</th>
              </tr>
              {k.map((item) => {
                return (
                  <tr key={item.id} className="border-b-2">
                    <td>{item.id}</td>
                    <td className="text-left" colSpan={2}>
                      {item.name}
                    </td>
                    <td>{item.value.toFixed(2)} %</td>
                  </tr>
                );
              })}
            </table>
          </section>
        )}
      </div>
    </main>
  );
}
