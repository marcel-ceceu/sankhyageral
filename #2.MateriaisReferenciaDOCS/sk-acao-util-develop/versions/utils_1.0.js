
Object.prototype.isString = function () { return typeof this[0] === 'string' }

/**
 * Implements the system QueryExecutor
 */
function Query () {
    
    var obj = {};

    /**
     * The QueryExecutor itself
     */
    obj._query = null;
    if (!obj._query) obj._query = getQuery ();
    else {
        obj._query.close ();
        obj._query = getQuery ();
    }

    /**
     * Creates a SELECT operation
     * @param { string } table Table name
     * @param { string | Array<string> } fields Field(s) to recover
     * @param { string } conditional (OPTIONAL) WHERE clause to operation
     * @param { any } options (OPTIONAL) TO_BE_IMPLEMENTED
     */
    obj.select = function (table, fields, conditional, options) {
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
                else
                    arr.push (obj._query.getString (fields [0]));
            }
            return arr;
        }
    };
    
    /**
     * Sets a group of new parameters to QueryExecutor
     * @param { string | Array <string> } fields Parameters to set
     * @param { string } data New value to parameters
     */
    obj.set = function (fields, data) {
        if (obj._query) {
            switch (typeof fields) {
                case 'string': {
                    obj._query.setParam (fields, data);
                    break;
                }
                case 'object': {
                    if (fields.length) {
                        for (i = 0; i < fields.length; i++) {
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
     * @param { string } text Parameter to set 
     */
    obj.get = function (text) {
        if (obj._query) {
            return obj._query.getParam (text);
        }
    }

    /**
     * Closes the opened QueryExecutor instance
     */
    obj.close = function () { obj._query.close (); };
    return obj;
}

/**
 * 
 * @param { boolean } singleSelect 
 */
function Environment (singleSelect) {
    var env = {};

    env.getSelection = function () {
        return singleSelect ? linhas [0] : linhas;
    };

    env.getParam = function (name) {
        if (typeof name === 'string') {
            return getParam (name);
        }
    }

    env.getUser = function () {
        return getUsuarioLogado ();
    }

    env.javaImport = function (className) {
        return newJava (className);
    }
    
    /**
     * 
     * @param { string } className 
     * @deprecated
     */
    env.javaStaticImport = function (className) {
        return javaClass (className);
    }

    /**
     * Shows a standard message
     * @param { string } text 
     */
    env.alert = function (text) { mensagem = typeof text === 'string' ? text : text.toString (); }

    /**
     * Shows a error message
     * @param { string } text 
     */
    env.error = function (text) { mostraErro (text); }

    if (singleSelect) {
        if (linhas.length) {
            if (linhas.length > 1) env.error ('Select just one Record at time!');
        }
        else env.error ('Select, at least, one Record');
    }
    else {
        if (!linhas.length) env.error ('Select, at least, one Record');
    }

    return env;
}

/**     
 * Creates a instance of an table object
 * @param { string | any } object (Optional) Table name or object itself
 */
function Record (object) {
    var obj = {};
    if (object) {
        if (typeof object === 'string') {
            obj.record = novaLinha (object);
        } else {
            obj.record = object;
        }
    } else {
        obj.record = novaLinha ();
    }

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
    }

    obj.get = function (name) {
        return obj.record.getCampo ? obj.record.getCampo (name) : obj.record [name];
    };

    obj.save = function () {
        if (obj.record.save) obj.record.save ();
        return obj;
    };
    return obj;
}

/**
 * Build a new String
 * @param { string } text (OPTIONAL) Initial text
 */
function StringBuilder (text) {
    var innerText = {};
    if (text) innerText.text = text;
    else innerText.text = '';
    innerText.append = function (newText) {
        innerText.text += newText;
        return innerText;
    };
    innerText.toString = function () {
        return innerText.text;
    };
    return innerText;
}