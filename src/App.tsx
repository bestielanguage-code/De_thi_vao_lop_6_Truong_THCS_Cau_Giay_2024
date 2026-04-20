import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Home,
  CheckCircle2,
  XCircle,
  Coins,
  Palette,
  Heart,
} from "lucide-react";

const App = () => {
  // Game State
  const [gameState, setGameState] = useState("home"); // home, quiz, shop, makeover
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [coins, setCoins] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [appliedStyles, setAppliedStyles] = useState({
    hair: "#4A5568",
    eyes: "#2D3748",
    lips: "#FEB2B2",
    blush: "transparent",
  });

  // Full Question Data (22 Questions)
  const questions = [
    {
      id: 1,
      q: "Choose the word whose underlined part differs in pronunciation: an<u>s</u>wer, noi<u>s</u>y, <u>s</u>tay, <u>s</u>tormy",
      options: [
        "A. an<u>s</u>wer",
        "B. noi<u>s</u>y",
        "C. <u>s</u>tay",
        "D. <u>s</u>tormy",
      ],
      answer: 1,
      explanation: "'noisy' phát âm là /z/, các từ còn lại là /s/.",
    },
    {
      id: 2,
      q: "Choose the word whose underlined part differs in pronunciation: h<u>ea</u>vy, h<u>ea</u>d, br<u>ea</u>d, t<u>ea</u>",
      options: [
        "A. h<u>ea</u>vy",
        "B. h<u>ea</u>d",
        "C. br<u>ea</u>d",
        "D. t<u>ea</u>",
      ],
      answer: 3,
      explanation: "'tea' phát âm là /i:/, các từ còn lại là /e/.",
    },
    {
      id: 3,
      q: "Choose the word which differs in the position of stress: pagoda, wonderful, Saturday, dangerous",
      options: ["A. pagoda", "B. wonderful", "C. Saturday", "D. dangerous"],
      answer: 0,
      explanation: "'pagoda' nhấn âm 2, các từ còn lại nhấn âm 1.",
    },
    {
      id: 4,
      q: "Choose the word which differs in the position of stress: city, collect, puppet, village",
      options: ["A. city", "B. collect", "C. puppet", "D. village"],
      answer: 1,
      explanation: "'collect' nhấn âm 2, các từ còn lại nhấn âm 1.",
    },
    {
      id: 5,
      q: "In the future, robots _______ us to do many things like cooking, working and studying.",
      options: ["A. help", "B. helps", "C. will help", "D. helped"],
      answer: 2,
      explanation:
        "Dùng thì tương lai đơn (will + V) cho hành động xảy ra trong tương lai.",
    },
    {
      id: 6,
      q: "_______ bus goes to the bus centre, number 6 or 16?",
      options: ["A. What", "B. Which", "C. How many", "D. When"],
      answer: 1,
      explanation:
        "Dùng 'Which' để hỏi về sự lựa chọn trong một nhóm giới hạn.",
    },
    {
      id: 7,
      q: "Her school has three floors and her classroom is _______ the second floor.",
      options: ["A. on", "B. in", "C. at", "D. by"],
      answer: 0,
      explanation: "Dùng giới từ 'on' đi với tầng của tòa nhà.",
    },
    {
      id: 8,
      q: "My orange juice is a bit sour. May I have _______ sugar, please?",
      options: ["A. a few", "B. a", "C. any", "D. some"],
      answer: 3,
      explanation: "'some' dùng trong câu đề nghị/yêu cầu lịch sự.",
    },
    {
      id: 9,
      q: "We need to _______ our shoes when going into Japanese house.",
      options: ["A. take off", "B. take on", "C. take after", "D. take over"],
      answer: 0,
      explanation: "Take off: cởi ra (giày, dép).",
    },
    {
      id: 10,
      q: "The last time Minh and his best friend _______ each other was ten months ago.",
      options: ["A. meet", "B. to meet", "C. met", "D. meeting"],
      answer: 2,
      explanation:
        "Dùng quá khứ đơn vì có trạng ngữ thời gian 'ten months ago'.",
    },
    {
      id: 11,
      q: "Lan usually practices _______ to English by watching cartoons on TV.",
      options: ["A. to listen", "B. to listening", "C. listening", "D. listen"],
      answer: 2,
      explanation: "Cấu trúc: practice + V-ing (luyện tập làm gì).",
    },
    {
      id: 12,
      q: "Football is _______ than other games in England.",
      options: [
        "A. more popular",
        "B. more popularly",
        "C. popular",
        "D. popularer",
      ],
      answer: 0,
      explanation: "So sánh hơn với tính từ dài: more + adj + than.",
    },
    {
      id: 13,
      q: "You have to throw the ball into the net when you play _______.",
      options: ["A. basketball", "B. baseball", "C. badminton", "D. tennis"],
      answer: 0,
      explanation: "Basketball (bóng rổ) yêu cầu ném bóng vào rổ (net).",
    },
    {
      id: 14,
      q: "The film I saw yesterday evening was _______.",
      options: ["A. excited", "B. exciting", "C. excitement", "D. excite"],
      answer: 1,
      explanation:
        "Dùng tính từ đuôi -ing để chỉ tính chất của sự vật/sự việc (bộ phim).",
    },
    {
      id: 15,
      q: "Identify the correction: Can you teach me how to play <u>a</u> piano?",
      options: ["A. Can", "B. me", "C. <u>a</u>", "D. Yes"],
      answer: 2,
      explanation:
        "Sửa 'a' thành 'the'. Dùng 'the' trước tên nhạc cụ khi chơi nhạc.",
    },
    {
      id: 16,
      q: "Identify the correction: We should reuse and <u>recycling</u> bottles and cans...",
      options: ["A. reuse", "B. <u>recycling</u>", "C. and", "D. reduce"],
      answer: 1,
      explanation:
        "Sửa 'recycling' thành 'recycle'. 'Should' + V-bare; hai động từ nối bởi 'and' phải cùng dạng.",
    },
    {
      id: 17,
      q: "Word CLOSEST in meaning to <u>charming</u>: Phu Quoc island is charming place...",
      options: ["A. boring", "B. attractive", "C. clever", "D. early"],
      answer: 1,
      explanation: "Charming = Attractive (quyến rũ, hấp dẫn).",
    },
    {
      id: 18,
      q: "Word CLOSEST in meaning to <u>gave up</u>: It was a difficult time, but we never gave up hope.",
      options: ["A. continued", "B. stopped", "C. had", "D. lost"],
      answer: 1,
      explanation: "Give up = Stop (ngừng, bỏ cuộc).",
    },
    {
      id: 19,
      q: "Word OPPOSITE in meaning to <u>generous</u>: It was generous of you to give me...",
      options: ["A. kind", "B. patient", "C. rich", "D. mean"],
      answer: 3,
      explanation: "Generous (hào phóng) >< Mean (keo kiệt).",
    },
    {
      id: 20,
      q: "Word OPPOSITE in meaning to <u>Luckily</u>: Luckily, we found her bag and went to school on time.",
      options: ["A. Fortunately", "B. Rarely", "C. Unluckily", "D. Unhappily"],
      answer: 2,
      explanation: "Luckily (may mắn thay) >< Unluckily (không may thay).",
    },
    {
      id: 21,
      q: "Lisa: 'What's on tonight?' - Elizabeth: '_______'",
      options: [
        "A. I'll go to the cinema.",
        "B. The film is good.",
        "C. A football match after the news.",
        "D. It's half past nine.",
      ],
      answer: 2,
      explanation: "Hỏi 'What's on' là hỏi về chương trình TV/phim đang chiếu.",
    },
    {
      id: 22,
      q: "Jimmy: 'How about going camping this weekend?' - Rosie: '_______'",
      options: [
        "A. I'm very well, thank you.",
        "B. I think you can do it.",
        "C. Go ahead and turn right.",
        "D. That's a good idea.",
      ],
      answer: 3,
      explanation: "Đây là câu đề nghị, 'That's a good idea' dùng để đồng ý.",
    },
  ];

  // Shop Items
  const shopItems = [
    {
      id: "hair-pink",
      type: "hair",
      color: "#FFB7C5",
      name: "Tóc Anh Đào",
      price: 30,
    },
    {
      id: "hair-blue",
      type: "hair",
      color: "#BEE3F8",
      name: "Tóc Sương Khói",
      price: 30,
    },
    {
      id: "hair-gold",
      type: "hair",
      color: "#FEFCBF",
      name: "Tóc Bạch Kim",
      price: 40,
    },
    {
      id: "eyes-purple",
      type: "eyes",
      color: "#B794F4",
      name: "Mắt Thạch Anh",
      price: 20,
    },
    {
      id: "eyes-gold",
      type: "eyes",
      color: "#ECC94B",
      name: "Mắt Hoàng Kim",
      price: 20,
    },
    {
      id: "eyes-green",
      type: "eyes",
      color: "#9AE6B4",
      name: "Mắt Lục Bảo",
      price: 20,
    },
    {
      id: "lips-red",
      type: "lips",
      color: "#FC8181",
      name: "Son Cam Đào",
      price: 15,
    },
    {
      id: "lips-pink",
      type: "lips",
      color: "#F687B3",
      name: "Son Hồng Sen",
      price: 15,
    },
    {
      id: "blush-soft",
      type: "blush",
      color: "rgba(255, 182, 193, 0.4)",
      name: "Phấn Hồng Nhẹ",
      price: 15,
    },
  ];

  const handleAnswer = (index) => {
    if (feedback) return;
    const isCorrect = index === questions[currentQuestionIndex].answer;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      setCoins((prev) => prev + 10);
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setGameState("shop");
    }
  };

  const prevQuestion = () => {
    setFeedback(null);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const buyItem = (item) => {
    if (coins >= item.price && !inventory.includes(item.id)) {
      setCoins((prev) => prev - item.price);
      setInventory((prev) => [...prev, item.id]);
    }
  };

  const applyStyle = (item) => {
    setAppliedStyles((prev) => ({ ...prev, [item.type]: item.color }));
  };

  // Avatar Component
  const PrinceAvatar = ({ size = "300", isHappy = false }) => (
    <div className="relative inline-block">
      {isHappy && (
        <div className="absolute -top-4 -right-4 animate-bounce">
          <Heart className="text-pink-400 fill-pink-400" size={24} />
        </div>
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={`mx-auto drop-shadow-xl transition-all duration-500 ${
          isHappy ? "scale-110" : ""
        }`}
      >
        <circle cx="100" cy="100" r="85" fill="#FFF5F7" />
        <path d="M85 150 L115 150 L110 170 L90 170 Z" fill="#FFE4E1" />
        <path
          d="M60 80 Q60 150 100 165 Q140 150 140 80 Q140 35 100 35 Q60 35 60 80"
          fill="#FFF0F0"
        />
        <circle cx="75" cy="115" r="12" fill={appliedStyles.blush} />
        <circle cx="125" cy="115" r="12" fill={appliedStyles.blush} />
        <g>
          <ellipse cx="80" cy="105" rx="10" ry="5" fill="white" />
          <circle cx="80" cy="105" r="6" fill={appliedStyles.eyes} />
          <circle cx="83" cy="103" r="2" fill="white" />
          <ellipse cx="120" cy="105" rx="10" ry="5" fill="white" />
          <circle cx="120" cy="105" r="6" fill={appliedStyles.eyes} />
          <circle cx="123" cy="103" r="2" fill="white" />
        </g>
        <path
          d="M85 140 Q100 148 115 140 Q100 144 85 140"
          fill={appliedStyles.lips}
          stroke={appliedStyles.lips}
          strokeWidth="1"
        />
        <g fill={appliedStyles.hair}>
          <path d="M60 85 Q45 55 70 35 Q100 15 130 35 Q155 55 140 85 Q148 70 138 45 Q120 28 100 40 Q80 28 62 45 Q52 70 60 85" />
          <path d="M75 42 Q100 25 125 42 L115 65 Q100 55 85 65 Z" />
        </g>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF5F7] font-sans text-slate-700 p-4 md:p-8 flex flex-col items-center">
      {/* HUD */}
      <div className="max-w-5xl w-full flex justify-between items-center bg-white/60 backdrop-blur-md p-4 rounded-3xl shadow-sm mb-6 border border-white/40">
        <div className="flex items-center gap-3 bg-yellow-100/80 px-4 py-2 rounded-2xl border border-yellow-200">
          <Coins className="text-yellow-600" size={20} />
          <span className="font-bold text-xl text-yellow-700">{coins}</span>
        </div>
        <h1 className="hidden md:block text-lg font-bold bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent uppercase tracking-tighter">
          Prince Makeover Academy
        </h1>
        <div className="flex gap-2">
          {gameState === "quiz" && (
            <button
              onClick={() => setGameState("shop")}
              className="px-4 py-2 bg-pink-100 text-pink-500 rounded-xl font-bold text-xs hover:bg-pink-200 transition-all flex items-center gap-1"
            >
              <ShoppingBag size={16} /> Vào Shop nhanh
            </button>
          )}
          <button
            onClick={() => setGameState("home")}
            className="p-2 bg-white rounded-xl hover:bg-pink-50 transition-all shadow-sm"
          >
            <Home size={20} className="text-pink-400" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center">
        {gameState === "home" && (
          <div className="text-center bg-white/80 backdrop-blur-sm p-10 rounded-[3rem] shadow-2xl border-4 border-white max-w-lg transition-all animate-in fade-in zoom-in duration-500">
            <PrinceAvatar size="220" />
            <h2 className="text-3xl font-black mt-6 mb-3 text-slate-800 tracking-tight">
              Cầu Giấy 2024 Prep
            </h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Trả lời đúng để kiếm vàng. Dùng vàng mua đồ tại Boutique để Hoàng
              tử sẵn sàng cho ngày hội trường!
            </p>
            <button
              onClick={() => setGameState("quiz")}
              className="w-full py-5 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-3xl font-black text-xl shadow-xl transition-all transform hover:-translate-y-1"
            >
              Bắt đầu hành trình
            </button>
          </div>
        )}

        {gameState === "quiz" && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Prince Side View */}
            <div className="hidden lg:flex flex-col items-center bg-white/40 backdrop-blur-sm p-8 rounded-[3rem] border border-white animate-in slide-in-from-left-8">
              <PrinceAvatar size="200" isHappy={feedback === "correct"} />
              <div className="mt-6 text-center space-y-2">
                <p className="text-sm font-bold text-pink-400 uppercase tracking-widest">
                  Đang cổ vũ bạn!
                </p>
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Sparkles key={i} size={14} className="text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Quiz Box */}
            <div className="lg:col-span-2 w-full bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl border border-pink-50 relative overflow-hidden animate-in slide-in-from-bottom-8">
              <div className="absolute top-0 left-0 h-2 bg-pink-50 w-full">
                <div
                  className="h-full bg-pink-400 transition-all duration-700 ease-out"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) / questions.length) * 100
                    }%`,
                  }}
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="px-4 py-1.5 bg-pink-50 text-pink-500 rounded-full font-bold text-xs uppercase tracking-widest">
                  Câu {currentQuestionIndex + 1} / {questions.length}
                </span>
                <div className="lg:hidden">
                  <PrinceAvatar size="60" isHappy={feedback === "correct"} />
                </div>
              </div>

              <h3
                className="text-2xl font-bold mb-8 leading-snug text-slate-800"
                dangerouslySetInnerHTML={{
                  __html: questions[currentQuestionIndex].q,
                }}
              />

              <div className="space-y-3 mb-8">
                {questions[currentQuestionIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={feedback !== null}
                    className={`w-full text-left p-5 rounded-3xl border-2 transition-all font-semibold text-lg ${
                      feedback === null
                        ? "border-slate-100 hover:border-pink-300 hover:bg-pink-50/30"
                        : i === questions[currentQuestionIndex].answer
                        ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                        : feedback === "wrong"
                        ? "border-red-50 opacity-40"
                        : "border-slate-50 opacity-40"
                    }`}
                    dangerouslySetInnerHTML={{ __html: opt }}
                  />
                ))}
              </div>

              {feedback && (
                <div
                  className={`p-5 rounded-3xl mb-6 flex items-start gap-4 animate-in fade-in duration-300 ${
                    feedback === "correct" ? "bg-emerald-50" : "bg-rose-50"
                  }`}
                >
                  <div
                    className={`p-2 rounded-2xl ${
                      feedback === "correct"
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {feedback === "correct" ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <XCircle size={24} />
                    )}
                  </div>
                  <div>
                    <p
                      className={`font-black text-lg ${
                        feedback === "correct"
                          ? "text-emerald-700"
                          : "text-rose-700"
                      }`}
                    >
                      {feedback === "correct"
                        ? "Đúng rồi! +10 Vàng"
                        : "Ôi, sai mất rồi!"}
                    </p>
                    <p className="text-sm text-slate-500 font-medium">
                      {questions[currentQuestionIndex].explanation}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 font-bold text-slate-400 hover:text-pink-400 disabled:opacity-0 transition-all"
                >
                  <ArrowLeft size={20} /> Quay lại
                </button>
                <button
                  onClick={nextQuestion}
                  className="flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg hover:bg-slate-800 transition-all active:scale-95"
                >
                  {currentQuestionIndex === questions.length - 1
                    ? "Vào Shop"
                    : "Tiếp theo"}{" "}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shop and Makeover screens remain consistent with the theme */}
        {gameState === "shop" && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-pink-50 animate-in slide-in-from-left-8">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3 text-pink-500 italic">
                <ShoppingBag /> Boutique
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {shopItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-slate-50/50 p-4 rounded-3xl border border-white hover:bg-white transition-all"
                  >
                    <div
                      className="w-full h-10 rounded-xl mb-3 shadow-inner border border-white"
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="font-bold text-xs mb-1 text-slate-600 truncate">
                      {item.name}
                    </p>
                    <p className="text-yellow-600 font-black text-sm flex items-center justify-center gap-1 mb-3">
                      <Coins size={14} /> {item.price}
                    </p>
                    <button
                      disabled={
                        inventory.includes(item.id) || coins < item.price
                      }
                      onClick={() => buyItem(item)}
                      className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${
                        inventory.includes(item.id)
                          ? "bg-emerald-100 text-emerald-600"
                          : coins >= item.price
                          ? "bg-slate-900 text-white"
                          : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {inventory.includes(item.id) ? "Đã sở hữu" : "Mua"}
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setGameState("makeover")}
                className="w-full mt-10 py-5 bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-3xl font-black text-xl shadow-lg transition-all hover:scale-105"
              >
                Tới Studio Trang Điểm
              </button>
            </div>
            <div className="hidden lg:flex flex-col items-center justify-center bg-white/40 backdrop-blur rounded-[3rem] p-10 border border-white h-full min-h-[500px]">
              <PrinceAvatar size="320" />
            </div>
          </div>
        )}

        {gameState === "makeover" && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center p-4">
              <PrinceAvatar size="380" />
            </div>
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-pink-50 animate-in slide-in-from-right-8">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3 text-indigo-500 italic">
                <Palette /> Stylist Studio
              </h2>
              <div className="space-y-8">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {shopItems
                    .filter((item) => inventory.includes(item.id))
                    .map((item) => (
                      <button
                        key={item.id}
                        onClick={() => applyStyle(item)}
                        className="p-3 border-2 border-slate-50 hover:border-pink-300 rounded-3xl transition-all flex flex-col items-center gap-2 bg-white"
                      >
                        <div
                          className="w-10 h-10 rounded-full shadow-inner border border-slate-50"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-[10px] font-bold text-slate-400 truncate w-full text-center">
                          {item.name}
                        </span>
                      </button>
                    ))}
                </div>
                <div className="pt-8 border-t border-slate-50 space-y-4">
                  <button
                    onClick={() =>
                      setAppliedStyles({
                        hair: "#4A5568",
                        eyes: "#2D3748",
                        lips: "#FEB2B2",
                        blush: "transparent",
                      })
                    }
                    className="w-full py-4 text-slate-400 font-bold border-2 border-slate-50 rounded-2xl hover:bg-slate-50 transition-all"
                  >
                    Xóa trang điểm
                  </button>
                  <button
                    onClick={() => {
                      alert("Hoàng tử trông thật tuyệt! Chúc các bạn thi tốt!");
                      setGameState("home");
                    }}
                    className="w-full py-5 bg-gradient-to-r from-pink-400 to-indigo-400 text-white rounded-3xl font-black text-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                  >
                    <Sparkles /> Hoàn tất Look
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-8 text-[10px] text-slate-300 font-bold uppercase tracking-widest text-center">
        Created for Online English Teachers & Content Creators
      </footer>
    </div>
  );
};

export default App;
