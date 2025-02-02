import React, { useEffect, useState, useRef } from 'react';
import { MediaItem } from '../types';
import MediaRow from './MediaRow';
import { fetchMediaData } from '../data/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ITEMS_PER_ROW = 8;
const ROW_HEIGHT = 300; // Approximate height of each row in pixels

const MediaGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedPosition = useSelector((state: RootState) => state.navigation.selectedPosition);
  
  const [mediaData, setMediaData] = useState<{
    latest: MediaItem[];
    recommended: MediaItem[];
    tvPrograms: MediaItem[];
    movies: MediaItem[];
  }>({ latest: [], recommended: [], tvPrograms: [], movies: [] });

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMediaData();
      setMediaData(data);
    };
    getData();
  }, []);

  // Handle scrolling when selection changes
  useEffect(() => {
    if (containerRef.current) {
      const newScrollPosition = selectedPosition.row * ROW_HEIGHT;
      containerRef.current.scrollTo({
        top: newScrollPosition,
        behavior: 'smooth'
      });
    }
  }, [selectedPosition.row]);

  const { latest, recommended, tvPrograms, movies } = mediaData;

  const rows = [
    { title: "Latest", items: latest },
    { title: "Recommended", items: recommended },
    { title: "TV Programs", items: tvPrograms },
    { title: "Movies", items: movies }
  ];

  return (
    <div 
      ref={containerRef}
      className="py-8 ml-30 max-w-[90vw] h-screen overflow-y-auto no-scrollbar"
    >
      {rows.map((row, index) => (
        <MediaRow
          key={row.title}
          title={row.title}
          items={row.items}
          rowIndex={index}
          itemsPerRow={ITEMS_PER_ROW}
        />
      ))}
    </div>
  );
};

export default MediaGrid;