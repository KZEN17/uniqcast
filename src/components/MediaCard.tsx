import React from 'react';
import { useDispatch } from 'react-redux';
import { MediaItem, GridPosition } from '../types';
import { setHoveredPosition } from '../store/slices/navigationSlice';

interface MediaCardProps {
  item: MediaItem;
  position: GridPosition;
  isSelected: boolean;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, position, isSelected }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`
        relative
        w-full
        p-2
        transition-all
        duration-300
        ease-in-out
        group
        ${isSelected ? 'scale-103 z-10' : 'hover:scale-103'}
      `}
      onMouseEnter={() => dispatch(setHoveredPosition(position))}
    >
      <div
        className={`
          relative
          aspect-square
          w-full
          bg-gray-800
          rounded-lg
          overflow-hidden
          shadow-lg
          ${isSelected 
            ? 'ring-4 ring-blue-500 ring-offset-2 ring-offset-gray-900' 
            : 'group-hover:ring-2 group-hover:ring-blue-400 group-hover:ring-offset-1 group-hover:ring-offset-gray-900'}
        `}
      >
        <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}  alt={item.title}
          className="w-full h-full object-cover brightness-110 contrast-105" />
  
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