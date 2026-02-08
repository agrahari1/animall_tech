// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Header() {
//   const pathname = usePathname();

//   const linkClass = (path) =>
//     `flex-1 text-center py-3 text-sm font-medium ${
//       pathname === path
//         ? "border-b-2 border-green-500 text-green-500"
//         : "text-gray-400"
//     }`;

//   return (
//     <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
//       <h1 className="text-center py-3 text-lg font-semibold text-white">
//         Milking Tracker
//       </h1>

//       <nav className="flex">
//         <Link href="/" className={linkClass("/")}>
//           Home
//         </Link>
//         <Link href="/history" className={linkClass("/history")}>
//           History
//         </Link>
//       </nav>
//     </header>
//   );
// }
