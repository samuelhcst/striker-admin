import { LayoutDashboard, Box, ShoppingCart, Settings, LogOut, Menu, Search, Bell, HelpCircle, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { signOut, user } = useAuth()

  const navItems = [
    { name: 'Dashboard', path: '#', icon: LayoutDashboard },
    { name: 'Products', path: '/', icon: Box },
    { name: 'Orders', path: '#', icon: ShoppingCart },
  ]

  return (
    <div className="font-['Inter'] text-sm antialiased min-h-screen flex bg-[#0a0a0b] text-white selection:bg-[#e8ff47] selection:text-[#0a0a0b]">
      {/* SideNavBar */}
      <nav className="hidden md:flex flex-col h-full py-10 px-6 bg-[#111114] fixed left-0 top-0 w-[280px] border-r border-white/10 z-50">
        <div className="mb-12">
          <h1 className="font-['DM_Sans'] text-4xl font-bold tracking-tighter text-[#e8ff47]">STRIKER</h1>
          <p className="text-xs font-bold text-[#8b8b94] mt-2 tracking-widest uppercase">Premium Admin</p>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname.startsWith('/products'))
            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-[#e8ff47] font-bold bg-white/5 border-r-4 border-[#e8ff47]' 
                    : 'text-[#8b8b94] hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
        <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-6">
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#8b8b94] hover:text-white hover:bg-white/5 transition-all duration-200" href="#">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </a>
          <button 
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors mt-4 text-left w-full font-bold"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-[280px] flex flex-col min-h-screen w-full">
        {/* TopNavBar */}
        <header className="flex justify-between items-center w-full h-20 px-6 bg-[#0a0a0b]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-[#8b8b94] hover:text-white transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex relative group w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b8b94] w-4 h-4" />
              <input 
                className="w-full bg-[#111114] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-[#8b8b94] focus:outline-none focus:border-[#e8ff47] focus:ring-1 focus:ring-[#e8ff47] transition-all text-sm" 
                placeholder="Search..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <button className="p-2 text-[#8b8b94] hover:text-white hover:bg-white/5 transition-colors rounded-full relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#e8ff47] rounded-full ring-2 ring-[#0a0a0b]"></span>
              </button>
              <button className="p-2 text-[#8b8b94] hover:text-white hover:bg-white/5 transition-colors rounded-full">
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <button className="flex items-center gap-2 bg-[#111114] border border-white/10 p-1 pr-3 rounded-full hover:bg-white/5 transition-colors">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 overflow-hidden flex items-center justify-center text-xs font-bold text-white uppercase">
                {user?.email?.substring(0, 2) || 'AD'}
              </div>
              <span className="text-sm font-medium hidden lg:block truncate max-w-[120px]">
                {user?.email || 'Admin'}
              </span>
              <ChevronDown className="text-[#8b8b94] w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-10 w-full overflow-x-auto">
          <div className="max-w-[1440px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
