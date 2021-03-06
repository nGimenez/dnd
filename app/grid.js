class Grid{
    constructor(name, mapW, mapH, cellW, cellH, color) {
        this.name = name;
        this.pos = createVector(0, 0);
        this.mapH = mapH; // hauteur de la map en px
        this.mapW = mapW; // largeur de la map en px
        this.cellH = cellH; // hauteur d'une cellule en px
        this.cellW = cellW; // largeur d'une cellule en px
        // calcul des dimensions de la grille en fonction de la map
        // on prévoit une deux cellules de plus sur chaque dimension pour assurer une cohérence graphique
        this.h = Math.floor(this.mapH/this.cellH); // hauteur de la grille en cellule
        this.w = Math.floor(this.mapW/this.cellW); // largeur de la grille en cellule
        this.color = color;
        console.log(this.h);
        console.log(this.w);
    }

    draw(){
        if (this.visible){
            noFill();
            stroke(this.color);
            strokeWeight(4);
            // on trace les lignes verticales
            for (let i = 0; i < this.w; i++){
                line(i * this.cellW + this.pos.x, 0 + this.pos.y, i * this.cellW + this.pos.x, this.h * this.cellH + this.pos.y);   
            }
            // on trace les lignes horizontales
            for (let i = 0; i < this.h; i++){
                line(0 + this.pos.x, i * this.cellH + this.pos.y, this.w * this.cellW + this.pos.x, i * this.cellH + this.pos.y);   
            }
        }
    }

    pxToGrid(pos){
        return createVector(Math.floor((pos.x - this.pos.x)  / this.cellW), Math.floor((pos.y - this.pos.y)/ this.cellH));
    }

    gridToPx(pos){
        return createVector((pos.x * this.cellW) + this.pos.x , (pos.y * this.cellH) + this.pos.y);
    }
    snapToMap(tile){
        tile.pos = this.gridToPx(createVector(Math.round((tile.pos.x - this.pos.x)  / this.cellW), Math.round((tile.pos.y - this.pos.y)/ this.cellH)));
    }
    // redimensionnement de la grille et des gridItems
    resize(dim, items){
        this.cellW = dim.x;
        this.cellH = dim.y;
        this.w = Math.floor(this.mapW/this.cellW) + 2; // largeur de la grille en cellule
        this.h = Math.floor(this.mapH/this.cellH) + 2; // hauteur de la grille en cellule
        // redimensionnement des gridItems
        items.forEach(t => {
            // redimensionnement
            t.resizeItem(dimCell);
            // repositionnement sur la grille
            this.snapToMap(t)
        });
    }
    
    update(jsonGrid){
        this.name = jsonGrid.name;
        this.pos = createVector(jsonGrid.offsetX, jsonGrid.offsetY);
        this.mapH = jsonGrid.heightPx; // hauteur de la map en px
        this.mapW = jsonGrid.widthPx; // largeur de la map en px
        this.cellH = jsonGrid.cellSize; // hauteur d'une cellule en px
        this.cellW = jsonGrid.cellSize; // largeur d'une cellule en px
        // calcul des dimensions de la grille en fonction de la map
        // on prévoit une deux cellules de plus sur chaque dimension pour assurer une cohérence graphique
        this.h = jsonGrid.height; // hauteur de la grille en cellule
        this.w = jsonGrid.width; // largeur de la grille en cellule
    }
}

