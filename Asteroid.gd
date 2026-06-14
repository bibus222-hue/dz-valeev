extends Area2D

# Простой астероид, который движется и может быть уничтожен

var speed = 100  # Скорость движения

func _ready():
    # Запоминаем, что это астероид (для проверок)
    add_to_group("asteroids")
    
    # Случайное направление движения
    var random_direction = randf_range(0, 360)
    rotation = random_direction

func _process(delta):
    # Двигаемся вперед
    position += Vector2(speed * delta, 0).rotated(rotation)
    
    # Если вылетели за экран - возвращаем с другой стороны
    if position.x > 1150:
        position.x = 50
    if position.x < 50:
        position.x = 1150
    if position.y > 650:
        position.y = 50
    if position.y < 50:
        position.y = 650

func destroy():
    # Анимация уничтожения
    print("Астероид уничтожен!")
    
    # Уменьшаем и удаляем
    var tween = create_tween()
    tween.tween_property(self, "scale", Vector2(0, 0), 0.3)
    await tween.finished
    queue_free()  # Удаляем астероид со сцены