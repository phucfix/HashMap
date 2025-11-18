import Node from "./node.js";

// Linked list contain a lots of node ( key, value )
export default class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Append the new value to the list. If the same key is inserted, then override its value
    // Return true if inserted, false if overried
    append(key, value) {
        // If the linked list is empty, append for sure
        if (this.size === 0) {
            const newNode = new Node(key, value);
            this.head = newNode;
            this.tail = newNode;
            this.size++;
            return true;
        }

        // Check if linked list has same key
        const node = this.getNode(key);
        // If so, just override it value
        if (node) {
            node.value = value;
            return false;
        }

        // Otherwise, just append it normally
        const newNode = new Node(key, value);
        newNode.prevNode = this.tail;
        this.tail.nextNode = newNode;
        this.tail = newNode;
        this.size++;
        return true;
    }

    // Return the node with exact key, else return null
    getNode(key) {
        let pointer = this.head;
        while (pointer) {
            if (pointer.key === key) {
                return pointer;
            }

            // Move pointer to the next node
            pointer = pointer.nextNode;
        }

        return null;
    }

    // Returns the value that is assigned to this key
    get(key) {
        // Find the node with the key
        const node = this.getNode(key);

        return node ? node.value : null;
    }

    remove(key) {
        const node = this.getNode(key);
        if (node) {
            // Remove the node
            // If node is the head
            if (node === this.head) {
                this.head = this.head.nextNode;
                // Check if head is not null ( there are no element )
                if (this.head) {
                    this.head.prevNode = null;
                } 
                else {
                    this.tail = null;
                }
            } else if (node === this.tail) {
                this.tail = this.tail.prevNode;
                // Check if tail is not null ( there are no element )
                if (this.tail) {
                    this.tail.nextNode = null;
                } else {
                    this.head = null;
                }
            } 
            // The node to removed is between something
            else {
                node.prevNode.nextNode = node.nextNode;
                node.nextNode.prevNode = node.prevNode;
            }
            
            this.size--;
            return true;
        }

        return false;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    keys() {
        const keys = [];
        let pointer = this.head;
        while (pointer) {
            keys.push(pointer.key);

            pointer = pointer.nextNode;
        }

        return keys;
    }

    values() {
        const values = [];
        let pointer = this.head;
        while (pointer) {
            values.push(pointer.value);

            pointer = pointer.nextNode;
        }

        return values;
    }

    // Return all key, values in a linked list
    entries() {
        const entries = [];
        let pointer = this.head;
        while (pointer) {
            entries.push([pointer.key, pointer.value]);

            pointer = pointer.nextNode;
        }

        return entries;
    }
}
