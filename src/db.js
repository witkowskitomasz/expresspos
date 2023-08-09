const sqlite3 = require('sqlite3')
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'config.db'))



class Groups {
    createGroup(name) {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS ing_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)`)
            db.run('INSERT INTO ing_groups (name) VALUES (?)', [name])
            db.run(`CREATE TABLE IF NOT EXISTS ing_${name} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE)`)
        })
    }
    deleteGroup(name) {
        db.serialize(() => {
            db.run(`DROP TABLE IF EXISTS ing_${name}`)
            db.run('DELETE FROM ing_groups WHERE name = ?', [name])
        })
    }
    getAllGroups() {
        const groups = []
        return new Promise((resolve,reject) => {
            db.all('SELECT name FROM ing_groups', (err, rows) => {
                resolve(rows)
            })
        }).then(res => {
            res.forEach(element => {
                groups.push(element.name)
            })
        }).then(() => {
            return groups 
        })
    }
}

class Ingredients {
    addIngredient(name, group) {
        db.run(`INSERT INTO ing_${group} (name) VALUES (?)`, [name])
    }
    removeIngredient(name, group) {
        db.run(`DELETE FROM ing_${group} WHERE name = ?`, [name])
    }
    getAllIngredients(group) {
        const ingredients = []
        return new Promise((resolve, reject) => {
            db.all(`SELECT name FROM ing_${group}`, (err, rows) => {
                resolve(rows)
            })
        }).then(res => {
            res.forEach(element => {
                ingredients.push(element.name)
            })
        }).then(() => {
            return ingredients 
        })
    }
}

module.exports = {Groups, Ingredients}


