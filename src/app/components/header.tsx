import Image from "next/image";

export function Header() {
  return (
    <header className="bg-gray-800 py-3 text-white shadow-lg">
      <div className="flex flex-row gap-3 px-4">
        <Image src="/icon.png" width={24} height={24} alt="A camera icon" className="animate-pulse" />
        Live Tally
      </div>
    </header>
  );
}
