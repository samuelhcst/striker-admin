import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Mail, Lock, ArrowRight } from 'lucide-react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="bg-[#020617] text-[#e5e1e4] min-h-screen flex items-center justify-center font-['Inter'] antialiased overflow-hidden">
      <div className="w-full min-h-screen flex flex-col md:flex-row">
        
        {/* Left Side: Hero Image */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 relative bg-[#0f172a] border-r border-white/10">
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10 opacity-80"></div>
          
          <div className="absolute bottom-10 left-10 md:bottom-12 md:left-12 z-20">
            <p className="font-['DM_Sans'] text-4xl font-bold text-white mb-4 tracking-tighter">Command Center.</p>
            <p className="font-['Inter'] text-base text-slate-400 max-w-md">Access the exclusive STRIKER admin portal to manage inventory, curate drops, and oversee operations with precision.</p>
          </div>
        </div>
        
        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 bg-[#020617] flex flex-col justify-center px-6 md:px-12 py-12 h-screen overflow-y-auto">
          <div className="max-w-md w-full mx-auto flex flex-col gap-8">
            
            {/* Header */}
            <div>
              <h1 className="font-['DM_Sans'] text-5xl font-bold tracking-tighter text-[#d8ee36] mb-2">STRIKER</h1>
              <h2 className="font-['DM_Sans'] text-2xl font-semibold text-white">Admin Login</h2>
              <p className="font-['Inter'] text-sm text-slate-400 mt-2">Enter your credentials to access the secure dashboard.</p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm font-medium">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="font-['Inter'] text-xs font-bold text-slate-400 uppercase tracking-widest" htmlFor="email">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  <input 
                    id="email"
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0f172a] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white font-['Inter'] text-base focus:border-[#d8ee36] focus:ring-1 focus:ring-[#d8ee36] focus:outline-none transition-colors placeholder-slate-400/50"
                    placeholder="admin@striker.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-['Inter'] text-xs font-bold text-slate-400 uppercase tracking-widest flex justify-between items-center" htmlFor="password">
                  Password
                  <a className="text-slate-400 hover:text-[#d8ee36] transition-colors font-['Inter'] text-sm font-normal lowercase" href="#">Forgot?</a>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  <input 
                    id="password"
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0f172a] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white font-['Inter'] text-base focus:border-[#d8ee36] focus:ring-1 focus:ring-[#d8ee36] focus:outline-none transition-colors placeholder-slate-400/50"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input 
                  id="remember" 
                  name="remember" 
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/10 bg-[#0f172a] text-[#d8ee36] focus:ring-[#d8ee36] focus:ring-offset-[#020617] accent-[#d8ee36]"
                />
                <label className="font-['Inter'] text-sm text-slate-400 cursor-pointer hover:text-white transition-colors" htmlFor="remember">
                  Remember me on this device
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="mt-4 w-full bg-[#d8ee36] text-[#020617] font-['Inter'] text-sm font-bold py-4 rounded-lg hover:bg-white hover:text-[#020617] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(216,238,54,0.15)] hover:shadow-[0_0_25px_rgba(216,238,54,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Authenticating...' : 'Ingresar'}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>

              <div className="mt-4 text-center">
                <p className="font-['Inter'] text-sm text-slate-400">
                  Restricted access. Internal use only.
                </p>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
