function* genFunc() {
    yield 'esfj'
    console.log('first log')
    yield 'fg'
    console.log('second log')
    return 'done'
}
//how to use yield in a function to pause it after each yield line

const genObj = genFunc()
genObj.next()
//displays {value: esfj, done: false}
genObj.next()
//displays {value: fg, done: false}
genObj.next()
//displays {value: done, done: true}

function* getStrings() {
    yield 'a'
    yield 'b'
    yield 'c'
    yield 'd'
}

// const genStr = getStrings()
// [...genStr] //this doesnt work using spread operator

const genStr = getStrings()
for (let item of genStr) {
  console.log(item)
}


const array = ['z','x','c','v']
const string = 'this is a string'
const object = {name: "celeste quinn"}

function regularFunction() {
    return "i am a basic function"
}

function* generatorFunction() {
    return 'i am a generator function'
}

const generatorObject = generatorFunction()

array[Symbol.iterator] = function*() {
    yield this
}
array[Symbol.iterator]
//displays [Symbol.iterator]() { yield this}

//[...array]
//again doesnt work, displays the array

for (let item of array) console.log(item)

object[Symbol.iterator] = function* () {
    yield Object.keys(this)
}
//[...object]
//displays [[name]] can work if you console.log the spread operator

const symbols = ['$', '%']
function* genFunc1() {
    yield '#'
    yield* symbols//this inserts the symbols from array into the output later
    yield '@'
}
const genObj1 = genFunc1()
console.log([...genObj1])


//working with actual data

const bookClubs = [
    { 
        name: 'the cool club',
        clubMembers: [
            {
                name: 'john doe',
                books: [
                    { id: 'hs891', title: 'a perfect book'},
                    { id: 'ey812', title: 'a good book'}
                ]
            }
        ]
    },
    {
        name: 'the better club',
        clubMembers: [
            {
                name: 'Jane Doe',
                books: [
                    { id: 'u8291', title: 'a great book'},
                    { id: 'p9201', title: 'a nice book'}
                ]
            }
        ]
    }
]
//iterate through the array and yield each book
function* iterateBooks(books) {
    for (let i = 0; i < books.length; i++) {
        yield books[i]
    }
}
//iterates through the clubmembers array and yields their books
function* iterateMembers(members) {
    for (let i = 0; i < members.length; i++) {
        const clubMember = members[i]
        yield* iterateBooks(clubMember.books)
    }
}
//iterates through the bookclub itself
function* iterateBookClubs(bookClubs) {
    for (let i = 0; i < bookClubs.length; i++) {
        const bookClub = bookClubs[i]
        yield* iterateMembers(bookClub.clubMembers)
    }
}

const it = iterateBookClubs(bookClubs)
console.log(it.next())
console.log(it.next())

//writing a function to find the specific book instead of manually typing next
function findBook(id) {
    const genObj2 = iterateBookClubs(bookClubs)
    let result = genObj2.next()

    while (!result.done) { //while result isnt done(not at the end)
        if (result.value.id === id) { //check the id to see if it matches the id paramter we describe
            return result.value //return the value if id is matched
        } else {
            result = genObj2.next() //otherwise keep going next
        }
    }
}
console.log(findBook('p9201'))