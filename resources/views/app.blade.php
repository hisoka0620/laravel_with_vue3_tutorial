<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Laravel</title>
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600700&display=swap" rel="stylesheet">

  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
  <!-- Styles -->
  <style>
    body {
      font-family: 'Nunito', sans-serif;
      text-align: center;
    }
  </style>
</head>

<body>
  <div id="app">
    <header-component></header-component>
    <router-view></router-view>
  </div>
  <script src="{{ mix('/js/app.js') }}" defer></script>
</body>


</html>