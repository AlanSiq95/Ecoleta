import express from 'express';
import {celebrate, Joi} from 'celebrate';
import PointsController from './controllers/pointsController';
import ItemsController from './controllers/itemsController';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

// index: mostrar vários
// show: mostrar apenas um
// create: criar 1
// update: atualizar 1
// delete: apagar/remover

routes.get('/items', itemsController.index);

routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
            
        })
    }),
    pointsController.create);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);




export default routes;