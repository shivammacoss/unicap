import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { Plus, Edit2, Trash2, Image, Eye, EyeOff, GripVertical, Link, Calendar } from 'lucide-react'
import { API_URL, API_BASE_URL } from '../config/api'
import toast from 'react-hot-toast'

const AdminBannerManagement = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingBanner, setEditingBanner] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    order: 0,
    isActive: true,
    bannerType: 'hero',
    startDate: '',
    endDate: ''
  })
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      const res = await fetch(`${API_URL}/banners`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setBanners(data.banners)
      }
    } catch (error) {
      console.error('Error fetching banners:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('adminToken')
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('link', formData.link)
      formDataToSend.append('order', formData.order)
      formDataToSend.append('isActive', formData.isActive)
      formDataToSend.append('bannerType', formData.bannerType)
      if (formData.startDate) formDataToSend.append('startDate', formData.startDate)
      if (formData.endDate) formDataToSend.append('endDate', formData.endDate)
      if (imageFile) formDataToSend.append('image', imageFile)

      const url = editingBanner ? `${API_URL}/banners/${editingBanner._id}` : `${API_URL}/banners`
      const method = editingBanner ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataToSend
      })

      const data = await res.json()
      if (data.success) {
        fetchBanners()
        setShowModal(false)
        resetForm()
      } else {
        toast.error(data.message || 'Error saving banner')
      }
    } catch (error) {
      console.error('Error saving banner:', error)
      toast.error('Error saving banner')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (banner) => {
    setEditingBanner(banner)
    setFormData({
      title: banner.title,
      link: banner.link || '',
      order: banner.order || 0,
      isActive: banner.isActive,
      bannerType: banner.bannerType || 'hero',
      startDate: banner.startDate ? banner.startDate.split('T')[0] : '',
      endDate: banner.endDate ? banner.endDate.split('T')[0] : ''
    })
    setImagePreview(banner.imageUrl ? (banner.imageUrl.startsWith('http') ? banner.imageUrl : `${API_BASE_URL}${banner.imageUrl}`) : null)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this banner?')) return

    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch(`${API_URL}/banners/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        fetchBanners()
      }
    } catch (error) {
      console.error('Error deleting banner:', error)
    }
  }

  const handleToggle = async (id) => {
    try {
      const token = localStorage.getItem('adminToken')
      const res = await fetch(`${API_URL}/banners/${id}/toggle`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        fetchBanners()
      }
    } catch (error) {
      console.error('Error toggling banner:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      link: '',
      order: 0,
      isActive: true,
      bannerType: 'hero',
      startDate: '',
      endDate: ''
    })
    setImageFile(null)
    setImagePreview(null)
    setEditingBanner(null)
  }

  const openAddModal = () => {
    resetForm()
    setShowModal(true)
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Banner Management</h1>
            <p className="text-gray-400 mt-1">Manage promotional banners for user dashboard</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-[#CFF12F] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#b8d929] transition-colors"
          >
            <Plus size={20} />
            Add Banner
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Image className="text-blue-500" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Banners</p>
                <p className="text-2xl font-bold text-white">{banners.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Eye className="text-green-500" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Active Banners</p>
                <p className="text-2xl font-bold text-white">{banners.filter(b => b.isActive).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <EyeOff className="text-red-500" size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Inactive Banners</p>
                <p className="text-2xl font-bold text-white">{banners.filter(b => !b.isActive).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Banners Grid */}
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">All Banners</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : banners.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <Image size={48} className="mx-auto mb-4 opacity-50" />
              <p>No banners found. Add your first banner!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {banners.map((banner) => (
                <div key={banner._id} className="bg-[#0d0d0d] rounded-lg border border-gray-700 overflow-hidden">
                  <div className="relative aspect-[16/9] bg-gray-800">
                    <img
                      src={banner.imageUrl?.startsWith('http') ? banner.imageUrl : `${API_BASE_URL}${banner.imageUrl}`}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (!e.target.dataset.fallback) {
                          e.target.dataset.fallback = 'true'
                          e.target.src = 'https://via.placeholder.com/400x225?text=Banner'
                        }
                      }}
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        banner.bannerType === 'support' ? 'bg-purple-500/20 text-purple-400' : 
                        banner.bannerType === 'ib' ? 'bg-orange-500/20 text-orange-400' :
                        banner.bannerType === 'account' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {banner.bannerType === 'support' ? 'Support' : banner.bannerType === 'ib' ? 'IB' : banner.bannerType === 'account' ? 'Account' : 'Hero'}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        banner.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {banner.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{banner.title}</h3>
                    {banner.link && (
                      <p className="text-gray-400 text-sm truncate flex items-center gap-1">
                        <Link size={14} />
                        {banner.link}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-gray-500 text-xs">Order: {banner.order}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggle(banner._id)}
                          className={`p-2 rounded-lg transition-colors ${
                            banner.isActive 
                              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                          }`}
                          title={banner.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {banner.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          onClick={() => handleEdit(banner)}
                          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(banner._id)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">
                  {editingBanner ? 'Edit Banner' : 'Add New Banner'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Banner Image *</label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null)
                            setImageFile(null)
                          }}
                          className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-1 rounded-full"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Image size={48} className="mx-auto text-gray-600 mb-2" />
                        <p className="text-gray-400">Click to upload image</p>
                        <p className="text-gray-500 text-xs mt-1">Recommended: 1920x500 px (4:1 ratio) | Max: 5MB</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Banner Type */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Banner Type *</label>
                  <select
                    value={formData.bannerType}
                    onChange={(e) => setFormData({ ...formData, bannerType: e.target.value })}
                    className="w-full bg-[#0d0d0d] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#CFF12F]"
                  >
                    <option value="hero">Hero (Dashboard)</option>
                    <option value="support">Support (Support Page)</option>
                    <option value="ib">IB (IB Page)</option>
                    <option value="account">Account (Account Page)</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      resetForm()
                    }}
                    className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || (!imageFile && !editingBanner)}
                    className="flex-1 bg-[#CFF12F] text-black py-3 rounded-lg font-semibold hover:bg-[#b8d929] transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : editingBanner ? 'Update Banner' : 'Add Banner'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminBannerManagement
