import { normalize, schema } from 'normalizr';

function normalizeDatos(myData){

    const torneos = new schema.Entity('torneos',{}, {idAttribute:"id"});
    const mySchema = [ torneos ] ;
    const normalizedData = normalize(myData, mySchema);
    return normalizedData;
}

export default normalizeDatos;