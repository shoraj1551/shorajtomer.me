import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Shoraj Tomer",
    description: "Get in touch with Shoraj Tomer.",
};

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Get in Touch</h1>
            <p className="mt-4 text-lg text-gray-500">
                Have a project in mind or want to say hello?
            </p>
            {/* Form to be added */}
        </div>
    );
}
