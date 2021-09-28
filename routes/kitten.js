const router = require('express').Router();
const createError = require('http-errors');
const { kitten } = require('../db');

router.post('/create', async ({ body }, res, next) => {
  if (!body) return res.status(400).send('Missing request body');
  try {
    const savedKitten = await kitten.create(body);
    return res.status(201).send(savedKitten);
  } catch (err) {
    return next(err);
  }
});

router.get('/getAll', async (req, res) => {
  const kittens = await kitten.findAll();
  return res.send(kittens);
});

router.get('/getByName/:name', async (req, res, next) => {
  const { name } = req.params;
  if (!name) return next(createError(400, 'Missing name!'));
  try {
    const kittens = await kitten.findAll({
      where: {
        name,
      },
    });
    if (!kittens || kittens.length < 1) return next(createError(400, `No kitten found with name ${name}`));

    return res.send(kittens);
  } catch (err) {
    return next(err);
  }
});

router.get('/get/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError(400, 'Missing id!'));
  try {
    const found = await kitten.findByPk(id);
    if (!found)next(createError(400, `No kitten found with id ${id}`));
    return res.send(found);
  } catch (err) {
    return next(err);
  }
});

router.patch('/update/:id', async ({ body, params }, res, next) => {
  const { id } = params;
  if (!id) return next(createError(400, 'Missing id!'));
  if (!body) return next(createError(400, 'Missing request body!'));

  try {
    const { count } = await kitten.findAndCountAll({
      where: {
        id,
      },
    });
    if (count < 1) next(createError(404, `No kitten found with id: ${id}`));

    const [updated] = await kitten.update(body, {
      where: {
        id,
      },
    });
    return res.status(202).send(`Successfully updated ${updated} records!`);
  } catch (err) {
    return next(err);
  }
});

router.delete('/remove/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createError(400, 'Missing id!'));
  try {
    await kitten.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    return next(createError(500, 'Delete failed'));
  }
  return res.status(204).send('Kitten destroyed');
});

module.exports = router;
