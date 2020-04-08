function generate (countSymbol) {
    let key = '';

    for(let i = 0; i < countSymbol; i++) {
        key += Math.floor(Math.random() * 10 - 0.00000001);
    }

    return key;
}

module.exports = generate;
