import React, { useState, useEffect, useRef } from "react";
import bg1 from "../img/bg1.png";
import bg2 from "../img/bg2.png";
import bg3 from "../img/bg3.png";
import bg4 from "../img/bg4.mp4";
import img1 from "../img/img1.png";
import img2 from "../img/img2.png";
import img3 from "../img/img3.png";
import img4 from "../img/img4.png";
import img5 from "../img/img5.png";
import img6 from "../img/img6.png";
import change1 from "../img/change1.png";
import slide1 from "../img/slide1.png";
import slide2 from "../img/slide2.png";
import slide3 from "../img/slide3.png";
import slide4 from "../img/slide4.png";
import slide5 from "../img/slide5.png";
import slide6 from "../img/slide6.png";
import slide7 from "../img/slide7.png";
import review1 from "../img/review1.png";
import review2 from "../img/review2.png";
import review3 from "../img/review3.png";
const HERO_SLIDES = [
  {
    image: bg1,
    title1: "# 하트 멜팅밤",
    title2: "# 소프트 핑크",
    desc: "누구에게나 어울리는 소프트 핑크로 하루를 촉촉하게!",
    productName: "글래스팅 멜팅 밤",
    productDetail:
      "입술 온도에 부드럽게 녹아 맑고 촉촉한 컬러를 더해주는 데일리 멜팅 밤입니다.",
    price: "13,000원",
  },
  {
    image: bg2,
    title1: "# 사탕처럼 달콤하게",
    title2: "# 하트치크",
    desc: "세가지 컬러의 하트로 생기있는 볼을 완성해보세요.",
    productName: "베러 댄 치크",
    productDetail:
      "세 가지 하트 컬러가 자연스럽게 어우러져 생기 있는 볼을 완성하는 블러셔입니다.",
    price: "12,000원",
  },
  {
    image: bg3,
    title1: "# 오래가는 발색",
    title2: "# 선명한 하루",
    desc: "처음 바른 그대로 맑고 선명하게 유지됩니다.",
    productName: "쥬시 플래시 립 오일",
    productDetail:
      "맑고 선명한 컬러와 촉촉한 광택이 오랫동안 유지되는 워터 틴트입니다.",
    price: "14,000원",
  },
  {
    video: bg4,
    title1: "# 매끈한 피부결",
    title2: "# 투명한 광채",
    desc: "가볍게 밀착되어 자연스럽고 깨끗한 피부 표현을 완성해보세요.",
    productName: "누드바이롬앤 멜로우 매트 쿠션",
    productDetail:
      "피부에 얇고 고르게 밀착되어 매끈한 피부결과 자연스러운 광채를 연출하는 쿠션입니다.",
    price: "18,000원",
  },
];

// Types
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  visibleOverride?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
}

interface ReviewData {
  productName: string;
  productDetail: string;
  productPrice: string;
  productImage: string;
  quote: string;
  body: string;
  author: string;
  delay: number;
}

interface ProductData {
  src: string;
  alt: string;
  label: string;
  delay: number;
}

interface TrailPoint {
  x: number;
  y: number;
  time: number;
  startsNewLine?: boolean;
}

interface TrailSparkle {
  x: number;
  y: number;
  size: number;
  time: number;
  rotation: number;
}

