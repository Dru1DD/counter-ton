import "@stdlib/deploy";

contract Counter with Deployable {
    id: Int as uint32;
    value: Int as uint32;

    init(id: Int) {
        self.id = id;
        self.value = 0;
    }

    receive("increment") {
        self.value = self.value + 1;
    }

    receive("decrement") {
        self.value = self.value - 1;
    }

    get fun counter(): Int { 
        return self.value;
    }

    get fun id(): Int {
        return self.id;
    }
}
