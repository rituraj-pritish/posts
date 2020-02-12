export default (firstName, lastName) => {
  return (
    firstName[0].toUpperCase() +
    firstName.slice(1) +
    ' ' +
    lastName[0].toUpperCase() +
    lastName.slice(1)
  );
};
