"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const navigation = [
  ["Проблемы", "problems"],
  ["AI-агенты", "agents"],
  ["Этапы", "process"],
  ["Услуги", "services"],
  ["Кейсы", "cases"],
  ["Калькулятор", "calculator"],
  ["Контакты", "contacts"],
] as const;

const problems = [
  {
    number: "01",
    icon: "TIME",
    title: "Освобождение времени менеджеров",
    text: "ИИ берёт на себя рутинные задачи, позволяя команде сосредоточиться на стратегии и росте.",
    points: [
      "Автоматический сбор и обработка данных",
      "Генерация отчётов и документов",
      "Планирование встреч и управление календарём",
      "До 70% меньше операционной рутины",
    ],
  },
  {
    number: "02",
    icon: "LEAD",
    title: "Эффективная обработка лидов",
    text: "ИИ систематизирует обращения и не даёт заявкам потеряться в переписках и таблицах.",
    points: [
      "Классификация лидов в реальном времени",
      "Персонализированные ответы",
      "Интеграция с CRM и системами учёта",
      "До 40% роста конверсии",
    ],
  },
  {
    number: "03",
    icon: "DATA",
    title: "Аналитика для точных решений",
    text: "Вместо работы вслепую — прогнозы, метрики и обнаружение отклонений в одном потоке.",
    points: [
      "Прогнозная аналитика и модели",
      "Автоматические KPI-дашборды",
      "Детекция аномалий и трендов",
      "До 80% быстрее анализ данных",
    ],
  },
];

const agents = [
  {
    code: "MKT",
    title: "Marketing-агент",
    text: "Кампании, сегментация, контент, ROI и A/B-тесты.",
    index: "01",
  },
  {
    code: "FIN",
    title: "Finance-агент",
    text: "Платежи, бюджетирование, P&L, прогнозы и контроль рисков.",
    index: "02",
  },
  {
    code: "SUP",
    title: "Support-агент",
    text: "Тикеты, FAQ, обратная связь и эскалация сложных запросов.",
    index: "03",
  },
  {
    code: "HR",
    title: "HR-агент",
    text: "Скрининг резюме, интервью, онбординг и оценка KPI.",
    index: "04",
  },
  {
    code: "SLS",
    title: "Sales-агент",
    text: "Квалификация лидов, CRM, прогноз продаж и следующие действия.",
    index: "05",
  },
  {
    code: "BI",
    title: "BI-агент",
    text: "Отчёты, интерактивные дашборды, тренды и алерты.",
    index: "06",
  },
];

const steps = [
  {
    number: "01",
    title: "Анализ процессов",
    text: "Изучаем текущие процессы, находим точки автоматизации и фиксируем измеримые KPI.",
  },
  {
    number: "02",
    title: "Настройка агента",
    text: "Создаём агента под ваши задачи и соединяем его с существующими системами.",
  },
  {
    number: "03",
    title: "Тестирование",
    text: "Запускаем пилот на ограниченном наборе задач и собираем обратную связь команды.",
  },
  {
    number: "04",
    title: "Запуск и поддержка",
    text: "Масштабируем решение, обучаем сотрудников, ведём мониторинг и SLA-поддержку.",
  },
];

const services = [
  {
    number: "01 / 03",
    label: "SOFTWARE + AI",
    title: "Разработка ПО и ИИ-решений",
    text: "Создание интеллектуальных цифровых продуктов и автоматизация бизнес-логики.",
    points: [
      "Автономные ИИ-агенты для документов и процессов",
      "ИИ-боты для Telegram и мессенджеров",
      "АСУ ТП, прошивки и протоколы обмена",
      "Индивидуальные CRM и корпоративные системы",
    ],
  },
  {
    number: "02 / 03",
    label: "EMBEDDED SYSTEMS",
    title: "Встраиваемые системы и ПАК",
    text: "Программно-аппаратные комплексы, которые соединяют цифровую логику с физической средой.",
    points: [
      "Информационные панели и электронные очереди",
      "Терминалы самообслуживания и табло",
      "Устройства под специализированные задачи",
      "Интеграция с производственным оборудованием",
    ],
  },
  {
    number: "03 / 03",
    label: "CLOUD + DEVOPS",
    title: "Сопровождение и облачная инфраструктура",
    text: "Надёжная, масштабируемая и защищённая среда для критичных систем.",
    points: [
      "DevOps, CI/CD и мониторинг",
      "Миграция в Yandex Cloud, Selectel и VK",
      "HighLoad, CDN и автоматическое масштабирование",
      "DDoS-защита, резервирование и SLA 24/7",
    ],
  },
];

