/*
  Johan Karlsson (DonKarlssonSan)
  Dragging images
*/
class Unit extends Movable {
    constructor(type, pv, ca, name, x, y, scale, sizeX, sizeY, pColor, img, bodyText) {
        super(name, x, y, scale, sizeX, sizeY, pColor, img, bodyText);
        this.type = type;
        this.pv = pv;
        this.ca = ca;
        // en dur
        this.tilePV = new Tile("PV",x, y, 30, 30, 1, 1, color('red'), null, this.pv);
        this.tileCA = new Tile("PV",x + (this.scale.x * this.sizeX) - 30, y, 30, 30, 1, 1, color('blue'), null, this.ca);
    }

    draw(){
        super.draw();
        this.tilePV.draw();
        this.tileCA.draw();
    }

    move(pos){
        super.move(pos);
        this.tilePV.move(pos);
        this.tileCA.move(pos.add(createVector((this.scale.x * this.sizeX) - 30, 0)));
    }
    snapToGrid(grid){
        super.snapToGrid(grid);
        this.tilePV.move(this.pos);
        this.tileCA.move((createVector((this.scale.x * this.sizeX) - 30, 0)).add(this.pos));
    }
}