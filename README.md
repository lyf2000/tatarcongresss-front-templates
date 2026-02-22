# пример для заполнения фронту статики / верстки

## запуск (докер)

`docker-compose up` или `docker compose up`

## использование

- корень - http://localhost:8000/
- создание страницы (`app/templates/path/to/page.html`) -> `http://localhost:8000/path/to/page`
- статика в `app/static`
- пример использование шаблонизатора -- `app/templates/page2.html` `{% include 'blocks/block1.html' %}` -- использует код из другого блока
- также можно добавить использование переменных (если нужно дайте знать)
