# Express-Kittens

## Getting started

1.  Clone the repo.
2.  Open the folder in git bash.
3.  Run `npm install`.
4.  Run `npm install -g nodemon`
5.  Run `npm start`.

## Endpoints

### CREATE

**POST** `htttp://localhost:4494/kitten/create`

```JSON
{
  "name": String,
  "age": Number,
  "breed": String,
  "cuteness": Number
}
```

### READ

**GET** `http://localhost:4494/kitten/getAll`

**GET** `http://localhost:4494/kitten/getByName/:name`

**GET** `http://localhost:4494/kitten/get/:id`

### DELETE

**DELETE** `http://localhost:4494/kitten/remove/:id`
