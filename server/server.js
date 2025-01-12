import {DataTypes, Sequelize} from "sequelize";
// import { Sequelize, DataTypes, Model} from '@sequelize/core';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';


const isPull = process.argv.includes('--pull')

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "bd.sqlite",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const User = sequelize.define('User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      timestamps: false,
    },
);

const Transaction = sequelize.define('Transaction', {
      // id: {
      //   type: DataTypes.INTEGER,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        // 1 - дозод
        // 0-  расход
      },},

    {
      timestamps: false,
    },
);

const Category = sequelize.define('Category', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },},
    {
      timestamps: false,
    },
);

const Account = sequelize.define('Account', {
      // id: {
      //   type: DataTypes.INTEGER,
      //   autoIncrement: true,
      //   primaryKey: true,
      // },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.REAL,
        allowNull: false,
      },},
    {
      timestamps: false,
    },
);

const Goal = sequelize.define('Goal', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },},
    {
      timestamps: false,
    },
);

User.hasMany(Transaction, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Account, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Goal, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Category.hasMany(Transaction, {foreignKey: 'category_id', onDelete: 'CASCADE'});
Account.hasMany(Transaction, {foreignKey: 'account_id', onDelete: 'CASCADE'});


async function run() {
  try {
    await sequelize.sync({ force: true });
    console.log("Таблицы пересозданы.");

    // Создание пользователей
    let list = [
      'Заработная плата',
      'Хобби',
      'Продажа',
      'Питание',
      'Транспорт',
      'Здоровье',

    ]

    for (let name of list)
      await Category.create({
        name
      })

  } catch (error) {
    console.error("Ошибка:", error);
  } finally {
    await sequelize.close();
  }
}

if (isPull)
    run()



// createCategory()




const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())


const log = console.log;

const transformDBResponse = (data) => {
  return data.map(el => el.dataValues);
}

const encode = (data) => JSON.stringify(data)


app.get('/accounts', async (request, response) => {
  const transactions =  await Account.findAll();

  return response.send(transformDBResponse(transactions));
});

app.post('/account', async (request, response) => {
  const { name, balance } = request.body

  let user = await Account.create( {name: name, balance: balance})

  return Boolean(user);
})

app.get('/category', async (request, response) => {
  const transactions =  await Transaction.findAll();

  return response.send(transformDBResponse(transactions));
})

app.post('/category', async (request, response) => {
  const { sum } = request.body

  let user = await Transaction.create( {date: Date.now(), description: '', amount: sum, type: 1} )

  return Boolean(user);
})

app.get('/transactions', async (request, response) => {
  const transactions =  await Transaction.findAll();

  return response.send(transformDBResponse(transactions));
})

app.post('/transactions', async (request, response) => {
  const { sum, account_id, category_id} = request.body;

  // if (account_id) {
    // let account = Account.findOne(account_id);
    // account.s
  // }

  let user = await Transaction.create( {date: Date.now(), description: '', account_id, category_id, amount: sum, type: 1} )

  return Boolean(user);
})

app.post('/register', async (request, response) => {
  const { email: email, name: name, password: password } = request.body

  let user = await User.create( {email, name, password } )

  let token = jwt.sign( { email: email }, "2315", { expiresIn: "30m" } )
  response.send( { token } )
})


app.post('/login', async (request, response) => {
  const { email, password } = request.body

  let user = await User.findOne( {where: {email: email}} )
  if(user == null)
  {
      return response.sendStatus(404)
  }

  if(user.password != password)
      return response.sendStatus(400)

  let token = jwt.sign( { email: email }, "2315", { expiresIn: "30m" } );

  response.send( { token } )
})

app.listen(3000, () => {
  console.log('Негры работают.........')
})
