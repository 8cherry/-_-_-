import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import "./db.js";
import {Category, User, Account, Goal, Transaction, sequelize} from "./db.js";


const isPull = process.argv.includes('--pull')


async function createUserAccounts(user_id) {
  await Account.create({
    name,
    amount: 0,
    user_id,
  });
}

async function createUserCategories(user_id) {
  // Создание пользователей
  let type1 = [
    'Заработная плата',
    'Хобби',
    'Продажа',
    'Питание',
    'Транспорт',
    'Здоровье',
  ]

  let type2 = [
    {
      id: 1,
      name: 'Питание'
    },
    {
      id: 2,
      name: 'Транспорт',
    },
    {
      id: 3,
      name: 'Здоровье',
    },
    {
      id: 4,
      name: 'Красота',
    },
    {
      id: 5,
      name: 'Услуги',
    },
    {
      id: 6,
      name: 'Развлечения',
    },
    {
      id: 7,
      name: 'Одежда и обувь',
    },
    {
      id: 8,
      name: 'Образование и развитие',
    },
    {
      id: 8,
      name: 'Благотворительность и подарки',
    },
  ]

  for (let name of type1)
    await Category.create({
      name,
      user_id,
      type: 1
    });

  for (let name of type2)
    await Category.create({
      name,
      type: 2,
      user_id,
    });
}

async function seeds() {
  try {
    await sequelize.sync({ force: true });

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
  }
}



if (isPull)
  seeds()



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
});

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


  let user = await Transaction.create( {date: Date.now(), description: '', account_id, category_id, amount: sum, type: 1} )

  return Boolean(user);
})

app.post('/register', async (request, response) => {
  const { email: email, name: name, password: password } = request.body

  let user = await User.create( {email, name, password } )

  createUserCategories(user_id);
  createUserAccounts(user_id);

  let token = jwt.sign( { email: email }, "2315", { expiresIn: "30m" } )
  response.send( { token } )
})


app.post('/login', async (request, response) => {
  const { email, password } = request.body

  let user = await User.findOne( {where: {email: email}} );

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
  console.log('express started at 3000')
})
