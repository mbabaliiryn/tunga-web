export function filterInvoices(invoices, type) {
    return invoices.filter(invoice => invoice.type === type);
}

export function filterMultiInvoicesTypes(invoices, type, type1) {
    return invoices.filter(invoice => invoice.type === type || invoice.type === type1);
}

export function sumInvoices(invoices) {
    return invoices.map(invoice => {
        return invoice.amount || 0;
    }).reduce((total, number) => {
        return total + Math.round(number * 100) / 100;
    }, 0);
}

export function batchInvoices(invoices) {
    let batchedInvoices = {};
    invoices.forEach(invoice => {
        batchedInvoices[invoice.batch_ref] = [...(batchedInvoices[invoice.batch_ref] || []), invoice];
    });

    let batchObjects = [];
    Object.keys(batchedInvoices).map(ref => {
        let batchObj = {...batchedInvoices[ref][0], invoices: batchedInvoices[ref]};
        batchObj.ref = ref;
        batchObj.amount = sumInvoices(batchedInvoices[ref]);
        batchObjects.push(batchObj);
    });
    return batchObjects;
}

