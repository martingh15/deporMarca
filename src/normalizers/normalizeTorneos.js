import { normalize, schema } from 'normalizr';

function normalizeDatos(myData){
    const partido = new schema.Entity('partidos',{}, {idAttribute:"id"});
    const torneo = new schema.Entity('torneos',{partido: [partido]}, {idAttribute:"id"});
    const mySchema = [ torneo ] ;
    const normalizedData = normalize(myData, mySchema);

    return normalizedData;
}

export default normalizeDatos;