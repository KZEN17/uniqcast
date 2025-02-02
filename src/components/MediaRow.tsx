import React from 'react';
import { MediaItem } from '../types';
import MediaCard from './MediaCard';
import { useRowNavigation } from '../hooks/useRowNavigation';

interface MediaRowProps {
  items: MediaItem[];
  rowIndex: number;
  title: string;
  itemsPerRow: number;
}

const MediaRow: React.FC<MediaRowProps> = ({ items, rowIndex, title, itemsPerRow }) => {
  const { selectedIndex, visibleItems } = useRowNavigation({
    itemsPerRow,
    totalItems: items.length,
    rowIndex
  });

  return (
    <div className="flex flex-col no-scrollbar gap-4 mb-8">
      <h4 className="text-white text-lg w-40">
        {title}
      </h4>
      <div className="flex gap-1 overflow-hidden transition-all duration-300 ease-in-out">
        {visibleItems(items).map(({ item, virtualIndex }) => (
          <MediaCard
            key={`${item}-${virtualIndex}`}
            item={item}
            position={{ row: rowIndex, column: virtualIndex }}
            isSelected={selectedIndex === virtualIndex}
    
          />
        ))}
      </div>
    </div>
  );
};

export default MediaRow;