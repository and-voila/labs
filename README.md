<a href="https://labs.andvoila.gg">
  <img alt="A featured image for the Labs x And Voila web app for digital marketers" src="public/open-graph.gif">
  <h1 align="center">Labs x And Voila</h1>
</a>

<p align="center">
  Community, Insights, and AI-assisted tools to help you crush your digital marketing goals.
</p>

<p align="center">
  <a href="https://twitter.com/rebekahradice">
    <img src="https://img.shields.io/twitter/follow/rebekahradice?style=flat&label=@rebekahradice&logo=twitter&color=0bf&logoColor=fff" alt="Rebekah Radice Twitter follower count" />
  </a>
</p>

<!--
<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#tech-stack--features"><strong>Tech Stack + Features</strong></a> ·
  <a href="#author"><strong>Author</strong></a> ·
  <a href="#credits"><strong>Credits</strong></a>
</p>
<br/>
-->

## Introduction

Welcome to Labs x And Voila – a confluence of advanced tools and community, powered by the latest in web tech including Next.js 14, Typescript, Prisma, Kysely, Turso, and a lot more.

## Installation

Get started with Labs x And Voila by cloning the repo and setting up your environment:

```bash
npx create-next-app my-marketing-lab --example "https://github.com/and-voila/labs"
```

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env.local` and fill in the necessary details:

```sh
cp .env.example .env.local
```

3. Fire up the development server:

```sh
pnpm dev
```

## Roadmap

- [x] ~"Borrow" code from https://github.com/mickasmt/next-saas-stripe-starter/~
- [x] ~Engage in a thrilling battle of wits with our local development environment~
- [ ] Attempt a daring migration from Turbo repo, armed only with a keyboard and a strong cup of coffee
- [ ] Embark on a quest to discover the ancient secrets of user authentication
- [ ] Delve into the arcane arts of user authorization
- [ ] Engage in a philosophical debate: To struggle with server actions, or not to struggle?
- [ ] Concoct a cunning plan to convince users to part with their hard-earned cash
- [ ] Invent some shiny new features that users didn't even know they needed
- [ ] Embrace the bleeding edge, migrating to Next JS 14, because who needs stability anyway?
- [ ] Attempt to decipher the cryptic riddles of the Next JS documentation
- [ ] Engage in a high-stakes game of "guess the dependency version"
- [ ] Wrestle with TypeScript, the programming language equivalent of a Rubik's cube
- [ ] Try to remember why we thought migrating to an open source template was a good idea in the first place
- [ ] Celebrate our inevitable success with a well-deserved nap

### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience
- [Auth.js](https://authjs.dev/) – Handle user authentication with ease with providers like Google, Twitter, GitHub, etc.
- [Prisma](https://www.prisma.io/) – Typescript-first ORM for Node.js
- [React Email](https://react.email/) – Versatile email framework for efficient and flexible email development

### Platforms

- [Vercel](https://vercel.com/) – Easily preview & deploy changes with git
- [Turso](https://turso.tech/) – The Fastest,
  easiest, cheapest database in the world, oh my!
- [Resend](https://resend.com/) – A powerful email framework for streamlined email development

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Shadcn/ui](https://ui.shadcn.com/) – Re-usable components built using Radix UI and Tailwind CSS
- [Framer Motion](https://framer.com/motion) – Motion library for React to animate components with ease
- [Phosphor](https://phosphoricons.com/) – Phosphor is a flexible icon family for interfaces, diagrams, presentations — whatever, really.
- [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) – Optimize custom fonts and remove external network requests for improved performance
- [`ImageResponse`](https://nextjs.org/docs/app/api-reference/functions/image-response) – Generate dynamic Open Graph images at the edge

### Hooks and Utilities

- `useIntersectionObserver` – React hook to observe when an element enters or leaves the viewport
- `useLocalStorage` – Persist data in the browser's local storage
- `useScroll` – React hook to observe scroll position ([example](https://github.com/mickasmt/precedent/blob/main/components/layout/navbar.tsx#L12))
- `nFormatter` – Format numbers with suffixes like `1.2k` or `1.2M`
- `capitalize` – Capitalize the first letter of a string
- `truncate` – Truncate a string to a specified length
- [`use-debounce`](https://www.npmjs.com/package/use-debounce) – Debounce a function call / state update

### Code Quality

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
- [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript

### Miscellaneous

- [Vercel Analytics](https://vercel.com/analytics) – Track unique visitors, pageviews, and more in a privacy-friendly way

## Author

Labs x And Voila is a project developed by **[BRIL.LA](https://bril.la)**, crafted to serve the digital marketing community with cutting-edge tools and insights. Released under the MIT License.

## Credits

Special thanks to **[@mickasmt](https://github.com/mickasmt/)** for creating the Next SaaS Starter Stripe, which served as a foundation for this project. Our project also draws inspiration from other great works in the open-source community, which we've adapted and expanded upon to create a unique experience for digital marketers.

This project was inspired by shadcn's [Taxonomy](https://github.com/shadcn-ui/taxonomy), Steven Tey’s [Precedent](https://github.com/steven-tey/precedent), and Antonio Erdeljac's amazing OSS projects.

- Shadcn ([@shadcn](https://twitter.com/shadcn))
- Steven Tey ([@steventey](https://twitter.com/steventey))
- Antonio Erdeljac ([@YTCodeAntonio](https://twitter.com/AntonioErdeljac))
