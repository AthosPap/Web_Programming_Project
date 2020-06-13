'use strict';
const assert = require('assert');
//Στοιχεία σύνδεσης στη βάση mongo
const mongoAtlasDatabase = "taskListDB";

/*
Βάλτε τη δική σας βάση mongo εδώ:
*/
// const uri ="";
// Φτιάξτε μια βάση mongo στο MongoDB Atlas κα βάλτε εδώ το δικός σας connection string
const uri = "mongodb+srv://billlys13:MYiphone4s@cluster0-fijkf.azure.mongodb.net/myDB?retryWrites=true&w=majority"; 
// 
//Αλλάξτε το uri για να συνεχίσει η εκτέλεση:
assert(uri!="", "Πρέπει να ορίσετε τα στοιχεία σύνδεσης σε μια βάση Mongo στο αρχείο task-list-model-monog.js για να συνεχίσετε");

const mongoose = require('mongoose');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) { console.log(err) }
});

// Δημιουργία ενός σχήματος (schema) για τη βάση taskListDB
const UsersSchema = new mongoose.Schema({
    username: String,
    phone: String,
    password: String,
    birthdate: String,
    email: String,
    name: String,
    surname: String
});

// Το μοντέλο (model στην ορολογία της mongoose) για το taskSchema. Το τελευταίο όρισμα είναι το όνομα της συλλογής στη mongo
const TaskMongooseModel = mongoose.model("User", UsersSchema);

// factory function for task objects
exports.Task = function (taskName, status = 0, created_at = '') {
    this.task = taskName;
    this.status = status;
    this.created_at = created_at;
}

exports.createAccount = function (name, surname, username, email, phone, birthdate, password) {
    let values = [username, phone, password, birthdate, null, email, name, surname];
    TaskMongooseModel.insertMany([values], function (err, res) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            console.log("done!");
        }
    });
}

exports.getAllTasks = function (callback) {
    TaskMongooseModel.find({}, (err, res) => {
        //Αν υπάρχει σφάλμα, κάλεσε τη συνάρτηση επιστροφής και δώστης το σφάλμα
        if (err) {
            callback(err, null);
        }
        //Αλλιώς μετέτρεψε το res που επιστρέφει η mongoose σε ένα απλό json array και στείλτο πίσω
        else {
            const foundItems = []
            res.forEach((el) => {
                foundItems.push({ id: el._id, task: el.task, status: el.status, created_at: el.created_at })
            });
            callback(null, foundItems);
        }
    });
};

//Προσθήκη μιας νέας εργασίας
exports.addTask = function (newTask, callback) {
    //status νέας εργασίας = 0
    //το timestamp δημιουργείται εδώ
    const ts = new Date();
    newTask.created_at = `${ts.getFullYear()}-${ts.getMonth()}-${ts.getDate()} ${ts.getHours()}:${ts.getMinutes()}:${ts.getSeconds()}`;
    TaskMongooseModel.insertMany([newTask], (err, res) => {
        //Αν υπάρχει σφάλμα, κάλεσε τη συνάρτηση επιστροφής και δώστης το σφάλμα
        if (err) {
            callback(err, null);
        }
        //Αν δεν είχαμε σφάλμα, κάλεσε την callback με (null, res)
        //το res εδώ περιέχει τη νέα εργασία, που μας την επέστρεψε η insertMany στο 2ο όρισμα της συνάρτησης επιστροφής 
        //επιστρέφουμε το το res[0].id, που είναι το id του task που μόλις προστέθηκε
        else {
            callback(null, res[0].id);
        }
    });
}

//Προσθήκη μιας νέας εργασίας
exports.getTask = function (taskId, callback) {
    TaskMongooseModel.findById([taskId], (err, res) => {
        //Αν υπάρχει σφάλμα, κάλεσε τη συνάρτηση επιστροφής και δώστης το σφάλμα
        if (err) {
            callback(err, null);
        }
        else {
            //Αν δεν είχαμε σφάλμα, κάλεσε την callback με (null, true) 

            let task = [{ id: res._id, task: res.task, status: res.status, created_at: res.created_at }];

            callback(null, task);
        }
    });
}

//Αφαίρεση μιας εργασίας
exports.removeTask = function (taskId, callback) {
    TaskMongooseModel.deleteOne({ _id: taskId }, (err, res) => {
        //Αν υπάρχει σφάλμα, κάλεσε τη συνάρτηση επιστροφής και δώστης το σφάλμα
        if (err) {
            callback(err, null);
        }
        else {//Αν δεν είχαμε σφάλμα, κάλεσε την callback με (null, true) 
            callback(null, true);
        }
    })
}

//Αλλαγή της κατάστασης μιας εργασίας
exports.toggleTask = function (taskId, callback) {
    //Βρες ποια είναι η τρέχουσα τιμή του πεδίου status
    TaskMongooseModel.find({ _id: taskId }, { status: 1 }, (err, res) => {
        //Αν υπάρχει σφάλμα, κάλεσε τη συνάρτηση επιστροφής και δώστης το σφάλμα
        if (err) {
            callback(err, null)
        }
        else {//Αλλιώς άλλαξε την τιμή του πεδίου sttusu
            const newStatus = res[0].status == 0 ? 1 : 0;
            TaskMongooseModel.updateOne({ _id: res[0]._id }, { $set: { status: newStatus } }, (err, res) => {
                //Αν υπάρχει σφάλμα, κάλεσε τη συνάρτηση επιστροφής και δώστης το σφάλμα
                if (err) {
                    callback(err, null);
                }
                else {
                    callback(null, true);
                }
            });
        }
    })
}