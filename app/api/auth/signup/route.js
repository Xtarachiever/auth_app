
import { connectToDB } from '../../../../database/conn';
import Users from '../../../../model/Schema';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req,res){
    // only post method is accepted
    // const reqBody = await req.json();
    // console.log(reqBody)
    if(req.method === 'POST'){
        try {
            await connectToDB();
            const reqBody = await req.json();
            const { username, email, password } = reqBody

            // if no body in the request
            if(!reqBody) return NextResponse.json({error: "Don't have a request body", success: false}, {status: 404, statusText:"Don't have form data..."});

            // check duplicate users
            const checkexisting = await Users.findOne({ email });
            if(checkexisting) return NextResponse.json({error: "User already exists", success: false}, {status: 422, statusText:'User already exists...'});

            // hash password
            Users.create({ username, email, password : await hash(password, 12)}, function(err, data){
                if(err) return NextResponse.json({ err },{status:404});
                return NextResponse.json({ status : true, user: data},{status:201})
            })

            } catch(err) {
                // console.log(err)
            return NextResponse.json({error: err, success: false}, {status: 500, statusText:err});
        }
    }

}
