/**********************************************/
/* Prototype Implementation (TAKE CARE)
/**********************************************/
/**
 * 
 * @param { string | Array <string> } toReplace 
 */
String.prototype.format = function (toReplace = []) {
    var str = this.toString ();

    if (toReplace.length) {
        if (typeof toReplace == 'string') {
            str = str.replace ('%0', toReplace);
        }
        else if (Array.isArray (toReplace)) {
            toReplace.forEach (function (element, index) {
                str = str.replace ('%' + index, String (element));
            });
        }
    }
    return str;
}

/**
 * 
 * @param { string } toAdd 
 */
String.prototype.add = function (toAdd = '') {
    return this.toString () + toAdd;
}

/**********************************************/
/* Utils Entity Creators
/**********************************************/
/**
 * Sets a new development environment
 * @version 2.0
 */
function Environment () {
    /**
     * The environment object itself
     * @type { Environment }
     * @version 1.0
     */
    var env = {};
    var query = null;

    /**
     * The program code to execute
     * @param { Function } toExecute Code to be executed
     * @version 2.0
     */
    env.start = function (toExecute) {
        query = new Query ();
        toExecute (env, query);
        query.close ();
    };

    /**
     * Returns the actual User selection
     * @param { boolean } singleSelect Set to bring single or multiple records selection
     * @returns { Object }
     * @version 1.0
     */
    env.getSelection = function (singleSelect) {
        return singleSelect ? linhas [0] : linhas;
    };

    /**
     * Returns the user parameter
     * @param { string } name Name of parameter
     * @version 1.0
     */
    env.getParam = function (name) {
        if (typeof name === 'string') {
            return getParam (name);
        }
    }

    /**
     * Returns the logged User
     * @version 1.0
     */
    env.getUser = function () {
        return getUsuarioLogado ();
    }

    /**
     * Add an available Java Class for dynamic use
     * @param { string } className Class name
     * @version 1.0
     * @deprecated
     */
    env.javaImport = function (className) {
        return newJava (className);
    }
    
    /**
     * Add an available Java Class for Static use
     * @param { string } className Class name
     * @version 1.0
     * @deprecated
     */
    env.javaStaticImport = function (className) {
        return javaClass (className);
    }

    /**
     * Shows a standard message
     * @param { string } text Text to show on alert
     * @version 2.0
     */
    env.alert = function (text) { mensagem = !text ? 'Nothing to return.' : typeof text === 'string' ? text : text.toString (); }

    /**
     * Shows a error message
     * @param { string } text Text to show on error
     * @version 1.0
     */
    env.error = function (text) { mostraErro (text); }

    /**
     * Validate some environmental condition. Otherwise, throw an error with message
     * @param { boolean } condition Condition to met to continue
     * @param { string } message Text to error alert if condition is false
     * @version 2.0
     */
    env.assert = function (condition, message) {
        if (!condition) env.error (message);
        return env;
    }

    return env;
}

/**
 * Implements the system QueryExecutor
 * @version 2.0
 */
