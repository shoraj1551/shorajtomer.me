import { ServiceForm } from '@/components/admin/service-form'

export default function NewServicePage() {
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Add New Service</h1>
            <ServiceForm />
        </div>
    )
}
