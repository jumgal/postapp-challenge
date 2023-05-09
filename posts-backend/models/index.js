import Sequelize from 'sequelize';

import getUserModel from './user.js';
import getPostModel from './post.js';

const sequelize = new Sequelize(
    "postapp", "postgres", "admin",
  {
    dialect: 'postgres',
  },
);

const models = {
  User: getUserModel(sequelize, Sequelize),
  Post: getPostModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;