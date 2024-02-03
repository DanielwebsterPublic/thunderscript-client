// import * as fs from 'fs';
export async function readImageToBuffer(readableStream: ReadableStream<Uint8Array>) {
  // Convert the ReadableStream to a Uint8Array
  const reader = readableStream.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
  }
  const imageData = Buffer.concat(chunks);
  return imageData;
  // Output the image to a file
  //   const outputFile = 'output_image.jpg';
  //   fs.writeFileSync(outputFile, imageData, 'base64');
  //   console.log(`Image file "${outputFile}" has been saved.`);
}
