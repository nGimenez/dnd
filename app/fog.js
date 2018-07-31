function drawFog(fog, grid, mapTile){
    // first we try to draw rectangle
    let fogColor = color(200, 200, 200);
    
    fill(fogColor); 
    noStroke();
    fog.forEach(coord => {
        rect(grid.gridToPx(coord).x, grid.gridToPx(coord).y, grid.cellW, grid.cellH);
    });
}