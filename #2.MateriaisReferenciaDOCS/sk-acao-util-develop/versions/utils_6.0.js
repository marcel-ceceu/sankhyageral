/**********************************************/
/* Prototype Implementation (TAKE CARE)
/**********************************************/
/**
 * 
 * @description Formats the string itself with parameters
 * @param { string | number | Array <string> | Array <number> | object } toReplace 
 * @version 3.0 - Added named parameters
 * @todo This code is acessible to ES5. To better readability and performance/standards, implements Arrow functions and replace the lines: 31, 32 and 33 by 34;
 */
String.prototype.format = function (toReplace) {
    
    // The text itself
    var str = this.toString ();
    // Variable that will contains the interpolation found inside text
    var toFind = '';
    
    // Checks if there is something passed as a parameter
    if (toReplace && toReplace.length) {

        // Checks if the parameter passed is a string or a number
        // Single Interpolation     : console.log ('%hiplanet that is too damn high. Again, %hiplanet!'.format ('Hi, Planet'));
        // Multiple Interpolation   : console.log ('%0 that is too damn high. Again, %1!'.format ('Hi, Planet'));
        // Multiple Named-Index Interpolation   : console.log ('%something that is too damn high. Again, %458!'.format ('Hi, Planet'));
        if (typeof toReplace == 'string' || typeof element == 'number') {
            
            // Maps all possible interpolation replacements
            toFind = str.match (/([%])([a-z]|[0-9])+/g);
            
            // Replaces all occurencies of interpolation replacements by the single informed parameter
            toFind.forEach (function (elem) {
                str = str.toString ().split (elem).join (toReplace);
            });
            // ES6 - str = toFind ? toFind.reduce (function (acc, val) { return acc.split (val).join (toReplace); }, str) : str;
        }

        // Checks if the parameter is an array
        else if (Array.isArray (toReplace)) {

            // Iterates over each array element
            toReplace.forEach (function (element) {

                // Checks if the array element passed is a string or a number
                // console.log ('%hi, %planet that is too damn high. Again, %hi, %planet!'.format (['Hi', 'Planet']));
                if (typeof element == 'string' || typeof element == 'number') {
                    
                    // Finds all first equals interpolation replacements to replace them
                    toFind = str.match (/([%])([a-z]|[0-9])+/)[0];
                    str = toFind ? str.split (toFind).join (String (element)) : str;
                }
                else {
                    // Checks an array of object as parameters
                    // console.log ('%hi, %planet that is too damn high. Again, %hi, %planet!'.format ([{ hi: 'Hi' }, { planet: 'Planet' }]));
                    Object.keys (element).forEach (function (elem) {
                        toFind = str.match (new RegExp ('(%)('+ elem + ')', 'g'))[0];
                        str = toFind ? str.split (toFind).join (String (element [elem])) : str;
                    });
                }
            });
        }
    }
    // Checks if the parameter is an object
    // console.log ('%hi, %planet that is too damn high. Again, %hi, %planet!'.format ({ hi: 'Hi', planet: 'Planet' }));
    else if (typeof toReplace == 'object') {

        // Iterates over each key inside the object
        Object.keys (toReplace).forEach (function (elem) {
            toFind = str.match (new RegExp ('(%)('+ elem + ')', 'g'))[0];
            str = toFind ? str.split ('%' + elem).join (String (toReplace [elem])) : str;
        });
    }
    return str;
};

/**
 * 
 * @param { string } toAdd 
 */
String.prototype.add = function (toAdd = '') {
    return this.toString () + toAdd;
}

/**
 * @version 1.0
 */
Date.prototype.getArray = function() {
	const mm = this.getMonth () + 1;
	const dd = this.getDate ();

	let arr = new Array ();
	arr.push (this.getFullYear ());
	arr.push ((mm > 9 ? '' : '0') + mm);
	arr.push ((dd > 9 ? '' : '0') + dd);

	return arr;
};

/**
 * @version 3.0
 */
Object.prototype.isString = function () { return typeof this [0] === 'string' }

/**
 * @version 3.0
 */
