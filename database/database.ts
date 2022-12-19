import { Sequelize } from 'sequelize'

export default new Sequelize(
  'nagyvarad_ret',
  'root',
  'root',
  {
    dialect: 'sqlite',
    storage: `${__dirname}/../../DB/nagyvarad_ret.db`
  }
)