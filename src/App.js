// import './App.css';
import * as React from 'react';
import { useState } from 'react';
import { Box, Grid, Button, ButtonGroup } from '@mui/joy';
import { useColorScheme, Switch } from '@mui/joy';
import theme from './theme';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import CustomColorPicker from './CustomColorPicker';
import { toPng } from 'html-to-image';

const downloadIcon = () => {
  const svgElement = document.getElementById('output');
  toPng(svgElement)
    .then((dataUrl) => {
      const blob = dataURLToBlob(dataUrl);
      const formData = new FormData();
      formData.append('pngFile', blob, 'icon.png');

      // Assuming your server runs on localhost:3001 and the endpoint is /convert-icon
      fetch('http://localhost:3001/convert-icon', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'icon.ico');
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => console.error('Error:', err));
    })
    .catch((error) => {
      console.error('Could not convert SVG to PNG:', error);
    });
};

function dataURLToBlob(dataUrl) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {type: mime});
}


function ThemeToggler() {
  const { mode, setMode } = useColorScheme();

  const handleModeChange = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <Switch
      checked={mode === 'dark'}
      onChange={handleModeChange}
      color="neutral"
      size="md"
    />
  );
}

const Rectangle = ({ id, x, y, width, height, color, onClick }) => {
  return (
    <rect
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={color}
      onMouseDown={(e) => onClick(e, id)}
      onMouseEnter={(e) => e.buttons === 1 && onClick(e, id)} // Change color on drag
    />
  );
};

const rectangleConfig = [
  { id: 'a1', x: 28, y: 51, width: 36, height: 12 },
  { id: 'b1', x: 69, y: 51, width: 36, height: 12 },
  { id: 'c1', x: 110, y: 51, width: 36, height: 12 },
  { id: 'd1', x: 151, y: 51, width: 36, height: 12 },
  { id: 'e1', x: 192, y: 51, width: 36, height: 12 },
  { id: 'a2', x: 28, y: 68, width: 36, height: 12 },
  { id: 'b2', x: 69, y: 68, width: 36, height: 12 },
  { id: 'c2', x: 110, y: 68, width: 36, height: 12 },
  { id: 'd2', x: 151, y: 68, width: 36, height: 12 },
  { id: 'e2', x: 192, y: 68, width: 36, height: 12 },
  { id: 'a3', x: 28, y: 85, width: 36, height: 12 },
  { id: 'b3', x: 69, y: 85, width: 36, height: 12 },
  { id: 'c3', x: 110, y: 85, width: 36, height: 12 },
  { id: 'd3', x: 151, y: 85, width: 36, height: 12 },
  { id: 'e3', x: 192, y: 85, width: 36, height: 12 },
  { id: 'a4', x: 28, y: 102, width: 36, height: 12 },
  { id: 'b4', x: 69, y: 102, width: 36, height: 12 },
  { id: 'c4', x: 110, y: 102, width: 36, height: 12 },
  { id: 'd4', x: 151, y: 102, width: 36, height: 12 },
  { id: 'e4', x: 192, y: 102, width: 36, height: 12 },
  { id: 'a5', x: 28, y: 119, width: 36, height: 12 },
  { id: 'b5', x: 69, y: 119, width: 36, height: 12 },
  { id: 'c5', x: 110, y: 119, width: 36, height: 12 },
  { id: 'd5', x: 151, y: 119, width: 36, height: 12 },
  { id: 'e5', x: 192, y: 119, width: 36, height: 12 },
  { id: 'a6', x: 28, y: 136, width: 36, height: 12 },
  { id: 'b6', x: 69, y: 136, width: 36, height: 12 },
  { id: 'c6', x: 110, y: 136, width: 36, height: 12 },
  { id: 'd6', x: 151, y: 136, width: 36, height: 12 },
  { id: 'e6', x: 192, y: 136, width: 36, height: 12 },
  { id: 'a7', x: 28, y: 153, width: 36, height: 12 },
  { id: 'b7', x: 69, y: 153, width: 36, height: 12 },
  { id: 'c7', x: 110, y: 153, width: 36, height: 12 },
  { id: 'd7', x: 151, y: 153, width: 36, height: 12 },
  { id: 'e7', x: 192, y: 153, width: 36, height: 12 },
  { id: 'a8', x: 28, y: 170, width: 36, height: 12 },
  { id: 'b8', x: 69, y: 170, width: 36, height: 12 },
  { id: 'c8', x: 110, y: 170, width: 36, height: 12 },
  { id: 'd8', x: 151, y: 170, width: 36, height: 12 },
  { id: 'e8', x: 192, y: 170, width: 36, height: 12 },
  { id: 'a9', x: 28, y: 187, width: 36, height: 12 },
  { id: 'b9', x: 69, y: 187, width: 36, height: 12 },
  { id: 'c9', x: 110, y: 187, width: 36, height: 12 },
  { id: 'd9', x: 151, y: 187, width: 36, height: 12 },
  { id: 'e9', x: 192, y: 187, width: 36, height: 12 },
  { id: 'a10', x: 28, y: 204, width: 36, height: 12 },
  { id: 'b10', x: 69, y: 204, width: 36, height: 12 },
  { id: 'c10', x: 110, y: 204, width: 36, height: 12 },
  { id: 'd10', x: 151, y: 204, width: 36, height: 12 },
  { id: 'e10', x: 192, y: 204, width: 36, height: 12 },
];

function App() {
  const [selectedColor, setSelectedColor] = useState('#000'); // Default color
  const [rectangles, setRectangles] = useState(
    rectangleConfig.map(rect => ({ ...rect, color: '#222222' }))
  );

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const changeRectangleColor = (event, id) => {
    const newRectangles = rectangles.map(rect => {
      if (rect.id === id) {
        return { ...rect, color: selectedColor };
      }
      return rect;
    });
    setRectangles(newRectangles);
  };

  const resetColors = () => {
    setRectangles(rectangles.map(rect => {
      return { ...rect, color: '#222222' };
    }));
  };

  return (
    <main>
      <CssBaseline />
      <CssVarsProvider theme={theme} initialColorMode="dark">
        <Box
          sx={{
            p: 2,
          }}
        >
          <Grid container>
            <Grid xs={6} container direction="column" gap={2}>
              <ButtonGroup spacing="0.5rem" sx={{ '--ButtonGroup-radius': '40px' }}>
                <ThemeToggler />
                <Button onClick={resetColors}>Reset</Button>
                <Button>Default</Button>
                <Button onClick={downloadIcon}>Export as Icon</Button>
              </ButtonGroup>

              <CustomColorPicker
                color={selectedColor}
                onChangeComplete={handleColorChange}
              />
            </Grid>
            <Grid xs={6}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 256 256"
                id="output"
              >
                <polygon id="folder" className="folder" fill="#222222" points="12,16 102,16 102,40 244,40 244,232 12,232 "/>
                <rect id="tab" x="17" y="21" className="folder-tab" fill="#666666" width="80" height="19"/>

                {rectangles.map((config) => (
                  <Rectangle
                    key={config.id}
                    id={config.id}
                    x={config.x}
                    y={config.y}
                    width={config.width}
                    height={config.height}
                    color={config.color}
                    onClick={changeRectangleColor}
                  />
                ))}
              </svg>
            </Grid>
          </Grid>
        </Box>
      </CssVarsProvider>
    </main>
  );
}

export default App;