Object.prototype.equals = function (x) {
    for (var p in this) {
        if (typeof (this [p]) !== typeof (x [p])) return false;
        if ((this [p] === null) !== (x [p] === null)) return false;
        switch (typeof (this [p])) {
            case 'undefined':
                if (typeof (x [p]) != 'undefined') return false;
                break;
            case 'object':
                if (this [p] !== null && x [p] !== null && (this [p].constructor.toString () !== x [p].constructor.toString () || !this [p].equals (x [p]))) return false;
                break;
            case 'function':
                if (p != 'equals' && this [p].toString () != x [p].toString ()) return false;
                break;
            default:
                if (this [p] !== x [p]) return false;
        }
    }
    return true;
}

/**
 * @version 3.0
 */
Array.prototype.reduce = function (toExec, initialAccumulatorValue) {
    var index;
    var accumulator =
        typeof initialAccumulatorValue == 'string'
            ? ''
            : typeof initialAccumulatorValue == 'number'
                ? 0
                : {};

    for (index = 0; index < this.length; index++) {
        if (typeof initialAccumulatorValue == 'string' || typeof initialAccumulatorValue == 'number')
            accumulator += toExec (this [index], index, this);
    }
    return accumulator;
}

/**
 * @version 4.0
 */
Array.prototype.filter = function (fun) {
    var arr = new Array ();
    this.forEach (function (value, index, array) {
        if (fun (value, index, array)) {
            arr.push (value);
        }
    });
    return arr;
}

/**
 * @version 5.0
 */
Array.prototype.map = function (fun) {
    var arr = new Array ();
    this.forEach (function (value, index, array) {
        arr.push (fun (value, index, array));
    });
    return arr;
}

/**********************************************/
/* Utils Entity Creators
/**********************************************/
/**
 * Sets a new development environment in App
 * @version 6.0 Changed the name class to App (to make more easily instantiation) and Start structure
 * @example
 *      var application = new App ();
 */
function App () {
    /**
     * The environment of App
     * @type { App }
     * @version 6.0 The query was putted inside the app objecct
     */
    var app = {
        /**
         * An instance of query processor
         * @type { Query }
         * @version 6.0 The query was putted inside the app objecct
         */
        query: null
    };

    /**
     * The program code to execute
     * @param { Function } toExecute Code to be executed
     * @version 6.0 Returned the env object, with the query inside of it
     * @example
     *      var application = new App ();
     *      application.start (function (app) {
     *          app.alert ('Hi, planet!');
     *      });
     */
    app.start = function (toExecute) {
        app.query = new Query ();
        toExecute (app);
        app.query.close ();
    };

    /**
     * Returns the actual User selection
     * @param { boolean } singleSelect Set to bring single or multiple records selection
     * @returns { Record | Array <Record> } Returns the desired selected line(s)
     * @version 6.0 Modified the return to Record, method name and structure
     * @example
     *      var application = new App ();
     *      application.start (function (app) {
     *          var record = env.selection (true);      // Single (first) user selection
     *          app.alert (record.get ('SOME_FIELD'));
     *  
     *          var records = env.selection (false);    // Multi user selection
     *          //  records = env.selection ();         // Works too as multi selection
     *          var someFieldContainer = '';
     *          records.forEach (function (record) { someFieldContainer += record.get ('SOME_FIELD'); });
     *          app.alert (someFieldContainer);
     *      });
     */
    app.selection = function (firstOnly) {
        if (!firstOnly) {
            var records = new Array ();
            linhas.forEach (function (line) {
                records.push (
                    new Record (line)
                );
            });
            return records;
        }
        else {
            return new Record (linhas [0]);
        }
    };

    /**
     * Returns the user parameter
     * @param { string } name Name of parameter
     * @returns { string } The value of desired oarameter
     * @version 6.0 Renamed the method and safe casted the return to string type
     * @example
     *      var application = new App ();
     *      application.start (function (app) {
     *          var parameter = app.param ('SOME_PARAMETER');
     *          app.alert (parameter);
     *      });
     */
    app.param = function (name) {
        if (typeof name === 'string') {
            return getParam (name) ? String (getParam (name)) : '';
        }
    }

    /**
     * Returns the logged User
     * @version 6.0 Renamed the method and safe casted the return to string type
     * @example
     *      var application = new App ();
     *      application.start (function (app) {
     *          var user = app.user ();
     *          app.alert (user);
     *      });
     */
    app.user = function () {
        return String (getUsuarioLogado ()) || '';
    }

    /**
     * Add an available Java Class for dynamic use
     * @param { string } className Class name
     * @version 1.0
     * @deprecated
     */
    app.javaImport = function (className) {
        return newJava (className);
    }
    
    /**
     * Add an available Java Class for Static use
     * @param { string } className Class name
     * @version 1.0
     * @deprecated
     */
    app.javaStaticImport = function (className) {
        return javaClass (className);
    }

    /**
     * Shows a standard message. P.S.: Single Use Only!
     * @param { string } text Text to show on alert
     * @version 2.0
     * @example
     *      var application = new App ();
     *      application.start (function (app) {
     *          app.alert ('Hi, planet!');
     *      });
     */
    app.alert = function (text) {
        mensagem = !text ? 'Nothing to return' : typeof text === 'string' ? text : text.toString ();
    }

    /**
     * Shows a error message
     * @param { string } text Text to show on error
     * @version 6.0 Safe casted the return to string type
     * @example
     *      var application = new App ();
     *      application.start (function (app) {
     *          app.error ('Something is wrong!');
     *      });
     */
    app.error = function (text) {
        mostraErro (String (text));
    }

    /**
     * Validate some environmental condition. Otherwise, throw an error with message
     * @param { boolean } condition Condition to met to continue
     * @param { string } message Text to error alert if condition is false
     * @version 2.0 Main implementation
     * @example
     *      var application = new App ();
     *      application.start (function (app) {
     *          app.assert (1 === 2, 'This message will be shown!'); // It throws the error message, because the condition is false
     *      });
     */
    app.assert = function (condition, message) {
        if (!condition) app.error (message);
        return app;
    }

    return app;
}

