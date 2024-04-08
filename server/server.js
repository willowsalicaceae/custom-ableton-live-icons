const express = require('express');
const multer = require('multer');
const png2icons = require('png2icons');
const fs = require('fs');
const path = require('path');

const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' }); // files will be temporarily saved to "uploads" folder

const port = 3001;

app.use(cors());

app.use(express.static('build')); // Serve static files from the React app build directory

app.post('/convert-icon', upload.single('pngFile'), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");

    // Rename the uploaded file to ensure it has a .png extension
    fs.rename(tempPath, targetPath, err => {
        if (err) return res.status(500).send(err);

        const input = fs.readFileSync(targetPath);
        const output = png2icons.createICO(input, png2icons.BICUBIC, 0, false);

        if (!output) {
            return res.status(500).send('Could not convert the image.');
        }

        // Here we directly send the ICO file; you could also save it to disk first
        res.set('Content-Type', 'image/x-icon');
        res.send(output);

        // Optionally, delete the temporary PNG file after conversion
        fs.unlink(targetPath, err => {
            if (err) console.log("Error deleting temporary file:", err);
        });
    });
});

app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your React app's URL

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
