import { normalize, schema } from 'normalizr';

function normalizeDatos(myData){
    
    const partidos = new schema.Entity('partidos',{}, {idAttribute:"id"});
    const mySchema = [ partidos ] ;
    const normalizedData = normalize(myData, mySchema);
    return normalizedData;
}

export default normalizeDatos;