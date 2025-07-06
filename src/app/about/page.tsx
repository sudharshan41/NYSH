import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const seasons = [
  {
    year: '2024',
    title: 'HPL Season 3',
    subtitle: 'Champions',
    images: Array(3).fill(0),
    hint: 'cricket tournament'
  },
  {
    year: '2023',
    title: 'HPL Season 4',
    subtitle: 'Champions',
    images: Array(4).fill(0),
    hint: 'cricket tournament'
  },
  {
    year: '2022',
    title: 'Nethaji cup S01',
    images: Array(6).fill(0),
    hint: 'cricket celebration'
  },
  {
    year: '2021',
    title: "Junior's Cup",
    images: Array(1).fill(0),
    hint: 'cricket team'
  },
];


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

      <div className="mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-headline font-semibold mb-4">Our History</h2>
          <p className="text-muted-foreground leading-relaxed">
            Founded in 2018, our journey began as a small group of friends with a shared passion. Over the years, we have grown into a vibrant organization. We cherish our history and the journey that has shaped us into the strong, supportive community we are today.
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
        <h2 className="text-3xl font-headline font-semibold mb-8">NYSH Cricket</h2>
        <div className="space-y-16">
          {seasons.map((season) => (
            <div key={season.year}>
              <div className="mb-6">
                <h3 className="text-2xl font-headline font-semibold">{season.title}</h3>
                {season.subtitle && (
                  <p className="text-xl font-semibold text-accent">{season.subtitle}</p>
                )}
              </div>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto"
              >
                <CarouselContent>
                  {season.images.map((_, index) => {
                    const isNethajiCupFirstImage = season.title === 'Nethaji cup S01' && index === 0;
                    const isHPLSeason3 = season.title === 'HPL Season 3';
                    const isHPLSeason4 = season.title === 'HPL Season 4';
                    const isJuniorsCup = season.title === "Junior's Cup";

                    let imageSrc = `https://placehold.co/600x600.png?id=${season.year}-${index}`;

                    if (isNethajiCupFirstImage) {
                      imageSrc = '/s01/1.jpg';
                    } else if (isHPLSeason3) {
                      imageSrc = `/s01/${index + 1}.jpg`;
                    } else if (isHPLSeason4) {
                      imageSrc = `/s02/${index + 1}.jpg`;
                    } else if (isJuniorsCup) {
                      imageSrc = '/s02/jr.jpg';
                    }

                    return (
                      <CarouselItem key={index} className="basis-full">
                        <div className="p-1">
                          <div className="aspect-square relative group overflow-hidden rounded-lg shadow-lg">
                            <Image
                              src={imageSrc}
                              alt={`Season ${season.year} Image ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                              data-ai-hint={season.hint}
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
