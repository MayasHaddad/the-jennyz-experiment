import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start pt-28 px-14">
        <div className="flex flex-col gap-8">
          <h1 className="font-display text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            The Jennyz Experiment
          </h1>

          <div className="space-y-4 font-sans">
            <h2 className="font-display text-2xl font-semibold text-foreground/90">
              What is this?
            </h2>
            <p className="text-lg max-w-xl">
              This is a UI/UX experiment around{" "}
              <a
                href="https://jennyz.co"
                className="group relative inline-block font-medium text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative z-10 px-0.5">jennyz.co</span>
                <span className="absolute bottom-1 left-0 -z-10 h-1 w-full -rotate-2 rounded-sm bg-accent-blue/60 transition-all duration-300 ease-in-out group-hover:-bottom-1 group-hover:-left-1 group-hover:h-[120%] group-hover:w-[105%] group-hover:-rotate-3 group-hover:scale-105"></span>
              </a>
              {", "}a real world product which is used by real people.
            </p>
            <p className="text-lg max-w-xl">
              The goal is to explore different design decisions and appreciate
              how they impact the user experience.
            </p>
            <p>We&apos;ll introduce variations on three axes:</p>
            <ul className="list-disc list-inside text-lg max-w-xl pl-4 space-y-1">
              <li>Layout</li>
              <li>Colors</li>
              <li>Interaction patterns</li>
            </ul>
            <p className="text-lg max-w-xl">
              <span>{"Feel free to "}</span>
              <a
                href="https://github.com/MayasHaddad/the-jennyz-experiment"
                className="group relative inline-block font-medium text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{"submit a PR"}</span>
                <span className="absolute bottom-1 left-0 -z-10 h-1 w-full -rotate-2 rounded-sm bg-accent-blue/60 transition-all duration-300 ease-in-out group-hover:-bottom-1 group-hover:-left-1 group-hover:h-[120%] group-hover:w-[105%] group-hover:-rotate-3 group-hover:scale-105"></span>
              </a>
              <span>{" to add a new variation if you feel inspired!"}</span>
            </p>
            <p className="text-lg max-w-xl">I hope you enjoy!</p>
          </div>

          <div className="ml-auto">
            <Link
              href="/variations"
              className="group relative inline-block px-2 py-0 font-display text-lg font-bold tracking-wide text-foreground"
            >
              <span className="relative z-10 flex items-center gap-2">
                Next
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute -bottom-1 -left-1 -z-10 h-[120%] w-[105%] -rotate-3 scale-105 rounded-sm bg-accent-blue/60"></span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
