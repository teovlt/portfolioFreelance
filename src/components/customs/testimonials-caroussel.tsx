"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useTranslation } from "react-i18next";

interface Review {
  id: number;
  name: string;
  company: string;
  rating: number;
  comment: string;
  avatar: string;
  project: string;
}

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  const reviews = t("reviews.list", { returnObjects: true }) as unknown as Review[];

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const [currentItemsPerView, setCurrentItemsPerView] = useState(itemsPerView.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCurrentItemsPerView(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setCurrentItemsPerView(itemsPerView.tablet);
      } else {
        setCurrentItemsPerView(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - currentItemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(Math.min(index, maxIndex));
    },
    [maxIndex],
  );

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, nextSlide]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ));
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + currentItemsPerView);
  if (visibleReviews.length < currentItemsPerView) {
    visibleReviews.push(...reviews.slice(0, currentItemsPerView - visibleReviews.length));
  }

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Carousel Container */}
      <div className="relative overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / currentItemsPerView}%)`,
          }}
        >
          {visibleReviews.map((review, index) => (
            <div key={`${review.id}-${index}`} className="flex-shrink-0 px-3" style={{ width: `${100 / currentItemsPerView}%` }}>
              <Card className="h-full relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-800 transform hover:scale-105">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/50 dark:to-purple-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-blue-100 dark:ring-blue-900 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition-all duration-300">
                        <AvatarFallback className="object-cover w-full h-full">{review.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{review.name}</h4>
                      <p className="text-sm text-muted-foreground font-medium">{review.company}</p>
                      <div className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium mt-2">
                        {review.project}
                      </div>
                      <div className="flex mt-3">{renderStars(review.rating)}</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200 dark:text-blue-800 group-hover:text-blue-300 dark:group-hover:text-blue-700 transition-colors" />
                    <p className="text-muted-foreground leading-relaxed pl-6 italic">"{review.comment}"</p>
                  </div>
                </CardContent>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8">
        {/* Previous/Next Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-12 w-12 rounded-full border-2 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="h-12 w-12 rounded-full border-2 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-500"
              }`}
            />
          ))}
        </div>

        {/* Auto-play Control */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="h-12 w-12 rounded-full border-2 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
        >
          {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
