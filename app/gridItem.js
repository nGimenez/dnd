// Les grid item dépendent de l'échelle et la position de la grille alors que les tiles non
class GridItem extends Tile {
    
    constructor(name, x, y, scale, sizeX, sizeY, color, img, bodyText) {
        super(name, x, y, scale.x * sizeX, scale.y * sizeY, sizeX, sizeY, color, img, bodyText);
        this.scale = scale;
    }

    resizeItem(dim){
        this.scale = dim;
        this.w = this.scale.x * this.sizeX;
        this.h = this.scale.x * this.sizeX;
    }
}

