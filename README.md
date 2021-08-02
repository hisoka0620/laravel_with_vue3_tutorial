# DOCKER_LARAVEL_VUE3

```
  git clone git@github.com:hisoka0620/laravel_with_vue3_tutorial.git
```

```
  docker compose up -d --build
```

```
  touch backend/database/database.sqlite
```

```
  touch backend/.env
```

> .envファイルのdatabase接続先をsqliteに変更する

```
  cd backend
```

```
  npm install
```

```
  npm run dev
```

```
  docker compose exec app bash
```

> コンテナ内で、

```
  composer install
```

```
  php artisan migrate --seed
```