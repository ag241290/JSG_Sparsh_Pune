'use client'

import { useState, useEffect } from 'react'
import { Users, Download, Filter, Search, Eye, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react'
import { getRegistrations } from '@/lib/supabase'
import type { Registration } from '@/lib/supabase'

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter] = useState<'all' | 'male' | 'female' | 'kids'>('all')
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'pending' | 'completed' | 'failed'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadRegistrations()
  }, [])

  const loadRegistrations = async () => {
    setLoading(true)
    const { data, error } = await getRegistrations()
    
    if (error) {
      console.error('Error loading registrations:', error)
    } else if (data) {
      setRegistrations(data)
    }
    
    setLoading(false)
  }

  const refreshData = async () => {
    setRefreshing(true)
    await loadRegistrations()
    setRefreshing(false)
  }

  const filteredRegistrations = registrations.filter(reg => {
    const matchesCategory = filter === 'all' || reg.category === filter
    const matchesPayment = paymentFilter === 'all' || reg.payment_status === paymentFilter
    const matchesSearch = !searchTerm || 
      reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.mobile_number.includes(searchTerm) ||
      reg.jersey_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesPayment && matchesSearch
  })

  const stats = {
    total: registrations.length,
    male: registrations.filter(r => r.category === 'male').length,
    female: registrations.filter(r => r.category === 'female').length,
    kids: registrations.filter(r => r.category === 'kids').length,
    completed: registrations.filter(r => r.payment_status === 'completed').length,
    pending: registrations.filter(r => r.payment_status === 'pending').length
  }

  const exportToCsv = () => {
    const headers = [
      'Registration ID',
      'Category', 
      'Full Name',
      'Parent Name',
      'Mobile Number',
      'Age',
      'Skillset',
      'Bowling Arm',
      'Cricket Experience',
      'Cric Heroes Link',
      'Jersey Name',
      'Jersey Number',
      'Jersey Size',
      'Photo URL',
      'Payment Status',
      'Registration Fee',
      'Approved',
      'Team Assigned',
      'Registration Date',
      'Created At'
    ]

    const csvData = filteredRegistrations.map(reg => [
      reg.id || '',
      reg.category || '',
      reg.full_name || '',
      reg.parent_name || '',
      reg.mobile_number || '',
      reg.age || '',
      reg.skillset || '',
      reg.bowling_arm || '',
      reg.cricket_experience || '',
      reg.cric_heroes_link || '',
      reg.jersey_name || '',
      reg.jersey_number || '',
      reg.jersey_size || '',
      reg.photo_url || '',
      reg.payment_status || '',
      reg.category === 'kids' ? '?600' : '?800', // Add registration fee based on category
      reg.approved ? 'Yes' : 'No',
      reg.team_assigned || '',
      reg.registration_date ? new Date(reg.registration_date).toLocaleDateString() : '',
      reg.created_at ? new Date(reg.created_at).toLocaleString() : ''
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `spl02-registrations-complete-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={20} />
      case 'failed':
        return <XCircle className="text-red-600" size={20} />
      default:
        return <Clock className="text-yellow-600" size={20} />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'male':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'female':
        return 'bg-pink-100 text-pink-800 border-pink-200'
      case 'kids':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading registrations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">SPL 02 Registration Dashboard</h1>
            <p className="text-gray-600">Manage tournament registrations and payments</p>
          </div>
          <button
            onClick={refreshData}
            disabled={refreshing}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
          >
            <RefreshCw size={16} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <div className="flex items-center">
              <Users className="text-blue-600 mr-2" size={20} />
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
              <div>
                <p className="text-sm text-gray-600">Male</p>
                <p className="text-2xl font-bold text-blue-600">{stats.male}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-pink-500">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-pink-600 rounded-full mr-2"></div>
              <div>
                <p className="text-sm text-gray-600">Female</p>
                <p className="text-2xl font-bold text-pink-600">{stats.female}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
              <div>
                <p className="text-sm text-gray-600">Kids</p>
                <p className="text-2xl font-bold text-green-600">{stats.kids}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <div className="flex items-center">
              <CheckCircle className="text-green-600 mr-2" size={20} />
              <div>
                <p className="text-sm text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <div className="flex items-center">
              <Clock className="text-yellow-600 mr-2" size={20} />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search size={16} className="inline mr-1" />
                Search
              </label>
              <input
                type="text"
                placeholder="Name, mobile, or jersey name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter size={16} className="inline mr-1" />
                Category
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="kids">Kids</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Payments</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={exportToCsv}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <Download size={16} className="mr-2" />
                Export All Data
              </button>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jersey
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {registration.full_name}
                        </div>
                        {registration.parent_name && (
                          <div className="text-sm text-gray-500">
                            Parent: {registration.parent_name}
                          </div>
                        )}
                        <div className="text-sm text-gray-500">
                          Age: {registration.age}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(registration.category)}`}>
                        {registration.category.charAt(0).toUpperCase() + registration.category.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{registration.mobile_number}</div>
                      <div className="text-gray-500">{registration.skillset}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="font-medium">{registration.jersey_name}</div>
                      <div className="text-gray-500">#{registration.jersey_number} - {registration.jersey_size}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getPaymentStatusIcon(registration.payment_status)}
                        <span className="ml-2 text-sm font-medium capitalize">
                          {registration.payment_status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(registration.created_at || '').toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center">
                        <Eye size={16} className="mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRegistrations.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No registrations found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredRegistrations.length} of {registrations.length} registrations
        </div>
      </div>
    </div>
  )
}