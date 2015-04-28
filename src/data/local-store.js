let storeType = function (type) {
      return type && type + 'Storage' || 'localStorage';
    },
    getter = function (key, type) {
      var strout = window[storeType(type)].getItem(key);
      return JSON.parse(strout);
    },
    setter = function (key, value, type) {
      var str = JSON.stringify(value);
      window[storeType(type)].setItem(key, str);
      return str;
    };

export default function factory (key, type) {
  return function (...args) {
    if (args.length) {
      setter(key, args[0], type);
    }
    return getter(key, type);
  };
}