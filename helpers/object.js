/**
 * Object prototype helpers
 * Will augment the Object Prototype
 * with helper methods that will allow the developer
 * to ease up the object handling process
 *
 * @methods 
 *  setValueOf      - sets a value to an object chain : (chain, value)
 *  getValueOf      - retrieves the value of an object chain : (chain, default_value_if_undefined)
 *  unsetValueOf    - unsets the value of an object chain: (chain)
 *  updateValueOf   - updates the value of an object chain: (chain, value)
 *  expand          - expands an object with another object and returns the result (source, override = true|false)
 *  glue            - glues properties using a given pattern: glue(pattern). the properties are being noted between parantheses: (property)
 *  without         - excludes keys from the object and returns it
 *  softClone       - creates a soft clone of the object using the JSON tweak
 */

(function() {
    
    /**
     * @method Object.prototype.setValueOf
     * Being used for creating dynamic tree structures onto an object.
     */
    Object.defineProperty(Object.prototype, 'setValueOf', {
        enumerable: false,
        value: function(key, val) {

            var keyparts,
                i_part = 0,
                part,
                value,
                shallow = this;

            if (undefined === key) {
                return undefined;
            }

            keyparts = key.toString().split('.');
            for (i_part; i_part < keyparts.length; i_part += 1) {

                part = keyparts[i_part];
                value = shallow[part];
                if (undefined === value) {
                    if (i_part < (keyparts.length - 1)) {
                        shallow[part] = {};
                        shallow = shallow[part];
                    } else {
                        shallow[part] = val;
                    }

                } else {
                    shallow = shallow[part];
                }
            }
            return this.getValueOf(key, false);
        }
    });



    /**
     * @method Object.prototype.getValueOf
     * Being used for retrieving dynamic tree structures from an object.
     */
    Object.defineProperty(Object.prototype, 'getValueOf', {
        enumerable: false,
        value: function(params, fallback) {
            var value,
                keyparts,
                i_part = 0,
                part,
                teststring = [],
                key,
                levelReference;

            if (undefined === params) {
                return undefined;
            }

            if (typeof params === "object") {
                return params;
            }

            keyparts = params.toString().split(".");
            levelReference = this;
            value = "";

            if (0 < keyparts.length) {
                while (0 < keyparts.length) {
                    key = keyparts.shift();
                    if (undefined !== levelReference[key]) {
                        levelReference = levelReference[key];
                    } else {
                        value = undefined;
                        break;
                    }
                }
            }

            if (undefined  === value) {
                value = fallback;
                if ("function" === typeof fallback) {
                    value = fallback();
                }
            } else {
                value = levelReference;
            }

            return value;
        }
    });


    /**
     * @method Object.prototype.unsetValueOf
     * Being used for deleting dynamic tree structures from an object.
     */
    Object.defineProperty(Object.prototype, 'unsetValueOf', {
        enumerable: false,
        value: function(params) {
            var value,
                keyparts = params.split("."),
                lastPart,
                shallowPointer;

            if ('function' !== typeof params && 'string' === typeof params) {
                if (1 < keyparts.length) {
                    params = keyparts.pop();
                    shallowPointer = this.getValueOf(keyparts.join("."));
                } else {
                    shallowPointer = this;
                }

                try {
                    delete shallowPointer[params];
                } catch (e) {
                    return false;
                }

            } else {
                return false;
            }
            return value;
        }
    });



    /**
     * @method Object.prototype.updateValueOf
     * Being used for updating dynamic tree structures onto an object.
     */
    Object.defineProperty(Object.prototype, 'updateValueOf', {
        enumerable: false,
        value: function(params, value) {
            var parts, 
                reference, 
                key;
            
            if (undefined !== this.getValueOf(params)) {
                if (/\./.test(params) && 'function' !== typeof value) {
                    parts = params.split('.');
                    key = parts.pop();
                    reference = this.getValueOf(parts.join("."));
                    if (undefined !== reference) {
                        reference[key] = value;
                    }
                } else {
                    this[params] = value;
                }
            } else {
                return this.setValueOf(params, value);
            }

        }
    });

    /**
     * @method Object.prototype.glue
     * Glues the properties of an object using a pattern
     */
    Object.defineProperty(Object.prototype, "glue", {
        value: function (pattern) {
            var matches,
                value,
                throwException = false,
                usedPattern,
                self;

            usedPattern = pattern;    
            matches = pattern.match(/\(([^\(]+)\)/g);
            if (0 < matches.length) {
                self = this;
                matches.forEach(function (match){
                    value = self.getValueOf(match.replace(")","").replace("(",""));
                    if (undefined === value) {
                        throwException = true;
                    }
                    pattern = pattern.replace(match, value);
                });
            }

            if (true === throwException) {
                throw new Exception("InvalidObjectException", "Tried to glue pieces which are non existent using the pattern " + usedPattern, 1103)
            }

            return pattern;
        }
    });

    /**
     * @method Object.prototype.expand
     * Expands an object with another object. 
     */
    Object.defineProperty(Object.prototype, 'expand', {
        enumerable: false,
        value: function(source, override) {
            var i;


            if ('object' !== typeof source) {
                return false;
            }
            for (i in source) {
                if (true === source.hasOwnProperty(i)) {
                    if (true === this.hasOwnProperty(i)) {
                        if (undefined !== override && true === override) {
                            this[i] = source[i];
                        }
                    } else {
                        this[i] = source[i];
                    }
                }
            }
            return this;
        }
    });

    /** 
     * @method Object.without
     * Excludes keys from the current object and returns it
     */
    Object.defineProperty(Object.prototype, "without", {
        value: function () {
            var i_argument,
            result = {};

            for (i_argument in arguments) {
                this.unsetValueOf(arguments[i_argument]);
            }

            return this;
        }
    });

    /** 
     * @method Object.softClone
     * Creates a soft clone of the object using JSON tweak 
     */
    Object.defineProperty(Object.prototype, "softClone", {
        value: function () {
            return JSON.parse(JSON.stringify(this));
        }
    });
    
    Object.defineProperty(Object.prototype, 'copy', {
        value: function (obj) {
            var copy;

            // Handle the 3 simple types, and null or undefined
            if (null == obj || "object" != typeof obj) return obj;

            // Handle Date
            if (obj instanceof Date) {
                copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }

            // Handle Array
            if (obj instanceof Array) {
                copy = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copy[i] = clone(obj[i]);
                }
                return copy;
            }

            // Handle Object
            if (obj instanceof Object) {
                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = this.copy(obj[attr]);
                }
                return copy;
            }

            throw new Error("Unable to copy obj! Its type isn't supported.");
        }
    });
}());