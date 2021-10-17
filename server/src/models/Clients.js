module.exports = (sequelize, Datatypes) => {
  const Clients = sequelize.define("Clients", {
    username: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    authorization: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  return Clients;
};
