extends Area2D

# Это простой корабль, который может двигаться и сталкиваться

func _ready():
    # Подключаем сигнал столкновения
    body_entered.connect(_on_collision)

func _process(delta):
    # Управление стрелками
    if Input.is_action_pressed("ui_right"):  # Стрелка ВПРАВО
        rotation += 3 * delta  # Поворачиваем корабль
    
    if Input.is_action_pressed("ui_left"):   # Стрелка ВЛЕВО
        rotation -= 3 * delta  # Поворачиваем корабль
    
    if Input.is_action_pressed("ui_up"):     # Стрелка ВВЕРХ
        # Двигаем корабль вперед
        position += Vector2(200 * delta, 0).rotated(rotation)

func _on_collision(body):
    # Когда корабль с чем-то столкнулся
    print("СТОЛКНОВЕНИЕ! Корабль задел: ", body.name)
    
    # Эффект столкновения - мигание красным
    modulate = Color.RED  # Становимся красными
    await get_tree().create_timer(0.1).timeout  # Ждем 0.1 секунду
    modulate = Color.WHITE  # Возвращаем белый цвет