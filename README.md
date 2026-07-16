# INTER INSITE — motion landing

Одностраничный сайт на React с GSAP ScrollTrigger и Lenis. В проекте есть
адаптивная BEM-вёрстка, плавная прокрутка, закреплённые scroll-сцены,
горизонтальная лента услуг, стек кейсов, мобильное меню и режим
`prefers-reduced-motion`.

## Запуск в VS Code

Нужен Node.js 22.13 или новее.

```bash
npm install
npm run dev
```

После запуска откройте адрес, который появится в терминале.

## Полезные команды

```bash
npm run dev       # режим разработки
npm run build     # production-сборка
npm run lint      # проверка кода
```

## Где редактировать

- `app/page.tsx` — весь контент, React-компоненты и GSAP-анимации.
- `app/globals.css` — дизайн-система, BEM-стили и адаптив.
- `app/layout.tsx` — метаданные страницы.

Все CTA и внешние переходы сейчас являются заглушками. Пункты меню прокручивают
страницу к соответствующим блокам.

## Публикация на GitHub Pages

Workflow `.github/workflows/deploy-pages.yml` автоматически собирает и публикует
сайт после каждого push в ветку `main`.

В настройках репозитория откройте **Settings → Pages** и выберите
**Source → GitHub Actions**. Для project-сайта адрес будет:

`https://arcode-one.github.io/interinsite/`
