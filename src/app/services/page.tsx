import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | Shoraj Tomer",
    description: "Professional services offered by Shoraj Tomer.",
};

export default function ServicesPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Services</h1>
            <p className="mt-4 text-lg text-gray-500">
                Work with me to elevate your educational content and strategy.
            </p>
            {/* Content to be added */}
        </div>
    );
}
