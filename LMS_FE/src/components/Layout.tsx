import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Navbar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