/**
 * Implements the system QueryExecutor
 * @version 4.0 Updates the UPDATE method and inplemented SELECT and SELECTONE
 * @version 6.0 Minor changes
 * @example
 *      var query = new Query ();
 */
function Query () {
    
    /**
     * The Query instance itself
     * @type { Query }
     * @version 6.0 Aesthetically moved the _query and params initialization
     */
    var self = {
        /**
         * The QueryExecutor to process the queries operations
         */
        _query: null,
        /**
         * The parameters to set in the query
         * @type { Query }
         * @version 2.0
         */
        params: {}
    };

    /**
     * Creates a SELECT operation
     * @param { string } table Table name
     * @param { string | Array<string> } fields Field(s) to recover
     * @param { string } conditional (OPTIONAL) WHERE clause to operation
     * @version 3.0 - Fix duplicated records returned
     * @version 4.0 - Introduction of optional settings: { join: string } and fix columns specific-table reference
     * @version 6.0 - Increased human readability
     * @example
     *      var query = new Query ();
     *      var field = query.select ('TABLE_NAME', 'FIELD_NAME', 'FIELD_ID = 1');
     *          // Returns ['FIELD_NAME_WITH_ID_1', 'ANOTHER_FIELD_NAME_WITH_ID_1']
     *  
     *      var fields = query.select ('TABLE_NAME', ['FIELD_NAME', 'ANOTHER_FIELD_NAME'], 'FIELD_ID > 1');
     *          // Returns [
     *          //              {
     *          //                  'FIELD_NAME': 'FIELD_NAME_WITH_ID_1',
     *          //                  'ANOTHER_FIELD_NAME': 'ANOTHER_FIELD_NAME_WITH_ID_1'
     *          //              },
     *          //              {
     *          //                  'FIELD_NAME': 'FIELD_NAME_WITH_ID_2',
     *          //                  'ANOTHER_FIELD_NAME': 'ANOTHER_FIELD_NAME_WITH_ID_2'
     *          //              }
     *          //          ]
     *  
     *      var fields = query.select ('TABLE_NAME TAB', ['TAB.FIELD_NAME', 'TAB_2.ANOTHER_FIELD_NAME'], 'FIELD_ID > 1', {
     *          join: 'LEFT JOIN TABLE_NAME_2 TAB_2 ON TAB_2.FIELD_ID = TAB.FIELD_ID' // Accepts the join operation
     *      });
     *          // Returns [
     *          //              {
     *          //                  'FIELD_NAME': 'FIELD_NAME_WITH_ID_1',
     *          //                  'ANOTHER_FIELD_NAME': 'ANOTHER_FIELD_NAME_WITH_ID_1'
     *          //              },
     *          //              {
     *          //                  'FIELD_NAME': 'FIELD_NAME_WITH_ID_2',
     *          //                  'ANOTHER_FIELD_NAME': 'ANOTHER_FIELD_NAME_WITH_ID_2'
     *          //              }
     *          //          ]
     */
    self.select = function (table, fields, conditional, options) {
        if (self._query != null) {
            var array = new Array ();
            var queryString = String ();

            queryString = queryString.add (
                'SELECT %fields FROM %table '.format ({
                    fields: typeof fields === 'string' ? fields : fields.join (', '),
                    table: table
                })
            );
            
            if (options) {
                if (options.join) {
                    queryString = queryString.add (options.join);
                }
            }

            if (conditional) {
                queryString = queryString.
                    add (' WHERE ').
                    add (conditional);
            }

            self._query.nativeSelect (queryString.toString ());

            while (self._query.next ()) {
                if (typeof fields === 'string') {
                    array.push (self._query.getString (fields));
                }
                else {
                    var result = {};
                    for (var index = 0; index < fields.length; index++) {
                        var selected = fields [index];

                        if (selected.indexOf ('.') < 0) {
                            result [selected] = self._query.getString (selected);
                        }
                        else {
                            result [selected.substr (selected.indexOf ('.') + 1)] =
                                self._query.getString (selected.substr (selected.indexOf ('.') + 1));
                        }
                        
                        if (index == fields.length - 1) {
                            array.push (result);
                        }
                    }
                }
            }
            return array;
        }
    };

    /**
     * Creates a SELECT operation to return only 1 record. If it brings more than one, just take the first.
     * @param { string } table Table name
     * @param { string | Array<string> } fields Field(s) to recover
     * @param { string } conditional (OPTIONAL) WHERE clause to operation
     * @version 4.0 - Introduction of optional settings: { join: string } and fix columns specific-table reference
     * @example
     *      var query = new Query ();
     *      var field = query.selectOne ('TABLE_NAME', 'FIELD_NAME', 'FIELD_ID = 1');
     *          // Returns 'FIELD_NAME_WITH_ID_1'
     *  
     *      var fields = query.selectOne ('TABLE_NAME', ['FIELD_NAME', 'ANOTHER_FIELD_NAME'], 'FIELD_ID > 1');
     *          // Returns {
     *          //             'FIELD_NAME': 'FIELD_NAME_WITH_ID_1',
     *          //             'ANOTHER_FIELD_NAME': 'ANOTHER_FIELD_NAME_WITH_ID_1'
     *          //         }
     *  
     *      var fields = query.selectOne ('TABLE_NAME TAB', ['TAB.FIELD_NAME', 'TAB_2.ANOTHER_FIELD_NAME'], 'FIELD_ID > 1', {
     *          join: 'LEFT JOIN TABLE_NAME_2 TAB_2 ON TAB_2.FIELD_ID = TAB.FIELD_ID' // Accepts the join operation
     *      });
     *          // Returns {
     *          //             'FIELD_NAME': 'FIELD_NAME_WITH_ID_1',
     *          //             'ANOTHER_FIELD_NAME': 'ANOTHER_FIELD_NAME_WITH_ID_1'
     *          //         }
     */
    self.selectOne = function (table, fields, conditional, options) {
        if (self._query != null) {
            var selectResult = {};
            var queryString = String ();

            queryString = queryString.add (
                'SELECT %fields FROM %table '.format ({
                        fields: typeof fields === 'string' ? fields : fields.join (', '),
                        table: table
                })
            );

            if (options) {
                if (options.join) {
                    queryString = queryString.add (options.join);
                }
            }

            if (conditional) {
                queryString = queryString.
                    add (' WHERE ').
                    add (conditional);
            }

            self._query.nativeSelect (queryString);

            // Operation made 1 time only
            while (self._query.next ()) {

                if (typeof fields === 'string') {
                    selectResult [fields] = self._query.getString (fields);
                }
                else {
                    for (var index = 0; index < fields.length; index++) {
                        var selected = fields [index];

                        if (selected.indexOf ('.') < 0) {
                            selectResult [selected] = self._query.getString (selected);
                        }
                        else {
                            selectResult [selected.substr (selected.indexOf ('.') + 1)]
                                = self._query.getString (selected.substr (selected.indexOf ('.') + 1));
                        }
                    }
                }
            }
            return selectResult;
        }
    };

    /**
     * Updates the record
     * @param { string } table Table name
     * @param { string } object Object to update
     * @param { string } conditional Conditional to update
     * @param { Array <string> } columnsToIgnore (OPTIONAL) Columns to ignore
     * @version 4.0 Replaced columnsToIgnore.includes by indexOf for better compatibility, added length verification and remove the mandatory instantiation of columnsToIgnore
     * @example
     *      var query = new Query (); 
     *      query.update ('TABLE_NAME', { FIELD: 'VALUE', FIELD_TO_IGNORE: 'VALUE_TO_IGNORE' }, 'FIELD_ID = 1'); // Updates all the fialds informed on db
     *      query.update ('TABLE_NAME', { FIELD: 'VALUE', FIELD_TO_IGNORE: 'VALUE_TO_IGNORE' }, 'FIELD_ID = 1', ['FIELD_TO_IGNORE']); // Updates only the field FIELD on db
     */
    self.update = function (table, object, conditional, columnsToIgnore = []) {
        var fields = object;
        var ignoredFields = new Array ();
        var checkColumnQuery =
            String ('SELECT ').
                add (    'COUNT(*) AS DONE').
                add (' FROM ').
                add (    'ALL_TAB_COLUMNS').
                add (' WHERE ').
                add (    "TABLE_NAME = '%0'").
                add (' AND ').
                add (    "COLUMN_NAME = '%1'");

        if (self._query != null) {

            var query =
                new Str ('UPDATE ').
                    add (table).
                    add (' SET ');

            Object.keys (fields).forEach (function (field, iUp1) {
                var confirmColumn = 0;
                self._query.nativeSelect (checkColumnQuery.format ([table, field]));
                while (self._query.next ()) { confirmColumn = Number (self._query.getString ('DONE')); }

                if (confirmColumn <= 0 || (columnsToIgnore.length && columnsToIgnore.indexOf (field) > -1) || (fields [field] == null || fields [field] == undefined)) {
                    ignoredFields.push (field);
                }
                else {
                    query.
                        add (field).
                        add (' = ');

                        if (String (fields [field]).match (/([0-9]{4})([-]{1})([0-9]{2})([-]{1})([0-9]{2})([ ]{1})([0-9]{2})([:]{1})([0-9]{2})([:]{1})([0-9]{2})/g))
                            query.add ("TO_DATE('").add (new Record (fields).getDate (field)).add ("', 'DD/MM/YYYY')");
                        else {
                            query.
                                add (typeof fields [field] == 'string' ? "'" : '').
                                add (fields [field]).
                                add (typeof fields [field] == 'string' ? "'" : '');
                        }
    
                    if (iUp1 === ((Object.keys (fields).length - 1) - ignoredFields.length))
                        query.add (' ');
                    else
                        query.add (', ');
                }
            });

            if (query.endsWith (', ')) query.rebuild (query.substr (0, query.len (-2)).add (' '));

            if (conditional) {
                query.
                    append ('WHERE ').
                    append (conditional);
            }
            else mostraErro ('Prohibited UPDATE without WHERE specific condition');

            self._query.update (query);

            query.rebuild ('Record successfully update');
            return ignoredFields.length ? query.add (' (Ignored fields: ').add (ignoredFields.join (', ')).add (').') : query.add ('.');
        }
    };
    
    /**
     * Sets a group of new parameters to QueryExecutor
     * @param { string | Array <string> } fields Parameters to set
     * @param { string } data New value to parameters
     * @version 2.0
     * @example
     *      var query = new Query ();
     *      query.set ('ID', 1).select ('TABLE_NAME', 'FIELD', 'FIELD_ID = {ID}');
     *      query.set (['ID', ANOTHER_ID], 1).select ('TABLE_NAME', 'FIELD', 'FIELD_ID = {ID} AND FIELD_ID = {ANOTHER_ID}');
     */
    self.set = function (fields, data) {
        if (self._query) {
            switch (typeof fields) {
                case 'string': {
                    self.params [fields] = data;
                    self._query.setParam (fields, data);
                    break;
                }
                case 'object': {
                    if (fields.length) {
                        for (var i = 0; i < fields.length; i++) {
                            self.params [fields [i]] = data;
                            self._query.setParam (fields [i], data);
                        }
                    }
                    break;
                }
                default: break;
            }
        }
        return self;
    }

    /**
     * Sets a new parameter to QueryExecutor
     * @param { string } name Parameter to set
     * @version 6.0 Implemented the return when no parameter is found
     * @example
     *      var query = new Query ();
     *      query.get ('ID'); // Returns false
     *      query.set ('ID', '1').get ('ID'); // Returns 1
     */
    self.get = function (name) {
        if (self._query) {
            return self.params [name];
        }
        return false;
    }

    /**
     * Closes the opened QueryExecutor instance. NOTE: Uses only with the App instance.
     * @version 1.0
     * @example
     *      var query = new Query ();
     *      query.close ();
     */
    self.close = function () { self._query.close (); };

    // Implementation of self initialization
    if (!self._query) self._query = getQuery ();
    else {
        self._query.close ();
        self._query = getQuery ();
    }
    return self;
}

