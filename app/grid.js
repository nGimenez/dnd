class Grid{
    constructor(name, mapH, mapW, cellH, cellW, color) {
        this.name = name;
        this.pos = createVector(0, 0);
        this.mapH = mapH; // hauteur de la map en px
        this.mapW = mapW; // largeur de la map en px
        this.cellH = cellH; // hauteur d'une cellule en px
        this.cellW = cellW; // largeur d'une cellule en px
        // calcul des dimensions de la grille en fonction de la map
        // on prévoit une deux cellules de plus sur chaque dimension pour assurer une cohérence graphique
        this.h = Math.floor(this.mapH/this.cellH) + 2; // hauteur de la grille en cellule
        this.w = Math.floor(this.mapW/this.cellW) + 2; // largeur de la grille en cellule
        this.color = color;
    }

    draw(){
        if (this.visible){
            noFill();
            stroke(this.color);
            strokeWeight(4);
            // on trace les lignes verticales
            for (const i of Array(this.w).keys()){
                line((i-1) * this.cellW + this.pos.x, 0 + this.pos.y, (i-1) * this.cellW + this.pos.x, this.h * this.cellH + this.pos.y);   
            }
            // on trace les lignes horizontales
            for (const i of Array(this.h).keys()){
                line(0 + this.pos.x, (i-1) * this.cellH + this.pos.y, this.w * this.cellW + this.pos.x, (i-1) * this.cellH + this.pos.y);   
            }
        }
    }

    // pxToGrid(pos){
    //     return createVector(Math.floor(pos.x / this.w), Math.floor(pos.y / this.cellH));
    // }
    gridToPx(pos){
        return createVector((pos.x * this.cellW) + this.pos.x , (pos.y * this.cellH) + this.pos.y);
    }
    pxToSnappedPos(pos){
        return this.gridToPx(createVector(Math.round((pos.x - this.pos.x)  / this.cellW), Math.round((pos.y - this.pos.y)/ this.cellH)));
    }
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
            t.pos = this.pxToSnappedPos(t.pos);
        });
    }
}

