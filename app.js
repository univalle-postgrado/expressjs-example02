const express = require('express');
const app = express();
const port = 3000;

let movies = [
    { id: 1, title: 'El Padrino', year: 1980 },
    { id: 2, title: 'El Señor de los Anillos', year: 2002 }
];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

app.get('/movies', (req, res) => {
  res.json(movies);
});
app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Película no encontrada' });
  }
});
app.post('/movies', (req, res) => {
  const newMovie = req.body;
  movies.push(newMovie);
  res.status(201).json(newMovie);
});
app.put('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movieIndex = movies.findIndex(m => m.id === id);
  if (movieIndex !== -1) {
    movies[movieIndex] = { ...req.body, id };
    res.json(movies[movieIndex]);
  } else {
    const newMovie = { ...req.body, id };
    movies.push(newMovie);
    res.status(201).json(newMovie);
  }
});
app.patch('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex !== -1) {
        Object.assign(movies[movieIndex], req.body);
        res.json(movies[movieIndex]);
    } else {
        res.status(404).json({ message: 'Película no encontrada' })
    }
});
app.delete('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === id);
    if (movieIndex !== -1) {
        movies.splice(movieIndex, 1);
        res.sendStatus(204);
    } else {
        res.status(404).json({ message: 'Película no encontrada' })
    }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`)
});