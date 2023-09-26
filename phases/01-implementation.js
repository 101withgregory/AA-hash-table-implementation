class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(capacity = 8) {
    this.capacity = capacity;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }
    return hashValue;
  }

  hashMod(key) {
    return this.hash(key) % this.capacity;
  }

  insert(key, value) {
    let loadFactor = this.count / this.capacity;
    let newKeyValuePair = new KeyValuePair(key, value);
    let index = this.hashMod(key);
    if (this.data[index] === null) {
      this.data[index] = newKeyValuePair;
    } else {
      let existingPair = this.data[index];
      while (existingPair !== null) {
        if (existingPair.key === key) {
          existingPair.value = value;
          return;
        }
        existingPair = existingPair.next;
      }
      newKeyValuePair.next = this.data[index];
      this.data[index] = newKeyValuePair;
    }
    this.count++;

    // Check the load factor and resize if necessary
    if (loadFactor > 0.7) {
      this.resize();
    }
  }

  read(key) {
    const index = this.hashMod(key);
    if (this.data[index] !== null) {
      let existingPair = this.data[index];
      while (existingPair !== null) {
        if (existingPair.key === key) {
          return existingPair.value;
        }
        existingPair = existingPair.next;
      }
    }
    return undefined; // Key not found
  }

  resize() {
    const previousData = this.data.slice();
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0; // Reset the count

    for (let i = 0; i < previousData.length; i++) {
      if (previousData[i] !== null) {
        let currentPair = previousData[i];
        while (currentPair !== null) {
          this.insert(currentPair.key, currentPair.value);
          currentPair = currentPair.next;
        }
      }
    }
  }

  delete(key) {
    const index = this.hashMod(key);
    if (this.data[index] === null) {
      return "Key not found"; // Key not found in the hash table
    }

    let currentPair = this.data[index];
    let previousPair = null;

    while (currentPair !== null) {
      if (currentPair.key === key) {
        // Found the key/value pair to delete
        if (previousPair === null) {
          // Case 1: Pair to delete is the first pair in the bucket
          this.data[index] = currentPair.next;
        } else {
          // Case 2: Pair to delete is in the middle or at the end of the linked list
          previousPair.next = currentPair.next;
        }

        this.count--;
        return;
      }

      previousPair = currentPair;
      currentPair = currentPair.next;
    }

    return "Key not found"; // Key not found in the linked list
  }
}

module.exports = HashTable;
