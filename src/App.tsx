import React, { useRef } from 'react';
import './App.scss';
import { ReactEpubViewer } from 'react-epub-viewer';

function App() {
  const viewerRef = useRef(null);

  return (
    <div className="App">
      <div className="Body">
        <ReactEpubViewer 
          url={'reader/files/The Heroes.epub'}
          ref={viewerRef}
        />
      </div>
    </div>
  );
}

export default App;
