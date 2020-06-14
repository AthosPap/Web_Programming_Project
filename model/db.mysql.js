'use strict';

var mysql = require('mysql');

var db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    charset: 'utf8mb4'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("connected to mysql database");

    // let sql2 = "DROP TABLE Users";
    // db.query(sql2, function(err, result){
    //     if (err) throw err;
    //     console.log("table Users deleted");
    // })

    let sql = "CREATE TABLE IF NOT EXISTS Users (username VARCHAR(80) PRIMARY KEY, phone VARCHAR(80), password VARCHAR(80) NOT NULL, birthdate VARCHAR(100), email VARCHAR(150) NOT NULL, name VARCHAR(80) NOT NULL, surname VARCHAR(80) NOT NULL, role VARCHAR(80)) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
    db.query(sql, function(err, result){
        if (err) throw err;
        console.log("table Users created");
    })

    // sql = "UPDATE Users SET email = 'bill@gmail.com' WHERE username = 'bill'";
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     console.log("table Users altered");
    // })

    // sql = "INSERT INTO Users VALUES ('admin', '1', 'admin', NULL, NULL, 'admin@admin.com', 'ad', 'min', 'admin')";
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     console.log("table Users altered");
    // })

    // sql = "DELETE FROM Users WHERE username = 'admin'";
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     console.log("table Users deleted");
    //     console.log(result)
    // })

    sql = "SELECT * FROM Users";
    db.query(sql, function(err, result){
        if (err) throw err;
        console.log("table Users altered");
        console.log("columns = "+result.length);
        console.log(result)
    })

    sql = "CREATE TABLE IF NOT EXISTS Facilities (id INT PRIMARY KEY, name VARCHAR(255) NOT NULL, status INT NOT NULL)";
    db.query(sql, function(err, result){
        if (err) throw err;
        console.log("table Facilities created");
    })


    // sql = "UPDATE Facilities SET name = 'court4' WHERE id = 4";
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     console.log("table Facilities updated");
    // })

    // sql = "INSERT INTO Facilities VALUES (4 ,'court4', 1)";
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     console.log("table Facilities updated");
    // })


    sql = "SELECT * FROM Facilities";
    db.query(sql, function(err, result){
        if (err) throw err;
        console.log("table Facilities altered");
        console.log(result)
    })

    // sql = "DROP TABLE reserves";
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     console.log("table reserves deleted");
    // })

    sql = "CREATE TABLE IF NOT EXISTS reserves (id INT AUTO_INCREMENT PRIMARY KEY, date VARCHAR(120) NOT NULL, time VARCHAR(80) NOT NULL, surname VARCHAR(100), phone VARCHAR(100), username VARCHAR(100), facilityID INT, FOREIGN KEY(username) REFERENCES Users(username) ON DELETE CASCADE, FOREIGN KEY(facilityID) REFERENCES Facilities(id)) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
    db.query(sql, function(err, result){
        if (err) throw err;
        console.log("table reserves created");
    })

    // sql = "INSERT INTO reserves VALUES (NULL, '2020-6-24', '21:00', NULL, NULL)";
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     console.log("row reserves inserted");
    // })

    // sql = "DELETE FROM reserves WHERE id = 44";
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     console.log("row reserves deleted");
    // })

    sql = "SELECT * FROM reserves";
    db.query(sql, function(err, result){
        if (err) throw err;
        console.log(result)
    })



    // sql = "DROP TABLE Messages";
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     console.log("table Messages deleted");
    // })

    sql = "CREATE TABLE IF NOT EXISTS Messages (name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, message TEXT NOT NULL) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
    db.query(sql, function(err, result){
        if (err) throw err;
        console.log("table messages created");
    })

    sql = "SELECT * FROM Messages";
    db.query(sql, function(err, result){
        if (err) throw err;
        console.log(result)
    })


    // sql = "DROP TABLE Tournaments";
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     console.log("table Tournaments deleted");
    // })

    sql = "CREATE TABLE IF NOT EXISTS Tournaments (id INT PRIMARY KEY, name VARCHAR(150), dates VARCHAR(255) NOT NULL, type VARCHAR(100)) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
    db.query(sql, function(err, result){
        if (err) throw err;
        console.log("table tournaments created");
    })

    // sql = "INSERT INTO Tournaments VALUES (1, 'Καλοκαιρινό Μονό Ενηλίκων', '2020-07-12 to 2020-07-19', 'singles')";
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     console.log("table tournaments updated");
    // })

    sql = "SELECT * FROM Tournaments";
    db.query(sql, function(err, result){
        if (err) throw err;
        console.log(result)
    })


    // sql = "DROP TABLE participates";
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     console.log("table participates deleted");
    // })

    sql = "CREATE TABLE IF NOT EXISTS participates (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100), teammatename VARCHAR(100), teammateemail VARCHAR(100), teammatephone VARCHAR(80), surname VARCHAR(100), phone VARCHAR(100), tournamentID INT NOT NULL, FOREIGN KEY(username) REFERENCES Users(username) ON DELETE CASCADE, FOREIGN KEY(tournamentID) REFERENCES Tournaments(id) ON DELETE CASCADE ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
    db.query(sql, function(err, result){
        if (err) throw err;
        console.log("table participates created");
    })

    // sql = "DELETE FROM participates WHERE id = 5";
    // db.query(sql, function(err, result){
    //     if (err) throw err;
    //     console.log("row participates deleted");
    // })

    sql = "SELECT * FROM participates";
    db.query(sql, function(err, result){
        if (err) throw err;
        console.log(result)
    })
});



module.exports = db;