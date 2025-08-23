import { Router } from 'express';
import auth from './auth.routes';
import usuarios from './usuario.routes'; 
import expedientes from './expediente.routes';
import indicios from './indicio.routes';


const router = Router();

router.use('/auth', auth);
router.use('/usuarios', usuarios);    
router.use('/expedientes', expedientes);
router.use('/indicios', indicios);   
 

export default router;
