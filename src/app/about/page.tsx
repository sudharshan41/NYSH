import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tight">
          About NYSH
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Discover our story, our mission, and the values that bring us together.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/WhatsApp Image 2025-07-05 at 23.25.39_65625d0c.jpg"
            alt="Community gathering"
            width={600}
            height={400}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div>
          <h2 className="text-3xl font-headline font-semibold mb-4">Our History</h2>
          <p className="text-muted-foreground leading-relaxed">
            Founded in 2010, our community began as a small group of friends with a shared passion. Over the years, we have grown into a vibrant organization, welcoming members from all walks of life. We cherish our history and the journey that has shaped us into the strong, supportive community we are today.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our mission is to foster a sense of belonging and collaboration among our members. We strive to create a positive and inclusive environment where everyone feels valued, supported, and empowered to contribute their unique talents and ideas.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Inclusivity:</strong> We welcome everyone, regardless of background.</li>
              <li><strong>Respect:</strong> We treat all members with dignity and kindness.</li>
              <li><strong>Collaboration:</strong> We believe in the power of working together.</li>
              <li><strong>Growth:</strong> We encourage personal and professional development.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-16">
        <h2 className="text-3xl font-headline font-semibold mb-4">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {['Team Member 1', 'Team Member 2', 'Team Member 3', 'Team Member 4'].map((name) => (
            <div key={name} className="flex flex-col items-center">
              <Image
                src="https://placehold.co/200x200.png"
                alt={name}
                width={200}
                height={200}
                className="rounded-full mb-4 shadow-md"
                data-ai-hint="person portrait"
              />
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-primary">Role</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
