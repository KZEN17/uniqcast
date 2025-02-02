import React from 'react';
import { useDispatch } from 'react-redux';
import { setHoveredPosition } from '../store/slices/navigationSlice';
import { GridPosition, MediaItem } from '../types';
interface MediaCardProps {
  item: MediaItem;
  position: GridPosition;
  isSelected: boolean;
}


const MediaCard: React.FC<MediaCardProps> =  ({ item, position, isSelected }) => {
  const dispatch = useDispatch();

  const formattedDate = new Date(item.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
console.log(item)
  return (
    <div
      className={`
        relative
        w-full
        p-3
        transition-all
        duration-300
        ease-in-out
        group
        ${isSelected ? 'scale-101 z-20' : 'hover:scale-101 hover:z-10'}
      `}
      onMouseEnter={() => dispatch(setHoveredPosition(position))}
    >
      <div
        className={`
          relative
          w-full
          bg-gray-800
          rounded-lg
          overflow-hidden
          shadow-lg
          transition-shadow
          duration-300
          aspect-[2/3]
          ${isSelected 
            ? 'ring-4 ring-blue-500 ring-offset-2 ring-offset-gray-900 shadow-2xl' 
            : 'group-hover:ring-2 group-hover:ring-blue-400 group-hover:ring-offset-1 group-hover:ring-offset-gray-900 group-hover:shadow-2xl'
          }
        `}
      >
        <img 
          src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
          alt={item.title}
          className={`
            w-full 
            h-full 
            object-cover 
            brightness-110 
            contrast-105 
            transition-transform 
            duration-300
            ${isSelected ? 'scale-105' : 'group-hover:scale-105'}
          `}
        />

        {/* Info Overlay - Shows on hover and when selected */}
        <div 
          className={`
            absolute
            inset-0
            flex
            flex-col
            justify-start
            p-4
            pt-8
            bg-gradient-to-b
            from-black/90
            via-black/70
            to-transparent
            text-white
            transform
            transition-all
            duration-300
            ${isSelected 
              ? 'opacity-100' 
              : 'opacity-0 group-hover:opacity-100'
            }
          `}
        >
          <div 
            className={`
              transform 
              transition-all 
              duration-300
              ${isSelected 
                ? 'translate-y-0' 
                : '-translate-y-4 group-hover:translate-y-0'
              }
            `}
          >
            <div className="flex items-center gap-3 mb-2 text-sm text-gray-300">
              <span className="flex items-center">
                <span className="mr-1">⭐</span>
                {item.vote_average.toFixed(1)}
              </span>
              <span>•</span>
              <span>{formattedDate !== 'Invalid Date' ? formattedDate : 'N/A'}</span>
            </div>

            <p className="text-sm text-gray-300 line-clamp-4 overflow-hidden">
              {item.overview}
            </p>
          </div>
        </div>

        {/* Permanent Title Bar */}
        <div 
          className={`
            absolute
            bottom-0
            left-0
            right-0
            p-4
            bg-gradient-to-t
            from-black
            via-black/70
            to-transparent
            text-white
            transform
            transition-transform
            duration-300
            ${isSelected ? 'translate-y-0' : 'translate-y-1 group-hover:translate-y-0'}
          `}
        >
          <h3 className="text-lg font-bold tracking-wide mb-1 truncate">
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;