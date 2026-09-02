import React from "react";
import Image from "next/image";

interface ProjectGalleryProps {
  title: string;
  gallery: string[];
}

export default function ProjectGallery({ title, gallery }: ProjectGalleryProps) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold text-[#0c2847] uppercase tracking-wider pb-2 border-b border-gray-100 font-sans">
        Galerie de Photos
      </h3>
      <div className="flex flex-col gap-2">
        {/* First 4 images as 2-column grid */}
        <div className="grid grid-cols-2 gap-2">
          {gallery.slice(0, 4).map((imgUrl, idx) => (
            <div key={idx} className="relative aspect-square rounded-sm overflow-hidden bg-[#f8f9fa] hover:opacity-95 transition-opacity">
              <Image src={imgUrl} alt={`${title} detail top ${idx}`} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 250px" className="object-cover" />
            </div>
          ))}
        </div>

        {/* Remaining images (index 4+) as 3-column grid below */}
        {gallery.length > 4 && (
          <div className="grid grid-cols-3 gap-2">
            {gallery.slice(4).map((imgUrl, idx) => (
              <div key={idx} className="relative aspect-square rounded-sm overflow-hidden bg-[#f8f9fa] hover:opacity-95 transition-opacity">
                <Image src={imgUrl} alt={`${title} detail bottom ${idx}`} fill sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 180px" className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
