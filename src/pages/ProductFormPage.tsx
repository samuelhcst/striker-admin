import { CloudUpload, Save, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { AdminLayout } from '../components/AdminLayout'
import { supabase } from '../lib/supabase'

export function ProductFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image_url: ''
  })
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (isEditing) {
      supabase.from('products').select('*').eq('id', id).single().then(({ data }) => {
        if (data) {
          setFormData({
            name: data.name,
            category: data.category,
            price: data.price.toString(),
            stock: data.stock.toString(),
            image_url: data.image_url
          })
        }
      })
    }
  }, [id, isEditing])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      uploadFile(file)
    }
  }

  const uploadFile = async (file: File) => {
    setLoading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(fileName, file)

    if (uploadError) {
      alert(`Error al subir imagen. ¿Creaste el bucket "products"? Mensaje: ${uploadError.message}`)
      setLoading(false)
      return
    }

    const { data } = supabase.storage.from('products').getPublicUrl(fileName)

    setFormData({ ...formData, image_url: data.publicUrl })
    setLoading(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image_url: formData.image_url
    }

    let submitError: Error | null;

    if (isEditing) {
      const { error } = await supabase.from('products').update(payload).eq('id', id)
      submitError = error
    } else {
      const { error } = await supabase.from('products').insert([payload])
      submitError = error
    }

    setLoading(false)
    
    if (submitError) {
      console.error(submitError)
      alert(`Error al guardar: ${submitError.message}`)
    } else {
      navigate('/')
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-[#8b8b94] hover:text-white transition-colors mb-4 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </Link>
        <h2 className="font-['DM_Sans'] text-2xl md:text-3xl font-bold text-white">
          {isEditing ? 'Editar Producto' : 'Agregar Producto'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8ff47]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
            
            <h3 className="font-['DM_Sans'] text-2xl text-white mb-6 font-bold">Product Details</h3>
            
            <div className="space-y-6 relative z-10">
              <div>
                <label className="block text-xs font-bold text-[#8b8b94] mb-2 uppercase tracking-wider">Sneaker Name</label>
                <input 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full rounded-lg bg-[#0a0a0b] border border-white/10 px-4 py-3 text-white focus:border-[#e8ff47] focus:outline-none transition-all" 
                  placeholder="e.g. Nike Air Max 90 Off-White" 
                  type="text" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#8b8b94] mb-2 uppercase tracking-wider">Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b8b94]">$</span>
                    <input 
                      required
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="w-full rounded-lg bg-[#0a0a0b] border border-white/10 pl-8 pr-4 py-3 text-white focus:border-[#e8ff47] focus:outline-none transition-all" 
                      placeholder="0.00" 
                      step="0.01" 
                      type="number" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8b8b94] mb-2 uppercase tracking-wider">Stock</label>
                  <input 
                    required
                    value={formData.stock}
                    onChange={e => setFormData({...formData, stock: e.target.value})}
                    className="w-full rounded-lg bg-[#0a0a0b] border border-white/10 px-4 py-3 text-white focus:border-[#e8ff47] focus:outline-none transition-all" 
                    placeholder="0" 
                    type="number" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8b8b94] mb-2 uppercase tracking-wider">Category</label>
                  <select 
                    required
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full rounded-lg bg-[#0a0a0b] border border-white/10 px-4 py-3 text-white focus:border-[#e8ff47] focus:outline-none transition-all"
                  >
                    <option value="" disabled>Select...</option>
                    <option value="Running">Running</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-sm">
            <h3 className="font-['DM_Sans'] text-2xl text-white mb-4 font-bold">Media</h3>
            
            {formData.image_url ? (
              <div className="mb-4 aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0b] relative group">
                <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover mix-blend-screen" />
                <button type="button" onClick={() => setFormData({...formData, image_url: ''})} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">Eliminar</button>
              </div>
            ) : (
              <label 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[200px] block ${isDragging ? 'border-[#e8ff47] bg-[#e8ff47]/10' : 'border-white/10 hover:bg-white/5 hover:border-[#e8ff47]/50'}`}
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-[#e8ff47]">
                  <CloudUpload className="w-8 h-8" />
                </div>
                <p className="text-white font-medium mb-1">Haz clic o arrastra para subir imagen</p>
                <p className="text-[#8b8b94] text-xs">Se guardará en Supabase Storage</p>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            )}

            <div className="mt-4 pt-4 border-t border-white/10">
              <label className="block text-xs font-bold text-[#8b8b94] mb-2 uppercase tracking-wider">Or provide Image URL</label>
              <input 
                value={formData.image_url}
                onChange={e => setFormData({...formData, image_url: e.target.value})}
                className="w-full rounded-lg bg-[#0a0a0b] border border-white/10 px-4 py-2 text-sm text-white focus:border-[#e8ff47] focus:outline-none" 
                placeholder="https://..." 
                type="url" 
              />
            </div>
          </div>

          <div className="bg-[#111114] border border-white/10 rounded-xl p-6 shadow-sm flex flex-col gap-4">
            <button type="submit" disabled={loading} className="w-full py-4 rounded-lg bg-[#e8ff47] text-[#0a0a0b] font-bold hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70">
              <Save className="w-5 h-5" />
              {loading ? 'Guardando...' : 'Guardar Producto'}
            </button>
            <button type="button" onClick={() => navigate('/')} className="w-full py-4 rounded-lg bg-transparent border border-white/20 text-white font-bold hover:bg-white/5 active:scale-[0.98] transition-all">
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}
