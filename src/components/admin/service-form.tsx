'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ServiceService } from '@/services/service.service'
import { Service } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Save, ArrowLeft, X } from 'lucide-react'
import Link from 'next/link'

interface ServiceFormProps {
    initialData?: Service
    isEditing?: boolean
}

export function ServiceForm({ initialData, isEditing = false }: ServiceFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [featureInput, setFeatureInput] = useState('')

    const [formData, setFormData] = useState<Partial<Service>>({
        title: initialData?.title || '',
        description: initialData?.description || '',
        features: initialData?.features || [],
        price: initialData?.price || '',
        sort_order: initialData?.sort_order || 0,
        is_active: initialData?.is_active ?? true, // Default to true if undefined
        icon_name: initialData?.icon_name || 'BookOpen'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleAddFeature = () => {
        if (featureInput.trim() && !formData.features?.includes(featureInput.trim())) {
            setFormData(prev => ({ ...prev, features: [...(prev.features || []), featureInput.trim()] }))
            setFeatureInput('')
        }
    }

    const removeFeature = (featureToRemove: string) => {
        setFormData(prev => ({ ...prev, features: (prev.features || []).filter(f => f !== featureToRemove) }))
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddFeature()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const service = new ServiceService(supabase)

            if (isEditing && initialData) {
                await service.update(initialData.id, formData)
            } else {
                await service.create(formData as Service)
            }

            router.push('/admin/services')
            router.refresh()
        } catch (error) {
            console.error('Error saving service:', error)
            alert('Failed to save service')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/admin/services">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to List
                    </Link>
                </Button>
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            {isEditing ? 'Update Service' : 'Create Service'}
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Service Title</Label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Educational Consulting"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Detailed explanation of the service..."
                                    className="min-h-[150px]"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Features</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={featureInput}
                                        onChange={(e) => setFeatureInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Add feature (e.g. Curriculum Design)"
                                    />
                                    <Button type="button" onClick={handleAddFeature} variant="secondary">Add</Button>
                                </div>
                                <div className="flex flex-col gap-2 mt-2">
                                    {formData.features?.map(feature => (
                                        <div key={feature} className="flex items-center justify-between bg-gray-50 p-2 rounded-md border text-sm">
                                            <span>{feature}</span>
                                            <button type="button" onClick={() => removeFeature(feature)} className="text-gray-500 hover:text-red-500">
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <div className="flex items-center space-x-2 border rounded-md p-3">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                                        id="is_active"
                                    />
                                    <Label htmlFor="is_active" className="cursor-pointer">Active Service</Label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Sort Order</Label>
                                <Input
                                    type="number"
                                    name="sort_order"
                                    value={formData.sort_order}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Price (Optional)</Label>
                                <Input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="e.g. Starting at $500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Icon Name (Lucide)</Label>
                                <Input
                                    name="icon_name"
                                    value={formData.icon_name}
                                    onChange={handleChange}
                                    placeholder="e.g. Users, Mic"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}
