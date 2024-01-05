/* eslint-disable @next/next/no-img-element */
'use client';
import QuestionForm, {
  dataQuestion,
} from '@/components/QuestionForm/QuestionForm';
import { useState } from 'react';

export interface Option {
  label: string;
  value: string;
}

export default function TestPage() {
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
  const k = [
    {
      id: 'K1',
      name: 'Paper Jam Error / Print Unable 30,31,32,33,34,35,8F',
      dataQ: ['q1', 'q2', 'q3'],
    },
    {
      id: 'K2',
      name: 'Catridge cannot detected / Reinstall slowly cannot be detected',
      dataQ: ['q4', 'q5', 'q6'],
    },
    {
      id: 'K3',
      name: 'Head printer bermasalah',
      dataQ: ['q2-1', 'q7', 'q8'],
    },
    {
      id: 'K4',
      name: 'Ink box full',
      dataQ: ['q9'],
    },
    {
      id: 'K5',
      name: 'Error Scaner / Kesalahan TWAIN atau WIA saat mulai memindai',
      dataQ: ['q10'],
    },
    {
      id: 'K6',
      name: 'Dinamo motor penggerak head rusak',
      dataQ: ['q11'],
    },
  ]

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
      id: 'q2-1',
      question:
        'Apakah Printer tidak mau mencetak tidak ada kertas yang sangkut di tandai dengan blinking muncul pesan Error Print Unable 30?',
      answer: '',
      value: 0.46,
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
    const newData = q.filter((q: dataQuestion) => q.answer == 'yes');
    const newData2 = newData.length > 0 ? k.find((k: any) =>
    k.dataQ.find((q: any) => q == newData?.[0].id)
  ) : undefined;

    if(newData.length == 0){
      setAnswerK({
        id: 'ERROR',
        name: "Tidak Teridentifikasi",
        dataQ: []
      })
      setPercentAnswer(99)
    }

    if(newData.length == 1){
      setAnswerK(newData2);

        const nilaiCf = newData.reduce(
        (prev: number, curr: dataQuestion, idx: number) => {
            if (idx == 0) {
              return curr.value;
            }
            const newCal = curr.value * (1 - curr.value);
            return newCal;
        },
        0
      );
      setPercentAnswer(nilaiCf * 100);
    }

    if (newData.length > 1) {
      setAnswerK(newData2);

      const nilaiCf = newData.reduce(
        (prev: number, curr: dataQuestion, idx: number, arr: dataQuestion[]) => {
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
      setPercentAnswer(nilaiCf * 100);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="px-20 pt-4">
        <h1 className="text-2xl font-bold text-center">Sistem Pakar Dalam Kerusakan Printer</h1>
        <section>
          <div className="w-full flex flex-col">
            {q.map((item, _, dataArray) => {
              if (item.id == 'q1') {
                return (
                  <QuestionForm
                    key={item.id}
                    data={data}
                    item={item}
                    onChange={(val) => {
                      setQ((prev: any) => {
                        return prev.map((q: dataQuestion) => {
                          if (q.id == 'q1') {
                            return { ...q, answer: val };
                          }
                          return {
                            ...q,
                            answer: null,
                          };
                        });
                      });
                    }}
                  />
                );
              }
              if (
                item.id == 'q2' &&
                dataArray.find((q: dataQuestion) => String(q.id) == 'q1')
                  ?.answer == 'yes'
              ) {
                return (
                  <QuestionForm
                    key={item.id}
                    data={data}
                    item={item}
                    onChange={(val) => {
                      setQ((prev: any) => {
                        return prev.map((q: dataQuestion) => {
                          if (q.id == 'q2') {
                            return { ...q, answer: val };
                          }
                          if (q.id == 'q1') {
                            return q;
                          }
                          return {
                            ...q,
                            answer: null,
                          };
                        });
                      });
                    }}
                  />
                );
              }
              if (
                item.id == 'q3' &&
                dataArray.find((q: dataQuestion) => String(q.id) == 'q2')
                  ?.answer == 'yes'
              ) {
                return (
                  <QuestionForm
                    key={item.id}
                    data={data}
                    item={item}
                    onChange={(val) => {
                      setQ((prev: any) => {
                        return prev.map((q: dataQuestion) => {
                          if (q.id == 'q3') {
                            return { ...q, answer: val };
                          }
                          if (['q1', 'q2'].find((dq) => dq == q.id)) {
                            return q;
                          }
                          return {
                            ...q,
                            answer: null,
                          };
                        });
                      });
                    }}
                  />
                );
              }

              if (
                item.id == 'q4' &&
                dataArray.find((q: dataQuestion) => q.id == 'q1')?.answer ==
                  'no'
              ) {
                return (
                  <QuestionForm
                    key={item.id}
                    data={data}
                    item={item}
                    onChange={(val) => {
                      setQ((prev: any) => {
                        return prev.map((q: dataQuestion) => {
                          if (q.id == 'q4') {
                            return { ...q, answer: val };
                          }
                          if (q.id == 'q1') {
                            return q;
                          }
                          return {
                            ...q,
                            answer: null,
                          };
                        });
                      });
                    }}
                  />
                );
              }

              if (
                item.id == 'q5' &&
                dataArray.find((q: dataQuestion) => q.id == 'q4')?.answer ==
                  'yes'
              ) {
                return (
                  <QuestionForm
                    key={item.id}
                    data={data}
                    item={item}
                    onChange={(val) => {
                      setQ((prev: any) => {
                        return prev.map((q: dataQuestion) => {
                          if (q.id == 'q5') {
                            return { ...q, answer: val };
                          }
                          if (['q1', 'q4'].find((dq) => dq == q.id)) {
                            return q;
                          }
                          return {
                            ...q,
                            answer: null,
                          };
                        });
                      });
                    }}
                  />
                );
              }

              if (
                item.id == 'q6' &&
                dataArray.find((q: dataQuestion) => q.id == 'q5')?.answer ==
                  'yes'
              ) {
                return (
                  <QuestionForm
                    key={item.id}
                    data={data}
                    item={item}
                    onChange={(val) => {
                      setQ((prev: any) => {
                        return prev.map((q: dataQuestion) => {
                          if (q.id == 'q6') {
                            return { ...q, answer: val };
                          }
                          if (['q1', 'q4', 'q5'].find((dq) => dq == q.id)) {
                            return q;
                          }
                          return {
                            ...q,
                            answer: null,
                          };
                        });
                      });
                    }}
                  />
                );
              }

              if (
                item.id == 'q2-1' &&
                dataArray.find((q: dataQuestion) => String(q.id) == 'q4')
                  ?.answer == 'no'
              ) {
                return (
                  <QuestionForm
                    key={item.id}
                    data={data}
                    item={item}
                    onChange={(val) => {
                      setQ((prev: any) => {
                        return prev.map((q: dataQuestion) => {
                          if (q.id == 'q2-1') {
                            return { ...q, answer: val };
                          }
                          if (['q1', 'q4'].find((dq) => dq == q.id)) {
                            return q;
                          }
                          return {
                            ...q,
                            answer: null,
                          };
                        });
                      });
                    }}
                  />
                );
              }

              if (
                item.id == 'q7' &&
                dataArray.find((q: dataQuestion) => String(q.id) == 'q2-1')
                  ?.answer == 'yes'
              ) {
                return (
                  <QuestionForm
                    key={item.id}
                    data={data}
                    item={item}
                    onChange={(val) => {
                      setQ((prev: any) => {
                        return prev.map((q: dataQuestion) => {
                          if (q.id == 'q7') {
                            return { ...q, answer: val };
                          }
                          if (['q1', 'q4', 'q2-1'].find((dq) => dq == q.id)) {
                            return q;
                          }
                          return {
                            ...q,
                            answer: null,
                          };
                        });
                      });
                    }}
                  />
                );
              }

              if (
                item.id == 'q8' &&
                dataArray.find((q: dataQuestion) => String(q.id) == 'q7')
                  ?.answer == 'yes'
              ) {
                return (
                  <QuestionForm
                    key={item.id}
                    data={data}
                    item={item}
                    onChange={(val) => {
                      setQ((prev: any) => {
                        return prev.map((q: dataQuestion) => {
                          if (q.id == 'q8') {
                            return { ...q, answer: val };
                          }
                          if (
                            ['q1', 'q4', 'q2-1', 'q7'].find((dq) => dq == q.id)
                          ) {
                            return q;
                          }
                          return {
                            ...q,
                            answer: null,
                          };
                        });
                      });
                    }}
                  />
                );
              }

              if (
                item.id == 'q9' &&
                dataArray.find((q: dataQuestion) => String(q.id) == 'q2-1')
                  ?.answer == 'no'
              ) {
                return (
                  <QuestionForm
                    key={item.id}
                    data={data}
                    item={item}
                    onChange={(val) => {
                      setQ((prev: any) => {
                        return prev.map((q: dataQuestion) => {
                          if (q.id == 'q9') {
                            return { ...q, answer: val };
                          }
                          if (['q1', 'q4', 'q2-1'].find((dq) => dq == q.id)) {
                            return q;
                          }
                          return {
                            ...q,
                            answer: null,
                          };
                        });
                      });
                    }}
                  />
                );
              }

              if (
                item.id == 'q10' &&
                dataArray.find((q: dataQuestion) => String(q.id) == 'q9')
                  ?.answer == 'no'
              ) {
                return (
                  <QuestionForm
                    key={item.id}
                    data={data}
                    item={item}
                    onChange={(val) => {
                      setQ((prev: any) => {
                        return prev.map((q: dataQuestion) => {
                          if (q.id == 'q10') {
                            return { ...q, answer: val };
                          }
                          if (
                            ['q1', 'q4', 'q2-1', 'q9'].find((dq) => dq == q.id)
                          ) {
                            return q;
                          }
                          return {
                            ...q,
                            answer: null,
                          };
                        });
                      });
                    }}
                  />
                );
              }

              if (
                item.id == 'q11' &&
                dataArray.find((q: dataQuestion) => String(q.id) == 'q10')
                  ?.answer == 'no'
              ) {
                return (
                  <QuestionForm
                    key={item.id}
                    data={data}
                    item={item}
                    onChange={(val) => {
                      setQ((prev: any) => {
                        return prev.map((q: dataQuestion) => {
                          if (q.id == 'q11') {
                            return { ...q, answer: val };
                          }
                          if (
                            ['q1', 'q4', 'q2-1', 'q9', 'q10'].find(
                              (dq) => dq == q.id
                            )
                          ) {
                            return q;
                          }
                          return {
                            ...q,
                            answer: null,
                          };
                        });
                      });
                    }}
                  />
                );
              }
            })}
          </div>
          <div className="flex justify-end gap-5 mt-5">
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
          </section>
        )}
      </div>
    </main>
  );
}
