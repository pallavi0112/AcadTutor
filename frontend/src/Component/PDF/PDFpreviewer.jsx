import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PDFpreviewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile , setPdfFile] = useState(null)
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
    <input type='file' onChange={(e) =>{setPdfFile(e.target.files[0])}}/>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default PDFpreviewer ;