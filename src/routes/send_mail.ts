import { Router } from 'express';
import SendMailController from '../controllers/send_mail';

const sendMailRouter = Router();

const sendMailController = new SendMailController();
sendMailRouter.post('/', sendMailController.execute);

export default sendMailRouter;
