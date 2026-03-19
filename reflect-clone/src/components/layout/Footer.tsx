import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full border-t border-white/10 mt-20">
            <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between text-[13px] text-zinc-500">
                <div className="mb-8 md:mb-0">
                    <p>&copy; {new Date().getFullYear()} Meridian. All rights reserved.</p>
                </div>
                <div className="flex gap-8">
                    <Link href="#" className="hover:text-white transition-colors">Platform</Link>
                    <Link href="#" className="hover:text-white transition-colors">Docs</Link>
                    <Link href="#" className="hover:text-white transition-colors">Resources</Link>
                    <Link href="#" className="hover:text-white transition-colors">Careers</Link>
                </div>
            </div>
        </footer>
    )
}
