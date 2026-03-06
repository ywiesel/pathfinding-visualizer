const rows = 10;
const cols = 10;
const gridContainer = document.getElementById("grid-container");

let grid = [];
let start = [0, 0];
let goal = [rows-1, cols-1];

// Create grid
for (let r = 0; r < rows; r++) {
  let row = [];
  for (let c = 0; c < cols; c++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (r === start[0] && c === start[1]) cell.classList.add("start");
    if (r === goal[0] && c === goal[1]) cell.classList.add("goal");

    // Toggle wall on click
    cell.addEventListener("click", () => {
      if (!cell.classList.contains("start") && !cell.classList.contains("goal")) {
        cell.classList.toggle("wall");
      }
    });

    gridContainer.appendChild(cell);
    row.push(cell);
  }
  grid.push(row);
}

// BFS function
function bfs() {
  const visited = Array.from({length: rows}, () => Array(cols).fill(false));
  const parent = Array.from({length: rows}, () => Array(cols).fill(null));
  const queue = [start];
  visited[start[0]][start[1]] = true;

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    if (r === goal[0] && c === goal[1]) break;

    const directions = [[1,0],[0,1],[-1,0],[0,-1]];
    for (const [dr, dc] of directions) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && 
          !visited[nr][nc] && !grid[nr][nc].classList.contains("wall")) {
        queue.push([nr, nc]);
        visited[nr][nc] = true;
        parent[nr][nc] = [r, c];
        grid[nr][nc].classList.add("visited");
      }
    }
  }

  // Draw path
  let curr = goal;
  while (curr) {
    const [r, c] = curr;
    if (!grid[r][c].classList.contains("start") && !grid[r][c].classList.contains("goal")) {
      grid[r][c].classList.add("path");
    }
    curr = parent[r][c];
  }
}

// Event listeners
document.getElementById("start-btn").addEventListener("click", bfs);

document.getElementById("reset-btn").addEventListener("click", () => {
  grid.forEach(row => row.forEach(cell => {
    cell.className = "cell";
  }));
  grid[start[0]][start[1]].classList.add("start");
  grid[goal[0]][goal[1]].classList.add("goal");
});
