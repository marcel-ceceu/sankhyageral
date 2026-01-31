/**********************************************/
/* Prototype Implementation (TAKE CARE)
/**********************************************/
/**
 * 
 * @description Formats the string itself with parameters
 * @param { string | number | Array <string> | Array <number> | object } toReplace 
 * @version 3.0 - Added named parameters
 * @version 8.0 - Added single number argument compatibility
 * @todo This code is acessible to ES5. To better readability and performance/standards, implements Arrow functions and replace the lines: 31, 32 and 33 by 34;
 */
String.prototype.format = function (toReplace) {
    
    // The text itself
    var str = this.toString ();
    // Variable that will contains the interpolation found inside text
    var toFind = '';
    
    // Checks if there is something passed as a parameter
    if (toReplace && toReplace.toString ().length) {

        // Checks if the parameter passed is a string or a number
        // Single Interpolation     : console.log ('%hiplanet that is too damn high. Again, %hiplanet!'.format ('Hi, Planet'));
        // Multiple Interpolation   : console.log ('%0 that is too damn high. Again, %1!'.format ('Hi, Planet'));
        // Multiple Named-Index Interpolation   : console.log ('%something that is too damn high. Again, %458!'.format ('Hi, Planet'));
        if (typeof toReplace == 'string' || typeof toReplace == 'number') {
            
            // Maps all possible interpolation replacements
            toFind = str.match (/([%])([a-zA-Z]|[\d])+/g);
            
            // Replaces all occurencies of interpolation replacements by the single informed parameter
            toFind.forEach (function (elem) {
                str = str.toString ().split (elem).join (toReplace.toString ());
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
                    toFind = str.match (/([%])([a-zA-Z]|[\d])+/) [0];
                    str = toFind ? str.split (toFind).join (String (element)) : str;

                }
                else {
                    // Checks an array of object as parameters
                    // console.log ('%hi, %planet that is too damn high. Again, %hi, %planet!'.format ([{ hi: 'Hi' }, { planet: 'Planet' }]));
                    Object.keys (element).forEach (function (elem) {
                        toFind = str.match (new RegExp ('(%)('+ elem + ')', 'g')) [0];
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
            toFind = str.match (new RegExp ('(%)('+ elem + ')', 'g')) [0];
            str = toFind ? str.split ('%' + elem).join (String (toReplace [elem])) : str;
        });
    }
    return str;
};

/**
 * 
 * @param { string } toAdd 
 * @version 3.0
 */
String.prototype.add = function (toAdd = '') {
    return this.toString () + toAdd;
}

/**
 * @version 1.0
 */
Date.prototype.getArray = function () {
	const mm = this.getMonth () + 1;
	const dd = this.getDate ();

	let arr = new Array ();
	arr.push (this.getFullYear ());
	arr.push ((mm > 9 ? '' : '0') + mm);
	arr.push ((dd > 9 ? '' : '0') + dd);

	return arr;
};

/**
 * @version 7.0
 */
Date.prototype.toSQLDate = function () {
    return this.toISOString ().split (/[T]/) [0] + ' ' + d.toTimeString ().split (/\s/) [0];
}

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
 * @version 7.0 Accumulator sum fix
 */
Array.prototype.reduce = function (toExec, initialAccumulatorValue) {
    var index;
    var accumulator;

    if (typeof initialAccumulatorValue == 'string') {
        accumulator = '';
    } else if (typeof initialAccumulatorValue == 'number') {
        accumulator = 0;
    } else {
        accumulator = {};
    }

    for (index = 0; index < this.length; index++) {
        if (typeof initialAccumulatorValue == 'string' || typeof initialAccumulatorValue == 'number') {
            accumulator = toExec (accumulator, this [index], index, this);
        }
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
         * @version 6.0 The query was putted inside the app object
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
     * @version 7.0 Modified 
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

    /** [TO VALIDATE] */
    app.upperSelection = function () {
        return getLinhaPai;
    }

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

    /** [TO VALIDATE] */
    app.systemParam = function (name) {
        return getParametroSistema (name);
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
        if (!text) {
            mensagem = '[ VALOR INDEFINIDO ]';
        } else {
            mensagem = text.toString ();
        }
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

    /**
     * Shows an confirmable (OK and Cancel) alert to user
     * @param { string } title Title of alert box
     * @param { string } message Text message of alert box
     * @version 7.0 Main implementation
     * @example
     *      var application = new App ();
     *      application.start (function (app) {
     *          app.confirm ('App says', 'Do You really want to go ahead?');
     *      });
     */
    app.confirm = function (title, message) {
        confirmar (title, message, 1);
        return app;
    }
    
    /**
     * Shows an confirmable (YES, NO and Cancel) alert to user
     * @param { string } title Title of alert box
     * @param { string } message Text message of alert box
     * @version 7.0 Main implementation
     * @example
     *      var application = new App ();
     *      application.start (function (app) {
     *          if (app.yesNo ('App says', 'Do You really want to go ahead?')) {
     *              app.alert ('You did it!');
     *          }
     *          else {
     *              app.alert ('You gave up!');
     *          }
     *      });
     */
    app.yesNo = function (title, message) {
        return confirmarSimNao (title, message, 1);
    }

    /**
     * Opens a new system page
     * 
     * @param { any } options Options with call page details
     * @version 8.0 Main implementation
     * @example
     *      var application = new App ();
     *      application.start (function (app) {
     *          var opt = {
     *              id: 'system.page.ID',
     *              pk: {
     *                  PK: app.selection (true).get ('ONE_COLUMN'),
     *                  other_pk: 999
     *              },
     *              params: {
     *                  one_param: 'ONE_PARAM'),
     *                  ANOTHER_param: app.selection (true).get ('ANOTHER_PARAM')
     *              }
     *          }
     *          app.openPage (opt);
     *      });
     */
    app.openPage = function (options) {

        var body = {};

        if (options.pk) {
            Object.keys (options.pk).
                forEach (function (key) {
                    body [key] = isNaN (options.pk [key]) ? options.pk [key] : '_' + String (options.pk [key])
                });
        }

        if (options.params) {

            body.ACTION_PARAMETERS = {};

            Object.keys (options.params).
                forEach (function (item, index) {

                    body [item] = isNaN (options.params [item]) ? options.params [item] : '_' + String (options.params [item])
        
                    body.ACTION_PARAMETERS [index] = { fieldName: item, value: isNaN (options.params [item]) ? options.params [item] : '_' + String (options.params [item]) };
        
                });
        }

        body.call_time = Date.now ();
        
        var url = '/mge/system.jsp#app/%resID/%body&pk-refresh=%time';
        url = url.format ({
            resID: Base64.encode (options.id),
            body : Base64.encode (JSON.stringify (body)),
            time : String (Date.now ())
        });

        var html = ''
            + '<script id=\"autoClickLink\">'
                + 'Object.assign ('
                    + 'document.createElement ("a"), { target: "_top", href: "%url" }'
                + ').click ();'
                + 'setTimeout (() =>'
                    + 'document.getElementById ("autoClickLink").parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector ("div.modal-type-warning.modal.modal-message.sk-popup.ng-isolate-scope.in > div > div > div.modal-body").parentElement.querySelector ("button.btn-default").click ()'
                + ', 1000);'
            + '</script>'
            + 'Confirme aqui a abertura da tela!';

        mensagem = html.format ({ url: url });
    }

    app.sendTxt = function (options) {

        var html = ''
            + '<script>'
                + "(function () {"
                    + "let msg     = '%msg';"
                    + "let number  = '%num';"
                    + "let ip      = '%ip';"
                    + "let port    = '%port';"
                    + "let session = '%sess';"
                    + "let url     = 'http://' + ip + ':' + port + '/sendText';"
                    + "(async () => {"
                        + "const response = await fetch (url, {"
                            + "method: 'POST',"
                            + "headers: {"
                                + "'Accept'        : 'application/json',"
                                + "'Content-Type'  : 'application/json'"
                            + "},"
                            + "body: JSON.stringify ("
                                + "{"
                                    + "sessionName : session,"
                                    + "number      : number,"
                                    + "text        : msg"
                                + "}"
                            + ")"
                        + "});"
                        + "console.log (await response.json (););"
                    + "}) ();"
                + "}) ();"
            + '</script>'
            + '%sec';

        mensagem = html.format ({
            ip  : options.ip,
            port: options.port,
            sess: options.session,
            msg : options.message,
            num : options.number,
            sec : options.alert
        });

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
        else {
            mostraErro ('Database unavailable. Try again later!');
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
        else {
            mostraErro ('Database unavailable. Try again later!');
        }
    };

    /**
     * Updates the record
     * @param { string } table Table name
     * @param { string } object Object to update
     * @param { string } conditional Conditional to update
     * @param { Array <string> } columnsToIgnore (OPTIONAL) Columns to ignore
     * @version 4.0 Replaced columnsToIgnore.includes by indexOf for better compatibility, added length verification and remove the mandatory instantiation of columnsToIgnore
     * @version 7.0 Force the table name to upper case
     * @version 8.0 Fix append method dependencies
     * @example
     *      var query = new Query (); 
     *      query.update ('TABLE_NAME', { FIELD: 'VALUE', FIELD_TO_IGNORE: 'VALUE_TO_IGNORE' }, 'FIELD_ID = 1'); // Updates all the fields informed on db
     *      query.update ('TABLE_NAME', { FIELD: 'VALUE', FIELD_TO_IGNORE: 'VALUE_TO_IGNORE' }, 'FIELD_ID = 1', ['FIELD_TO_IGNORE']); // Updates only the field FIELD on db
     */
    self.update = function (table, object, conditional, columnsToIgnore = []) {
        var fields = object;
        var ignoredFields = new Array ();
        var checkColumnQuery =
            String ('SELECT ').
                add (    'COUNT (*) AS DONE').
                add (' FROM ').
                add (    'ALL_TAB_COLUMNS').
                add (' WHERE ').
                add (    "TABLE_NAME = '%0'").
                add (' AND ').
                add (    "COLUMN_NAME = '%1'");

        if (self._query != null) {

            var updateQuery = ''.
                add ('UPDATE ').
                add (table.toUpperCase ()).
                add (' SET ');

            Object.keys (fields).forEach (function (field, iUp1) {

                var confirmColumn = 0;

                self._query.nativeSelect (checkColumnQuery.format ([table.toUpperCase (), field.toUpperCase ()]));

                while (self._query.next ()) {
                    confirmColumn = Number (self._query.getString ('DONE'));
                }

                if (confirmColumn <= 0
                    || (
                        columnsToIgnore
                        && columnsToIgnore.length
                        && columnsToIgnore.indexOf (field) > -1
                    )
                    || (
                        fields [field] == null
                        || fields [field] == undefined
                    )
                ) {
                    ignoredFields.push (field);
                }
                else {
                    updateQuery = updateQuery.add (field).add (' = ');

                    if (String (fields [field]).match (/([\d]{4})([-]{1})([\d]{2})([-]{1})([\d]{2})([ ]{1})([\d:]{8})/g))
                        updateQuery = updateQuery.add ("TO_DATE ('").add (new Record (fields).getDate (field)).add ("', 'DD/MM/YYYY')");
                    else {
                        updateQuery = updateQuery.
                            add (typeof fields [field] == 'string' ? "'" : '').
                            add (fields [field]).
                            add (typeof fields [field] == 'string' ? "'" : '');
                    }
    
                    if (iUp1 === ((Object.keys (fields).length - 1) - ignoredFields.length))
                        updateQuery = updateQuery.add (' ');
                    else
                        updateQuery = updateQuery.add (', ');
                }

            });

            if (updateQuery.endsWith (', ')) {
                updateQuery = updateQuery.substr (0, updateQuery.length - 2).add (' ');
            }

            if (conditional) {
                updateQuery = updateQuery.add ('WHERE ').add (conditional);
            }
            else {
                mostraErro ('Prohibited INSERT/UPDATE operation without WHERE specific condition');
            }

            self._query.update (updateQuery);

            updateQuery = 'Record successfully update';
            return ignoredFields.length
                ? updateQuery.add (' (Ignored fields: ').add (ignoredFields.join (', ')).add (').')
                : updateQuery.add ('.');
        }
        else {
            mostraErro ('Database unavailable. Try again later!');
        }
    };

    /**
     * Deletes a record
     * @param { string } table Table name
     * @param { string } conditional Conditional to delete
     * @version 7.0 Basic Implementetion
     * @example
     *      var query = new Query (); 
     *      query.delete ('TABLE_NAME_REAL', 'FIELD_ID = 1'); // Returns: Records from TABLE_NAME_REAL successfully deleted
     *      query.delete ('TABLE_NAME_NOT_REAL', 'FIELD_ID = 1'); // Throws an exception: Table provided (TABLE_NAME_NOT_REAL) does not exists!
     *      query.delete ('TABLE_NAME_REAL'); // Throws an exception: Prohibited DELETE operation without WHERE specific condition
     */
    self.delete = function (table, conditional) {
        var checkTableQuery =
            String ('SELECT ').
                add (    'COUNT (*) AS DONE').
                add (' FROM ').
                add (    'USER_TABLES').
                add (' WHERE ').
                add (    "TABLE_NAME = '%table'");

        var confirmColumn = 0;

        if (self._query != null) {

            self._query.nativeSelect (checkTableQuery.format ({ table: table.toUpperCase () }));
            while (self._query.next ()) { confirmColumn = Number (self._query.getString ('DONE')); }
    
            if (confirmColumn > 0) {

                var query = ''.
                        add ('DELETE').
                        add (' FROM ').
                        add (table.toUpperCase ());

    
                if (conditional) {
                    query.
                        add (' WHERE ').
                        add (conditional);
                }
                else {
                    mostraErro ('Prohibited DELETE operation without WHERE specific condition');
                }

                self._query.update (query);

                return 'Records from %table successfully deleted'.format ({ table: table });
            }
            else
                mostraErro ('Table provided (%table) does not exists!'.format ({ table: table }));
        }
        else {
            mostraErro ('Database unavailable. Try again later!');
        }
    }
    
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

                        fields.forEach (function (field) {
                            self.params [field] = data;
                            self._query.setParam (field, data);
                        });

                        /**
                        for (var i = 0; i < fields.length; i++) {
                            self.params [fields [i]] = data;
                            self._query.setParam (fields [i], data);
                        }
                        */
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
     * Executes a database command with possibility to disable triggers
     * @param { string } command Command to be executed
     * @param { string } tableToDisable Table to disable ALL triggers
     * @version 8.0
     * @example
     *      var query = new Query ();
     *      query.execute ('INSERT INTO TABLE_B (FIELD_B) VALUES ('VALUE_B')'); // Normal execution
     *      query.execute ('UPDATE TABLE_A SET FIELD_A = 'VALUE_A' WHERE ID_A = 'A'', 'TABLE_A'); // Disables triggers of table 'TABLE_A' and execution
     */
    self.execute = function (command) {

        if (command.indexOf ('#DT=') == 0) {

            // Splits the string to recover the table name
            // #DT=TABLE#...
            var arr = command.split ('#');

            // Stores the table name to disable the triggers
            var table = arr [1].split ('=') [1];

            // Stores all commands in the order to database execution
            var exec = new Array ();
            // 1. Executes the deactivation of ALL triggers from the specified table
            exec.push ('ALTER TABLE '.concat (table).concat (' DISABLE ALL TRIGGERS'));
            // 2. Executes the command itself
            exec.push (arr [2]);
            // 3. Executes the reactivation of ALL triggers from the specified table
            exec.push ('ALTER TABLE '.concat (table).concat (' ENABLE ALL TRIGGERS'));
            
            exec.forEach (function (v) {
                if (v.length) query.update (v);
            });

        } else {
            // Execucao normal de operacoes sem desligamento das triggers
            query.update (command);
        }
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
 * @param { string | any } newInstance (Optional) Table name or object itself
 * @version 6.0 GetDate and Set methods updated
 * @version 7.0 Delete implementation and self containing properties fix
 * @example
 *      var record = new Record ();
 */
function Record (newInstance) {
    /**
     * The Record instance
     */
    var obj = {
        record: null
    };

    /**
     * Sets new values to desired properties
     * @param { string | Array <string> | any } fields Names or the set of fields to get the new value
     * @param { string } data (OPTIONAL) New value to property
     * @version 6.0 Implemented the possibility of set an entire object
     * @version 7.0 Implemented the direct access of properties
     * @example
     *      var record = new Record ();
     *      record.set ('FIELD', 'VALUE');
     *      record.set (['FIELD', 'ANOTHER_FIELD'], 'VALUE');
     *      record.set ({'FIELD': 'VALUE', 'ANOTHER_FIELD': 'ANOTHER_VALUE'});
     */
    obj.set = function (fields, data) {
        switch (typeof fields) {
            case 'string': {
                if (obj.record.setCampo) {
                    obj.record.setCampo (fields, data);
                }
                else {
                    obj.record [fields] = data;
                }
                obj [fields] = data;
                break;
            }
            case 'object': {
                if (fields.length) {
                    for (var z = 0; z < fields.length; z++) {
                        if (obj.record.setCampo) {
                            obj.record.setCampo (fields [z], data);
                        }
                        else {
                            obj.record [fields [z]] = data;
                        }
                        obj [fields [z]] = data;
                    }
                }
                else if (data == undefined) {
                    Object.keys (fields).forEach (function (field) {
                        if (obj.record.setCampo) {
                            obj.record.setCampo (field, fields [field]);
                        }
                        else {
                            obj.record [field] = fields [field];
                        }
                        obj [field] = fields [field];
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
     *      var record = new Record ({ FIELD: 'VALUE', SOME_OTHER_FIELD: 'SOME_VALUE' });
     *      record.get ('FIELD'); // Returns 'VALUE'
     *      record.get ('ANOTHER_FIELD'); // Returns false
     *      record ['ANOTHER_FIELD_TOO']; // Returns undefined
     *      record.SOME_OTHER_FIELD;      // Returns 'SOME_VALUE'
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
        var entireDateRex = /([0-9-]{10})[ ]{1}([0-9:.]{8,})/g;
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
     *      record.deleteParam ('VALUE').get ('VALUE'); // Deletes the FIELD property, returning false
     */
    obj.deleteParam = function (name) {
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
     * @version 1.0 Basic Implementation
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

    /**
     * Saves the object in the database
     * @param { string } table Table name where to save
     * @param { string } condition The condition to be met to save
     * @param { Array <string> } columnsToIgnore Columns to ignore, used to ID properties
     * @returns { Record } The record itself with the temporary values
     * @version 7.0 Basic Implementation
     * @example
     *      var record = new Record ({ FIELD: 'VALUE', FIELD_TO_IGNORE: 'VALUE_TO_IGNORE' });
     *      record.delete (); // Throws an error if no Table name will be provided
     *      record.delete ('TABLE_NAME'); // Throws an error if no condition will be provided or met
     *      record.delete ('TABLE_NAME', 'FIELD_ID = 1'); // Deletes the Record from database
     */
    obj.delete = function (table, condition) {
        if (obj.record.remove) obj.record.remove ();
        else {
            if (table) {
                var query = new Query ();
                var result = query.delete (table, condition);
                query.close ();
                return result;
            }
            else {
                mostraErro ('Provide the Table name to delete dynamic objects');
            }
        }
        return obj;
    }
    
    // Implementation of self initialization
    if (newInstance) {
        if (typeof newInstance === 'string') {
            obj.record = novaLinha (newInstance);
        } else {
            obj.record = newInstance;
            if (Object.keys (newInstance).indexOf ('getClass') == -1) {
                Object.
                    keys (newInstance).
                    forEach (
                        function (key) {
                            obj.record [key] = newInstance [key];
                            obj [key] = newInstance [key];
                        }
                    );
            }

        }
    } else {
        obj.record = novaLinha ();
    }
    return obj;
}

/**
 * Manager to manipulates the Base64 operations
 * 
 * @version 8.0 Main Implementation
 */
var Base64 = {
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    
    /**
     * Base64 encoder
     * @param { string } input Text to be encoded
     */
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
    
        input = Base64._utf8_encode (input);
    
        while (i < input.length) {
    
            chr1 = input.charCodeAt (i++);
            chr2 = input.charCodeAt (i++);
            chr3 = input.charCodeAt (i++);
    
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
    
            if (isNaN (chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN (chr3)) {
                enc4 = 64;
            }
    
            output = output
                        + Base64._keyStr.charAt (enc1)
                        + Base64._keyStr.charAt (enc2)
                        + Base64._keyStr.charAt (enc3)
                        + Base64._keyStr.charAt (enc4);
        }    
        return output;
    },
    
    /**
     * Base64 decoder
     * @param { string } input Text to be decoded
     */
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
    
        input = input.replace (/[^A-Za-z0-9\+\/\=]/g, "");
    
        while (i < input.length) {
    
            enc1 = Base64._keyStr.indexOf (input.charAt (i++));
            enc2 = Base64._keyStr.indexOf (input.charAt (i++));
            enc3 = Base64._keyStr.indexOf (input.charAt (i++));
            enc4 = Base64._keyStr.indexOf (input.charAt (i++));
    
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
    
            output = output + String.fromCharCode (chr1);
    
            if (enc3 != 64) {
                output = output + String.fromCharCode (chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode (chr3);
            }
        }
        output = Base64._utf8_decode (output);

        return output;

    },
    
    /**
     * Base64 UTF-8 encoder
     * @param { string } input Text to be encoded
     */
    _utf8_encode: function (string) {

        string = string.replace (/\r\n/g, "\n");
        var utftext = "";
    
        for (var n = 0; n < string.length; n++) {
    
            var c = string.charCodeAt (n);
    
            if (c < 128) {
                utftext += String.fromCharCode (c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode ((c >> 6) | 192);
                utftext += String.fromCharCode ((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode ((c >> 12) | 224);
                utftext += String.fromCharCode (((c >> 6) & 63) | 128);
                utftext += String.fromCharCode ((c & 63) | 128);
            }
        }
        return utftext;
    },
    
    /**
     * Base64 UTF-8 decoder
     * @param { string } input Text to be decoded
     */
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c1, c2, c3;
    
        while (i < utftext.length) {
    
            c1 = utftext.charCodeAt (i);
    
            if (c1 < 128) {
                string += String.fromCharCode (c1);
                i++;
            }
            else if ((c1 > 191) && (c1 < 224)) {
                c2 = utftext.charCodeAt (i+1);
                string += String.fromCharCode (((c1 & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt (i+1);
                c3 = utftext.charCodeAt (i+2);
                string += String.fromCharCode (((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

/**
 * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
 * Static object controller to manipulates the operations with JSON.
 * 
 * @version 8.0 Main Implementation
 */
var JSON = {

    /**
     * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
     * @param value — A JavaScript value, usually an object or array, to be converted.
     */
    stringify: function (value) {
        var prop, str, val, isArray = value instanceof Array;
        // Prototype injections to not stringify
        var ignored = ['equals'];

        if (typeof value !== "object") {

            if (typeof value === 'string') {
                return "\"%0\"".format (value);
            } else if (typeof value === 'number') {
                return value.toString ();
            }
        }

        str = isArray ? "[" : "{";

        for (prop in value) {

            if (ignored.indexOf (prop.toString ()) < 0) {
                if (!isArray) {
                    // quote property
                    str += JSON._quote (prop) + ": ";
                }
    
                // quote value
                val = value [prop];
                str += typeof val === 'object' ? JSON.stringify (val) : JSON._quote (val);
                str += ", ";
            }
        }

        // Remove last colon, close bracket
        str = str.substr (0, str.length > 1 ? str.length - 2 : str.length) + ( isArray ? "]" : "}" );

        return str;
    },

    /**
     * Mount the string with flat object
     * @param value — Object to be tranformed
     */
    _quote: function (str) {
        if (typeof str !== 'string') str = str.toString ();

        str = str.match (/^\".*\"$/) ? str : '"' + str.replace (/"/g, '\\"') + '"';

        if (isNaN (str.replace (/^["]/, '').replace (/["]$/, '')))
            if (
                str.replace (/^["]/, '').replace (/["]$/, '').startsWith ('_')
                && !isNaN (str.replace (/^["]/, '').replace (/["]$/, '').replace ('_', ''))
            )
                return str.replace ('_', '');
            else
                return str;
        else
            return str.replace (/^["]/, '').replace (/["]$/, '');
    }
}
