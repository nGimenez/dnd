class Tile {
    constructor(name, x, y, h, w, sizeX, sizeY, color, img, bodyText) {
        this.name = name;
        this.pos = createVector(x, y);
        this.h = h;
        this.w = w;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.color = color;
        this.img = img;
        this.bodyText = bodyText;
    }
   
    draw(){
        if (!this.img){
            // intérieur
            this.color.setAlpha(128);
            fill(this.color);   
            //border
            this.color.setAlpha(255);
            stroke(this.color);
            strokeWeight(4);
            rect(this.pos.x, this.pos.y, this.h, this.w, 10);
        }else{
            image(this.img, this.pos.x, this.pos.y, this.h, this.w);
            noFill();
            stroke(this.color);
            strokeWeight(4);
            rect(this.pos.x, this.pos.y, this.h, this.w, 10);
        }
         // text dans le rectangle
         textSize(24);
         textAlign(CENTER, CENTER);
         fill(color('white'));
         text(this.bodyText, this.pos.x + this.w / 2, this.pos.y + this.h / 2);
    }

    resizeItem(dim){
        this.w = dim.x * this.sizeX;
        this.h = dim.y * this.sizeY;
    }

    move(m){
        this.pos.set(m);
    }

    snapToGrid(grid){
        this.pos = grid.gridToPx(createVector(Math.round((this.pos.x - grid.pos.x)  / grid.cellW), Math.round((this.pos.y - grid.pos.y)/ grid.cellH)));
    }
}