/**     
 * Creates an JS-Database transational object
 * @param { string | any } object (Optional) Table name or object itself
 * @version 6.0 GetDate and Set methods updated
 * @example
 *      var record = new Record ();
 */
function Record (object) {
    /**
     * The Record instance
     */
    var obj = {
        record  : null
    };

    /**
     * Sets new values to desired properties
     * @param { string | Array <string> | any } fields Names or the set of fields to get the new value
     * @param { string } data (OPTIONAL) New value to property
     * @version 6.0 Implemented the possibility of set an entire object
     * @example
     *      var record = new Record ();
     *      record.set ('FIELD', 'VALUE');
     *      record.set (['FIELD', 'ANOTHER_FIELD'], 'VALUE');
     *      record.set ({'FIELD': 'VALUE', 'ANOTHER_FIELD': 'ANOTHER_VALUE'});
     */
    obj.set = function (fields, data) {
        switch (typeof fields) {
            case 'string': {
                if (obj.record.setCampo)
                    obj.record.setCampo (fields, data);
                else
                    obj.record [fields] = data;

                break;
            }
            case 'object': {
                if (fields.length) {
                    for (var z = 0; z < fields.length; z++) {
                        if (obj.record.setCampo)
                            obj.record.setCampo (fields [z], data);
                        else
                            obj.record [fields [z]] = data;
                    }
                }
                else if (data == undefined) {
                    Object.keys (fields).forEach (function (field) {
                        if (obj.record.setCampo)
                            obj.record.setCampo (field, fields [field]);
                        else
                            obj.record [field] = fields [field];
                    });
                }
                break;
            }
            default: break;
        }
        return obj;
    };

    /**
     * Gets the value of desired property
     * @param { string } name Name of property to be get
     * @version 1.0 Basic implementation
     * @returns { string | boolean }
     * @example
     *      var record = new Record ({ FIELD: 'VALUE' });
     *      record.get ('FIELD'); // Returns 'VALUE'
     *      record.get ('ANOTHER_FIELD'); // Returns false
     */
    obj.get = function (name) {
        var result = obj.record && obj.record.getCampo ? obj.record.getCampo (name) : obj.record [name];
        return result == null || result == undefined ? false : result;
    };

    /**
     * Gets the date of a database date field
     * @param { string } name Name of field to get the date
     * @returns { Date } A Date JS object
     * @version 6.0 Changed the return type to Date
     * @example
     *      var record = new Record ({ FIELD: '2021-02-08 12:13:06.0' });
     *      record.getDate ('FIELD'); // Returns (Date Instance) 'Mon Feb 08 2021 12:13:06 GMT-0300 (Brasilia Standard Time)'
     */
    obj.getDate = function (name) {
        var result = String (obj.get (name));
        var dateOnlyRex = /([0-9-]{10})/g;
        var entireDateRex = /([0-9-]{10})[\s]{1}([0-9\:\.]{8,})/g;
        var returnDate = undefined;

        if (result.match (dateOnlyRex) || result.match (entireDateRex))
            returnDate = new Date (result);
        else
            mostraErro ('Field must be a database date type!');

        return returnDate;
    };

    /**
     * Deletes a property (assuming undefined to its value)
     * @param { string } name Property name to be deleted
     * @returns { Record }
     * @version 2.0
     * @example
     *      var record = new Record ({ FIELD: 'VALUE', ANOTHER_FIELD: 'ANOTHER_VALUE' });
     *      record.delete ('VALUE').get ('VALUE'); // Deletes the FIELD property, returning false
     */
    obj.delete = function (name) {
        if (obj.record && obj.record.getCampo)
            obj.record.setCampo (name, undefined);
        else
            obj.record [name] = undefined;
        return obj;
    }

    /**
     * Saves the object in the database
     * @param { string } table Table name where to save
     * @param { string } condition The condition to be met to save
     * @param { Array <string> } columnsToIgnore Columns to ignore, used to ID properties
     * @returns { Record } The record itself
     * @example
     *      var record = new Record ({ FIELD: 'VALUE', FIELD_TO_IGNORE: 'VALUE_TO_IGNORE' });
     *      record.save (); // Throws an error if no Table name will be provided
     *      record.save ('TABLE_NAME'); // Throws an error if no condition will be provided or met
     *      record.save ('TABLE_NAME', 'FIELD_ID = 1'); // Saves the Record (with all properties) on database
     *      record.save ('TABLE_NAME', 'FIELD_ID = 1', ['FIELD_TO_IGNORE']); // Saves the Record (all properties, excluding those inside array) on database
     */
    obj.save = function (table, condition, columnsToIgnore = []) {
        if (obj.record.save) obj.record.save ();
        else {
            if (table) {
                var query = new Query ();
                var result = query.update (table, obj.record, condition, columnsToIgnore);
                query.close ();
                return result;
            }
            else
                mostraErro ('Provide the Table name to save dynamic objects');
        }
        return obj;
    };
    
    // Implementation of self initialization
    if (object) {
        if (typeof object === 'string') {
            obj.record = novaLinha (object);
        } else {
            obj.record = object;
        }
    } else {
        obj.record = novaLinha ();
    }
    return obj;
}

