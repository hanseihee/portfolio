export type Locale = "ko" | "en";

export interface Translation {
  nav: {
    projects: string;
    about: string;
    contact: string;
  };
  hero: {
    available: string;
    greeting: string;
    name: string;
    intro: string;
    description: string;
    viewProjects: string;
    getInTouch: string;
  };
  projects: {
    title: string;
    featured: string;
    work: string;
    experience: string;
    featuredItems: Array<{
      name: string;
      metric: string;
      description: string;
      tags: string[];
      link?: string;
    }>;
    workItems: Array<{
      name: string;
      company: string;
      period: string;
      description: string;
      tags: string[];
      link?: string;
    }>;
  };
  about: {
    title: string;
    description: string[];
    skillsTitle: string;
    skills: {
      mobile: string;
      web: string;
      desktop: string;
      backend: string;
      analytics: string;
      tools: string;
    };
  };
  contact: {
    title: string;
    description: string;
  };
  footer: {
    rights: string;
    builtWith: string;
  };
}

export const translations: Record<Locale, Translation> = {
  ko: {
    nav: {
      projects: "프로젝트",
      about: "소개",
      contact: "연락처",
    },
    hero: {
      available: "Open to opportunities",
      greeting: "",
      name: "Sei Hee Han",
      intro: "Product Manager · Ex-Developer",
      description:
        "개발 9년 + PM 8년. 500만+ MAU 서비스 3건, 시장 1위 달성.",
      viewProjects: "프로젝트 보기",
      getInTouch: "연락하기",
    },
    projects: {
      title: "프로젝트",
      featured: "개인 프로젝트",
      work: "주요 업무 프로젝트",
      experience: "경력 16년",
      featuredItems: [
        {
          name: "김프가 (KIMPGA)",
          metric: "MAU 400만 · 트래픽 1위 · 2022 매각",
          description: "• 김치프리미엄 관련 사이트 트래픽 1위\n• 국내외 거래소간 차액 실시간 시각화\n• 빗썸/업비트/코인원 vs 해외 거래소 가격 비교\n• 실시간 채팅, 통계/지표, 시장분석, 뉴스\n• 2021년 MAU 400만 달성\n• 2022년 매각",
          tags: ["Crypto", "트래픽 1위", "Exit"],
          link: "https://kimpga.com",
        },
        {
          name: "F1-boxbox.com",
          metric: "한국 최대 F1 사이트",
          description: "• F1 데이터 기반 뉴스 및 분석 웹사이트\n• F1 관련 데이터 수집/분석 및 시각화\n• SEO 최적화로 검색엔진 노출 극대화\n• 모바일/데스크톱 UX/UI 최적화\n• 다국어(한국어/영어) 지원\n• 검색 유입 트래픽 지속 증가",
          tags: ["Sports", "F1", "SEO"],
          link: "https://f1-boxbox.com",
        },
        {
          name: "꾸쥬워마이걸",
          metric: "구글플레이 1위 · 앱스토어 2위",
          description: "• 구글플레이 무료 전체 1위, 앱스토어 무료 전체 2위 달성\n• 사진 합성 밈 생성 앱 (1인 개발)\n• 산다라박 등 연예인 사용으로 SNS 바이럴\n• 400만 다운로드 기록",
          tags: ["iOS/Android", "플레이스토어 1위", "1인 개발"],
        },
        {
          name: "픽미주 (PICKMIJU)",
          metric: "미국주식 · 실시간 시세 · 경제캘린더",
          description: "• 미국 주식 실시간 시세 플랫폼\n• 나스닥 뉴스, 경제 캘린더 한국어 제공\n• 프리/애프터마켓 시세\n• 포트폴리오 관리, 실적 캘린더\n• 시가총액 순위, 공포·탐욕 지수, IPO 정보\n• Next.js + TypeScript + Tailwind CSS",
          tags: ["Finance", "Next.js", "실시간 시세"],
          link: "https://www.pickmiju.com/stocks",
        },
        {
          name: "오구오구",
          metric: "서버시간 · 티켓팅 · 밀리초 정확도",
          description: "• 티켓팅/수강신청용 정확한 서버시간 앱\n• 밀리초 단위 시간 표시\n• 오차 보정으로 정확한 시간 제공\n• 다이나믹 아일랜드/잠금화면 위젯\n• PIP 모드 지원\n• App Store 평점 4.5",
          tags: ["iOS", "Swift", "티켓팅"],
          link: "https://apps.apple.com/kr/app/id6499110329",
        },
      ],
      workItems: [
        {
          name: "해외송금 앱 & AI 자동화",
          company: "글로벌머니익스프레스",
          period: "2025 - 현재",
          description: "• 해외송금 모바일팀 운영\n• 대출서비스 신규 기획\n• 해외 송금 시스템 고도화 프로젝트 관리\n• 개발팀 및 외부 협력사 커뮤니케이션 (일정/품질/비용 조율)\n• AI 기반 번역 자동화 Tool 개발\n• JIRA Tasks 관리 Tool 개발로 업무 효율화",
          tags: ["Fintech", "AI Automation", "현재"],
          link: "https://apps.apple.com/us/app/gme-remit/id1439161261",
        },
        {
          name: "Esports.op.gg",
          company: "OP.GG",
          period: "2020 - 2025",
          description: "• 리그오브레전드 e스포츠 데이터 플랫폼\n• 초기 아이디어 제안 → 기획/개발관리/마케팅/운영 전반 리드\n• iOS/Android/Web 서비스 운영\n• 경기일정, 선수정보, 경기결과 데이터 시각화\n• UX/UI 설계 및 프로토타이핑\n• 성과: 체류시간 20%↑, CTR 15%↑\n• 연간 사용자 0명→500만명 성장, MAU 315만",
          tags: ["0→500만", "CTR 15%↑", "PO 팀장"],
          link: "https://esports.op.gg/",
        },
        {
          name: "Duo.op.gg",
          company: "OP.GG",
          period: "2021 - 2024",
          description: "• 리그오브레전드 듀오 매칭 플랫폼\n• 아이디어 제안 → 기획/개발관리/마케팅 전 과정 리드\n• 사용자 페인포인트 분석 및 솔루션 제안\n• 매칭 알고리즘 기획 및 개선\n• 마케팅 전략 수립 및 실행\n• 성과: 누적 사용자 218만, 매칭 성공률 35%↑, 재방문율 25%↑",
          tags: ["MAU 218만", "매칭 35%↑", "재방문 25%↑"],
          link: "https://duo.op.gg/ko/lol/?region=kr",
        },
        {
          name: "Pal.op.gg",
          company: "OP.GG",
          period: "2024",
          description: "• 펠월드 인게임 오버레이 확장프로그램\n• 아이디어 제안 → 기획/개발관리/배포 전 과정 리드\n• 미니맵 및 맵정보 실시간 표시 기능 기획\n• 게임 트렌드에 맞춘 빠른 마케팅 실행\n• 성과: 8만 사용자 확보",
          tags: ["Gaming", "Extension", "8만 사용자"],
          link: "https://pal.op.gg/ko",
        },
        {
          name: "QWER.GG → OP.GG 매각",
          company: "라우드커뮤니케이션즈",
          period: "2020 - 2021",
          description: "• 개인 프로젝트로 시작 → 라우드커뮤니케이션즈 인수\n• e스포츠 데이터 기반 정보제공 사이트\n• 초기 기획부터 마케팅 진행\n• 프로구단과 데이터 기반 협업\n• 게이밍 기어 회사들과 영업 및 마케팅\n• 성과: 월 사용자 10만 달성 후 OP.GG에 팀&제품 매각",
          tags: ["Startup", "Exit", "OP.GG 매각"],
        },
        {
          name: "GOPAX 암호화폐 거래소",
          company: "스트리미",
          period: "2017 - 2019",
          description: "• 암호화폐 거래소 iOS/Android/Web A to Z 기획\n• Apple Watch App 기획\n• 인도네시아 런칭 및 운영\n• ISMS 국제표준 인증 관리\n• GA 및 자체 분석툴로 사용자 이탈구간/클릭패턴 분석\n• A/B 테스트로 UX 최적화\n• 바이럴 마케팅 (추천 이벤트/SNS/인플루언서)\n• 성과: 신규 30%↑, 재방문 20%↑, 하루 거래량 최대 500억, 회원수 30만",
          tags: ["500억 거래량", "신규 30%↑", "ISMS"],
          link: "https://www.gopax.co.kr/",
        },
        {
          name: "번개장터 iOS",
          company: "번개장터",
          period: "2017",
          description: "• 중고거래 플랫폼 iOS 네이티브 개발 (Objective-C)\n• 번개톡 (실시간 채팅) 개발\n• SNS 회원가입 인증 모듈 개발\n• 메인/상품상세/물품등록 페이지 리뉴얼\n• UI/UX 최적화로 사용자 유지율 상승\n• 채팅 안정화 및 응답속도 개선\n• 규모: MAU 420만, 회원수 1300만 서비스",
          tags: ["MAU 420만", "채팅 개발", "UX 최적화"],
          link: "https://apps.apple.com/kr/app/%EB%B2%88%EA%B0%9C%EC%9E%A5%ED%84%B0/id395672275",
        },
        {
          name: "빨대 - 쇼핑몰 관리 앱",
          company: "죠셉데일컴퍼니",
          period: "2015 - 2017",
          description: "• 국내 최초 쇼핑몰 관리 앱 개발\n• Xamarin 이용 iOS/Android 크로스 플랫폼 개발\n• 메인페이지, 배송관리 페이지 구현\n• 판매자 편의성 중심 UX 설계",
          tags: ["국내 최초", "Xamarin", "Cross-platform"],
        },
        {
          name: "소셜 쇼핑플랫폼",
          company: "피키캐스트",
          period: "2015",
          description: "• 인플루언서 기반 iOS 소셜 쇼핑플랫폼\n• 1인 개발 A to Z (Objective-C)\n• 회원가입, 메인페이지, 사진등록, 검색, 좋아요 등 전체 기능 구현",
          tags: ["1인 개발", "A to Z", "Social Commerce"],
        },
        {
          name: "KBS 스토리지 시스템",
          company: "맑은기술",
          period: "2014 - 2015",
          description: "• OS X용 KBS Live 스토리지 어플리케이션 개발 (Objective-C)\n• 실시간 데이터 백업 및 복구 시스템 구축\n• 파일 탐색 UI 개발\n• 백업 시스템 안정성 향상\n• UI 개선으로 사용 편의성 증대\n• KBS 상용화 성공",
          tags: ["KBS 상용화", "macOS", "방송시스템"],
          link: "https://www.malgn.com/",
        },
        {
          name: "히어로즈 오브 엠파이어",
          company: "엔타즈",
          period: "2012 - 2014",
          description: "• 모바일 전략 시뮬레이션 게임 개발 (Cocos2d-x)\n• Tilemap 기반 지도 UI 및 알고리즘 구현\n• 전투 UI 개발\n• 소켓 프로그래밍으로 실시간 멀티플레이 구현\n• 국내 통신3사(SKT, KT, LGU+) 동시 오픈",
          tags: ["통신3사 오픈", "Cocos2d-x", "실시간 멀티플레이"],
        },
        {
          name: "Microsoft Surface 광고 플랫폼",
          company: "디스트릭트홀딩스",
          period: "2009 - 2011",
          description: "• 세계 최초 멀티터치 테이블 기반 광고 플랫폼 개발 (C# WPF)\n• Surface 기반 인터랙티브 어플리케이션\n• 글로벌 이벤트 성공적 운영:\n  - 삼성전자 2010 CES 라스베가스\n  - 삼성전자 2010 밴쿠버 올림픽\n  - 현대차 2011 상해/제네바 모터쇼\n  - 이상봉 2011 뉴욕 패션위크",
          tags: ["세계 최초", "삼성/현대", "글로벌 이벤트"],
          link: "https://www.youtube.com/watch?v=j-p4S4nUMuo",
        },
        {
          name: "B2B 메신저",
          company: "넥서스커뮤니티",
          period: "2008 - 2009",
          description: "• 고객센터용 B2B 사내 메신저 개발 (C#)\n• 실시간 채팅, 파일전송, 화면공유 기능 구현\n• 인바운드 모니터링 기능 구현\n• 대기업 상용화: 우리은행, 인터파크 등",
          tags: ["B2B 상용화", "우리은행", "인터파크"],
        },
      ],
    },
    about: {
      title: "소개",
      description: [
        "개발 9년 + PM 8년, 총 17년 경력의 개발자 출신 PO/PM입니다. 500만+ MAU 서비스 3건을 직접 기획·운영하며 시장 1위 달성 경험을 보유하고 있습니다.",
        "개발 프로세스에 대한 깊은 이해를 바탕으로 개발자들과 원활하게 소통하고, 기술적 요구사항을 비개발자와도 효과적으로 연결합니다. 개발자 관점에서 작업 분량과 난이도를 현실적으로 평가하고, 실제 개발 환경에 맞춘 일정 계획을 수립합니다.",
        "기술-비즈니스-조직 리딩 역량을 바탕으로 신규 서비스 런칭 및 성장에 탁월한 성과를 창출했습니다. 개발자들에게 기술적 신뢰를 주는 PM으로 인정받으며 높은 협업 효율을 달성합니다.",
        "최근에는 AI 기술에 깊은 관심을 갖고, Claude Code와 Codex 등을 활용한 업무 자동화 및 AI 기반 서비스 기획에 집중하고 있습니다.",
      ],
      skillsTitle: "Expertise",
      skills: {
        mobile: "Mobile",
        web: "Web",
        desktop: "Desktop & Game",
        backend: "Backend & Infra",
        analytics: "Analytics",
        tools: "Tools & AI",
      },
    },
    contact: {
      title: "함께 일해요",
      description:
        "새로운 프로젝트와 기회에 항상 관심이 있습니다.\n질문이 있거나 인사를 나누고 싶다면 편하게 연락주세요.",
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Next.js & Tailwind CSS로 제작",
    },
  },
  en: {
    nav: {
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    hero: {
      available: "Open to opportunities",
      greeting: "",
      name: "Sei Hee Han",
      intro: "Product Manager · Ex-Developer",
      description:
        "9 yrs Dev + 8 yrs PM. 3 services with 5M+ MAU. #1 market position.",
      viewProjects: "View Projects",
      getInTouch: "Get in Touch",
    },
    projects: {
      title: "Projects",
      featured: "Personal Projects",
      work: "Work Projects",
      experience: "16 Years Experience",
      featuredItems: [
        {
          name: "Kimpga",
          metric: "4M MAU · Sold 2022",
          description: "• #1 Crypto Kimchi Premium site\n• Real-time price comparison across exchanges\n• Bithumb/Upbit/Coinone vs global exchanges\n• Chat, statistics, market analysis, news\n• 4M MAU achieved in 2021\n• Sold in 2022",
          tags: ["Crypto", "#1 Traffic", "Exit"],
          link: "https://kimpga.com",
        },
        {
          name: "F1-boxbox.com",
          metric: "Largest F1 Site in Korea",
          description: "• F1 data-driven news & analysis website\n• F1 data collection, analysis & visualization\n• SEO optimization for search visibility\n• Mobile/Desktop UX/UI optimization\n• Multi-language support (KR/EN)\n• Growing search traffic & engagement",
          tags: ["Sports", "F1", "SEO"],
          link: "https://f1-boxbox.com",
        },
        {
          name: "Ggujuwomygirl",
          metric: "Google Play #1 · App Store #2",
          description: "• #1 Free Overall on Google Play, #2 Free Overall on App Store\n• Photo meme generator app (Solo dev)\n• Viral on SNS with celebrities like Sandara Park\n• 4M downloads achieved",
          tags: ["iOS/Android", "Play Store #1", "Solo Dev"],
        },
        {
          name: "Pickmiju",
          metric: "US Stocks · Real-time · Economic Calendar",
          description: "• US stock real-time quotes platform\n• NASDAQ news, economic calendar in Korean\n• Pre/after-market quotes\n• Portfolio management, earnings calendar\n• Market cap ranking, fear & greed index, IPO info\n• Next.js + TypeScript + Tailwind CSS",
          tags: ["Finance", "Next.js", "Real-time"],
          link: "https://www.pickmiju.com/stocks",
        },
        {
          name: "OguOgu",
          metric: "Server Time · Ticketing · Millisecond Precision",
          description: "• Precision server time app for ticketing\n• Millisecond-level time display\n• Error correction for accuracy\n• Dynamic Island/Lock Screen widgets\n• PIP mode support\n• App Store rating 4.5",
          tags: ["iOS", "Swift", "Ticketing"],
          link: "https://apps.apple.com/kr/app/id6499110329",
        },
      ],
      workItems: [
        {
          name: "Remittance App & AI Automation",
          company: "Global Money Express",
          period: "2025 - Present",
          description: "• International remittance mobile team management\n• New loan service planning\n• Remittance system advancement project management\n• Schedule/quality/cost coordination with dev team & partners\n• AI-based translation automation tool development\n• JIRA task management tool for workflow optimization",
          tags: ["Fintech", "AI Automation", "Current"],
          link: "https://apps.apple.com/us/app/gme-remit/id1439161261",
        },
        {
          name: "Esports.op.gg",
          company: "OP.GG",
          period: "2020 - 2025",
          description: "• LoL e-Sports data platform\n• Led from initial idea → planning/dev/marketing/operations\n• iOS/Android/Web service operation\n• Match schedules, player info, game results visualization\n• UX/UI design and prototyping\n• Results: Session time 20%↑, CTR 15%↑\n• Grew from 0 to 5M annual users, 3.15M MAU",
          tags: ["0→5M", "CTR 15%↑", "PO Lead"],
          link: "https://esports.op.gg/",
        },
        {
          name: "Duo.op.gg",
          company: "OP.GG",
          period: "2021 - 2024",
          description: "• LoL duo matching platform\n• Led entire process: idea → planning/dev management/marketing\n• User pain point analysis & solution proposals\n• Matching algorithm planning & improvement\n• Marketing strategy development & execution\n• Results: 2.18M users, Matching 35%↑, Return rate 25%↑",
          tags: ["2.18M MAU", "Matching 35%↑", "Return 25%↑"],
          link: "https://duo.op.gg/ko/lol/?region=kr",
        },
        {
          name: "Pal.op.gg",
          company: "OP.GG",
          period: "2024",
          description: "• Palworld in-game overlay extension\n• Led entire process: idea → planning/dev management/deployment\n• Minimap & real-time map info display planning\n• Fast marketing execution aligned with game trends\n• Results: 80K users acquired",
          tags: ["Gaming", "Extension", "80K Users"],
          link: "https://pal.op.gg/ko",
        },
        {
          name: "QWER.GG → Sold to OP.GG",
          company: "Loud Communications",
          period: "2020 - 2021",
          description: "• Started as personal project → acquired by Loud Communications\n• e-Sports data-driven information site\n• Led planning & marketing from inception\n• Pro team data collaboration\n• Gaming gear company sales & marketing\n• Results: 100K monthly users → Team & product sold to OP.GG",
          tags: ["Startup", "Exit", "Acquired by OP.GG"],
        },
        {
          name: "GOPAX Crypto Exchange",
          company: "Streami",
          period: "2017 - 2019",
          description: "• Crypto exchange iOS/Android/Web A to Z planning\n• Apple Watch App planning\n• Indonesia launch & operations\n• ISMS international certification management\n• User churn/click pattern analysis via GA & custom tools\n• A/B testing for UX optimization\n• Viral marketing (referrals/SNS/influencers)\n• Results: New users 30%↑, Max daily volume $40M, 300K members",
          tags: ["$40M Volume", "New Users 30%↑", "ISMS"],
          link: "https://www.gopax.co.kr/",
        },
        {
          name: "Bungaejangter iOS",
          company: "Bungaejangter",
          period: "2017",
          description: "• Secondhand marketplace iOS native development (Objective-C)\n• Real-time chat (Bungae Talk) development\n• SNS signup authentication module\n• Main/product detail/listing page renewal\n• UI/UX optimization improved user retention\n• Chat stabilization & response speed improvement\n• Scale: 4.2M MAU, 13M members service",
          tags: ["4.2M MAU", "Chat Dev", "UX Optimization"],
          link: "https://apps.apple.com/kr/app/%EB%B2%88%EA%B0%9C%EC%9E%A5%ED%84%B0/id395672275",
        },
        {
          name: "Bbaldae - Shopping Mall Manager App",
          company: "Joseph Dale Company",
          period: "2015 - 2017",
          description: "• Korea's first shopping mall management app\n• iOS/Android cross-platform development using Xamarin\n• Main page & delivery management implementation\n• Seller-focused UX design",
          tags: ["First in Korea", "Xamarin", "Cross-platform"],
        },
        {
          name: "Social Shopping Platform",
          company: "Pikicast",
          period: "2015",
          description: "• Influencer-based iOS social shopping platform\n• Solo development A to Z (Objective-C)\n• Signup, main page, photo upload, search, likes - all features",
          tags: ["Solo Dev", "A to Z", "Social Commerce"],
        },
        {
          name: "KBS Storage System",
          company: "Malgeun Technology",
          period: "2014 - 2015",
          description: "• OS X KBS Live storage application development (Objective-C)\n• Real-time data backup & recovery system\n• File browser UI development\n• Improved backup system stability\n• Enhanced usability through UI improvements\n• Commercialized for KBS",
          tags: ["KBS Commercialized", "macOS", "Broadcast System"],
          link: "https://www.malgn.com/",
        },
        {
          name: "Heroes of Empire",
          company: "Entaz",
          period: "2012 - 2014",
          description: "• Mobile strategy simulation game development (Cocos2d-x)\n• Tilemap-based map UI & algorithm implementation\n• Battle UI development\n• Real-time multiplayer via socket programming\n• Simultaneous launch on all 3 Korean carriers (SKT, KT, LGU+)",
          tags: ["3 Carriers Launch", "Cocos2d-x", "Realtime Multiplayer"],
        },
        {
          name: "Microsoft Surface Ad Platform",
          company: "d'strict Holdings",
          period: "2009 - 2011",
          description: "• World's first multitouch table-based ad platform (C# WPF)\n• UX-based interactive application using Surface\n• Global events operated:\n  - Samsung 2010 CES Las Vegas\n  - Samsung 2010 Vancouver Olympics\n  - Hyundai 2011 Shanghai/Geneva Motor Show\n  - Lee Sang-bong 2011 NY Fashion Week",
          tags: ["World's First", "Samsung/Hyundai", "Global Events"],
          link: "https://www.youtube.com/watch?v=j-p4S4nUMuo",
        },
        {
          name: "B2B Messenger",
          company: "Nexus Community",
          period: "2008 - 2009",
          description: "• B2B enterprise messenger for call centers (C#)\n• Real-time chat, file transfer, screen sharing\n• Inbound monitoring features\n• Commercialized: Woori Bank, Interpark, etc.",
          tags: ["B2B Commercialized", "Woori Bank", "Interpark"],
        },
      ],
    },
    about: {
      title: "About Me",
      description: [
        "9 years as Developer + 8 years as PM. Ex-developer PO/PM with 17 years in tech. Planned and operated 3 services with 5M+ MAU, achieving #1 market position.",
        "Deep understanding of development processes enables smooth communication with engineers. I bridge technical requirements with non-technical stakeholders effectively. I realistically assess workload and complexity from a developer's perspective.",
        "Strong leadership in tech, business, and organization drives exceptional results in launching and growing new services. Recognized as a PM who earns technical trust from developers, achieving high collaboration efficiency.",
        "Recently, I have a deep interest in AI technology, focusing on workflow automation and AI-powered service planning using tools like Claude Code and Codex.",
      ],
      skillsTitle: "Expertise",
      skills: {
        mobile: "Mobile",
        web: "Web",
        desktop: "Desktop & Game",
        backend: "Backend & Infra",
        analytics: "Analytics",
        tools: "Tools & AI",
      },
    },
    contact: {
      title: "Let's Work Together",
      description:
        "I'm always interested in new projects and opportunities.\nWhether you have a question or just want to say hi, feel free to reach out.",
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with Next.js & Tailwind CSS",
    },
  },
};

export function getTranslation(locale: Locale): Translation {
  return translations[locale];
}
