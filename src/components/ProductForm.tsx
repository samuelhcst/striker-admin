import { CloudUpload, Save } from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'

export function ProductFormPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Primary Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8ff47]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            
            <h3 className="font-['DM_Sans'] text-2xl text-white mb-6 font-bold">Product Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#8b8b94] mb-2 uppercase tracking-wider">Sneaker Name</label>
                <input className="w-full rounded-lg bg-[#0a0a0b] border border-white/10 px-4 py-3 text-white focus:border-[#e8ff47] focus:outline-none transition-all" placeholder="e.g. Nike Air Max 90 Off-White" type="text" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-[#8b8b94] mb-2 uppercase tracking-wider">Description</label>
                <textarea className="w-full rounded-lg bg-[#0a0a0b] border border-white/10 px-4 py-3 text-white focus:border-[#e8ff47] focus:outline-none transition-all resize-y" placeholder="Detailed description..." rows={5}></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#8b8b94] mb-2 uppercase tracking-wider">Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b8b94]">$</span>
                    <input className="w-full rounded-lg bg-[#0a0a0b] border border-white/10 pl-8 pr-4 py-3 text-white focus:border-[#e8ff47] focus:outline-none transition-all" placeholder="0.00" step="0.01" type="number" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8b8b94] mb-2 uppercase tracking-wider">Category</label>
                  <select className="w-full rounded-lg bg-[#0a0a0b] border border-white/10 px-4 py-3 text-white focus:border-[#e8ff47] focus:outline-none transition-all appearance-none">
                    <option value="" disabled selected>Select category...</option>
                    <option value="running">Running</option>
                    <option value="basketball">Basketball</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Media & Actions */}
        <div className="space-y-6">
          <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-sm">
            <h3 className="font-['DM_Sans'] text-2xl text-white mb-4 font-bold">Media</h3>
            
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer transition-all hover:bg-white/5 hover:border-[#e8ff47]/50 flex flex-col items-center justify-center min-h-[240px]">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-[#e8ff47]">
                <CloudUpload className="w-8 h-8" />
              </div>
              <p className="text-white font-medium mb-1">Click or drag image here</p>
              <p className="text-xs text-[#8b8b94]">SVG, PNG, JPG (max. 5MB)</p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <label className="block text-xs font-bold text-[#8b8b94] mb-2 uppercase tracking-wider">Or provide Image URL</label>
              <input className="w-full rounded-lg bg-[#0a0a0b] border border-white/10 px-4 py-2 text-sm text-white focus:border-[#e8ff47] focus:outline-none" placeholder="https://..." type="url" />
            </div>
          </div>

          <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <button type="submit" className="w-full py-4 rounded-lg bg-[#e8ff47] text-[#0a0a0b] font-bold hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              Guardar Producto
            </button>
            <button type="button" className="w-full py-4 rounded-lg bg-transparent border border-white/20 text-white font-bold hover:bg-white/5 active:scale-[0.98] transition-all">
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}