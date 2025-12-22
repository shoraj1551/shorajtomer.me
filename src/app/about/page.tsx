import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function About() {
  const skills = [
    "Education", "Content Creation", "Storytelling", "Workshops",
    "Course Development", "Public Speaking", "Writing", "Mentoring"
  ]

  const achievements = [
    {
      title: "Educational Impact",
      description: "Mentored hundreds of students in technology and personal growth.",
      year: "2020-Present"
    },
    {
      title: "Content Creation",
      description: "Published numerous articles and stories across various platforms.",
      year: "2019-Present"
    },
    {
      title: "Workshop Facilitation",
      description: "Conducted workshops on effective learning and storytelling.",
      year: "2021-Present"
    },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          About Shoraj Tomer
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Educator, Storyteller, and Content Creator
        </p>
      </div>

      <div className="space-y-12">
        {/* Bio Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">My Story</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p>
                Welcome to my digital space! I&apos;m Shoraj Tomer, a passionate educator and storyteller
                who believes in the transformative power of knowledge. My journey began
                with a simple belief: effective communication can unlock potential.
              </p>
              <p>
                I help individuals and organizations share their knowledge through engaging content.
                Whether it&apos;s through structured courses, interactive workshops, or compelling stories,
                my goal is to make learning accessible and inspiring.
              </p>
              <p>
                On this site, you can explore my professional portfolio, read my latest thoughts,
                and see how we can collaborate.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Skills Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Skills & Expertise</CardTitle>
              <CardDescription>
                Areas where I bring value to projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Achievements Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Key Milestones</CardTitle>
              <CardDescription>
                Highlights from my journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{achievement.title}</h3>
                      <Badge variant="outline">{achievement.year}</Badge>
                    </div>
                    <p className="text-gray-600 mt-1">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Mission Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">My Mission</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p>
                To empower others through education and storytelling. I strive to:
              </p>
              <ul>
                <li>Simplify complex concepts through clear communication</li>
                <li>Inspire audiences through creative narratives</li>
                <li>Foster a community of continuous learners</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}