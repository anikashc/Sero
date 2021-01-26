import bcrypt from 'bcryptjs'
const users =[
    {
        name: 'Admin Master',
        email: 'admin@sero.com',
        password: bcrypt.hashSync('12345',10),
        phoneNumber: '1000020000',
        userType: 1
    },
    {
        name: 'Barista',
        email: 'manager@barista.com',
        password: bcrypt.hashSync('12345',10),
        phoneNumber: '9999990000',
        userType: 3
    },
    {
        name: 'KFC',
        email: 'manager@kfc.com',
        password: bcrypt.hashSync('12345',10),
        phoneNumber: '9999990008',
        userType: 3
    }
]
export default users