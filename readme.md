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
3. Вложить в ".group-of-img" необходимое количество <img>. Фоновое изображение для ".group-of-img" задается параметром "data-background" у вложенного <img>.
