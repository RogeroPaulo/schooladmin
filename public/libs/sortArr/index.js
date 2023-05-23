const sortArr = {
    init: (arr, order, orderBy) => {
        return sortArr.stableSort(arr, sortArr.getComparator(order, orderBy), orderBy)
    },

    descendingComparator: (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    },

    getComparator: (order, orderBy) => {
        return order === 'desc' ?
        (a, b) => sortArr.descendingComparator(a, b, orderBy)
        :
        (a, b) => -sortArr.descendingComparator(a, b, orderBy);
    },

    stableSort: (array, comparator, orderBy) => {
        const stabilizedThis = array.map((el, index) => {
            el[orderBy] = isNaN(el[orderBy])?el[orderBy]:parseInt(el[orderBy], 10)
            return [el, index]
        });
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
};

module.exports = sortArr;