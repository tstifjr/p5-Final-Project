

// function initializeBoard(squaresArr) {
//     const board_layout = []
//     const emptyTile = {}
//     for (let i = 1; i < 101; i++) {
//         const isFound = squaresArr.find(e => (e.board_pos === i))
//         if (isFound) {
//             board_layout.push(isFound)
//         }
//         else {
//             board_layout.push(emptyTile)
//         }
//     }
//     return board_layout
// }

// function genRandNums() {
//     const hashmap = new Map();
//     let i = 0;
//     while (hashmap.size < 10) {
//         let r = Math.floor(Math.random() * 10)
//         hashmap.set(r, i)
//         i++
//     }
//     return Array.from(hashmap.keys())
// }

// export { initializeBoard, genRandNums }