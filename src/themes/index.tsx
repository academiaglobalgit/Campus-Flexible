import plataformaDefault from './default';
import coppel from './coppel';

export const getThemeByPlataforma = (id: string) => {
    switch(id) {
        case 'coppel': return coppel;
        default: return plataformaDefault;
    }
}