export function Footer() {
  return (
    <footer className="bg-gray-800 py-3 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-2">
          <nav className="flex flex-wrap justify-center gap-x-2 gap-y-2">
            <a
              href="https://github.com/maxgomes92/live-tally"
              target="_blank"
              className="transition-colors duration-200 hover:text-blue-400"
            >
              Contribute
            </a>
            <a
              href="https://www.buymeacoffee.com/maxgomes"
              target="_blank"
              className="transition-colors duration-200 hover:text-blue-400"
            >
              Donate
            </a>
          </nav>

          <div className="mt-4 text-center text-sm text-gray-400 md:mt-0">
            &copy; {new Date().getFullYear()} Max Gomes
          </div>
        </div>
      </div>
    </footer>
  );
}
