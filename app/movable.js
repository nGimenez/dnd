/*
  Johan Karlsson (DonKarlssonSan)
  Dragging images
*/
class Movable extends GridItem {
    hits(hitpos) {
      if(hitpos.x > this.pos.x && 
         hitpos.x < this.pos.x + this.w && 
         hitpos.y > this.pos.y && 
         hitpos.y < this.pos.y + this.h) {
        return true;
      }
      return false;
    }
}