export const typeColumn = (value, type) => {
  switch (type) {
    case "date":
      return new Date(value).toLocaleDateString();
    case "boolean":
      return value ? "Activo" : "Inactivo";
    case "dollar":
      return `$ ${value}`;
    default:
      return value;
  }
};
