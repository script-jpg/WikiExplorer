class Node {
    constructor(data, next = null) {
      this.data = data;
      this.next = next;
    }
}

class LinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }

    empty() {
        return this.size === 0;
    }

    //enqueue(data) adds a new node with data to the end of the queue
    enqueue(data) {
        let node = new Node(data);
        if (this.size === 0) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.size++;
    }

    //dequeue() removes a node from the start of the queue and returns it
    dequeue() {
        if (this.size > 1) {
            const old_head = this.head.data;
            this.head = this.head.next;
            if (this.size === 1) {
                this.tail = null;
            }
            this.size--;
            return old_head;
        } else {
            console.log('queue empty, cannot deqeue');
            return null;
        } 
    }

    //getHead() returns the data of the head node
    getHead() {
        if (this.size !== 0) {
            return this.head.data;
        }
    }

    getSize() {
        return this.size;
    }

    //print() outputs the data of all the nodes in the queue
    print() {
        let current = this.head;
        while (current != null) {
            console.log(current.data);
            current = current.next;
        }
    }
  
    
}

module.exports = LinkedList;




