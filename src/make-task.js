export default (template) => {
  const newTask = document.createElement(`div`);
  newTask.innerHTML = template;
  return newTask.firstChild;
};
