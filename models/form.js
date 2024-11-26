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
        console.log("Połączono z bazą danych!");

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
        console.log("Tabela została utworzona.");
    } catch (err) {
        console.error("Błąd podczas tworzenia tabeli:", err);
    }
};
createTableIfNotExists();

function AddExpediture(expenseName, category, sum, date) {
    const query = `INSERT INTO expeditures (expenseName, category, sum, date) VALUES ($1, $2, $3, $4)`;
    const values = [expenseName, category, sum, date];

    return client.query(query, values)
        .then(results => {
            console.log('Dane dodane pomyślnie!', results);
        })
        .catch(err => {
            console.error('Błąd podczas wstawiania danych:', err);
        });
}

function getAllExpenditures() {
    const query = `SELECT * FROM expeditures ORDER BY date ASC`;

    return client.query(query)
        .then(results => results.rows)
        .catch(err => {
            console.error('Błąd podczas pobierania danych:', err);
            throw err;
        });
}

function getExpediture(id){
    const query = `SELECT * FROM expeditures WHERE id = $1`;

    return client.query(query,[id])
        .then(results => results.rows)
        .catch(err => {
            console.error('Błąd podczas pobierania danych:', err);
            throw err;
        });
}
function getExpeditureByCategory(category){
    const query = `SELECT * FROM expeditures WHERE category = $1`;

    return client.query(query,category)
        .then(results => results.rows)
        .catch(err => {
            console.error('Błąd podczas pobierania danych:', err);
            throw err;
        });
}

function deleteExpediture(id){
    const query = `DELETE FROM expeditures WHERE id = $1 `

    return client.query(query,[id])
    .then(results => {
        console.log('Pomyślnie usunięty', results);
    })
    .catch(err => {
        console.error('Błąd podczas usuwania ', err);
    });
}

function editExpediture(expenseName, category, sum, date, id){
    const query = `UPDATE expeditures 
    SET expenseName = $1, category = $2, sum = $3, date = $4 
    WHERE id = $5`;
    const values = [expenseName, category, sum, date ,id];
    
    return client.query(query,values)
    .then(results => {
        console.log('Pomyślnie zaaktualizowano', results);
    })
    .catch(err => {
        console.error('Błąd podczas aktualizacji ', err);
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