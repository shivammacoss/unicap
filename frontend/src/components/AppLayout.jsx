import { Outlet } from 'react-router-dom'
import Footer from './Footer'

/**
 * Wraps all routes so the legal footer is present on every page.
 */
export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col min-h-0 w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