// Reveal Component
function Reveal({
  children,
  delay = 0,
  className = "",
  style,
  visibleOverride,
  onVisibilityChange,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [observedVisible, setObservedVisible] = useState(false);

  useEffect(() => {
    if (visibleOverride !== undefined) return;

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setObservedVisible(entry.isIntersecting);
        onVisibilityChange?.(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisibilityChange, visibleOverride]);

  const visible = visibleOverride ?? observedVisible;

  const animStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
    ...style,
  };

  return (
    <div
      ref={ref}
      style={animStyle}
      className={`${className} ${visible ? "reveal-visible" : ""}`.trim()}
    >
      {children}
    </div>
  );
}

// Stars
function Stars({ size = 20 }: { size?: number }) {
  return (
    <div style={{ display: "flex", color: "#FFD700", marginBottom: 16 }}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// Static Data
const NAV_LINKS = ["Main", "Best Sellers", "Review", "With Us"];
const FOOTER_LINKS = [
  {
    label: "Privacy Policy",
    title: "개인정보 처리방침",
    intro:
      "rom&nd는 고객님의 개인정보를 안전하게 보호하며, 서비스 제공에 필요한 범위에서만 정보를 이용합니다.",
    details: [
      "수집 항목: 이름, 연락처, 이메일, 배송지 및 주문 정보",
      "이용 목적: 주문 처리, 배송, 고객 상담 및 서비스 개선",
      "보유 기간: 관련 법령에서 정한 기간 후 안전하게 파기",
    ],
  },
  {
    label: "Terms of Service",
    title: "이용약관",
    intro:
      "rom&nd 온라인 스토어 이용 시 적용되는 기본 권리와 의무를 안내합니다.",
    details: [
      "주문은 결제 완료 후 확정되며 재고 상황에 따라 취소될 수 있습니다.",
      "상품 정보와 가격은 사전 안내 후 변경될 수 있습니다.",
      "회원은 정확한 정보를 제공하고 계정을 안전하게 관리해야 합니다.",
    ],
  },
  {
    label: "Shipping & Returns",
    title: "배송 및 반품 안내",
    intro:
      "결제 완료 후 빠르고 안전하게 상품을 준비하며, 미개봉 상품은 기준에 따라 반품할 수 있습니다.",
    details: [
      "배송 기간: 영업일 기준 2~5일",
      "무료 배송: 최종 결제 금액 30,000원 이상",
      "반품 신청: 수령일로부터 7일 이내 고객센터 접수",
    ],
  },
  {
    label: "Contact Us",
    title: "고객문의",
    intro:
      "제품, 주문, 배송에 대한 궁금한 점을 rom&nd 고객센터에서 도와드립니다.",
    details: [
      "이메일: help@romand.co.kr",
      "전화: 02-0000-0000",
      "운영 시간: 평일 10:00~17:00 (점심 12:00~13:00)",
    ],
  },
  {
    label: "Store Locator",
    title: "매장 안내",
    intro:
      "가까운 rom&nd 오프라인 매장에서 제품의 컬러와 텍스처를 직접 만나보세요.",
    details: [
      "서울 플래그십 스토어: 서울 성동구 성수동",
      "주요 입점처: 올리브영, 롭스 및 주요 면세점",
      "매장별 재고와 운영 시간은 방문 전 확인해 주세요.",
    ],
  },
];
const LOGO = new URL("../img/logo.png", import.meta.url).href;

const HEADER_ICONS = [
  {
    label: "Search",
    paths: (
      <>
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="M15 15l5 5" />
      </>
    ),
  },
  {
    label: "Shopping bag",
    paths: (
      <>
        <path d="M6.5 8.5h11l-.6 11h-9.8l-.6-11z" />
        <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
      </>
    ),
  },
  {
    label: "Account",
    paths: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      </>
    ),
  },
];

const REVIEWS: ReviewData[] = [
  {
    productName: "롬앤 쥬시 알 치크",
    productDetail:
      "맑고 투명한 수채화 발색으로 볼에 자연스러운 생기를 더해주는 치크입니다.",
    productPrice: "14,000원",
    productImage: review1,
    quote: '"반신반의하며 구매했는데 지속력이 정말 좋아요"',
    body: "기존 제품은 금방 지워져서 아쉬웠는데, rom&nd로 바꾸고 나서는 하루 종일 맑은 색감이 유지돼요. 주변 지인들에게도 추천하고 있어요.",
    author: "구매자 김**",
    delay: 100,
  },
  {
    productName: "글래스팅 멜팅 밤",
    productDetail:
      "입술 온도에 부드럽게 녹아 맑은 컬러와 촉촉한 광택을 더해주는 멜팅 밤입니다.",
    productPrice: "13,000원",
    productImage: review2,
    quote: '"데일리로 쓰기 좋은 최고의 선택"',
    body: "배송도 빠르고 무엇보다 컬러가 자연스럽고 예뻐요. 부담 없이 매일 바르기 좋아서 손이 자주 가요.",
    author: "구매자 이**",
    delay: 200,
  },
  {
    productName: "더 쥬시 래스팅 틴트",
    productDetail:
      "선명한 과즙 컬러와 탱글한 광택이 오랫동안 유지되는 데일리 틴트입니다.",
    productPrice: "13,000원",
    productImage: review3,
    quote: '"전문가들이 추천하는 이유를 알겠어요"',
    body: "촉촉한 마감과 선명한 발색이 오래 이어져요. 여러 제품을 써봤지만 이만큼 만족스러운 제품은 드물어요.",
    author: "구매자 박**",
    delay: 300,
  },
];

const PRODUCTS: ProductData[] = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjmhDQjS_PkI7HILz_ZYgDgJ4yFBALiCokN07AYnEm6H6AULO88fEnFWGQST7uZwOvxJPOmnhPhweKsmzUueyYEDLuH2fAGcxan-ent0SC1bSPmOad0ucZx172xH6cQ7O9GGfBob0GhRQgnawMbaYcKsUqccnJFWo9CM24XyyJBCkhztlyQhTEItsh5hTnIsNBPtdlq9GEamKEIHPWhz0DrKSGxOhJa6wWRuVVZU1RWDHwqducEsC6kfmQndlKqfBvVQHEgJQH81PIoeA",
    alt: "Juicy Lasting Tint Mini",
    label: "# 롬앤 쥬시 래스팅 틴트 미니",
    delay: 100,
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaDctHvynwrnWb7acclfJrZcci4C-tXImKBJsANrkkH-qpn2P4ps5NwpAMkPjJtrPB7mXGErdZ2zN3c8yhtvPhz3_8xxXvfGM-5B-9r7W-BUJRlQlIfai9wuBuNK7jTJtRsYTI7aPbenxb8VTlwFd8Z1hCKXFAknjbCgf16c0GiJ5pvx6N4s4vKyOScXp8qTSk_Ck96GfaneVLbiDBr6Cht4y36l7pTNOfuky0j7vj4vw00iPG9LcdQAAK3XDmOX3D-TlAB-WPeEVHe_8",
    alt: "Mellow Matte Cushion",
    label: "# 누드바이롬앤 멜로우 매트 쿠션",
    delay: 300,
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBovgjNUYaUjp4R7PnL6DPhD3mJ9lAnNnJdW-8SAyueJvdFVrmJDdH9elJuqVuAfhrmPipMFrJPhXHiuy5Y67U_aZo2eVwwZyBo6VOIfQcrPcmRrOuzBQF6KzNIMSg8_x9tIDBs1_iN8ERmDl2XVPAuGdg54MeyN360NDaUvXpGuUNWsNuFU4qEQrGrGXpl58Fc4V4dNSO2Zy6ACSbvrHhBziLnOVf0Yv9It1KzpUgt_UIuFpN39trmvNoHVlPPmTn-3HvUVBZjobLSzIk",
    alt: "Before and After",
    label: "# 드라마틱한 변화, 살아나는 맑음",
    delay: 500,
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnS-E1rOsZV58xDbCLauYaJGF1n8QiKvzzYdAYBDqqAhz99f7kuaXYJYA2WeSQotmH8WZFtf55qRBsm64S3a8udZ1ETSeRVpz4peCT9CoXclM98sONBcLsKTDzfNK57kjtAcuybvDNEaxhjTVv9rel9WqIt1qX6owJn71z8pyNgxPGyAsN2iZbc5kls18cnX5UDQSvs47r3CYYO2vm8uiQooNzfFbdQNyHHKw9gzeRdP_DilVmT0VgqsBb9_il95w5vf7zn4Awv55R6Y0",
    alt: "Better Than Cheek",
    label: "# 롬앤 베러 댄 치크",
    delay: 500,
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaU8OFnLWqkqx0945tbKV1IqKernadF54pWG9ZFoad5choqeYwKrQCaeYepZCtvqmTi_Y-S0sVe2DjtKMtsbbYpnJXHJMIioHCBJFdR5nlg7qBbVGMg0u8eMSHqePjzDYRVR7rv5WfpXI0Sy76pdUIsf7qiikXdaHv_m_2RAdrTGrKDVJIO2j6FPut9imN8lOTx8yxQYh0Dh7nsLAtJXL9SAPA5ch79nbzJy8995MR0u64wwJNdq8HPlXbMSIQ9k-TVm-Hl1R8u5TzvjI",
    alt: "Juicy Flush Lip Oil",
    label: "# 투명하게 물드는 생기 있는 발색",
    delay: 700,
  },
];

const SOCIAL_IMGS = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];
const LOOPED_SOCIAL_IMGS = [...SOCIAL_IMGS, ...SOCIAL_IMGS, ...SOCIAL_IMGS];

const C = {
  primary: "#FA96AC",
  pink: "#FDC5D5",
  pinkLight: "rgba(253,197,213,0.45)",
  surface: "#000000",
  muted: "#564242",
  border: "rgba(221,192,192,0.3)",
  serif: "'Jua', sans-serif",
  sans: "'Jua', sans-serif",
};

const productLabelStyle: React.CSSProperties = {
  fontFamily: C.serif,
  fontSize: 24,
  fontWeight: 500,
  background: C.pinkLight,
  borderRadius: "2px 3px 5px 2px",
  transform: "rotate(-1.5deg)",
  boxShadow: "2px 2px 8px rgba(0,0,0,0.05)",
  padding: "0.5rem 1rem",
  display: "inline-block",
  color: C.surface,
};

