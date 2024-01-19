class Node {
    constructor(value, tag) {
        this.value = value;
        this.next = null;
        // this.dlilk = null;
        this.tag = tag;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.subList = null;
    }

    addNode(value, tag) {
        let newNode = new Node(value, tag);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            if (tag === 1) {
                if (!this.subList) {
                    this.subList = new LinkedList();
                }
                this.subList.addNode(value, tag);
            } else {
                current.next = newNode;
            }
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

            if (current.tag === 1) {
                let subListContainer = document.createElement("ul");
                subListContainer.setAttribute("class", "subList");

                let subListCurrent = current.next;
                while (subListCurrent) {
                    let subListItem = document.createElement("li");
                    subListItem.textContent = subListCurrent.value;
                    subListContainer.appendChild(subListItem);

                    subListCurrent = subListCurrent.next;
                }

                listContainer.appendChild(subListContainer);
            }

            current = current.next;
        }
    }
}

let linkedList = new LinkedList();

function addNode() {
    let nodeInput = document.getElementById("nodeInput");
    let tag = 0;
    if (nodeInput.value) {
        linkedList.addNode(nodeInput.value, tag);
        nodeInput.value = "";
    }
}
function addSublist() {
    let nodeInput = document.getElementById("nodeInput");
    let tag = 1;
    if (nodeInput.value) {
        linkedList.addNode(nodeInput.value, tag);
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
