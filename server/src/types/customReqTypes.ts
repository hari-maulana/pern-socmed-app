import { Request } from 'express';

interface RequestWithUser extends Request {
    user?: any;  // You can specify a more specific type instead of `any` if you know the structure of `user`.
}

export default RequestWithUser