export default function RomAndLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProductIndex, setSelectedProductIndex] = useState<
    number | null
  >(null);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState<number | null>(
    null,
  );
  const [selectedFooterIndex, setSelectedFooterIndex] = useState<number | null>(
    null,
  );
  const [selectedSocialImageIndex, setSelectedSocialImageIndex] = useState<
    number | null
  >(null);
  const [img2Hovered, setImg2Hovered] = useState(false);
  const [pairedProductsVisible, setPairedProductsVisible] = useState(false);
  const [thirdRowVisible, setThirdRowVisible] = useState(false);
  const socialGalleryRef = useRef<HTMLDivElement>(null);
  const socialGalleryAnimationFrame = useRef<number>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const section3TrailRef = useRef<HTMLCanvasElement>(null);
  const section3TrailPoints = useRef<TrailPoint[]>([]);
  const section3Sparkles = useRef<TrailSparkle[]>([]);
  const lastSparkleTime = useRef(0);

  const moveHeroSlide = (getNextSlide: (current: number) => number) => {
    setCurrentSlide((current) => getNextSlide(current));
  };

  const addSection3TrailPoint = (event: React.PointerEvent<HTMLElement>) => {
    const section = section3Ref.current;
    if (!section || event.pointerType === "touch") return;

    const rect = section.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const now = performance.now();

    section3TrailPoints.current.push({
      x,
      y,
      time: now,
    });

    if (now - lastSparkleTime.current > 45) {
      section3Sparkles.current.push({
        x: x + (Math.random() - 0.5) * 28,
        y: y + (Math.random() - 0.5) * 28,
        size: 3 + Math.random() * 5,
        time: now,
        rotation: Math.random() * Math.PI,
      });
      lastSparkleTime.current = now;
    }
  };

  const endSection3Trail = () => {
    const lastPoint = section3TrailPoints.current.at(-1);
    if (lastPoint) lastPoint.startsNewLine = true;
  };

  const scrollSocialGallery = (direction: number) => {
    const gallery = socialGalleryRef.current;
    if (!gallery) return;

    const cards = gallery.children;
    const firstCard = cards[0] as HTMLElement | undefined;
    const secondCard = cards[1] as HTMLElement | undefined;
    const repeatedSetStart = cards[SOCIAL_IMGS.length] as
      | HTMLElement
      | undefined;
    if (!firstCard || !secondCard || !repeatedSetStart) return;

    const cardStep = secondCard.offsetLeft - firstCard.offsetLeft;
    const setWidth = repeatedSetStart.offsetLeft - firstCard.offsetLeft;
    const startLeft = gallery.scrollLeft;
    const targetLeft = startLeft + direction * cardStep;
    const duration = 1050;
    const startTime = performance.now();

    if (socialGalleryAnimationFrame.current) {
      cancelAnimationFrame(socialGalleryAnimationFrame.current);
    }

    const animateScroll = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      gallery.scrollLeft = startLeft + (targetLeft - startLeft) * easedProgress;

      if (progress < 1) {
        socialGalleryAnimationFrame.current =
          requestAnimationFrame(animateScroll);
      } else if (gallery.scrollLeft >= setWidth * 2) {
        gallery.scrollLeft -= setWidth;
      } else if (gallery.scrollLeft < setWidth) {
        gallery.scrollLeft += setWidth;
      }
    };

    socialGalleryAnimationFrame.current = requestAnimationFrame(animateScroll);
  };

  const openSocialImage = (index: number) => {
    if (socialGalleryAnimationFrame.current) {
      cancelAnimationFrame(socialGalleryAnimationFrame.current);
    }

    setSelectedSocialImageIndex(index % SOCIAL_IMGS.length);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (
      selectedProductIndex === null &&
      selectedReviewIndex === null &&
      selectedFooterIndex === null &&
      selectedSocialImageIndex === null
    )
      return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProductIndex(null);
        setSelectedReviewIndex(null);
        setSelectedFooterIndex(null);
        setSelectedSocialImageIndex(null);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [
    selectedProductIndex,
    selectedReviewIndex,
    selectedFooterIndex,
    selectedSocialImageIndex,
  ]);
  useEffect(() => {
    if (HERO_SLIDES[currentSlide].video) return;

    const timer = window.setTimeout(() => {
      moveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const gallery = socialGalleryRef.current;
    if (!gallery) return;

    const placeGalleryInMiddle = () => {
      const firstCard = gallery.children[0] as HTMLElement | undefined;
      const repeatedSetStart = gallery.children[SOCIAL_IMGS.length] as
        | HTMLElement
        | undefined;
      if (!firstCard || !repeatedSetStart) return;

      gallery.scrollTo({
        left: repeatedSetStart.offsetLeft - firstCard.offsetLeft,
        behavior: "auto",
      });
    };

    const animationFrame = requestAnimationFrame(placeGalleryInMiddle);
    window.addEventListener("resize", placeGalleryInMiddle);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", placeGalleryInMiddle);
      if (socialGalleryAnimationFrame.current) {
        cancelAnimationFrame(socialGalleryAnimationFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedSocialImageIndex !== null) return;

    const timer = setInterval(() => {
      scrollSocialGallery(1);
    }, 2000);

    return () => clearInterval(timer);
  }, [selectedSocialImageIndex]);

  useEffect(() => {
    const section = section3Ref.current;
    const canvas = section3TrailRef.current;
    if (!section || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      const rect = section.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.round(rect.width * pixelRatio);
      canvas.height = Math.round(rect.height * pixelRatio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(section);
    resizeCanvas();

    let animationFrame = 0;
    const trailLifetime = 800;
    const sparkleLifetime = 1000;

    const drawTrail = (now: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      const points = section3TrailPoints.current.filter(
        (point) => now - point.time < trailLifetime,
      );
      section3TrailPoints.current = points;

      context.lineWidth = 3;
      context.lineCap = "round";
      context.lineJoin = "round";

      for (let index = 1; index < points.length; index += 1) {
        const previous = points[index - 1];
        const current = points[index];
        if (previous.startsNewLine) continue;

        const opacity = Math.max(0, 1 - (now - current.time) / trailLifetime);
        context.strokeStyle = `rgba(253, 197, 213, ${opacity})`;
        context.beginPath();
        context.moveTo(previous.x, previous.y);
        context.lineTo(current.x, current.y);
        context.stroke();
      }

      const sparkles = section3Sparkles.current.filter(
        (sparkle) => now - sparkle.time < sparkleLifetime,
      );
      section3Sparkles.current = sparkles;

      sparkles.forEach((sparkle) => {
        const progress = (now - sparkle.time) / sparkleLifetime;
        const opacity = Math.sin(progress * Math.PI);
        const size = sparkle.size * (0.7 + Math.sin(progress * Math.PI) * 0.6);

        context.save();
        context.translate(sparkle.x, sparkle.y);
        context.rotate(sparkle.rotation + progress * Math.PI);
        context.shadowColor = "#FDC5D5";
        context.shadowBlur = 10;
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.strokeStyle = `rgba(253, 197, 213, ${opacity})`;
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(0, -size);
        context.quadraticCurveTo(size * 0.25, -size * 0.25, size, 0);
        context.quadraticCurveTo(size * 0.25, size * 0.25, 0, size);
        context.quadraticCurveTo(-size * 0.25, size * 0.25, -size, 0);
        context.quadraticCurveTo(-size * 0.25, -size * 0.25, 0, -size);
        context.fill();
        context.stroke();
        context.restore();
      });

      animationFrame = requestAnimationFrame(drawTrail);
    };

    animationFrame = requestAnimationFrame(drawTrail);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const activeProduct =
    selectedReviewIndex !== null
      ? {
          name: REVIEWS[selectedReviewIndex].productName,
          detail: REVIEWS[selectedReviewIndex].productDetail,
          price: REVIEWS[selectedReviewIndex].productPrice,
          image: REVIEWS[selectedReviewIndex].productImage,
        }
      : selectedProductIndex !== null
        ? {
            name: HERO_SLIDES[selectedProductIndex].productName,
            detail: HERO_SLIDES[selectedProductIndex].productDetail,
            price: HERO_SLIDES[selectedProductIndex].price,
            image: undefined,
          }
        : null;

  const closeProductModal = () => {
    setSelectedProductIndex(null);
    setSelectedReviewIndex(null);
  };

  const closeFooterModal = () => setSelectedFooterIndex(null);

  const closeSocialImage = () => setSelectedSocialImageIndex(null);

  return (
    <div
      className="romand-landing"
      style={{
        fontFamily: C.sans,
        color: C.surface,
        backgroundColor: "#fff",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .romand-landing,
        .romand-landing button,
        .romand-landing input,
        .romand-landing textarea,
        .romand-landing select {
          font-family: 'Jua', sans-serif;
        }
        .romand-landing * { box-sizing: border-box; }
        .romand-landing img { max-width: 100%; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .dewy-shadow { box-shadow: 0 20px 50px rgba(253,197,213,0.15); }
        .glass-nav { backdrop-filter: blur(12px); background-color: rgba(255,255,255,0.82); }
        .hero-background {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center 25%;
          opacity: 0;
          transform: scale(1.035);
          transition:
            opacity 1.25s cubic-bezier(.22, 1, .36, 1),
            transform 1.45s cubic-bezier(.22, 1, .36, 1);
          will-change: opacity, transform;
        }
        .hero-background.is-active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }
        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 25%;
          display: block;
          transform: scale(1.1);
        }
        .hero-copy {
          animation: hero-copy-rise 0.95s cubic-bezier(.22, 1, .36, 1) both;
        }
        @keyframes hero-copy-rise {
          from { opacity: 0; transform: translateX(-30px) translateY(18px); }
          to { opacity: 1; transform: translateX(-30px) translateY(0); }
        }
        .social-image-button {
          width: 100%;
          height: 100%;
          padding: 0;
          border: none;
          background: transparent;
          cursor: zoom-in;
        }
        .social-image-button img {
          transition:
            transform 0.45s cubic-bezier(.22, 1, .36, 1),
            filter 0.45s ease;
        }
        .social-image-button:hover img {
          transform: scale(1.035);
          filter: saturate(1.06);
        }
        .social-lightbox {
          animation: social-lightbox-in 0.28s ease-out both;
        }
        .social-lightbox-image {
          animation: social-lightbox-image-in 0.42s cubic-bezier(.22, 1, .36, 1) both;
        }
        @keyframes social-lightbox-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes social-lightbox-image-in {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .product-hover { transition: transform 0.5s ease, box-shadow 0.5s ease; }
        .product-hover:hover { transform: translateY(-8px); box-shadow: 0 30px 60px rgba(253,197,213,0.25); }
        .section3-image-frame,
        .product-image-frame {
          width: 500px;
          height: 500px;
          max-width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          position: relative;
        }
        .section3-image-frame img,
        .product-image-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .section3-image-frame.section3-contain img,
        .product-image-frame.section3-contain img {
          object-fit: contain;
        }
        .section3-scroll-image {
          opacity: 0;
          transform: translateY(48px) scale(0.98);
          transition:
            opacity 1s ease-out 0.2s,
            transform 1s cubic-bezier(.22, 1, .36, 1) 0.2s;
        }
        .reveal-visible .section3-scroll-image {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .image-shalala {
          position: relative;
          isolation: isolate;
        }
        .image-shalala::before,
        .image-shalala::after {
          content: "";
          position: absolute;
          pointer-events: none;
          opacity: 0;
        }
        .image-shalala::before {
          inset: -18%;
          z-index: -1;
          background: radial-gradient(
            circle,
            rgba(255,255,255,0.95) 0%,
            rgba(253,197,213,0.5) 30%,
            rgba(253,197,213,0) 68%
          );
          filter: blur(14px);
          transform: scale(0.55);
        }
        .image-shalala::after {
          inset: -12%;
          z-index: 3;
          background:
            radial-gradient(circle at 12% 24%, #fff 0 2px, rgba(253,197,213,0.8) 3px, transparent 7px),
            radial-gradient(circle at 88% 18%, #fff 0 2px, rgba(253,197,213,0.75) 3px, transparent 8px),
            radial-gradient(circle at 94% 74%, #fff 0 1px, rgba(253,197,213,0.8) 3px, transparent 7px),
            radial-gradient(circle at 18% 86%, #fff 0 2px, rgba(253,197,213,0.7) 3px, transparent 8px);
          transform: scale(0.8) rotate(-8deg);
        }
        .reveal-visible .image-shalala::before {
          animation: shalala-glow 1.8s ease-out 0.15s both;
        }
        .reveal-visible .image-shalala::after {
          animation: shalala-sparkles 1.8s ease-out 0.35s both;
        }
        @keyframes shalala-glow {
          0% { opacity: 0; transform: scale(0.55); }
          35% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0; transform: scale(1.25); }
        }
        @keyframes shalala-sparkles {
          0% { opacity: 0; transform: scale(0.8) rotate(-8deg); }
          35% { opacity: 1; transform: scale(1.02) rotate(0deg); }
          100% { opacity: 0; transform: scale(1.18) rotate(8deg); }
        }
        .scroll-labels {
          opacity: 0;
          transform: translateY(44px);
          transition:
            opacity 1s ease-out 1.15s,
            transform 1s cubic-bezier(.22, 1, .36, 1) 1.15s;
        }
        .reveal-visible .scroll-labels {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 900px) {
          .site-header { height: 64px !important; }
          .header-inner { padding: 0 32px !important; }
          .header-logo { transform: none !important; }
          .header-logo img { height: 32px !important; }
          .desktop-nav { display: none !important; }
          .header-actions { gap: 2px !important; transform: none !important; }
          .header-actions button { min-width: 44px; min-height: 44px; display: grid; place-items: center; }
          .page-main { padding-top: 64px !important; }
          .hero-section { min-height: calc(100svh - 64px) !important; align-items: center !important; }
          .hero-background { background-position: 62% center !important; }
          .hero-video { object-position: 62% center !important; }
          .hero-content {
            padding: 20px 20px 88px !important;
            transform: translateY(-8vh);
            background: none;
          }
          .hero-copy {
            transform: none !important;
            max-width: 100% !important;
            padding: 0;
          }
          .hero-copy h1 {
            font-size: clamp(25px, 7.5vw, 38px) !important;
            line-height: 1.35 !important;
            margin-bottom: 14px !important;
          }
          .hero-copy h1 span,
          .hero-copy p {
            width: fit-content;
            max-width: 100%;
            padding: 4px 10px;
            background: rgba(255,255,255,.72);
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
            clip-path: polygon(
              1% 8%, 7% 2%, 16% 7%, 25% 1%, 36% 6%, 47% 2%,
              58% 7%, 69% 1%, 80% 5%, 91% 2%, 99% 9%,
              97% 24%, 100% 39%, 97% 54%, 100% 70%, 96% 92%,
              86% 97%, 75% 93%, 64% 99%, 53% 94%, 42% 98%,
              31% 93%, 20% 99%, 10% 94%, 2% 98%, 4% 78%,
              1% 62%, 4% 46%, 1% 29%
            );
          }
          .hero-copy h1 span {
            margin-bottom: 6px;
            white-space: nowrap;
          }
          .hero-copy h1 span:nth-child(2) {
            clip-path: polygon(
              2% 3%, 13% 8%, 24% 2%, 35% 6%, 46% 1%, 57% 7%,
              68% 2%, 79% 8%, 90% 3%, 98% 7%, 100% 27%,
              97% 44%, 100% 61%, 97% 79%, 99% 96%, 88% 92%,
              77% 98%, 66% 93%, 55% 99%, 44% 94%, 33% 98%,
              22% 92%, 11% 97%, 1% 91%, 4% 72%, 1% 52%, 4% 31%
            );
          }
          .hero-copy p {
            font-size: 17px !important;
            line-height: 1.65 !important;
            margin-bottom: 24px !important;
          }
          .hero-copy button {
            min-height: 48px;
            max-width: calc(100% - 64px);
            margin-left: auto;
            margin-right: 0;
            padding: 14px 28px !important;
          }
          .hero-arrow { top: auto !important; bottom: 14px !important; align-items: flex-end !important; }
          .hero-arrow button { width: 44px !important; height: 44px !important; background: rgba(255,255,255,.78) !important; }
          .hero-arrow .material-symbols-outlined { font-size: 32px !important; color: #6c0c20 !important; }
          .problem-section { padding: 56px 0 !important; }
          .problem-copy { padding: 0 20px !important; }
          .problem-copy h2 { font-size: 26px !important; line-height: 1.35 !important; margin-bottom: 20px !important; }
          .problem-copy p { font-size: 16px !important; line-height: 1.75 !important; }
          .problem-copy br { display: none; }
          .features-section { padding: 48px 0 72px !important; }
          .features-container { padding: 0 20px !important; }
          .features-grid {
            width: 1152px;
            zoom: calc((100vw - 40px) / 1152px);
          }
          .section3-trail { display: none; }
          .reviews-section { padding: 56px 0 72px !important; }
          .reviews-container { padding: 0 20px !important; }
          .reviews-grid { grid-template-columns: 1fr !important; }
          .review-card { padding: 24px !important; }
          .social-section { padding: 64px 0 48px !important; }
          .social-container { padding: 0 16px !important; }
          .social-card { width: min(78vw, 320px) !important; }
          .social-arrow { width: 44px !important; height: 44px !important; }
          .social-arrow-left { left: 4px !important; }
          .social-arrow-right { right: 4px !important; }
          .site-footer {
            padding: 44px 0 28px !important;
            background: linear-gradient(180deg, #fff 0%, #fff7f9 100%) !important;
          }
          .footer-inner {
            padding: 0 20px !important;
            flex-direction: column;
            align-items: center !important;
            gap: 32px !important;
          }
          .footer-brand {
            width: 100%;
            text-align: center;
          }
          .footer-logo {
            display: inline-block;
            margin-bottom: 12px !important;
            padding: 4px 14px;
            font-size: 36px !important;
            color: #6c0c20 !important;
            background: rgba(253,197,213,.35);
            clip-path: polygon(3% 8%, 18% 2%, 34% 7%, 50% 1%, 66% 6%, 82% 2%, 98% 9%, 96% 91%, 80% 97%, 63% 92%, 47% 99%, 30% 93%, 4% 98%);
          }
          .footer-copy {
            max-width: 310px !important;
            margin: 0 auto !important;
            font-size: 15px !important;
            line-height: 1.7;
            color: #6b555b !important;
          }
          .footer-links {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            width: 100%;
            gap: 0 !important;
            border-top: 1px solid rgba(108,12,32,.12);
          }
          .footer-links a {
            min-height: 56px;
            padding: 10px 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 13px !important;
            line-height: 1.35;
            letter-spacing: .06em !important;
            border-bottom: 1px solid rgba(108,12,32,.12);
          }
          .footer-links a:nth-child(odd) { border-right: 1px solid rgba(108,12,32,.12); }
          .footer-links a:last-child:nth-child(odd) { grid-column: 1 / -1; border-right: none; }
        }
        @media (max-width: 600px) {
          .header-inner { padding: 0 16px !important; }
          .product-modal { width: calc(100% - 32px) !important; padding: 28px 22px !important; }
          .product-modal h2 { font-size: 26px !important; }
          .product-modal img { height: 180px !important; }
        }
        ::selection { background: rgba(253,197,213,0.3); }
      `}</style>

      <header
        className="glass-nav site-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 80,
          display: "flex",
          alignItems: "center",
          boxShadow: scrolled
            ? "0 4px 20px rgba(0,0,0,0.08)"
            : "0 1px 4px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <div
          className="header-inner"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 40px",
          }}
        >
          <a className="header-logo" href="#">
            <img
              src={LOGO}
              alt="rom&nd logo"
              style={{ height: 40, width: "auto", objectFit: "contain" }}
            />
          </a>
          <nav
            style={{ display: "flex", gap: 32, alignItems: "center" }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((item, index) => (
              <a
                key={item}
                href={
                  index === 1
                    ? "#third-section"
                    : index === 2
                      ? "#fourth-section"
                      : index === 3
                        ? "#fifth-section"
                        : "#"
                }
                onClick={
                  index === 1 || index === 2 || index === 3
                    ? (event) => {
                        event.preventDefault();
                        document
                          .getElementById(
                            index === 1
                              ? "third-section"
                              : index === 2
                                ? "fourth-section"
                                : "fifth-section",
                          )
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    : undefined
                }
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.muted,
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = C.pink)
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = C.muted)
                }
              >
                {item}
              </a>
            ))}
          </nav>
          <div
            className="header-actions"
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
              transform: "translateX(50px)",
            }}
          >
            {HEADER_ICONS.map((icon) => (
              <button
                key={icon.label}
                aria-label={icon.label}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  opacity: 1,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.opacity = "0.6")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.opacity = "1")
                }
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.62)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icon.paths}
                </svg>
              </button>
            ))}
          </div>
        </div>
      </header>

      {activeProduct !== null && (
        <div
          role="presentation"
          onClick={closeProductModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "grid",
            placeItems: "center",
            padding: 24,
            background: "rgba(48, 19, 10, 0.38)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            onClick={(event) => event.stopPropagation()}
            style={{
              position: "relative",
              width: "min(520px, 100%)",
              maxHeight: "calc(100vh - 48px)",
              overflowY: "auto",
              padding: "42px 40px",
              borderRadius: 28,
              background: "#fff9fb",
              boxShadow: "0 24px 80px rgba(80, 25, 45, 0.3)",
              textAlign: "left",
            }}
          >
            <button
              type="button"
              aria-label="Close product popup"
              onClick={closeProductModal}
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                width: 40,
                height: 40,
                border: "none",
                borderRadius: "50%",
                background: C.pinkLight,
                color: C.primary,
                fontSize: 24,
                cursor: "pointer",
              }}
            >
              ×
            </button>
            {activeProduct.image && (
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                style={{
                  width: "100%",
                  height: 220,
                  marginBottom: 24,
                  borderRadius: 18,
                  objectFit: "contain",
                  background: "#fff",
                }}
              />
            )}
            <p
              style={{
                margin: "0 0 10px",
                color: C.primary,
                fontSize: 14,
                letterSpacing: "0.16em",
              }}
            >
              rom&nd
            </p>
            <h2
              id="product-modal-title"
              style={{
                margin: "0 48px 18px 0",
                color: "#30130a",
                fontSize: 32,
                lineHeight: 1.3,
              }}
            >
              {activeProduct.name}
            </h2>
            <p
              style={{
                margin: "0 0 28px",
                color: C.muted,
                fontSize: 17,
                lineHeight: 1.75,
              }}
            >
              {activeProduct.detail}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 22,
                borderTop: `1px solid ${C.border}`,
              }}
            >
              <span style={{ color: C.muted, fontSize: 15 }}>판매가</span>
              <strong style={{ color: C.primary, fontSize: 24 }}>
                {activeProduct.price}
              </strong>
            </div>
          </div>
        </div>
      )}

      {selectedFooterIndex !== null && (
        <div
          role="presentation"
          onClick={closeFooterModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "grid",
            placeItems: "center",
            padding: 24,
            background: "rgba(48, 19, 10, 0.38)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="footer-modal-title"
            onClick={(event) => event.stopPropagation()}
            style={{
              position: "relative",
              width: "min(600px, 100%)",
              maxHeight: "calc(100vh - 48px)",
              overflowY: "auto",
              padding: "42px 40px",
              borderRadius: 28,
              background: "#fff9fb",
              boxShadow: "0 24px 80px rgba(80, 25, 45, 0.3)",
              textAlign: "left",
            }}
          >
            <button
              type="button"
              aria-label="Close information popup"
              onClick={closeFooterModal}
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                width: 40,
                height: 40,
                border: "none",
                borderRadius: "50%",
                background: C.pinkLight,
                color: C.primary,
                fontSize: 24,
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <p
              style={{
                margin: "0 0 10px",
                color: C.primary,
                fontSize: 14,
                letterSpacing: "0.16em",
              }}
            >
              rom&nd
            </p>
            <h2
              id="footer-modal-title"
              style={{
                margin: "0 48px 18px 0",
                color: "#30130a",
                fontSize: 32,
                lineHeight: 1.3,
              }}
            >
              {FOOTER_LINKS[selectedFooterIndex].title}
            </h2>
            <p
              style={{
                margin: "0 0 26px",
                color: C.muted,
                fontSize: 17,
                lineHeight: 1.75,
              }}
            >
              {FOOTER_LINKS[selectedFooterIndex].intro}
            </p>
            <ul
              style={{
                margin: 0,
                padding: "22px 22px 22px 42px",
                borderRadius: 16,
                background: "rgba(253,197,213,0.22)",
                color: C.muted,
                fontSize: 16,
                lineHeight: 1.8,
              }}
            >
              {FOOTER_LINKS[selectedFooterIndex].details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {selectedSocialImageIndex !== null && (
        <div
          className="social-lightbox"
          role="presentation"
          onClick={closeSocialImage}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 110,
            display: "grid",
            placeItems: "center",
            padding: 24,
            background: "rgba(48, 19, 10, 0.46)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`rom&nd look ${selectedSocialImageIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
            style={{
              position: "relative",
              width: "fit-content",
              maxWidth: "calc(100vw - 48px)",
              maxHeight: "calc(100vh - 48px)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <button
              type="button"
              aria-label="Close enlarged image"
              onClick={closeSocialImage}
              style={{
                position: "absolute",
                top: 0,
                right: -42,
                width: 32,
                height: 32,
                border: "none",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.82)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.16)",
                color: "#30130a",
                cursor: "pointer",
                zIndex: 2,
                display: "grid",
                placeItems: "center",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "relative",
                  width: 17,
                  height: 17,
                  display: "block",
                }}
              >
                {[45, -45].map((rotation) => (
                  <span
                    key={rotation}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 22,
                      height: 2,
                      borderRadius: 999,
                      background: "#30130a",
                      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                      transformOrigin: "center",
                    }}
                  />
                ))}
              </span>
            </button>
            <img
              className="social-lightbox-image"
              src={SOCIAL_IMGS[selectedSocialImageIndex]}
              alt={`rom&nd look ${selectedSocialImageIndex + 1}`}
              style={{
                width: "auto",
                maxWidth: "min(640px, calc(100vw - 48px))",
                maxHeight: "calc(100vh - 48px)",
                objectFit: "contain",
                borderRadius: 12,
                background: "transparent",
                boxShadow: "0 28px 90px rgba(48,19,10,0.28)",
              }}
            />
          </div>
        </div>
      )}

      <main className="page-main" style={{ paddingTop: 80 }}>
        {/* Hero */}
        <section
          className="hero-section"
          style={{
            position: "relative",
            minHeight: "89vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {HERO_SLIDES.map((slide, slideIndex) => (
            <div
              className={`hero-background ${
                slideIndex === currentSlide ? "is-active" : ""
              }`.trim()}
              key={slideIndex}
              aria-hidden={slideIndex !== currentSlide}
              style={{
                backgroundImage: slide.image
                  ? `url(${slide.image})`
                  : undefined,
              }}
            >
              {slide.video && (
                <video
                  key={`${slide.video}-${slideIndex === currentSlide ? "active" : "idle"}`}
                  className="hero-video"
                  src={slide.video}
                  autoPlay={slideIndex === currentSlide}
                  muted
                  playsInline
                  onPlay={(event) => {
                    event.currentTarget.dataset.advanceStarted = "false";
                  }}
                  onTimeUpdate={(event) => {
                    if (slideIndex !== currentSlide) return;

                    const video = event.currentTarget;
                    if (
                      video.dataset.advanceStarted === "true" ||
                      !Number.isFinite(video.duration) ||
                      video.duration - video.currentTime > 0.9
                    )
                      return;

                    video.dataset.advanceStarted = "true";
                    video.pause();
                    moveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
                  }}
                  onEnded={(event) => {
                    if (slideIndex !== currentSlide) return;

                    const video = event.currentTarget;
                    if (video.dataset.advanceStarted !== "true") {
                      video.dataset.advanceStarted = "true";
                      moveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
                    }
                  }}
                />
              )}
            </div>
          ))}
          <div
            className="hero-content"
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.05)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          />
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 24px",
              width: "100%",
              position: "relative",
              zIndex: 10,
            }}
          >
            <div
              key={currentSlide}
              className="hero-copy"
              style={{
                maxWidth: 560,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "left",
                transform: "translateX(-30px)",
                visibility: HERO_SLIDES[currentSlide].video
                  ? "hidden"
                  : "visible",
                pointerEvents: HERO_SLIDES[currentSlide].video
                  ? "none"
                  : "auto",
              }}
            >
              <h1
                style={{
                  fontFamily: C.serif,
                  fontSize: "clamp(36px,5vw,52px)",
                  lineHeight: 1.14,
                  fontWeight: 600,
                  margin: "0 0 24px",
                  color: "#424242",
                }}
              >
                <span style={{ display: "block" }}>
                  {HERO_SLIDES[currentSlide].title1}
                </span>

                <span style={{ display: "block" }}>
                  {HERO_SLIDES[currentSlide].title2}
                </span>
              </h1>

              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "#303030",
                  margin: "0 0 32px",
                  maxWidth: 430,
                }}
              >
                {HERO_SLIDES[currentSlide].desc}
              </p>
              <button
                type="button"
                onClick={() => setSelectedProductIndex(currentSlide)}
                style={{
                  padding: "16px 40px",
                  borderRadius: 9999,
                  background: C.pink,
                  color: "#30130a",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(253,197,213,0.5)",
                  transition: "opacity 0.3s, box-shadow 0.3s",
                }}
              >
                SHOP NOW
              </button>
            </div>
          </div>
          {/* Slide Arrows */}
          {[
            { side: "left", icon: "chevron_left", label: "Previous slide" },
            { side: "right", icon: "chevron_right", label: "Next slide" },
          ].map(({ side, icon, label }) => (
            <div
              className="hero-arrow"
              key={side}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                [side]: 16,
                display: "flex",
                alignItems: "center",
                zIndex: 40,
              }}
            >
              <button
                aria-label={label}
                onClick={() => {
                  if (side === "left") {
                    moveHeroSlide(
                      (prev) =>
                        (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
                    );
                  } else {
                    moveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
                  }
                }}
                style={{
                  width: 56,
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  backdropFilter: "blur(4px)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 48,
                    color: "#fff",
                    userSelect: "none",
                  }}
                >
                  {icon}
                </span>
              </button>
            </div>
          ))}
        </section>

        {/* Problem Section */}
        <section
          className="problem-section"
          style={{ padding: "64px 0", background: "#fff" }}
        >
          <Reveal
            className="problem-copy"
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "0 24px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.pink,
                marginBottom: 16,
              }}
            >
              The Perfect Glow
            </span>
            <h2
              style={{
                fontFamily: C.serif,
                fontSize: "clamp(24px,3vw,32px)",
                fontWeight: 500,
                lineHeight: 1.3,
                marginBottom: 32,
                color: C.surface,
              }}
            >
              당신에게 맞는 컬러를 아직도 찾고 계신가요?
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: C.muted }}>
              트렌디한 색감과 뛰어난 발색을 위해
              <br />
              rom&nd는 피부 톤과 분위기에 가장 어울리는 맑은 컬러를 찾아줍니다.
              <br />
              시간이 지나도 탁해지지 않는, 당신만의 투명한 빛을 경험해보세요.
            </p>
          </Reveal>
        </section>

        {/* Features Grid */}
        <section
          id="third-section"
          className="features-section"
          ref={section3Ref}
          onPointerMove={addSection3TrailPoint}
          onPointerLeave={endSection3Trail}
          style={{
            padding: "64px 0 128px",
            background: "#fff",
            overflow: "hidden",
            position: "relative",
            scrollMarginTop: 80,
          }}
        >
          <canvas
            className="section3-trail"
            ref={section3TrailRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          <div
            className="features-container"
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "0 24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Section Label */}
            <Reveal style={{ marginBottom: 24 }}>
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#000",
                  borderLeft: `2px solid ${C.pink}`,
                  paddingLeft: 16,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Truly You
              </span>
              <p style={{ fontSize: 14, color: C.muted, marginTop: 8 }}>
                진정한 당신의 컬러를 찾아보세요
              </p>
            </Reveal>

            <div
              className="features-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12,1fr)",
                rowGap: 64,
                alignItems: "center",
              }}
            >
              {/* Product 1 + floating model image */}
              <Reveal
                className="product-reveal"
                delay={100}
                style={{
                  gridColumn: "1 / span 6",
                  position: "relative",
                }}
              >
                <div
                  className="product-one-layout"
                  style={{ position: "relative" }}
                >
                  <div
                    className="image-shalala product-one-floating product-square section3-image-frame section3-contain"
                    style={{
                      position: "absolute",
                      zIndex: 2,
                      borderRadius: 24,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                      top: 80,
                      left: "calc(100% + 60px)",
                    }}
                  >
                    <img
                      src={img1}
                      alt="Juicy Lasting Tint Mini"
                      className="section3-scroll-image"
                    />
                    <div
                      className="product-one-caption"
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: -80,
                        zIndex: 10,
                      }}
                    >
                      <h3 style={{ ...productLabelStyle, margin: 0 }}>
                        {PRODUCTS[0].label}
                      </h3>
                    </div>
                  </div>

                  <div
                    className="dewy-shadow product-hover product-image-frame image-shalala product-one-model"
                    onMouseEnter={() => setImg2Hovered(true)}
                    onMouseLeave={() => setImg2Hovered(false)}
                    style={{
                      zIndex: 1,
                      transform: "translateY(160px)",
                    }}
                  >
                    <img
                      src={img2Hovered ? change1 : img2}
                      alt="Romand model look"
                      className="section3-scroll-image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      className="scroll-labels"
                      style={{
                        position: "absolute",
                        bottom: 24,
                        left: -70,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 8,
                        fontFamily: C.serif,
                        fontSize: 28,
                        fontWeight: 600,
                        color: C.surface,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                      }}
                    >
                      {["#탱글", "# 12시간 지속력", "# 투명한 지속력"].map(
                        (label, index) => (
                          <span
                            key={label}
                            style={{
                              padding: "8px 16px",
                              background: "rgba(253, 197, 213, 0.4)",
                              boxShadow: "2px 3px 10px rgba(0,0,0,0.08)",
                              transform: `rotate(${index === 0 ? -1 : 1}deg)`,
                            }}
                          >
                            {label}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>

              <div
                className="features-spacer"
                style={{ gridColumn: "span 7" }}
              />

              {/* Product 2 */}
              <Reveal
                className="product-reveal"
                delay={300}
                onVisibilityChange={setPairedProductsVisible}
                style={{
                  gridColumn: "span 5",
                  position: "relative",
                  top: 180,
                }}
              >
                <div
                  className="dewy-shadow product-hover product-image-frame image-shalala"
                  style={{
                    zIndex: 1,
                  }}
                >
                  <img
                    src={img3}
                    alt="Romand skin texture"
                    className="section3-scroll-image"
                  />
                </div>
                <div
                  className="product-caption"
                  style={{
                    width: 500,
                    marginTop: 24,
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <h3
                    style={{
                      ...productLabelStyle,
                      margin: 0,
                    }}
                  >
                    # 앤드바이롬앤 멜로우 매트 쿠션
                  </h3>
                </div>
              </Reveal>

              {/* Product 3 */}
              <Reveal
                className="product-reveal"
                delay={300}
                visibleOverride={pairedProductsVisible}
                style={{ gridColumn: "1 / span 4" }}
              >
                <div style={{ transform: "translate(0, -370px)" }}>
                  <div
                    className="dewy-shadow product-hover image-shalala product-square section3-image-frame"
                    style={{
                      width: 500,
                      height: 500,
                      maxWidth: "none",
                      borderRadius: 16,
                    }}
                  >
                    <img
                      src={img4}
                      alt="Romand product"
                      className="section3-scroll-image"
                      style={{ borderRadius: 16 }}
                    />
                    <div
                      className="scroll-labels"
                      style={{
                        position: "absolute",
                        left: -70,
                        bottom: 24,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 8,
                        fontFamily: C.serif,
                        fontSize: 22,
                        fontWeight: 600,
                        color: C.surface,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                      }}
                    >
                      {[
                        "# 드라마틱한 변화",
                        "# 매끄러운 피부결",
                        "# 자연스러운 광채",
                      ].map((label, index) => (
                        <span
                          key={label}
                          style={{
                            padding: "8px 16px",
                            background: "rgba(253, 197, 213, 0.4)",
                            boxShadow: "2px 3px 10px rgba(0,0,0,0.08)",
                            transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                          }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Product 4 */}
              <Reveal
                className="product-reveal"
                delay={500}
                onVisibilityChange={setThirdRowVisible}
                style={{ gridColumn: "7 / span 6", justifySelf: "end" }}
              >
                <div style={{ marginTop: 140 }}>
                  <div className="dewy-shadow product-hover product-image-frame image-shalala section3-contain">
                    <img
                      src={img5}
                      alt="Romand cheek product"
                      className="section3-scroll-image"
                    />
                  </div>
                  <div
                    className="product-caption"
                    style={{
                      width: 500,
                      marginTop: 24,
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        padding: "12px 24px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        transform: "rotate(-1deg)",
                        marginBottom: 12,
                        background: C.pinkLight,
                        clipPath:
                          "polygon(0% 0%, 100% 0%, 100% 95%, 98% 100%, 95% 96%, 92% 100%, 88% 97%, 85% 100%, 80% 95%, 75% 100%, 70% 96%, 65% 100%, 60% 95%, 55% 100%, 50% 96%, 45% 100%, 40% 95%, 35% 100%, 30% 96%, 25% 100%, 20% 95%, 15% 100%, 10% 96%, 5% 100%, 0% 95%)",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: C.serif,
                          fontSize: 24,
                          fontWeight: 500,
                          color: "#000",
                        }}
                      >
                        {PRODUCTS[3].label}
                      </h3>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Product 5 */}
              <Reveal
                className="product-reveal"
                delay={500}
                visibleOverride={thirdRowVisible}
                style={{ gridColumn: "1 / span 7" }}
              >
                <div style={{ transform: "translateY(-330px)" }}>
                  <div
                    className="dewy-shadow product-hover image-shalala product-square section3-image-frame"
                    style={{
                      borderRadius: 12,
                    }}
                  >
                    <img
                      src={img6}
                      alt="Romand glowing skin"
                      className="section3-scroll-image"
                    />
                    <div
                      className="scroll-labels"
                      style={{
                        position: "absolute",
                        left: -70,
                        bottom: 24,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 8,
                        fontFamily: C.serif,
                        fontSize: 24,
                        fontWeight: 700,
                        color: C.surface,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                      }}
                    >
                      {[
                        "# 양볼 가득 햇살 담아",
                        "# 투명하게 물드는 생기 있는 발색",
                      ].map((label) => (
                        <span
                          key={label}
                          style={{
                            padding: "8px 16px",
                            background: "rgba(253, 197, 213, 0.4)",
                            boxShadow: "2px 3px 10px rgba(0,0,0,0.08)",
                          }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section
          id="fourth-section"
          className="reviews-section"
          style={{
            padding: "64px 0 160px",
            background: "#FFF5F7",
            scrollMarginTop: 80,
          }}
        >
          <div
            className="reviews-container"
            style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
          >
            <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <Stars size={24} />
              </div>
              <h2
                style={{
                  fontFamily: C.serif,
                  fontSize: "clamp(24px,3vw,32px)",
                  fontWeight: 500,
                  marginBottom: 16,
                  color: C.surface,
                }}
              >
                4.9 / 5.0 (누적 후기 1,200+개)
              </h2>
              <p style={{ fontSize: 18, color: C.muted }}>
                실제 구매 고객들의 솔직한 후기를 확인해보세요.
              </p>
            </Reveal>

            <div
              className="reviews-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {REVIEWS.map((r, i) => (
                <Reveal
                  key={i}
                  delay={r.delay}
                  style={{
                    background: "#fff",
                    padding: 32,
                    borderRadius: 16,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                  className="dewy-shadow review-card"
                >
                  <Stars size={20} />
                  <button
                    type="button"
                    onClick={() => setSelectedReviewIndex(i)}
                    style={{
                      alignSelf: "flex-start",
                      marginBottom: 16,
                      padding: "7px 12px",
                      borderRadius: 9999,
                      background: C.pinkLight,
                      color: C.primary,
                      fontSize: 14,
                      fontFamily: C.sans,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    구매 상품 · {r.productName}
                  </button>
                  <h4
                    style={{
                      fontFamily: C.serif,
                      fontSize: 20,
                      fontWeight: 500,
                      marginBottom: 16,
                      color: C.surface,
                    }}
                  >
                    {r.quote}
                  </h4>
                  <p
                    style={{
                      flexGrow: 1,
                      fontStyle: "italic",
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: C.muted,
                      marginBottom: 24,
                    }}
                  >
                    {r.body}
                  </p>
                  <div
                    style={{
                      paddingTop: 24,
                      borderTop: `1px solid ${C.border}`,
                      textAlign: "right",
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: C.surface,
                    }}
                  >
                    {r.author}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Social Gallery */}
      <section
        id="fifth-section"
        className="social-section"
        style={{
          padding: "120px 0 64px",
          background: "#fff",
          scrollMarginTop: 80,
        }}
      >
        <div
          className="social-container"
          style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
        >
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: C.serif,
                fontSize: "clamp(24px,3vw,32px)",
                fontWeight: 500,
                color: C.surface,
              }}
            >
              with #rom&nd
            </h2>
          </div>
          <div style={{ position: "relative" }}>
            <div
              ref={socialGalleryRef}
              className="scrollbar-hide"
              style={{
                display: "flex",
                overflowX: "auto",
                paddingBottom: 32,
                gap: 16,
              }}
            >
              {LOOPED_SOCIAL_IMGS.map((src, i) => (
                <div
                  className="social-card"
                  key={i}
                  style={{
                    flexShrink: 0,
                    width: "clamp(280px,30vw,350px)",
                    aspectRatio: "3/4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: 16,
                  }}
                >
                  <button
                    type="button"
                    className="social-image-button"
                    aria-label={`Enlarge rom&nd look ${
                      (i % SOCIAL_IMGS.length) + 1
                    }`}
                    onClick={() => openSocialImage(i)}
                  >
                    <img
                      src={src}
                      alt={`rom&nd look ${(i % SOCIAL_IMGS.length) + 1}`}
                      className="dewy-shadow"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>
            {[
              { direction: -1, side: "left", icon: "chevron_left" },
              { direction: 1, side: "right", icon: "chevron_right" },
            ].map(({ direction, side, icon }) => (
              <button
                className={`social-arrow social-arrow-${side}`}
                key={side}
                aria-label={`${side} social image`}
                onClick={() => scrollSocialGallery(direction)}
                style={{
                  position: "absolute",
                  top: "50%",
                  [side]: -24,
                  transform: "translateY(-50%)",
                  width: 56,
                  height: 56,
                  border: "none",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                  color: "#000",
                  cursor: "pointer",
                  zIndex: 2,
                }}
              >
                <span className="material-symbols-outlined">{icon}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="site-footer"
        style={{
          padding: "48px 0",
          borderTop: `1px solid ${C.border}`,
          background: "#fff",
        }}
      >
        <div
          className="footer-inner"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div className="footer-brand">
            <div
              className="footer-logo"
              style={{
                fontFamily: C.serif,
                fontSize: 32,
                fontWeight: 500,
                marginBottom: 16,
                color: C.surface,
              }}
            >
              rom&nd
            </div>
            <p
              className="footer-copy"
              style={{ fontSize: 16, color: C.muted, maxWidth: 384 }}
            >
              (c) 2024 rom&nd. All rights reserved.
              <br />
              Designed for your luminous glow.
            </p>
          </div>
          <div
            className="footer-links"
            style={{ display: "flex", flexWrap: "wrap", gap: "8px 32px" }}
          >
            {FOOTER_LINKS.map((link, index) => (
              <a
                key={link.label}
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setSelectedFooterIndex(index);
                }}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C.muted,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = C.primary)
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = C.muted)
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
