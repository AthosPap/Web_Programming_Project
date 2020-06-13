# Task list

Παράδειγμα μιας απλής εφαρμογής express.js.

Τρέχει με `npm run debug`.

Το `app.js` υπάρχει σε δύο εκδόσεις:
- `app.initial.js`, που περιέχει όλη τη λογική σε ένα αρχείο. Κυρίως για επεξήγηση βασικών στοιχείων του express.js.
- `app.final.js`, ακολουθεί τη λογική MVC. Το πρόγραμμα μοιράζεται σε διάφορα τμήματα: 
 - `/model` παρέχει την πρόσβαση στα δεδομένα.
 - `/controller` περιέχει συναρτήσεις για να έχουμε πρόσβαση στα δεδομένα που μας δίνει το model.
 
 Οι φάκελοι `views` και `routes`:
 
 - Ο `/views` περιέχει template γραμμένα σε handlebars.
 - Ο `/routes` περιέχει τις διαδρομές που αναγνωρίζει η εφαρμογή.


#### Το μοντέλο:
Ο φάκελος `/models` περιέχει τρεις διαφορετικές πηγές δεδομένων: 
- `task-list-model-no-db.js`, απλά επιστρέφει ένα json με τα δεδομένα μας.
-  `task-list-model-sqllit.js`, διαβάζει τα δεδομένα από ένα αρχείο SQLite.
-  `task-list-model-mysql.js`, διαβάζει τα δεδομένα από μια βάση MySQL.

Για τις δύο βάσεις, τα στοιχεία πρόσβασης βρίσκετε στα αντίστοιχα αρχεία `model/db.sqlite.js` και `model/db.mysql.js`.

#### Ο controller:
Στο αρχείο `/controller/task-list-controller.js` περιέχονται οι συναρτήσεις χειρισμού του μοντέλου.

Μπορείτε να χρησιμοποιήσετε τρία διαφορετικά μοντέλα, προσαρμόζοντας κατάλληλα τα σχόλια στην κορυφή του αρχείου:
```javascript
const model = require('../model/task-list-model-no-db.js');
// const model = require('../model/task-list-model-sqlite.js');
// const model = require('../model/task-list-model-mysql.js');
```

