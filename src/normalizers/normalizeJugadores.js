import { normalize, schema } from 'normalizr';

function normalizeDatos(myData){
    
    const jugador = new schema.Entity('jugadores',{}, {idAttribute:"id"});
    const mySchema = [ jugador ] ;
    const normalizedData = normalize(myData, mySchema);
    return normalizedData;
}

export default normalizeDatos;