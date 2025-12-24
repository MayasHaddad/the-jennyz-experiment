import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start pt-20 px-14">
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
                <span className="absolute bottom-0 left-0 -z-10 flex h-full w-full items-end justify-center">
                   <svg
                      viewBox="0 0 100 20"
                      className="h-[60%] w-[110%] -rotate-2 text-accent-yellow/70 transition-all duration-300 group-hover:h-[80%] group-hover:w-[120%] group-hover:-rotate-1 group-hover:scale-110"
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#paint-flow)" fill="currentColor">
                        <path d="M5,10 Q50,5 95,12" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                         <path d="M10,15 Q50,18 90,12" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                      </g>
                    </svg>
                </span>
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
                 <span className="absolute bottom-0 left-0 -z-10 flex h-full w-full items-end justify-center">
                   <svg
                      viewBox="0 0 100 20"
                      className="h-[60%] w-[110%] -rotate-2 text-accent-yellow/70 transition-all duration-300 group-hover:h-[80%] group-hover:w-[120%] group-hover:-rotate-1 group-hover:scale-110"
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#paint-flow)" fill="currentColor">
                        <path d="M5,10 Q50,5 95,12" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                         <path d="M10,15 Q50,18 90,12" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                      </g>
                    </svg>
                </span>
              </a>
              <span>{" to add a new variation if you feel inspired!"}</span>
            </p>
            <p className="text-lg max-w-xl">I hope you enjoy!</p>
          </div>

          <div className="ml-auto">
            <Link
              href="/variations"
              className="group relative inline-flex items-center justify-center px-10 py-3 font-display text-lg font-bold tracking-wide text-foreground"
            >
              <span className="relative z-10 flex items-center gap-2 pt-1">
                Next
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              
              {/* Organic Paint Brush Stroke */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                <svg
                  viewBox="0 0 300 100"
                  className="h-[120%] w-[150%] -rotate-2 text-accent-yellow translate-y-[10%]"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* "Gooey" filter to merge separate strokes into a single organic paint blob */}
                    <filter id="paint-flow">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                      <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -8"
                        result="goo"
                      />
                      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                  </defs>
                  
                  <g filter="url(#paint-flow)" fill="currentColor">
                    {/* Main body strokes - thick and overlapping */}
                    <path d="M10,35 Q150,30 290,38 T10,35" stroke="currentColor" strokeWidth="25" strokeLinecap="round" />
                    <path d="M20,50 Q160,45 280,55 T20,50" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
                    <path d="M15,42 Q155,42 295,40 T15,42" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
                    
                    {/* Detail strokes to add irregularity and "dry" look at edges */}
                    <path d="M10,25 Q100,28 180,24" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                    <path d="M180,65 Q240,62 290,60" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                    <path d="M5,45 Q80,45 120,48" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                    
                    {/* Trailing lines for the dry brush effect on the right */}
                    <path d="M260,30 L295,28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M270,55 L300,58" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                    <path d="M265,42 L298,44" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
