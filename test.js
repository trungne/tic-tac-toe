function person(name){
    let personName = name;

    const changeName = (newName) => {
        personName = newName;
        return {personName, changeName};

    }

    return {personName, changeName};
}

let p1 = person("Trung");
let p2 = person("Thinh");

let people = [p1, p2]

console.table(people);
people[0] = people[0].changeName("Khanh"); //now works
console.table(people);
