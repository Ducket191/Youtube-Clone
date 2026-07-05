import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express();
app.use(express.json());

app.post('/process-video', (req, res) => {
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  if (!inputFilePath || !outputFilePath) {
    return res.status(400).json({ error: 'Input and output file paths are required.' });
  }

  ffmpeg(inputFilePath)
    .output(outputFilePath)
    .on('end', () => {
      res.status(200).json({ message: 'Video processing completed successfully.' });
    })
    .on('error', (err) => {
      console.error('Error processing video:', err);
      res.status(500).json({ error: 'Error processing video.' });
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});