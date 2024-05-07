import Link from "next/link";

export default function NotFoundPage() {
	return(
		<>
		<div className="flex flex-col items-center p-20 justify-center">
		<h1 className="text-7xl">404</h1>
		<h2 className="mb-5">Halaman tidak di temukan!</h2>
		<Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Return Home</Link>
		</div>
		</>
	)
}