const cases = [
  {
    number: "CASE 01",
    title: "Оптимизация обработки заказов",
    text: "AI-агент взял на себя квалификацию и рутинную обработку входящих заявок.",
    metric: "+60%",
    metricLabel: "к конверсии",
    tone: "case-card--accent",
  },
  {
    number: "CASE 02",
    title: "Анализ данных для маркетинга",
    text: "Система объединила большие объёмы потребительских данных и автоматизировала поиск инсайтов.",
    metric: "−70%",
    metricLabel: "времени команды",
    tone: "case-card--light",
  },
  {
    number: "CASE 03",
    title: "Управление запасами",
    text: "Прогнозирование спроса помогло оптимизировать запасы и снизить количество ручных операций.",
    metric: "24/7",
    metricLabel: "контроль данных",
    tone: "case-card--dark",
  },
];

const calculatorProcesses = [
  {
    id: "documents",
    code: "DOC",
    label: "Документы",
    automation: [0.55, 0.75],
    realization: [0.65, 0.82],
    basePrice: 290_000,
  },
  {
    id: "support",
    code: "SUP",
    label: "Поддержка",
    automation: [0.45, 0.7],
    realization: [0.62, 0.8],
    basePrice: 360_000,
  },
  {
    id: "sales",
    code: "SLS",
    label: "Продажи",
    automation: [0.35, 0.55],
    realization: [0.55, 0.75],
    basePrice: 430_000,
  },
  {
    id: "analytics",
    code: "BI",
    label: "Аналитика",
    automation: [0.4, 0.6],
    realization: [0.58, 0.76],
    basePrice: 520_000,
  },
  {
    id: "backoffice",
    code: "OPS",
    label: "Back-office",
    automation: [0.45, 0.65],
    realization: [0.6, 0.78],
    basePrice: 390_000,
  },
] as const;

const calculatorScopes = [
  {
    id: "pilot",
    label: "Пилот",
    caption: "1 процесс",
    factor: 1,
    duration: "4–8 недель",
  },
  {
    id: "department",
    label: "Отдел",
    caption: "2–4 процесса",
    factor: 2.15,
    duration: "2–4 месяца",
  },
  {
    id: "company",
    label: "Компания",
    caption: "несколько отделов",
    factor: 5.2,
    duration: "3–6 месяцев",
  },
] as const;

const calculatorIntegrationOptions = [
  {
    value: 0,
    label: "Без интеграций",
    caption: "автономный пилот",
  },
  {
    value: 2,
    label: "1–2 системы",
    caption: "CRM / 1С / API",
  },
  {
    value: 4,
    label: "3–5 систем",
    caption: "сложный контур",
  },
] as const;

type CalculatorProcessId = (typeof calculatorProcesses)[number]["id"];
type CalculatorScopeId = (typeof calculatorScopes)[number]["id"];
type CalculatorMode = "savings" | "cost";

const decimalFormatter = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 1,
});

function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

function formatCompactRubles(value: number) {
  if (value >= 1_000_000) {
    return `${decimalFormatter.format(value / 1_000_000)} млн ₽`;
  }

  return `${Math.round(value / 1_000)} тыс. ₽`;
}

function getRangeStyle(value: number, min: number, max: number) {
  return {
    "--range-progress": `${((value - min) / (max - min)) * 100}%`,
  } as CSSProperties;
}

type CalculatorRangeProps = {
  id: string;
  index: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  minLabel: string;
  maxLabel: string;
  onChange: (value: number) => void;
};

