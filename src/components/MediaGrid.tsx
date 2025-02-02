import React, { useEffect, useState } from 'react';
import { MediaItem } from '../types';
import MediaRow from './MediaRow';
import { fetchMediaData } from '../data/api';


const ITEMS_PER_ROW = 8;

const MediaGrid: React.FC = () => {
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

  const { latest, recommended, tvPrograms, movies } = mediaData;

  const rows = [
    { title: "Latest", items: latest },
    { title: "Recommended", items: recommended },
    { title: "TV Programs", items: tvPrograms },
    { title: "Movies", items: movies }
  ];

  return (
    <div className="py-8 ml-30 max-w-[90vw] h-full overflow-hidden">
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