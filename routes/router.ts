import { Router, Request, Response } from 'express';
import Server from '../class/Server';


const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    // Funcion callback que se ejecuta para devolver una vez se ha hecho la peticion get
    res.json({
        Ok: true,
        Message: 'Todo OK...',
        Service: 'GET'
    });
});


router.post('/mensajes', (req: Request, res: Response) => {
    // Recibimos los parametros pasado por el cuerpo
    const cuerpo: string = req.body.cuerpo;
    const de: string = req.body.de;

    // Instanciamos el servidor como es singleton es la única instancia
    const server = Server.instance;

    // creamo el payload
    const payload = { cuerpo, de };

    // para emitir a un todos los usuario tenemos que usar el metodo 
    // emit (nombre del servicio, y el payload con el contenido )
    server.io.emit('nuevo-mensaje', payload);


    // Funcion callback que se ejecuta para devolver una vez se ha hecho la peticion get
    res.json({
        Ok: true,
        Message: 'Todo OK...',
        Service: 'POST',
        cuerpo,
        de
    });
});


router.post('/mensajes/:id', (req: Request, res: Response) => {
    // Recibimos los parametros pasado por el cuerpo
    const cuerpo: string = req.body.cuerpo;
    const de: string = req.body.de;
    const id: any = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    // Instanciamos el servidor como es singleton es la única instancia
    const server = Server.instance;

    // para emitir a un solo usuario tenemos que usar el metodo in( 'parametro id' ) 
    // y luego emit (nombre del servicio, y el payload con el contenido )
    server.io.in(id).emit('mensaje-privado', payload);

    // Funcion callback que se ejecuta para devolver una vez se ha hecho la peticion get
    res.json({
        Ok: true,
        Message: 'Todo OK...',
        Service: 'POST',
        cuerpo,
        de,
        id
    });
});

// Exportamos la constante para poder utilizarla importandola cuando se necesite
export default router;