class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addNode(value) {
        let newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.displayList();
    }

    displayList() {
        let listContainer = document.getElementById("linkedList");
        listContainer.innerHTML = "";
        let current = this.head;
        while (current) {
            let listItem = document.createElement("li");
            listItem.textContent = current.value;
            listContainer.appendChild(listItem);
            current = current.next;
        }
    }
}

let linkedList = new LinkedList();

function addNode() {
    let nodeInput = document.getElementById("nodeInput");
    if (nodeInput.value) {
        linkedList.addNode(nodeInput.value);
        nodeInput.value = "";
    }
}
function addNodeOnEnter(event) {
    if (event.key === "Enter") {
        addNode();
    }
}
function calculateSum() {
    let current = linkedList.head;
    let sum = 0;
    while (current) {
        sum += parseInt(current.value);
        console.log(current);
        current = current.next;
    }
    let sumResult = document.getElementById("sumResult");
    sumResult.textContent = `Sum of the list: ${sum}`;
}
function calculateDepth() {
    let current = linkedList.head;
    let depth = 0;
    while (current) {
        depth++;
        current = current.next;
    }
    let depthResult = document.getElementById("depthResult");
    depthResult.textContent = `Depth of the list: ${depth}`;
}
function searchAndDelete() {
    let dataInput = document.getElementById("dataInput").value;
    if (dataInput) {
        let current = linkedList.head;
        let previous = null;
        let found = false;

        while (current) {
            if (current.value === dataInput) {
                found = true;
                if (previous) {
                    previous.next = current.next;
                } else {
                    linkedList.head = current.next;
                }
                break;
            }
            previous = current;
            current = current.next;
        }

        let searchResult = document.getElementById("searchResult");
        if (found) {
            searchResult.textContent = `Data "${dataInput}" deleted from the list`;
        } else {
            searchResult.textContent = `Data "${dataInput}" not found in the list`;
        }
        displayListWithoutData(dataInput);
    }
}

function displayListWithoutData(dataInput) {
    if (!linkedList.head) {
        let listDisplay = document.getElementById("listDisplay");
        listDisplay.textContent = "لیست شما خالی است";
        return;
    }
    let current = linkedList.head;
    let listDisplay = document.getElementById("listDisplay");
    let listContent = "List: ";
    while (current) {
        if (current.value !== dataInput) {
            listContent += `${current.value} ---> `;
        }
        current = current.next;
    }
    listContent = listContent.slice(0, -4);
    listDisplay.textContent = listContent;
}
