
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const galleryData = {
  '2024': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '4.1.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg'],
  '2023': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
  '2022': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  '2021': Array(5).fill(0),
  '2020': Array(7).fill(0),
  '2019': Array(4).fill(0),
  '2018': Array(6).fill(0),
};

const years = Object.keys(galleryData).sort((a, b) => Number(b) - Number(a));

export default function GalleryPage() {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const currentYearImages = galleryData[selectedYear as keyof typeof galleryData];

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % currentYearImages.length);
  };

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + currentYearImages.length) % currentYearImages.length);
  };

  const getImageUrl = (year: string, image: string | number, index: number) => {
    // Fallback for other years that use numeric arrays or might have string paths in the future
    if (typeof image === 'string' && image.includes('.')) {
        if (year === '2023') {
            return `/${year}/${image}`;
        }
        if (year === '2022') {
            return `/${year}/${image}`;
        }
        return `/${year}/${image}`;
    }
    return `https://placehold.co/400x400.png?id=${year}-${index}`;
  };

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
        {currentYearImages.map((image, index) => {
            const imageSrc = getImageUrl(selectedYear, image, index);
            
            return (
              <div 
                key={`${selectedYear}-${index}`} 
                className="group relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onClick={() => openLightbox(index)}
              >
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

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-screen-xl w-full h-full sm:h-auto max-h-[90vh] bg-transparent border-0 p-0 shadow-none flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-4 right-4 z-50 text-white bg-black/50 hover:bg-black/75 hover:text-white"
                    onClick={closeLightbox}
                >
                    <X className="w-6 h-6" />
                </Button>

                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 text-white bg-black/50 hover:bg-black/75 hover:text-white h-12 w-12 rounded-full"
                    onClick={showPrevImage}
                >
                    <ChevronLeft className="w-8 h-8" />
                </Button>

                <div className="relative w-full max-w-[80vw] max-h-[90vh] aspect-video">
                    <Image
                        src={getImageUrl(selectedYear, currentYearImages[selectedImageIndex], selectedImageIndex)}
                        alt={`Gallery image ${selectedImageIndex + 1} from ${selectedYear}`}
                        fill
                        className="object-contain"
                    />
                </div>

                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 text-white bg-black/50 hover:bg-black/75 hover:text-white h-12 w-12 rounded-full"
                    onClick={showNextImage}
                >
                    <ChevronRight className="w-8 h-8" />
                </Button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
