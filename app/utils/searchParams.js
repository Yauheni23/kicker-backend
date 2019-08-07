module.exports = (params) => {
    const regExp = new RegExp('-db-' + params + '=\(\\S\*\)');
    let paramsStr = process.argv.find((el) => {
        return el.search(regExp) !== -1;
    });

    if(paramsStr) {
        paramsStr = paramsStr.match(regExp)[1];
    }

    return paramsStr;
};
