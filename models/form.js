const { Client } = require('pg');

const client = new Client({
    host: 'db',
    user: 'postgres',
    password: 'strongPassword',
    database: 'ExpeditureDB',
    port: 5432
});

const createTableIfNotExists = async () => {
    try {
        await client.connect();
        console.log("Successful connection with DataBase");

        const query = `
            CREATE TABLE IF NOT EXISTS expeditures (
                id SERIAL PRIMARY KEY,
                expenseName TEXT,
                category TEXT,
                sum INTEGER,
                date DATE
            );
        `;
        await client.query(query);
        console.log("Table successful created");
    } catch (err) {
        console.error("Failure - table created error:", err);
    }
};
createTableIfNotExists();

function AddExpediture(expenseName, category, sum, date) {
    const query = `INSERT INTO expeditures (expenseName, category, sum, date) VALUES ($1, $2, $3, $4)`;
    const values = [expenseName, category, sum, date];

    return client.query(query, values)
        .then(results => {
            console.log('Data added successful.', results);
        })
        .catch(err => {
            console.error('Failure - data added error: ', err);
        });
}

function getAllExpenditures() {
    const query = `SELECT * FROM expeditures ORDER BY date ASC`;

    return client.query(query)
        .then(results => results.rows)
        .catch(err => {
            console.error('Failure - data error: ', err);
            throw err;
        });
}

function getExpediture(id){
    const query = `SELECT * FROM expeditures WHERE id = $1`;

    return client.query(query,[id])
        .then(results => results.rows)
        .catch(err => {
            console.error('Failure - error with form: ', err);
            throw err;
        });
}
function getExpeditureByCategory(category){
    const query = `SELECT * FROM expeditures WHERE category = $1`;

    return client.query(query,category)
        .then(results => results.rows)
        .catch(err => {
            console.error(`Failure - data category($category) error: `, err);
            throw err;
        });
}

function deleteExpediture(id){
    const query = `DELETE FROM expeditures WHERE id = $1 `

    return client.query(query,[id])
    .then(results => {
        console.log('Successful data deleted', results);
    })
    .catch(err => {
        console.error('Failure - deleted data error: ', err);
    });
}

function editExpediture(expenseName, category, sum, date, id){
    const query = `UPDATE expeditures 
    SET expenseName = $1, category = $2, sum = $3, date = $4 
    WHERE id = $5`;
    const values = [expenseName, category, sum, date ,id];
    
    return client.query(query,values)
    .then(results => {
        console.log('Successful data update', results);
    })
    .catch(err => {
        console.error('Failure - data update error: ', err);
    });
}

module.exports = {
    AddExpediture,
    getAllExpenditures,
    getExpediture,
    deleteExpediture,
    editExpediture,
    getExpeditureByCategory
};
