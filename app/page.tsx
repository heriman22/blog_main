import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-1.2 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <header className="text-center space-y-4">
        <Image
          className="centered-image rounded-full border-4 border-black/10 dark:border-white/20"
          src="/your-avatar.jpg" // Replace with your avatar
          alt="Your Name"
          width={100}
          height={100}
          priority
        />
        <h1 className="text-3xl sm:text-1xl md:text-3xl font-bold">Heritier</h1>
        <p className="text-base sm:text-base md:text-xl max-w-2xl text-gray-600 dark:text-gray-400 mx-auto">
          A short intro about you. Web developer, writer, and lifelong learner.
        </p>
      </header>

      {/* Main Content */}
      <main className="mt-10 text-center max-w-3xl w-full px-2">
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-1xl font-semibold">About Me</h2>
          <p className="text-base sm:text-base md:text-xl text-gray-700 dark:text-gray-300">
            Write about your journey, skills, and passions. Example: &ldquo;I build fast, accessible web apps
            using Next.js, React, and Tailwind CSS. This blog shares my learnings, experiments, and thoughts.&rdquo;
          </p>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl sm:text-1xl font-semibold">Contact & Links</h2>
          <div className="flex gap-6 justify-center flex-wrap text-base sm:text-lg">
            <a href="mailto:herri2293@gmail.com" className="hover:underline text-blue-600 dark:text-blue-400">Email</a>
            <a href="https://github.com/heriman22" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 dark:text-blue-400">GitHub</a>
            <a href="https://www.linkedin.com/in/heri-b-61502423b/" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 dark:text-blue-400">LinkedIn</a>
            <a href="https://huggingface.co/Heriman" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 dark:text-blue-400">huggingface</a>
             <Link href="/blog" className="hover:underline text-blue-600 dark:text-blue-400">Blog</Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm sm:text-base text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Heritier. All rights reserved.
      </footer>
    </div>
  );
}
