import LinkedList from "./linked_list.js";

export default class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(16);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode % this.capacity;
    }

    set(key, value) {
        // Find the location of bucket
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        // Go to that index
        // If there is no linked list, just create one and append
        // undefined == false
        if (!this.buckets[index]) {
            this.buckets[index] = new LinkedList();
        }

        // Auto hanlde key alreaady exists
        // Because it return true if inserted, then increment size
        if (this.buckets[index].append(key, value)) {
            this.size++;
        }

        // Grow buckets capacity if get over threshold value
        if (this.size > this.capacity * this.loadFactor) {
            // First saves the entries
            const entries = this.entries();

            // Double capacity  
            this.capacity *= 2; 

            // Create new bucket 
            this.buckets = new Array(this.capacity);
            this.size = 0;

            // Add entries to buckets
            entries.forEach(entry => {
                this.set(entry[0], entry[1])
            });
        } 
    }

    // Return the value that is assigned to this key
    get(key) {
        // Find the location of bucket
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        // If there is no linked list => no key
        if (!this.buckets[index]) {
            return null;
        }

        return this.buckets[index].get(key);
    }

    // Return true if has key else false
    has(key) {
        return this.get(key) ? true : false;
    }

    remove(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        // If there is no linked list => no key
        if (!this.buckets[index]) {
            return false;
        }

        if (this.buckets[index].remove(key)) {
            this.size--;
            return true;
        }

        return false;
    }

    length() {
        return this.size;
    }

    // Removes all entries in the hashmap
    clear() {
        this.size = 0;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }

    // Returns an array containing all the keys in hashmap
    keys() {
        const keys = [];
        this.buckets.forEach(bucket => {
            if (bucket) {
                keys.push(...bucket.keys());
            }
        });
        return keys;
    }

    // Returns an array containing all the values in hashmap
    values() {
        const values = [];
        this.buckets.forEach(bucket => {
            if (bucket) {
                values.push(...bucket.values());
            }
        });
        return values;
    }

    // Returns an array that contains each key, value pair
    entries() {
        const entries = [];
        this.buckets.forEach(bucket => {
            // If there is a linked list
            if (bucket) {
                entries.push(...bucket.entries());
            }
        });

        return entries;
    }
}
