<a href="https://labs.andvoila.gg">
  <img alt="A featured image for the Labs x And Voila web app for digital marketers" src="public/open-graph.gif">
  <h1 align="center">Labs x And Voila</h1>
</a>

> [!CAUTION]
> Heads up, devs! This project is a work in progress. Expect some instability in the project until we lift this notice. Proceed with a bit of caution and a lot of patience.

<p align="center">
  Community, Insights, and AI-assisted tools to help you crush your digital marketing goals.
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#roadmap"><strong>Roadmap</strong></a> ·
  <a href="#author"><strong>Author</strong></a> ·
  <a href="#credits"><strong>Credits</strong></a> ·
  <a href="#license"><strong>License</strong></a>
</p>
<br/>

## Introduction

Welcome to Labs x And Voila, where we're reshaping the toolkit for digital marketing professionals and creators. Our aim is simple: to streamline your workflow with a suite of tools that are both efficient and innovative. With a focus on intellectual property protection and enhancing the creative process, we blend established practices with AI advancements to elevate your work experience.

Our technology stack was chosen for its reliability and effectiveness in delivering a minimum viable product (MVP). This foundation includes:

- **Next.js 14**: For robust and scalable front-end development.
- **TypeScript**: Ensuring code reliability and maintainability.
- **Prisma**: For seamless database management.
- **Vercel Postgres** powered by Neon: Reliable and scalable database hosting.
- **Vercel KV** powered by Upstash: For efficient key-value data storage.
- **Vercel Blob** powered by Cloudflare: Optimized large file handling.
- **Vercel AI SDK**: Integrating AI capabilities into the core of our tools.
- **TipTap**: A flexible, extensible text editor. You'll need an **[Entry license](https://tiptap.dev/pricing)** to use it in production.
- **Resend**: Streamlining email workflows.
- **Posthog**: For in-depth analytics and user insights.

Each component of our stack is selected to ensure that your experience is not just about getting the job done, but doing it more intuitively and effectively.

## Project structure

This project follows the recommendations of the the Next JS team for v14 and remains a work in progress. We chose sub-directories to better organize across a growing codebase.

```
/and-voila/labs/ai
├── /src
│   ├── /app
│   │   ├── /(routes)                   # Route group for routes ¯\_(ツ)_/¯
│   │   │   ├── /(auth)                 # Authentication pages
│   │   │   ├── /(dashboard)            # Dashboard pages
│   │   │   ├── /(marketing)            # Marketing pages
│   │   │   ├── /(tools)                # Tools pages
│   │   │   │   ├── /[team_slug]        # Fancy collaboration features
│   │   ├── /api                        # API routes
│   │   ├── /lib                        # Reusable libraries and utility functions
│   │   │   ├── /actions                # Server actions
│   │   │   ├── /helpers                # Operations
│   │   │   ├── /operations             # Operations
│   │   │   ├── /types                  # Types
│   │   │   ├── /validations            # Zod stuff
│   │   │   └── /...                    # Other lib stuff
│   │   ├── /components                 # All UI components
│   │   │   ├── /layout                 # Shared stuff organized into sub-folders
│   │   │   ├── /publish                # Publish feature components organized into sub-folders
│   │   │   ├── /...
│   │   │   └── /ui                     # Shadcn UI components
│   │   ├── /config                     # Configuration files for different parts of the app
│   │   └── /styles                     # Global styles
│   ├── /prisma                         # Prisma schema and migrations
│   └── /scripts                        # Scripts like seeding scripts
├── /public                             # Static files like fonts, images, etc.
├── next.config.js
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── .nvmrc
├── LICENSE.md
├── README.md
├── package.json
└── tsconfig.json
```

## Installation

1. Clone the Labs x And Voila repository and create your own project:

   ```bash
   npx create-next-app my-marketing-lab --example "https://github.com/and-voila/labs"
   ```

2. Install dependencies using pnpm:

   ```sh
   pnpm install
   ```

3. Copy the `.env.example` file to a new file named `.env.local`:

   ```sh
   cp .env.example .env.local
   ```

4. Open the `.env.local` file and fill in the necessary details. Each variable is explained in the `.env.example` file. Make sure to provide values for all the variables to ensure the application functions correctly.

5. Start the development server:

   ```sh
   pnpm dev
   ```

Now, you should be able to see the application running on `http://localhost:3001` or http://localhost:3000 assuming you changed the port.

## Roadmap

