
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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, PlayCircle } from 'lucide-react';

const galleryData = {
  '2024': ['1.jpg', '2.jpg', '3.jpg', '4.1.jpg'],
  '2023': ['1.jpg', '2.jpg', '3.jpg'],
  '2022': ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
  'Previous Year': ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'],
  'Videos': [
    {
      thumbnail: 'https://placehold.co/400x400.png',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      hint: 'community event video'
    },
    {
      thumbnail: 'https://placehold.co/400x400.png',
      videoUrl: 'https://www.youtube.com/embed/o-YBDTqX_ZU',
      hint: 'celebration video'
    }
  ],
};

const years = ['2024', '2023', '2022', 'Previous Year', 'Videos'];

export default function GalleryPage() {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const isVideoSection = selectedYear === 'Videos';
  const currentItems = galleryData[selectedYear as keyof typeof galleryData];

  const openLightbox = (index: number) => {
    if (isVideoSection) {
      const item = currentItems[index] as { videoUrl: string };
      setVideoUrl(item.videoUrl);
    } else {
      setVideoUrl(null);
      setSelectedImageIndex(index);
    }
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setVideoUrl(null);
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isVideoSection) {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % currentItems.length);
    }
  };

  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isVideoSection) {
      setSelectedImageIndex((prevIndex) => (prevIndex - 1 + currentItems.length) % currentItems.length);
    }
  };

  const getImageUrl = (year: string, image: string | number, index: number) => {
    if (typeof image === 'string' && image.includes('.')) {
      if (year === 'Previous Year') {
        return `/previousYear/${image}`;
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
        {currentItems.map((item, index) => {
            if (isVideoSection) {
              const video = item as { thumbnail: string; hint: string };
              return (
                <div 
                  key={`${selectedYear}-${index}`} 
                  className="group relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={video.thumbnail}
                    alt={`Video thumbnail ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    data-ai-hint={video.hint}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white/80 transform transition-transform group-hover:scale-110" />
                  </div>
                </div>
              )
            }
            
            const imageSrc = getImageUrl(selectedYear, item, index);
            
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

      <Dialog open={lightboxOpen} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-screen-xl w-full h-full sm:h-auto max-h-[90vh] bg-transparent border-0 p-0 shadow-none flex items-center justify-center">
            <DialogTitle className="sr-only">Image and Video Lightbox</DialogTitle>
            <div className="relative w-full h-full flex items-center justify-center">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-4 right-4 z-50 text-white bg-black/50 hover:bg-black/75 hover:text-white"
                    onClick={closeLightbox}
                >
                    <X className="w-6 h-6" />
                </Button>

                {!videoUrl && (
                  <>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 text-white bg-black/50 hover:bg-black/75 hover:text-white h-12 w-12 rounded-full"
                        onClick={showPrevImage}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 text-white bg-black/50 hover:bg-black/75 hover:text-white h-12 w-12 rounded-full"
                        onClick={showNextImage}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </Button>
                  </>
                )}

                <div className="relative w-full max-w-[80vw] max-h-[90vh] aspect-video">
                    {videoUrl ? (
                      <iframe 
                        src={videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : (
                      <Image
                          src={getImageUrl(selectedYear, currentItems[selectedImageIndex], selectedImageIndex)}
                          alt={`Gallery image ${selectedImageIndex + 1} from ${selectedYear}`}
                          fill
                          className="object-contain"
                      />
                    )}
                </div>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
