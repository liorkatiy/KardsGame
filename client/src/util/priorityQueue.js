const m = new WeakMap();
/**
 * 
 * @param {*} t
 * @returns {{arr:[],size:number,compareable:(a,b)=>number} }
 */
const getP = (t) => m.get(t);

const swap = function (i1, i2, arr) {
  const tmp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = tmp;
};

const sortUp = function (i, arr, compareable) {
  while (i !== 0) {
    const parent = Math.floor((i - 1) / 2);
    if (compareable(arr[i], arr[parent]) === 1) {
      swap(i, parent, arr);
    }
    else {
      break;
    }
    i = parent;
  }
};

const sortDown = function (size, arr, compareable) {
  let left = 1,
    child = 0,
    i = 0;
  while (left < size) {
    if (left + 1 < size) {
      child = compareable(arr[left], arr[left + 1]) === 1 ?
        left : left + 1;
    } else
      child = left;
    if (compareable(arr[child], arr[i]) === 1)
      swap(child, i, arr);
    else
      break;
    i = child;
    left = 2 * child + 1;
  }
};

const contains = function (item, i, p) {
  let found = false;
  if (p.compareable(p.arr[i], item) === 0)
    found = true;
  else if (p.compareable(p.arr[i], item) === 1) {
    if (i * 2 + 1 < p.size)
      found = contains(item, i * 2 + 1);
    if (i * 2 + 2 < p.size && !found)
      found = contains(item, i * 2 + 2);
  }
  return found;
};

class PQ {
  constructor(compareable, items) {
    const privates = { arr: [], size: 0, compareable };
    m.set(this, privates);
    if (items) {
      for (let i = 0; i < items.length; i++) {
        this.enqueue(items[i]);
      }
    }
  }

  enqueue(item) {
    const p = getP(this);
    p.arr[p.size] = item;
    sortUp(p.size, p.arr, p.compareable);
    p.size++;
  };

  enqueueMany(items) {
    for (let i = 0; i < items.length; i++) {
      this.enqueue(items[i]);
    }
  }

  dequeue() {
    const p = getP(this);
    const item = p.arr[0];
    p.arr[0] = p.arr[--p.size];
    sortDown(p.size, p.arr, p.compareable);
    return item;
  }

  contains(item) {
    return contains(item, 0, getP(this));
  };

  get count() {
    return getP(this).size;
  }

  clear() {
    const p = getP(this);
    p.arr = [];
    p.size = 0;
  }
}

/**
 * 
 * @param {(item1 , item2) => number} compareable 
 */
/*function priotiryQueue(compareable) {
  let size = 0;
  const arr = [];

  const swap = function (i1, i2) {
    const tmp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = tmp;
  };

  const sortUp = function () {
    let i = size;
    while (i !== 0) {
      let parent = Math.floor((i - 1) / 2);
      if (compareable(arr[i], arr[parent]) === 1)
        swap(i, parent);
      else break;
      i = parent;
    }
  };

  const sortDown = function () {
    let left = 1,
      child = 0,
      i = 0;
    while (left < size) {
      if (left + 1 < size) {
        child = compareable(arr[left], arr[left + 1]) === 1 ?
          left : left + 1;
      } else
        child = left;
      if (compareable(arr[child], arr[i]) === 1)
        swap(child, i);
      else
        break;
      i = child;
      left = 2 * child + 1;
    }
  };

  const contains = function (item, i) {
    let found = false;
    if (compareable(arr[i], item) === 0)
      found = true;
    else if (compareable(arr[i], item) === 1) {
      if (i * 2 + 1 < size)
        found = this.contains(item, i * 2 + 1);
      if (i * 2 + 2 < size && !found)
        found = this.contains(item, i * 2 + 2);
    }
    return found;
  };

  this.count = () => size;

  this.enqueue = function (item) {
    if (item != null) {
      arr[size] = item;
      sortUp();
      size++;
    }
  };

  this.dequeue = function () {
    const item = arr[0];
    arr[0] = arr[--size];
    sortDown();
    return item;
  };

  this.contains = function (item) {
    return contains(item, 0);
  };
}*/

module.exports = PQ;