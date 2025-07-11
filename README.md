# Nitea case

## Requirement

A customer wants a system to keep their products organized. The products have a product name, an image, a price and one or more categories.

## Solution

Build a system that the customer can use to administer their products in an easy way. A frontend where the customer can create, change, delete and retrieve the products and product categories via AJAX calls. A backend with the technologies PHP and MySQL. Use all the technologies specified below.

## Technologies
### Backend
- PHP Laravel
- MySQL

### Frontend 
- Javascript
- ReactJS
- Tailwindcss
- HTML5, 
- CSS3 (SASS)

### TODO
- delete current product image before replacing it
- load categories on edit form

### Getting started

Run the following command on your local environment:

```shell
git clone --depth=1 git@github.com:tadious/nitea-case.git tadious-nitea-case
cd tadious-nitea-case
cp .env.example .env
./vendor/bin/sail up -d
npm install
npm run dev
```

This will start the following docker containers:
- MySQL
- MySQL Admin
- PHP server
- Node and ReactJS

Open http://localhost in your browser to see the project. Create an account and access the product administration. Open http://localhost:8080 for MySQL administration.

```shell
DB_DATABASE=laravel
DB_USERNAME=sail
DB_PASSWORD=password
```
