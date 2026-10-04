'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

/* Poster image that swaps to the YouTube player on click (Elementor equivalent: Video widget with image overlay). */
export default function VideoPoster({ youtubeId, title, poster }: { youtubeId: string; title: string; poster: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video-poster">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          <img src={poster} alt="" width={1920} height={1080} loading="lazy" />
          <span className="video-play" aria-hidden="true"><Play size={26} fill="currentColor" /></span>
          <span className="video-title">{title}</span>
        </button>
      )}
    </div>
  );
}