- [x] ~"Borrow" code from https://github.com/mickasmt/next-saas-stripe-starter/~
- [x] ~Engage in a thrilling battle of wits with our local development environment~
- [x] ~Attempt a daring migration from Turbo repo, armed only with a keyboard and a strong cup of coffee~
- [x] ~Embark on a quest to discover the ancient secrets of user authentication~
- [x] ~Delve into the arcane arts of user authorization~
- [x] ~Engage in a philosophical debate: To struggle with server actions, or not to struggle?~
- [x] ~Concoct a cunning plan to convince users to part with their hard-earned cash~
- [x] ~Invent some shiny new features that users didn't even know they needed~
- [x] ~Embrace the bleeding edge, migrating to Next JS 14, because who needs stability anyway?~
- [x] ~Attempt to decipher the cryptic riddles of the Next JS documentation~
- [x] ~Engage in a high-stakes game of "guess the dependency version"~
- [x] ~Wrestle with TypeScript, the programming language equivalent of a Rubik's cube~
- [x] ~Try to remember why we thought migrating to an open source template was a good idea in the first place~
- [x] Create your team, invite members - because nothing says 'productivity' like a crowded digital workspace
- [x] Introduce IP protection indicators - it's like a guard dog for your content, only less furry and more algorithmic
- [ ] Implement awesome SEO metadata features for your websites - because we all know the true path to enlightenment is through optimized meta tags
- [ ] Develop a collaborative AI editor - for when you want to argue with a machine about your creative choices
- [ ] Roll out collaborative AI chat tools - because who needs human interaction when you have AI to chat with?
- [ ] Master a super easy workflow to create, optimize, distribute, analyze - or, as we like to call it, 'the magical mystery tour of digital marketing'
- [ ] Celebrate our inevitable success with a well-deserved nap

### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience
- [Auth.js](https://authjs.dev/) – Handle user authentication with ease with providers like Google, Twitter, GitHub, etc.
- [Prisma](https://www.prisma.io/) – Typescript-first ORM for Node.js
- [React Email](https://react.email/) – Versatile email framework for efficient and flexible email development

### Platforms

- [Vercel](https://vercel.com/) – Easily preview & deploy changes with git
- [Vercel Storage](https://vercel.com/docs/storage) – Store key-value data, transactional data, large files, and more with Vercel's suite of storage products.
- [Resend](https://resend.com/) – A powerful email framework for streamlined email development

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Shadcn/ui](https://ui.shadcn.com/) – Re-usable components built using Radix UI and Tailwind CSS
- [Framer Motion](https://framer.com/motion) – Motion library for React to animate components with ease
- [Phosphor](https://phosphoricons.com/) – Phosphor is a flexible icon family for interfaces, diagrams, presentations — whatever, really.

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

Labs x And Voila is a project developed by **[BRIL.LA](https://bril.la)**, crafted to serve the digital marketing community with cutting-edge tools and insights.

## Credits

Special thanks to **[@mickasmt](https://github.com/mickasmt/)** for creating the Next SaaS Starter Stripe, which served as a foundation for this project. Our project also draws inspiration from other great works in the open-source community, which we've adapted and expanded upon to create a unique experience for digital marketers.

This project was inspired by shadcn's [Taxonomy](https://github.com/shadcn-ui/taxonomy), Steven Tey’s [Precedent](https://github.com/steven-tey/precedent) and [Platforms Starter Kit](https://github.com/vercel/platforms), as well as Antonio Erdeljac's amazing OSS projects.

Oh, **[@juliankoehn's nextjs-saas-starter](https://github.com/juliankoehn/nextjs-saas-starter)** saved us boat loads of time integrating Teams, the right way.

- Shadcn ([@shadcn](https://twitter.com/shadcn))
- Steven Tey ([@steventey](https://twitter.com/steventey))
- Antonio Erdeljac ([@YTCodeAntonio](https://twitter.com/AntonioErdeljac))
- Julian Koehn ([@JulianPRO](https://julian.pro/))

## License Information

### Our Project License

Our modifications and additional code are licensed under the **GNU Affero General Public License v3.0 (AGPL v3.0)**. This means that our project as a whole is governed by the AGPL v3.0 license.

### External Code and Licenses

While the majority of our project is under the AGPL v3.0, it incorporates components from several external sources, which retain their original licenses as detailed below:

1. **Next SaaS Stripe Starter**: Portions of our project are based on [Next SaaS Stripe Starter](https://github.com/mickasmt/next-saas-stripe-starter), which is licensed under the MIT License.

2. **Platforms by Vercel**: We also use code from [Platforms by Vercel](https://github.com/vercel/platforms), covered under the MIT License.

3. **NextJS SaaS Starter**: Code from the [NextJS SaaS Starter](https://github.com/juliankoehn/nextjs-saas-starter) is integrated into our project and is licensed under the MIT License.

4. **Tiptap Pro**: Code from our friends at [Tiptap](https://github.com/ueberdosis) is integrated into our project. It has a private license and **must be accompanied by a Tiptap Pro (paid) plan**. You can learn more about [Tiptap pricing here](https://tiptap.dev/pricing).

### Comprehensive Licensing Details

For a full understanding of how these licenses apply to our project and the interaction between the AGPL v3.0 and MIT Licenses, please see our [License](./LICENSE) file. This document provides a comprehensive overview of the licensing structure for our entire codebase.
