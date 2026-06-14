extends Node2D

# Здесь мы создаем корабль и астероид напротив друг друга

@export var ship_scene: PackedScene  # Сцена корабля
@export var asteroid_scene: PackedScene  # Сцена астероида

var ship = null  # Переменная для корабля

func _ready():
    # Создаем корабль
    ship = ship_scene.instantiate()
    add_child(ship)
    ship.position = Vector2(300, 360)  # Левая сторона экрана
    
    # Создаем астероид
    var asteroid = asteroid_scene.instantiate()
    add_child(asteroid)
    asteroid.position = Vector2(900, 360)  # Правая сторона (напротив)
    
    # Направляем астероид к кораблю
    asteroid.rotation = 0  # 0 градусов = движение ВПРАВО
    asteroid.speed = 80  # Немного медленнее
    
    print("Корабль создан на позиции: ", ship.position)
    print("Астероид создан на позиции: ", asteroid.position)

func _process(delta):
    # Проверяем столкновение каждую секунду
    check_collision()

func check_collision():
    # Ищем астероид на сцене
    var asteroids = get_tree().get_nodes_in_group("asteroids")
    
    for asteroid in asteroids:
        # Проверяем расстояние между кораблем и астероидом
        var distance = ship.position.distance_to(asteroid.position)
        
        # Если расстояние меньше 50 пикселей - столкновение!
        if distance < 50:
            print("ПРЯМОЕ ПОПАДАНИЕ! Дистанция: ", distance)
            
            # Вызываем эффект столкновения у корабля
            ship._on_collision(asteroid)
            
            # Уничтожаем астероид
            asteroid.destroy()