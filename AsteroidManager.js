// AsteroidManager.js - управление всеми астероидами
class AsteroidManager {
    constructor(canvasWidth, canvasHeight) {
        this.asteroids = []; // Массив всех астероидов
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.maxAsteroids = 10; // Максимальное количество астероидов
    }
    
    // Создание одного астероида
    createAsteroid(x, y, size, speed) {
        const asteroid = new Asteroid(x, y, size, speed);
        this.asteroids.push(asteroid);
        return asteroid;
    }
    
    // Массовое создание астероидов
    spawnAsteroids(count, areaType = 'random') {
        for (let i = 0; i < count; i++) {
            let x, y;
            
            switch(areaType) {
                case 'top':
                    x = Math.random() * this.canvasWidth;
                    y = -50;
                    break;
                case 'bottom':
                    x = Math.random() * this.canvasWidth;
                    y = this.canvasHeight + 50;
                    break;
                case 'left':
                    x = -50;
                    y = Math.random() * this.canvasHeight;
                    break;
                case 'right':
                    x = this.canvasWidth + 50;
                    y = Math.random() * this.canvasHeight;
                    break;
                case 'corners':
                    const corner = Math.floor(Math.random() * 4);
                    switch(corner) {
                        case 0: x = -50; y = -50; break;
                        case 1: x = this.canvasWidth + 50; y = -50; break;
                        case 2: x = -50; y = this.canvasHeight + 50; break;
                        case 3: x = this.canvasWidth + 50; y = this.canvasHeight + 50; break;
                    }
                    break;
                default: // random
                    // Спавним за пределами экрана
                    const side = Math.floor(Math.random() * 4);
                    switch(side) {
                        case 0: x = Math.random() * this.canvasWidth; y = -50; break;
                        case 1: x = Math.random() * this.canvasWidth; y = this.canvasHeight + 50; break;
                        case 2: x = -50; y = Math.random() * this.canvasHeight; break;
                        case 3: x = this.canvasWidth + 50; y = Math.random() * this.canvasHeight; break;
                    }
            }
            
            this.createAsteroid(x, y);
        }
    }
    
    // Спавн астероидов в определенной области (прямоугольник)
    spawnAsteroidsInArea(x, y, width, height, count) {
        for (let i = 0; i < count; i++) {
            const spawnX = x + Math.random() * width;
            const spawnY = y + Math.random() * height;
            this.createAsteroid(spawnX, spawnY);
        }
    }
    
    // Обновление всех астероидов
    update() {
        for (let i = 0; i < this.asteroids.length; i++) {
            const asteroid = this.asteroids[i];
            if (asteroid.isAlive) {
                asteroid.update(this.canvasWidth, this.canvasHeight);
            } else {
                // Удаляем уничтоженные астероиды
                this.asteroids.splice(i, 1);
                i--;
            }
        }
    }
    
    // Отрисовка всех астероидов
    draw(ctx) {
        for (const asteroid of this.asteroids) {
            asteroid.draw(ctx);
        }
    }
    
    // Проверка коллизий с кораблем
    checkCollisionsWithShip(shipX, shipY, shipRadius) {
        const collisions = [];
        
        for (let i = 0; i < this.asteroids.length; i++) {
            const asteroid = this.asteroids[i];
            if (asteroid.checkCollision(shipX, shipY, shipRadius)) {
                collisions.push({
                    asteroid: asteroid,
                    index: i,
                    size: asteroid.size
                });
            }
        }
        
        return collisions;
    }
    
    // Проверка и обработка коллизий (автоматическое уничтожение)
    handleCollisions(shipX, shipY, shipRadius, onCollision) {
        const collisions = this.checkCollisionsWithShip(shipX, shipY, shipRadius);
        
        for (const collision of collisions) {
            const score = collision.asteroid.destroy();
            
            // Вызываем callback функцию, если она передана
            if (onCollision) {
                onCollision(collision.asteroid, score);
            }
        }
        
        return collisions.length;
    }
    
    // Получить количество живых астероидов
    getAliveCount() {
        return this.asteroids.filter(a => a.isAlive).length;
    }
    
    // Удалить все астероиды
    clearAll() {
        this.asteroids = [];
    }
    
    // Создать волну астероидов (сложность зависит от номера волны)
    spawnWave(waveNumber) {
        const count = Math.min(5 + Math.floor(waveNumber / 2), this.maxAsteroids);
        this.spawnAsteroids(count, 'random');
    }
}

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AsteroidManager;
}