import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-6 border-b">
      <Link href="/">Home</Link>
      <Link href="#">About Us</Link>
      <Link href="#">Our Projects</Link>
      <Link href="#">Contact Us</Link>
    </nav>
  );
}
