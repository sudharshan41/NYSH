import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const galleryData = {
  '2024': Array(9).fill(0),
  '2023': Array(6).fill(0),
  '2022': Array(8).fill(0),
  '2021': Array(5).fill(0),
};

export default function GalleryPage() {
  const years = Object.keys(galleryData).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tight">
          Our Gallery
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A collection of moments and memories from our community events throughout the years.
        </p>
      </div>

      <Tabs defaultValue={years[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:mx-auto md:grid-cols-4 mb-8">
          {years.map((year) => (
            <TabsTrigger key={year} value={year}>
              {year}
            </TabsTrigger>
          ))}
        </TabsList>
        {years.map((year) => (
          <TabsContent key={year} value={year}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryData[year as keyof typeof galleryData].map((_, index) => (
                <div key={`${year}-${index}`} className="group relative aspect-square overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={`https://placehold.co/400x400.png?id=${year}-${index}`}
                    alt={`Gallery image ${index + 1} from ${year}`}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    data-ai-hint="community event"
                  />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
