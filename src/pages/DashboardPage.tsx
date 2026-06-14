import { Search, Plus, Edit, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AdminLayout } from '../components/AdminLayout'
import { supabase } from '../lib/supabase'

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  image_url: string
}

export function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProducts = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (!error && data) {
      setProducts(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) {
        alert(`Error al eliminar: ${error.message}`)
      } else {
        fetchProducts()
      }
    }
  }

  return (
    <AdminLayout>
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
          <Link to="/products/new" className="bg-[#e8ff47] text-[#0a0a0b] font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 shadow-[0_0_15px_rgba(232,255,71,0.3)]">
            <Plus className="w-5 h-5" />
            Agregar Producto
          </Link>
        </div>
      </div>

      <div className="bg-[#111114] border border-white/10 rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 rounded-full border border-[#e8ff47] text-[#e8ff47] bg-[#e8ff47]/10 text-sm hover:bg-[#e8ff47]/20 transition-colors">Todos</button>
          <button className="px-4 py-2 rounded-full border border-white/10 text-[#8b8b94] hover:text-white hover:border-[#8b8b94] text-sm transition-colors">Lifestyle</button>
          <button className="px-4 py-2 rounded-full border border-white/10 text-[#8b8b94] hover:text-white hover:border-[#8b8b94] text-sm transition-colors">Running</button>
          <button className="px-4 py-2 rounded-full border border-white/10 text-[#8b8b94] hover:text-white hover:border-[#8b8b94] text-sm transition-colors">Basketball</button>
        </div>
      </div>

      <div className="bg-[#111114] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto min-w-[800px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0a0a0b]/50 border-b border-white/10">
                <th className="p-4 text-xs font-bold text-[#8b8b94] uppercase tracking-wider w-12 text-center"></th>
                <th className="p-4 text-xs font-bold text-[#8b8b94] uppercase tracking-wider">Producto</th>
                <th className="p-4 text-xs font-bold text-[#8b8b94] uppercase tracking-wider">Categoría</th>
                <th className="p-4 text-xs font-bold text-[#8b8b94] uppercase tracking-wider">Precio</th>
                <th className="p-4 text-xs font-bold text-[#8b8b94] uppercase tracking-wider">Stock</th>
                <th className="p-4 text-xs font-bold text-[#8b8b94] uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center text-[#8b8b94]">Cargando productos...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-[#8b8b94]">No hay productos. ¡Agrega uno!</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 text-center">
                      <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-transparent accent-[#e8ff47] opacity-50 group-hover:opacity-100" />
                    </td>
                    <td className="p-4 w-[350px]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#0a0a0b] flex items-center justify-center p-1 border border-white/10 overflow-hidden shrink-0">
                          <img src={product.image_url} className="w-full h-full object-cover rounded mix-blend-screen" alt={product.name} />
                        </div>
                        <div className="truncate pr-4">
                          <p className="font-medium text-white truncate" title={product.name}>{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-[#0a0a0b] border border-white/10 text-[#8b8b94] text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-white">${product.price.toFixed(2)}</span>
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold ${product.stock > 5 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 5 ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                        {product.stock} in stock
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/products/edit/${product.id}`} className="p-2 rounded-lg text-[#8b8b94] hover:text-[#e8ff47] hover:bg-[#e8ff47]/10 transition-colors">
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button onClick={() => handleDelete(product.id)} className="p-2 rounded-lg text-[#8b8b94] hover:text-red-500 hover:bg-red-500/10 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
