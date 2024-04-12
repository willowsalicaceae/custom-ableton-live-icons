const express = require('express');
const bodyParser = require('body-parser');
const sharp = require('sharp');
const png2icons = require('png2icons');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.json({ limit: '1mb' }));

app.post('/convert-svg-to-icon', async (req, res) => {
  const svgData = req.body.svg;

  try {
    // Convert SVG to PNG
    const pngBuffer = await sharp(Buffer.from(svgData)).png().toBuffer();

    // Convert PNG to ICO
    const icoBuffer = png2icons.createICO(pngBuffer, png2icons.BILINEAR, 0, false);

    if (!icoBuffer) {
      throw new Error('Failed to convert PNG to ICO.');
    }

    // Send ICO as response
    res.writeHead(200, {
      'Content-Type': 'image/x-icon',
      'Content-Disposition': 'attachment; filename=convertedIcon.ico',
    });
    res.end(icoBuffer);
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).send('Server error during conversion.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use(cors({ origin: 'http://localhost:3000' })); // Adjust the port if necessary
