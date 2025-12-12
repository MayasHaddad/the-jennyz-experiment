export default function Home() {
  return (
    <div className="flex min-h-screen justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start py-32 px-14">
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
              </a>{", "}a real world product
              which is used by real people.
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
          </div>
        </div>
      </main>
    </div>
  );
}
