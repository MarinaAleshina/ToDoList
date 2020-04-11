/**
 * Function getObjectOfTasks. Takes an array of objects and returns an object
 *
 * @param {Array} arrOfTasks
 * @returns {Object} objectOfTasks
 */
export function getObjectOfTasks(arrOfTasks) {
  const objectOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  return objectOfTasks;
}
