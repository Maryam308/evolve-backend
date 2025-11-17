# Express JWT Auth Template

## About

This repo is an Express JWT Auth template meant to be paired with a front-end app utilizing JWT tokens.

## Getting started

Fork and clone this repository to your local machine.

After moving into the cloned directory, run `npm i` to download the dependencies.

Create a `.env` file in the root of the project:

```bash
touch .env
```

and add your MongoDB URI and a secret JWT string to it. Your MongoDB URI will look something like the first entry, but with your username and password:

```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@sei.azure.mongodb.net/myApp?retryWrites=true
JWT_SECRET=supersecret
```

Start the app in your terminal with:

``` sh
npm run dev
```


Personal Achievement & Learning Archive – Backend

This is the backend service for the Personal Achievement & Learning Archive project — a private platform where users document achievements, challenges, reflections, and long-term personal growth.

For full details about the project concept, features, UI, and usage, please check the front-end repository below:

 Front-end Repository: https://github.com/Maryam308/evolve-frontend
