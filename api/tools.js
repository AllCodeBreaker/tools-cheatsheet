import fs from 'fs';
import path from 'path';

export default function handler(req, res){
    const toolsDir = path.join(process.cwd(), "tools")
    
    try{
        const files = fs.readdirSync(toolsDir);
        const htmlFiles = files.filter(f=> f.endsWith('.html'))
        res.status(200).json(htmlFiles);

    }catch(err){
        res.status(500).json({error: "Failed to read tools"})
    }
}