class ThrowableObject extends MovableObject {

    constructor(x, y, direction = 'right') {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');

        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(direction);
    }

    throw (direction) {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            
    if (direction === 'right') {
        this.x += 2;
    } else {
        this.x -= 2;
    }
    
        }, 5);
    }
}