// Asteroid.js - класс одного астероида
class Asteroid {
    constructor(x, y, size, speed) {
        // Позиция астероида
        this.x = x;
        this.y = y;
        
        // Размер (чем больше, тем крупнее)
        this.size = size || Math.random() * 30 + 20; // 20-50 пикселей
        
        // Скорость движения
        this.speed = speed || Math.random() * 2 + 1; // 1-3 пикселя за кадр
        
        // Направление движения (угол в радианах)
        this.angle = Math.random() * Math.PI * 2;
        
        // Скорость вращения астероида
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        
        // Жив ли астероид
        this.isAlive = true;
        
        // Цвет (разные оттенки серого)
        this.color = `rgb(${80 + Math.random() * 50}, ${60 + Math.random() * 40}, ${40 + Math.random() * 30})`;
    }
    
    // Обновление позиции астероида
    update(canvasWidth, canvasHeight) {
        // Движение по X и Y
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        // Вращение
        this.rotation += this.rotationSpeed;
        
        // Телепортация через края экрана
        if (this.x > canvasWidth) this.x = 0;
        if (this.x < 0) this.x = canvasWidth;
        if (this.y > canvasHeight) this.y = 0;
        if (this.y < 0) this.y = canvasHeight;
    }
    
    // Отрисовка астероида на канвасе
    draw(ctx) {
        if (!this.isAlive) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Рисуем астероид (неровный круг)
        ctx.beginPath();
        
        // Создаем неровную форму для реалистичности
        const points = 8;
        for (let i = 0; i < points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const radiusVariation = 0.7 + Math.random() * 0.6;
            const x = Math.cos(angle) * this.size * radiusVariation;
            const y = Math.sin(angle) * this.size * radiusVariation;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.stroke();
        
        // Рисуем кратеры на астероиде
        ctx.beginPath();
        ctx.arc(-this.size * 0.3, -this.size * 0.2, this.size * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.size * 0.3, this.size * 0.2, this.size * 0.15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
    
    // Проверка столкновения с кораблем
    checkCollision(shipX, shipY, shipRadius) {
        if (!this.isAlive) return false;
        
        // Вычисляем расстояние между астероидом и кораблем
        const dx = this.x - shipX;
        const dy = this.y - shipY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Столкновение, если расстояние меньше суммы радиусов
        return distance < (this.size + shipRadius);
    }
    
    // Уничтожение астероида
    destroy() {
        this.isAlive = false;
        return this.size; // Возвращаем размер для очков
    }
}

// Экспорт для использования в других файлах (если используете модули)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Asteroid;
}