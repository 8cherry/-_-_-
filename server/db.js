import {DataTypes, Sequelize} from "sequelize";

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
User.hasMany(Account, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Category, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Category.hasMany(Transaction, {foreignKey: 'category_id', onDelete: 'CASCADE'});
Account.hasMany(Transaction, {foreignKey: 'account_id', onDelete: 'CASCADE'});




export {
    sequelize,
    User,
    Account,
    Category,
    Goal,
    Transaction,
}
