const addSocket = (io)=>{
    
    
    return (req, res, next) =>{
        
        io.on('connection', (socket)=>{
            //check government role
            // if true
            // join to government room
            socket.join('id phuong or quan');
        })
        req.io = io;
        next();
    }
}

export default addSocket;