# Shoraj Tomer - Personal Portfolio

Start of the new chapter. This repository hosts individual portfolio and professional website of **Shoraj Tomer**.

> **Note:** This repository has been refactored from a previous platform-style architecture. All complex platform logic (auth, courses, multi-user systems) has been moved to `shoraj-learning-platform`.

## 🎯 Purpose

- **Personal Branding:** Clearly communicate who I am and what I do.
- **Service Showcase:** Display professional services and offerings.
- **Content Hub:** Share articles, stories, and insights.
- **Lead Generation:** Simple, effective contact methods for potential collaborations.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Shadcn/ui
- **Language:** TypeScript
- **Deployment:** Vercel

## 🚀 Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/shorajtomer/shorajtomer.me.git
    cd shorajtomer.me
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open localhost:**
    Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── about/          # About page
│   ├── blog/           # Blog listing and posts
│   ├── contact/        # Contact form
│   ├── projects/       # Portfolio/Case studies
│   ├── services/       # Professional services
│   └── page.tsx        # Home page
├── components/
│   ├── layout/         # Header, Footer
│   └── ui/             # Shadcn UI components
└── lib/                # Utilities
```

## 📝 Content Management

Content runs primarily on:
- **Pages:** Static content in `.tsx` files for core pages.
- **Blog:** Currently using mock data/local JSON (future: Markdown/MDX).

## 📄 License
MIT