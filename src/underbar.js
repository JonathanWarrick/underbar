/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (array.length < n) {
      return array;
    } else {
    return n === undefined ? array[array.length - 1] : array.slice(array.length - n, array.length);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // works on arrays
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      // works on objects
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      result = (item === target && result === -1) ? index : result;
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // create empty placeholder array for results
    var result = [];
    
    // want to go through each element in collection and return those where test(value) === true.
    _.each(collection, function(value) {    // note: do not need to provide all three inputs for iterator function.
      if (test(value)) {
        result.push(value);
      }
    });

    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(value) {
      return !test(value); 
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    // create empty placeholder array for first instance of each value
    var result = [];

    // want to go through each element in collection and add those that do not have duplicate values to result.
    _.each(array, function(value, key, collection) {
      if (key === 0) {
        result.push(value);
      }

      else {
        var foundDup = false;
        
        _.each(result, function(existValue) {
          if (value === existValue) {
            foundDup = true;
          }
        });

        if (!foundDup) {
          result.push(value);
        }
      }
    });

    return result;
  };

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mappedArray = [];

    _.each(collection, function(value, key, collection) {
      mappedArray.push(iterator(value, key, collection));
    });

    return mappedArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
    _.invoke = function(collection, functionOrKey, args) {
    // need to check if functionOrKey is the actual function definition or a name of a pre-defined function
    // if the function is defined in the call to _.invoke
    if (typeof functionOrKey === "function") {
      return _.map(collection, function(value) {
        return functionOrKey.apply(value, args);
      });
    } else {
      return _.map(collection, function(value) {
        return value[functionOrKey].apply(value, args);
      });
    }
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    
    // add condition to set accumulator if no explicit starting value is given.
    if (arguments.length < 3) {
      accumulator = collection[0];
    }

    _.each(collection, function(value) {
      accumulator = iterator(accumulator, value);
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // supply default value if iterator isn't supplied
    iterator = iterator || _.identity;

    return _.reduce(collection, function(allFound, item) {
      // need to type-cast result
      return !!(allFound && iterator(item));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // add default function, in the case that iterator isn't provided/defined
    iterator = iterator || _.identity;

    return _.reduce(collection, function(someFound, item) {
      return !!(someFound || iterator(item));
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // return object if no extended properties are provided.
    if (arguments.length < 2) {
      return obj;
    }

    // create array of properties/objects to be used as sources using arguments (cut off initial object).
    var sources = Array.prototype.slice.call(arguments, 1);

    // loop through each argument to extend properties to the existing object
    _.each(sources, function(sourceObj) {
      _.each(sourceObj, function(value, key) {
        obj[key] = sourceObj[key];
      });
    });

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    // return object if no extended properties are provided.
    if (arguments.length < 2) {
      return obj;
    }

    // create array of properties/objects to be used as sources using arguments (cut off initial object).
    var sources = Array.prototype.slice.call(arguments, 1);

    // loop through each argument to extend properties to the existing object
    _.each(sources, function(sourceObj) {
      _.each(sourceObj, function(value, key) {
        if (!(key in obj)) {
        obj[key] = sourceObj[key];
        }
      });
    });

    return obj;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  // refer to link for help: http://www.sitepoint.com/implementing-memoization-in-javascript/
  _.memoize = function(func) {
    var memo = {}; // create a blank object function to be filled-in with memoized information.

    return function(param) {
      // if memo already contains the parameter passed to the function, assign pre-existing result.
      // if not, invoke the function.
      if (!(param in memo)) {
        memo[param] = func.apply(this, arguments);
      }

      return memo[param];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var funcArgs = Array.prototype.slice.call(arguments, 2);

    return setTimeout(function() {
      func.apply(this, funcArgs)
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var copiedArray = array.slice(0);
    var shuffledArray = [];

    while (copiedArray.length > 1) {
      var randNum = Math.round(Math.random() * copiedArray.length);
      shuffledArray.push(copiedArray.pop(copiedArray[randNum - 1]));
    }

    shuffledArray.push(copiedArray[0]);

    return shuffledArray;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  // loop through each argument
  // each index in results should be an array
  _.zip = function() {
    // create empty array to store zipped results
    var maxLength = 0;
    var argsLength = arguments.length;
    
    // loop through each argument to find max length (assume all arrays)
    _.each(arguments, function(value, key, args) {
      if(value.length > maxLength) {
        maxLength = value.length;
      }
    });

    var results = Array(maxLength);

    _.each(results, function(value, key, collection) {
      results[key] = Array(argsLength);
    });
    console.log(results);

    _.each(arguments, function(arg, index, argArray) {
      _.each(arg, function(value, key, arg) {
        results[key][index] = value;
      });
    });

    return results;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var results = [];
    _.each(nestedArray, function(value) {

    })
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
