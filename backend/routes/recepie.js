const router = require('express').Router();
let Recepie = require('../models/recepie.model');

router.route('/').get((req, res) => {
  Recepie.find()
    .then(recepies => res.json(recepies))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const recepie = req.body.recepie;
  const recepieName = req.body.recepieName;

  const newRecepie = new Recepie({
    username,
    recepie,
    recepieName,
  });

  newRecepie.save()
    .then(() => res.json('Recepie added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Recepie.findById(req.params.id)
    .then(recepie => res.json(recepie))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Recepie.findByIdAndDelete(req.params.id)
    .then(() => res.json('Recepie deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Recepie.findById(req.params.id)
    .then(recepie => {
      recepie.username = req.body.username;
      recepie.recepie = req.body.recepie;
      recepie.recepieName = req.body.recepieName;

      recepie.save()
        .then(() => res.json('Recepie updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;