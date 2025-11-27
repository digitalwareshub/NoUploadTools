import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-3">
        <div className="hidden w-40 lg:block" aria-hidden="true" />
        <div className="flex w-full max-w-3xl items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-blue-600"
          >
            <Image
              src="/logo.png"
              alt="NoUploadTools"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span>NoUploadTools</span>
          </Link>
          <nav className="flex flex-1 justify-center gap-6 text-sm">
            <Link href="/">Home</Link>
            <Link href="/directory/">Tools</Link>
            <Link href="/blog/">Blog</Link>
            <Link href="/privacy/">Privacy</Link>
          </nav>
        </div>
        <div className="hidden w-40 lg:block" aria-hidden="true" />
      </div>
    </header>
  );
}
