'use client';

/**
 * Pure client-side PDF generator that creates a valid PDF 1.4 binary file
 * with 36pt title text and structured content lines.
 */
export function downloadDynamicPdf(filename: string, title: string, contentLines: string[] = []) {
  if (typeof window === 'undefined') return;

  const sanitizeText = (text: string) =>
    text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

  const cleanTitle = sanitizeText(title);
  const dateStr = sanitizeText(`Generated: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}`);
  const headerStr = sanitizeText('MVP WEBSITE TEMPLATE - DOCUMENT PREVIEW');

  // Build PDF Stream Instructions
  let streamText = `BT\n`;
  
  // Header Company Line (12pt Helvetica-Bold)
  streamText += `/F2 12 Tf\n50 740 Td\n(${headerStr}) Tj\n`;
  streamText += `/F1 10 Tf\n0 -16 Td\n(${dateStr}) Tj\n`;

  // Title Line in 36pt Helvetica-Bold Font
  streamText += `/F2 36 Tf\n0 -50 Td\n(${cleanTitle}) Tj\n`;

  // Divider Line
  streamText += `/F1 14 Tf\n0 -30 Td\n(==================================================) Tj\n`;

  // Body Content Lines (14pt)
  streamText += `/F1 14 Tf\n`;
  contentLines.forEach((line) => {
    const cleanLine = sanitizeText(line);
    streamText += `0 -24 Td\n(${cleanLine}) Tj\n`;
  });

  streamText += `ET\n`;

  const streamLength = Buffer.byteLength ? Buffer.byteLength(streamText) : streamText.length;

  const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLength} >>
stream
${streamText}endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000300 00000 n 
0000000377 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
459
%%EOF`;

  const blob = new Blob([pdfContent], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.target = '_self';
  link.setAttribute('download', filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
    URL.revokeObjectURL(url);
  }, 200);
}
