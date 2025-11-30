//controladores responsaveis por processar requests relacionados a autenticação e gerir a lógica de sistema para os serviços de auth

import {loginUser, registerUser, verifyUser} from '../services/authService.js';


export async function registerController(req, res, next) {
    try{

        //dados validados pelo middleware validateRequest ficam em req.validated
        const result = await registerUser(req.validated.body);


        if (result.error) {
            return res.status(result.status).json({
                error: result.error
            })
        }

        res.status(201).json(result);


    } catch(err) {
        next(err);
    }
}


export async function loginController(req, res,next) {
    try {

        //permite login via email ou nickname atraves do campo identifier
        const result = await loginUser(req.validated.body);

        if(result.error) {
            return res.status(result.status).json({
                error: result.error
            })
        }

        res.status(200).json(result);

    } catch(err) {
        next(err);
    }
}



export async function verifyController(req, res, next) {
    try  {

        //verifica se o utilizador associado ao token continua válido
        const result = await verifyUser(req.user.id);

        if(result.error) {
            return res.status(result.status).json({
                error: result.error
            })
        }

        res.status(200).json({
            user: result.user,
            valid: true
        });

    } catch(err) {
        next(err);
    }
}