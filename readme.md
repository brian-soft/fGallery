# Термины:
1. ".group-of-img" - Div, с классом "group-of-img", внутри которого находятся наши изображения <img>.
2. "data-background" - атрибут тега img, в котором нужно указывать пустое значение ```<img src="some.jpg" data-background="">```

# Для работы библиотеки необходимо:
1. Подключить ее в HTML файле перед ```</div>```. Например: 
```
  <div>
    
    <script src="js/prew_img.js"></script>
  </div>
```
2. Создать один или несколько ```<div>``` с классом ```.group-of-img```, и написать для него css стили.
3. Вложить в ```.group-of-img``` необходимое количество <img>. Фоновое изображение для ```.group-of-img``` задается параметром ```data-background``` у вложенного <img>.


# Пример HTML:
```
<body>
	<div class="group-of-img">
		<img src="pic/avto/1.jpg">
		<img src="pic/avto/2.jpg" data-background="">
	</div>
	<div class="group-of-img">
		<img src="pic/moto/1.jpg">
		<img src="pic/moto/2.jpg">
		<img src="pic/moto/3.jpg">
		<img src="pic/moto/4.jpg" data-background="">
		<img src="pic/moto/5.jpg">
	</div>
	<div class="group-of-img">
		<img src="pic/board/1.jpg" data-background="">
		<img src="pic/board/2.jpg">
		<img src="pic/board/3.jpg">
	</div>
	<script src="js/prew_img.js"></script>
</body>
```
