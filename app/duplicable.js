/*
  Johan Karlsson (DonKarlssonSan)
  Dragging images
*/
class Duplicable{
    constructor(name, x, y, scale, sizeX, sizeY, color, img) {
        this.tile = new Movable(name, x, y, scale, sizeX, sizeY, color, img);
        this.cpt = 0;
    }
    
    hits(hitpos) {
      if(hitpos.x > this.tile.pos.x && 
         hitpos.x < this.tile.pos.x + this.tile.w && 
         hitpos.y > this.tile.pos.y && 
         hitpos.y < this.tile.pos.y + this.tile.h) {
        return true;
      }
      return false;
    }

    draw(){
        this.tile.draw();
    }

    spawn(){
        var copy = new Movable(this.tile.name + this.cpt, this.tile.pos.x, this.tile.pos.y, this.tile.scale, this.tile.sizeX, this.tile.sizeY, this.tile.color, this.tile.image);
        copy.bodyText = this.cpt;
        return copy;
    }
}