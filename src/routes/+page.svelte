<script>
  import { onMount } from 'svelte';

  let canvas;
  let circles = [];
  let tooltip;

  const ordersPerRegionArea = [
    { region: "AMNIAN EMPIRE", area: "North", totalOrders: 13766 },
    { region: "AMNIAN EMPIRE", area: "South", totalOrders: 27058 },
    { region: "AMNIAN EMPIRE", area: "West", totalOrders: 8213 },
    { region: "BLOODLANDS EMPIRE", area: "East", totalOrders: 3811 },
    { region: "BLOODLANDS EMPIRE", area: "North", totalOrders: 19001 },
    { region: "CALIM EMPIRE", area: "South", totalOrders: 31813 },
    { region: "CALIM EMPIRE", area: "West", totalOrders: 2041 },
    { region: "DWARVEN EMPIRE", area: "North", totalOrders: 10345 },
    { region: "EASTERN EMPIRE", area: "East", totalOrders: 3308 },
    { region: "HALRUAAN EMPIRE", area: "South", totalOrders: 32494 },
    { region: "NEW NEVERWINTER EMPIRE", area: "North", totalOrders: 9436 },
    { region: "NONE EMPIRE", area: "North", totalOrders: 2262 },
    { region: "NONE EMPIRE", area: "Underdark", totalOrders: 3430 },
    { region: "OLD EMPIRE", area: "East", totalOrders: 5929 },
    { region: "PURPLE DRAGON EMPIRE", area: "North", totalOrders: 33957 },
    { region: "SOUTHERN EMPIRE", area: "East", totalOrders: 1858 },
    { region: "THAYAN EMPIRE", area: "East", totalOrders: 27451 },
    { region: "THAYAN EMPIRE", area: "South", totalOrders: 3525 },
    { region: "UNITED MOONSHAE EMPIRE", area: "North", totalOrders: 2953 },
    { region: "UNITED MOONSHAE EMPIRE", area: "West", totalOrders: 22301 },
    { region: "WATERDHAVIAN EMPIRE", area: "North", totalOrders: 11481 },
    { region: "WESTERN EMPIRE", area: "West", totalOrders: 3610 }
  ];

  onMount(() => {
    resizeCanvas();
    const ctx = canvas.getContext('2d');
    drawCurves(ctx);
    canvas.addEventListener('mousemove', handleHover);
  });

  function resizeCanvas() {
    const maxY = Math.max(
      ordersPerRegionArea.filter(d => d.area === 'North').length * 50,
      ordersPerRegionArea.filter(d => d.area === 'South').length * 50
    );
    const maxX = Math.max(
      ordersPerRegionArea.filter(d => d.area === 'East').length * 50,
      ordersPerRegionArea.filter(d => d.area === 'West').length * 50
    );

    canvas.width = 1100; 
    canvas.height = 1000; 
  }

  function drawCurves(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles = [];

    const startX = canvas.width / 2;
    const startY = canvas.height / 2 + 20; 

    // North 
    let northCount = 0;
    ordersPerRegionArea
      .filter(d => d.area === 'North')
      .sort((a, b) => a.totalOrders - b.totalOrders)
      .forEach(data => {
        const yOffset = 50 * northCount++;
        const endX = startX - 40;
        const endY = startY - 80 - yOffset;
        drawCurve(ctx, startX, startY, startX, startY - 60 - yOffset, startX - 20, startY - 70 - yOffset, endX, endY, 'green');
        drawCircle(ctx, endX, endY);
        circles.push({ x: endX, y: endY, region: data.region, totalOrders: data.totalOrders });
      });
    drawText(ctx, 'North', startX, startY - 100 - northCount * 50);

    // East 
    let eastCount = 0;
    ordersPerRegionArea
      .filter(d => d.area === 'East')
      .sort((a, b) => a.totalOrders - b.totalOrders)
      .forEach(data => {
        const xOffset = 50 * eastCount++;
        const endX = startX + 80 + xOffset;
        const endY = startY - 40;
        drawCurve(ctx, startX, startY, startX + 60 + xOffset, startY, startX + 70 + xOffset, startY - 20, endX, endY, 'yellow');
        drawCircle(ctx, endX, endY);
        circles.push({ x: endX, y: endY, region: data.region, totalOrders: data.totalOrders });
      });
    drawText(ctx, 'East', startX + 100 + eastCount * 50, startY);

    // South 
    let southCount = 0;
    ordersPerRegionArea
      .filter(d => d.area === 'South')
      .sort((a, b) => a.totalOrders - b.totalOrders)
      .forEach(data => {
        const yOffset = 50 * southCount++;
        const endX = startX + 40;
        const endY = startY + 80 + yOffset;
        drawCurve(ctx, startX, startY, startX, startY + 60 + yOffset, startX + 20, startY + 70 + yOffset, endX, endY, 'purple');
        drawCircle(ctx, endX, endY);
        circles.push({ x: endX, y: endY, region: data.region, totalOrders: data.totalOrders });
      });
    drawText(ctx, 'South', startX, startY + 100 + southCount * 50);

    // West 
    let westCount = 0;
    ordersPerRegionArea
      .filter(d => d.area === 'West')
      .sort((a, b) => a.totalOrders - b.totalOrders)
      .forEach(data => {
        const xOffset = 50 * westCount++;
        const endX = startX - 80 - xOffset;
        const endY = startY + 40;
        drawCurve(ctx, startX, startY, startX - 60 - xOffset, startY, startX - 70 - xOffset, startY + 20, endX, endY, 'blue');
        drawCircle(ctx, endX, endY);
        circles.push({ x: endX, y: endY, region: data.region, totalOrders: data.totalOrders });
      });
    drawText(ctx, 'West', startX - 100 - westCount * 50, startY);
  }

  function drawCurve(ctx, startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY, color) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  function drawCircle(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
  }

  function drawText(ctx, text, x, y) {
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText(text, x, y);
  }

  function handleHover(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let tooltipContent = '';

    circles.forEach(circle => {
      if (Math.hypot(circle.x - x, circle.y - y) < 5) {
        canvas.style.cursor = 'pointer';
        tooltipContent = `Region: ${circle.region}\nTotal Orders: ${circle.totalOrders}`;
      }
    });

    if (tooltipContent) {
      tooltip.style.display = 'block';
      tooltip.style.left = `${event.clientX + 10}px`;
      tooltip.style.top = `${event.clientY + 10}px`;
      tooltip.textContent = tooltipContent;
    } else {
      tooltip.style.display = 'none';
      canvas.style.cursor = 'default';
    }
  }
</script>

<h2>Orders by Region per Area</h2>
<canvas bind:this={canvas}></canvas>
<div bind:this={tooltip} class="tooltip" style="display: none;"></div>

<style>
  canvas {
    border: 1px solid #000;
  }

  .tooltip {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px;
    border-radius: 5px;
    pointer-events: none;
    font-size: 12px;
  }

  h2 {
    text-align: center;
  }
</style>