function Query () {
    
    /**
     * The Query object itself
     * @type { Query }
     * @version 1.0
     */
    var obj = {};

    /**
     * The QueryExecutor to processor
     */
    obj._query = null;

    /**
     * The environment object itself
     * @type { Query }
     * @version 2.0
     */
    obj.params = {};

    /**
     * Creates a SELECT operation
     * @param { string } table Table name
     * @param { string | Array<string> } fields Field(s) to recover
     * @param { string } conditional (OPTIONAL) WHERE clause to operation
     * @version 2.0
     */
    obj.select = function (table, fields, conditional) {
        if (obj._query != null) {
            var arr = new Array ();
            var query = new StringBuilder('SELECT');

            if (typeof fields === 'string') {
                if (fields === '*') {
                    query.append (' t.* ');
                }
                else {
                    query.
                        append (' t.').
                        append (fields).
                        append (' ');
                }
            } else {
                for (var index = 0; index < fields.length; index++) {
                    query.
                        append (' t.').
                        append (fields [index]);

                    if (index === fields.length - 1)
                        query.append (' ')
                    else
                        query.append (',')
                }
            }
            query.
                append ('FROM ').
                append (table).
                append (' t');

            if (conditional) {
                query.
                    append (' WHERE ').
                    append (conditional);
            }
            obj._query.nativeSelect (query);
            while (obj._query.next ()) {
                if (typeof fields === 'string')
                    arr.push (obj._query.getString (fields));
                else {
                    var rsObj = {};
                    for (var iSel1 = 0; iSel1 < fields.length; iSel1++) {
                        rsObj [fields [iSel1]] = obj._query.getString (fields [iSel1]);
                        arr.push (rsObj);
                    }
                }
            }
            return arr;
        }
    };

    /**
     * Creates a SELECT operation to return only 1 record
     * @param { string } table Table name
     * @param { string | Array<string> } fields Field(s) to recover
     * @param { string } conditional (OPTIONAL) WHERE clause to operation
     * @version 2.0
     */
    obj.selectOne = function (table, fields, conditional) {
        if (obj._query != null) {
            var selectResult = {};
            var query = new StringBuilder('SELECT');

            if (typeof fields === 'string') {
                if (fields === '*') {
                    query.append (' t.* ');
                }
                else {
                    query.
                        append (' t.').
                        append (fields).
                        append (' ');
                }
            } else {
                for (var iSelOne1 = 0; iSelOne1 < fields.length; iSelOne1++) {
                    query.
                        append (' t.').
                        append (fields [iSelOne1]);

                    if (iSelOne1 === fields.length - 1)
                        query.append (' ')
                    else
                        query.append (',')
                }
            }
            query.
                append ('FROM ').
                append (table).
                append (' t');

            if (conditional) {
                query.
                    append (' WHERE ').
                    append (conditional);
            }

            // query.
            //     append (' ORDER BY ').append (typeof fields == 'string' ? fields : fields [0]).append (' DESC ').
            //     append ('FETCH FIRST 1 ROW ONLY');

            obj._query.nativeSelect (query);
            while (obj._query.next ()) {
                if (typeof fields === 'string')
                    selectResult [fields] = obj._query.getString (fields);
                else {
                    for (var iSelOne2 = 0; iSelOne2 < fields.length; iSelOne2++) {
                        selectResult [fields [iSelOne2]] = obj._query.getString (fields [iSelOne2]);
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
     * @version 2.0
     */
    obj.update = function (table, object, conditional, columnsToIgnore) {
        var fields = object;
        var ignoredFields = new Array ();
        var checkColumnQuery =
            new String ('SELECT ').
                add (    'COUNT(*) AS DONE').
                add (' FROM ').
                add (    'ALL_TAB_COLUMNS').
                add (' WHERE ').
                add (    "TABLE_NAME = '%0'").
                add (' AND ').
                add (    "COLUMN_NAME = '%1'");

        if (obj._query != null) {

            var query =
                new StringBuilder ('UPDATE ').
                    add (table).
                    add (' SET ');

            Object.keys (fields).forEach (function (field, iUp1) {
                var confirmColumn = 0;
                obj._query.nativeSelect (checkColumnQuery.format ([table, field]));
                while (obj._query.next ()) { confirmColumn = Number (obj._query.getString ('DONE')); }

                if (confirmColumn <= 0 || columnsToIgnore.includes (field) || (fields [field] == null || fields [field] == undefined)) {
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

            obj._query.update (query);

            query.rebuild ('Record successfully update');
            return ignoredFields.length ? query.add (' (Ignored fields: ').add (ignoredFields.join (', ')).add (').') : query.add ('.');
        }
    };
    
    /**
     * Sets a group of new parameters to QueryExecutor
     * @param { string | Array <string> } fields Parameters to set
     * @param { string } data New value to parameters
     * @version 2.0
     */
    obj.set = function (fields, data) {
        if (obj._query) {
            switch (typeof fields) {
                case 'string': {
                    obj.params [fields] = data;
                    obj._query.setParam (fields, data);
                    break;
                }
                case 'object': {
                    if (fields.length) {
                        for (i = 0; i < fields.length; i++) {
                            obj.params [fields [i]] = data;
                            obj._query.setParam (fields [i], data);
                        }
                    }
                    break;
                }
                default: break;
            }
        }
        return obj;
    }

    /**
     * Sets a new parameter to QueryExecutor
     * @param { string } name Parameter to set
     * @version 2.0
     */
    obj.get = function (name) {
        if (obj._query) {
            return obj.params [name];
        }
    }

    /**
     * Closes the opened QueryExecutor instance
     * @version 1.0
     */
    obj.close = function () { obj._query.close (); };

    if (!obj._query) obj._query = getQuery ();
    else {
        obj._query.close ();
        obj._query = getQuery ();
    }
    return obj;
}

/**     
 * Creates an transational object
 * @param { string | any } object (Optional) Table name or object itself
 * @version 1.0
 */
function Record (object) {
    /**
     * 
     */
    var obj = {};
    obj.record = null;

    obj.set = function (names, data) {
        switch (typeof names) {
            case 'string': {
                if (obj.record.setCampo)
                    obj.record.setCampo (names, data);
                else
                    obj.record [names] = data;

                break;
            }
            case 'object': {
                if (names.length) {
                    for (z = 0; z < names.length; z++) {
                        if (obj.record.setCampo)
                            obj.record.setCampo (names [z], data);
                        else
                            obj.record [names [z]] = data;
                    }
                }
                break;
            }
            default: break;
        }
        return obj;
    };

    obj.get = function (name) {
        var result = obj.record && obj.record.getCampo ? obj.record.getCampo (name) : obj.record [name];
        return result == null | result == undefined ? false : result;
    };

    /**
     * 
     * @param {*} name 
     * @version 2.0
     */
    obj.delete = function (name) {
        if (obj.record && obj.record.getCampo)
            obj.record.setCampo (name, undefined);
        else
            obj.record [name] = undefined;
        return obj;
    }

    /**
     * 
     * @param { string } name 
     * @version 2.0
     */
    obj.getDate = function (name) {
        var result = obj.get (name);

        if (String (result).match (/([0-9]{4})([-]{1})([0-9]{2})([-]{1})([0-9]{2})([ ]{1})([0-9]{2})([:]{1})([0-9]{2})([:]{1})([0-9]{2})/g))
            result = String (result).substr (0, 10);
        else mostraErro ('Field must be a database date type!');

        var year = result.substr (0, 4);
        var month = result.substr (5, 2);
        var day = result.substr (8, 2);

        return new StringBuilder (day).append ('/').append (month).append ('/').append (year);
    };

    obj.save = function (table, condition, columnsToIgnore = []) {
        if (obj.record.save) obj.record.save ();
        else {
            if (table)
                return new Query ().update (table, obj.record, condition, columnsToIgnore);
            else
                mostraErro ('Provide the Table name to save dynamic objects');
        }
        return obj;
    };
    
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
 * Build a new String
 * @param { string } text (OPTIONAL) Initial text
 */
function StringBuilder (text) {
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
    innerText.len = function (toCalculate = 0) {
        return innerText.toString ().length + toCalculate;
    };

    return innerText;
}