/**
 * Site-wide footer bar — legal links live in LandingFooter (marketing) only.
 */
export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center sm:text-left text-sm text-gray-500">
          &copy; {new Date().getFullYear()} UNICAP MARKET. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
