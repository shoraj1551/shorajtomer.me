'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { ServiceService } from '@/services/service.service'
import { Service } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function AdminServiceList() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchServices()
    }, [])

    const fetchServices = async () => {
        try {
            setLoading(true)
            // Custom query to get all services
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('sort_order', { ascending: true })
                .order('created_at', { ascending: false })

            if (error) throw error
            setServices(data as Service[])
        } catch (error) {
            console.error('Error fetching services:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return

        try {
            const service = new ServiceService(supabase)
            await service.delete(id)
            fetchServices()
        } catch (error) {
            console.error('Error deleting service:', error)
        }
    }

    const toggleActive = async (id: string, current: boolean) => {
        try {
            const { error } = await supabase
                .from('services')
                .update({ is_active: !current })
                .eq('id', id)

            if (error) throw error
            fetchServices()
        } catch (error) {
            console.error('Error toggling active:', error)
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Services
                </h1>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/admin/services/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Service
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Services ({services.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="p-4">Title</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Icon</th>
                                    <th className="p-4">Sort Order</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {services.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-50/50">
                                        <td className="p-4 font-medium">
                                            {s.title}
                                        </td>
                                        <td className="p-4">
                                            <Button variant="ghost" size="sm" className={s.is_active ? "text-green-600 bg-green-50" : "text-gray-500 bg-gray-100"} onClick={() => toggleActive(s.id, s.is_active)}>
                                                {s.is_active ? 'Active' : 'Inactive'}
                                            </Button>
                                        </td>
                                        <td className="p-4 text-gray-500 font-mono text-xs">
                                            {s.icon_name || '-'}
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            {s.sort_order}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/services/${s.id}`}>
                                                    <Edit className="h-4 w-4 text-blue-600" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}>
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {services.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            No services found. Add your first service offering!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
