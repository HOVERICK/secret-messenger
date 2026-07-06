import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Send, User, Battery, Signal, Wifi, Heart, Sparkles, Plus, MoreVertical, Phone } from 'lucide-react';

const chatData = [
  {
    id: 1,
    name: "SHH",
    subtitle: "조직 지령망",
    profile: null,
    statusMsg: "Encrypted Channel",
    theme: {
      bg: "bg-gradient-to-br from-red-950/40 to-black",
      border: "border-red-900/30",
      text: "text-red-500",
      glow: "shadow-[0_0_15px_rgba(220,38,38,0.2)]"
    },
    unread: 1,
    messages: [
      { sender: 'other', text: "201호 위장 입주를 확인했다. 타겟(301호)과의 물리적 거리 및 심리적 경계 상태를 보고해라.", date: "..." },
      { sender: 'me', text: "경계심이 강하지만 외로움도 큽니다. 라포(친밀감) 형성을 위해 의도적으로 접근 중입니다." },
      { sender: 'other', text: "보고 받은 타겟의 동선이 이상하다. 최근 네가 301호에서 밤을 보내는 횟수가 잦아지고 있다.", date: "..." },
      { sender: 'me', text: "정보 탈취를 위해 타겟의 침실 안쪽까지 진입해야 할 필요가 있었습니다. 철저한 위장 전술의 일환입니다." },
      { sender: 'other', text: "우리는 네 심장이 아니라 타겟의 데이터만 필요하다. 임무에 불필요한 사적 감정을 섞지 마라.", date: "..." },
      { sender: 'other', text: "경고한다. 사냥개가 먹잇감과 사랑에 빠지면, 조직은 둘 다 사살한다." },
      { sender: 'me', text: "감정 같은 건 없습니다. 계획대로 진행 중입니다." },
      { sender: 'other', text: "바깥의 통제가 언제 무너질지 모른다. 오늘 밤 자정까지 모든 걸 끝내라. 기한을 넘길 시, 201호 주변의 모든 생존자는 룰에 따라 즉각 폐기한다.", date: "..." },
    ]
  },
  {
    id: 2,
    name: "Y",
    subtitle: "윤세린",
    profile: "Y",
    statusMsg: "VVIP",
    theme: {
      bg: "bg-gradient-to-br from-purple-900/40 to-black",
      border: "border-purple-800/30",
      text: "text-purple-400",
      glow: "shadow-[0_0_15px_rgba(147,51,234,0.2)]"
    },
    unread: 0,
    messages: [
      { sender: 'other', text: "강혁 씨, 짐 정리는 다 끝났나요? 필요한 게 있으면 언제든 말해요. 생활용품이든, 뭐 다른 '사적인' 것이든. 내가 다 채워줄 수 있으니까.", date: "..." },
      { sender: 'me', text: "제공해주신 숙소면 충분합니다." },
      { sender: 'other', text: "타겟과는 많이 가까워진 모양이네요. 복도에서 두 사람 분위기가 꽤 묘하던데. 강혁 씨는 임무를 줄 때마다 너무 완벽하게 몰입해서 탈이라니까.", date: "..." },
      { sender: 'other', text: "이 일 끝나고 나면, 우리 둘이서 꽤 괜찮은 파트너가 될 수 있을 것 같지 않아요? 내가 가진 자본과 강혁 씨의 능력이라면, 굳이 그 조직 밑에 있을 필요 없잖아요." },
      { sender: 'me', text: "제 계약은 조직과 되어 있습니다. 일이 끝나면 잔금만 정확히 정산해 주시면 됩니다." },
      { sender: 'other', text: "강혁 씨는 참... 사람 무안하게 만드는 데 재주가 있어. 그 차가운 매력 때문에 내가 강혁 씨를 지명한 거지만.", date: "..." },
      { sender: 'other', text: "오늘 밤엔 301호 말고 202호로 와요. 남편은 늦게까지 서재에서 안 나오니까. 와서 나랑 와인 한잔하면서 '일 얘기' 좀 깊게 하죠." },
      { sender: 'me', text: "업무 관련 지시 사항은 지금처럼 암호화된 메시지로만 받겠습니다. 사적인 만남은 가지지 않습니다." },
      { sender: 'other', text: "...그래요. 그렇게 선을 긋겠다니 어쩔 수 없지. 당신의 그 철벽이 언제까지 갈지 기대해 볼게요.", date: "..." },
      { sender: 'other', text: "오늘 밤이 D-Day입니다. 이따 밤에 201호로 내가 가겠습니다. 문 열어둬요." }
    ]
  },
  {
    id: 3,
    name: "연정",
    subtitle: "김연정",
    profile: <Heart size={20} className="text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" fill="currentColor" />,
    statusMsg: "나의 유일한 안식처",
    theme: {
      bg: "bg-gradient-to-br from-rose-950/40 to-black",
      border: "border-rose-900/30",
      text: "text-rose-400",
      glow: "shadow-[0_0_15px_rgba(225,29,72,0.2)]"
    },
    unread: 0,
    messages: [
      { sender: 'other', text: "자요...? 침대가 너무 넓고 차가워. 당신 체온이 없으니까 또 수면제가 안 듣네...", date: "..." },
      { sender: 'me', text: "아직 안 자요. 넘어갈까요." },
      { sender: 'other', text: "베란다 창문 안 잠갔어요. 빨리 와서 나 좀 안아줘. 당신 심장 소리 들으면서 자고 싶어." },
      { sender: 'other', text: "당신이 베고 잔 베개에서 아직도 강혁 씨 냄새가 나요. 당신이 내 목덜미에 숨 쉴 때마다, 내가 여기서 짓고 있는 끔찍한 죄들을 다 잊게 돼.", date: "..." },
      { sender: 'me', text: "다음엔 내 셔츠 하나 놔두고 올게요. 아침은 먹었어요? 또 빈속에 차가운 커피 마시는 건 아니죠." },
      { sender: 'other', text: "난 당신만 있으면 돼. 어젯밤에 당신이 내 맨살을 쓸어내려 줄 때... 진짜 이대로 세상이 멈췄으면 좋겠다고 생각했어." },
      { sender: 'me', text: "무리하지 마요. 당신 몸이 부서질 것 같아서, 안고 있으면서도 겁이 나." },
      { sender: 'other', text: "강혁 씨... 나 진짜 다 버리고 당신이랑 도망치고 싶어. 이 미친 빌라도, 끔찍한 실험도 다 역겨워. 그냥 당신 품에 숨어서 평생 나오지 않고 싶어. 나 데려가 줄 거죠?", date: "..." },
      { sender: 'me', text: "데려가요. 무조건. 비행기 표 2장, 이미 내 서랍에 준비해 뒀어." },
      { sender: 'me', text: "오늘 밤에 다 끝날 겁니다. 조금만 기다려요. 당신 방 문 열고 들어갈 테니까, 나만 믿어요." }
    ]
  },
  {
    id: 4,
    name: "302호 주희",
    subtitle: "모주희",
    profile: <Sparkles size={20} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />,
    statusMsg: "어른이 되고 싶어 🍀",
    theme: {
      bg: "bg-gradient-to-br from-emerald-950/30 to-black",
      border: "border-emerald-900/30",
      text: "text-emerald-400",
      glow: "shadow-[0_0_15px_rgba(5,150,105,0.2)]"
    },
    unread: 0,
    messages: [
      { sender: 'other', text: "아저씨! 어제 주신 따뜻한 보리차 덕분에 속이 많이 진정됐어요! 저 쓰러졌을 때 입에 거품 물고 있어서 엄청 못생겼었죠 ㅠㅠ 아 창피해...", date: "..." },
      { sender: 'me', text: "창피할 게 어딨어. 아픈 건 죄가 아니야. 심심할 때 읽으라고 문 앞에 10대 소녀용 소설책 하나 뒀어." },
      { sender: 'other', text: "헉 감사합니다!! 근데 저 이제 10대 소녀용 안 읽고 좀 어른스러운 거 읽고 싶은데..." },
      { sender: 'other', text: "아저씨! 궁금한 거 있어요! 아저씨는 어떤 여자 좋아해요? 막 성숙하고 화장 진하게 한 어른 여자 좋아해요? 아니면... 나중에 크면 엄청 예뻐질 것 같은 풋풋한 사람?", date: "..." },
      { sender: 'me', text: "나는 밤에 안 돌아다니고 일찍 자는 착한 어린이 좋아해." },
      { sender: 'other', text: "아 진짜! 자꾸 저 애기 취급하지 마요! 저도 화장하면 엄청 어른 같단 말이에요! 조금만 기다려 봐요. 제가 301호 언니보다 훨씬 예뻐질 거니까!" },
      { sender: 'me', text: "그래, 나중에 어른 되면 더 예뻐지겠지. 책 다 읽으면 꼭 자." },
      { sender: 'other', text: "어제 새벽에... 아저씨가 301호 언니 방으로 들어가는 거 봤어요. 두 사람 무슨 사이예요?", date: "..." },
      { sender: 'other', text: "언니가 예쁘긴 한데 눈빛이 너무 차가워요. 제가 아저씨한테 훨씬 더 따뜻하게 해줄 수 있는데... 저 진짜 아저씨 위해서라면 뭐든 다 할 수 있어요. 진짜로요." },
      { sender: 'me', text: "주희야. 어른들한텐 복잡한 일들이 있어. 밤늦게 복도 내다보지 말고 푹 자렴. 이건 약속해." }
    ]
  }
];

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="h-full flex flex-col bg-[#050505] text-white">
      {/* 럭셔리한 헤더 */}
      <div className="px-6 pt-[55px] pb-4 bg-[#050505]/80 backdrop-blur-md z-10 border-b border-white/5 sticky top-0">
        <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Messages
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-10 px-2 pt-2">
        {chats.map((chat, idx) => {
          const lastMsg = chat.messages[chat.messages.length - 1];
          return (
            <div 
              key={chat.id} 
              onClick={() => onSelectChat(chat)}
              className="flex items-center px-4 py-4 mx-2 my-1.5 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] cursor-pointer transition-all duration-300 group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* 프로필 아바타 */}
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${chat.theme.bg} ${chat.theme.border} border ${chat.theme.glow} transition-transform duration-300 group-hover:scale-105`}>
                <span className={`font-semibold ${chat.theme.text}`}>
                  {chat.profile || <User size={22} className="opacity-80" />}
                </span>
              </div>
              
              {/* 리스트 텍스트 */}
              <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h2 className="text-[16px] font-medium tracking-wide text-gray-100">{chat.name}</h2>
                  {chat.unread > 0 && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400/80 font-light truncate pr-4">{lastMsg.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ChatRoom = ({ chat, onBack }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div className="h-full flex flex-col bg-[#050505] text-white relative">
      {/* 대화방 헤더 (글래스모피즘) */}
      <div className="flex items-center justify-between px-2 pt-[50px] pb-3 bg-[#0a0a0a]/70 backdrop-blur-xl z-10 border-b border-white/5">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft size={26} strokeWidth={1.5} />
          </button>
          <div className="flex items-center ml-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${chat.theme.bg} border ${chat.theme.border} ${chat.theme.glow}`}>
              <span className={`${chat.theme.text}`}>{chat.profile || <User size={16} />}</span>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <h2 className="text-[15px] font-medium tracking-wide text-gray-100">{chat.name}</h2>
              <p className={`text-[11px] font-light ${chat.theme.text} opacity-80 mt-0.5 tracking-wider uppercase`}>{chat.statusMsg}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center pr-3 gap-3 text-gray-400">
          <Phone size={20} strokeWidth={1.5} />
          <MoreVertical size={20} strokeWidth={1.5} />
        </div>
      </div>

      {/* 대화 내역 영역 */}
      <div className="flex-1 overflow-y-auto hide-scrollbar p-5 flex flex-col gap-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-fixed">
        {chat.messages.map((msg, idx) => {
          const isMe = msg.sender === 'me';
          const isSystem = !isMe && chat.name === 'SHH';

          return (
            <React.Fragment key={idx}>
              {/* 날짜 대신 들어가는 시간 경과 연출 (점선) */}
              {msg.date === "..." && (
                <div className="flex items-center justify-center my-4 gap-3 opacity-0 animate-fade-in" style={{animationDelay: `${idx * 0.05}s`, animationFillMode: 'forwards'}}>
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1"></div>
                  <span className="text-white/20 tracking-[0.3em] text-[10px] uppercase font-light">•••</span>
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1"></div>
                </div>
              )}
              
              <div 
                className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-2 opacity-0 animate-slide-up`} 
                style={{animationDelay: `${idx * 0.04}s`, animationFillMode: 'forwards'}}
              >
                <div 
                  className={`max-w-[78%] rounded-2xl px-4 py-3 text-[14.5px] leading-relaxed font-light tracking-wide
                    ${isMe 
                      ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 rounded-br-sm border border-white/5 shadow-lg' 
                      : `bg-gradient-to-br from-[#121212] to-[#0a0a0a] text-gray-200 rounded-bl-sm border ${chat.theme.border} shadow-lg`
                    }
                    ${isSystem ? 'font-mono text-red-400/90 border-red-900/30 bg-gradient-to-br from-red-950/20 to-black shadow-[0_0_15px_rgba(220,38,38,0.05)]' : ''} 
                  `}
                >
                  {msg.text}
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* 입력창 (럭셔리 폼) */}
      <div className="px-4 py-3 bg-[#050505]/90 backdrop-blur-lg border-t border-white/5 flex items-center gap-3 pb-[34px]">
        <button className="text-gray-500 hover:text-gray-300 transition-colors p-2 rounded-full">
          <Plus size={22} strokeWidth={1.5} />
        </button>
        <div className="flex-1 bg-white/5 rounded-full px-5 py-2.5 text-sm text-gray-500 border border-white/5 font-light tracking-wide shadow-inner">
          iMessage...
        </div>
        <button className="bg-white/10 text-white p-2.5 rounded-full border border-white/10 hover:bg-white/20 transition-colors">
          <Send size={18} className="ml-0.5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

const PhoneMockup = () => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="relative w-full max-w-[380px] h-[812px] max-h-[95vh] sm:rounded-[3rem] sm:border-[10px] sm:border-[#1a1a1a] sm:shadow-[0_0_60px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(255,255,255,0.1)] overflow-hidden bg-black flex flex-col mx-auto ring-1 ring-white/10">
      
      {/* 상태바 */}
      <div className="absolute top-0 w-full h-[50px] flex justify-end items-center px-7 z-50 text-white text-[12px] font-medium pointer-events-none">
        <div className="flex items-center gap-2 opacity-80">
          <Signal size={14} className="fill-current" strokeWidth={2} />
          <Wifi size={14} strokeWidth={2} />
          <Battery size={16} strokeWidth={2} />
        </div>
      </div>

      {/* 다이나믹 아일랜드 (노치) */}
      <div className="hidden sm:block absolute top-2 left-1/2 -translate-x-1/2 w-[110px] h-[32px] bg-black rounded-full z-50 shadow-[inset_0_0_4px_rgba(255,255,255,0.1)] border border-white/5"></div>

      {/* 화면 렌더링 */}
      <div className="w-full h-full bg-[#050505] flex flex-col relative z-0">
        {activeChat ? (
          <ChatRoom chat={activeChat} onBack={() => setActiveChat(null)} />
        ) : (
          <ChatList chats={chatData} onSelectChat={setActiveChat} />
        )}
      </div>
      
      {/* 하단 홈바 */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-[4px] bg-white/30 rounded-full z-50 pointer-events-none"></div>
    </div>
  );
};

export default function App() {
  return (
    <>
      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-slide-up {
            animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black font-sans flex items-center justify-center p-0 sm:p-4 selection:bg-white/20 text-gray-100">
        <PhoneMockup />
      </div>
    </>
  );
}