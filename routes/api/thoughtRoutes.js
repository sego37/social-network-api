const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThoughts,
} = require('../../controllers/thoughtController.js');

// /api/courses
router.route('/').get(getThoughts).post(createThoughts);

// /api/courses/:courseId
router
  .route('/:thoughtsId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

module.exports = router;
