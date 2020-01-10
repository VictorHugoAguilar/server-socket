import { Router, Request, Response } from 'express';


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