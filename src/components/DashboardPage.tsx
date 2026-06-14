import { Search, Plus, Filter, ArrowUpDown, Edit, Trash2 } from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'

export function DashboardPage() {
  return (
    <AdminLayout>
      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="font-['DM_Sans'] text-2xl md:text-3xl font-bold text-white mb-2">Catálogo de Productos</h2>
          <p className="text-[#8b8b94]">Manage your premium sneaker inventory.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-72 md:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8b8b94] w-4 h-4" />
            <input className="w-full bg-[#111114] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-[#8b8b94] focus:outline-none focus:border-[#e8ff47] transition-all text-sm" placeholder="Search..." type="text"/>
          </div>
          <button className="bg-[#e8ff47] text-[#0a0a0b] font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 shadow-[0_0_15px_rgba(232,255,71,0.3)]">
            <Plus className="w-5 h-5" />
            Agregar Producto
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-[#111114] border border-white/10 rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 rounded-full border border-[#e8ff47] text-[#e8ff47] bg-[#e8ff47]/10 text-sm hover:bg-[#e8ff47]/20 transition-colors">Todos</button>
          <button className="px-4 py-2 rounded-full border border-white/10 text-[#8b8b94] hover:text-white hover:border-[#8b8b94] text-sm transition-colors">Lifestyle</button>
          <button className="px-4 py-2 rounded-full border border-white/10 text-[#8b8b94] hover:text-white hover:border-[#8b8b94] text-sm transition-colors">Running</button>
          <button className="px-4 py-2 rounded-full border border-white/10 text-[#8b8b94] hover:text-white hover:border-[#8b8b94] text-sm transition-colors">Basketball</button>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-white/10 rounded-lg text-[#8b8b94] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
          <button className="p-2 border border-white/10 rounded-lg text-[#8b8b94] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 text-sm">
            <ArrowUpDown className="w-4 h-4" />
            <span className="hidden sm:inline">Ordenar</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#111114] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0a0a0b]/50 border-b border-white/10">
                <th className="p-4 text-xs font-bold text-[#8b8b94] uppercase tracking-wider w-12 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-transparent text-[#e8ff47] accent-[#e8ff47]" />
                </th>
                <th className="p-4 text-xs font-bold text-[#8b8b94] uppercase tracking-wider">Producto</th>
                <th className="p-4 text-xs font-bold text-[#8b8b94] uppercase tracking-wider hidden sm:table-cell">Categoría</th>
                <th className="p-4 text-xs font-bold text-[#8b8b94] uppercase tracking-wider hidden md:table-cell">Precio</th>
                <th className="p-4 text-xs font-bold text-[#8b8b94] uppercase tracking-wider">Stock</th>
                <th className="p-4 text-xs font-bold text-[#8b8b94] uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              
              {/* Ejemplo Row */}
              <tr className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-4 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-transparent accent-[#e8ff47] opacity-50 group-hover:opacity-100" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#0a0a0b] flex items-center justify-center p-1 border border-white/10">
                      {/* Aquí irá la imagen de Supabase */}
                      <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover rounded" alt="Sneaker" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Nike Dunk Low</p>
                      <p className="text-xs text-[#8b8b94]">Michigan State</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden sm:table-cell">
                  <span className="px-2.5 py-1 rounded-md bg-[#0a0a0b] border border-white/10 text-[#8b8b94] text-xs">Lifestyle</span>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span className="font-medium text-white">$110.00</span>
                </td>
                <td className="p-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    24 in stock
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg text-[#8b8b94] hover:text-[#e8ff47] hover:bg-[#e8ff47]/10 transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg text-[#8b8b94] hover:text-red-500 hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}