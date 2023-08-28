const patchItem = (item, update, url) => {
    fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
    }).then(r => {
        if (r.ok) {
            r.json().then(data => {
                const keys = Object.keys(data)
                keys.forEach(key => item[key] = data[key])
            })
        }
        else {
            r.json().then(data => console.log(data))
        }
    })
    return item
}

function initializeBoard(squaresArr) {
    const board_layout = []
    const emptyTile = {}
    const emptySquares = []
    for (let i = 0; i < 100; i++) {
        const isFound = squaresArr?.find(e => (e.board_pos === i))
        if (isFound) {
            board_layout.push(isFound)
        }
        else {
            board_layout.push(emptyTile)
            emptySquares.push(i)
        }
    }

    return [board_layout, emptySquares]
}
export { patchItem, initializeBoard }