function CalculatorRange({
  id,
  index,
  label,
  value,
  min,
  max,
  step,
  displayValue,
  minLabel,
  maxLabel,
  onChange,
}: CalculatorRangeProps) {
  return (
    <label className="calculator-control" htmlFor={id}>
      <span className="calculator-control__label">
        <span>{index}</span>
        {label}
      </span>
      <output>{displayValue}</output>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={displayValue}
        style={getRangeStyle(value, min, max)}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span className="calculator-control__scale" aria-hidden="true">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </span>
    </label>
  );
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [calculatorMode, setCalculatorMode] =
    useState<CalculatorMode>("savings");
  const [calculatorProcess, setCalculatorProcess] =
    useState<CalculatorProcessId>("documents");
  const [calculatorScope, setCalculatorScope] =
    useState<CalculatorScopeId>("department");
  const [calculatorEmployees, setCalculatorEmployees] = useState(10);
  const [calculatorSalary, setCalculatorSalary] = useState(100_000);
  const [calculatorRoutineHours, setCalculatorRoutineHours] = useState(14);
  const [calculatorIntegrations, setCalculatorIntegrations] = useState(2);

  const activeCalculatorProcess =
    calculatorProcesses.find((process) => process.id === calculatorProcess) ??
    calculatorProcesses[0];
  const activeCalculatorScope =
    calculatorScopes.find((scope) => scope.id === calculatorScope) ??
    calculatorScopes[1];

  const routineShare = calculatorRoutineHours / 40;
  const monthlySavingsLowRaw =
    calculatorEmployees *
    calculatorSalary *
    1.15 *
    routineShare *
    activeCalculatorProcess.automation[0] *
    activeCalculatorProcess.realization[0];
  const monthlySavingsHighRaw =
    calculatorEmployees *
    calculatorSalary *
    1.3 *
    routineShare *
    activeCalculatorProcess.automation[1] *
    activeCalculatorProcess.realization[1];
  const monthlySavingsCap =
    calculatorEmployees * calculatorSalary * 1.3 * 0.55;
  const monthlySavingsLow = roundTo(
    Math.min(monthlySavingsLowRaw, monthlySavingsCap),
    10_000,
  );
  const monthlySavingsHigh = Math.max(
    monthlySavingsLow,
    roundTo(Math.min(monthlySavingsHighRaw, monthlySavingsCap), 10_000),
  );
  const monthlySavings = roundTo(
    (monthlySavingsLow + monthlySavingsHigh) / 2,
    10_000,
  );
  const annualSavings = roundTo(monthlySavings * 12, 100_000);
  const freedHours = Math.round(
    calculatorEmployees *
      calculatorRoutineHours *
      4.33 *
      ((activeCalculatorProcess.automation[0] +
        activeCalculatorProcess.automation[1]) /
        2) *
      ((activeCalculatorProcess.realization[0] +
        activeCalculatorProcess.realization[1]) /
        2),
  );
  const implementationMid =
    (activeCalculatorProcess.basePrice * activeCalculatorScope.factor +
      calculatorIntegrations * 85_000);
  const implementationLow = roundTo(implementationMid * 0.82, 50_000);
  const implementationHigh = roundTo(implementationMid * 1.22, 50_000);
  const supportEstimate = roundTo(
    Math.max(30_000, implementationMid * 0.045),
    10_000,
  );
  const calculatorProgress =
    calculatorMode === "savings"
      ? (activeCalculatorProcess.automation[0] +
          activeCalculatorProcess.automation[1]) /
        2
      : calculatorScope === "pilot"
        ? 0.38
        : calculatorScope === "department"
          ? 0.66
          : 0.9;
  const calculatorDisplayStyle = {
    "--calculator-angle": `${calculatorProgress * 360}deg`,
  } as CSSProperties;

  const goToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const stopLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!root.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let lenis: Lenis | null = null;
    const ticker = (time: number) => lenis?.raf(time * 1000);

    if (!reducedMotion) {
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.1,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      gsap.set(".hero__next", { y: 48, autoAlpha: 0 });

      if (!reducedMotion) {
        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.15,
          },
        });

        heroTimeline
          .to(
            ".hero__title-line--one",
            { xPercent: -8, ease: "none" },
            0,
          )
          .to(
            ".hero__title-line--two",
            { xPercent: 7, ease: "none" },
            0,
          )
          .to(
            ".hero__title-line--three",
            { xPercent: -5, ease: "none" },
            0,
          )
          .to(
            ".hero__core",
            {
              yPercent: -10,
              rotation: 4,
              scale: 1.08,
              ease: "power1.inOut",
            },
            0,
          )
          .to(
            ".hero__side-copy, .hero__metrics, .hero__eyebrow",
            {
              autoAlpha: 0,
              y: -36,
              duration: 0.18,
              ease: "power2.in",
            },
            0.24,
          )
          .to(
            ".hero__stage",
            {
              backgroundColor: "#11110f",
              duration: 0.2,
              ease: "none",
            },
            0.28,
          )
          .to(
            ".hero__title, .hero__scroll, .hero__coordinate",
            { color: "#f0efe9", duration: 0.2, ease: "none" },
            0.28,
          )
          .to(
            ".hero__grid",
            {
              opacity: 0.12,
              filter: "invert(1)",
              duration: 0.2,
              ease: "none",
            },
            0.28,
          )
          .to(
            ".hero__core-card",
            {
              borderColor: "rgba(240,239,233,.28)",
              backgroundColor: "#1b1b18",
              duration: 0.2,
              ease: "none",
            },
            0.31,
          )
          .to(
            ".hero__orb",
            {
              scale: 1.32,
              rotation: 145,
              duration: 0.38,
              ease: "power2.inOut",
            },
            0.3,
          )
          .to(
            ".hero__title",
            {
              autoAlpha: 0,
              scale: 1.035,
              yPercent: -5,
              filter: "blur(12px)",
              duration: 0.16,
              ease: "power2.in",
            },
            0.42,
          )
          .to(
            ".hero__next",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.2,
              ease: "power3.out",
            },
            0.59,
          )
          .to(
            ".hero__core",
            {
              yPercent: 4,
              rotation: -2,
              scale: 0.92,
              duration: 0.28,
              ease: "power2.inOut",
            },
            0.7,
          );

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
          gsap.fromTo(
            item,
            { y: 70, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

        gsap.utils
          .toArray<HTMLElement>(".problem-card")
          .forEach((card, index) => {
            gsap.fromTo(
              card,
              { y: 70 + index * 22, rotate: index % 2 ? 1.8 : -1.8 },
              {
                y: 0,
                rotate: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "top 56%",
                  scrub: 0.7,
                },
              },
            );
          });

        gsap.utils.toArray<HTMLElement>(".agent-card").forEach((card) => {
          const mark = card.querySelector(".agent-card__mark");
          gsap.to(mark, {
            rotation: 180,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        media.add("(min-width: 900px)", () => {
          const track = document.querySelector<HTMLElement>(".services__track");
          const section = document.querySelector<HTMLElement>(".services");
          if (!track || !section) return;

          const travel = () =>
            Math.max(0, track.scrollWidth - window.innerWidth + 72);

          gsap.to(track, {
            x: () => -travel(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${travel() + window.innerHeight * 0.65}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
          gsap.fromTo(
            step,
            { opacity: 0.28 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: step,
                start: "top 62%",
                end: "bottom 42%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });

      } else {
        gsap.set(".hero__next", { y: 0, autoAlpha: 0 });
        gsap.set("[data-reveal]", { y: 0, opacity: 1 });
      }

      ScrollTrigger.refresh();
    }, root);

    return () => {
      media.revert();
      context.revert();
      gsap.ticker.remove(ticker);
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-menu-open", menuOpen);
    return () => document.body.classList.remove("is-menu-open");
  }, [menuOpen]);

  return (
    <main className="page" ref={root}>
      <header className="header">
        <a
          className="header__logo"
          href="#!"
          onClick={(event) => goToSection(event, "top")}
          aria-label="INTER INSITE — наверх"
        >
          <span>INTER</span>
          <span>INSITE®</span>
        </a>

        <button
          className="header__menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="header__menu-label">
            {menuOpen ? "Закрыть" : "Меню"}
          </span>
          <span className="header__menu-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>

        <a className="header__cta" href="#!" onClick={stopLink}>
          Бесплатный аудит
          <ArrowIcon />
        </a>
      </header>

      <div
        className={`menu ${menuOpen ? "menu--open" : ""}`}
        id="main-menu"
        aria-hidden={!menuOpen}
      >
        <div className="menu__noise" />
        <nav className="menu__nav" aria-label="Основная навигация">
          {navigation.map(([label, id], index) => (
            <a
              className="menu__link"
              href="#!"
              onClick={(event) => goToSection(event, id)}
              key={id}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {label}
              <ArrowIcon />
            </a>
          ))}
        </nav>
        <div className="menu__footer">
          <span>Екатеринбург / Россия</span>
          <a href="#!" onClick={stopLink} tabIndex={menuOpen ? 0 : -1}>
            it@interinsite.com
          </a>
        </div>
      </div>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero__stage">
          <div className="hero__grid" />
          <div className="hero__coordinate hero__coordinate--left">
            56.8389° N
          </div>
          <div className="hero__coordinate hero__coordinate--right">
            60.6057° E
          </div>

          <p className="hero__eyebrow">
            Инженерная IT-компания
            <span>Екатеринбург / 2026</span>
          </p>

          <h1 className="hero__title" id="hero-title">
            <span className="hero__title-line hero__title-line--one">
              AI <i>&amp;</i>
            </span>
            <span className="hero__title-line hero__title-line--two">
              Автоматизация
            </span>
            <span className="hero__title-line hero__title-line--three">
              для бизнеса
            </span>
          </h1>

          <div className="hero__core" aria-hidden="true">
            <div className="hero__core-card">
              <span className="hero__core-index">AI / 01</span>
              <span className="hero__core-status">SYSTEM ONLINE</span>
              <div className="hero__orb">
                <i className="hero__orb-ring hero__orb-ring--one" />
                <i className="hero__orb-ring hero__orb-ring--two" />
                <i className="hero__orb-ring hero__orb-ring--three" />
                <b>AI</b>
              </div>
              <div className="hero__core-lines">
                <i />
                <i />
                <i />
                <i />
              </div>
              <span className="hero__core-caption">
                BUSINESS
                <br />
                INTELLIGENCE
              </span>
            </div>
          </div>

          <div className="hero__side-copy">
            <p>
              Внедряем AI-системы, которые снижают нагрузку на отдел продаж и
              поддержки на 30–70% за 30–90 дней.
            </p>
            <a className="button button--dark" href="#!" onClick={stopLink}>
              Получить аудит
              <ArrowIcon />
            </a>
          </div>

          <div className="hero__metrics" aria-label="Ключевые показатели">
            <div className="metric-chip metric-chip--one">
              <strong>30–70%</strong>
              <span>меньше рутины</span>
            </div>
            <div className="metric-chip metric-chip--two">
              <strong>30–90</strong>
              <span>дней до запуска</span>
            </div>
            <div className="metric-chip metric-chip--three">
              <strong>0 ₽</strong>
              <span>аудит процессов</span>
            </div>
          </div>

          <div className="hero__next">
            <span className="hero__next-kicker">AI-системы для бизнеса</span>
            <strong>
              ИИ берёт рутину.
              <br />
              Вы растёте.
            </strong>
            <p>
              Автоматизируем продажи, поддержку, документы и аналитику с
              измеримым эффектом за 30–90 дней.
            </p>
            <a
              className="button hero__next-button"
              href="#!"
              onClick={(event) => goToSection(event, "calculator")}
            >
              Рассчитать эффект
              <ArrowIcon />
            </a>
          </div>

          <div className="hero__scroll">
            <span>Scroll to explore</span>
            <i />
          </div>
        </div>
      </section>

      <section className="intro section section--dark" aria-label="О компании">
        <div className="section__label" data-reveal>
          <span>01</span>
          Разработка и внедрение
        </div>
        <div className="intro__body">
          <p className="intro__kicker" data-reveal>
            INTER INSITE / AI SYSTEMS
          </p>
          <h2 className="intro__title" data-reveal>
            Автоматизация,
            <br />
            которая меняет
            <br />
            <em>подход к работе.</em>
          </h2>
          <div className="intro__details" data-reveal>
            <p>
              Аудитируем процессы за 30 минут и показываем, где AI реально
              экономит деньги и время — без абстрактных обещаний.
            </p>
            <div className="intro__fact-grid">
              <div>
                <strong>290K</strong>
                <span>от этой суммы внедрение</span>
              </div>
              <div>
                <strong>1–3</strong>
                <span>месяца до окупаемости</span>
              </div>
              <div>
                <strong>3–5</strong>
                <span>сотрудников заменяет агент</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="problems section section--light"
        id="problems"
        aria-labelledby="problems-title"
      >
        <div className="section__head">
          <div className="section__label" data-reveal>
            <span>02</span>
            Проблемы и решения
          </div>
          <h2 className="section__title" id="problems-title" data-reveal>
            Где бизнес
            <br />
            теряет ресурс
          </h2>
          <p className="section__lead" data-reveal>
            Три типовых сценария, в которых ИИ быстрее всего даёт измеримый
            эффект.
          </p>
        </div>

        <div className="problems__grid">
          {problems.map((problem) => (
            <article className="problem-card" key={problem.number}>
              <div className="problem-card__top">
                <span className="problem-card__number">{problem.number}</span>
                <span className="problem-card__icon">{problem.icon}</span>
              </div>
              <h3 className="problem-card__title">{problem.title}</h3>
              <p className="problem-card__text">{problem.text}</p>
              <ul className="problem-card__list">
                {problem.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <a
                className="problem-card__link"
                href="#!"
                onClick={stopLink}
              >
                Провести аудит
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        className="agents section section--dark"
        id="agents"
        aria-labelledby="agents-title"
      >
        <div className="agents__marquee" aria-hidden="true">
          <div className="marquee__track marquee__track--agents">
            <span className="marquee__group">
              AI-АВТОМАТИЗАЦИЯ — БИЗНЕС-ПРОЦЕССЫ — УМНЫЕ АГЕНТЫ — ДАННЫЕ И
              АНАЛИТИКА —
            </span>
            <span className="marquee__group">
              AI-АВТОМАТИЗАЦИЯ — БИЗНЕС-ПРОЦЕССЫ — УМНЫЕ АГЕНТЫ — ДАННЫЕ И
              АНАЛИТИКА —
            </span>
          </div>
        </div>
        <div className="section__head section__head--dark">
          <div className="section__label" data-reveal>
            <span>03</span>
            Типы агентов
          </div>
          <h2 className="section__title" id="agents-title" data-reveal>
            Цифровая команда
            <br />
            для каждого отдела
          </h2>
        </div>

        <div className="agents__grid">
          {agents.map((agent) => (
            <article className="agent-card" key={agent.code} data-reveal>
              <div className="agent-card__head">
                <span>{agent.index}</span>
                <i className="agent-card__mark" aria-hidden="true" />
              </div>
              <div className="agent-card__code">{agent.code}</div>
              <h3 className="agent-card__title">{agent.title}</h3>
              <p className="agent-card__text">{agent.text}</p>
              <div className="agent-card__actions">
                <a href="#!" onClick={stopLink}>
                  Попробовать <ArrowIcon />
                </a>
                <a href="#!" onClick={stopLink}>
                  Связаться
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="process section section--light"
        id="process"
        aria-labelledby="process-title"
      >
        <div className="process__sticky">
          <div className="section__label" data-reveal>
            <span>04</span>
            Как это работает
          </div>
          <h2 className="process__title" id="process-title" data-reveal>
            4 шага
            <br />
            до запуска
          </h2>
          <p className="process__caption" data-reveal>
            От первого аудита до стабильной работы в вашей инфраструктуре.
          </p>
        </div>
        <div className="process__steps">
          {steps.map((step) => (
            <article className="process-step" key={step.number}>
              <span className="process-step__number">{step.number}</span>
              <div className="process-step__content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <span className="process-step__dot" aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section
        className="services section section--dark"
        id="services"
        aria-labelledby="services-title"
      >
        <div className="services__track">
          <div className="services__intro">
            <div className="section__label">
              <span>05</span>
              Наши услуги
            </div>
            <h2 className="services__title" id="services-title">
              Сложные системы.
              <br />
              Ясный результат.
            </h2>
            <p>
              Комплексные решения для автоматизации, ИИ, облачной
              инфраструктуры и безопасности.
            </p>
            <span className="services__drag">Scroll / Drag →</span>
          </div>

          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-card__visual" aria-hidden="true">
                <span>{service.label}</span>
                <div className="service-card__shape">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="service-card__body">
                <span className="service-card__number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="service-card__links">
                  <a href="#!" onClick={stopLink}>
                    Подробнее <ArrowIcon />
                  </a>
                  <a href="#!" onClick={stopLink}>
                    Связаться
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="cases section section--light"
        id="cases"
        aria-labelledby="cases-title"
      >
        <div className="section__head cases__head">
          <div className="section__label" data-reveal>
            <span>06</span>
            Наши кейсы
          </div>
          <h2 className="section__title" id="cases-title" data-reveal>
            Измеримый эффект,
            <br />
            а не просто AI
          </h2>
          <p className="section__lead" data-reveal>
            Задача, рабочая система и цифры, по которым можно проверить
            результат.
          </p>
        </div>

        <div className="cases__stack">
          {cases.map((caseItem) => (
            <article
              className={`case-card ${caseItem.tone}`}
              key={caseItem.number}
            >
              <div className="case-card__meta">
                <span>{caseItem.number}</span>
                <span>INTER INSITE® / 2026</span>
              </div>
              <div className="case-card__content">
                <h3>{caseItem.title}</h3>
                <p>{caseItem.text}</p>
                <a href="#!" onClick={stopLink}>
                  Смотреть кейс <ArrowIcon />
                </a>
              </div>
              <div className="case-card__metric">
                <strong>{caseItem.metric}</strong>
                <span>{caseItem.metricLabel}</span>
              </div>
              <div className="case-card__mesh" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="calculator section section--dark"
        id="calculator"
        aria-labelledby="calculator-title"
      >
        <div className="calculator__head">
          <div className="section__label" data-reveal>
            <span>07</span>
            Онлайн-калькулятор
          </div>
          <h2 id="calculator-title" data-reveal>
            Рассчитайте эффект
            <br />
            и бюджет
          </h2>
          <p data-reveal>
            Выберите, что хотите оценить. Калькулятор покажет ориентировочный
            диапазон без заявки и регистрации.
          </p>
        </div>

        <div className="calculator__shell" data-reveal>
          <div
            className="calculator__mode-switch"
            role="tablist"
            aria-label="Режим расчёта"
          >
            <button
              className={
                calculatorMode === "savings"
                  ? "calculator-mode calculator-mode--active"
                  : "calculator-mode"
              }
              type="button"
              role="tab"
              aria-selected={calculatorMode === "savings"}
              onClick={() => setCalculatorMode("savings")}
            >
              <span>01</span>
              <strong>Экономия после автоматизации</strong>
              <small>Сколько бизнес может экономить каждый месяц</small>
            </button>
            <button
              className={
                calculatorMode === "cost"
                  ? "calculator-mode calculator-mode--active"
                  : "calculator-mode"
              }
              type="button"
              role="tab"
              aria-selected={calculatorMode === "cost"}
              onClick={() => setCalculatorMode("cost")}
            >
              <span>02</span>
              <strong>Стоимость внедрения ИИ</strong>
              <small>Примерный бюджет и срок запуска проекта</small>
            </button>
          </div>

          <form
            className="calculator__controls"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="calculator__console-head">
              <span>
                {calculatorMode === "savings"
                  ? "Экономия / параметры"
                  : "Стоимость / параметры"}
              </span>
              <span>LIVE ESTIMATE</span>
            </div>

            <fieldset className="calculator__processes">
              <legend>Что автоматизируем</legend>
              <div>
                {calculatorProcesses.map((process, index) => (
                  <button
                    className={
                      calculatorProcess === process.id
                        ? "calculator-option calculator-option--active"
                        : "calculator-option"
                    }
                    type="button"
                    aria-pressed={calculatorProcess === process.id}
                    onClick={() => setCalculatorProcess(process.id)}
                    key={process.id}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{process.code}</strong>
                    <small>{process.label}</small>
                  </button>
                ))}
              </div>
            </fieldset>

            {calculatorMode === "savings" ? (
              <div className="calculator__fields">
                <CalculatorRange
                  id="calculator-employees"
                  index="01"
                  label="Сотрудников в процессе"
                  value={calculatorEmployees}
                  min={1}
                  max={100}
                  step={1}
                  displayValue={`${calculatorEmployees} чел.`}
                  minLabel="1"
                  maxLabel="100"
                  onChange={setCalculatorEmployees}
                />
                <CalculatorRange
                  id="calculator-salary"
                  index="02"
                  label="Средняя зарплата / месяц"
                  value={calculatorSalary}
                  min={40_000}
                  max={300_000}
                  step={5_000}
                  displayValue={formatCompactRubles(calculatorSalary)}
                  minLabel="40 тыс."
                  maxLabel="300 тыс."
                  onChange={setCalculatorSalary}
                />
                <CalculatorRange
                  id="calculator-routine"
                  index="03"
                  label="Часов рутины / неделю"
                  value={calculatorRoutineHours}
                  min={2}
                  max={30}
                  step={1}
                  displayValue={`${calculatorRoutineHours} ч`}
                  minLabel="2 ч"
                  maxLabel="30 ч"
                  onChange={setCalculatorRoutineHours}
                />
              </div>
            ) : (
              <div className="calculator__cost-fields">
                <fieldset className="calculator__scope">
                  <legend>Масштаб внедрения</legend>
                  <div>
                    {calculatorScopes.map((scope) => (
                      <button
                        className={
                          calculatorScope === scope.id
                            ? "calculator-scope calculator-scope--active"
                            : "calculator-scope"
                        }
                        type="button"
                        aria-pressed={calculatorScope === scope.id}
                        onClick={() => setCalculatorScope(scope.id)}
                        key={scope.id}
                      >
                        <strong>{scope.label}</strong>
                        <span>{scope.caption}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="calculator__integrations">
                  <legend>Подключения к системам</legend>
                  <div>
                    {calculatorIntegrationOptions.map((option) => (
                      <button
                        className={
                          calculatorIntegrations === option.value
                            ? "calculator-scope calculator-scope--active"
                            : "calculator-scope"
                        }
                        type="button"
                        aria-pressed={
                          calculatorIntegrations === option.value
                        }
                        onClick={() =>
                          setCalculatorIntegrations(option.value)
                        }
                        key={option.value}
                      >
                        <strong>{option.label}</strong>
                        <span>{option.caption}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            <p className="calculator__controls-note">
              {calculatorMode === "savings"
                ? "Расчёт показывает стоимость высвобождённого времени. Фактический эффект зависит от процесса и качества внедрения."
                : "Предварительная оценка. Финальная смета формируется после короткого аудита процессов и интеграций."}
            </p>
          </form>

          <aside
            className="calculator__display"
            style={calculatorDisplayStyle}
            aria-live="polite"
          >
            <div className="calculator__status">
              <span>
                <i />
                {calculatorMode === "savings"
                  ? "SAVINGS MODEL"
                  : "COST MODEL"}
              </span>
              <span>INTER INSITE® / 2026</span>
            </div>

            <div className="calculator__orbit" aria-hidden="true">
              <i className="calculator__ring calculator__ring--one" />
              <i className="calculator__ring calculator__ring--two" />
              <i className="calculator__ring calculator__ring--three" />
              <div className="calculator__orbit-core" />
            </div>

            <div className="calculator__primary">
              {calculatorMode === "savings" ? (
                <>
                  <span>Потенциальная экономия / месяц</span>
                  <output>≈ {formatCompactRubles(monthlySavings)}</output>
                  <small>
                    диапазон {formatCompactRubles(monthlySavingsLow)} —{" "}
                    {formatCompactRubles(monthlySavingsHigh)}
                  </small>
                </>
              ) : (
                <>
                  <span>Ориентировочная стоимость внедрения</span>
                  <output className="calculator__primary-range">
                    {formatCompactRubles(implementationLow)} —{" "}
                    {formatCompactRubles(implementationHigh)}
                  </output>
                  <small>
                    {activeCalculatorProcess.label} ·{" "}
                    {activeCalculatorScope.label.toLowerCase()}
                  </small>
                </>
              )}
            </div>

            <div className="calculator__ledger">
              {calculatorMode === "savings" ? (
                <>
                  <div>
                    <span>Экономия / год</span>
                    <output>{formatCompactRubles(annualSavings)}</output>
                  </div>
                  <div>
                    <span>Высвободится времени</span>
                    <output>{freedHours} ч / мес.</output>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span>Срок запуска</span>
                    <output>{activeCalculatorScope.duration}</output>
                  </div>
                  <div>
                    <span>Поддержка после запуска</span>
                    <output>
                      от {formatCompactRubles(supportEstimate)} / мес.
                    </output>
                  </div>
                </>
              )}
            </div>

            <div className="calculator__display-footer">
              <p>
                {calculatorMode === "savings"
                  ? "Ориентировочная модель, не гарантия сокращения расходов. Точный эффект зависит от качества данных, процесса и сценария автоматизации."
                  : "Диапазон включает проектирование, разработку и запуск. Лицензии, внешние API и инфраструктура рассчитываются отдельно."}
              </p>
              <a
                className="button button--light"
                href="#!"
                onClick={(event) => goToSection(event, "contacts")}
              >
                Получить точный расчёт
                <ArrowIcon />
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section
        className="contact section section--light"
        id="contacts"
        aria-labelledby="contact-title"
      >
        <div className="contact__ticker" aria-hidden="true">
          <div className="marquee__track marquee__track--contact">
            <span className="marquee__group">
              ОБСУДИМ ЗАДАЧУ — РАССЧИТАЕМ ЭФФЕКТ — ЗАПУСТИМ ПИЛОТ —
              МАСШТАБИРУЕМ —
            </span>
            <span className="marquee__group">
              ОБСУДИМ ЗАДАЧУ — РАССЧИТАЕМ ЭФФЕКТ — ЗАПУСТИМ ПИЛОТ —
              МАСШТАБИРУЕМ —
            </span>
          </div>
        </div>
        <div className="contact__grid">
          <div className="contact__intro">
            <div className="section__label" data-reveal>
              <span>08</span>
              Контакты
            </div>
            <h2 id="contact-title" data-reveal>
              Обсудим, что
              <br />
              можно автоматизировать
            </h2>
            <p data-reveal>
              Свяжитесь с нами любым удобным способом. Первый аудит займёт 30
              минут и ни к чему вас не обязывает.
            </p>
          </div>

          <div className="contact__cards" data-reveal>
            <a className="contact-card" href="#!" onClick={stopLink}>
              <span>01 / Телефон</span>
              <strong>+7 (901) 013-78-88</strong>
              <small>+7 (800) 333-72-66 / бесплатно по России</small>
              <ArrowIcon />
            </a>
            <a className="contact-card" href="#!" onClick={stopLink}>
              <span>02 / E-mail</span>
              <strong>it@interinsite.com</strong>
              <small>Ответим в течение рабочего дня</small>
              <ArrowIcon />
            </a>
            <a className="contact-card" href="#!" onClick={stopLink}>
              <span>03 / Офис</span>
              <strong>Екатеринбург</strong>
              <small>Малышева 51, БЦ «Высоцкий»</small>
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__top">
          <a
            className="footer__logo"
            href="#!"
            onClick={(event) => goToSection(event, "top")}
          >
            INTER INSITE®
          </a>
          <p>
            Разработка программного обеспечения,
            <br />
            AI-решений и инженерных систем.
          </p>
          <a className="button button--light" href="#!" onClick={stopLink}>
            Оставить заявку
            <ArrowIcon />
          </a>
        </div>

        <div className="footer__nav">
          <div>
            <span>Навигация</span>
            {navigation.map(([label, id]) => (
              <a
                href="#!"
                onClick={(event) => goToSection(event, id)}
                key={id}
              >
                {label}
              </a>
            ))}
          </div>
          <div>
            <span>Документы</span>
            <a href="#!" onClick={stopLink}>
              Пользовательское соглашение
            </a>
            <a href="#!" onClick={stopLink}>
              Политика cookie
            </a>
            <a href="#!" onClick={stopLink}>
              Политика конфиденциальности
            </a>
            <a href="#!" onClick={stopLink}>
              Сотрудничество
            </a>
          </div>
          <div className="footer__company">
            <span>Реквизиты</span>
            <p>ООО «ИНТЕРИНСАЙТ»</p>
            <p>ИНН 6670499234 / КПП 667001001</p>
            <p>Р/с 40702810701500082839</p>
            <p>ООО «Банк Точка» / БИК 044525104</p>
            <p>Корр. счёт 30101810745374525104</p>
            <p>Директор: Третьяков Евгений Олегович</p>
            <p>620049, г. Екатеринбург, пер. Автоматики</p>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 INTER INSITE®</span>
          <span>56.8389° N / 60.6057° E</span>
          <a href="#!" onClick={stopLink}>
            Наверх ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
