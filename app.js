const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2;
class sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey
    }
    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}

// player created with properties
const player = new sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    }
})


// enemy created with properties
const enemy = new sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 10
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

let lastKey;

function animate() {
    c.fillStyle = "black"
    window.requestAnimationFrame(animate)
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    //player movement
    player.velocity.x = 0
    if (keys.d.pressed && lastKey == 'd') {
        player.velocity.x = 5
    } else if (keys.a.pressed && lastKey == 'a') {
        player.velocity.x = -5
    }

    //enemy movement
    enemy.velocity.x = 0;
    if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
    } else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    }
}

animate()

//movement of charecter

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 'w':
            player.velocity.y = -10;
            lastKey = 'w';
            break;
        case 'ArrowRight':
            lastKey = 'ArrowRight';
            keys.ArrowRight.pressed = true;
            break;
        case 'ArrowLeft':
            lastKey = 'ArrowLeft';
            keys.ArrowLeft.pressed = true;
            break;
        case 'ArrowUp':
            enemy.velocity.y = -10;
            lastKey = 'ArrowUp';
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});
