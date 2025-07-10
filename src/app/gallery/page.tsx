
"use client";

import Image from 'next/image';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const galleryData = {
  '2025': Array(1).fill(0),
  '2024': Array(9).fill(0),
  '2023': Array(6).fill(0),
  '2022': Array(8).fill(0),
  '2021': Array(5).fill(0),
  '2020': Array(7).fill(0),
  '2019': Array(4).fill(0),
  '2018': Array(6).fill(0),
};

const years = Object.keys(galleryData).sort((a, b) => Number(b) - Number(a));

export default function GalleryPage() {
  const [selectedYear, setSelectedYear] = useState(years[0]);

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

      <div className="flex justify-center mb-8">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryData[selectedYear as keyof typeof galleryData].map((_, index) => {
            let imageSrc = `https://placehold.co/400x400.png?id=${selectedYear}-${index}`;
            if (selectedYear === '2024') {
              imageSrc = `/2024/${index + 1}.jpg`;
            } else if (selectedYear === '2025') {
              imageSrc = `/2025/${index + 1}.jpg`;
            }
            
            return (
              <div key={`${selectedYear}-${index}`} className="group relative aspect-square overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={imageSrc}
                  alt={`Gallery image ${index + 1} from ${selectedYear}`}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  data-ai-hint="community event"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              </div>
            )
          })}
      </div>
    </div>
  );
}
