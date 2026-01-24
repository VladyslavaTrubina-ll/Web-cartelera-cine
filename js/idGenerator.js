export function generarID(lista, campoID) {
    if (lista.length === 0) return 1;

    const ids = lista.map(item => item[campoID]);
    const maxID = Math.max(...ids);

    return maxID + 1;
}
