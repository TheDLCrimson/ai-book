export function addResizeHandler(leftElement: HTMLElement, rightElement: HTMLElement, separator: HTMLElement) {
  let startX: number;
  let startWidthLeft: number;
  let startWidthRight: number;

  function onMouseMove(e: MouseEvent) {
    const dx = e.clientX - startX;
    const newWidthLeft = startWidthLeft + dx;
    const newWidthRight = startWidthRight - dx;

    if (newWidthLeft > 200 && newWidthRight > 200) {
      leftElement.style.width = `${newWidthLeft}px`;
      rightElement.style.width = `${newWidthRight}px`;
    }
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  separator.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startWidthLeft = leftElement.getBoundingClientRect().width;
    startWidthRight = rightElement.getBoundingClientRect().width;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}
