'use client'

import { useEffect, useState, use } from 'react'
import { supabase } from '@/lib/supabase'
import { ServiceForm } from '@/components/admin/service-form'
import { ServiceService } from '@/services/service.service'
import { Service } from '@/types'

// Correctly defined PageProps for Next.js App Router dynamic routes
interface PageProps {
    params: Promise<{ id: string }>
}

export default function EditServicePage({ params }: PageProps) {
    // Unwrap params using React.use()
    const { id } = use(params)

    const [service, setService] = useState<Service | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchService = async () => {
            try {
                const svc = new ServiceService(supabase)
                const data = await svc.getById(id)
                if (data) setService(data as Service)
            } catch (error) {
                console.error('Error fetching service:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchService()
    }, [id])

    if (loading) return <div>Loading...</div>
    if (!service) return <div>Service not found</div>

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Edit Service</h1>
            <ServiceForm initialData={service} isEditing />
        </div>
    )
}