/**
 * Build a String
 * @param { string } text (OPTIONAL) Initial text
 * @version 5.0 Changed name to String
 */
function Str (text) {
    var innerText = {};
    innerText.text = (text) ? text : '';

    innerText.append = function (newText) {
        innerText.text += newText;
        return innerText;
    };

    /**
     * 
     * @param { string } newText 
     * @version 2.0
     */
    innerText.add = function (newText) {
        innerText.text += newText;
        return innerText;
    };

    /**
     * 
     * @param { string } toReplaceAll 
     * @version 2.0
     */
    innerText.rebuild = function (toReplaceAll) {
        innerText.text = toReplaceAll;
        return innerText;
    };

    /**
     * 
     * @param { string | Array <string> } toCheck 
     * @returns { boolean }
     * @version 2.0
     */
    innerText.endsWith = function (toCheck) {
        var ends = false;
        if (typeof toCheck == 'string')
            ends = innerText.text.endsWith (toCheck);
        else if (Array.isArray (toCheck)) {
            toCheck.forEach (function (element) {
                if (innerText.text.endsWith (element)) ends = true;
            });
        }
        return ends;
    }

    /**
     * 
     * @param { string } toReplaceAll 
     * @version 2.0
     */
    innerText.substr = function (start, length) {
        return innerText.text.substr (start, length);
    };

    innerText.toString = function () {
        return innerText.text;
    };

    /**
     * Return the text size
     * @type { Number }  
     * @version 2.0
     */
    innerText.len = function (offset = 0) {
        return innerText.toString ().length + offset;
    };

    return innerText;
}