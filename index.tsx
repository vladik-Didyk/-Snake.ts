export const clearBoard = (context: CanvasRenderingContext2D | null) => {
    if (context) {
      context.clearRect(0, 0, 1000, 600);
    }
  };