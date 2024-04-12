const folderConfig = [
  {
    size: 256,
    points: "12 16 102 16 102 40 244 40 244 232 12 232 12 16",
    x: 17,
    y: 21,
    width: 80,
    height: 19,
    rectangles: {
      default: {
        mode: "default",
        x: 28,
        y: 51,
        width: 36,
        height: 12,
        margin: 5,
        nx: 5,
        ny: 10,
      },
      even: {
        mode: "even",
        margin: 5,
        x1: 28,
        y1: 51,
        x2: 228,
        y2: 216,
      },
    },
  },
  {
    size: 128,
    points: "6 8 51 8 51 20 122 20 122 116 6 116 6 8",
    x: 9,
    y: 11,
    width: 39,
    height: 9,
    rectangles: {
      default: {
        mode: "default",
        x: 33,
        y: 30,
        width: 18,
        height: 6,
        margin: 3,
        nx: 4,
        ny: 9,
      },
      even: {
        mode: "even",
        margin: 3,
        x1: 14,
        y1: 28,
        x2: 114,
        y2: 108,
      },
    },
  },
  {
    size: 64,
    points: "3 4 25 4 25 10 61 10 61 58 3 58 3 4",
    x: 5,
    y: 6,
    width: 18,
    height: 4,
    rectangles: {
      default: {
        mode: "default",
        x: 15,
        y: 16,
        width: 9,
        height: 3,
        margin: 2,
        nx: 4,
        ny: 8,
      },
      even: {
        mode: "even",
        margin: 2,
        x1: 7,
        y1: 14,
        x2: 57,
        y2: 54,
      }
    },
  },
  {
    size: 48,
    points: "3 3 19 3 19 7 45 7 45 44 3 44 3 3",
    x: 4,
    y: 4,
    width: 13,
    height: 3,
    rectangles: {
      default: {
        mode: "default",
        x: 12,
        y: 11,
        width: 6,
        height: 2,
        margin: 2,
        nx: 4,
        ny: 8,
      },
      even: {
        mode: "even",
        margin: 2,
        x1: 6,
        y1: 10,
        x2: 42,
        y2: 41,
      },
    },
  },
  {
    size: 32,
    points: "1 2 13 2 13 5 31 5 31 29 1 29 1 2",
    x: 2,
    y: 3,
    width: 10,
    height: 2,
    rectangles: {
      default: {
        mode: "default",
        x: 4,
        y: 8,
        width: 4,
        height: 1,
        margin: 1,
        nx: 5,
        ny: 10,
      },
      even: {
        mode: "even",
        margin: 1,
        x1: 4,
        y1: 8,
        x2: 28,
        y2: 27,
      },
    },
  },
  {
    size: 24,
    points: "1 1 10 1 10 4 23 4 23 22 1 22 1 1",
    x: 2,
    y: 2,
    width: 7,
    height: 2,
    rectangles: {
      default: {
        mode: "default",
        x: 6,
        y: 7,
        width: 3,
        height: 1,
        margin: 1,
        nx: 4,
        ny: 7,
      },
      even: {
        mode: "even",
        margin: 1,
        x1: 3,
        y1: 6,
        x2: 21,
        y2: 20,
      },
    },
  },
  {
    size: 16,
    points: "0 1 0 15 16 15 16 3 7 3 7 1 0 1",
    x: 1,
    y: 2,
    width: 5,
    height: 1,
    rectangles: {
      default: {
        mode: "default",
        x: 4,
        y: 5,
        width: 3,
        height: 1,
        margin: 1,
        nx: 3,
        ny: 5,
      },
      even: {
        mode: "even",
        margin: .5,
        x1: 1,
        y1: 4,
        x2: 15,
        y2: 14,
      },
    },
  },
];

const renderingModes = {
  default: (rectangles) => {
    return Array.from({ length: rectangles.nx }, (_, indexX) => (
      <g key={indexX}>
        {Array.from({ length: rectangles.ny }, (_, indexY) => (
          <rect
            key={`${indexX}-${indexY}`}
            fill="#888888"
            x={Math.round(
              rectangles.x + indexX * (rectangles.width + rectangles.margin)
            )}
            y={Math.round(
              rectangles.y + indexY * (rectangles.height + rectangles.margin)
            )}
            width={rectangles.width}
            height={rectangles.height}
          />
        ))}
      </g>
    ));
  },
  even: (rectangles) => {
    const { x1, y1, x2, y2, margin, } = rectangles;
    const columnWidth = (x2 - x1 - (4 * margin)) / 5;
    const rowHeight = (y2 - y1 - (9 * margin)) / 10;

    return Array.from({ length: 5 }, (_, indexX) => (
      <g key={indexX}>
        {Array.from({ length: 10 }, (_, indexY) => (
          <rect
            key={`${indexX}-${indexY}`}
            fill="#888888"
            x={x1 + indexX * (columnWidth + margin)}
            y={y1 + indexY * (rowHeight + margin)}
            width={columnWidth}
            height={rowHeight}
          />
        ))}
      </g>
    ));
  },
};

const Folder = ({ size, points, x, y, width, height, rectangles }) => {
  const renderRectangles = () => {
    const renderingMode = renderingModes[rectangles.mode] || renderingModes.default;
    return renderingMode(rectangles);
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} id={size}>
      <polygon fill="#222222" points={points}/>
      <rect fill="#666666" x={x} y={y} width={width} height={height}/>
      <g>{renderRectangles()}</g>
    </svg>
  );
}

function App() {
  return (
    <main>
      <div style={{ imageRendering: "smooth" }}>
        {folderConfig.map((config) => (
          <Folder
            size={config.size}
            points={config.points}
            x={config.x}
            y={config.y}
            width={config.width}
            height={config.height}
            rectangles={config.rectangles.default}
          />
        ))}
      </div>
    </main>
  );
}

export default App;