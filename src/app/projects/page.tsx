import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | Shoraj Tomer",
    description: "Case studies and projects by Shoraj Tomer.",
};

export default function ProjectsPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Projects</h1>
            <p className="mt-4 text-lg text-gray-500">
                A selection of my recent work and impact.
            </p>
            {/* Content to be added */}
        </div>
    );
}
